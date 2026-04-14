// Algoritmo de puntuación de viabilidad para ubicaciones de centros Clinisord
// Este módulo implementa la lógica de negocio para evaluar la idoneidad de ubicaciones

import { generateLocationAnalysis } from './mockData';
import { calculateDistance } from './competitorData';
import { getClinisordLocations, spainPostalCodes } from './spainData';

// Pesos para cada factor (pueden ajustarse)
const WEIGHTS = {
  demographic: 0.40,    // Peso de la demografía (población objetivo)
  competition: 0.30,    // Peso del análisis de competencia
  cannibalization: 0.20, // Peso del riesgo de canibalización
  accessibility: 0.10    // Peso de la accesibilidad
};

// Factores de corrección por región
const REGIONAL_FACTORS = {
  madrid: { factor: 1.1, description: 'Madrid capital y área metropolitana' },
  barcelona: { factor: 1.05, description: 'Área metropolitana de Barcelona' },
  costa: { factor: 0.95, description: 'Zonas costeras con estacionalidad' },
  rural: { factor: 0.85, description: 'Zonas rurales o despobladas' },
  standard: { factor: 1.0, description: 'Zona estándar' }
};

// Calcular puntuación demográfica (0-100)
export function calculateDemographicScore(analysis) {
  const { targetPopulation, elderlyPercentage, urbanDensity } = analysis.demographics;
  
  // Puntuación basada en población objetivo
  let populationScore = 0;
  if (targetPopulation > 10000) populationScore = 100;
  else if (targetPopulation > 5000) populationScore = 75;
  else if (targetPopulation > 2000) populationScore = 50;
  else if (targetPopulation > 1000) populationScore = 25;
  else populationScore = 10;
  
  // Puntuación basada en porcentaje de mayores de 65
  const elderlyRate = parseFloat(analysis.demographics.elderlyPercentage);
  let elderlyScore = 0;
  if (elderlyRate > 25) elderlyScore = 100;
  else if (elderlyRate > 20) elderlyScore = 80;
  else if (elderlyRate > 15) elderlyScore = 60;
  else if (elderlyRate > 12) elderlyScore = 40;
  else if (elderlyRate > 8) elderlyScore = 20;
  else elderlyScore = 10;
  
  // Puntuación basada en densidad urbana
  let densityScore = 0;
  switch (urbanDensity) {
    case 'Alta': densityScore = 100; break;
    case 'Media': densityScore = 70; break;
    case 'Baja': densityScore = 40; break;
    default: densityScore = 30;
  }
  
  // Promedio ponderado
  return (populationScore * 0.4 + elderlyScore * 0.35 + densityScore * 0.25);
}

// Calcular puntuación de competencia (0-100)
// Menor competencia = Mayor puntuación
export function calculateCompetitionScore(analysis) {
  const { totalCompetitors, saturationLevel, competitionIndex } = analysis.competition;
  
  // Puntuación inversa al número de competidores
  let competitorScore = 0;
  if (totalCompetitors === 0) competitorScore = 100;
  else if (totalCompetitors <= 2) competitorScore = 80;
  else if (totalCompetitors <= 5) competitorScore = 60;
  else if (totalCompetitors <= 8) competitorScore = 40;
  else if (totalCompetitors <= 12) competitorScore = 20;
  else competitorScore = 10;
  
  // Puntuación basada en el nivel de saturación
  let saturationScore = 0;
  switch (saturationLevel) {
    case 'Baja': saturationScore = 100; break;
    case 'Media': saturationScore = 60; break;
    case 'Alta': saturationScore = 20; break;
    default: saturationScore = 50;
  }
  
  // Puntuación basada en el índice de competencia
  const indexScore = Math.max(0, 100 - competitionIndex);
  
  return (competitorScore * 0.4 + saturationScore * 0.35 + indexScore * 0.25);
}

// Calcular puntuación de canibalización (0-100)
// Menor proximidad a otros centros Clinisord = Mayor puntuación
export function calculateCannibalizationScore(analysis) {
  const { distanceValue, cannibalizationRisk } = analysis.clinisord;
  
  // Puntuación basada en distancia al centro más cercano
  let distanceScore = 0;
  if (distanceValue > 20) distanceScore = 100;
  else if (distanceValue > 10) distanceScore = 85;
  else if (distanceValue > 5) distanceScore = 70;
  else if (distanceValue > 3) distanceScore = 50;
  else if (distanceValue > 2) distanceScore = 30;
  else if (distanceValue > 1) distanceScore = 15;
  else distanceScore = 5;
  
  // Puntuación basada en el nivel de riesgo
  let riskScore = 0;
  switch (cannibalizationRisk) {
    case 'Bajo': riskScore = 100; break;
    case 'Medio': riskScore = 60; break;
    case 'Alto': riskScore = 20; break;
    default: riskScore = 50;
  }
  
  return (distanceScore * 0.6 + riskScore * 0.4);
}

// Calcular puntuación de accesibilidad (0-100)
export function calculateAccessibilityScore(lat, lng) {
  // Simulado - en producción usaría datos de Google Maps API
  const score = 70 + Math.random() * 25;
  return score;
}

// Calcular viabilidad total (0-100)
export function calculateViabilityScore(lat, lng, locationName = 'Ubicación') {
  // Validación geográfica básica: comprobar si estamos cerca de tierra firme/zonas conocidas
  let minDistanceToCivilization = Infinity;
  for (const cp in spainPostalCodes) {
    const cpData = spainPostalCodes[cp];
    const dist = calculateDistance(lat, lng, cpData.lat, cpData.lng);
    if (dist < minDistanceToCivilization) minDistanceToCivilization = dist;
  }
  
  // Si está a más de 30km de cualquier código postal en nuestra BD, lo consideramos inválido o mar
  if (minDistanceToCivilization > 30) {
    return {
      score: 0,
      breakdown: { demographic: 0, competition: 0, cannibalization: 0, accessibility: 0 },
      category: 'ZONA NO VÁLIDA',
      recommendation: 'Ubicación en el mar o fuera del área de servicio. Por favor, selecciona una zona terrestre y poblada.',
      color: '#94a3b8',
      icon: 'x-circle',
      analysis: null,
      isInvalid: true
    };
  }

  // Generar análisis para la ubicación
  const analysis = generateLocationAnalysis(lat, lng, locationName);
  
  // Calcular puntuaciones individuales
  const demographicScore = calculateDemographicScore(analysis);
  const competitionScore = calculateCompetitionScore(analysis);
  const cannibalizationScore = calculateCannibalizationScore(analysis);
  const accessibilityScore = calculateAccessibilityScore(lat, lng);
  
  // Calcular puntuación total
  const totalScore = (
    demographicScore * WEIGHTS.demographic +
    competitionScore * WEIGHTS.competition +
    cannibalizationScore * WEIGHTS.cannibalization +
    accessibilityScore * WEIGHTS.accessibility
  );
  
  // Determinar categoría y recomendación
  const result = categorizeViability(totalScore);
  
  return {
    score: Math.round(totalScore),
    breakdown: {
      demographic: Math.round(demographicScore),
      competition: Math.round(competitionScore),
      cannibalization: Math.round(cannibalizationScore),
      accessibility: Math.round(accessibilityScore)
    },
    category: result.category,
    recommendation: result.recommendation,
    color: result.color,
    icon: result.icon,
    analysis: analysis
  };
}

// Categorizar el resultado de viabilidad
export function categorizeViability(score) {
  if (score >= 80) {
    return {
      category: 'ALTA VIABILIDAD',
      recommendation: 'Ubicación altamente recomendada. Alta población objetivo y baja competencia.',
      color: '#10b981', // Emerald 500
      icon: 'check-circle'
    };
  } else if (score >= 60) {
    return {
      category: 'VIABILIDAD MEDIA',
      recommendation: 'Ubicación aceptable. Requiere análisis adicional de factores locales.',
      color: '#f59e0b', // Amber 500
      icon: 'alert-circle'
    };
  } else if (score >= 40) {
    return {
      category: 'RIESGO MODERADO',
      recommendation: 'Atención requerida. Considerar competencia y demografía antes de decidir.',
      color: '#f97316', // Orange 500
      icon: 'alert-triangle'
    };
  } else {
    return {
      category: 'ALTO RIESGO',
      recommendation: 'No recomendada. La zona presenta condiciones desfavorables para un nuevo centro.',
      color: '#ef4444', // Red 500
      icon: 'x-circle'
    };
  }
}

// Estimar captación mensual de pacientes
export function estimateMonthlyCaptures(analysis) {
  const { targetPopulation } = analysis.demographics;
  const { totalCompetitors } = analysis.competition;
  
  // Supuestos de mercado:
  // - Prevalencia de hipoacusia en >65 años: ~30%
  // - Porcentaje que busca solución: ~40%
  // - Cuota de mercado objetivo: 5-15% dependiendo de competencia
  
  const estimatedHipoacusia = Math.floor(targetPopulation * 0.30);
  const estimatedDemand = Math.floor(estimatedHipoacusia * 0.40);
  
  // Factor de competencia
  const competitionFactor = Math.max(0.05, 0.15 - (totalCompetitors * 0.015));
  
  const estimatedCaptures = Math.floor(estimatedDemand * competitionFactor);
  
  // Rango realista
  return {
    conservative: Math.floor(estimatedCaptures * 0.7),
    expected: estimatedCaptures,
    optimistic: Math.floor(estimatedCaptures * 1.4),
    marketDemand: estimatedDemand,
    potentialPatients: estimatedHipoacusia
  };
}

// Calcular área de influencia (isócrona simplificada)
export function calculateInfluenceArea(lat, lng, travelTimeMinutes = 10, mode = 'walking') {
  // Velocidades promedio:
  // - Walking: 5 km/h
  // - Driving: 30 km/h en ciudad
  
  const speeds = {
    walking: 5 / 60, // km por minuto
    driving: 30 / 60
  };
  
  const speed = speeds[mode] || speeds.walking;
  const radiusKm = travelTimeMinutes * speed;
  
  // Calcular población en el área (simplificado)
  const analysis = generateLocationAnalysis(lat, lng, 'Área de influencia');
  
  // Ajustar población por radio
  const baseRadius = 1; // km (radio base de generateLocationAnalysis)
  const populationRatio = (radiusKm * radiusKm) / (baseRadius * baseRadius);
  const adjustedPopulation = Math.floor(analysis.demographics.totalPopulation * populationRatio);
  const adjustedTarget = Math.floor(analysis.demographics.targetPopulation * populationRatio);
  
  return {
    radiusKm: radiusKm.toFixed(2),
    travelTimeMinutes,
    mode,
    totalPopulation: adjustedPopulation,
    targetPopulation: adjustedTarget,
    area: (Math.PI * radiusKm * radiusKm).toFixed(2)
  };
}

// Generar reporte completo de viabilidad
export function generateViabilityReport(lat, lng, locationName) {
  const viability = calculateViabilityScore(lat, lng, locationName);
  const captures = estimateMonthlyCaptures(viability.analysis);
  const influence = calculateInfluenceArea(lat, lng, 10, 'walking');
  
  return {
    location: {
      name: locationName,
      coordinates: { lat: lat.toFixed(5), lng: lng.toFixed(5) }
    },
    viability: {
      score: viability.score,
      category: viability.category,
      recommendation: viability.recommendation,
      color: viability.color
    },
    demographics: {
      population: viability.analysis.demographics.totalPopulation,
      targetPopulation: viability.analysis.demographics.targetPopulation,
      elderlyPercentage: viability.analysis.demographics.elderlyPercentage
    },
    competition: {
      totalCompetitors: viability.analysis.competition.totalCompetitors,
      clinics: viability.analysis.competition.clinics,
      optics: viability.analysis.competition.optics,
      pharmacies: viability.analysis.competition.pharmacies,
      saturation: viability.analysis.competition.saturationLevel
    },
    captures: {
      monthlyExpected: captures.expected,
      monthlyRange: `${captures.conservative} - ${captures.optimistic}`,
      annualProjection: captures.expected * 12
    },
    influence: {
      radius: influence.radiusKm,
      population: influence.totalPopulation,
      targetPopulation: influence.targetPopulation
    },
    clinisord: {
      nearestCenter: viability.analysis.clinisord.nearestCenter,
      distance: viability.analysis.clinisord.distanceToNearest
    },
    generatedAt: new Date().toISOString()
  };
}

// Ajustar pesos del algoritmo
export function setWeights(newWeights) {
  Object.assign(WEIGHTS, newWeights);
}

// Obtener pesos actuales
export function getWeights() {
  return { ...WEIGHTS };
}
