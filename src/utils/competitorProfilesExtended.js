export const COMPETITOR_PROFILES_EXTENDED = {
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
    estrategiaOperativa: 'Modelo retail masivo. Alta inversión en publicidad en TV (horarios matinales). Estrategia muy proactiva de llamadas comerciales y seguimiento de base de datos para renovaciones de audífonos cada 4-5 años.',
    metricasNegocio: { ratioPacientesAnual: 180, facturacionMedia: '350.000€', ticketMedio: '1.950€' },
    analisisSentimiento: {
      quejasComunes: ['Presión comercial para comprar gamas altas', 'Rotación frecuente del personal audiólogo', 'Servicio post-venta lento en reparaciones'],
      elogiosComunes: ['Muchas opciones de financiación a medida', 'Centro siempre limpio y aspecto profesional', 'Pruebas gratuitas sin compromiso inicial']
    },
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

  aural: {
    id: 'aural',
    nombre: 'Aural Centros Auditivos (Widex)',
    tipo: 'Red Premium Exclusiva',
    propietario: 'Widex Audífonos S.A. (España)',
    añoFundacion: 1978,
    presenciaEspana: '~250 centros',
    cuotaMercadoEstimada: 20,
    color: '#0ea5e9',
    logo: '/logos/aural.png',
    descripcion: 'Pioneros en España y red oficial de Widex. Posicionamiento premium y muy centrado en el cuidado clínico avanzado y soluciones de alto valor.',
    estrategiaOperativa: 'Posicionamiento como "La excelencia en audición". Trato más clínico y pausado. Mucho enfoque en la calidad de la marca Widex y referenciadores ORL (Otorrinos).',
    metricasNegocio: { ratioPacientesAnual: 120, facturacionMedia: '420.000€', ticketMedio: '3.500€' },
    analisisSentimiento: {
      quejasComunes: ['Precios percibidos como los más altos del mercado', 'Rigidez en los protocolos', 'No trabajan con audífonos baratos de otras marcas'],
      elogiosComunes: ['Trato clínico excepcional y mucha paciencia', 'Sonido Widex muy natural frente a competidores', 'Instalaciones modernas y muy cómodas']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: 'Método Aural muy protocolizado' },
      audifonosInfantiles: { disponible: true, precio: 'Alto', nota: 'Muy especializados en pediatría' },
      teleaudiologia: { disponible: true, precio: 'Incluida', nota: 'Con ciertos audífonos (Widex Remote Care)' },
      seguroAuditivo: { disponible: true, precio: 'Incluido en gama alta', nota: 'Cobertura a todo riesgo' },
      financiacion: { disponible: true, precio: 'Variable', nota: 'Menos énfasis que GAES' },
      reparaciones: { disponible: true, precio: 'Premium', nota: 'Altos costes fuera de garantía' },
      rehabilitacionAuditiva: { disponible: true, precio: 'Alta', nota: 'Tienen terapia Zen para acúfenos' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: 'Excelente' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 1400, max: 2000, display: '1.400€ – 2.000€', marcas: ['Widex Magnify'] },
        gama_media: { min: 2000, max: 3800, display: '2.000€ – 3.800€', marcas: ['Widex Moment'] },
        gama_alta: { min: 3800, max: 7000, display: '3.800€ – 7.000€', marcas: ['Widex SmartRIC', 'Widex Moment Sheer'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Calidad de producto (Widex) excepcional',
      'Protocolos de adaptación muy rigurosos (Método Aural)',
      'Especialistas en Tinnitus/Acúfenos (Terapia Zen)',
      'Profesionales altamente formados',
    ],
    puntosDebiles: [
      'Barrera de entrada por precio muy alta',
      'Perdida de ventas en clientes sensibles al precio',
      'Monocatálogo (solo Widex, no hay opciones de otro fabricante)',
    ],
    vulnerabilidades: [
      { tipo: 'precio', titulo: 'Precios restrictivos en zona media', descripcion: 'Sus precios expulsan al paciente de clase media-baja', oportunidadClinosord: 'Captar el rechazo por precio ofreciendo opciones multi-marca con buena adaptación a la mitad de precio.' },
    ],
    ratings: { google: { min: 4.4, max: 4.9, promedio: 4.6 }, fuente: 'Estimación' },
  },

  audika: {
    id: 'audika',
    nombre: 'Audika',
    tipo: 'Red de expansión internacional',
    propietario: 'Grupo Demant (Dinamarca)',
    añoFundacion: 2014,
    presenciaEspana: '~130 centros',
    cuotaMercadoEstimada: 12,
    color: '#14b8a6',
    logo: '/logos/audika.png',
    descripcion: 'Perteneciente al gigante danés Demant (fabricante de Oticon, Bernafon). Expansión acelerada comprando centros locales independientes en España.',
    estrategiaOperativa: 'Expansión inorgánica: compran gabinetes consolidados y les cambian la marca. Campañas muy agresivas de 2x1 o "pruebe gratis 30 días".',
    metricasNegocio: { ratioPacientesAnual: 140, facturacionMedia: '290.000€', ticketMedio: '2.100€' },
    analisisSentimiento: {
      quejasComunes: ['Cambios en las condiciones tras ser adquiridos (antiguos pacientes)', 'Publicidad a veces engañosa (letra pequeña del 2x1)', 'Precios de accesorios muy caros'],
      elogiosComunes: ['Audífonos Oticon de muy buena calidad de sonido', 'Amabilidad del personal', 'Prueba del audífono en casa antes de pagar']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: '' },
      teleaudiologia: { disponible: false, precio: null, nota: 'Poco implementado' },
      seguroAuditivo: { disponible: true, precio: 'Audika Care', nota: '' },
      financiacion: { disponible: true, precio: '0% hasta 36m', nota: '' },
      reparaciones: { disponible: true, precio: 'Moderado', nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: '' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 900, max: 1500, display: '900€ – 1.500€', marcas: ['Bernafon'] },
        gama_media: { min: 1500, max: 3200, display: '1.500€ – 3.200€', marcas: ['Oticon Zircon', 'Bernafon Alpha'] },
        gama_alta: { min: 3200, max: 6200, display: '3.200€ – 6.200€', marcas: ['Oticon Real', 'Oticon Intent'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Respaldo financiero gigante (Demant)',
      'Calidad de los audífonos Oticon',
      'Fuertes promociones comerciales continuas',
    ],
    puntosDebiles: [
      'Inestabilidad por transición de centros comprados (choque cultural)',
      'Dependencia de promociones reduce la percepción de marca médica',
    ],
    vulnerabilidades: [
      { tipo: 'brand', titulo: 'Desconexión local', descripcion: 'Al comprar centros de barrio y cambiar el nombre, los pacientes antiguos pueden desconfiar.', oportunidadClinosord: 'Ataque local: "Nosotros somos de aquí, no una multinacional que compra y cierra".' },
    ],
    ratings: { google: { min: 3.9, max: 4.6, promedio: 4.2 }, fuente: 'Estimación' },
  },

  audifon: {
    id: 'audifon',
    nombre: 'Audifón',
    tipo: 'Red Nacional Independiente',
    propietario: 'Capital Nacional',
    añoFundacion: 1988,
    presenciaEspana: '~45 centros',
    cuotaMercadoEstimada: 4,
    color: '#d946ef',
    logo: '/logos/audifon.png',
    descripcion: 'Marca muy reconocida en publicidad clásica española (radio y televisión). Se han mantenido independientes apostando por un trato tradicional.',
    estrategiaOperativa: 'Publicidad masiva en medios tradicionales (Radio COPE, SER, revistas) con un enfoque directo a la población mayor de 75 años. Promociones de "Limpieza de oídos" o regalos.',
    metricasNegocio: { ratioPacientesAnual: 130, facturacionMedia: '250.000€', ticketMedio: '1.900€' },
    analisisSentimiento: {
      quejasComunes: ['Audífonos de marcas blancas o poco conocidas', 'Diseño de las tiendas algo anticuado', 'Atención demasiado insistente por teléfono'],
      elogiosComunes: ['Audiólogos muy veteranos con mucha experiencia', 'Buena empatía con personas muy mayores', 'Regalos promocionales atractivos']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: false, precio: null, nota: '' },
      teleaudiologia: { disponible: false, precio: null, nota: '' },
      seguroAuditivo: { disponible: true, precio: 'Básico', nota: '' },
      financiacion: { disponible: true, precio: 'Flexible', nota: '' },
      reparaciones: { disponible: true, precio: 'Baratas', nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: '' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: 'Tradicional' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 700, max: 1200, display: '700€ – 1.200€', marcas: ['Sync'] },
        gama_media: { min: 1200, max: 2500, display: '1.200€ – 2.500€', marcas: ['Starkey Básicos'] },
        gama_alta: { min: 2500, max: 4500, display: '2.500€ – 4.500€', marcas: ['Starkey'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Notoriedad en público de la tercera edad (medios tradicionales)',
      'Precios competitivos, menos de barrera',
      'Imagen castiza/familiar de mucha confianza para el mayor',
    ],
    puntosDebiles: [
      'Imagen poco tecnológica o moderna',
      'No atraen a presbiacusia temprana (paciente de 60-65 años)',
      'Sin herramientas digitales (teleaudiología inexistente)',
    ],
    vulnerabilidades: [
      { tipo: 'calidad', titulo: 'Pérdida del paciente joven/moderno', descripcion: 'Un paciente de 60 años ve Audifón "para gente muy mayor".', oportunidadClinosord: 'Acaparar el mercado de 55-70 años que busca estética, Bluetooth y tecnología.' },
    ],
    ratings: { google: { min: 3.5, max: 4.4, promedio: 3.9 }, fuente: 'Estimación' },
  },

  audical: {
    id: 'audical',
    nombre: 'Audical',
    tipo: 'Cadena nacional especializada',
    propietario: 'Grupo Audika (Francia) / independiente en algunas franquicias',
    añoFundacion: 1985,
    presenciaEspana: '~200 centros',
    cuotaMercadoEstimada: 10,
    color: '#f97316',
    logo: '/logos/audical.png',
    descripcion: 'Histórica cadena especializada en España. Fuerte en Cataluña y Levante. En proceso de consolidación.',
    estrategiaOperativa: 'Modelo híbrido: tienen centros propios y algunas franquicias o concesiones. Gran presencia a pie de calle en barrios residenciales densos. Se basan en el boca a boca y buzoneo.',
    metricasNegocio: { ratioPacientesAnual: 110, facturacionMedia: '220.000€', ticketMedio: '1.850€' },
    analisisSentimiento: {
      quejasComunes: ['Algunas clínicas necesitan reforma', 'Tiempos de espera en las citas', 'Tecnología a veces antigua para moldes'],
      elogiosComunes: ['Audioprotesistas de toda la vida', 'Buen trato humano', 'Transparencia en precios']
    },
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
        gama_basica: { min: 750, max: 1500, display: '750€ – 1.500€', marcas: ['Unitron'] },
        gama_media: { min: 1500, max: 3000, display: '1.500€ – 3.000€', marcas: ['Phonak Audéo'] },
        gama_alta: { min: 3000, max: 5800, display: '3.000€ – 5.800€', marcas: ['Phonak Lumity'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Mejor relación calidad-precio que GAES en algunas gamas',
      'Personal más estable en comparación con GAES',
      'Buena presencia en Cataluña y Comunidad Valenciana',
    ],
    puntosDebiles: [
      'Menor reconocimiento de marca que la competencia actual',
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
    añoFundacion: 2012,
    presenciaEspana: '~100 centros (dentro de ópticas)',
    cuotaMercadoEstimada: 8,
    color: '#3b82f6',
    logo: '/logos/afflelou.png',
    descripcion: 'División de audiología de la cadena de ópticas. Modelo "one-stop shop" visual+auditivo. Fuerte en zonas comerciales urbanas.',
    estrategiaOperativa: 'Venta cruzada masiva ("Tchin Tchin Audio"). Cuando el cliente va a hacerse gafas, le ofrecen gratis la audiometría. Apuestan por el 2x1 sistemático: te llevas dos audífonos por poco más.',
    metricasNegocio: { ratioPacientesAnual: 80, facturacionMedia: '150.000€', ticketMedio: '1.700€' },
    analisisSentimiento: {
      quejasComunes: ['Ruidos y falta de insonorización en la óptica durante la prueba', 'El "2x1" infla el precio del primer audífono', 'Audiólogo no siempre está disponible (horarios parciales)'],
      elogiosComunes: ['Comodidad de ir al mismo sitio para vista y oído', 'Diseños de audífono muy discretos e invisibles', 'Buenas instalaciones en calle comercial']
    },
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
    añoFundacion: 2015,
    presenciaEspana: '~50 centros',
    cuotaMercadoEstimada: 4,
    color: '#10b981',
    logo: '/logos/specsavers.png',
    descripcion: 'División de audiología de la cadena óptica británica. Modelo muy agresivo en precio como estrategia de penetración de mercado.',
    estrategiaOperativa: 'Guerra de precios ("High volume, Low margin"). Buscan ser el "Primark de la óptica y audiología". Fuertes en zonas costeras (clientela de origen británico/expatriados).',
    metricasNegocio: { ratioPacientesAnual: 200, facturacionMedia: '210.000€', ticketMedio: '1.050€' },
    analisisSentimiento: {
      quejasComunes: ['Sientes que estás en una cadena de montaje', 'Las consultas son muy rápidas y directas al grano', 'Poco soporte tras la venta'],
      elogiosComunes: ['El precio es imbatible', 'Transparencia total sin intentar vender algo más caro', 'El personal suele hablar varios idiomas (Inglés)']
    },
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
        gama_basica: { min: 695, max: 1200, display: '695€ – 1.200€', marcas: ['Specsavers Own Brand'] },
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
      'Sin servicios complementarios',
    ],
    vulnerabilidades: [
      { tipo: 'calidad', titulo: 'Percepción de marca low-cost', descripcion: 'En salud, precio bajo genera desconfianza sobre calidad', oportunidadClinosord: 'Posicionarse como el equilibrio óptimo: servicio premium a precio justo' },
    ],
    ratings: { google: { min: 4.0, max: 4.5, promedio: 4.2 }, fuente: 'Observación 2024' },
  },

  el_corte_ingles: {
    id: 'el_corte_ingles',
    nombre: 'El Corte Inglés — Clínica Audición',
    tipo: 'Gran almacén con servicio auditivo',
    propietario: 'El Corte Inglés S.A.',
    añoFundacion: 2000,
    presenciaEspana: '~30 centros',
    cuotaMercadoEstimada: 4,
    color: '#6366f1',
    logo: '/logos/eci.png',
    descripcion: 'Servicio auditivo dentro de los grandes almacenes El Corte Inglés. Clientela de alto poder adquisitivo. Modelo premium.',
    estrategiaOperativa: 'Pasivos comercialmente. Confían 100% en el tráfico natural del centro comercial y la base de tarjetas ECI. Su cliente es cautivo por la financiación cómoda.',
    metricasNegocio: { ratioPacientesAnual: 60, facturacionMedia: '180.000€', ticketMedio: '3.000€' },
    analisisSentimiento: {
      quejasComunes: ['Muy caros comparado con lo mismo en calle', 'Cambian de audioprotesista de un año para otro', 'Horarios comerciales difíciles para temas de salud profunda'],
      elogiosComunes: ['Pagar en 36 meses sin intereses con su tarjeta', 'Garantía del Corte Inglés ante problemas de devolución', 'Comodidad si ya estás comprando']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: '' },
      teleaudiologia: { disponible: false, precio: null, nota: '' },
      seguroAuditivo: { disponible: false, precio: null, nota: '' },
      financiacion: { disponible: true, precio: '0% hasta 36 meses', nota: 'Tarjeta ECI' },
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
        gama_alta: { min: 4000, max: 8000, display: '4.000€ – 8.000€', marcas: ['Widex Moment'] },
      },
      revision: { min: 0, max: 0, display: 'Gratuita para clientes' },
    },
    puntosFuertes: [
      'Clientela de alto poder adquisitivo',
      'Financiación propia con Tarjeta ECI',
      'Imagen de marca de confianza',
    ],
    puntosDebiles: [
      'Precios muy elevados',
      'Sin especialización real en audiología',
      'Cobertura muy limitada',
    ],
    vulnerabilidades: [
      { tipo: 'precio', titulo: 'Precios muy superiores a la media', descripcion: 'Gama básica desde 1.000€', oportunidadClinosord: 'Captar clientes desencantados por el precio sin percibir valor superior' },
    ],
    ratings: { google: { min: 4.1, max: 4.6, promedio: 4.3 }, fuente: 'Observación 2024' },
  },

  independiente: {
    id: 'independiente',
    nombre: 'Centro Auditivo Independiente',
    tipo: 'Independiente',
    propietario: 'Varios locales',
    añoFundacion: null,
    presenciaEspana: '~2.000+ centros',
    cuotaMercadoEstimada: 12,
    color: '#8b5cf6',
    logo: null,
    descripcion: 'Red atomizada de centros independientes. Gran variabilidad de calidad y precios. Son el gabinete de barrio clásico.',
    estrategiaOperativa: 'El "Boca a Boca" es su motor de vida. Conocen a todos los vecinos por su nombre. Marketing nulo (algún folleto en el barrio), bajo volumen pero altísima recurrencia.',
    metricasNegocio: { ratioPacientesAnual: 70, facturacionMedia: '130.000€', ticketMedio: '1.600€' },
    analisisSentimiento: {
      quejasComunes: ['La clínica a veces cierra si el dueño se pone enfermo', 'No tienen maquinaria muy moderna', 'No trabajan con financieras fuertes y exigen mucho pago de golpe'],
      elogiosComunes: ['El dueño (Luis/María) es encantador y paciente', 'Te ajustan el aparato sin cobrarte por cualquier tontería', 'Precio honesto y te ayudan si no puedes pagar']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Variable (0-60€)', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Variable', nota: '' },
      audifonosInfantiles: { disponible: true, precio: 'Variable', nota: 'No todos' },
      teleaudiologia: { disponible: false, precio: null, nota: 'Muy raro' },
      seguroAuditivo: { disponible: false, precio: null, nota: 'Muy raro' },
      financiacion: { disponible: true, precio: 'Variable', nota: 'A veces escasa' },
      reparaciones: { disponible: true, precio: '30-120€', nota: '' },
      rehabilitacionAuditiva: { disponible: false, precio: null, nota: 'Muy raro' },
      servicioSocial: { disponible: false, precio: null, nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Variable', nota: 'Excelente generalmente' },
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
      'Trato muy cercano (conocen al paciente)',
      'Especialistas apasionados en muchos casos',
    ],
    puntosDebiles: [
      'Gran variabilidad de calidad entre centros',
      'Sin respaldo de marca',
      'Dependencia absoluta del propietario',
    ],
    vulnerabilidades: [
      { tipo: 'confianza', titulo: 'Sin respaldo de marca ni red', descripcion: 'El paciente no sabe si el centro cerrará', oportunidadClinosord: 'Ofrecer la calidez del trato cercano CON la seguridad de una red.' },
      { tipo: 'servicio', titulo: 'Sin teleaudiología', descripcion: 'Falta tecnología avanzada', oportunidadClinosord: 'Clinisord como alternativa local pero avanzada.' },
    ],
    ratings: { google: { min: 3.5, max: 4.8, promedio: 4.1 }, fuente: 'Estimado' },
  },

  farmacia_auditiva: {
    id: 'farmacia_auditiva',
    nombre: 'Farmacias con Audífonos',
    tipo: 'Farmacia con servicio',
    propietario: 'Varios',
    añoFundacion: null,
    presenciaEspana: '~500 farmacias',
    cuotaMercadoEstimada: 1,
    color: '#059669',
    logo: null,
    descripcion: 'Segmento de farmacias que venden audífonos preconfigurados (OTC) muy básicos de escaparate sin adaptación profesional.',
    estrategiaOperativa: 'Venta por impulso u oportunidad en el mostrador de la farmacia. Cuando una persona pide gotas para los oídos o menciona problemas de audición, le ofrecen un amplificador barato.',
    metricasNegocio: { ratioPacientesAnual: 30, facturacionMedia: '15.000€', ticketMedio: '500€' },
    analisisSentimiento: {
      quejasComunes: ['El aparato pita o duele mucho', 'Me estafaron, esto es un amplificador chino, no un audífono médico', 'La farmacéutica no sabe arreglarlo'],
      elogiosComunes: ['Te lo llevas puesto al instante', 'Costó 300 euros y puedo oír la tele sin molestar', 'Me pilla debajo de casa']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Básica (screening)', nota: 'Screening' },
      adaptacionAudifonos: { disponible: false, precio: null, nota: 'No profesional' },
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
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 200, max: 600, display: '200€ – 600€ (OTC)', marcas: ['OTC genérico'] },
        gama_media: { min: null, max: null, display: 'No disponible' },
        gama_alta: { min: null, max: null, display: 'No disponible' },
      },
      revision: { min: null, max: null, display: 'No aplica' },
    },
    puntosFuertes: [
      'Precio muy bajo (amplificadores)',
      'Alta accesibilidad de farmacia',
    ],
    puntosDebiles: [
      'Sin audiólogos especializados',
      'Sin seguimiento real',
    ],
    vulnerabilidades: [
      { tipo: 'derivación', titulo: 'Canal de derivación potencial', descripcion: 'Farmacias no tratan casos reales', oportunidadClinosord: 'Acuerdos de derivación con la farmacia.' },
    ],
    ratings: { google: { min: 4.0, max: 4.8, promedio: 4.3 }, fuente: 'Rating farmacia' },
  },

  microson: {
    id: 'microson',
    nombre: 'Microson',
    tipo: 'Fabricante y Distribuidor',
    propietario: 'Capital Español',
    añoFundacion: 1950,
    presenciaEspana: 'Red nacional',
    cuotaMercadoEstimada: 5,
    color: '#f43f5e',
    descripcion: 'Una de las empresas históricas del sector audioprotésico español. Conocida por su trayectoria como fabricante propio y su red de centros asociados.',
    estrategiaOperativa: 'Enfoque en la fabricación propia y soporte técnico de proximidad. Imagen de marca tradicional y consolidada.',
    metricasNegocio: { ratioPacientesAnual: 100, facturacionMedia: '220.000€', ticketMedio: '1.800€' },
    analisisSentimiento: {
      quejasComunes: ['Diseños a veces menos vanguardistas que multinacionales', 'Marketing menos agresivo'],
      elogiosComunes: ['Soporte técnico excelente', 'Producto nacional de confianza']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      financiacion: { disponible: true, precio: 'Flexible', nota: '' },
      reparaciones: { disponible: true, precio: 'Servicio propio', nota: 'Rápido' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 800, max: 1500, display: '800€ – 1.500€', marcas: ['Microson M1'] },
        gama_media: { min: 1500, max: 3000, display: '1.500€ – 3.000€', marcas: ['Microson M2'] },
        gama_alta: { min: 3000, max: 5500, display: '3.000€ – 5.500€', marcas: ['Microson M3'] },
      },
    },
    puntosFuertes: ['Fabricación propia', 'Experiencia histórica', 'Proximidad técnica'],
    puntosDebiles: ['Menor músculo financiero que grupos mundiales', 'Imagen percibida como menos moderna'],
    vulnerabilidades: [
      { tipo: 'tecnología', titulo: 'Competencia en I+D', descripcion: 'Presión de gigantes globales con mayor inversión', oportunidadClinosord: 'Aliarse con Microson para soporte técnico local o competir en modernidad.' }
    ],
    ratings: { google: { min: 4.1, max: 4.5, promedio: 4.3 }, fuente: 'Estimación' },
  },

  audicion_activa: {
    id: 'audicion_activa',
    nombre: 'Audición Activa',
    tipo: 'Cadena Nacional',
    propietario: 'Capital Nacional',
    añoFundacion: 2005,
    presenciaEspana: 'Múltiples centros en toda España',
    cuotaMercadoEstimada: 6,
    color: '#10b981',
    descripcion: 'Empresa especializada en la venta de audífonos con presencia en múltiples centros en toda España. Se caracterizan por un modelo de negocio ágil y cercano.',
    estrategiaOperativa: 'Expansión basada en ubicaciones estratégicas y campañas de captación directa. Gran enfoque en la relación calidad-precio.',
    metricasNegocio: { ratioPacientesAnual: 130, facturacionMedia: '260.000€', ticketMedio: '1.900€' },
    analisisSentimiento: {
      quejasComunes: ['Alta rotación de personal en algunos centros'],
      elogiosComunes: ['Precios claros y competitivos', 'Amabilidad en el trato']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      financiacion: { disponible: true, precio: 'Hasta 24 meses', nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Incluido', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 700, max: 1400, display: '700€ – 1.400€', marcas: ['Varios'] },
        gama_media: { min: 1400, max: 2800, display: '1.400€ – 2.800€', marcas: ['Phonak', 'Signia'] },
        gama_alta: { min: 2800, max: 5000, display: '2.800€ – 5.000€', marcas: ['Premium'] },
      },
    },
    puntosFuertes: ['Red nacional consolidada', 'Relación calidad-precio', 'Especialización en audífonos'],
    puntosDebiles: ['Marca con menos notoriedad que GAES', 'Servicios complementarios limitados'],
    vulnerabilidades: [
      { tipo: 'marca', titulo: 'Menor fidelización', descripcion: 'Modelo muy basado en captación por precio', oportunidadClinosord: 'Ofrecer mayor valor social y humano para fidelizar al paciente de largo plazo.' }
    ],
    ratings: { google: { min: 4.0, max: 4.6, promedio: 4.3 }, fuente: 'Estimación' },
  },

  cottet: {
    id: 'cottet',
    nombre: 'Cottet 1902',
    tipo: 'Grupo Óptico-Auditivo Premium',
    propietario: 'Familia Cottet',
    añoFundacion: 1902,
    presenciaEspana: 'Fuerte en Cataluña',
    cuotaMercadoEstimada: 4,
    color: '#b45309',
    descripcion: 'Grupo óptico histórico con una división auditiva muy sólida. Imagen premium, ubicaciones de lujo y una clientela muy fiel de alto poder adquisitivo en Cataluña.',
    estrategiaOperativa: 'Posicionamiento premium y experiencial. Locales emblemáticos (flagships). Combinan moda (gafas) con salud auditiva de alto nivel.',
    metricasNegocio: { ratioPacientesAnual: 90, facturacionMedia: '400.000€', ticketMedio: '3.200€' },
    analisisSentimiento: {
      quejasComunes: ['Precios elevados', 'Sensación de elitismo'],
      elogiosComunes: ['Experiencia de compra inmejorable', 'Profesionales de gran prestigio']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: 'Alta precisión' },
      teleaudiologia: { disponible: true, precio: 'Disponible', nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Excelente', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 1200, max: 2000, display: '1.200€ – 2.000€', marcas: ['Widex', 'Starkey'] },
        gama_media: { min: 2000, max: 4000, display: '2.000€ – 4.000€', marcas: ['Phonak'] },
        gama_alta: { min: 4000, max: 7500, display: '4.000€ – 7.500€', marcas: ['Premium range'] },
      },
    },
    puntosFuertes: ['Imagen de marca impecable', 'Ubicaciones estratégicas', 'Calidad de servicio'],
    puntosDebiles: ['Barrera de precio', 'Limitado geográficamente a Cataluña/Madrid'],
    vulnerabilidades: [
      { tipo: 'precio', titulo: 'Nicho restringido', descripcion: 'Sus precios excluyen a gran parte de la población', oportunidadClinosord: 'Ofrecer la misma tecnología con un trato social y precios un 20% inferiores.' }
    ],
    ratings: { google: { min: 4.5, max: 4.9, promedio: 4.7 }, fuente: 'Estimación' },
  },

  eurosone: {
    id: 'eurosone',
    nombre: 'Eurosone',
    tipo: 'Cadena Regional',
    propietario: 'Capital Nacional',
    añoFundacion: 2010,
    presenciaEspana: 'Referente en Madrid',
    cuotaMercadoEstimada: 3,
    color: '#6d28d9',
    descripcion: 'Referente en Madrid y Comunidad de Madrid, conocidos por sus precios altamente competitivos y campañas de marketing directo agresivas.',
    estrategiaOperativa: 'Liderazgo en costes. Gran volumen de adaptaciones. Publicidad centrada en ofertas y descuentos directos.',
    metricasNegocio: { ratioPacientesAnual: 160, facturacionMedia: '280.000€', ticketMedio: '1.600€' },
    analisisSentimiento: {
      quejasComunes: ['Consultas a veces rápidas por volumen', 'Ambiente más comercial que clínico'],
      elogiosComunes: ['Los mejores precios de Madrid', 'Rapidez en la entrega']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      financiacion: { disponible: true, precio: 'Muy flexible', nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Básico', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 600, max: 1200, display: '600€ – 1.200€', marcas: ['Marcas blancas'] },
        gama_media: { min: 1200, max: 2400, display: '1.200€ – 2.400€', marcas: ['Unitron', 'Bernafon'] },
        gama_alta: { min: 2400, max: 4500, display: '2.400€ – 4.500€', marcas: ['Phonak'] },
      },
    },
    puntosFuertes: ['Precios imbatibles en Madrid', 'Agilidad comercial', 'Fuerte inversión local'],
    puntosDebiles: ['Percepción de menor calidad por el bajo precio', 'Servicios post-venta saturados'],
    vulnerabilidades: [
      { tipo: 'calidad', titulo: 'Guerra de precios', descripcion: 'Dificultad para mantener márgenes y calidad', oportunidadClinosord: 'Posicionarse como "Social y Humano" frente a lo "Económico y Rápido".' }
    ],
    ratings: { google: { min: 3.8, max: 4.3, promedio: 4.1 }, fuente: 'Estimación' },
  },

  audias: {
    id: 'audias',
    nombre: 'Audias Centro Auditivo',
    tipo: 'Cadena Independiente',
    propietario: 'Independiente',
    añoFundacion: 2012,
    presenciaEspana: 'Madrid y Noroeste',
    cuotaMercadoEstimada: 2,
    color: '#4f46e5',
    descripcion: 'Cadena de centros independientes con una fuerte vocación de servicio personalizado. Referente en Madrid por su trato humano y profesional.',
    estrategiaOperativa: 'Modelo de gabinete de autor. Gran enfoque en la fidelización del paciente y recomendaciones de otorrinolaringólogos locales.',
    metricasNegocio: { ratioPacientesAnual: 80, facturacionMedia: '180.000€', ticketMedio: '2.200€' },
    analisisSentimiento: {
      quejasComunes: ['Citas a veces con espera prolongada'],
      elogiosComunes: ['Te escuchan de verdad', 'Seguimiento muy cercano']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Excelente', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 900, max: 1600, display: '900€ – 1.600€', marcas: ['Oticon'] },
        gama_media: { min: 1600, max: 3200, display: '1.600€ – 3.200€', marcas: ['Oticon Real'] },
        gama_alta: { min: 3200, max: 6000, display: '3.200€ – 6.000€', marcas: ['Premium'] },
      },
    },
    puntosFuertes: ['Trato personalizado', 'Reputación clínica', 'Fidelidad del paciente'],
    puntosDebiles: ['Menor visibilidad de marca', 'Escala limitada'],
    vulnerabilidades: [
      { tipo: 'escala', titulo: 'Dificultad competitiva', descripcion: 'Menos recursos para publicidad masiva', oportunidadClinosord: 'Compartir valores de cercanía pero con mayor apoyo tecnológico y social.' }
    ],
    ratings: { google: { min: 4.4, max: 4.8, promedio: 4.6 }, fuente: 'Estimación' },
  },

  audiotek: {
    id: 'audiotek',
    nombre: 'Audiotek',
    tipo: 'Cadena Regional',
    propietario: 'Capital Nacional',
    añoFundacion: 2008,
    presenciaEspana: 'Principalmente en Cataluña',
    cuotaMercadoEstimada: 3,
    color: '#ec4899',
    descripcion: 'Con más de 15 años de experiencia, Audiotek opera principalmente en Cataluña, ofreciendo soluciones auditivas con un enfoque clínico y tecnológico equilibrado.',
    estrategiaOperativa: 'Especialización en tecnología de última generación. Presencia en barrios residenciales y acuerdos con mutuas médicas.',
    metricasNegocio: { ratioPacientesAnual: 110, facturacionMedia: '240.000€', ticketMedio: '2.000€' },
    analisisSentimiento: {
      quejasComunes: ['Gestión de citas mejorable'],
      elogiosComunes: ['Buenos profesionales', 'Tecnología avanzada']
    },
    servicios: {
      audiometria: { disponible: true, precio: 'Gratuita', nota: '' },
      adaptacionAudifonos: { disponible: true, precio: 'Incluida', nota: '' },
      seguimientoPersonalizado: { disponible: true, precio: 'Bueno', nota: '' },
    },
    precios: {
      audiometria: { min: 0, max: 0, display: 'Gratuita' },
      audifonos: {
        gama_basica: { min: 850, max: 1500, display: '850€ – 1.500€', marcas: ['Resound'] },
        gama_media: { min: 1500, max: 3100, display: '1.500€ – 3.100€', marcas: ['Resound Omnia'] },
        gama_alta: { min: 3100, max: 5800, display: '3.100€ – 5.800€', marcas: ['Resound Nexia'] },
      },
    },
    puntosFuertes: ['Experiencia consolidada en Cataluña', 'Equilibrio clínico-comercial', 'Buenos acuerdos locales'],
    puntosDebiles: ['Notoriedad de marca en proceso de expansión', 'Falta de servicios sociales estructurados'],
    vulnerabilidades: [
      { tipo: 'servicio', titulo: 'Oportunidad social', descripcion: 'Su enfoque es puramente clínico-tecnológico', oportunidadClinosord: 'A diferencia de Audiotek, Clinisord ofrece una dimensión social única.' }
    ],
    ratings: { google: { min: 4.1, max: 4.6, promedio: 4.4 }, fuente: 'Estimación' },
  },
};
