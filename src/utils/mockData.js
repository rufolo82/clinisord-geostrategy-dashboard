// Generador de datos para demografía y análisis de competencia
// Usa datos reales de competidores y simula datos demográficos

import { getClinisordLocations } from './spainData';
import { competitorLocations, getCompetitorsInArea, calculateDistance } from './competitorData';

// Cache para datos generados
const mockDataCache = new Map();

import { spainPostalCodes } from './spainData';

export function getNearestPostalCodeData(lat, lng) {
  let nearestData = null;
  let minDistance = Infinity;
  Object.values(spainPostalCodes).forEach(data => {
    // Estimación rápida de distancia euclidiana para proximidad sin sobrecargar la CPU
    const dist = Math.pow(data.lat - lat, 2) + Math.pow(data.lng - lng, 2);
    if(dist < minDistance) {
      minDistance = dist;
      nearestData = data;
    }
  });
  return nearestData;
}

export function getRealElderlyPercentage(lat, lng) {
  const data = getNearestPostalCodeData(lat, lng);
  if(data && data.porcentaje_mayores_65 !== undefined) {
    return data.porcentaje_mayores_65;
  }
  return 0.18; // Media nacional como fallback extremo
}

// Generar competidores específicos usando datos reales
export function generateCompetitors(lat, lng, population) {
  // Usar datos reales de competidores dentro de un radio de 3km
  const realCompetitors = getCompetitorsInArea(lat, lng, 3);
  
  // Si no hay competidores reales cercanos, usar todos los competidores de España
  // pero con distancia calculada desde el punto
  if (realCompetitors.length === 0) {
    return competitorLocations.slice(0, 5).map(comp => {
      const distance = calculateDistance(lat, lng, comp.lat, comp.lng);
      return {
        id: comp.id,
        nombre: comp.nombre,
        tipo: comp.tipo,
        lat: comp.lat,
        lng: comp.lng,
        distancia: distance.toFixed(2),
        rating: '4.0',
        cadena: comp.cadena
      };
    });
  }
  
  return realCompetitors.map(comp => ({
    id: comp.id,
    nombre: comp.nombre,
    tipo: comp.tipo,
    lat: comp.lat,
    lng: comp.lng,
    distancia: comp.distancia,
    rating: '4.0',
    cadena: comp.cadena
  }));
}

// Calcular población objetivo (mayor de 65 años) en área de influencia
export function calculateTargetPopulation(lat, lng, radiusKm = 1) {
  const data = getNearestPostalCodeData(lat, lng);
  const baseDensity = data ? Math.max(500, data.poblacion / 2) : 5000;
  const areaKm2 = Math.PI * radiusKm * radiusKm;
  const totalPopulation = Math.floor(baseDensity * areaKm2);
  
  const elderlyPercentage = getRealElderlyPercentage(lat, lng);
  const targetPopulation = Math.floor(totalPopulation * elderlyPercentage);
  
  return {
    totalPopulation,
    targetPopulation,
    elderlyPercentage: (elderlyPercentage * 100).toFixed(1),
    areaKm2: areaKm2.toFixed(2)
  };
}

// Generar análisis completo para una ubicación
export function generateLocationAnalysis(lat, lng, locationName = 'Ubicación seleccionada') {
  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  
  if (mockDataCache.has(cacheKey)) {
    return mockDataCache.get(cacheKey);
  }
  
  const data = getNearestPostalCodeData(lat, lng);
  const population = data ? data.poblacion : 10000;
  
  // Generar competidores usando datos reales
  const competitors = generateCompetitors(lat, lng, population);
  
  // Contar por tipo
  const clinicCount = competitors.filter(c => c.tipo === 'clínica').length;
  const opticsCount = competitors.filter(c => c.tipo === 'óptica').length;
  const pharmacyCount = competitors.filter(c => c.tipo === 'farmacia').length;
  
  // Calcular métricas de área de influencia
  const influenceMetrics = calculateTargetPopulation(lat, lng, 1);
  
  // Obtener ubicaciones de Clinisord para calcular distancia
  const clinisordLocations = getClinisordLocations();
  let nearestClinisord = null;
  let minDistance = Infinity;
  
  clinisordLocations.forEach(loc => {
    const distance = calculateDistance(lat, lng, loc.lat, loc.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestClinisord = loc;
    }
  });
  
  // Calcular índice de competencia basado en datos reales
  let competitionIndex = 0;
  competitors.forEach(comp => {
    const distance = parseFloat(comp.distancia);
    if (distance < 1) {
      competitionIndex += comp.tipo === 'clínica' ? 20 : comp.tipo === 'óptica' ? 10 : 5;
    } else if (distance < 2) {
      competitionIndex += comp.tipo === 'clínica' ? 15 : comp.tipo === 'óptica' ? 7 : 3;
    } else {
      competitionIndex += comp.tipo === 'clínica' ? 10 : comp.tipo === 'óptica' ? 5 : 2;
    }
  });
  
  const analysis = {
    location: {
      name: locationName,
      lat: lat,
      lng: lng,
      estimatedPopulation: Math.floor(population)
    },
    demographics: {
      ...influenceMetrics,
      population65plus: influenceMetrics.targetPopulation,
      urbanDensity: population > 100000 ? 'Alta' : population > 50000 ? 'Media' : 'Baja'
    },
    competition: {
      totalCompetitors: competitors.length,
      clinics: clinicCount,
      optics: opticsCount,
      pharmacies: pharmacyCount,
      competitors: competitors,
      saturationLevel: clinicCount > 8 ? 'Alta' : clinicCount > 4 ? 'Media' : 'Baja',
      competitionIndex: Math.min(100, competitionIndex)
    },
    clinisord: {
      nearestCenter: nearestClinisord ? nearestClinisord.nombre : 'Ninguno cercano',
      distanceToNearest: minDistance < 100 ? minDistance.toFixed(1) : '>100',
      distanceValue: minDistance,
      cannibalizationRisk: minDistance < 2 ? 'Alto' : minDistance < 5 ? 'Medio' : 'Bajo'
    }
  };
  
  // Guardar en caché
  mockDataCache.set(cacheKey, analysis);
  
  return analysis;
}

// Generar todos los datos mock iniciales
export function generateMockData() {
  // Generar análisis para ubicaciones de Clinisord
  const clinisordLocations = getClinisordLocations();
  clinisordLocations.forEach(loc => {
    generateLocationAnalysis(loc.lat, loc.lng, loc.nombre);
  });
  
  // Generar análisis para algunas ciudades principales
  const mainCities = [
    { lat: 40.4168, lng: -3.7038, name: 'Madrid' },
    { lat: 41.3851, lng: 2.1734, name: 'Barcelona' },
    { lat: 39.4699, lng: -0.3763, name: 'Valencia' },
    { lat: 37.3828, lng: -5.9732, name: 'Sevilla' },
    { lat: 41.6528, lng: -0.8781, name: 'Zaragoza' }
  ];
  
  mainCities.forEach(city => {
    generateLocationAnalysis(city.lat, city.lng, city.name);
  });
  
  return true;
}

// Generar datos para heatmap de población mayor
export function generateHeatmapData() {
  const data = [];
  const majorCities = [
    { lat: 40.4168, lng: -3.7038, weight: 100 },
    { lat: 41.3851, lng: 2.1734, weight: 90 },
    { lat: 39.4699, lng: -0.3763, weight: 50 },
    { lat: 37.3828, lng: -5.9732, weight: 45 },
    { lat: 41.6528, lng: -0.8781, weight: 40 },
    { lat: 36.7194, lng: -4.4200, weight: 38 },
    { lat: 43.2565, lng: -2.9236, weight: 35 },
    { lat: 43.3623, lng: -8.4115, weight: 30 },
    { lat: 40.4168, lng: -3.7038, weight: 100 },
    // Añadir puntos secundarios
    { lat: 42.8125, lng: -1.6458, weight: 25 },
    { lat: 37.1773, lng: -3.5986, weight: 28 },
    { lat: 28.1248, lng: -15.4300, weight: 22 },
    { lat: 28.4636, lng: -16.2514, weight: 20 },
    { lat: 41.9983, lng: -5.6658, weight: 18 },
    { lat: 42.6000, lng: -5.5703, weight: 22 }
  ];
  
  majorCities.forEach(city => {
    // Añadir puntos dispersos alrededor de cada ciudad
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const distance = 0.1 + Math.random() * 0.3;
      data.push({
        lat: city.lat + (distance / 111) * Math.sin(angle),
        lng: city.lng + (distance / 111) * Math.cos(angle) * Math.cos(city.lat * Math.PI / 180),
        weight: city.weight * (0.5 + Math.random() * 0.5)
      });
    }
  });
  
  return data;
}

// Limpiar caché
export function clearMockDataCache() {
  mockDataCache.clear();
}
