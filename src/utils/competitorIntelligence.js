// ============================================================
// competitorIntelligence.js
// Motor de Inteligencia Competitiva — Clinisord GeoStrategy
// Datos curados + análisis estratégico | Actualizado: Abril 2026
// ============================================================

import { getCompetitorsInArea, calculateDistance } from './competitorData';

export const COMPETITOR_PROFILES = {
  gaes: {
    id: 'gaes',
    nombre: 'GAES (Amplifon)',
    tipo: 'Cadena multinacional',
    propietario: 'Amplifon SpA (Italia)',
    presenciaEspana: '~500 centros',
    cuotaMercadoEstimada: 35,
    color: '#ef4444',
    descripcion: 'Líder del mercado español de audiología. Modelo centrado en volumen y precio competitivo.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida' },
      audifonosInfantiles: { disponible: true, precio: 'Variable' },
      teleaudiologia: { disponible: false, precio: null },
      seguroAuditivo: { disponible: true, precio: '~8€/mes' },
      financiacion: { disponible: true, precio: '0% hasta 36 meses' },
      reparaciones: { disponible: true, precio: '50-150€' },
      rehabilitacionAuditiva: { disponible: true, precio: 'Básica' },
      servicioSocial: { disponible: false, precio: null },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 800, max: 1600, display: '800€ – 1.600€', marcas: ['Amplifon Stride'] },
        gama_media: { min: 1600, max: 3200, display: '1.600€ – 3.200€', marcas: ['Amplifon Oria'] },
        gama_alta: { min: 3200, max: 6500, display: '3.200€ – 6.500€', marcas: ['Signia AX'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Mayor red de centros en España (~500)',
      'Marca altamente reconocida',
      'Financiación flexible hasta 36 meses',
    ],
    puntosDebiles: [
      'Atención masificada y poco personalizada',
      'Sin teleaudiología ni servicios sociales',
      'Alta rotación de personal',
    ],
    vulnerabilidades: [
      { tipo: 'servicio', titulo: 'Sin teleaudiología', descripcion: 'No ofrecen seguimiento remoto', oportunidadClinosord: 'Captar pacientes con movilidad limitada con teleaudiología' },
      { tipo: 'calidad', titulo: 'Atención impersonal por volumen', descripcion: 'Modelo retail masivo reduce calidad', oportunidadClinosord: 'Posicionarse como la alternativa humana y cercana' },
      { tipo: 'social', titulo: 'Sin integración social', descripcion: 'No conectan con redes de apoyo', oportunidadClinosord: 'Centro Social del Audífono: implicar familias y servicios municipales' },
    ],
    ratings: { google: { min: 3.7, max: 4.3, promedio: 4.0 }, fuente: 'Observación 2024' },
  },

  audical: {
    id: 'audical',
    nombre: 'Audical',
    tipo: 'Cadena nacional especializada',
    propietario: 'Grupo Audika (Francia)',
    presenciaEspana: '~200 centros',
    cuotaMercadoEstimada: 18,
    color: '#f97316',
    descripcion: 'Segunda cadena especializada en España. Fuerte en Cataluña y Levante.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida' },
      audifonosInfantiles: { disponible: true, precio: 'Variable' },
      teleaudiologia: { disponible: false, precio: null },
      seguroAuditivo: { disponible: true, precio: 'Variable' },
      financiacion: { disponible: true, precio: '0% hasta 24 meses' },
      reparaciones: { disponible: true, precio: '40-120€' },
      rehabilitacionAuditiva: { disponible: true, precio: 'Básica' },
      servicioSocial: { disponible: false, precio: null },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 750, max: 1500, display: '750€ – 1.500€', marcas: ['Phonak Belong'] },
        gama_media: { min: 1500, max: 3000, display: '1.500€ – 3.000€', marcas: ['Phonak Audéo'] },
        gama_alta: { min: 3000, max: 5800, display: '3.000€ – 5.800€', marcas: ['Phonak Lumity'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: ['Mejor relación calidad-precio que GAES', 'Personal más estable'],
    puntosDebiles: ['Menor reconocimiento de marca', 'Sin teleaudiología ni servicios sociales'],
    vulnerabilidades: [
      { tipo: 'brand', titulo: 'Baja notoriedad de marca', descripcion: 'Menos reconocida que GAES', oportunidadClinosord: 'Clinisord como el especialista local de confianza' },
    ],
    ratings: { google: { min: 3.9, max: 4.4, promedio: 4.1 }, fuente: 'Observación 2024' },
  },

  afflelou_acoustics: {
    id: 'afflelou_acoustics',
    nombre: 'Alain Afflelou Acoustics',
    tipo: 'Óptica con depto. de audiología',
    propietario: 'Grupo Alain Afflelou (Francia)',
    presenciaEspana: '~100 centros (dentro de ópticas)',
    cuotaMercadoEstimada: 8,
    color: '#3b82f6',
    descripcion: 'División de audiología de la cadena de ópticas. Modelo one-stop shop visual+auditivo.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida' },
      audifonosInfantiles: { disponible: true, precio: 'Variable' },
      teleaudiologia: { disponible: false, precio: null },
      seguroAuditivo: { disponible: true, precio: 'Variable' },
      financiacion: { disponible: true, precio: '0%' },
      reparaciones: { disponible: true, precio: '60-160€' },
      rehabilitacionAuditiva: { disponible: false, precio: null },
      servicioSocial: { disponible: false, precio: null },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 900, max: 1800, display: '900€ – 1.800€', marcas: ['GN Hearing'] },
        gama_media: { min: 1800, max: 3500, display: '1.800€ – 3.500€', marcas: ['GN ReSound'] },
        gama_alta: { min: 3500, max: 7000, display: '3.500€ – 7.000€', marcas: ['GN ReSound Nexia'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: ['Aprovecha tráfico de óptica', 'Marca reconocida en retail'],
    puntosDebiles: ['No son percibidos como especialistas en audiología', 'Precios por encima de la media'],
    vulnerabilidades: [
      { tipo: 'especialización', titulo: 'No son percibidos como especialistas', descripcion: 'El cliente valora a un especialista para la audición', oportunidadClinosord: 'Enfatizar la especialización de Clinisord frente al modelo genérico' },
    ],
    ratings: { google: { min: 3.8, max: 4.2, promedio: 4.0 }, fuente: 'Observación 2024' },
  },

  specsavers: {
    id: 'specsavers',
    nombre: 'Specsavers Audiología',
    tipo: 'Óptica con depto. de audiología',
    propietario: 'Specsavers (Reino Unido)',
    presenciaEspana: '~50 centros (dentro de ópticas)',
    cuotaMercadoEstimada: 5,
    color: '#10b981',
    descripcion: 'División de audiología de la cadena óptica británica. Modelo agresivo en precio.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida' },
      audifonosInfantiles: { disponible: false, precio: null },
      teleaudiologia: { disponible: false, precio: null },
      seguroAuditivo: { disponible: false, precio: null },
      financiacion: { disponible: true, precio: '0% hasta 12 meses' },
      reparaciones: { disponible: true, precio: '30-100€' },
      rehabilitacionAuditiva: { disponible: false, precio: null },
      servicioSocial: { disponible: false, precio: null },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 695, max: 1200, display: '695€ – 1.200€', marcas: ['Specsavers Own Brand'] },
        gama_media: { min: 1200, max: 2400, display: '1.200€ – 2.400€', marcas: ['Widex'] },
        gama_alta: { min: 2400, max: 4800, display: '2.400€ – 4.800€', marcas: ['Widex Moment'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: ['Precio de entrada más bajo del mercado (~695€)'],
    puntosDebiles: ['Calidad percibida como básica', 'Sin servicios complementarios'],
    vulnerabilidades: [
      { tipo: 'calidad', titulo: 'Percepción de marca low-cost', descripcion: 'En salud, precio bajo genera desconfianza', oportunidadClinosord: 'Posicionarse como equilibrio óptimo: servicio premium a precio justo' },
    ],
    ratings: { google: { min: 4.0, max: 4.5, promedio: 4.2 }, fuente: 'Observación 2024' },
  },

  el_corte_ingles: {
    id: 'el_corte_ingles',
    nombre: 'El Corte Inglés — Clínica de Audición',
    tipo: 'Gran almacén con servicio auditivo',
    propietario: 'El Corte Inglés S.A.',
    presenciaEspana: '~30 centros (dentro de ECI)',
    cuotaMercadoEstimada: 4,
    color: '#6366f1',
    descripcion: 'Servicio auditivo dentro de los grandes almacenes ECI. Clientela de alto poder adquisitivo.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida' },
      audifonosInfantiles: { disponible: true, precio: 'Variable' },
      teleaudiologia: { disponible: false, precio: null },
      seguroAuditivo: { disponible: false, precio: null },
      financiacion: { disponible: true, precio: '0% hasta 36 meses' },
      reparaciones: { disponible: true, precio: '80-200€' },
      rehabilitacionAuditiva: { disponible: false, precio: null },
      servicioSocial: { disponible: false, precio: null },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 1000, max: 2000, display: '1.000€ – 2.000€', marcas: ['Widex'] },
        gama_media: { min: 2000, max: 4000, display: '2.000€ – 4.000€', marcas: ['Phonak'] },
        gama_alta: { min: 4000, max: 8000, display: '4.000€ – 8.000€', marcas: ['Oticon Real'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: ['Clientela de alto poder adquisitivo', 'Imagen de marca de confianza'],
    puntosDebiles: ['Precios muy elevados', 'Cobertura muy limitada'],
    vulnerabilidades: [
      { tipo: 'precio', titulo: 'Precios muy superiores a la media', descripcion: 'Gama básica desde 1.000€', oportunidadClinosord: 'Captar clientes desencantados por el precio alto' },
    ],
    ratings: { google: { min: 4.1, max: 4.6, promedio: 4.3 }, fuente: 'Observación 2024' },
  },

  independiente: {
    id: 'independiente',
    nombre: 'Centro Auditivo Independiente',
    tipo: 'Independiente',
    propietario: 'Varios (propietarios locales)',
    presenciaEspana: '~2.000+ centros',
    cuotaMercadoEstimada: 25,
    color: '#8b5cf6',
    descripcion: 'Red atomizada de centros independientes. Gran variabilidad de calidad y precios.',
    servicios: {
      audiometria: { disponible: true, precio: 'Variable (0-60€)' },
      adaptacionAudifonos: { disponible: true, precio: 'Variable' },
      audifonosInfantiles: { disponible: true, precio: 'Variable' },
      teleaudiologia: { disponible: false, precio: null },
      seguroAuditivo: { disponible: false, precio: null },
      financiacion: { disponible: true, precio: 'Variable' },
      reparaciones: { disponible: true, precio: '30-120€' },
      rehabilitacionAuditiva: { disponible: false, precio: null },
      servicioSocial: { disponible: false, precio: null },
      seguimientoPersonalizado: { disponible: true, precio: 'Variable' },
    },
    precios: {
      audiometria: { min: 0, max: 60, display: 'Gratuita – 60€' },
      audifonos: {
        gama_basica: { min: 500, max: 1400, display: '500€ – 1.400€', marcas: ['Variable'] },
        gama_media: { min: 1200, max: 2800, display: '1.200€ – 2.800€', marcas: ['Variable'] },
        gama_alta: { min: 2500, max: 6000, display: '2.500€ – 6.000€', marcas: ['Variable'] },
      },
      revision: { min: 0, max: 100, display: '0€ – 100€ (variable)' },
    },
    puntosFuertes: ['Trato muy cercano', 'Precio de básica más bajo', 'Flexibilidad de negociación'],
    puntosDebiles: ['Gran variabilidad de calidad', 'Sin respaldo de marca', 'Riesgo de cierre'],
    vulnerabilidades: [
      { tipo: 'confianza', titulo: 'Sin respaldo de marca ni red', descripcion: 'El paciente no sabe si el centro cerrará', oportunidadClinosord: 'Ofrecer calidez del trato cercano CON seguridad de una red' },
    ],
    ratings: { google: { min: 3.5, max: 4.8, promedio: 4.1 }, fuente: 'Alta variabilidad — promedio estimado' },
  },

  farmacia_auditiva: {
    id: 'farmacia_auditiva',
    nombre: 'Farmacias con Servicio Auditivo',
    tipo: 'Farmacia con servicio complementario',
    propietario: 'Varios',
    presenciaEspana: '~500 farmacias (estimado)',
    cuotaMercadoEstimada: 3,
    color: '#059669',
    descripcion: 'Segmento emergente de farmacias que ofrecen audífonos OTC de bajo coste.',
    servicios: {
      audiometria: { disponible: true, precio: 'Básica (screening)' },
      adaptacionAudifonos: { disponible: false, precio: null },
      audifonosInfantiles: { disponible: false, precio: null },
      teleaudiologia: { disponible: false, precio: null },
      seguroAuditivo: { disponible: false, precio: null },
      financiacion: { disponible: false, precio: null },
      reparaciones: { disponible: false, precio: null },
      rehabilitacionAuditiva: { disponible: false, precio: null },
      servicioSocial: { disponible: false, precio: null },
      seguimientoPersonalizado: { disponible: false, precio: null },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita (screening básico)' },
      audifonos: {
        gama_basica: { min: 200, max: 600, display: '200€ – 600€ (OTC, sin adaptación)', marcas: ['OTC genérico'] },
        gama_media: { min: null, max: null, display: 'No disponible' },
        gama_alta: { min: null, max: null, display: 'No disponible' },
      },
      revision: { min: null, max: null, display: 'No aplica' },
    },
    puntosFuertes: ['Precio muy bajo en gama OTC', 'Alta accesibilidad'],
    puntosDebiles: ['Sin audiólogos especializados', 'Solo gama básica OTC'],
    vulnerabilidades: [
      { tipo: 'derivación', titulo: 'Canal de derivación potencial', descripcion: 'Las farmacias no pueden atender casos complejos', oportunidadClinosord: 'Establecer acuerdos de derivación con farmacias locales' },
    ],
    ratings: { google: { min: 4.0, max: 4.8, promedio: 4.3 }, fuente: 'Rating farmacia general' },
  },
};

export const CLINISORD_PROFILE = {
  id: 'clinisord',
  nombre: 'Centro Social del Audífono (Clinisord)',
  tipo: 'Centro auditivo especializado con enfoque social',
  descripcion: 'Centro auditivo con enfoque en el paciente y su entorno social.',
  servicios: {
    audiometria: { disponible: true, precio: 'Gratuita' },
    adaptacionAudifonos: { disponible: true, precio: 'Incluida' },
    audifonosInfantiles: { disponible: true, precio: 'Variable' },
    teleaudiologia: { disponible: true, precio: 'Incluida' },
    seguroAuditivo: { disponible: true, precio: 'Variable' },
    financiacion: { disponible: true, precio: '0%' },
    reparaciones: { disponible: true, precio: '40-100€' },
    rehabilitacionAuditiva: { disponible: true, precio: 'Avanzada — Incluida' },
    servicioSocial: { disponible: true, precio: 'Incluido' },
    seguimientoPersonalizado: { disponible: true, precio: 'Incluido' },
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
    'Teleaudiología: seguimiento remoto sin desplazamiento',
    'Programa de rehabilitación auditiva avanzado',
    'Audiólogo de referencia personal para cada paciente',
    'Precio de gama básica inferior a GAES, Afflelou y ECI',
  ],
};

export function getCompetitorProfile(chainId) {
  return COMPETITOR_PROFILES[chainId] || null;
}

export function getAllCompetitorProfiles() {
  return Object.values(COMPETITOR_PROFILES);
}

export function calculateMarketShare(competitorsInArea) {
  if (!competitorsInArea || competitorsInArea.length === 0) return [];
  const chainCounts = {};
  competitorsInArea.forEach(comp => {
    chainCounts[comp.cadena] = (chainCounts[comp.cadena] || 0) + 1;
  });
  const total = Object.values(chainCounts).reduce((a, b) => a + b, 0);
  const clinisordEstimated = Math.max(1, Math.round(total * 0.1));
  const allEntries = { ...chainCounts, clinisord: clinisordEstimated };
  const totalWithClinisord = total + clinisordEstimated;
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

export function identifyVulnerableCompetitors(competitorsInArea) {
  return competitorsInArea.filter(comp => {
    const profile = COMPETITOR_PROFILES[comp.cadena];
    if (!profile) return false;
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
    if (!profile.servicios.teleaudiologia.disponible) capturable += 0.05;
    if (!profile.servicios.servicioSocial.disponible) capturable += 0.08;
  });
  const porcentaje = Math.min(40, Math.round((capturable / total) * 100));
  return { porcentaje, competidoresAnalizados: total, razon: `${total} competidores en radio de ${radiusKm}km` };
}

export function generateStrategicRecommendations(lat, lng, viabilityData) {
  const recommendations = [];
  const competitors = getCompetitorsInArea(lat, lng, 3);
  const vulnerable = identifyVulnerableCompetitors(competitors.slice(0, 5));
  if (vulnerable.length > 0) {
    const worst = vulnerable.sort((a, b) => a.rating - b.rating)[0];
    recommendations.push({
      tipo: 'oportunidad', prioridad: 1, icono: '⭐',
      titulo: 'Competidor con baja valoración cerca',
      descripcion: `${worst.nombre || worst.cadena} (${worst.ratingRange}) está a ${worst.distancia}km — sus clientes insatisfechos son captables.`,
      accion: 'Lanzar campaña de captación local: "¿Cambias de centro? Período de prueba gratuito"',
    });
  }
  const sinTeleau = competitors.every(c => { const p = COMPETITOR_PROFILES[c.cadena]; return p && !p.servicios.teleaudiologia.disponible; });
  if (competitors.length > 0 && sinTeleau) {
    recommendations.push({
      tipo: 'diferenciacion', prioridad: 2, icono: '📱',
      titulo: 'Vacío de teleaudiología en la zona',
      descripcion: 'Ningún competidor en el área ofrece seguimiento remoto.',
      accion: 'Promover activamente el servicio de teleaudiología como único en la zona.',
    });
  }
  const sinSocial = competitors.every(c => { const p = COMPETITOR_PROFILES[c.cadena]; return p && !p.servicios.servicioSocial.disponible; });
  if (sinSocial && competitors.length > 0) {
    recommendations.push({
      tipo: 'diferenciacion', prioridad: 3, icono: '🤝',
      titulo: 'Clinisord es el único con servicio social',
      descripcion: 'Ningún competidor en este área integra orientación social.',
      accion: 'Contactar servicios sociales municipales y asociaciones de mayores para derivaciones',
    });
  }
  const independientes = competitors.filter(c => c.cadena === 'Independiente');
  if (independientes.length >= 3) {
    recommendations.push({
      tipo: 'consolidacion', prioridad: 4, icono: '🎯',
      titulo: 'Mercado atomizado en independientes',
      descripcion: `${independientes.length} centros independientes en el área.`,
      accion: 'Campaña de marca: "La seguridad de una red, el trato de siempre".',
    });
  }
  if (competitors.length === 0) {
    recommendations.push({
      tipo: 'expansion', prioridad: 1, icono: '🚀',
      titulo: 'Área sin competencia directa',
      descripcion: 'No hay centros auditivos en un radio de 3km.',
      accion: 'Prioridad máxima de apertura. Campaña de sensibilización auditiva.',
    });
  }
  const gaesEnZona = competitors.filter(c => c.cadena === 'gaes');
  if (gaesEnZona.length > 0) {
    const closest = gaesEnZona[0];
    recommendations.push({
      tipo: 'competencia', prioridad: 5, icono: '⚡',
      titulo: 'GAES presente en la zona',
      descripcion: `Centro GAES a ${closest.distancia}km.`,
      accion: 'Estrategia diferencial: "Somos la alternativa personalizada a GAES".',
    });
  }
  return recommendations.sort((a, b) => a.prioridad - b.prioridad);
}

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
  return { servicios: serviciosKeys, competidores: Object.values(COMPETITOR_PROFILES), clinisord: CLINISORD_PROFILE };
}

export function getDAFOAnalysis(chainId) {
  const profile = COMPETITOR_PROFILES[chainId];
  if (!profile) return null;
  return {
    debilidades: profile.puntosDebiles,
    amenazas: [
      profile.cuotaMercadoEstimada > 25 ? 'Alta cuota de mercado y reconocimiento de marca' : null,
      profile.precios?.audifonos?.gama_basica?.min < 700 ? 'Precio de entrada muy bajo como gancho' : null,
      profile.servicios.financiacion.disponible ? 'Ofrece financiación competitiva' : null,
    ].filter(Boolean),
    fortalezas: profile.puntosFuertes,
    oportunidades: profile.vulnerabilidades.map(v => v.oportunidadClinosord),
  };
}

export function calculateStrategicOpportunityScore(lat, lng) {
  const competitors = getCompetitorsInArea(lat, lng, 3);
  let score = 50;
  if (competitors.length === 0) return 95;
  const vulnerable = identifyVulnerableCompetitors(competitors);
  score += vulnerable.length * 8;
  const sinTeleau = competitors.every(c => { const p = COMPETITOR_PROFILES[c.cadena]; return p && !p.servicios.teleaudiologia.disponible; });
  if (sinTeleau) score += 15;
  const sinSocial = competitors.every(c => { const p = COMPETITOR_PROFILES[c.cadena]; return p && !p.servicios.servicioSocial.disponible; });
  if (sinSocial) score += 15;
  return Math.min(100, Math.max(0, Math.round(score)));
}

