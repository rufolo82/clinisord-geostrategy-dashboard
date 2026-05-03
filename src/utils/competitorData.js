// Datos de competidores en España importados desde OpenStreetMap/Overpass API
import { competitorLocations as osmCompetitors } from './spainCompetitors.js';

export const competitorChains = [
  { id: 'gaes', name: 'GAES (Amplifon)', type: 'clínica', color: '#ef4444', count: 0, description: 'Líder del mercado español' },
  { id: 'aural', name: 'Aural (Widex)', type: 'clínica', color: '#6366f1', count: 0, description: 'Especialistas premium' },
  { id: 'audika', name: 'Audika', type: 'clínica', color: '#14b8a6', count: 0, description: 'Red en expansión' },
  { id: 'audifon', name: 'Audifón', type: 'clínica', color: '#d946ef', count: 0, description: 'Atención personalizada' },
  { id: 'audical', name: 'Audical', type: 'clínica', color: '#f97316', count: 0, description: 'Especialistas audición' },
  { id: 'Independiente', name: 'Centro Independiente', type: 'clínica', color: '#8b5cf6', count: 0, description: 'Comercio local' }
];

// Algoritmo basado en el nombre real (extraído de OpenStreetMap)
function enrichCompetitors(competitors) {
  const enriched = competitors.map(comp => {
    // Si ya viene con la cadena definida (y no es Independiente), lo respetamos
    if (comp.cadena && comp.cadena !== 'Independiente') return comp;
    
    let newChain = 'Independiente';
    const nameLower = comp.nombre.toLowerCase();
    
    // Whitelist estricta de cadenas conocidas
    if (nameLower.includes('gaes') || nameLower.includes('amplifon')) {
      newChain = 'gaes';
    } else if (nameLower.includes('aural') || nameLower.includes('widex')) {
      newChain = 'aural';
    } else if (nameLower.includes('audika')) {
      newChain = 'audika';
    } else if (nameLower.includes('audifon') || nameLower.includes('audifón')) {
      newChain = 'gaes'; // Muchas veces se confunden en OSM, pero Audifón es relevante
    } else if (nameLower.includes('audical')) {
      newChain = 'audical';
    } else {
      // Filtrar ruidos: CAP, Centros de Salud, Dentistas, etc.
      const isNoise = nameLower.includes('cap ') || 
                      nameLower.includes('atenció primària') || 
                      nameLower.includes('centro de salud') ||
                      nameLower.includes('clínica (osm)') ||
                      nameLower.includes('audiología (osm)') ||
                      nameLower.includes('dental') ||
                      nameLower.includes('hospital') ||
                      nameLower.includes('farmacia') ||
                      nameLower.includes('fisioterapia') ||
                      nameLower.includes('podólogo') ||
                      nameLower.includes('ginecología');

      if (isNoise) return null;

      // Whitelist de términos de audiología
      const isAudiology = comp.tipo === 'audiología' || 
                          nameLower.includes('audio') || 
                          nameLower.includes('audífon') || 
                          nameLower.includes('auditivo') ||
                          nameLower.includes('auditiu') ||
                          nameLower.includes('oír') ||
                          nameLower.includes('oir') ||
                          nameLower.includes('ear') ||
                          nameLower.includes('acústic') ||
                          nameLower.includes('sordera');
      
      if (!isAudiology) {
        return null;
      }
    }
    
    return { ...comp, cadena: newChain };
  });
  
  return enriched.filter(comp => comp !== null);
}


export const competitorLocations = enrichCompetitors(osmCompetitors);

export function getCompetitorsByChain(chainId) {
  return competitorLocations.filter(comp => comp.cadena === chainId);
}

export function getVisibleCompetitors(chainVisibility) {
  if(!chainVisibility) return competitorLocations;
  const visibleChains = Object.entries(chainVisibility)
    .filter(([_, isVisible]) => isVisible)
    .map(([chainId]) => chainId);
  
  return competitorLocations.filter(comp => visibleChains.includes(comp.cadena));
}

export function getCompetitorStats() {
  const chainCounts = {};
  competitorLocations.forEach(comp => {
    chainCounts[comp.cadena] = (chainCounts[comp.cadena] || 0) + 1;
  });
  
  return {
    total: competitorLocations.length,
    porCadena: chainCounts
  };
}

export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getCompetitorsInArea(lat, lng, radiusKm = 5, chainVisibility = null) {
  let locations = competitorLocations;
  
  if (chainVisibility) {
    const visibleChains = Object.entries(chainVisibility)
      .filter(([_, isVisible]) => isVisible)
      .map(([chainId]) => chainId);
    locations = competitorLocations.filter(comp => visibleChains.includes(comp.cadena));
  }
  
  const competitorsInArea = locations.filter(comp => {
    const distance = calculateDistance(lat, lng, comp.lat, comp.lng);
    comp.distancia = distance.toFixed(2);
    return distance <= radiusKm;
  });

  return competitorsInArea.sort((a, b) => parseFloat(a.distancia) - parseFloat(b.distancia));
}

// Retro-compatibilidad si algún archivo requería el alias Complete
export const competitorLocationsComplete = competitorLocations;
