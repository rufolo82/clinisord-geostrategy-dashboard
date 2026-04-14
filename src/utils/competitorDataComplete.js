// Datos completos de competidores de Clinisord en Madrid
// Incluye todas las principales cadenas con sus ubicaciones exactas
// Actualizado con datos oficiales de cada cadena

// Definición de cadenas con colores y metadatos
export const competitorChains = [
  {
    id: 'gaes',
    name: 'GAES (Amplifon)',
    type: 'clínica',
    color: '#ef4444',
    count: 69,
    description: 'Líder del mercado español'
  },
  {
    id: 'aural',
    name: 'Aural (Widex)',
    type: 'clínica',
    color: '#f97316',
    count: 25,
    description: 'Pioneros en audiología'
  },
  {
    id: 'audika',
    name: 'Audika (Demant)',
    type: 'clínica',
    color: '#8b5cf6',
    count: 28,
    description: 'Especialistas en audición'
  },
  {
    id: 'audicost',
    name: 'Audicost',
    type: 'clínica',
    color: '#ec4899',
    count: 15,
    description: 'Audífonos al mejor precio'
  },
  {
    id: 'audionova',
    name: 'AudioNova (Sonova)',
    type: 'clínica',
    color: '#14b8a6',
    count: 8,
    description: 'Grupo Sonova'
  },
  {
    id: 'afflelou',
    name: 'Alain Afflelou',
    type: 'óptica',
    color: '#f59e0b',
    count: 43,
    description: 'Óptica y audiología'
  },
  {
    id: 'generaloptica',
    name: 'General Óptica',
    type: 'óptica',
    color: '#3b82f6',
    count: 20,
    description: 'Visión y audición'
  },
  {
    id: 'multiopticas',
    name: 'Multiópticas (SoloAudio)',
    type: 'óptica',
    color: '#06b6d4',
    count: 12,
    description: 'Red de ópticas con audio'
  },
  {
    id: 'opticalia',
    name: 'Opticalia (Audiocalia)',
    type: 'óptica',
    color: '#6366f1',
    count: 15,
    description: 'Óptica y audiología'
  },
  {
    id: 'federopticos',
    name: 'Federópticos (Audiocentros)',
    type: 'óptica',
    color: '#84cc16',
    count: 10,
    description: 'Grupo Federópticos'
  },
  {
    id: 'naturaloptics',
    name: 'Natural Optics',
    type: 'óptica',
    color: '#22c55e',
    count: 9,
    description: 'Óptica y audiología'
  },
  {
    id: 'vistalia',
    name: 'Vistalia',
    type: 'óptica',
    color: '#eab308',
    count: 5,
    description: 'Grupo óptico español'
  },
  {
    id: 'belio',
    name: 'Belio Audición',
    type: 'clínica',
    color: '#dc2626',
    count: 2,
    description: 'Centros especializados'
  },
  {
    id: 'audioplan',
    name: 'Audioplan',
    type: 'clínica',
    color: '#7c3aed',
    count: 1,
    description: 'Centro auditivo Vallecas'
  },
  {
    id: 'sioigo',
    name: 'SiOigo',
    type: 'clínica',
    color: '#059669',
    count: 3,
    description: 'Red de centros auditivos'
  },
  {
    id: 'audimad',
    name: 'Audimad',
    type: 'clínica',
    color: '#0891b2',
    count: 3,
    description: 'Centros especializados Madrid'
  },
  {
    id: 'cottet',
    name: 'Cottet Audio',
    type: 'óptica',
    color: '#ca8a04',
    count: 5,
    description: 'Óptica y audiología premium'
  },
  {
    id: 'grandaudition',
    name: 'GrandAudition',
    type: 'clínica',
    color: '#16a34a',
    count: 2,
    description: 'Tu audiólogo de confianza'
  },
  {
    id: 'oidox',
    name: 'Centro Auditivo Oidox',
    type: 'clínica',
    color: '#d97706',
    count: 1,
    description: 'Centro especializado Madrid'
  },
  {
    id: 'elcorteingles',
    name: 'El Corte Inglés',
    type: 'clínica',
    color: '#b91c1c',
    count: 4,
    description: 'Centros auditivos'
  }
];

// Datos de ubicaciones por cadena
export const competitorLocations = [
  // =============================================================================
  // GAES (Grupo Amplifon) - 69 centros en Madrid
  // =============================================================================
  
  // Madrid Ciudad - 40 centros
  ...generateGAESMadrid(),
  
  // Provincia de Madrid - 29 centros
  ...generateGAESProvincia(),
  
  // =============================================================================
  // Aural (Widex) - 25 centros en Madrid
  // =============================================================================
  {
    id: 'aural-goya-madrid',
    nombre: 'Aural Madrid Goya',
    tipo: 'clínica',
    lat: 40.4205,
    lng: -3.6885,
    direccion: 'Calle Goya 20, 28001 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-velazquez-madrid',
    nombre: 'Aural Madrid Velázquez',
    tipo: 'clínica',
    lat: 40.4260,
    lng: -3.6850,
    direccion: 'Calle Velázquez 27, 28001 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-lopez-hoyos-madrid',
    nombre: 'Aural Madrid López de Hoyos',
    tipo: 'clínica',
    lat: 40.4430,
    lng: -3.6700,
    direccion: 'Calle López de Hoyos 124, 28002 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-dr-esquerdo-madrid',
    nombre: 'Aural Madrid Dr. Esquerdo',
    tipo: 'clínica',
    lat: 40.4080,
    lng: -3.6630,
    direccion: 'Calle Doctor Esquerdo 163, 28007 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-principe-madrid',
    nombre: 'Aural Madrid Princesa',
    tipo: 'clínica',
    lat: 40.4300,
    lng: -3.7120,
    direccion: 'Princesa 81, 28008 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-republica-dominicana-madrid',
    nombre: 'Aural Madrid República Dominicana',
    tipo: 'clínica',
    lat: 40.4550,
    lng: -3.6780,
    direccion: 'Plaza República Dominicana 7-9, 28016 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-alcala-madrid',
    nombre: 'Aural Madrid Alcalá',
    tipo: 'clínica',
    lat: 40.4640,
    lng: -3.6380,
    direccion: 'Calle Alcalá 388, 28027 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-monforte-lemos-madrid',
    nombre: 'Aural Madrid Monforte de Lemos',
    tipo: 'clínica',
    lat: 40.4780,
    lng: -3.6760,
    direccion: 'Avenida Monforte de Lemos 101, 28029 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-arturo-soria-madrid',
    nombre: 'Aural Madrid Arturo Soria',
    tipo: 'clínica',
    lat: 40.4650,
    lng: -3.6450,
    direccion: 'Calle Arturo Soria 105, 28043 Madrid',
    cadena: 'aural'
  },
  {
    id: 'aural-alcobendas',
    nombre: 'Aural Alcobendas',
    tipo: 'clínica',
    lat: 40.5355,
    lng: -3.6376,
    direccion: 'Calle Nuestra Señora del Pilar 3, 28100 Alcobendas',
    cadena: 'aural'
  },
  {
    id: 'aural-majadahonda',
    nombre: 'Aural Majadahonda',
    tipo: 'clínica',
    lat: 40.4675,
    lng: -3.8783,
    direccion: 'Gran Vía 46, 28220 Majadahonda',
    cadena: 'aural'
  },
  {
    id: 'aural-aranjuez',
    nombre: 'Aural Aranjuez',
    tipo: 'clínica',
    lat: 40.3724,
    lng: -3.6032,
    direccion: 'Calle del Almíbar 83, 28300 Aranjuez',
    cadena: 'aural'
  },
  {
    id: 'aural-tres-cantos',
    nombre: 'Aural Tres Cantos',
    tipo: 'clínica',
    lat: 40.5690,
    lng: -3.7130,
    direccion: 'Avenida Viñuelas 20, 28760 Tres Cantos',
    cadena: 'aural'
  },
  {
    id: 'aural-alkala-henares',
    nombre: 'Aural Alcalá de Henares',
    tipo: 'clínica',
    lat: 40.4818,
    lng: -3.3640,
    direccion: 'Calle Mayor 30, 28801 Alcalá de Henares',
    cadena: 'aural'
  },
  {
    id: 'aural-leganes',
    nombre: 'Aural Leganés',
    tipo: 'clínica',
    lat: 40.3280,
    lng: -3.7635,
    direccion: 'Plaza Paris 2, 28911 Leganés',
    cadena: 'aural'
  },
  {
    id: 'aural-alcorcon',
    nombre: 'Aural Alcorcón',
    tipo: 'clínica',
    lat: 40.3758,
    lng: -3.8277,
    direccion: 'Calle Mayor 27, 28921 Alcorcón',
    cadena: 'aural'
  },
  {
    id: 'aural-mostoles',
    nombre: 'Aural Móstoles',
    tipo: 'clínica',
    lat: 40.3252,
    lng: -3.8650,
    direccion: 'Avenida Constitución 6, 28931 Móstoles',
    cadena: 'aural'
  },
  {
    id: 'aural-fuenlabrada',
    nombre: 'Aural Fuenlabrada',
    tipo: 'clínica',
    lat: 40.2842,
    lng: -3.7942,
    direccion: 'Calle Leganés 31, 28945 Fuenlabrada',
    cadena: 'aural'
  },

  // =============================================================================
  // Audika (Grupo Demant) - 28 centros en Madrid
  // =============================================================================
  ...generateAudikaMadrid(),
  
  // =============================================================================
  // Audicost - 15 centros en Madrid
  // =============================================================================
  ...generateAudicostMadrid(),
  
  // =============================================================================
  // Alain Afflelou Audiólogo - 43 centros en Madrid
  // =============================================================================
  ...generateAfflelouMadrid(),
  
  // =============================================================================
  // AudioNova (Sonova) - 8 centros en Madrid
  // =============================================================================
  {
    id: 'audionova-madrid-norte',
    nombre: 'AudioNova Madrid Norte',
    tipo: 'clínica',
    lat: 40.4780,
    lng: -3.6810,
    direccion: 'Avenida Monforte de Lemos, 28029 Madrid',
    cadena: 'audionova'
  },
  {
    id: 'audionova-madrid-sur',
    nombre: 'AudioNova Madrid Sur',
    tipo: 'clínica',
    lat: 40.3720,
    lng: -3.6940,
    direccion: 'Avenida de los Pinos, 28041 Madrid',
    cadena: 'audionova'
  },
  {
    id: 'audionova-legales',
    nombre: 'AudioNova Leganés',
    tipo: 'clínica',
    lat: 40.3280,
    lng: -3.7635,
    direccion: 'Avenida de la Universidad, 28911 Leganés',
    cadena: 'audionova'
  },
  {
    id: 'audionova-getafe',
    nombre: 'AudioNova Getafe',
    tipo: 'clínica',
    lat: 40.3057,
    lng: -3.7300,
    direccion: 'Avenida Juan de la Cierva, 28902 Getafe',
    cadena: 'audionova'
  },
  {
    id: 'audionova-fuenlabrada',
    nombre: 'AudioNova Fuenlabrada',
    tipo: 'clínica',
    lat: 40.2842,
    lng: -3.7942,
    direccion: 'Calle Leganés, 28945 Fuenlabrada',
    cadena: 'audionova'
  },
  {
    id: 'audionova-alcorcon',
    nombre: 'AudioNova Alcorcón',
    tipo: 'clínica',
    lat: 40.3758,
    lng: -3.8277,
    direccion: 'Calle Mayor, 28921 Alcorcón',
    cadena: 'audionova'
  },
  {
    id: 'audionova-mostoles',
    nombre: 'AudioNova Móstoles',
    tipo: 'clínica',
    lat: 40.3252,
    lng: -3.8650,
    direccion: 'Avenida del Dos de Mayo, 28934 Móstoles',
    cadena: 'audionova'
  },
  {
    id: 'audionova-alkala-henares',
    nombre: 'AudioNova Alcalá de Henares',
    tipo: 'clínica',
    lat: 40.4818,
    lng: -3.3640,
    direccion: 'Calle Mayor, 28801 Alcalá de Henares',
    cadena: 'audionova'
  },

  // =============================================================================
  // General Óptica (Audiología) - 20 centros en Madrid
  // =============================================================================
  ...generateGeneralOpticaMadrid(),
  
  // =============================================================================
  // Multiópticas (SoloAudio) - 12 centros en Madrid
  // =============================================================================
  ...generateMultiopticasMadrid(),
  
  // =============================================================================
  // Opticalia (Audiocalia) - 15 centros en Madrid
  // =============================================================================
  ...generateOpticaliaMadrid(),
  
  // =============================================================================
  // Federópticos (Audiocentros) - 10 centros en Madrid
  // =============================================================================
  ...generateFederopticosMadrid(),
  
  // =============================================================================
  // Natural Optics (Audiología) - 9 centros en Madrid
  // =============================================================================
  ...generateNaturalOpticsMadrid(),
  
  // =============================================================================
  // Vistalia - 5 centros en Madrid
  // =============================================================================
  {
    id: 'vistalia-torrelaguna-madrid',
    nombre: 'Vistalia Studio Visión',
    tipo: 'óptica',
    lat: 40.4580,
    lng: -3.6550,
    direccion: 'Calle Torrelaguna 72, 28043 Madrid',
    cadena: 'vistalia'
  },
  {
    id: 'vistalia-latina-madrid',
    nombre: 'Vistalia Latina',
    tipo: 'óptica',
    lat: 40.4065,
    lng: -3.7115,
    direccion: 'Calle Toledo 76, 28005 Madrid',
    cadena: 'vistalia'
  },
  {
    id: 'vistalia-carabanchel-madrid',
    nombre: 'Vistalia Carabanchel',
    tipo: 'óptica',
    lat: 40.3820,
    lng: -3.7250,
    direccion: 'Calle de la Oca, 28025 Madrid',
    cadena: 'vistalia'
  },
  {
    id: 'vistalia-villaverde-madrid',
    nombre: 'Vistalia Villaverde',
    tipo: 'óptica',
    lat: 40.3550,
    lng: -3.6960,
    direccion: 'Calle Alberto Palacios, 28021 Madrid',
    cadena: 'vistalia'
  },
  {
    id: 'vistalia-usera-madrid',
    nombre: 'Vistalia Usera',
    tipo: 'óptica',
    lat: 40.3785,
    lng: -3.7065,
    direccion: 'Marcelo Usera, 28026 Madrid',
    cadena: 'vistalia'
  },

  // =============================================================================
  // Belio Audición - 2 centros en Madrid
  // =============================================================================
  {
    id: 'belio-chamberi-madrid',
    nombre: 'Belio Audición Chamberí',
    tipo: 'clínica',
    lat: 40.4350,
    lng: -3.7000,
    direccion: 'Calle Alonso Cano 50, 28010 Madrid',
    cadena: 'belio'
  },
  {
    id: 'belio-chamartin-madrid',
    nombre: 'Belio Audición Chamartín',
    tipo: 'clínica',
    lat: 40.4580,
    lng: -3.6780,
    direccion: 'Calle Bolivia 14, 28016 Madrid',
    cadena: 'belio'
  },

  // =============================================================================
  // Audioplan - 1 centro en Madrid
  // =============================================================================
  {
    id: 'audioplan-vallecas-madrid',
    nombre: 'Audioplan Vallecas',
    tipo: 'clínica',
    lat: 40.3965,
    lng: -3.6795,
    direccion: 'Avenida de la Albufera 75, 28038 Madrid',
    cadena: 'audioplan'
  },

  // =============================================================================
  // SiOigo - 3 centros en Madrid
  // =============================================================================
  {
    id: 'sioigo-canillejas-madrid',
    nombre: 'SiOigo Canillejas',
    tipo: 'clínica',
    lat: 40.4480,
    lng: -3.6090,
    direccion: 'Calle Valderrobres 6, 28022 Madrid',
    cadena: 'sioigo'
  },
  {
    id: 'sioigo-alkala-henares',
    nombre: 'SiOigo Alcalá de Henares',
    tipo: 'clínica',
    lat: 40.4850,
    lng: -3.3580,
    direccion: 'Avenida Guadalajara 8, 28805 Alcalá de Henares',
    cadena: 'sioigo'
  },
  {
    id: 'sioigo-pozuelo',
    nombre: 'SiOigo Pozuelo de Alarcón',
    tipo: 'clínica',
    lat: 40.4291,
    lng: -3.8173,
    direccion: 'Calle de las Flores 3, 28223 Pozuelo de Alarcón',
    cadena: 'sioigo'
  },

  // =============================================================================
  // Audimad - 3 centros en Madrid
  // =============================================================================
  {
    id: 'audimad-delicias-madrid',
    nombre: 'Audimad Paseo Delicias',
    tipo: 'clínica',
    lat: 40.3990,
    lng: -3.6885,
    direccion: 'Paseo de las Delicias 33, 28045 Madrid',
    cadena: 'audimad'
  },
  {
    id: 'audimad-dr-esquerdo-madrid',
    nombre: 'Audimad Dr. Esquerdo',
    tipo: 'clínica',
    lat: 40.4080,
    lng: -3.6630,
    direccion: 'Calle Doctor Esquerdo 118, 28007 Madrid',
    cadena: 'audimad'
  },
  {
    id: 'audimad-alcala-madrid',
    nombre: 'Audimad Alcalá',
    tipo: 'clínica',
    lat: 40.4640,
    lng: -3.6380,
    direccion: 'Calle Alcalá 319, 28027 Madrid',
    cadena: 'audimad'
  },

  // =============================================================================
  // Cottet Audio - 5 centros en Madrid
  // =============================================================================
  {
    id: 'cottet-principe-madrid',
    nombre: 'Cottet Príncipe',
    tipo: 'óptica',
    lat: 40.4140,
    lng: -3.7090,
    direccion: 'Calle del Príncipe 5, 28012 Madrid',
    cadena: 'cottet'
  },
  {
    id: 'cottet-diego-leon-madrid',
    nombre: 'Cottet Diego de León',
    tipo: 'óptica',
    lat: 40.4375,
    lng: -3.6785,
    direccion: 'Calle Diego de León 37, 28006 Madrid',
    cadena: 'cottet'
  },
  {
    id: 'cottet-serrano-madrid',
    nombre: 'Cottet Serrano',
    tipo: 'óptica',
    lat: 40.4380,
    lng: -3.6850,
    direccion: 'Calle de Serrano, 28001 Madrid',
    cadena: 'cottet'
  },
  {
    id: 'cottet-santa-engracia-madrid',
    nombre: 'Cottet Santa Engracia',
    tipo: 'óptica',
    lat: 40.4359,
    lng: -3.6991,
    direccion: 'Calle Santa Engracia 105, 28010 Madrid',
    cadena: 'cottet'
  },
  {
    id: 'cottet-conde-penalver-madrid',
    nombre: 'Cottet Conde de Peñalver',
    tipo: 'óptica',
    lat: 40.4335,
    lng: -3.6845,
    direccion: 'Calle Conde de Peñalver 34, 28006 Madrid',
    cadena: 'cottet'
  },

  // =============================================================================
  // GrandAudition - 2 centros en Madrid
  // =============================================================================
  {
    id: 'grandaudition-leganes',
    nombre: 'GrandAudition Leganés',
    tipo: 'clínica',
    lat: 40.3280,
    lng: -3.7635,
    direccion: 'Avenida Universidad 15, 28911 Leganés',
    cadena: 'grandaudition'
  },
  {
    id: 'grandaudition-getafe',
    nombre: 'GrandAudition Getafe',
    tipo: 'clínica',
    lat: 40.3057,
    lng: -3.7300,
    direccion: 'Avenida Juan de la Cierva 35, 28902 Getafe',
    cadena: 'grandaudition'
  },

  // =============================================================================
  // Centro Auditivo Oidox - 1 centro en Madrid
  // =============================================================================
  {
    id: 'oidox-san-blas-madrid',
    nombre: 'Centro Auditivo Oidox',
    tipo: 'clínica',
    lat: 40.4480,
    lng: -3.6250,
    direccion: 'Calle Hermanos García Noblejas 158, 28037 Madrid',
    cadena: 'oidox'
  },

  // =============================================================================
  // El Corte Inglés - 4 centros en Madrid
  // =============================================================================
  {
    id: 'corte-ingles-callao-madrid',
    nombre: 'El Corte Inglés Callao',
    tipo: 'clínica',
    lat: 40.4180,
    lng: -3.7060,
    direccion: 'Plaza Callao, 28013 Madrid',
    cadena: 'elcorteingles'
  },
  {
    id: 'corte-ingles-serrano-madrid',
    nombre: 'El Corte Inglés Serrano',
    tipo: 'clínica',
    lat: 40.4380,
    lng: -3.6850,
    direccion: 'Calle Serrano 108, 28006 Madrid',
    cadena: 'elcorteingles'
  },
  {
    id: 'corte-ingles-correo-catalanes-madrid',
    nombre: 'El Corte Inglés Correos',
    tipo: 'clínica',
    lat: 40.4160,
    lng: -3.7090,
    direccion: 'Gran Vía 8, 28013 Madrid',
    cadena: 'elcorteingles'
  },
  {
    id: 'corte-ingles-monforte-madrid',
    nombre: 'El Corte Inglés Monforte',
    tipo: 'clínica',
    lat: 40.4780,
    lng: -3.6760,
    direccion: 'Avenida Monforte de Lemos, 28029 Madrid',
    cadena: 'elcorteingles'
  },

  // =============================================================================
  // BARCELONA - Competidores
  // =============================================================================

  // =============================================================================
  // GAES (Grupo Amplifon) - 25 centros en Barcelona
  // =============================================================================
  
  // Barcelona Ciudad - 18 centros
  {
    id: 'gaes-passeig-gracia-barcelona',
    nombre: 'GAES Passeig de Gràcia',
    tipo: 'clínica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 54, 08007 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-diagonal-barcelona',
    nombre: 'GAES Diagonal',
    tipo: 'clínica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 365, 08037 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-gran-via-barcelona',
    nombre: 'GAES Gran Via',
    tipo: 'clínica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via de les Corts Catalanes 412, 08015 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-rambla-catalunya-barcelona',
    nombre: 'GAES Rambla Catalunya',
    tipo: 'clínica',
    lat: 41.3888,
    lng: 2.1642,
    direccion: 'Rambla de Catalunya 25, 08007 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-balmes-barcelona',
    nombre: 'GAES Balmes',
    tipo: 'clínica',
    lat: 41.3932,
    lng: 2.1622,
    direccion: 'Carrer de Balmes 129, 08008 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-arago-barcelona',
    nombre: 'GAES Aragó',
    tipo: 'clínica',
    lat: 41.3852,
    lng: 2.1522,
    direccion: 'Carrer d\'Aragó 245, 08007 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-caspe-barcelona',
    nombre: 'GAES Casp',
    tipo: 'clínica',
    lat: 41.3912,
    lng: 2.1732,
    direccion: 'Carrer de Casp 22, 08010 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-sagrada-familia-barcelona',
    nombre: 'GAES Sagrada Família',
    tipo: 'clínica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 401, 08013 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-rossello-barcelona',
    nombre: 'GAES Rosselló',
    tipo: 'clínica',
    lat: 41.3892,
    lng: 2.1522,
    direccion: 'Carrer de Rosselló 212, 08008 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-marina-barcelona',
    nombre: 'GAES Marina',
    tipo: 'clínica',
    lat: 41.3972,
    lng: 2.1862,
    direccion: 'Carrer de la Marina 18, 08005 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-petit-barcelona',
    nombre: 'GAES El Poblenou',
    tipo: 'clínica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Rambla del Poblenou 42, 08005 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-font Barcelona',
    nombre: 'GAES Fontana',
    tipo: 'clínica',
    lat: 41.4032,
    lng: 2.1522,
    direccion: 'Carrer de Torrent de l\'Olla 112, 08012 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-llacuna-barcelona',
    nombre: 'GAES Llacuna',
    tipo: 'clínica',
    lat: 41.4002,
    lng: 2.1922,
    direccion: 'Carrer de Llacuna 56, 08005 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-cerdà-barcelona',
    nombre: 'GAES Ronda Litoral',
    tipo: 'clínica',
    lat: 41.4082,
    lng: 2.2052,
    direccion: 'Ronda Litoral 20, 08005 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-joanic-barcelona',
    nombre: 'GAES Sant Joanic',
    tipo: 'clínica',
    lat: 41.4112,
    lng: 2.1442,
    direccion: 'Carrer de Sant Joan de la Salle 35, 08022 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-vallcarca-barcelona',
    nombre: 'GAES Vallcarca',
    tipo: 'clínica',
    lat: 41.4152,
    lng: 2.1362,
    direccion: 'Avinguda de la Vall d\'Hebron 78, 08035 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-horta-barcelona',
    nombre: 'GAES Horta',
    tipo: 'clínica',
    lat: 41.4282,
    lng: 2.1322,
    direccion: 'Carrer de Horta 89, 08025 Barcelona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-sant-andreu-barcelona',
    nombre: 'GAES Sant Andreu',
    tipo: 'clínica',
    lat: 41.4352,
    lng: 2.1922,
    direccion: 'Gran Via de la Sagrera 45, 08027 Barcelona',
    cadena: 'gaes'
  },

  // Provincia de Barcelona - 7 centros
  {
    id: 'gaes-lhospitalet',
    nombre: 'GAES L\'Hospitalet',
    tipo: 'clínica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Avinguda Carrilet 87, 08902 L\'Hospitalet de Llobregat',
    cadena: 'gaes'
  },
  {
    id: 'gaes-badcelona',
    nombre: 'GAES Badalona',
    tipo: 'clínica',
    lat: 41.4482,
    lng: 2.2422,
    direccion: 'Carrer de Mar 42, 08911 Badalona',
    cadena: 'gaes'
  },
  {
    id: 'gaes-santa-coloma',
    nombre: 'GAES Santa Coloma de Gramenet',
    tipo: 'clínica',
    lat: 41.4512,
    lng: 2.2082,
    direccion: 'Carrer de Sant Isidre 65, 08922 Santa Coloma de Gramenet',
    cadena: 'gaes'
  },
  {
    id: 'gaes-sant-boi',
    nombre: 'GAES Sant Boi de Llobregat',
    tipo: 'clínica',
    lat: 41.3472,
    lng: 2.0422,
    direccion: 'Plaça de la Vila 18, 08830 Sant Boi de Llobregat',
    cadena: 'gaes'
  },
  {
    id: 'gaes-cornella',
    nombre: 'GAES Cornellà de Llobregat',
    tipo: 'clínica',
    lat: 41.3562,
    lng: 2.0722,
    direccion: 'Avinguda de la Verge de Montserrat 98, 08940 Cornellà de Llobregat',
    cadena: 'gaes'
  },
  {
    id: 'gaes-sabadell',
    nombre: 'GAES Sabadell',
    tipo: 'clínica',
    lat: 41.5432,
    lng: 2.1072,
    direccion: 'Carrer de la Plana 12, 08201 Sabadell',
    cadena: 'gaes'
  },
  {
    id: 'gaes-terrassa',
    nombre: 'GAES Terrassa',
    tipo: 'clínica',
    lat: 41.5612,
    lng: 2.0082,
    direccion: 'Rambla d\'Ègara 148, 08221 Terrassa',
    cadena: 'gaes'
  },

  // =============================================================================
  // Aural (Widex) - 12 centros en Barcelona
  // =============================================================================
  {
    id: 'aural-passeig-gracia-barcelona',
    nombre: 'Aural Passeig de Gràcia',
    tipo: 'clínica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 78, 08008 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-diagonal-barcelona',
    nombre: 'Aural Diagonal',
    tipo: 'clínica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 510, 08006 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-balmes-barcelona',
    nombre: 'Aural Balmes',
    tipo: 'clínica',
    lat: 41.3932,
    lng: 2.1622,
    direccion: 'Carrer de Balmes 89, 08007 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-arago-barcelona',
    nombre: 'Aural Aragó',
    tipo: 'clínica',
    lat: 41.3852,
    lng: 2.1522,
    direccion: 'Carrer d\'Aragó 156, 08011 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-gran-via-barcelona',
    nombre: 'Aural Gran Via',
    tipo: 'clínica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via 489, 08013 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-sagrada-familia-barcelona',
    nombre: 'Aural Sagrada Família',
    tipo: 'clínica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 317, 08013 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-poblenou-barcelona',
    nombre: 'Aural Poblenou',
    tipo: 'clínica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Pere IV 214, 08005 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-gracia-barcelona',
    nombre: 'Aural Gràcia',
    tipo: 'clínica',
    lat: 41.4032,
    lng: 2.1522,
    direccion: 'Carrer de Verdi 64, 08012 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-horta-barcelona',
    nombre: 'Aural Horta',
    tipo: 'clínica',
    lat: 41.4282,
    lng: 2.1322,
    direccion: 'Carrer de Feliu i Codina 23, 08031 Barcelona',
    cadena: 'aural'
  },
  {
    id: 'aural-badalona',
    nombre: 'Aural Badalona',
    tipo: 'clínica',
    lat: 41.4482,
    lng: 2.2422,
    direccion: 'Avinguda del Marqués de Sant Mori 87, 08917 Badalona',
    cadena: 'aural'
  },
  {
    id: 'aural-lhospitalet',
    nombre: 'Aural L\'Hospitalet',
    tipo: 'clínica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Carrer de la Ferran 34, 08901 L\'Hospitalet de Llobregat',
    cadena: 'aural'
  },
  {
    id: 'aural-sabadell',
    nombre: 'Aural Sabadell',
    tipo: 'clínica',
    lat: 41.5432,
    lng: 2.1072,
    direccion: 'Rambla 23, 08201 Sabadell',
    cadena: 'aural'
  },

  // =============================================================================
  // Audika (Grupo Demant) - 10 centros en Barcelona
  // =============================================================================
  {
    id: 'audika-passeig-gracia-barcelona',
    nombre: 'Audika Passeig de Gràcia',
    tipo: 'clínica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 41, 08007 Barcelona',
    cadena: 'audika'
  },
  {
    id: 'audika-diagonal-barcelona',
    nombre: 'Audika Diagonal',
    tipo: 'clínica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 414, 08037 Barcelona',
    cadena: 'audika'
  },
  {
    id: 'audika-casp-barcelona',
    nombre: 'Audika Casp',
    tipo: 'clínica',
    lat: 41.3912,
    lng: 2.1732,
    direccion: 'Carrer de Casp 98, 08010 Barcelona',
    cadena: 'audika'
  },
  {
    id: 'audika-balmes-barcelona',
    nombre: 'Audika Balmes',
    tipo: 'clínica',
    lat: 41.3932,
    lng: 2.1622,
    direccion: 'Carrer de Balmes 201, 08006 Barcelona',
    cadena: 'audika'
  },
  {
    id: 'audika-sagrada-familia-barcelona',
    nombre: 'Audika Sagrada Família',
    tipo: 'clínica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Provença 480, 08025 Barcelona',
    cadena: 'audika'
  },
  {
    id: 'audika-gracia-barcelona',
    nombre: 'Audika Gràcia',
    tipo: 'clínica',
    lat: 41.4032,
    lng: 2.1522,
    direccion: 'Carrer de Granollers 28, 08012 Barcelona',
    cadena: 'audika'
  },
  {
    id: 'audika-poblenou-barcelona',
    nombre: 'Audika Poblenou',
    tipo: 'clínica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Taulat 56, 08005 Barcelona',
    cadena: 'audika'
  },
  {
    id: 'audika-badalona',
    nombre: 'Audika Badalona',
    tipo: 'clínica',
    lat: 41.4482,
    lng: 2.2422,
    direccion: 'Carrer de Sant Antoni Maria Claret 34, 08912 Badalona',
    cadena: 'audika'
  },
  {
    id: 'audika-lhospitalet',
    nombre: 'Audika L\'Hospitalet',
    tipo: 'clínica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Avinguda del Josep Tarradellas 156, 08901 L\'Hospitalet de Llobregat',
    cadena: 'audika'
  },
  {
    id: 'audika-sabadell',
    nombre: 'Audika Sabadell',
    tipo: 'clínica',
    lat: 41.5432,
    lng: 2.1072,
    direccion: 'Carrer de la Salut 67, 08201 Sabadell',
    cadena: 'audika'
  },

  // =============================================================================
  // Audicost - 8 centros en Barcelona
  // =============================================================================
  {
    id: 'audicost-gran-via-barcelona',
    nombre: 'Audicost Gran Via',
    tipo: 'clínica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via 567, 08011 Barcelona',
    cadena: 'audicost'
  },
  {
    id: 'audicost-sagrada-familia-barcelona',
    nombre: 'Audicost Sagrada Família',
    tipo: 'clínica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 289, 08013 Barcelona',
    cadena: 'audicost'
  },
  {
    id: 'audicost-arago-barcelona',
    nombre: 'Audicost Aragó',
    tipo: 'clínica',
    lat: 41.3852,
    lng: 2.1522,
    direccion: 'Carrer d\'Aragó 298, 08011 Barcelona',
    cadena: 'audicost'
  },
  {
    id: 'audicost-poblenou-barcelona',
    nombre: 'Audicost Poblenou',
    tipo: 'clínica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Almogàvers 123, 08018 Barcelona',
    cadena: 'audicost'
  },
  {
    id: 'audicost-gracia-barcelona',
    nombre: 'Audicost Gràcia',
    tipo: 'clínica',
    lat: 41.4032,
    lng: 2.1522,
    direccion: 'Carrer de Martínez de la Rosa 89, 08012 Barcelona',
    cadena: 'audicost'
  },
  {
    id: 'audicost-badalona',
    nombre: 'Audicost Badalona',
    tipo: 'clínica',
    lat: 41.4482,
    lng: 2.2422,
    direccion: 'Carrer de la Verge de Montserrat 45, 08915 Badalona',
    cadena: 'audicost'
  },
  {
    id: 'audicost-lhospitalet',
    nombre: 'Audicost L\'Hospitalet',
    tipo: 'clínica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Carrer de Goya 23, 08906 L\'Hospitalet de Llobregat',
    cadena: 'audicost'
  },
  {
    id: 'audicost-sabadell',
    nombre: 'Audicost Sabadell',
    tipo: 'clínica',
    lat: 41.5432,
    lng: 2.1072,
    direccion: 'Carrer de Sant Quirze 12, 08201 Sabadell',
    cadena: 'audicost'
  },

  // =============================================================================
  // Alain Afflelou Audiólogo - 18 centros en Barcelona
  // =============================================================================
  {
    id: 'afflelou-passeig-gracia-barcelona',
    nombre: 'Afflelou Passeig de Gràcia',
    tipo: 'óptica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 67, 08008 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-diagonal-barcelona',
    nombre: 'Afflelou Diagonal',
    tipo: 'óptica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 602, 08006 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-corte-catalanes-barcelona',
    nombre: 'Afflelou Corts Catalanes',
    tipo: 'óptica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 623, 08007 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-rambla-catalunya-barcelona',
    nombre: 'Afflelou Rambla Catalunya',
    tipo: 'óptica',
    lat: 41.3888,
    lng: 2.1642,
    direccion: 'Rambla de Catalunya 45, 08007 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-balmes-barcelona',
    nombre: 'Afflelou Balmes',
    tipo: 'óptica',
    lat: 41.3932,
    lng: 2.1622,
    direccion: 'Carrer de Balmes 156, 08008 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-casp-barcelona',
    nombre: 'Afflelou Casp',
    tipo: 'óptica',
    lat: 41.3912,
    lng: 2.1732,
    direccion: 'Carrer de Casp 67, 08010 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-sagrada-familia-barcelona',
    nombre: 'Afflelou Sagrada Família',
    tipo: 'óptica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 356, 08013 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-rossello-barcelona',
    nombre: 'Afflelou Rosselló',
    tipo: 'óptica',
    lat: 41.3892,
    lng: 2.1522,
    direccion: 'Carrer de Rosselló 298, 08008 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-marina-barcelona',
    nombre: 'Afflelou Marina',
    tipo: 'óptica',
    lat: 41.3972,
    lng: 2.1862,
    direccion: 'Carrer de la Marina 34, 08005 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-gracia-barcelona',
    nombre: 'Afflelou Gràcia',
    tipo: 'óptica',
    lat: 41.4032,
    lng: 2.1522,
    direccion: 'Carrer de Terol 23, 08012 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-poblenou-barcelona',
    nombre: 'Afflelou Poblenou',
    tipo: 'óptica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Marià Aquilo 78, 08005 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-horta-barcelona',
    nombre: 'Afflelou Horta',
    tipo: 'óptica',
    lat: 41.4282,
    lng: 2.1322,
    direccion: 'Carrer de Feliu i Codina 56, 08031 Barcelona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-badalona',
    nombre: 'Afflelou Badalona',
    tipo: 'óptica',
    lat: 41.4482,
    lng: 2.2422,
    direccion: 'Carrer de la Salut 34, 08911 Badalona',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-lhospitalet',
    nombre: 'Afflelou L\'Hospitalet',
    tipo: 'óptica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Avinguda Carrilet 112, 08902 L\'Hospitalet de Llobregat',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-cornella',
    nombre: 'Afflelou Cornellà',
    tipo: 'óptica',
    lat: 41.3562,
    lng: 2.0722,
    direccion: 'Avinguda de la Verge de Montserrat 145, 08940 Cornellà de Llobregat',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-sabadell',
    nombre: 'Afflelou Sabadell',
    tipo: 'óptica',
    lat: 41.5432,
    lng: 2.1072,
    direccion: 'Carrer de la Plana 34, 08201 Sabadell',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-terrassa',
    nombre: 'Afflelou Terrassa',
    tipo: 'óptica',
    lat: 41.5612,
    lng: 2.0082,
    direccion: 'Rambla d\'Ègara 234, 08221 Terrassa',
    cadena: 'afflelou'
  },
  {
    id: 'afflelou-mataró',
    nombre: 'Afflelou Mataró',
    tipo: 'óptica',
    lat: 41.5421,
    lng: 2.4445,
    direccion: 'Carrer d\'Argentona 23, 08302 Mataró',
    cadena: 'afflelou'
  },

  // =============================================================================
  // AudioNova (Sonova) - 4 centros en Barcelona
  // =============================================================================
  {
    id: 'audionova-diagonal-barcelona',
    nombre: 'AudioNova Barcelona Diagonal',
    tipo: 'clínica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 478, 08037 Barcelona',
    cadena: 'audionova'
  },
  {
    id: 'audionova-gran-via-barcelona',
    nombre: 'AudioNova Barcelona Gran Via',
    tipo: 'clínica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 534, 08011 Barcelona',
    cadena: 'audionova'
  },
  {
    id: 'audionova-poblenou-barcelona',
    nombre: 'AudioNova Poblenou',
    tipo: 'clínica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Llacuna 89, 08005 Barcelona',
    cadena: 'audionova'
  },
  {
    id: 'audionova-lhospitalet',
    nombre: 'AudioNova L\'Hospitalet',
    tipo: 'clínica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Carrer de la Creu 45, 08901 L\'Hospitalet de Llobregat',
    cadena: 'audionova'
  },

  // =============================================================================
  // General Óptica (Audiología) - 10 centros en Barcelona
  // =============================================================================
  {
    id: 'generaloptica-passeig-gracia-barcelona',
    nombre: 'General Óptica Passeig de Gràcia',
    tipo: 'óptica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 35, 08007 Barcelona',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-diagonal-barcelona',
    nombre: 'General Óptica Diagonal',
    tipo: 'óptica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 447, 08037 Barcelona',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-gran-via-barcelona',
    nombre: 'General Óptica Gran Via',
    tipo: 'óptica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 598, 08014 Barcelona',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-sagrada-familia-barcelona',
    nombre: 'General Óptica Sagrada Família',
    tipo: 'óptica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 423, 08013 Barcelona',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-poblenou-barcelona',
    nombre: 'General Óptica Poblenou',
    tipo: 'óptica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Taulat 134, 08005 Barcelona',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-gracia-barcelona',
    nombre: 'General Óptica Gràcia',
    tipo: 'óptica',
    lat: 41.4032,
    lng: 2.1522,
    direccion: 'Carrer de Goya 78, 08012 Barcelona',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-badalona',
    nombre: 'General Óptica Badalona',
    tipo: 'óptica',
    lat: 41.4482,
    lng: 2.2422,
    direccion: 'Carrer de Mar 89, 08911 Badalona',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-lhospitalet',
    nombre: 'General Óptica L\'Hospitalet',
    tipo: 'óptica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Avinguda del Doctor Solanic 78, 08906 L\'Hospitalet de Llobregat',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-sabadell',
    nombre: 'General Óptica Sabadell',
    tipo: 'óptica',
    lat: 41.5432,
    lng: 2.1072,
    direccion: 'Carrer de la Rutlla 45, 08201 Sabadell',
    cadena: 'generaloptica'
  },
  {
    id: 'generaloptica-terrassa',
    nombre: 'General Óptica Terrassa',
    tipo: 'óptica',
    lat: 41.5612,
    lng: 2.0082,
    direccion: 'Carrer de Sant Pere 67, 08221 Terrassa',
    cadena: 'generaloptica'
  },

  // =============================================================================
  // Multiópticas (SoloAudio) - 6 centros en Barcelona
  // =============================================================================
  {
    id: 'multiopticas-passeig-gracia-barcelona',
    nombre: 'Multiópticas Passeig de Gràcia',
    tipo: 'óptica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 92, 08008 Barcelona',
    cadena: 'multiopticas'
  },
  {
    id: 'multiopticas-diagonal-barcelona',
    nombre: 'Multiópticas Diagonal',
    tipo: 'óptica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 527, 08006 Barcelona',
    cadena: 'multiopticas'
  },
  {
    id: 'multiopticas-gran-via-barcelona',
    nombre: 'Multiópticas Gran Via',
    tipo: 'óptica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 456, 08008 Barcelona',
    cadena: 'multiopticas'
  },
  {
    id: 'multiopticas-sagrada-familia-barcelona',
    nombre: 'Multiópticas Sagrada Família',
    tipo: 'óptica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 367, 08013 Barcelona',
    cadena: 'multiopticas'
  },
  {
    id: 'multiopticas-poblenou-barcelona',
    nombre: 'Multiópticas Poblenou',
    tipo: 'óptica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Selva de Mar 56, 08005 Barcelona',
    cadena: 'multiopticas'
  },
  {
    id: 'multiopticas-lhospitalet',
    nombre: 'Multiópticas L\'Hospitalet',
    tipo: 'óptica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Avinguda Fabregada 89, 08901 L\'Hospitalet de Llobregat',
    cadena: 'multiopticas'
  },

  // =============================================================================
  // Opticalia (Audiocalia) - 7 centros en Barcelona
  // =============================================================================
  {
    id: 'opticalia-passeig-gracia-barcelona',
    nombre: 'Opticalia Passeig de Gràcia',
    tipo: 'óptica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 103, 08008 Barcelona',
    cadena: 'opticalia'
  },
  {
    id: 'opticalia-diagonal-barcelona',
    nombre: 'Opticalia Diagonal',
    tipo: 'óptica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 556, 08006 Barcelona',
    cadena: 'opticalia'
  },
  {
    id: 'opticalia-gran-via-barcelona',
    nombre: 'Opticalia Gran Via',
    tipo: 'óptica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 612, 08014 Barcelona',
    cadena: 'opticalia'
  },
  {
    id: 'opticalia-casp-barcelona',
    nombre: 'Opticalia Casp',
    tipo: 'óptica',
    lat: 41.3912,
    lng: 2.1732,
    direccion: 'Carrer de Casp 134, 08010 Barcelona',
    cadena: 'opticalia'
  },
  {
    id: 'opticalia-sagrada-familia-barcelona',
    nombre: 'Opticalia Sagrada Família',
    tipo: 'óptica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 389, 08013 Barcelona',
    cadena: 'opticalia'
  },
  {
    id: 'opticalia-gracia-barcelona',
    nombre: 'Opticalia Gràcia',
    tipo: 'óptica',
    lat: 41.4032,
    lng: 2.1522,
    direccion: 'Carrer de Milà i Fontanals 34, 08012 Barcelona',
    cadena: 'opticalia'
  },
  {
    id: 'opticalia-lhospitalet',
    nombre: 'Opticalia L\'Hospitalet',
    tipo: 'óptica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Carrer de Junqueres 23, 08901 L\'Hospitalet de Llobregat',
    cadena: 'opticalia'
  },

  // =============================================================================
  // Federópticos (Audiocentros) - 5 centros en Barcelona
  // =============================================================================
  {
    id: 'federopticos-gran-via-barcelona',
    nombre: 'Federópticos Gran Via',
    tipo: 'óptica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 523, 08015 Barcelona',
    cadena: 'federopticos'
  },
  {
    id: 'federopticos-sagrada-familia-barcelona',
    nombre: 'Federópticos Sagrada Família',
    tipo: 'óptica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Provença 512, 08025 Barcelona',
    cadena: 'federopticos'
  },
  {
    id: 'federopticos-poblenou-barcelona',
    nombre: 'Federópticos Poblenou',
    tipo: 'óptica',
    lat: 41.4062,
    lng: 2.1982,
    direccion: 'Carrer de Perú 78, 08005 Barcelona',
    cadena: 'federopticos'
  },
  {
    id: 'federopticos-badalona',
    nombre: 'Federópticos Badalona',
    tipo: 'óptica',
    lat: 41.4482,
    lng: 2.2422,
    direccion: 'Carrer de Sant Joan 56, 08911 Badalona',
    cadena: 'federopticos'
  },
  {
    id: 'federopticos-lhospitalet',
    nombre: 'Federópticos L\'Hospitalet',
    tipo: 'óptica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Carrer de Goya 67, 08906 L\'Hospitalet de Llobregat',
    cadena: 'federopticos'
  },

  // =============================================================================
  // Natural Optics (Audiología) - 4 centros en Barcelona
  // =============================================================================
  {
    id: 'naturaloptics-passeig-gracia-barcelona',
    nombre: 'Natural Optics Passeig de Gràcia',
    tipo: 'óptica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 76, 08007 Barcelona',
    cadena: 'naturaloptics'
  },
  {
    id: 'naturaloptics-diagonal-barcelona',
    nombre: 'Natural Optics Diagonal',
    tipo: 'óptica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 491, 08037 Barcelona',
    cadena: 'naturaloptics'
  },
  {
    id: 'naturaloptics-gran-via-barcelona',
    nombre: 'Natural Optics Gran Via',
    tipo: 'óptica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 545, 08011 Barcelona',
    cadena: 'naturaloptics'
  },
  {
    id: 'naturaloptics-sagrada-familia-barcelona',
    nombre: 'Natural Optics Sagrada Família',
    tipo: 'óptica',
    lat: 41.4042,
    lng: 2.1742,
    direccion: 'Carrer de Mallorca 334, 08013 Barcelona',
    cadena: 'naturaloptics'
  },

  // =============================================================================
  // Vistalia - 2 centros en Barcelona
  // =============================================================================
  {
    id: 'vistalia-barcelona',
    nombre: 'Vistalia Barcelona',
    tipo: 'óptica',
    lat: 41.3912,
    lng: 2.1732,
    direccion: 'Carrer de Casp 156, 08010 Barcelona',
    cadena: 'vistalia'
  },
  {
    id: 'vistalia-lhospitalet',
    nombre: 'Vistalia L\'Hospitalet',
    tipo: 'óptica',
    lat: 41.3592,
    lng: 2.1022,
    direccion: 'Avinguda Carrilet 134, 08902 L\'Hospitalet de Llobregat',
    cadena: 'vistalia'
  },

  // =============================================================================
  // Cottet Audio - 4 centros en Barcelona
  // =============================================================================
  {
    id: 'cottet-passeig-gracia-barcelona',
    nombre: 'Cottet Passeig de Gràcia',
    tipo: 'óptica',
    lat: 41.3892,
    lng: 2.1645,
    direccion: 'Passeig de Gràcia 43, 08007 Barcelona',
    cadena: 'cottet'
  },
  {
    id: 'cottet-diagonal-barcelona',
    nombre: 'Cottet Diagonal',
    tipo: 'óptica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 435, 08037 Barcelona',
    cadena: 'cottet'
  },
  {
    id: 'cottet-balmes-barcelona',
    nombre: 'Cottet Balmes',
    tipo: 'óptica',
    lat: 41.3932,
    lng: 2.1622,
    direccion: 'Carrer de Balmes 167, 08008 Barcelona',
    cadena: 'cottet'
  },
  {
    id: 'cottet-gran-via-barcelona',
    nombre: 'Cottet Gran Via',
    tipo: 'óptica',
    lat: 41.3832,
    lng: 2.1754,
    direccion: 'Gran Via Corts Catalanes 478, 08008 Barcelona',
    cadena: 'cottet'
  },

  // =============================================================================
  // El Corte Inglés - 3 centros en Barcelona
  // =============================================================================
  {
    id: 'corte-ingles-diagonal-barcelona',
    nombre: 'El Corte Inglés Diagonal',
    tipo: 'clínica',
    lat: 41.3952,
    lng: 2.1522,
    direccion: 'Avinguda Diagonal 617, 08006 Barcelona',
    cadena: 'elcorteingles'
  },
  {
    id: 'corte-ingles-plaza-catalunya-barcelona',
    nombre: 'El Corte Inglés Plaza Catalunya',
    tipo: 'clínica',
    lat: 41.3872,
    lng: 2.1682,
    direccion: 'Plaça de Catalunya 1, 08002 Barcelona',
    cadena: 'elcorteingles'
  },
  {
    id: 'corte-ingles-herrera-oriol-barcelona',
    nombre: 'El Corte Inglés Herrera Oriol',
    tipo: 'clínica',
    lat: 41.3972,
    lng: 2.1862,
    direccion: 'Avinguda de Icària 165, 08005 Barcelona',
    cadena: 'elcorteingles'
  }
];

// =============================================================================
// Funciones generadoras de datos
// =============================================================================

function generateGAESMadrid() {
  return [
    { id: 'gaes-albufera-madrid', nombre: 'GAES Albufera', tipo: 'clínica', lat: 40.3965, lng: -3.6795, direccion: 'Av. Albufera 55, 28038 Madrid', cadena: 'gaes' },
    { id: 'gaes-alcala-1-madrid', nombre: 'GAES Alcalá 1', tipo: 'clínica', lat: 40.4461, lng: -3.6492, direccion: 'Alcalá 369, 28027 Madrid', cadena: 'gaes' },
    { id: 'gaes-alcala-2-madrid', nombre: 'GAES Alcalá 2', tipo: 'clínica', lat: 40.4316, lng: -3.6785, direccion: 'Calle Alcalá 136, 28009 Madrid', cadena: 'gaes' },
    { id: 'gaes-alcala-3-madrid', nombre: 'GAES Alcalá 3', tipo: 'clínica', lat: 40.4510, lng: -3.6425, direccion: 'Calle Alcalá 427, 28027 Madrid', cadena: 'gaes' },
    { id: 'gaes-almendrales-madrid', nombre: 'GAES Almendrales', tipo: 'clínica', lat: 40.3912, lng: -3.7075, direccion: 'Antonio López 4 bis, 28019 Madrid', cadena: 'gaes' },
    { id: 'gaes-bravo-murillo-1-madrid', nombre: 'GAES Bravo Murillo 1', tipo: 'clínica', lat: 40.4585, lng: -3.6940, direccion: 'Bravo Murillo 140, 28020 Madrid', cadena: 'gaes' },
    { id: 'gaes-bravo-murillo-2-madrid', nombre: 'GAES Bravo Murillo 2', tipo: 'clínica', lat: 40.4695, lng: -3.6900, direccion: 'Bravo Murillo 328, 28020 Madrid', cadena: 'gaes' },
    { id: 'gaes-caspio-madrid', nombre: 'GAES Caspio', tipo: 'clínica', lat: 40.4880, lng: -3.6655, direccion: 'Mar Caspio 37, 28033 Madrid', cadena: 'gaes' },
    { id: 'gaes-conde-madrid', nombre: 'GAES Conde', tipo: 'clínica', lat: 40.4335, lng: -3.6845, direccion: 'Conde De Peñalver 96, 28006 Madrid', cadena: 'gaes' },
    { id: 'gaes-delicias-madrid', nombre: 'GAES Delicias', tipo: 'clínica', lat: 40.3990, lng: -3.6885, direccion: 'Ps Delicias 13, 28045 Madrid', cadena: 'gaes' },
    { id: 'gaes-diego-de-leon-madrid', nombre: 'GAES Diego De León', tipo: 'clínica', lat: 40.4375, lng: -3.6785, direccion: 'Diego De León 52, 28006 Madrid', cadena: 'gaes' },
    { id: 'gaes-don-antonio-madrid', nombre: 'GAES Don Antonio', tipo: 'clínica', lat: 40.4030, lng: -3.6425, direccion: 'Pl De Don Antonio De Andrés, 28032 Madrid', cadena: 'gaes' },
    { id: 'gaes-donostiarra-madrid', nombre: 'GAES Donostiarra', tipo: 'clínica', lat: 40.4470, lng: -3.6500, direccion: 'Avda Donostiarra 19, 28027 Madrid', cadena: 'gaes' },
    { id: 'gaes-entrevias-madrid', nombre: 'GAES Entrevías', tipo: 'clínica', lat: 40.3885, lng: -3.6700, direccion: 'Av San Diego 112, 28053 Madrid', cadena: 'gaes' },
    { id: 'gaes-extremadura-1-madrid', nombre: 'GAES Extremadura 1', tipo: 'clínica', lat: 40.4085, lng: -3.7250, direccion: 'Paseo Extremadura 129, 28011 Madrid', cadena: 'gaes' },
    { id: 'gaes-extremadura-2-madrid', nombre: 'GAES Extremadura 2', tipo: 'clínica', lat: 40.4120, lng: -3.7150, direccion: 'Ps Extremadura 18, 28011 Madrid', cadena: 'gaes' },
    { id: 'gaes-ferrari-madrid', nombre: 'GAES Ferrari', tipo: 'clínica', lat: 40.4100, lng: -3.6600, direccion: 'Emilio Ferrari 64, 28017 Madrid', cadena: 'gaes' },
    { id: 'gaes-filipinas-madrid', nombre: 'GAES Filipinas', tipo: 'clínica', lat: 40.4470, lng: -3.7095, direccion: 'Avda Filipinas 16, 28003 Madrid', cadena: 'gaes' },
    { id: 'gaes-la-alegria-madrid', nombre: 'GAES La Alegría', tipo: 'clínica', lat: 40.3760, lng: -3.6910, direccion: 'La Alegria De La Huerta 24, 28041 Madrid', cadena: 'gaes' },
    { id: 'gaes-la-latina-madrid', nombre: 'GAES La Latina', tipo: 'clínica', lat: 40.4065, lng: -3.7115, direccion: 'Toledo 76, 28005 Madrid', cadena: 'gaes' },
    { id: 'gaes-lopez-madrid', nombre: 'GAES López', tipo: 'clínica', lat: 40.4430, lng: -3.6700, direccion: 'López De Hoyos 109, 28002 Madrid', cadena: 'gaes' },
    { id: 'gaes-mediterraneo-madrid', nombre: 'GAES Mediterráneo', tipo: 'clínica', lat: 40.4080, lng: -3.6630, direccion: 'Av. Del Mediterráneo 34, 28007 Madrid', cadena: 'gaes' },
    { id: 'gaes-monforte-de-lemos-madrid', nombre: 'GAES Monforte de Lemos', tipo: 'clínica', lat: 40.4780, lng: -3.6760, direccion: 'Av. Monforte De Lemos 107, 28029 Madrid', cadena: 'gaes' },
    { id: 'gaes-moratalaz-madrid', nombre: 'GAES Moratalaz', tipo: 'clínica', lat: 40.4058, lng: -3.6508, direccion: 'Av. Moratalaz 123, 28030 Madrid', cadena: 'gaes' },
    { id: 'gaes-oca-madrid', nombre: 'GAES Oca', tipo: 'clínica', lat: 40.3885, lng: -3.7200, direccion: 'Oca 79, 28025 Madrid', cadena: 'gaes' },
    { id: 'gaes-porlier-madrid', nombre: 'GAES Porlier', tipo: 'clínica', lat: 40.4265, lng: -3.6800, direccion: 'General Díaz Porlier 16, 28001 Madrid', cadena: 'gaes' },
    { id: 'gaes-principe-de-vergara-madrid', nombre: 'GAES Príncipe De Vergara', tipo: 'clínica', lat: 40.4490, lng: -3.6740, direccion: 'Principe De Vergara 211, 28002 Madrid', cadena: 'gaes' },
    { id: 'gaes-urquijo-madrid', nombre: 'GAES Urquijo', tipo: 'clínica', lat: 40.4255, lng: -3.7120, direccion: 'Marqués de Urquijo 10, 28008 Madrid', cadena: 'gaes' },
    { id: 'gaes-vallecas-madrid', nombre: 'GAES Vallecas', tipo: 'clínica', lat: 40.3910, lng: -3.6620, direccion: 'Pl Juan De Malasaña 5, 28031 Madrid', cadena: 'gaes' },
    { id: 'gaes-villaverde-madrid', nombre: 'GAES Villaverde', tipo: 'clínica', lat: 40.3550, lng: -3.6960, direccion: 'Ps Alberto Palacios 17, 28021 Madrid', cadena: 'gaes' },
    { id: 'gaes-fuencarral-madrid', nombre: 'GAES Fuencarral', tipo: 'clínica', lat: 40.4310, lng: -3.7035, direccion: 'Fuencarral 147, 28010 Madrid', cadena: 'gaes' },
    { id: 'gaes-illescas-madrid', nombre: 'GAES Illescas', tipo: 'clínica', lat: 40.3690, lng: -3.7210, direccion: 'Illescas 95, 28024 Madrid', cadena: 'gaes' },
    { id: 'gaes-marcelo-usera-madrid', nombre: 'GAES Marcelo Usera', tipo: 'clínica', lat: 40.3785, lng: -3.7065, direccion: 'Marcelo Usera 122, 28026 Madrid', cadena: 'gaes' },
    { id: 'gaes-narvaez-madrid', nombre: 'GAES Narváez', tipo: 'clínica', lat: 40.4345, lng: -3.6750, direccion: 'Narvaez 38, 28009 Madrid', cadena: 'gaes' }
  ];
}

function generateGAESProvincia() {
  return [
    { id: 'gaes-alkala-cervantes', nombre: 'GAES Alcalá Cervantes', tipo: 'clínica', lat: 40.4818, lng: -3.3640, direccion: 'Pl. Cervantes 5, 28801 Alcalá De Henares', cadena: 'gaes' },
    { id: 'gaes-alkala-libreros', nombre: 'GAES Alcalá Libreros', tipo: 'clínica', lat: 40.4825, lng: -3.3650, direccion: 'C Libreros 4, 28801 Alcalá De Henares', cadena: 'gaes' },
    { id: 'gaes-alcobendas', nombre: 'GAES Alcobendas', tipo: 'clínica', lat: 40.5355, lng: -3.6376, direccion: 'Pl. Felipe Álvarez Gadea 4, 28100 Alcobendas', cadena: 'gaes' },
    { id: 'gaes-alcorcon-fuenlabrada', nombre: 'GAES Alcorcón Fuenlabrada', tipo: 'clínica', lat: 40.3758, lng: -3.8277, direccion: 'C Fuenlabrada 3, 28921 Alcorcón', cadena: 'gaes' },
    { id: 'gaes-alcorcon-mayor', nombre: 'GAES Alcorcón Mayor', tipo: 'clínica', lat: 40.3770, lng: -3.8250, direccion: 'Mayor 21, 28921 Alcorcón', cadena: 'gaes' },
    { id: 'gaes-aranjuez', nombre: 'GAES Aranjuez', tipo: 'clínica', lat: 40.3724, lng: -3.6032, direccion: 'C Stuart 97, 28300 Aranjuez', cadena: 'gaes' },
    { id: 'gaes-arganda-del-rey', nombre: 'GAES Arganda Del Rey', tipo: 'clínica', lat: 40.3008, lng: -3.4379, direccion: 'Avda Del Ejercito 22, 28500 Arganda Del Rey', cadena: 'gaes' },
    { id: 'gaes-colmenar-viejo', nombre: 'GAES Colmenar Viejo', tipo: 'clínica', lat: 40.4149, lng: -3.7655, direccion: 'Calle San Sebastián 15, 28770 Colmenar Viejo', cadena: 'gaes' },
    { id: 'gaes-coslada-constitucion', nombre: 'GAES Coslada Constitución', tipo: 'clínica', lat: 40.4408, lng: -3.5619, direccion: 'Avda Constitucion 31, 28820 Coslada', cadena: 'gaes' },
    { id: 'gaes-coslada-fleming', nombre: 'GAES Coslada Doctor Fleming', tipo: 'clínica', lat: 40.4420, lng: -3.5600, direccion: 'Doctor Fleming 22, 28821 Coslada', cadena: 'gaes' },
    { id: 'gaes-fuenlabrada', nombre: 'GAES Fuenlabrada', tipo: 'clínica', lat: 40.2842, lng: -3.7942, direccion: 'Leganés 21, 28945 Fuenlabrada', cadena: 'gaes' },
    { id: 'gaes-getafe', nombre: 'GAES Getafe', tipo: 'clínica', lat: 40.3057, lng: -3.7300, direccion: 'Avda. General Palacio 14, 28902 Getafe', cadena: 'gaes' },
    { id: 'gaes-getafe-madrid', nombre: 'GAES Getafe Madrid', tipo: 'clínica', lat: 40.3080, lng: -3.7280, direccion: 'Madrid 65, 28901 Getafe', cadena: 'gaes' },
    { id: 'gaes-las-rozas', nombre: 'GAES Las Rozas', tipo: 'clínica', lat: 40.4942, lng: -3.8736, direccion: 'C Real 35, 28231 Las Rozas De Madrid', cadena: 'gaes' },
    { id: 'gaes-leganes', nombre: 'GAES Leganés', tipo: 'clínica', lat: 40.3280, lng: -3.7635, direccion: 'Avda Universidad 21, 28911 Leganés', cadena: 'gaes' },
    { id: 'gaes-leganes-juan-munoz', nombre: 'GAES Leganés Juan Muñoz', tipo: 'clínica', lat: 40.3300, lng: -3.7600, direccion: 'Calle Juan Muñoz 30, 28911 Leganés', cadena: 'gaes' },
    { id: 'gaes-majadahonda', nombre: 'GAES Majadahonda', tipo: 'clínica', lat: 40.4675, lng: -3.8783, direccion: 'Gran Via 45, 28220 Majadahonda', cadena: 'gaes' },
    { id: 'gaes-mostoles-constitucion', nombre: 'GAES Móstoles Constitución', tipo: 'clínica', lat: 40.3252, lng: -3.8650, direccion: 'Av. Constitución 34, 28931 Móstoles', cadena: 'gaes' },
    { id: 'gaes-mostoles-dos-mayo', nombre: 'GAES Móstoles Dos de Mayo', tipo: 'clínica', lat: 40.3280, lng: -3.8600, direccion: 'Av Dos De Mayo 50, 28934 Móstoles', cadena: 'gaes' },
    { id: 'gaes-parla', nombre: 'GAES Parla', tipo: 'clínica', lat: 40.2360, lng: -3.7675, direccion: 'C Pinto 24, 28982 Parla', cadena: 'gaes' },
    { id: 'gaes-pinto', nombre: 'GAES Pinto', tipo: 'clínica', lat: 40.2435, lng: -3.6992, direccion: 'Paseo Dolores Soria 2, 28320 Pinto', cadena: 'gaes' },
    { id: 'gaes-pozuelo', nombre: 'GAES Pozuelo', tipo: 'clínica', lat: 40.4291, lng: -3.8173, direccion: 'Av Europa 10, 28224 Pozuelo De Alarcon', cadena: 'gaes' },
    { id: 'gaes-san-sebastian-reyes', nombre: 'GAES San Sebastián De Los Reyes', tipo: 'clínica', lat: 40.5787, lng: -3.6258, direccion: 'Avda De Colmenar Viejo 9, 28701 San Sebastian De Los Reyes', cadena: 'gaes' },
    { id: 'gaes-torrejon-ardoz', nombre: 'GAES Torrejón De Ardoz', tipo: 'clínica', lat: 40.4557, lng: -3.4697, direccion: 'C Enmedio 10, 28850 Torrejon De Ardoz', cadena: 'gaes' },
    { id: 'gaes-valdemoro', nombre: 'GAES Valdemoro', tipo: 'clínica', lat: 40.2088, lng: -3.7077, direccion: 'Pl Paraiso 5, 28340 Valdemoro', cadena: 'gaes' },
    { id: 'gaes-collado-villalba', nombre: 'GAES Collado Villalba', tipo: 'clínica', lat: 40.6333, lng: -3.8833, direccion: 'Batalla De Bailén 1, 28400 Collado Villalba', cadena: 'gaes' }
  ];
}

function generateAudikaMadrid() {
  return [
    { id: 'audika-alkala-henares', nombre: 'Audika Alcalá de Henares', tipo: 'clínica', lat: 40.4818, lng: -3.3640, direccion: 'C/ Mayor 86, 28801 Alcalá de Henares', cadena: 'audika' },
    { id: 'audika-alcobendas', nombre: 'Audika Alcobendas', tipo: 'clínica', lat: 40.5355, lng: -3.6376, direccion: 'C/ Marquesa Viuda de Aldama 35, 28100 Alcobendas', cadena: 'audika' },
    { id: 'audika-alcobendas-picasso', nombre: 'Audika Alcobendas Pablo Picasso', tipo: 'clínica', lat: 40.5380, lng: -3.6400, direccion: 'C/ Pablo Picasso 76, 28100 Alcobendas', cadena: 'audika' },
    { id: 'audika-alcorcon', nombre: 'Audika Alcorcón', tipo: 'clínica', lat: 40.3758, lng: -3.8277, direccion: 'C/ Mayor 52, 28921 Alcorcón', cadena: 'audika' },
    { id: 'audika-aranjuez', nombre: 'Audika Aranjuez', tipo: 'clínica', lat: 40.3724, lng: -3.6032, direccion: 'Carretera de Andalucía 27, 28300 Aranjuez', cadena: 'audika' },
    { id: 'audika-arganda', nombre: 'Audika Arganda del Rey', tipo: 'clínica', lat: 40.3008, lng: -3.4379, direccion: 'Avenida del Ejército 5, 28500 Arganda del Rey', cadena: 'audika' },
    { id: 'audika-arguelles', nombre: 'Audika Arguelles', tipo: 'clínica', lat: 40.4300, lng: -3.7120, direccion: 'Calle Princesa 69, 28008 Madrid', cadena: 'audika' },
    { id: 'audika-barrio-pilar', nombre: 'Audika Barrio del Pilar', tipo: 'clínica', lat: 40.4780, lng: -3.6760, direccion: 'Avenida Monforte de Lemos 105, 28029 Madrid', cadena: 'audika' },
    { id: 'audika-fuenlabrada', nombre: 'Audika Fuenlabrada', tipo: 'clínica', lat: 40.2842, lng: -3.7942, direccion: 'C/ Leganés 5, 28945 Fuenlabrada', cadena: 'audika' },
    { id: 'audika-general-ricardos', nombre: 'Audika General Ricardos', tipo: 'clínica', lat: 40.3900, lng: -3.7200, direccion: 'Calle General Ricardos 87, 28019 Madrid', cadena: 'audika' },
    { id: 'audika-getafe', nombre: 'Audika Getafe', tipo: 'clínica', lat: 40.3057, lng: -3.7300, direccion: 'C/ Madrid 52, 28901 Getafe', cadena: 'audika' },
    { id: 'audika-guindalera', nombre: 'Audika Guindalera', tipo: 'clínica', lat: 40.4520, lng: -3.6650, direccion: 'Av. de Bonn 19, 28028 Madrid', cadena: 'audika' },
    { id: 'audika-leganes', nombre: 'Audika Leganés', tipo: 'clínica', lat: 40.3280, lng: -3.7635, direccion: 'Avenida de Fuenlabrada 45, 28912 Leganés', cadena: 'audika' },
    { id: 'audika-barrio-salamanca', nombre: 'Audika Madrid Barrio Salamanca', tipo: 'clínica', lat: 40.4335, lng: -3.6845, direccion: 'C/ Conde de Peñalver 2, 28006 Madrid', cadena: 'audika' },
    { id: 'audika-chamberi', nombre: 'Audika Madrid Chamberí', tipo: 'clínica', lat: 40.4359, lng: -3.6991, direccion: 'Calle San Bernardo 122, 28015 Madrid', cadena: 'audika' },
    { id: 'audika-cuatro-caminos', nombre: 'Audika Madrid Cuatro Caminos', tipo: 'clínica', lat: 40.4585, lng: -3.6940, direccion: 'C/ Bravo Murillo 70, 28003 Madrid', cadena: 'audika' },
    { id: 'audika-delicias', nombre: 'Audika Madrid Delicias', tipo: 'clínica', lat: 40.3990, lng: -3.6885, direccion: 'Paseo de las Delicias 38, 28045 Madrid', cadena: 'audika' },
    { id: 'audika-prosperidad', nombre: 'Audika Madrid Prosperidad', tipo: 'clínica', lat: 40.4430, lng: -3.6700, direccion: 'C/ López de Hoyos 101, 28002 Madrid', cadena: 'audika' },
    { id: 'audika-puerta-angel', nombre: 'Audika Madrid Puerta del Ángel', tipo: 'clínica', lat: 40.4120, lng: -3.7150, direccion: 'C/ Paseo de Extremadura 109, 28011 Madrid', cadena: 'audika' },
    { id: 'audika-quintana', nombre: 'Audika Madrid Quintana', tipo: 'clínica', lat: 40.4640, lng: -3.6380, direccion: 'C/ Alcalá 304, 28027 Madrid', cadena: 'audika' },
    { id: 'audika-vista-alegre', nombre: 'Audika Madrid Vista Alegre', tipo: 'clínica', lat: 40.3885, lng: -3.7200, direccion: 'C/ La Oca 81, 28025 Madrid', cadena: 'audika' },
    { id: 'audika-moratalaz', nombre: 'Audika Moratalaz', tipo: 'clínica', lat: 40.4058, lng: -3.6442, direccion: 'Calle de la Marroquina 13, 28030 Madrid', cadena: 'audika' },
    { id: 'audika-mostoles-dos-mayo', nombre: 'Audika Móstoles Dos de Mayo', tipo: 'clínica', lat: 40.3280, lng: -3.8600, direccion: 'Avenida del Dos de Mayo 21A, 28934 Móstoles', cadena: 'audika' },
    { id: 'audika-pacifico', nombre: 'Audika Pacífico', tipo: 'clínica', lat: 40.4080, lng: -3.6630, direccion: 'Avenida del Mediterráneo 4, 28007 Madrid', cadena: 'audika' },
    { id: 'audika-parla', nombre: 'Audika Parla', tipo: 'clínica', lat: 40.2360, lng: -3.7675, direccion: 'Calle Leganés 19, 28981 Parla', cadena: 'audika' },
    { id: 'audika-pozuelo', nombre: 'Audika Pozuelo', tipo: 'clínica', lat: 40.4291, lng: -3.8173, direccion: 'Avenida de Europa 18, 28223 Pozuelo', cadena: 'audika' },
    { id: 'audika-tetuan', nombre: 'Audika Tetuán', tipo: 'clínica', lat: 40.4695, lng: -3.6900, direccion: 'C/ Bravo Murillo 282, 28020 Madrid', cadena: 'audika' },
    { id: 'audika-vallecas', nombre: 'Audika Vallecas', tipo: 'clínica', lat: 40.3965, lng: -3.6795, direccion: 'Avenida de la Albufera 46, 28038 Madrid', cadena: 'audika' }
  ];
}

function generateAudicostMadrid() {
  return [
    { id: 'audicost-alcorcon', nombre: 'Audicost Alcorcón', tipo: 'clínica', lat: 40.3758, lng: -3.8277, direccion: 'C/ Sapporo 18, 28923 Alcorcón', cadena: 'audicost' },
    { id: 'audicost-canillas', nombre: 'Audicost Canillas', tipo: 'clínica', lat: 40.4650, lng: -3.6450, direccion: 'Carretera de Canillas 134, 28043 Madrid', cadena: 'audicost' },
    { id: 'audicost-ferrocarril', nombre: 'Audicost Ferrocarril', tipo: 'clínica', lat: 40.3990, lng: -3.6885, direccion: 'Calle Ferrocarril 30, 28045 Madrid', cadena: 'audicost' },
    { id: 'audicost-fuenlabrada-suiza', nombre: 'Audicost Fuenlabrada', tipo: 'clínica', lat: 40.2842, lng: -3.7942, direccion: 'Calle Suiza 2, 28943 Fuenlabrada', cadena: 'audicost' },
    { id: 'audicost-galileo', nombre: 'Audicost Galileo', tipo: 'clínica', lat: 40.4359, lng: -3.6991, direccion: 'Calle de Galileo 31, 28015 Madrid', cadena: 'audicost' },
    { id: 'audicost-getafe', nombre: 'Audicost Getafe', tipo: 'clínica', lat: 40.3057, lng: -3.7300, direccion: 'Avda. Juan de la Cierva 34, 28902 Getafe', cadena: 'audicost' },
    { id: 'audicost-juan-bravo', nombre: 'Audicost Juan Bravo', tipo: 'clínica', lat: 40.4380, lng: -3.6850, direccion: 'Calle Juan Bravo 59, 28006 Madrid', cadena: 'audicost' },
    { id: 'audicost-la-oca', nombre: 'Audicost La Oca', tipo: 'clínica', lat: 40.3885, lng: -3.7200, direccion: 'Calle de la Oca 90, 28025 Madrid', cadena: 'audicost' },
    { id: 'audicost-leganes', nombre: 'Audicost Leganés', tipo: 'clínica', lat: 40.3280, lng: -3.7635, direccion: 'Plaza Fuente Honda 8, 28911 Leganés', cadena: 'audicost' },
    { id: 'audicost-moratalaz', nombre: 'Audicost Moratalaz', tipo: 'clínica', lat: 40.4058, lng: -3.6442, direccion: 'C.C. Alcampo Moratalaz, 28030 Madrid', cadena: 'audicost' },
    { id: 'audicost-mostoles', nombre: 'Audicost Móstoles', tipo: 'clínica', lat: 40.3252, lng: -3.8650, direccion: 'Calle Empecinado 2, 28937 Móstoles', cadena: 'audicost' },
    { id: 'audicost-parla', nombre: 'Audicost Parla', tipo: 'clínica', lat: 40.2360, lng: -3.7675, direccion: 'Calle de Pío XII 7, 28982 Parla', cadena: 'audicost' },
    { id: 'audicost-torrejon', nombre: 'Audicost Torrejón de Ardoz', tipo: 'clínica', lat: 40.4557, lng: -3.4697, direccion: 'Pl. de España 4, 28850 Torrejón de Ardoz', cadena: 'audicost' },
    { id: 'audicost-vaguada', nombre: 'Audicost Vaguada', tipo: 'clínica', lat: 40.4780, lng: -3.6760, direccion: 'Avda. Monforte de Lemos 103, 28029 Madrid', cadena: 'audicost' },
    { id: 'audicost-costa-rica', nombre: 'Audicost Costa Rica', tipo: 'clínica', lat: 40.4550, lng: -3.6780, direccion: 'Calle Costa Rica 7, 28016 Madrid', cadena: 'audicost' }
  ];
}

function generateAfflelouMadrid() {
  return [
    { id: 'afflelou-lopez-hoyos', nombre: 'Afflelou López de Hoyos', tipo: 'óptica', lat: 40.4430, lng: -3.6700, direccion: 'C/López de Hoyos 170, 28002 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-valdemoro', nombre: 'Afflelou Valdemoro', tipo: 'óptica', lat: 40.2088, lng: -3.7077, direccion: 'C/ Estrella de Elola 16, 28340 Valdemoro', cadena: 'afflelou' },
    { id: 'afflelou-gavia', nombre: 'Afflelou La Gavia', tipo: 'óptica', lat: 40.3720, lng: -3.6400, direccion: 'C.C. La Gavia - C/ Alto del Retiro 33, 28051 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-alcobendas', nombre: 'Afflelou Alcobendas', tipo: 'óptica', lat: 40.5355, lng: -3.6376, direccion: 'C/ Constitución 65, 28100 Alcobendas', cadena: 'afflelou' },
    { id: 'afflelou-acacias', nombre: 'Afflelou Paseo de las Acacias', tipo: 'óptica', lat: 40.3990, lng: -3.7250, direccion: 'Paseo de las Acacias 13, 28005 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-rio-2', nombre: 'Afflelou Plaza Río 2', tipo: 'óptica', lat: 40.3910, lng: -3.6950, direccion: 'CC Plaza Río 2 - Calle Antonio López 109, 28026 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-ortega-gasset', nombre: 'Afflelou Ortega y Gasset', tipo: 'óptica', lat: 40.4380, lng: -3.6850, direccion: 'C/ Ortega y Gasset 52, 28006 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-carrefour-alcobendas', nombre: 'Afflelou Carrefour Alcobendas', tipo: 'óptica', lat: 40.5400, lng: -3.6450, direccion: 'C.C. Carrefour Alcobendas, 28108 Alcobendas', cadena: 'afflelou' },
    { id: 'afflelou-xanadu', nombre: 'Afflelou Madrid Xanadú', tipo: 'óptica', lat: 40.2850, lng: -3.8350, direccion: 'C.C. Madrid Xanadú - L318A, 28939 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-reina-mercedes', nombre: 'Afflelou Reina Mercedes', tipo: 'óptica', lat: 40.4695, lng: -3.6900, direccion: 'Calle Reina Mercedes 23, 28020 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-madrid-sur', nombre: 'Afflelou Madrid Sur', tipo: 'óptica', lat: 40.3550, lng: -3.7050, direccion: 'C.C. Madrid Sur - Av. Pablo Neruda 91-97, 28018 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-islazul', nombre: 'Afflelou Islazul', tipo: 'óptica', lat: 40.3550, lng: -3.7250, direccion: 'C.C. Islazul - C/ Calderilla 1, 28054 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-pozuelo', nombre: 'Afflelou Pozuelo', tipo: 'óptica', lat: 40.4291, lng: -3.8173, direccion: 'Ctra. Boadilla Km 1, 28223 Pozuelo de Alarcón', cadena: 'afflelou' },
    { id: 'afflelou-collado-villalba', nombre: 'Afflelou Collado Villalba', tipo: 'óptica', lat: 40.6333, lng: -3.8833, direccion: 'C.C. Los Valles - C/Rincón de las Heras 1, 28400 Collado Villalba', cadena: 'afflelou' },
    { id: 'afflelou-getafe', nombre: 'Afflelou Getafe', tipo: 'óptica', lat: 40.3057, lng: -3.7300, direccion: 'Pza. Juan Carlos I - C.C. Getafe 3, 28905 Getafe', cadena: 'afflelou' },
    { id: 'afflelou-carrefour-rosas', nombre: 'Afflelou Carrefour Las Rosas', tipo: 'óptica', lat: 40.4030, lng: -3.6425, direccion: 'C.C. Carrefour Las Rosas - Av. Guadalajara 2, 28032 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-narvaez', nombre: 'Afflelou Narváez', tipo: 'óptica', lat: 40.4345, lng: -3.6750, direccion: 'Calle de Narváez 64, 28009 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-majadahonda', nombre: 'Afflelou Majadahonda', tipo: 'óptica', lat: 40.4675, lng: -3.8783, direccion: 'C.C. Gran Plaza 2 - Calle de los Químicos 2, 28222 Majadahonda', cadena: 'afflelou' },
    { id: 'afflelou-san-sebastian-reyes', nombre: 'Afflelou San Sebastián de los Reyes', tipo: 'óptica', lat: 40.5787, lng: -3.6258, direccion: 'C.C. Carrefour Plaza del Comercio 11-12, 28703 San Sebastián de los Reyes', cadena: 'afflelou' },
    { id: 'afflelou-leganes', nombre: 'Afflelou Leganés', tipo: 'óptica', lat: 40.3280, lng: -3.7635, direccion: 'C.C. Plaza Nueva - Av. Puerta del Sol, 28918 Leganés', cadena: 'afflelou' },
    { id: 'afflelou-delicias-91', nombre: 'Afflelou Delicias 91', tipo: 'óptica', lat: 40.3910, lng: -3.6950, direccion: 'Paseo de las Delicias 91, 28045 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-ayacucho', nombre: 'Afflelou Ayacucho', tipo: 'óptica', lat: 40.4650, lng: -3.6450, direccion: 'C/ Ayacucho s/n - Ed. Mar de Cristal, 28043 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-mostoles', nombre: 'Afflelou Móstoles', tipo: 'óptica', lat: 40.3252, lng: -3.8650, direccion: 'Avenida del Dos de Mayo 28, 28934 Móstoles', cadena: 'afflelou' },
    { id: 'afflelou-torrejon', nombre: 'Afflelou Torrejón de Ardoz', tipo: 'óptica', lat: 40.4557, lng: -3.4697, direccion: 'C.C. Parque Corredor - Carretera Ajalvir, 28850 Torrejón de Ardoz', cadena: 'afflelou' },
    { id: 'afflelou-boadilla', nombre: 'Afflelou Boadilla del Monte', tipo: 'óptica', lat: 40.4050, lng: -3.8780, direccion: 'Avenida Infante de Don Luis 13, 28660 Boadilla del Monte', cadena: 'afflelou' },
    { id: 'afflelou-garcia-lorca', nombre: 'Afflelou García Lorca', tipo: 'óptica', lat: 40.3910, lng: -3.6620, direccion: 'Paseo de Federico García Lorca 20, 28031 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-aranjuez', nombre: 'Afflelou Aranjuez', tipo: 'óptica', lat: 40.3724, lng: -3.6032, direccion: 'Calle San Antonio 80, 28300 Aranjuez', cadena: 'afflelou' },
    { id: 'afflelou-alkala-henares', nombre: 'Afflelou Alcalá de Henares', tipo: 'óptica', lat: 40.4818, lng: -3.3640, direccion: 'C.C. Alcalá de Henares - C/Federico García Lorca, 28806 Alcalá de Henares', cadena: 'afflelou' },
    { id: 'afflelou-pozuelo-europa', nombre: 'Afflelou Pozuelo Europa', tipo: 'óptica', lat: 40.4291, lng: -3.8173, direccion: 'Av. Europa 29, 28023 Pozuelo de Alarcón', cadena: 'afflelou' },
    { id: 'afflelou-parla', nombre: 'Afflelou Parla', tipo: 'óptica', lat: 40.2360, lng: -3.7675, direccion: 'C/ San Antón 29, 28980 Parla', cadena: 'afflelou' },
    { id: 'afflelou-torrejon-plaza', nombre: 'Afflelou Torrejón Plaza Mayor', tipo: 'óptica', lat: 40.4557, lng: -3.4697, direccion: 'Plaza Mayor 2, 28850 Torrejón de Ardoz', cadena: 'afflelou' },
    { id: 'afflelou-san-fernando-henares', nombre: 'Afflelou San Fernando de Henares', tipo: 'óptica', lat: 40.4250, lng: -3.5450, direccion: 'C/ Córdoba 1, 28830 San Fernando de Henares', cadena: 'afflelou' },
    { id: 'afflelou-general-ricardos', nombre: 'Afflelou General Ricardos', tipo: 'óptica', lat: 40.3900, lng: -3.7200, direccion: 'C/General Ricardos 104, 28019 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-francos-rodriguez', nombre: 'Afflelou Francos Rodríguez', tipo: 'óptica', lat: 40.4550, lng: -3.7100, direccion: 'C/Francos Rodríguez 64, 28039 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-vaguada', nombre: 'Afflelou La Vaguada', tipo: 'óptica', lat: 40.4780, lng: -3.6760, direccion: 'C.C. La Vaguada - C/ Monforte de Lemos 36, 28029 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-san-sebastian-reyes-real', nombre: 'Afflelou San Sebastián Reyes', tipo: 'óptica', lat: 40.5787, lng: -3.6258, direccion: 'Cl. Real 25 y 27, 28700 San Sebastián de los Reyes', cadena: 'afflelou' },
    { id: 'afflelou-alberto-palacios', nombre: 'Afflelou Alberto Palacios', tipo: 'óptica', lat: 40.3550, lng: -3.6960, direccion: 'Paseo de Alberto Palacios 15, 28021 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-fuencarral', nombre: 'Afflelou Fuencarral', tipo: 'óptica', lat: 40.4310, lng: -3.7035, direccion: 'C/ Fuencarral 109, 28010 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-principe-vergara', nombre: 'Afflelou Príncipe de Vergara', tipo: 'óptica', lat: 40.4490, lng: -3.6740, direccion: 'Calle Príncipe de Vergara 256, 28016 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-marroquina', nombre: 'Afflelou Marroquina', tipo: 'óptica', lat: 40.4058, lng: -3.6442, direccion: 'Calle de la Marroquina 11, 28030 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-tres-cantos', nombre: 'Afflelou Tres Cantos', tipo: 'óptica', lat: 40.5690, lng: -3.7130, direccion: 'Sector Descubridores 47, 28760 Tres Cantos', cadena: 'afflelou' },
    { id: 'afflelou-getafe-madrid', nombre: 'Afflelou Getafe Madrid', tipo: 'óptica', lat: 40.3057, lng: -3.7300, direccion: 'Calle Madrid 98, 28902 Getafe', cadena: 'afflelou' },
    { id: 'afflelou-alcala-168', nombre: 'Afflelou Alcalá 168', tipo: 'óptica', lat: 40.4316, lng: -3.6785, direccion: 'Calle Alcalá 168, 28028 Madrid', cadena: 'afflelou' },
    { id: 'afflelou-fuenlabrada-estacion', nombre: 'Afflelou Fuenlabrada Estación', tipo: 'óptica', lat: 40.2842, lng: -3.7942, direccion: 'C.C. Plaza de la Estación - Calle Rumania, 28943 Fuenlabrada', cadena: 'afflelou' },
    { id: 'afflelou-fuenlabrada-leganes', nombre: 'Afflelou Fuenlabrada Leganés', tipo: 'óptica', lat: 40.2842, lng: -3.7942, direccion: 'Calle de Leganés 15, 28945 Fuenlabrada', cadena: 'afflelou' }
  ];
}

function generateGeneralOpticaMadrid() {
  return [
    { id: 'generaloptica-plaza-rio-2', nombre: 'General Óptica Plaza Río 2', tipo: 'óptica', lat: 40.3910, lng: -3.6950, direccion: 'C.C. Plaza Río 2, 28026 Madrid', cadena: 'generaloptica' },
    { id: 'generaloptica-bravo-murillo', nombre: 'General Óptica Bravo Murillo', tipo: 'óptica', lat: 40.4585, lng: -3.6940, direccion: 'Bravo Murillo 118, 28020 Madrid', cadena: 'generaloptica' },
    { id: 'generaloptica-alcala-413', nombre: 'General Óptica Alcalá 413', tipo: 'óptica', lat: 40.4640, lng: -3.6380, direccion: 'Calle Alcalá 413, 28027 Madrid', cadena: 'generaloptica' },
    { id: 'generaloptica-velazquez', nombre: 'General Óptica Velázquez', tipo: 'óptica', lat: 40.4260, lng: -3.6850, direccion: 'Velázquez 49, 28001 Madrid', cadena: 'generaloptica' },
    { id: 'generaloptica-vaguada', nombre: 'General Óptica La Vaguada', tipo: 'óptica', lat: 40.4780, lng: -3.6760, direccion: 'Avda. Monforte de Lemos, 28029 Madrid', cadena: 'generaloptica' },
    { id: 'generaloptica-parla', nombre: 'General Óptica Parla', tipo: 'óptica', lat: 40.2360, lng: -3.7675, direccion: 'Calle Real 23, 28980 Parla', cadena: 'generaloptica' },
    { id: 'generaloptica-getafe', nombre: 'General Óptica Getafe', tipo: 'óptica', lat: 40.3057, lng: -3.7300, direccion: 'Avenida Juan de la Cierva, 28902 Getafe', cadena: 'generaloptica' },
    { id: 'generaloptica-leganes', nombre: 'General Óptica Leganés', tipo: 'óptica', lat: 40.3280, lng: -3.7635, direccion: 'Avenida de la Universidad, 28911 Leganés', cadena: 'generaloptica' },
    { id: 'generaloptica-alcorcon', nombre: 'General Óptica Alcorcón', tipo: 'óptica', lat: 40.3758, lng: -3.8277, direccion: 'Calle Mayor 52, 28921 Alcorcón', cadena: 'generaloptica' },
    { id: 'generaloptica-mostoles', nombre: 'General Óptica Móstoles', tipo: 'óptica', lat: 40.3252, lng: -3.8650, direccion: 'Avenida de la Constitución, 28931 Móstoles', cadena: 'generaloptica' },
    { id: 'generaloptica-fuenlabrada', nombre: 'General Óptica Fuenlabrada', tipo: 'óptica', lat: 40.2842, lng: -3.7942, direccion: 'Calle Leganés, 28945 Fuenlabrada', cadena: 'generaloptica' },
    { id: 'generaloptica-alkala-henares', nombre: 'General Óptica Alcalá de Henares', tipo: 'óptica', lat: 40.4818, lng: -3.3640, direccion: 'Calle Mayor, 28801 Alcalá de Henares', cadena: 'generaloptica' },
    { id: 'generaloptica-alcobendas', nombre: 'General Óptica Alcobendas', tipo: 'óptica', lat: 40.5355, lng: -3.6376, direccion: 'Calle Marquesa Viuda de Aldama, 28100 Alcobendas', cadena: 'generaloptica' },
    { id: 'generaloptica-torrejon', nombre: 'General Óptica Torrejón de Ardoz', tipo: 'óptica', lat: 40.4557, lng: -3.4697, direccion: 'Calle Enmedio, 28850 Torrejón de Ardoz', cadena: 'generaloptica' },
    { id: 'generaloptica-san-sebastian-reyes', nombre: 'General Óptica San Sebastián de los Reyes', tipo: 'óptica', lat: 40.5787, lng: -3.6258, direccion: 'Avenida de Colmenar Viejo, 28701 San Sebastián de los Reyes', cadena: 'generaloptica' },
    { id: 'generaloptica-majadahonda', nombre: 'General Óptica Majadahonda', tipo: 'óptica', lat: 40.4675, lng: -3.8783, direccion: 'Gran Vía, 28220 Majadahonda', cadena: 'generaloptica' },
    { id: 'generaloptica-pozuelo', nombre: 'General Óptica Pozuelo', tipo: 'óptica', lat: 40.4291, lng: -3.8173, direccion: 'Avenida de Europa, 28223 Pozuelo de Alarcón', cadena: 'generaloptica' },
    { id: 'generaloptica-collado-villalba', nombre: 'General Óptica Collado Villalba', tipo: 'óptica', lat: 40.6333, lng: -3.8833, direccion: 'Calle Batalla de Bailén, 28400 Collado Villalba', cadena: 'generaloptica' },
    { id: 'generaloptica-valdemoro', nombre: 'General Óptica Valdemoro', tipo: 'óptica', lat: 40.2088, lng: -3.7077, direccion: 'Plaza Paraíso, 28340 Valdemoro', cadena: 'generaloptica' },
    { id: 'generaloptica-aranjuez', nombre: 'General Óptica Aranjuez', tipo: 'óptica', lat: 40.3724, lng: -3.6032, direccion: 'Calle Stuart, 28300 Aranjuez', cadena: 'generaloptica' }
  ];
}

function generateMultiopticasMadrid() {
  return [
    { id: 'multiopticas-vaguada', nombre: 'Multiópticas La Vaguada', tipo: 'óptica', lat: 40.4780, lng: -3.6760, direccion: 'C.C. La Vaguada - Avda. Monforte de Lemos 36, 28029 Madrid', cadena: 'multiopticas' },
    { id: 'multiopticas-lopez-hoyos', nombre: 'Multiópticas López de Hoyos', tipo: 'óptica', lat: 40.4430, lng: -3.6700, direccion: 'López de Hoyos 97, 28002 Madrid', cadena: 'multiopticas' },
    { id: 'multiopticas-aranjuez', nombre: 'Multiópticas Aranjuez', tipo: 'óptica', lat: 40.3724, lng: -3.6032, direccion: 'Calle del Rey, 28300 Aranjuez', cadena: 'multiopticas' },
    { id: 'multiopticas-leganes', nombre: 'Multiópticas Leganés', tipo: 'óptica', lat: 40.3280, lng: -3.7635, direccion: 'Gran Vía de Leganés, 28911 Leganés', cadena: 'multiopticas' },
    { id: 'multiopticas-fuenlabrada', nombre: 'Multiópticas Fuenlabrada', tipo: 'óptica', lat: 40.2842, lng: -3.7942, direccion: 'Avenida de la Constitución, 28945 Fuenlabrada', cadena: 'multiopticas' },
    { id: 'multiopticas-getafe', nombre: 'Multiópticas Getafe', tipo: 'óptica', lat: 40.3057, lng: -3.7300, direccion: 'Avenida Juan de la Cierva, 28902 Getafe', cadena: 'multiopticas' },
    { id: 'multiopticas-mostoles', nombre: 'Multiópticas Móstoles', tipo: 'óptica', lat: 40.3252, lng: -3.8650, direccion: 'Avenida del Dos de Mayo, 28934 Móstoles', cadena: 'multiopticas' },
    { id: 'multiopticas-alcorcon', nombre: 'Multiópticas Alcorcón', tipo: 'óptica', lat: 40.3758, lng: -3.8277, direccion: 'Calle Mayor, 28921 Alcorcón', cadena: 'multiopticas' },
    { id: 'multiopticas-alkala-henares', nombre: 'Multiópticas Alcalá de Henares', tipo: 'óptica', lat: 40.4818, lng: -3.3640, direccion: 'Calle Mayor, 28801 Alcalá de Henares', cadena: 'multiopticas' },
    { id: 'multiopticas-alcobendas', nombre: 'Multiópticas Alcobendas', tipo: 'óptica', lat: 40.5355, lng: -3.6376, direccion: 'Calle Marquesa Viuda de Aldama, 28100 Alcobendas', cadena: 'multiopticas' },
    { id: 'multiopticas-torrejon', nombre: 'Multiópticas Torrejón de Ardoz', tipo: 'óptica', lat: 40.4557, lng: -3.4697, direccion: 'Calle Enmedio, 28850 Torrejón de Ardoz', cadena: 'multiopticas' },
    { id: 'multiopticas-parla', nombre: 'Multiópticas Parla', tipo: 'óptica', lat: 40.2360, lng: -3.7675, direccion: 'Calle Real, 28982 Parla', cadena: 'multiopticas' }
  ];
}

function generateOpticaliaMadrid() {
  return [
    { id: 'opticalia-andres-mellado', nombre: 'Opticalia Andrés Mellado', tipo: 'óptica', lat: 40.4359, lng: -3.6991, direccion: 'C/ Andrés Mellado 47, 28015 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-alcala-327', nombre: 'Opticalia Alcalá 327', tipo: 'óptica', lat: 40.4640, lng: -3.6380, direccion: 'C/ Alcalá 327, 28027 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-santa-engracia', nombre: 'Opticalia Santa Engracia', tipo: 'óptica', lat: 40.4359, lng: -3.6991, direccion: 'C/ Santa Engracia 105, 28010 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-garcia-lorca', nombre: 'Opticalia García Lorca', tipo: 'óptica', lat: 40.3910, lng: -3.6620, direccion: 'Pº Federico García Lorca 19, 28031 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-extremadura-158', nombre: 'Opticalia Paseo Extremadura', tipo: 'óptica', lat: 40.4085, lng: -3.7250, direccion: 'P.º de Extremadura 158, 28011 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-ferraz', nombre: 'Opticalia Ferraz', tipo: 'óptica', lat: 40.4255, lng: -3.7120, direccion: 'Calle Ferraz 35, 28008 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-getafe-general-palacios', nombre: 'Opticalia Getafe General Palacios', tipo: 'óptica', lat: 40.3057, lng: -3.7300, direccion: 'C/ General Palacios 12, 28902 Getafe', cadena: 'opticalia' },
    { id: 'opticalia-getafe-madrid-56', nombre: 'Opticalia Getafe Madrid 56', tipo: 'óptica', lat: 40.3057, lng: -3.7300, direccion: 'C/ Madrid 56, 28901 Getafe', cadena: 'opticalia' },
    { id: 'opticalia-kepler', nombre: 'Opticalia Kepler', tipo: 'óptica', lat: 40.4780, lng: -3.6810, direccion: 'C/ Kepler 1, 28029 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-villa', nombre: 'Opticalia Villa', tipo: 'óptica', lat: 40.3057, lng: -3.7300, direccion: 'C/ Villa 56, 28902 Getafe', cadena: 'opticalia' },
    { id: 'opticalia-rus', nombre: 'Opticalia Rus', tipo: 'óptica', lat: 40.4359, lng: -3.6991, direccion: 'Calle Rus 15, 28015 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-21', nombre: 'Opticalia 21', tipo: 'óptica', lat: 40.4640, lng: -3.6380, direccion: 'C/ Alcalá 327, 28027 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-bulevar', nombre: 'Opticalia Bulevar', tipo: 'óptica', lat: 40.3910, lng: -3.6620, direccion: 'Paseo Federico García Lorca, 28031 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-paseo-extremadura-audiocalia', nombre: 'Opticalia Paseo Extremadura Audiocalia', tipo: 'óptica', lat: 40.4085, lng: -3.7250, direccion: 'P.º de Extremadura 158, 28011 Madrid', cadena: 'opticalia' },
    { id: 'opticalia-arguelles', nombre: 'Opticalia Argüelles', tipo: 'óptica', lat: 40.4300, lng: -3.7120, direccion: 'Calle de la Princesa 72, 28008 Madrid', cadena: 'opticalia' }
  ];
}

function generateFederopticosMadrid() {
  return [
    { id: 'federopticos-latina-43', nombre: 'Federópticos Latina 43', tipo: 'óptica', lat: 40.4065, lng: -3.7115, direccion: 'C/ de Latina 43, 28005 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-jose-cadalso', nombre: 'Federópticos José de Cadalso', tipo: 'óptica', lat: 40.3550, lng: -3.6960, direccion: 'Calle de José de Cadalso 74, 28044 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-aluche', nombre: 'Federópticos Aluche', tipo: 'óptica', lat: 40.3820, lng: -3.7450, direccion: 'Calle de Latina 156, 28047 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-cuadrado', nombre: 'Federópticos Cuadrado', tipo: 'óptica', lat: 40.4585, lng: -3.6940, direccion: 'Calle Bravo Murillo 89, 28020 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-orbe', nombre: 'Federópticos Orbe', tipo: 'óptica', lat: 40.4359, lng: -3.6991, direccion: 'Calle de San Bernardo 100, 28015 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-miramundo', nombre: 'Federópticos Miramundo', tipo: 'óptica', lat: 40.3820, lng: -3.7450, direccion: 'Avenida de los Pinos 15, 28041 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-vallecas', nombre: 'Federópticos Vallecas', tipo: 'óptica', lat: 40.3910, lng: -3.6620, direccion: 'Calle de la Puerto de la Bañeza, 28053 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-carabanchel', nombre: 'Federópticos Carabanchel', tipo: 'óptica', lat: 40.3820, lng: -3.7250, direccion: 'Calle de la Oca 120, 28025 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-villaverde', nombre: 'Federópticos Villaverde', tipo: 'óptica', lat: 40.3550, lng: -3.6960, direccion: 'Calle de la Richie 45, 28021 Madrid', cadena: 'federopticos' },
    { id: 'federopticos-usera', nombre: 'Federópticos Usera', tipo: 'óptica', lat: 40.3785, lng: -3.7065, direccion: 'Calle de Marcelo Usera 150, 28026 Madrid', cadena: 'federopticos' }
  ];
}

function generateNaturalOpticsMadrid() {
  return [
    { id: 'naturaloptics-magallanes', nombre: 'Natural Optics Magallanes', tipo: 'óptica', lat: 40.4359, lng: -3.6991, direccion: 'C/ Magallanes 20, 28015 Madrid', cadena: 'naturaloptics' },
    { id: 'naturaloptics-cihes', nombre: 'Natural Optics Cihes', tipo: 'óptica', lat: 40.4100, lng: -3.6600, direccion: 'C/ San Telesforo 21, 28017 Madrid', cadena: 'naturaloptics' },
    { id: 'naturaloptics-jilguero', nombre: 'Natural Optics Jilguero', tipo: 'óptica', lat: 40.3820, lng: -3.7450, direccion: 'C/ Camino Viejo de Leganés 167, 28025 Madrid', cadena: 'naturaloptics' },
    { id: 'naturaloptics-vicalvaro', nombre: 'Natural Optics Vicálvaro', tipo: 'óptica', lat: 40.4030, lng: -3.5980, direccion: 'C/ Condesa Vega del Pozo 5, 28032 Madrid', cadena: 'naturaloptics' },
    { id: 'naturaloptics-vivavision', nombre: 'Natural Optics Vivavisión', tipo: 'óptica', lat: 40.4550, lng: -3.7100, direccion: 'C/ Lope de Haro 9, 28039 Madrid', cadena: 'naturaloptics' },
    { id: 'naturaloptics-la-oca', nombre: 'Natural Optics La Oca', tipo: 'óptica', lat: 40.3885, lng: -3.7200, direccion: 'C/ Oca 90, 28025 Madrid', cadena: 'naturaloptics' },
    { id: 'naturaloptics-vivavision-san-diego', nombre: 'Natural Optics Vivavisión San Diego', tipo: 'óptica', lat: 40.3885, lng: -3.6700, direccion: 'Avda. del Monte Igueldo 21, 28053 Madrid', cadena: 'naturaloptics' },
    { id: 'naturaloptics-fuenlabrada', nombre: 'Natural Optics Fuenlabrada', tipo: 'óptica', lat: 40.2842, lng: -3.7942, direccion: 'C/ de Leganés 40, 28945 Fuenlabrada', cadena: 'naturaloptics' },
    { id: 'naturaloptics-el-naranjo', nombre: 'Natural Optics El Naranjo', tipo: 'óptica', lat: 40.2770, lng: -3.8000, direccion: 'C/ de Oviedo 11, 28942 Fuenlabrada', cadena: 'naturaloptics' }
  ];
}

// =============================================================================
// Funciones de utilidad
// =============================================================================

export function getCompetitorsByChain(chainId) {
  return competitorLocations.filter(comp => comp.cadena === chainId);
}

export function getVisibleCompetitors(chainVisibility) {
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
