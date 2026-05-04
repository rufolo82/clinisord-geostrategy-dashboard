// Datos de competidores en España importados desde OpenStreetMap/Overpass API
import { competitorLocations as osmCompetitors } from './spainCompetitors.js';

export const competitorChains = [
  // Nacionales
  { id: 'gaes', name: 'GAES (Amplifon)', type: 'clínica', color: '#ef4444', count: 0, description: 'Líder del mercado español' },
  { id: 'audika', name: 'Audika', type: 'clínica', color: '#14b8a6', count: 0, description: 'Red de amplia cobertura nacional' },
  { id: 'aural', name: 'Aural (Widex)', type: 'clínica', color: '#6366f1', count: 0, description: 'Especialistas en acúfenos' },
  { id: 'microson', name: 'Microson', type: 'clínica', color: '#f43f5e', count: 0, description: 'Histórica del sector español' },
  { id: 'audicion_activa', name: 'Audición Activa', type: 'clínica', color: '#10b981', count: 0, description: 'Presencia nacional' },
  { id: 'audicost', name: 'Audicost', type: 'clínica', color: '#f97316', count: 0, description: 'Líder en precios low-cost' },
  
  // Regionales
  { id: 'cottet', name: 'Cottet 1902', type: 'óptica', color: '#b45309', count: 0, description: 'Premium - Cataluña' },
  { id: 'natural_optics', name: 'Natural Optics', type: 'óptica', color: '#0ea5e9', count: 0, description: 'Fuerte en el Mediterráneo' },
  { id: 'eurosone', name: 'Eurosone', type: 'clínica', color: '#6d28d9', count: 0, description: 'Precios competitivos - Madrid' },
  { id: 'audias', name: 'Audias', type: 'clínica', color: '#4f46e5', count: 0, description: 'Cadena independiente - Madrid' },
  { id: 'audiotek', name: 'Audiotek', type: 'clínica', color: '#ec4899', count: 0, description: 'Principalmente en Cataluña' },
  
  // Otros Regionales (Referencia)
  { id: 'audiosalud', name: 'Audiosalud', type: 'clínica', color: '#059669', count: 0, description: 'Destacada en Andalucía' },
  { id: 'aude', name: 'Aude', type: 'clínica', color: '#dc2626', count: 0, description: 'Referente en Andalucía' },
  { id: 'jaime_castro', name: 'Jaime de Castro', type: 'clínica', color: '#d97706', count: 0, description: 'Comunidad Valenciana' },
  
  // Independientes
  { id: 'Independiente', name: 'Centro Independiente', type: 'clínica', color: '#8b5cf6', count: 0, description: 'Comercio local' }
];

// Algoritmo basado en el nombre real (extraído de OpenStreetMap)
function enrichCompetitors(competitors) {
  const enriched = competitors.map(comp => {
    // Si ya viene con la cadena definida (y no es Independiente), lo respetamos
    if (comp.cadena && comp.cadena !== 'Independiente') return comp;
    
    const name = comp.nombre || 'Centro Auditivo';
    const nameLower = name.toLowerCase();
    
    // Lista de palabras clave que DEFINEN un centro auditivo
    const isAudiology = nameLower.includes('audio') || 
                        nameLower.includes('audición') || 
                        nameLower.includes('audicion') || 
                        nameLower.includes('audífono') || 
                        nameLower.includes('audifono') ||
                        nameLower.includes('oír') ||
                        nameLower.includes('oir') ||
                        nameLower.includes('gaes') ||
                        nameLower.includes('aural') ||
                        nameLower.includes('audika') ||
                        nameLower.includes('audifón') ||
                        nameLower.includes('audifon') ||
                        nameLower.includes('audical') ||
                        nameLower.includes('audicost') ||
                        nameLower.includes('afflelou') ||
                        nameLower.includes('specsavers') ||
                        nameLower.includes('clinisord');

    // Filtrar ruido de OSM (clínicas generales, CAPS, dentistas, etc.)
    const noiseKeywords = [
      'cap ', 'atenció primària', 'atencion primaria', 'centro de salud', 'clínica (osm)', 
      'clinica (osm)', 'general', 'hospital', 'dental', 'dentista', 'estética', 'estetica',
      'óptica (osm)', 'optica (osm)', 'farmacia (osm)', 'veterinaria', 'vete',
      'podólogo', 'podologo', 'fisioterapia', 'psicólogo', 'psicologo',
      'médico', 'medico', 'especialidades', 'clínica dental', 'clinica dental'
    ];

    const hasNoiseKeyword = noiseKeywords.some(keyword => nameLower.includes(keyword));

    // REGLA: Si tiene ruido Y NO es una de las marcas conocidas, descartar.
    if (hasNoiseKeyword) {
      const isKnownBrand = nameLower.includes('gaes') || 
                           nameLower.includes('aural') || 
                           nameLower.includes('audika') ||
                           nameLower.includes('audifon') ||
                           nameLower.includes('audicost') ||
                           nameLower.includes('afflelou') ||
                           nameLower.includes('clinisord');
      
      if (!isKnownBrand) {
        return null;
      }
    }

    // REGLA: Si NO tiene palabras de audiología, descartar (a menos que sea una marca conocida)
    if (!isAudiology) {
       // Mantener si el tipo de OSM es explícitamente audiología
       if (comp.tipo !== 'audiología' && comp.tipo !== 'audiologia') {
         return null;
       }
    }

    // Clasificar en cadena
    let chainId = 'Independiente';
    const nameLowerClean = nameLower.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Quitar tildes para mejor match

    if (nameLower.includes('gaes') || nameLower.includes('amplifon')) chainId = 'gaes';
    else if (nameLower.includes('aural') || nameLower.includes('widex')) chainId = 'aural';
    else if (nameLower.includes('audika')) chainId = 'audika';
    else if (nameLower.includes('microson')) chainId = 'microson';
    else if (nameLower.includes('audicion activa')) chainId = 'audicion_activa';
    else if (nameLower.includes('cottet')) chainId = 'cottet';
    else if (nameLower.includes('natural optics')) chainId = 'natural_optics';
    else if (nameLower.includes('eurosone') || nameLower.includes('euro-sone')) chainId = 'eurosone';
    else if (nameLower.includes('audias')) chainId = 'audias';
    else if (nameLower.includes('audiotek') || nameLower.includes('audiotec')) chainId = 'audiotek';
    else if (nameLower.includes('audiosalud')) chainId = 'audiosalud';
    else if (nameLower.includes('aude')) chainId = 'aude';
    else if (nameLowerClean.includes('jaime de castro')) chainId = 'jaime_castro';
    else if (nameLower.includes('audifon') || nameLower.includes('audifón')) chainId = 'audifon';
    else if (nameLower.includes('audical')) chainId = 'audical';
    else if (nameLower.includes('audicost')) chainId = 'audicost';
    else if (nameLower.includes('afflelou')) chainId = 'afflelou_acoustics';
    else if (nameLower.includes('specsavers')) chainId = 'specsavers';
    else if (nameLower.includes('multiopticas') || nameLower.includes('multiópticas')) chainId = 'multiopticas';
    else if (nameLower.includes('opticalia')) chainId = 'opticalia';
    else if (nameLower.includes('federopticos') || nameLower.includes('federópticos')) chainId = 'federopticos';
    else if (nameLower.includes('general optica') || nameLower.includes('general óptica')) chainId = 'general_optica';
    else if (nameLower.includes('el corte ingles') || nameLower.includes('el corte inglés')) chainId = 'elcorteingles';
    else if (nameLower.includes('vistaoptica') || nameLower.includes('vistaóptica')) chainId = 'vistaoptica';
    else if (nameLower.includes('mainat')) chainId = 'mainat';
    
    return { ...comp, cadena: chainId };
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
