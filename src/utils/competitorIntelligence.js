// ============================================================
// competitorIntelligence.js
// Motor de Inteligencia Competitiva — Clinisord GeoStrategy
// Datos curados + análisis estratégico | Actualizado: Abril 2026
// ============================================================

import { getCompetitorsInArea, calculateDistance } from './competitorData';

// -------------------------------------------------------
// PERFILES CURADOS DE CADENAS COMPETIDORAS
// -------------------------------------------------------

export const COMPETITOR_PROFILES = {
  gaes: {
    id: 'gaes',
    nombre: 'GAES (Amplifon)',
    tipo: 'Cadena multinacional',
    propietario: 'Amplifon SpA (Italia)',
    añoFundacion: 1949,
    presenciaEspana: '~500 centros',
    cuotaMercadoEstimada: 35,
    color: '#ef4444',
    logo: '/logos/gaes.png',
    descripcion: 'Líder del mercado español de audiología. Filial de Amplifon, mayor grupo mundial de audiología. Modelo centrado en volumen y precio competitivo, con fuerte presencia en centros comerciales.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: 'Siempre gratuita como captación' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: 'Depende de centro' },
      teleaudiologia: { disponible: false, precio: null, nota: 'No disponible generalmente' },
      seguroAuditivo: { disponible: true, precio: '~8€/mes', nota: 'Plan GAES Protect' },
      financiacion: { disponible: true, precio: '0% hasta 36 meses', nota: 'Requiere validación' },
      reparaciones: { disponible: true, precio: '50-150€', nota: '' },
      rehabilitacionAuditiva: { disponible: true, precio: 'Básica', nota: 'Sin programa estructurado' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: 'Calidad variable por centro' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 800, max: 1600, display: '800€ – 1.600€', marcas: ['Amplifon Stride'] },
        gama_media: { min: 1600, max: 3200, display: '1.600€ – 3.200€', marcas: ['Amplifon Oria', 'Signia Pure'] },
        gama_alta: { min: 3200, max: 6500, display: '3.200€ – 6.500€', marcas: ['Signia AX', 'Rexton'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Mayor red de centros en España (~500)',
      'Marca altamente reconocida',
      'Financiación flexible hasta 36 meses',
      'Cobertura nacional',
      'Acuerdos con seguros médicos',
    ],
    puntosDebiles: [
      'Atención masificada y poco personalizada',
      'Dependencia de marca multinacional (limita flexibilidad)',
      'Catálogo limitado a marcas propias del grupo',
      'Poco enfoque en casos clínicos complejos',
      'Sin servicios de orientación social ni comunitarios',
      'Alta rotación de personal en centros',
    ],
    vulnerabilidades: [
      { tipo: 'servicio', titulo: 'Sin teleaudiología', descripcion: 'No ofrecen seguimiento remoto, crítico para pacientes con movilidad reducida', oportunidadClinosord: 'Captar pacientes con movilidad limitada con servicio domiciliario y teleaudiología' },
      { tipo: 'calidad', titulo: 'Atención impersonal por volumen', descripcion: 'Modelo retail masivo reduce calidad de atención', oportunidadClinosord: 'Posicionarse como la alternativa "humana y cercana": nombre del paciente, historia clínica propia' },
      { tipo: 'precio', titulo: 'Precio alto en gama media-alta', descripcion: 'Márgenes elevados en marcas premium', oportunidadClinosord: 'Ofrecer misma gama con precio un 10-15% inferior al ser marca independiente' },
      { tipo: 'social', titulo: 'Sin integración social', descripcion: 'No conectan con redes de apoyo, servicios sociales ni familiares', oportunidadClinosord: 'Centro Social del Audífono: implicar familias, conectar con servicios municipales' },
    ],
    ratings: { google: { min: 3.7, max: 4.3, promedio: 4.0 }, fuente: 'Observación centros Madrid/Barcelona 2024' },
  },

  audical: {
    id: 'audical',
    nombre: 'Audical',
    tipo: 'Cadena nacional especializada',
    propietario: 'Grupo Audika (Francia) / independiente en algunas franquicias',
    añoFundacion: 1985,
    presenciaEspana: '~200 centros',
    cuotaMercadoEstimada: 18,
    color: '#f97316',
    logo: '/logos/audical.png',
    descripcion: 'Segunda cadena especializada en España. Fuerte en Cataluña y Levante. Modelo similar a GAES pero con menos presencia.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: '' },
      teleaudiologia: { disponible: false, precio: null, nota: '' },
      seguroAuditivo: { disponible: true, precio: 'Variable', nota: '' },
      financiacion: { disponible: true, precio: '0% hasta 24 meses', nota: '' },
      reparaciones: { disponible: true, precio: '40-120€', nota: '' },
      rehabilitacionAuditiva: { disponible: true, precio: 'Básica', nota: '' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 750, max: 1500, display: '750€ – 1.500€', marcas: ['Unitron', 'Phonak Belong'] },
        gama_media: { min: 1500, max: 3000, display: '1.500€ – 3.000€', marcas: ['Phonak Audéo', 'Oticon More'] },
        gama_alta: { min: 3000, max: 5800, display: '3.000€ – 5.800€', marcas: ['Phonak Lumity', 'Oticon Real'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Mejor relación calidad-precio que GAES en algunas gamas',
      'Personal más estable en comparación con GAES',
      'Buena presencia en Cataluña y Comunidad Valenciana',
    ],
    puntosDebiles: [
      'Menor reconocimiento de marca que GAES',
      'Menor red de centros que GAES',
      'Sin teleaudiología ni servicios sociales',
      'Tecnología de gestión menos avanzada',
    ],
    vulnerabilidades: [
      { tipo: 'brand', titulo: 'Baja notoriedad de marca', descripcion: 'Menos reconocida que GAES, sin diferenciador claro', oportunidadClinosord: 'Clinisord puede posicionarse como "el especialista local de confianza" frente a ambas cadenas nacionales' },
      { tipo: 'servicio', titulo: 'Sin servicios innovadores', descripcion: 'No han adoptado teleaudiología ni rehabilitación avanzada', oportunidadClinosord: 'Ofrecer seguimiento digital como ventaja diferencial' },
    ],
    ratings: { google: { min: 3.9, max: 4.4, promedio: 4.1 }, fuente: 'Observación 2024' },
  },

  afflelou_acoustics: {
    id: 'afflelou_acoustics',
    nombre: 'Alain Afflelou Acoustics',
    tipo: 'Óptica con depto. de audiología',
    propietario: 'Grupo Alain Afflelou (Francia)',
    añoFundacion: 2012, // entrada en audiología
    presenciaEspana: '~100 centros (dentro de ópticas)',
    cuotaMercadoEstimada: 8,
    color: '#3b82f6',
    logo: '/logos/afflelou.png',
    descripcion: 'División de audiología de la cadena de ópticas. Modelo "one-stop shop" visual+auditivo. Fuerte en zonas comerciales urbanas.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: 'Como captación' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: '' },
      teleaudiologia: { disponible: false, precio: null, nota: '' },
      seguroAuditivo: { disponible: true, precio: 'Variable', nota: '' },
      financiacion: { disponible: true, precio: '0%', nota: 'Financiación propia Afflelou' },
      reparaciones: { disponible: true, precio: '60-160€', nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: 'No especializado' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: 'Calidad variable' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 900, max: 1800, display: '900€ – 1.800€', marcas: ['GN Hearing', 'Widex'] },
        gama_media: { min: 1800, max: 3500, display: '1.800€ – 3.500€', marcas: ['GN ReSound', 'Widex Moment'] },
        gama_alta: { min: 3500, max: 7000, display: '3.500€ – 7.000€', marcas: ['GN ReSound Nexia', 'Widex Moment'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Aprovecha tráfico de óptica (cross-selling)',
      'Marca muy reconocida en retail',
      'Buena financiación propia',
      'Precios premium aceptados por su clientela',
    ],
    puntosDebiles: [
      'No son especialistas en audiología (imagen de óptica)',
      'Personal no siempre con formación audiológica específica',
      'Precios de gama alta por encima de la media',
      'Sin rehabilitación auditiva ni servicios médicos especializados',
    ],
    vulnerabilidades: [
      { tipo: 'especialización', titulo: 'No son percibidos como especialistas', descripcion: 'El cliente valora acudir a un especialista para algo tan sensible como la audición', oportunidadClinosord: 'Enfatizar la especialización de Clinisord frente al modelo genérico de Afflelou' },
      { tipo: 'precio', titulo: 'Precios por encima de la media', descripcion: 'Precio de entrada en gama básica superior', oportunidadClinosord: 'Ofrecer mejor relación precio-calidad en gama básica y media' },
    ],
    ratings: { google: { min: 3.8, max: 4.2, promedio: 4.0 }, fuente: 'Observación 2024' },
  },

  specsavers: {
    id: 'specsavers',
    nombre: 'Specsavers Audiología',
    tipo: 'Óptica con depto. de audiología',
    propietario: 'Specsavers (Reino Unido)',
    añoFundacion: 2015, // Entrada en España en audiología
    presenciaEspana: '~50 centros (dentro de ópticas)',
    cuotaMercadoEstimada: 5,
    color: '#10b981',
    logo: '/logos/specsavers.png',
    descripcion: 'División de audiología de la cadena óptica británica. Modelo muy agresivo en precio como estrategia de penetración de mercado.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: false, precio: null, nota: 'No habitualmente' },
      teleaudiologia: { disponible: false, precio: null, nota: '' },
      seguroAuditivo: { disponible: false, precio: null, nota: '' },
      financiacion: { disponible: true, precio: '0% hasta 12 meses', nota: '' },
      reparaciones: { disponible: true, precio: '30-100€', nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: '' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: 'Calidad básica' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 695, max: 1200, display: '695€ – 1.200€', marcas: ['Specsavers Own Brand', 'Rexton'] },
        gama_media: { min: 1200, max: 2400, display: '1.200€ – 2.400€', marcas: ['Widex', 'Sivantos'] },
        gama_alta: { min: 2400, max: 4800, display: '2.400€ – 4.800€', marcas: ['Widex Moment', 'Signia'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Precio de entrada más bajo del mercado (~695€)',
      'Marca reconocida en óptica',
      'Modelo simplificado fácil de entender',
    ],
    puntosDebiles: [
      'Calidad percibida como básica',
      'Sin especialización auditiva profunda',
      'Catálogo de productos limitado',
      'Sin servicios complementarios',
      'Cobertura geográfica limitada en España',
    ],
    vulnerabilidades: [
      { tipo: 'calidad', titulo: 'Percepción de marca low-cost', descripcion: 'En salud, precio bajo genera desconfianza sobre calidad', oportunidadClinosord: 'Posicionarse como el equilibrio óptimo: servicio premium a precio justo' },
      { tipo: 'servicio', titulo: 'Sin servicios especializados', descripcion: 'No ofrecen casi ningún servicio complementario', oportunidadClinosord: 'Atraer pacientes que necesitan más que "el producto básico"' },
    ],
    ratings: { google: { min: 4.0, max: 4.5, promedio: 4.2 }, fuente: 'Observación 2024' },
  },

  el_corte_ingles: {
    id: 'el_corte_ingles',
    nombre: 'El Corte Inglés — Clínica de Audición',
    tipo: 'Gran almacén con servicio auditivo',
    propietario: 'El Corte Inglés S.A.',
    añoFundacion: 2000,
    presenciaEspana: '~30 centros (dentro de ECI)',
    cuotaMercadoEstimada: 4,
    color: '#6366f1',
    logo: '/logos/eci.png',
    descripcion: 'Servicio auditivo dentro de los grandes almacenes El Corte Inglés. Clientela de alto poder adquisitivo. Modelo premium.',
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: '' },
      teleaudiologia: { disponible: false, precio: null, nota: '' },
      seguroAuditivo: { disponible: false, precio: null, nota: '' },
      financiacion: { disponible: true, precio: '0% hasta 36 meses', nota: 'Tarjeta El Corte Inglés' },
      reparaciones: { disponible: true, precio: '80-200€', nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: '' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: 'Atención cuidada' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 1000, max: 2000, display: '1.000€ – 2.000€', marcas: ['Widex', 'GN ReSound'] },
        gama_media: { min: 2000, max: 4000, display: '2.000€ – 4.000€', marcas: ['Phonak'] },
        gama_alta: { min: 4000, max: 8000, display: '4.000€ – 8.000€', marcas: ['Widex Moment', 'Oticon Real'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Clientela de alto poder adquisitivo',
      'Financiación propia con Tarjeta ECI',
      'Imagen de marca de confianza',
      'Horarios amplios (dentro de grandes almacenes)',
    ],
    puntosDebiles: [
      'Precios muy elevados',
      'Sin especialización real en audiología',
      'Cobertura muy limitada (solo donde hay ECI)',
      'Modelo de venta de producto, no de atención integral',
    ],
    vulnerabilidades: [
      { tipo: 'precio', titulo: 'Precios muy superiores a la media', descripcion: 'Gama básica desde 1.000€ — barrera de entrada alta', oportunidadClinosord: 'Captar clientes desencantados por el precio sin percibir valor superior' },
    ],
    ratings: { google: { min: 4.1, max: 4.6, promedio: 4.3 }, fuente: 'Observación 2024' },
  },

  independiente: {
    id: 'independiente',
    nombre: 'Centro Auditivo Independiente',
    tipo: 'Independiente',
    propietario: 'Varios (propietarios locales)',
    añoFundacion: null,
    presenciaEspana: '~2.000+ centros',
    cuotaMercadoEstimada: 25,
    color: '#8b5cf6',
    logo: null,
    descripcion: 'Red atomizada de centros independientes. Gran variabilidad de calidad y precios. Representan el 25% del mercado pero sin coordinación entre sí.',
    servicios: {
      audiometria: { disponible: true, precio: 'Variable (0-60€)', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Variable', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: 'No todos' },
      teleaudiologia: { disponible: false, precio: null, nota: 'Muy raro' },
      seguroAuditivo: { disponible: false, precio: null, nota: 'Muy raro' },
      financiacion: { disponible: true, precio: 'Variable', nota: 'No todos; algunos solo a través de financieras externas' },
      reparaciones: { disponible: true, precio: '30-120€', nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: 'Muy raro' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Variable', nota: 'Puede ser excelente o inexistente' },
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
    puntosFuertes: [
      'Precio de audífono básico más bajo del mercado',
      'Trato muy cercano (conocen al paciente)',
      'Flexibilidad de negociación',
      'Especialistas apasionados en muchos casos',
    ],
    puntosDebiles: [
      'Gran variabilidad de calidad entre centros',
      'Sin respaldo de marca o grupo',
      'Limitada capacidad de financiación',
      'Sin tecnología de gestión avanzada',
      'Dependencia del propietario — riesgo de cierre',
    ],
    vulnerabilidades: [
      { tipo: 'confianza', titulo: 'Sin respaldo de marca ni red', descripcion: 'El paciente no sabe si el centro cerrará o si tendrá soporte a largo plazo', oportunidadClinosord: 'Ofrecer la calidez del trato cercano CON la seguridad de una red y continuidad garantizada' },
      { tipo: 'servicio', titulo: 'Sin servicios digitales ni teleaudiología', descripcion: 'Los independientes no tienen recursos para implementar tecnología avanzada', oportunidadClinosord: 'Clinisord como puente: tamaño mediano con capacidades tecnológicas' },
    ],
    ratings: { google: { min: 3.5, max: 4.8, promedio: 4.1 }, fuente: 'Alta variabilidad — promedio estimado' },
  },

  farmacia_auditiva: {
    id: 'farmacia_auditiva',
    nombre: 'Farmacias con Servicio Auditivo',
    tipo: 'Farmacia con servicio complementario',
    propietario: 'Varios',
    añoFundacion: null,
    presenciaEspana: '~500 farmacias (estimado)',
    cuotaMercadoEstimada: 3,
    color: '#059669',
    logo: null,
    descripcion: 'Segmento emergente de farmacias que ofrecen audífonos de bajo coste (OTC) o derivan a centros especializados. Principalmente audífonos de gama muy básica.',
    servicios: {
      audiometria: { disponible: true, precio: 'Básica (screening)', nota: 'Prueba de screening, no diagnóstico completo' },
      adaptacionAudifonos: { disponible: false, precio: null, nota: 'Solo en algunas; generalmente sin audiólogo' },
      audifonosInfantiles: { disponible: false, precio: null, nota: '' },
      teleaudiologia: { disponible: false, precio: null, nota: '' },
      seguroAuditivo: { disponible: false, precio: null, nota: '' },
      financiacion: { disponible: false, precio: null, nota: '' },
      reparaciones: { disponible: false, precio: null, nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: '' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: false, precio: null, nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita (screening básico)' },
      audifonos: {
        gama_basica: { min: 200, max: 600, display: '200€ – 600€ (OTC, sin adaptación)', marcas: ['Amplifon Basics', 'OTC genérico'] },
        gama_media: { min: null, max: null, display: 'No disponible' },
        gama_alta: { min: null, max: null, display: 'No disponible' },
      },
      revision: { min: null, max: null, display: 'No aplica' },
    },
    puntosFuertes: [
      'Precio muy bajo en gama OTC',
      'Alta accesibilidad y confianza (canal farmacia)',
      'Buena puerta de entrada para sensibilización del paciente',
    ],
    puntosDebiles: [
      'Sin audiólogos especializados',
      'Solo gama básica OTC',
      'Sin seguimiento ni adaptación real',
      'No pueden tratar casos medios o complejos',
    ],
    vulnerabilidades: [
      { tipo: 'derivación', titulo: 'Canal de derivación potencial', descripcion: 'Las farmacias no pueden atender casos que necesitan adaptación: derivan', oportunidadClinosord: 'Establecer acuerdos de derivación con farmacias locales como canal de captación' },
    ],
    ratings: { google: { min: 4.0, max: 4.8, promedio: 4.3 }, fuente: 'Rating de farmacia general, no específico de servicio auditivo' },
  },
};

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
export function calculateMarketShare(competitorsInArea) {
  if (!competitorsInArea || competitorsInArea.length === 0) return [];

  const chainCounts = {};
  competitorsInArea.forEach(comp => {
    chainCounts[comp.cadena] = (chainCounts[comp.cadena] || 0) + 1;
  });

  // Añadir estimación para Clinisord (a definir por usuario)
  const total = Object.values(chainCounts).reduce((a, b) => a + b, 0);
  const clinisordEstimated = Math.max(1, Math.round(total * 0.1)); // 10% como base

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
