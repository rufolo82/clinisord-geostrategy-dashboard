// Datos de competidores en España importados desde OpenStreetMap/Overpass API
import { competitorLocations as osmCompetitors } from './spainCompetitors';

export const competitorLocations = osmCompetitors;

// Definición de cadenas con colores y metadatos
export const competitorChains = [
  { id: 'gaes', name: 'GAES (Amplifon)', type: 'clínica', color: '#ef4444', count: 0, description: 'Líder del mercado español' },
  { id: 'audical', name: 'Audical', type: 'clínica', color: '#f97316', count: 0, description: 'Especialistas audición' },
  { id: 'Independiente', name: 'Centro Independiente', type: 'clínica', color: '#8b5cf6', count: 0, description: 'Comercio local' }
];

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
