// ============================================================
// competitorIntelligence.js
// Motor de Inteligencia Competitiva — Clinisord GeoStrategy
// Datos curados + análisis estratégico | Actualizado: Abril 2026
// ============================================================

import { getCompetitorsInArea, calculateDistance } from './competitorData';
import { COMPETITOR_PROFILES_EXTENDED } from './competitorProfilesExtended';


// -------------------------------------------------------
// PERFILES CURADOS DE CADENAS COMPETIDORAS
// -------------------------------------------------------

export const COMPETITOR_PROFILES = COMPETITOR_PROFILES_EXTENDED;

// -------------------------------------------------------
// PERFIL DE CLINISORD (para comparativas)
// -------------------------------------------------------

export const CLINISORD_PROFILE = {
  id: 'clinisord',
  nombre: 'Centro Social del Audífono (Clinisord)',
  tipo: 'Centro auditivo especializado con enfoque social',
  propietario: 'Clinisord',
  descripcion: 'Centro auditivo con enfoque en el paciente y su entorno social. Especialización clínica combinada con acompañamiento sociocomunitario.',
  servicios: {
    audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
    adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
    audifonosInfantiles: { disponible: true, precio: 'Variable', nota: '' },
    teleaudiologia: { disponible: true, precio: 'Incluida', nota: '✅ Ventaja diferencial' },
    seguroAuditivo: { disponible: true, precio: 'Variable', nota: '' },
    financiacion: { disponible: true, precio: '0%', nota: '' },
    reparaciones: { disponible: true, precio: '40-100€', nota: '' },
    rehabilitacionAuditiva: { disponible: true, precio: 'Avanzada — Incluida', nota: '✅ Ventaja diferencial' },
    servicioSocial: { disponible: true, precio: 'Incluido', nota: '✅ Ventaja diferencial única en el mercado' },
    seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: 'Historia clínica propia, audiólogo de referencia' },
  },
  precios: {
    audiometria: { min: 0, max: 0, display: 'Gratuita' },
    audifonos: {
      gama_basica: { min: 650, max: 1300, display: '650€ – 1.300€' },
      gama_media: { min: 1400, max: 2800, display: '1.400€ – 2.800€' },
      gama_alta: { min: 2800, max: 5500, display: '2.800€ – 5.500€' },
    },
    revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
  },
  ventajasCompetitivas: [
    'Único centro con servicio social integrado en el área',
    'Teleaudiología: seguimiento remoto sin necesidad de desplazamiento',
    'Programa de rehabilitación auditiva avanzado',
    'Audiólogo de referencia personal para cada paciente',
    'Implicación de la familia en el proceso de adaptación',
    'Precio de gama básica inferior a GAES, Afflelou y ECI',
    'Conectado con servicios municipales y redes de apoyo',
  ],
};

// -------------------------------------------------------
// FUNCIONES DE ANÁLISIS
// -------------------------------------------------------

/**
 * Obtiene el perfil completo de un competidor por ID
 */
export function getCompetitorProfile(chainId) {
  return COMPETITOR_PROFILES[chainId] || null;
}

/**
 * Lista todos los perfiles de competidores
 */
export function getAllCompetitorProfiles() {
  return Object.values(COMPETITOR_PROFILES);
}

/**
 * Calcula cuota de mercado estimada para una ciudad
 * basándose en número de centros por cadena (OSM data)
 */
export function calculateMarketShare(competitorsInArea, clinisordCount = 1) {
  if (!competitorsInArea || competitorsInArea.length === 0) return [];

  const chainCounts = {};
  competitorsInArea.forEach(comp => {
    chainCounts[comp.cadena] = (chainCounts[comp.cadena] || 0) + 1;
  });

  // Usamos el conteo real en lugar de estimar el 10%
  const total = Object.values(chainCounts).reduce((a, b) => a + b, 0);
  
  const allEntries = { ...chainCounts, clinisord: clinisordCount };
  const totalWithClinisord = total + clinisordCount;

  return Object.entries(allEntries).map(([chainId, count]) => {
    const profile = COMPETITOR_PROFILES[chainId];
    return {
      chainId,
      nombre: chainId === 'clinisord' ? 'Clinisord' : (profile?.nombre || chainId),
      centros: count,
      cuota: Math.round((count / totalWithClinisord) * 100),
      color: chainId === 'clinisord' ? '#0ea5e9' : (profile?.color || '#94a3b8'),
    };
  }).sort((a, b) => b.cuota - a.cuota);
}

/**
 * Identifica competidores vulnerables en un área (oportunidades)
 */
export function identifyVulnerableCompetitors(competitorsInArea) {
  return competitorsInArea.filter(comp => {
    const profile = COMPETITOR_PROFILES[comp.cadena];
    if (!profile) return false;
    // Vulnerable si rating bajo Y tiene debilidades de servicio
    return profile.ratings?.google?.promedio < 4.1;
  }).map(comp => {
    const profile = COMPETITOR_PROFILES[comp.cadena];
    return {
      ...comp,
      vulnerabilidades: profile.vulnerabilidades || [],
      rating: profile.ratings?.google?.promedio,
      ratingRange: `${profile.ratings?.google?.min} – ${profile.ratings?.google?.max}⭐`,
    };
  });
}

/**
 * Calcula el potencial de mercado capturable en un área (%)
 * Basado en vulnerabilidades de competidores y vacíos de servicio
 */
export function getStealableMarketShare(lat, lng, radiusKm = 3) {
  const competitors = getCompetitorsInArea(lat, lng, radiusKm);
  const total = competitors.length;
  if (total === 0) return { porcentaje: 0, potencialPacientes: 0, razon: 'Sin competidores en el área' };

  let capturable = 0;
  competitors.forEach(comp => {
    const profile = COMPETITOR_PROFILES[comp.cadena];
    if (!profile) { capturable += 0.15; return; }
    const rating = profile.ratings?.google?.promedio || 4.0;
    if (rating < 3.8) capturable += 0.35;
    else if (rating < 4.0) capturable += 0.25;
    else if (rating < 4.2) capturable += 0.15;
    else capturable += 0.08;
    // Bonus si no tienen teleaudiología o servicio social
    if (!profile.servicios.teleaudiologia.disponible) capturable += 0.05;
    if (!profile.servicios.servicioSocial.disponible) capturable += 0.08;
  });

  const porcentaje = Math.min(40, Math.round((capturable / total) * 100));
  return {
    porcentaje,
    competidoresAnalizados: total,
    razon: `${total} competidores en radio de ${radiusKm}km analizados`,
  };
}

/**
 * Genera recomendaciones estratégicas accionables basadas en el análisis de viabilidad
 */
export function generateStrategicRecommendations(lat, lng, viabilityData) {
  const recommendations = [];
  const competitors = getCompetitorsInArea(lat, lng, 3);

  // R1: Competidor con bajo rating cerca
  const vulnerable = identifyVulnerableCompetitors(competitors.slice(0, 5));
  if (vulnerable.length > 0) {
    const worst = vulnerable.sort((a, b) => a.rating - b.rating)[0];
    recommendations.push({
      tipo: 'oportunidad',
      prioridad: 1,
      icono: '⭐',
      titulo: 'Competidor con baja valoración cerca',
      descripcion: `${worst.nombre || worst.cadena} (${worst.ratingRange}) está a ${worst.distancia}km — sus clientes insatisfechos son captables.`,
      accion: 'Lanzar campaña de captación local: "¿Cambias de centro? Período de prueba gratuito"',
    });
  }

  // R2: Zona sin teleaudiología
  const sinTeleaudiologia = competitors.filter(c => {
    const p = COMPETITOR_PROFILES[c.cadena];
    return p && !p.servicios.teleaudiologia.disponible;
  });
  if (sinTeleaudiologia.length === competitors.length && competitors.length > 0) {
    recommendations.push({
      tipo: 'diferenciacion',
      prioridad: 2,
      icono: '📱',
      titulo: 'Vacío de teleaudiología en la zona',
      descripcion: 'Ningún competidor en el área ofrece seguimiento remoto. Alta oportunidad para pacientes con movilidad limitada.',
      accion: 'Promovar activamente el servicio de teleaudiología como único en la zona. Publicidad dirigida a mayores de 65.',
    });
  }

  // R3: Sin servicio social
  const sinServicioSocial = competitors.filter(c => {
    const p = COMPETITOR_PROFILES[c.cadena];
    return p && !p.servicios.servicioSocial.disponible;
  });
  if (sinServicioSocial.length === competitors.length && competitors.length > 0) {
    recommendations.push({
      tipo: 'diferenciacion',
      prioridad: 3,
      icono: '🤝',
      titulo: 'Clinisord es el único con servicio social',
      descripcion: 'Ningún competidor en este área integra orientación social ni apoyo familiar.',
      accion: 'Contactar con servicios sociales municipales, asociaciones de mayores y centros de día para derivaciones',
    });
  }

  // R4: Muchos independientes (cuota atomizada)
  const independientes = competitors.filter(c => c.cadena === 'Independiente');
  if (independientes.length >= 3) {
    recommendations.push({
      tipo: 'consolidacion',
      prioridad: 4,
      icono: '🎯',
      titulo: 'Mercado atomizado en independientes',
      descripcion: `${independientes.length} centros independientes en el área. Mercado fragmentado = oportunidad de consolidación.`,
      accion: 'Campaña de marca: "La seguridad de una red, el trato de siempre". Énfasis en continuidad y respaldo.',
    });
  }

  // R5: Sin competidores en el área
  if (competitors.length === 0) {
    recommendations.push({
      tipo: 'expansion',
      prioridad: 1,
      icono: '🚀',
      titulo: 'Área sin competencia directa',
      descripcion: 'No hay centros auditivos en un radio de 3km. Potencial de ser el primer operador en la zona.',
      accion: 'Prioridad máxima de apertura. Campaña de sensibilización auditiva para generar demanda latente.',
    });
  }

  // R6: GAES en la zona (el mayor competidor)
  const gaesEnZona = competitors.filter(c => c.cadena === 'gaes');
  if (gaesEnZona.length > 0) {
    const closest = gaesEnZona[0];
    recommendations.push({
      tipo: 'competencia',
      prioridad: 5,
      icono: '⚡',
      titulo: 'GAES presente en la zona',
      descripcion: `Centro GAES a ${closest.distancia}km. Son el líder del mercado pero con puntos débiles explotables.`,
      accion: 'Estrategia diferencial: "Somos la alternativa personalizada a GAES". Aprovechar insatisfacción de clientes masificados.',
    });
  }

  return recommendations.sort((a, b) => a.prioridad - b.prioridad);
}

/**
 * Genera tabla comparativa de servicios entre todos los competidores y Clinisord
 */
export function generateServiceComparison() {
  const serviciosKeys = [
    { key: 'audiometria', label: 'Audiometría diagnóstica' },
    { key: 'adaptacionAudifonos', label: 'Adaptación de audífonos' },
    { key: 'audifonosInfantiles', label: 'Audiología infantil' },
    { key: 'teleaudiologia', label: 'Teleaudiología / Seguimiento remoto' },
    { key: 'seguroAuditivo', label: 'Seguro auditivo' },
    { key: 'financiacion', label: 'Financiación' },
    { key: 'reparaciones', label: 'Reparaciones y mantenimiento' },
    { key: 'rehabilitacionAuditiva', label: 'Rehabilitación auditiva' },
    { key: 'servicioSocial', label: 'Orientación social y familiar' },
    { key: 'seguimientoPersonalizado', label: 'Audiólogo de referencia personal' },
  ];

  const competidores = Object.values(COMPETITOR_PROFILES);

  return {
    servicios: serviciosKeys,
    competidores: competidores,
    clinisord: CLINISORD_PROFILE,
  };
}

/**
 * Genera análisis DAFO simplificado para una cadena
 */
export function getDAFOAnalysis(chainId) {
  const profile = COMPETITOR_PROFILES[chainId];
  if (!profile) return null;

  return {
    debilidades: profile.puntosDebiles,
    // Amenazas para Clinisord provenientes de este competidor
    amenazas: [
      profile.cuotaMercadoEstimada > 25
        ? 'Alta cuota de mercado y reconocimiento de marca'
        : null,
      profile.precios?.audifonos?.gama_basica?.min < 700
        ? 'Precio de entrada muy bajo como gancho'
        : null,
      profile.servicios.financiacion.disponible
        ? 'Ofrece financiación competitiva'
        : null,
    ].filter(Boolean),
    fortalezas: profile.puntosFuertes,
    oportunidades: profile.vulnerabilidades.map(v => v.oportunidadClinosord),
  };
}

/**
 * Calcula el índice de oportunidad estratégica (0-100) para una ubicación.
 * Usado en el algoritmo de viabilidad como factor adicional.
 */
export function calculateStrategicOpportunityScore(lat, lng) {
  const competitors = getCompetitorsInArea(lat, lng, 3);
  let score = 50; // Base

  if (competitors.length === 0) return 95; // Sin competencia

  const vulnerable = identifyVulnerableCompetitors(competitors);
  score += vulnerable.length * 8;

  const sinTeleau = competitors.filter(c => {
    const p = COMPETITOR_PROFILES[c.cadena];
    return p && !p.servicios.teleaudiologia.disponible;
  });
  if (sinTeleau.length === competitors.length) score += 15;

  const sinSocial = competitors.filter(c => {
    const p = COMPETITOR_PROFILES[c.cadena];
    return p && !p.servicios.servicioSocial.disponible;
  });
  if (sinSocial.length === competitors.length) score += 15;

  return Math.min(100, Math.max(0, Math.round(score)));
}
