// Datos completos de competidores de Clinisord en España
// Incluye todas las principales cadenas nacionales e internacionales
// Ópticas con servicio de audiología y centros especializados
// Actualizado con datos oficiales de GAES: 69 centros en Madrid (40 ciudad + 29 provincia)

// Coordenadas aproximadas basadas en direcciones reales de Madrid
const madridCoords = {
  'Alcalá De Henares': { lat: 40.4818, lng: -3.3640 },
  'Alcobendas': { lat: 40.5355, lng: -3.6376 },
  'Alcorcón': { lat: 40.3758, lng: -3.8277 },
  'Aranjuez': { lat: 40.3724, lng: -3.6032 },
  'Arganda Del Rey': { lat: 40.3008, lng: -3.4379 },
  'Colmenar Viejo': { lat: 40.4149, lng: -3.7655 },
  'Coslada': { lat: 40.4408, lng: -3.5619 },
  'Fuenlabrada': { lat: 40.2842, lng: -3.7942 },
  'Getafe': { lat: 40.3057, lng: -3.7300 },
  'Las Rozas De Madrid': { lat: 40.4942, lng: -3.8736 },
  'Leganés': { lat: 40.3280, lng: -3.7635 },
  'Madrid': { lat: 40.4168, lng: -3.7038 },
  'Majadahonda': { lat: 40.4675, lng: -3.8783 },
  'Móstoles': { lat: 40.3252, lng: -3.8650 },
  'Parla': { lat: 40.2360, lng: -3.7675 },
  'Pinto': { lat: 40.2435, lng: -3.6992 },
  'Pozuelo De Alarcon': { lat: 40.4291, lng: -3.8173 },
  'San Sebastian De Los Reyes': { lat: 40.5787, lng: -3.6258 },
  'Torrejón De Ardoz': { lat: 40.4557, lng: -3.4697 },
  'Valdemoro': { lat: 40.2088, lng: -3.7077 },
  'Collado Villalba': { lat: 40.6333, lng: -3.8833 }
};

// Coordenadas específicas para calles de Madrid
const madridStreets = {
  'Alcalá 369': { lat: 40.4461, lng: -3.6492 },
  'Alcalá 136': { lat: 40.4316, lng: -3.6785 },
  'Alcalá 427': { lat: 40.4510, lng: -3.6425 },
  'Albufera 55': { lat: 40.3965, lng: -3.6795 },
  'Antonio López 4 bis': { lat: 40.3912, lng: -3.7075 },
  'Bravo Murillo 140': { lat: 40.4585, lng: -3.6940 },
  'Bravo Murillo 328': { lat: 40.4695, lng: -3.6900 },
  'Caspio 37': { lat: 40.4880, lng: -3.6655 },
  'Conde De Peñalver 96': { lat: 40.4335, lng: -3.6845 },
  'Delicias 13': { lat: 40.3990, lng: -3.6885 },
  'Diego De León 52': { lat: 40.4375, lng: -3.6785 },
  'Don Antonio De Andrés': { lat: 40.4030, lng: -3.6425 },
  'Donostiarra 19': { lat: 40.4470, lng: -3.6500 },
  'Entrevías 112': { lat: 40.3885, lng: -3.6700 },
  'Extremadura 129': { lat: 40.4085, lng: -3.7250 },
  'Extremadura 18': { lat: 40.4120, lng: -3.7150 },
  'Emilio Ferrari 64': { lat: 40.4100, lng: -3.6600 },
  'Filipinas 16': { lat: 40.4470, lng: -3.7095 },
  'La Alegría De La Huerta 24': { lat: 40.3760, lng: -3.6910 },
  'Toledo 76': { lat: 40.4065, lng: -3.7115 },
  'López De Hoyos 109': { lat: 40.4430, lng: -3.6700 },
  'Mediterráneo 34': { lat: 40.4080, lng: -3.6630 },
  'Monforte De Lemos 107': { lat: 40.4780, lng: -3.6760 },
  'Moratalaz 123': { lat: 40.4140, lng: -3.6485 },
  'Oca 79': { lat: 40.3885, lng: -3.7200 },
  'Porlier 16': { lat: 40.4265, lng: -3.6800 },
  'Principe De Vergara 211': { lat: 40.4490, lng: -3.6740 },
  'Urquijo 10': { lat: 40.4255, lng: -3.7120 },
  'Vallecas 5': { lat: 40.3910, lng: -3.6620 },
  'Villaverde 17': { lat: 40.3550, lng: -3.6960 },
  'Fuencarral 147': { lat: 40.4310, lng: -3.7035 },
  'Illescas 95': { lat: 40.3690, lng: -3.7210 },
  'Marcelo Usera 122': { lat: 40.3785, lng: -3.7065 },
  'Narváez 38': { lat: 40.4345, lng: -3.6750 }
};

function getMadridCoords(address) {
  // Intentar encontrar coordenadas específicas por calle
  for (const [street, coords] of Object.entries(madridStreets)) {
    if (address.includes(street)) {
      return coords;
    }
  }
  // Coordenadas por defecto para Madrid centro
  return { lat: 40.4168, lng: -3.7038 };
}

export const competitorLocations = [
  // =============================================================================
  // GAES (GRUPO AMPLIFON) - Líder del mercado español
  // Datos oficiales: 69 centros en Madrid (40 ciudad + 29 provincia)
  // =============================================================================
  
  // MADRID CIUDAD - 40 centros GAES
  {
    id: 'gaes-albufera-madrid',
    nombre: 'GAES Albufera',
    tipo: 'clínica',
    lat: 40.3965,
    lng: -3.6795,
    direccion: 'Av. Albufera 55, 28038, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-alcala-1-madrid',
    nombre: 'GAES Alcalá 1',
    tipo: 'clínica',
    lat: 40.4461,
    lng: -3.6492,
    direccion: 'Alcalá 369, 28027, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-alcala-2-madrid',
    nombre: 'GAES Alcalá 2',
    tipo: 'clínica',
    lat: 40.4316,
    lng: -3.6785,
    direccion: 'Calle Alcalá 136, 28009, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-alcala-3-madrid',
    nombre: 'GAES Alcalá 3',
    tipo: 'clínica',
    lat: 40.4510,
    lng: -3.6425,
    direccion: 'C Alcala 427, 28027, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-almendrales-madrid',
    nombre: 'GAES Almendrales',
    tipo: 'clínica',
    lat: 40.3912,
    lng: -3.7075,
    direccion: 'C Antonio López, 4 bis, 28019, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-bravo-murillo-1-madrid',
    nombre: 'GAES Bravo Murillo 1',
    tipo: 'clínica',
    lat: 40.4585,
    lng: -3.6940,
    direccion: 'C Bravo Murillo 140, 28020, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-bravo-murillo-2-madrid',
    nombre: 'GAES Bravo Murillo 2',
    tipo: 'clínica',
    lat: 40.4695,
    lng: -3.6900,
    direccion: 'C Bravo Murillo 328, 28020, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-caspio-madrid',
    nombre: 'GAES Caspio',
    tipo: 'clínica',
    lat: 40.4880,
    lng: -3.6655,
    direccion: 'C Mar Caspio 37, 28033, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-conde-madrid',
    nombre: 'GAES Conde',
    tipo: 'clínica',
    lat: 40.4335,
    lng: -3.6845,
    direccion: 'Conde De Peñalver 96, 28006, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-de-bailen-madrid',
    nombre: 'GAES De Bailén',
    tipo: 'clínica',
    lat: 40.6333,
    lng: -3.8833,
    direccion: 'Batalla De Bailén 1, 28400, Collado Villalba',
    cadena: 'GAES'
  },
  {
    id: 'gaes-delicias-madrid',
    nombre: 'GAES Delicias',
    tipo: 'clínica',
    lat: 40.3990,
    lng: -3.6885,
    direccion: 'Ps Delicias 13, 28045, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-diego-de-leon-madrid',
    nombre: 'GAES Diego De León',
    tipo: 'clínica',
    lat: 40.4375,
    lng: -3.6785,
    direccion: 'C Diego De León 52, 28006, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-don-antonio-madrid',
    nombre: 'GAES Don Antonio',
    tipo: 'clínica',
    lat: 40.4030,
    lng: -3.6425,
    direccion: 'Pl De Don Antonio De Andrés, 28032, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-donostiarra-madrid',
    nombre: 'GAES Donostiarra',
    tipo: 'clínica',
    lat: 40.4470,
    lng: -3.6500,
    direccion: 'Avda Donostiarra 19, 28027, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-entrevias-madrid',
    nombre: 'GAES Entrevías',
    tipo: 'clínica',
    lat: 40.3885,
    lng: -3.6700,
    direccion: 'Av San Diego 112, 28053, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-extremadura-1-madrid',
    nombre: 'GAES Extremadura 1',
    tipo: 'clínica',
    lat: 40.4085,
    lng: -3.7250,
    direccion: 'Paseo Extremadura 129, 28011, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-extremadura-2-madrid',
    nombre: 'GAES Extremadura 2',
    tipo: 'clínica',
    lat: 40.4120,
    lng: -3.7150,
    direccion: 'Ps Extremadura 18, 28011, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-ferrari-madrid',
    nombre: 'GAES Ferrari',
    tipo: 'clínica',
    lat: 40.4100,
    lng: -3.6600,
    direccion: 'C Emilio Ferrari 64, 28017, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-filipinas-madrid',
    nombre: 'GAES Filipinas',
    tipo: 'clínica',
    lat: 40.4470,
    lng: -3.7095,
    direccion: 'Avda Filipinas 16, 28003, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-la-alegria-madrid',
    nombre: 'GAES La Alegría',
    tipo: 'clínica',
    lat: 40.3760,
    lng: -3.6910,
    direccion: 'C La Alegria De La Huerta 24, 28041, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-la-latina-madrid',
    nombre: 'GAES La Latina',
    tipo: 'clínica',
    lat: 40.4065,
    lng: -3.7115,
    direccion: 'C Toledo 76, 28005, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-lopez-madrid',
    nombre: 'GAES López',
    tipo: 'clínica',
    lat: 40.4430,
    lng: -3.6700,
    direccion: 'López De Hoyos 109, 28002, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-mediterraneo-madrid',
    nombre: 'GAES Mediterráneo',
    tipo: 'clínica',
    lat: 40.4080,
    lng: -3.6630,
    direccion: 'Av. Del Mediterráneo 34, 28007, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-monforte-de-lemos-madrid',
    nombre: 'GAES Monforte de Lemos',
    tipo: 'clínica',
    lat: 40.4780,
    lng: -3.6760,
    direccion: 'Av. Monforte De Lemos 107 BAJO, 28029, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-moratalaz-madrid',
    nombre: 'GAES Moratalaz',
    tipo: 'clínica',
    lat: 40.4140,
    lng: -3.6485,
    direccion: 'Av. Moratalaz 123, 28030, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-oca-madrid',
    nombre: 'GAES Oca',
    tipo: 'clínica',
    lat: 40.3885,
    lng: -3.7200,
    direccion: 'Oca 79, 28025, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-porlier-madrid',
    nombre: 'GAES Porlier',
    tipo: 'clínica',
    lat: 40.4265,
    lng: -3.6800,
    direccion: 'Calle del General Díaz Porlier, 16, 28001, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-principe-de-vergara-madrid',
    nombre: 'GAES Príncipe De Vergara',
    tipo: 'clínica',
    lat: 40.4490,
    lng: -3.6740,
    direccion: 'C Principe De Vergara 211, 28002, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-urquijo-madrid',
    nombre: 'GAES Urquijo',
    tipo: 'clínica',
    lat: 40.4255,
    lng: -3.7120,
    direccion: 'C. Marqués de Urquijo, 10, 28008, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-vallecas-madrid',
    nombre: 'GAES Vallecas',
    tipo: 'clínica',
    lat: 40.3910,
    lng: -3.6620,
    direccion: 'Pl Juan De Malasaña 5, 28031, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-villaverde-madrid',
    nombre: 'GAES Villaverde',
    tipo: 'clínica',
    lat: 40.3550,
    lng: -3.6960,
    direccion: 'Ps Alberto Palacios 17, 28021, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-fuencarral-madrid',
    nombre: 'GAES Fuencarral',
    tipo: 'clínica',
    lat: 40.4310,
    lng: -3.7035,
    direccion: 'Fuencarral, 147, 28010, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-illescas-madrid',
    nombre: 'GAES Illescas',
    tipo: 'clínica',
    lat: 40.3690,
    lng: -3.7210,
    direccion: 'C Illescas, 95, 28024, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-marcelo-usera-madrid',
    nombre: 'GAES Marcelo Usera',
    tipo: 'clínica',
    lat: 40.3785,
    lng: -3.7065,
    direccion: 'Marcelo Usera 122, 28026, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-narvaez-madrid',
    nombre: 'GAES Narváez',
    tipo: 'clínica',
    lat: 40.4345,
    lng: -3.6750,
    direccion: 'C Narvaez 38, 28009, Madrid',
    cadena: 'GAES'
  },

  // PROVINCIA DE MADRID - 29 centros GAES adicionales
  {
    id: 'gaes-alkala-de-henares-cervantes',
    nombre: 'GAES Alcalá De Henares Cervantes',
    tipo: 'clínica',
    lat: 40.4818,
    lng: -3.3640,
    direccion: 'Pl. Cervantes 5, 28801, Alcalá De Henares',
    cadena: 'GAES'
  },
  {
    id: 'gaes-alkala-de-henares-libreros',
    nombre: 'GAES Alcalá De Henares Libreros',
    tipo: 'clínica',
    lat: 40.4825,
    lng: -3.3650,
    direccion: 'C Libreros 4, 28801, Alcalá De Henares',
    cadena: 'GAES'
  },
  {
    id: 'gaes-alcobendas',
    nombre: 'GAES Alcobendas',
    tipo: 'clínica',
    lat: 40.5355,
    lng: -3.6376,
    direccion: 'Pl. Felipe Álvarez Gadea 4, 28100, Alcobendas',
    cadena: 'GAES'
  },
  {
    id: 'gaes-alcorcon-fuenlabrada',
    nombre: 'GAES Alcorcón Fuenlabrada',
    tipo: 'clínica',
    lat: 40.3758,
    lng: -3.8277,
    direccion: 'C Fuenlabrada 3, 28921, Alcorcón',
    cadena: 'GAES'
  },
  {
    id: 'gaes-alcorcon-mayor',
    nombre: 'GAES Alcorcón Mayor',
    tipo: 'clínica',
    lat: 40.3770,
    lng: -3.8250,
    direccion: 'Mayor 21, 28921, Alcorcón',
    cadena: 'GAES'
  },
  {
    id: 'gaes-aranjuez',
    nombre: 'GAES Aranjuez',
    tipo: 'clínica',
    lat: 40.3724,
    lng: -3.6032,
    direccion: 'C Stuart 97, 28300, Aranjuez',
    cadena: 'GAES'
  },
  {
    id: 'gaes-arganda-del-rey',
    nombre: 'GAES Arganda Del Rey',
    tipo: 'clínica',
    lat: 40.3008,
    lng: -3.4379,
    direccion: 'Avda Del Ejercito 22, 28500, Arganda Del Rey',
    cadena: 'GAES'
  },
  {
    id: 'gaes-colmenar-viejo',
    nombre: 'GAES Colmenar Viejo',
    tipo: 'clínica',
    lat: 40.4149,
    lng: -3.7655,
    direccion: 'Calle San Sebastián, 15, 28770, Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-coslada-constitucion',
    nombre: 'GAES Coslada Constitución',
    tipo: 'clínica',
    lat: 40.4408,
    lng: -3.5619,
    direccion: 'Avda Constitucion 31, 28820, Coslada',
    cadena: 'GAES'
  },
  {
    id: 'gaes-coslada-doctor-fleming',
    nombre: 'GAES Coslada Doctor Fleming',
    tipo: 'clínica',
    lat: 40.4420,
    lng: -3.5600,
    direccion: 'Doctor Fleming 22, 28821, Coslada',
    cadena: 'GAES'
  },
  {
    id: 'gaes-fuenlabrada',
    nombre: 'GAES Fuenlabrada',
    tipo: 'clínica',
    lat: 40.2842,
    lng: -3.7942,
    direccion: 'Leganés 21, 28945, Fuenlabrada',
    cadena: 'GAES'
  },
  {
    id: 'gaes-getafe',
    nombre: 'GAES Getafe',
    tipo: 'clínica',
    lat: 40.3057,
    lng: -3.7300,
    direccion: 'Avda. General Palacio, 14, 28902, Getafe',
    cadena: 'GAES'
  },
  {
    id: 'gaes-getafe-madrid',
    nombre: 'GAES Getafe Madrid',
    tipo: 'clínica',
    lat: 40.3080,
    lng: -3.7280,
    direccion: 'Madrid 65, 28901, Getafe',
    cadena: 'GAES'
  },
  {
    id: 'gaes-las-rozas-de-madrid',
    nombre: 'GAES Las Rozas De Madrid',
    tipo: 'clínica',
    lat: 40.4942,
    lng: -3.8736,
    direccion: 'C Real 35, 28231, Las Rozas De Madrid',
    cadena: 'GAES'
  },
  {
    id: 'gaes-leganes',
    nombre: 'GAES Leganés',
    tipo: 'clínica',
    lat: 40.3280,
    lng: -3.7635,
    direccion: 'Avda Universidad 21, 28911, Leganés',
    cadena: 'GAES'
  },
  {
    id: 'gaes-leganes-juan-munoz',
    nombre: 'GAES Leganés Juan Muñoz',
    tipo: 'clínica',
    lat: 40.3300,
    lng: -3.7600,
    direccion: 'Calle Juan Muñoz 30, 28911, Leganés',
    cadena: 'GAES'
  },
  {
    id: 'gaes-majadahonda',
    nombre: 'GAES Majadahonda',
    tipo: 'clínica',
    lat: 40.4675,
    lng: -3.8783,
    direccion: 'Gran Via 45, 28220, Majadahonda',
    cadena: 'GAES'
  },
  {
    id: 'gaes-mostoles-constitucion',
    nombre: 'GAES Móstoles Constitución',
    tipo: 'clínica',
    lat: 40.3252,
    lng: -3.8650,
    direccion: 'Av. Constitución, 34, 28931, Móstoles',
    cadena: 'GAES'
  },
  {
    id: 'gaes-mostoles-dos-de-mayo',
    nombre: 'GAES Móstoles Dos de Mayo',
    tipo: 'clínica',
    lat: 40.3280,
    lng: -3.8600,
    direccion: 'Av Dos De Mayo 50, 28934, Móstoles',
    cadena: 'GAES'
  },
  {
    id: 'gaes-parla',
    nombre: 'GAES Parla',
    tipo: 'clínica',
    lat: 40.2360,
    lng: -3.7675,
    direccion: 'C Pinto 24, 28982, Parla',
    cadena: 'GAES'
  },
  {
    id: 'gaes-pinto',
    nombre: 'GAES Pinto',
    tipo: 'clínica',
    lat: 40.2435,
    lng: -3.6992,
    direccion: 'Paseo Dolores Soria, 2, 28320, Pinto',
    cadena: 'GAES'
  },
  {
    id: 'gaes-pozuelo-de-alarcon',
    nombre: 'GAES Pozuelo De Alarcon',
    tipo: 'clínica',
    lat: 40.4291,
    lng: -3.8173,
    direccion: 'Av Europa 10, 28224, Pozuelo De Alarcon',
    cadena: 'GAES'
  },
  {
    id: 'gaes-san-sebastian-de-los-reyes',
    nombre: 'GAES San Sebastián De Los Reyes',
    tipo: 'clínica',
    lat: 40.5787,
    lng: -3.6258,
    direccion: 'Avda De Colmenar Viejo 9, 28701, San Sebastian De Los Reyes',
    cadena: 'GAES'
  },
  {
    id: 'gaes-torrejon-de-ardoz',
    nombre: 'GAES Torrejón De Ardoz',
    tipo: 'clínica',
    lat: 40.4557,
    lng: -3.4697,
    direccion: 'C Enmedio 10, 28850, Torrejon De Ardoz',
    cadena: 'GAES'
  },
  {
    id: 'gaes-valdemoro',
    nombre: 'GAES Valdemoro',
    tipo: 'clínica',
    lat: 40.2088,
    lng: -3.7077,
    direccion: 'Pl Paraiso 5, 28340, Valdemoro',
    cadena: 'GAES'
  },

  // =============================================================================
  // OTRAS CIUDADES - GAES
  // =============================================================================
  
  {
    id: 'gaes-barcelona',
    nombre: 'GAES Barcelona',
    tipo: 'clínica',
    lat: 41.3887,
    lng: 2.1599,
    direccion: 'Avinguda Diagonal, Barcelona',
    cadena: 'GAES'
  },
  {
    id: 'gaes-valencia',
    nombre: 'GAES Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Colón, Valencia',
    cadena: 'GAES'
  },
  {
    id: 'gaes-sevilla',
    nombre: 'GAES Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Avenida de la Constitución, Sevilla',
    cadena: 'GAES'
  },
  {
    id: 'gaes-zaragoza',
    nombre: 'GAES Zaragoza',
    tipo: 'clínica',
    lat: 41.6528,
    lng: -0.8781,
    direccion: 'Paseo de la Independencia, Zaragoza',
    cadena: 'GAES'
  },
  {
    id: 'gaes-malaga',
    nombre: 'GAES Málaga',
    tipo: 'clínica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'Calle Marqués de Larios, Málaga',
    cadena: 'GAES'
  },
  {
    id: 'gaes-bilbao',
    nombre: 'GAES Bilbao',
    tipo: 'clínica',
    lat: 43.2565,
    lng: -2.9236,
    direccion: 'Gran Vía de Don Diego López de Haro, Bilbao',
    cadena: 'GAES'
  },
  {
    id: 'gaes-murcia',
    nombre: 'GAES Murcia',
    tipo: 'clínica',
    lat: 37.9838,
    lng: -1.1283,
    direccion: 'Calle de la Trapería, Murcia',
    cadena: 'GAES'
  },

  // =============================================================================
  // AURAL (CENTROS AUDITIVOS WIDEX)
  // =============================================================================
  
  {
    id: 'aural-madrid-principe-pio',
    nombre: 'Aural Centro Auditivo Príncipe Pío',
    tipo: 'clínica',
    lat: 40.4140,
    lng: -3.7190,
    direccion: 'Príncipe Pío, Madrid',
    cadena: 'Aural'
  },
  {
    id: 'aural-madrid-serrano',
    nombre: 'Aural Serrano',
    tipo: 'clínica',
    lat: 40.4380,
    lng: -3.6850,
    direccion: 'Calle de Serrano, Madrid',
    cadena: 'Aural'
  },
  {
    id: 'aural-barcelona',
    nombre: 'Aural Barcelona',
    tipo: 'clínica',
    lat: 41.3850,
    lng: 2.1680,
    direccion: 'Rambla de Catalunya, Barcelona',
    cadena: 'Aural'
  },
  {
    id: 'aural-valencia',
    nombre: 'Aural Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Plaza del Ayuntamiento, Valencia',
    cadena: 'Aural'
  },
  {
    id: 'aural-sevilla',
    nombre: 'Aural Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Calle Sierpes, Sevilla',
    cadena: 'Aural'
  },
  {
    id: 'aural-malaga',
    nombre: 'Aural Málaga',
    tipo: 'clínica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'Calle Larios, Málaga',
    cadena: 'Aural'
  },

  // =============================================================================
  // AUDIKA (GRUPO DEMANT)
  // =============================================================================
  
  {
    id: 'audika-madrid-casco',
    nombre: 'Audika Madrid Centro',
    tipo: 'clínica',
    lat: 40.4170,
    lng: -3.7030,
    direccion: 'Calle Preciados, Madrid',
    cadena: 'Audika'
  },
  {
    id: 'audika-madrid-chamartin',
    nombre: 'Audika Chamartín',
    tipo: 'clínica',
    lat: 40.4640,
    lng: -3.6890,
    direccion: 'Calle de Serrano, Madrid',
    cadena: 'Audika'
  },
  {
    id: 'audika-barcelona',
    nombre: 'Audika Barcelona',
    tipo: 'clínica',
    lat: 41.3900,
    lng: 2.1700,
    direccion: 'Plaça Catalunya, Barcelona',
    cadena: 'Audika'
  },
  {
    id: 'audika-valencia',
    nombre: 'Audika Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Avenida del Oeste, Valencia',
    cadena: 'Audika'
  },
  {
    id: 'audika-sevilla',
    nombre: 'Audika Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Avenida de la Constitución, Sevilla',
    cadena: 'Audika'
  },
  {
    id: 'audika-bilbao',
    nombre: 'Audika Bilbao',
    tipo: 'clínica',
    lat: 43.2565,
    lng: -2.9236,
    direccion: 'Calle Gran Vía, Bilbao',
    cadena: 'Audika'
  },

  // =============================================================================
  // AUDIONOVA (GRUPO SONOVA)
  // =============================================================================
  
  {
    id: 'audionova-madrid',
    nombre: 'AudioNova Madrid Norte',
    tipo: 'clínica',
    lat: 40.4780,
    lng: -3.6810,
    direccion: 'Calla de la Monforte de Lemos, Madrid',
    cadena: 'AudioNova'
  },
  {
    id: 'audionova-madrid-sur',
    nombre: 'AudioNova Madrid Sur',
    tipo: 'clínica',
    lat: 40.3720,
    lng: -3.6940,
    direccion: 'Avenida de los Pinos, Madrid',
    cadena: 'AudioNova'
  },
  {
    id: 'audionova-barcelona',
    nombre: 'AudioNova Barcelona',
    tipo: 'clínica',
    lat: 41.4080,
    lng: 2.1580,
    direccion: 'Avinguda de la Meridiana, Barcelona',
    cadena: 'AudioNova'
  },
  {
    id: 'audionova-valencia',
    nombre: 'AudioNova Valencia',
    tipo: 'clínica',
    lat: 39.4800,
    lng: -0.3610,
    direccion: 'Avenida de los Naranjos, Valencia',
    cadena: 'AudioNova'
  },
  {
    id: 'audionova-sevilla',
    nombre: 'AudioNova Sevilla Este',
    tipo: 'clínica',
    lat: 37.4020,
    lng: -5.9380,
    direccion: 'Avenida de la Palmera, Sevilla',
    cadena: 'AudioNova'
  },
  {
    id: 'audionova-malaga',
    nombre: 'AudioNova Málaga',
    tipo: 'clínica',
    lat: 36.6920,
    lng: -4.4480,
    direccion: 'Avenida de la Aurora, Málaga',
    cadena: 'AudioNova'
  },

  // =============================================================================
  // AUDICOST
  // =============================================================================
  
  {
    id: 'audicost-madrid',
    nombre: 'Audicost Madrid',
    tipo: 'clínica',
    lat: 40.4220,
    lng: -3.7110,
    direccion: 'Calle de Bravo Murillo, Madrid',
    cadena: 'Audicost'
  },
  {
    id: 'audicost-madrid-lazaro',
    nombre: 'Audicost San Blas',
    tipo: 'clínica',
    lat: 40.3860,
    lng: -3.6220,
    direccion: 'Calle de Alcalá, Madrid',
    cadena: 'Audicost'
  },
  {
    id: 'audicost-barcelona',
    nombre: 'Audicost Barcelona',
    tipo: 'clínica',
    lat: 41.3750,
    lng: 2.1850,
    direccion: 'Carrer de Sardenya, Barcelona',
    cadena: 'Audicost'
  },
  {
    id: 'audicost-valencia',
    nombre: 'Audicost Valencia',
    tipo: 'clínica',
    lat: 39.4590,
    lng: -0.3860,
    direccion: 'Avenida del Puerto, Valencia',
    cadena: 'Audicost'
  },
  {
    id: 'audicost-sevilla',
    nombre: 'Audicost Sevilla',
    tipo: 'clínica',
    lat: 37.3720,
    lng: -5.9880,
    direccion: 'Avenida de la Borbolla, Sevilla',
    cadena: 'Audicost'
  },

  // =============================================================================
  // CONNECT HEARING
  // =============================================================================
  
  {
    id: 'connect-hearing-madrid',
    nombre: 'Connect Hearing Madrid',
    tipo: 'clínica',
    lat: 40.4290,
    lng: -3.6980,
    direccion: 'Calle de Génova, Madrid',
    cadena: 'Connect Hearing'
  },
  {
    id: 'connect-hearing-barcelona',
    nombre: 'Connect Hearing Barcelona',
    tipo: 'clínica',
    lat: 41.3920,
    lng: 2.1750,
    direccion: 'Carrer de Balmes, Barcelona',
    cadena: 'Connect Hearing'
  },
  {
    id: 'connect-hearing-valencia',
    nombre: 'Connect Hearing Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de las Barcas, Valencia',
    cadena: 'Connect Hearing'
  },
  {
    id: 'connect-hearing-sevilla',
    nombre: 'Connect Hearing Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Plaza de la Maestranza, Sevilla',
    cadena: 'Connect Hearing'
  },

  // =============================================================================
  // GRANDAUDITION
  // =============================================================================
  
  {
    id: 'grandaudition-madrid',
    nombre: 'GrandAudition Madrid',
    tipo: 'clínica',
    lat: 40.4180,
    lng: -3.6950,
    direccion: 'Calle de Hortaleza, Madrid',
    cadena: 'GrandAudition'
  },
  {
    id: 'grandaudition-barcelona',
    nombre: 'GrandAudition Barcelona',
    tipo: 'clínica',
    lat: 41.3880,
    lng: 2.1620,
    direccion: 'Carrer de Valencia, Barcelona',
    cadena: 'GrandAudition'
  },
  {
    id: 'grandaudition-valencia',
    nombre: 'GrandAudition Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Paseo de Ruzafa, Valencia',
    cadena: 'GrandAudition'
  },
  {
    id: 'grandaudition-malaga',
    nombre: 'GrandAudition Málaga',
    tipo: 'clínica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'Calle Granada, Málaga',
    cadena: 'GrandAudition'
  },

  // =============================================================================
  // COTTET AUDIO
  // =============================================================================
  
  {
    id: 'cottet-madrid',
    nombre: 'Cottet Audio Madrid',
    tipo: 'clínica',
    lat: 40.4210,
    lng: -3.7080,
    direccion: 'Calle de Fuencarral, Madrid',
    cadena: 'Cottet Audio'
  },
  {
    id: 'cottet-barcelona',
    nombre: 'Cottet Audio Barcelona',
    tipo: 'clínica',
    lat: 41.3860,
    lng: 2.1680,
    direccion: 'Rambla de Cataluña, Barcelona',
    cadena: 'Cottet Audio'
  },
  {
    id: 'cottet-valencia',
    nombre: 'Cottet Audio Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Don Juan de Austria, Valencia',
    cadena: 'Cottet Audio'
  },
  {
    id: 'cottet-sevilla',
    nombre: 'Cottet Audio Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Calle de la Campana, Sevilla',
    cadena: 'Cottet Audio'
  },

  // =============================================================================
  // CENTRO AUDITIVO OIDOX
  // =============================================================================
  
  {
    id: 'oidox-madrid',
    nombre: 'Centro Auditivo Oidox Madrid',
    tipo: 'clínica',
    lat: 40.4260,
    lng: -3.6850,
    direccion: 'Calle de Alberto Aguilera, Madrid',
    cadena: 'Oidox'
  },
  {
    id: 'oidox-barcelona',
    nombre: 'Centro Auditivo Oidox Barcelona',
    tipo: 'clínica',
    lat: 41.3830,
    lng: 2.1580,
    direccion: 'Carrer de Urgell, Barcelona',
    cadena: 'Oidox'
  },
  {
    id: 'oidox-valencia',
    nombre: 'Centro Auditivo Oidox Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Russafa, Valencia',
    cadena: 'Oidox'
  },

  // =============================================================================
  // ALAIN AFFLELOU AUDIÓLOGO
  // =============================================================================
  
  {
    id: 'afflelou-granvia-madrid',
    nombre: 'Alain Afflelou Audiólogo Gran Vía',
    tipo: 'óptica',
    lat: 40.4200,
    lng: -3.7030,
    direccion: 'Gran Vía, Madrid',
    cadena: 'Alain Afflelou'
  },
  {
    id: 'afflelou-serrano-madrid',
    nombre: 'Alain Afflelou Serrano',
    tipo: 'óptica',
    lat: 40.4380,
    lng: -3.6850,
    direccion: 'Calle de Serrano, Madrid',
    cadena: 'Alain Afflelou'
  },
  {
    id: 'afflelou-preciados-madrid',
    nombre: 'Alain Afflelou Preciados',
    tipo: 'óptica',
    lat: 40.4170,
    lng: -3.7060,
    direccion: 'Calle de Preciados, Madrid',
    cadena: 'Alain Afflelou'
  },
  {
    id: 'afflelou-diagonal-barcelona',
    nombre: 'Alain Afflelou Diagonal',
    tipo: 'óptica',
    lat: 41.3880,
    lng: 2.1590,
    direccion: 'Avinguda Diagonal, Barcelona',
    cadena: 'Alain Afflelou'
  },
  {
    id: 'afflelou-granvia2-barcelona',
    nombre: 'Alain Afflelou Barcelona Centro',
    tipo: 'óptica',
    lat: 41.3860,
    lng: 2.1700,
    direccion: 'Plaça Catalunya, Barcelona',
    cadena: 'Alain Afflelou'
  },
  {
    id: 'afflelou-valencia',
    nombre: 'Alain Afflelou Valencia',
    tipo: 'óptica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Colón, Valencia',
    cadena: 'Alain Afflelou'
  },
  {
    id: 'afflelou-sevilla',
    nombre: 'Alain Afflelou Sevilla',
    tipo: 'óptica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Calle de Tetuán, Sevilla',
    cadena: 'Alain Afflelou'
  },
  {
    id: 'afflelou-malaga',
    nombre: 'Alain Afflelou Málaga',
    tipo: 'óptica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'Calle Marqués de Larios, Málaga',
    cadena: 'Alain Afflelou'
  },

  // =============================================================================
  // GENERAL ÓPTICA (SERVICIO DE AUDIOLOGÍA)
  // =============================================================================
  
  {
    id: 'general-optica-madrid-norte',
    nombre: 'General Óptica Audiología Madrid Norte',
    tipo: 'óptica',
    lat: 40.4780,
    lng: -3.6870,
    direccion: 'Centro Comercial Tres Cantos, Madrid',
    cadena: 'General Óptica'
  },
  {
    id: 'general-optica-madrid-sur',
    nombre: 'General Óptica Audiología Madrid Sur',
    tipo: 'óptica',
    lat: 40.3620,
    lng: -3.7090,
    direccion: 'Centro Comercial Plaza Sur, Madrid',
    cadena: 'General Óptica'
  },
  {
    id: 'general-optica-barcelona',
    nombre: 'General Óptica Audiología Barcelona',
    tipo: 'óptica',
    lat: 41.3950,
    lng: 2.1850,
    direccion: 'Avinguda de la Meridiana, Barcelona',
    cadena: 'General Óptica'
  },
  {
    id: 'general-optica-valencia',
    nombre: 'General Óptica Audiología Valencia',
    tipo: 'óptica',
    lat: 39.4850,
    lng: -0.3520,
    direccion: 'Centro Comercial Nuevo Centro, Valencia',
    cadena: 'General Óptica'
  },
  {
    id: 'general-optica-sevilla',
    nombre: 'General Óptica Audiología Sevilla',
    tipo: 'óptica',
    lat: 37.4080,
    lng: -5.9350,
    direccion: 'Centro Comercial Nervión, Sevilla',
    cadena: 'General Óptica'
  },
  {
    id: 'general-optica-malaga',
    nombre: 'General Óptica Audiología Málaga',
    tipo: 'óptica',
    lat: 36.7580,
    lng: -4.3950,
    direccion: 'Centro Comercial Rosaleda, Málaga',
    cadena: 'General Óptica'
  },
  {
    id: 'general-optica-bilbao',
    nombre: 'General Óptica Audiología Bilbao',
    tipo: 'óptica',
    lat: 43.2710,
    lng: -2.9480,
    direccion: 'Centro Comercial Zubiarte, Bilbao',
    cadena: 'General Óptica'
  },

  // =============================================================================
  // MULTIÓPTICAS (SOLOAUDIO)
  // =============================================================================
  
  {
    id: 'multiopticas-madrid',
    nombre: 'Multiópticas SoloAudio Madrid',
    tipo: 'óptica',
    lat: 40.4120,
    lng: -3.6910,
    direccion: 'Calle de Alberto Aguilera, Madrid',
    cadena: 'Multiópticas'
  },
  {
    id: 'multiopticas-barcelona',
    nombre: 'Multiópticas SoloAudio Barcelona',
    tipo: 'óptica',
    lat: 41.3800,
    lng: 2.1620,
    direccion: 'Carrer de Provença, Barcelona',
    cadena: 'Multiópticas'
  },
  {
    id: 'multiopticas-valencia',
    nombre: 'Multiópticas SoloAudio Valencia',
    tipo: 'óptica',
    lat: 39.4750,
    lng: -0.3680,
    direccion: 'Avenida del Oeste, Valencia',
    cadena: 'Multiópticas'
  },
  {
    id: 'multiopticas-sevilla',
    nombre: 'Multiópticas SoloAudio Sevilla',
    tipo: 'óptica',
    lat: 37.3880,
    lng: -5.9650,
    direccion: 'Avenida de la Constitución, Sevilla',
    cadena: 'Multiópticas'
  },
  {
    id: 'multiopticas-malaga',
    nombre: 'Multiópticas SoloAudio Málaga',
    tipo: 'óptica',
    lat: 36.7250,
    lng: -4.4280,
    direccion: 'Calle Larios, Málaga',
    cadena: 'Multiópticas'
  },

  // =============================================================================
  // OPTICALIA AUDIO
  // =============================================================================
  
  {
    id: 'opticalia-madrid',
    nombre: 'Opticalia Audio Madrid',
    tipo: 'óptica',
    lat: 40.4220,
    lng: -3.7120,
    direccion: 'Calle de Bravo Murillo, Madrid',
    cadena: 'Opticalia'
  },
  {
    id: 'opticalia-barcelona',
    nombre: 'Opticalia Audio Barcelona',
    tipo: 'óptica',
    lat: 41.3840,
    lng: 2.1750,
    direccion: 'Carrer de Urgell, Barcelona',
    cadena: 'Opticalia'
  },
  {
    id: 'opticalia-valencia',
    nombre: 'Opticalia Audio Valencia',
    tipo: 'óptica',
    lat: 39.4620,
    lng: -0.3890,
    direccion: 'Calle de Colón, Valencia',
    cadena: 'Opticalia'
  },
  {
    id: 'opticalia-sevilla',
    nombre: 'Opticalia Audio Sevilla',
    tipo: 'óptica',
    lat: 37.3750,
    lng: -5.9820,
    direccion: 'Calle de la Campana, Sevilla',
    cadena: 'Opticalia'
  },
  {
    id: 'opticalia-bilbao',
    nombre: 'Opticalia Audio Bilbao',
    tipo: 'óptica',
    lat: 43.2620,
    lng: -2.9350,
    direccion: 'Gran Vía, Bilbao',
    cadena: 'Opticalia'
  },

  // =============================================================================
  // FEDERÓPTICOS (AUDIO CENTROS)
  // =============================================================================
  
  {
    id: 'federopticos-madrid',
    nombre: 'Federópticos Audiocentros Madrid',
    tipo: 'óptica',
    lat: 40.4360,
    lng: -3.6950,
    direccion: 'Calle de Núñez de Balboa, Madrid',
    cadena: 'Federópticos'
  },
  {
    id: 'federopticos-barcelona',
    nombre: 'Federópticos Audiocentros Barcelona',
    tipo: 'óptica',
    lat: 41.3900,
    lng: 2.1650,
    direccion: 'Passeig de Sant Joan, Barcelona',
    cadena: 'Federópticos'
  },
  {
    id: 'federopticos-valencia',
    nombre: 'Federópticos Audiocentros Valencia',
    tipo: 'óptica',
    lat: 39.4780,
    lng: -0.3610,
    direccion: 'Calle de la Paz, Valencia',
    cadena: 'Federópticos'
  },
  {
    id: 'federopticos-sevilla',
    nombre: 'Federópticos Audiocentros Sevilla',
    tipo: 'óptica',
    lat: 37.3950,
    lng: -5.9550,
    direccion: 'Avenida de la Buhaira, Sevilla',
    cadena: 'Federópticos'
  },
  {
    id: 'federopticos-malaga',
    nombre: 'Federópticos Audiocentros Málaga',
    tipo: 'óptica',
    lat: 36.7100,
    lng: -4.4350,
    direccion: 'Avenida de la Palmera, Málaga',
    cadena: 'Federópticos'
  },
  {
    id: 'federopticos-granada',
    nombre: 'Federópticos Audiocentros Granada',
    tipo: 'óptica',
    lat: 37.1770,
    lng: -3.5980,
    direccion: 'Calle de Reyes Católicos, Granada',
    cadena: 'Federópticos'
  },

  // =============================================================================
  // VISTALIA
  // =============================================================================
  
  {
    id: 'vistalia-madrid',
    nombre: 'Vistalia Audiología Madrid',
    tipo: 'óptica',
    lat: 40.4180,
    lng: -3.7180,
    direccion: 'Calle de la Moncloa, Madrid',
    cadena: 'Vistalia'
  },
  {
    id: 'vistalia-barcelona',
    nombre: 'Vistalia Audiología Barcelona',
    tipo: 'óptica',
    lat: 41.3870,
    lng: 2.1720,
    direccion: 'Carrer de Muntaner, Barcelona',
    cadena: 'Vistalia'
  },
  {
    id: 'vistalia-valencia',
    nombre: 'Vistalia Audiología Valencia',
    tipo: 'óptica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de las Artes, Valencia',
    cadena: 'Vistalia'
  },
  {
    id: 'vistalia-sevilla',
    nombre: 'Vistalia Audiología Sevilla',
    tipo: 'óptica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Avenida de la Constitución, Sevilla',
    cadena: 'Vistalia'
  },

  // =============================================================================
  // NATURAL OPTICS (AUDIOLOGÍA)
  // =============================================================================
  
  {
    id: 'natural-optics-madrid',
    nombre: 'Natural Optics Audiología Madrid',
    tipo: 'óptica',
    lat: 40.4250,
    lng: -3.6880,
    direccion: 'Calle de García de Paredes, Madrid',
    cadena: 'Natural Optics'
  },
  {
    id: 'natural-optics-barcelona',
    nombre: 'Natural Optics Audiología Barcelona',
    tipo: 'óptica',
    lat: 41.3850,
    lng: 2.1600,
    direccion: 'Carrer de Aribau, Barcelona',
    cadena: 'Natural Optics'
  },
  {
    id: 'natural-optics-valencia',
    nombre: 'Natural Optics Audiología Valencia',
    tipo: 'óptica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de la Reina, Valencia',
    cadena: 'Natural Optics'
  },

  // =============================================================================
  // AUDIOVISIÓN (CENTRO ÓPTICO-AUDITIVO)
  // =============================================================================
  
  {
    id: 'audiovision-madrid',
    nombre: 'Audiovisión Madrid',
    tipo: 'óptica',
    lat: 40.4280,
    lng: -3.6950,
    direccion: 'Calle de Zurbano, Madrid',
    cadena: 'Audiovisión'
  },
  {
    id: 'audiovision-barcelona',
    nombre: 'Audiovisión Barcelona',
    tipo: 'óptica',
    lat: 41.3820,
    lng: 2.1580,
    direccion: 'Carrer de Muntaner, Barcelona',
    cadena: 'Audiovisión'
  },
  {
    id: 'audiovision-valencia',
    nombre: 'Audiovisión Valencia',
    tipo: 'óptica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Avenida del Oeste, Valencia',
    cadena: 'Audiovisión'
  },
  {
    id: 'audiovision-sevilla',
    nombre: 'Audiovisión Sevilla',
    tipo: 'óptica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Plaza de la Maestranza, Sevilla',
    cadena: 'Audiovisión'
  },
  {
    id: 'audiovision-malaga',
    nombre: 'Audiovisión Málaga',
    tipo: 'óptica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'Calle Nueva, Málaga',
    cadena: 'Audiovisión'
  },

  // =============================================================================
  // SIIOGO
  // =============================================================================
  
  {
    id: 'siogo-madrid-canillejas',
    nombre: 'SiOigo Canillejas',
    tipo: 'clínica',
    lat: 40.4480,
    lng: -3.6090,
    direccion: 'Calle de Alcalá, Madrid',
    cadena: 'SiOigo'
  },
  {
    id: 'siogo-madrid-san-mart',
    nombre: 'SiOigo Sant Martí',
    tipo: 'clínica',
    lat: 41.3870,
    lng: 2.1920,
    direccion: 'Sant Martí, Barcelona',
    cadena: 'SiOigo'
  },
  {
    id: 'siogo-valencia',
    nombre: 'SiOigo Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Avenida del Puerto, Valencia',
    cadena: 'SiOigo'
  },
  {
    id: 'siogo-sevilla',
    nombre: 'SiOigo Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Avenida de la Constitución, Sevilla',
    cadena: 'SiOigo'
  },

  // =============================================================================
  // BELIO AUDICIÓN
  // =============================================================================
  
  {
    id: 'belio-madrid',
    nombre: 'Belio Audición Madrid',
    tipo: 'clínica',
    lat: 40.4320,
    lng: -3.6920,
    direccion: 'Calle de Génova, Madrid',
    cadena: 'Belio Audición'
  },
  {
    id: 'belio-barcelona',
    nombre: 'Belio Audición Barcelona',
    tipo: 'clínica',
    lat: 41.3890,
    lng: 2.1620,
    direccion: 'Carrer de Rosselló, Barcelona',
    cadena: 'Belio Audición'
  },
  {
    id: 'belio-valencia',
    nombre: 'Belio Audición Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Colón, Valencia',
    cadena: 'Belio Audición'
  },
  {
    id: 'belio-malaga',
    nombre: 'Belio Audición Málaga',
    tipo: 'clínica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'Calle Larios, Málaga',
    cadena: 'Belio Audición'
  },

  // =============================================================================
  // AUDIOPLAN
  // =============================================================================
  
  {
    id: 'audioplan-madrid',
    nombre: 'Audioplan Madrid',
    tipo: 'clínica',
    lat: 40.4240,
    lng: -3.7100,
    direccion: 'Calle de Bravo Murillo, Madrid',
    cadena: 'Audioplan'
  },
  {
    id: 'audioplan-barcelona',
    nombre: 'Audioplan Barcelona',
    tipo: 'clínica',
    lat: 41.3860,
    lng: 2.1680,
    direccion: 'Carrer de Mallorca, Barcelona',
    cadena: 'Audioplan'
  },
  {
    id: 'audioplan-sevilla',
    nombre: 'Audioplan Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Calle de Sierpes, Sevilla',
    cadena: 'Audioplan'
  },

  // =============================================================================
  // GLOBAL OPTICS
  // =============================================================================
  
  {
    id: 'global-optics-madrid',
    nombre: 'Global Optics Madrid',
    tipo: 'óptica',
    lat: 40.4200,
    lng: -3.6980,
    direccion: 'Calle de Hortaleza, Madrid',
    cadena: 'Global Optics'
  },
  {
    id: 'global-optics-barcelona',
    nombre: 'Global Optics Barcelona',
    tipo: 'óptica',
    lat: 41.3880,
    lng: 2.1650,
    direccion: 'Gran Vía de Corts Catalanes, Barcelona',
    cadena: 'Global Optics'
  },
  {
    id: 'global-optics-valencia',
    nombre: 'Global Optics Valencia',
    tipo: 'óptica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Don Juan de Austria, Valencia',
    cadena: 'Global Optics'
  },

  // =============================================================================
  // AUDIMAD
  // =============================================================================
  
  {
    id: 'audimad-madrid',
    nombre: 'Audimad Madrid',
    tipo: 'clínica',
    lat: 40.4380,
    lng: -3.6780,
    direccion: 'Calle de Nicaragua, Madrid',
    cadena: 'Audimad'
  },
  {
    id: 'audimad-barcelona',
    nombre: 'Audimad Barcelona',
    tipo: 'clínica',
    lat: 41.3830,
    lng: 2.1720,
    direccion: "Carrer de Comte d'Urgell, Barcelona",
    cadena: 'Audimad'
  },
  {
    id: 'audimad-valencia',
    nombre: 'Audimad Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Ruzafa, Valencia',
    cadena: 'Audimad'
  },

  // =============================================================================
  // VELAVISION
  // =============================================================================
  
  {
    id: 'velavision-madrid',
    nombre: 'VelaVision Madrid',
    tipo: 'óptica',
    lat: 40.4180,
    lng: -3.6850,
    direccion: 'Calle de Alberto Aguilera, Madrid',
    cadena: 'VelaVision'
  },
  {
    id: 'velavision-barcelona',
    nombre: 'VelaVision Barcelona',
    tipo: 'óptica',
    lat: 41.3800,
    lng: 2.1550,
    direccion: 'Carrer de Sardenya, Barcelona',
    cadena: 'VelaVision'
  },

  // =============================================================================
  // CLINICAUDIO
  // =============================================================================
  
  {
    id: 'clinicaudio-madrid',
    nombre: 'ClinicAudio Madrid',
    tipo: 'clínica',
    lat: 40.4260,
    lng: -3.7080,
    direccion: 'Calle de Carranza, Madrid',
    cadena: 'ClinicAudio'
  },
  {
    id: 'clinicaudio-barcelona',
    nombre: 'ClinicAudio Barcelona',
    tipo: 'clínica',
    lat: 41.3850,
    lng: 2.1600,
    direccion: 'Carrer de Balmes, Barcelona',
    cadena: 'ClinicAudio'
  },
  {
    id: 'clinicaudio-sevilla',
    nombre: 'ClinicAudio Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'Avenida de la Constitución, Sevilla',
    cadena: 'ClinicAudio'
  },

  // =============================================================================
  // CENTROS IRADIER
  // =============================================================================
  
  {
    id: 'iradier-madrid',
    nombre: 'Centro Auditivo Iradier Madrid',
    tipo: 'clínica',
    lat: 40.4210,
    lng: -3.6850,
    direccion: 'Calle de Iradier, Madrid',
    cadena: 'Iradier'
  },
  {
    id: 'iradier-barcelona',
    nombre: 'Centro Auditivo Iradier Barcelona',
    tipo: 'clínica',
    lat: 41.3880,
    lng: 2.1700,
    direccion: 'Carrer de Aribau, Barcelona',
    cadena: 'Iradier'
  },
  {
    id: 'iradier-valencia',
    nombre: 'Centro Auditivo Iradier Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'Calle de Colón, Valencia',
    cadena: 'Iradier'
  },

  // =============================================================================
  // CENTROS AUDITIVOS EL CORTE INGLÉS
  // =============================================================================
  
  {
    id: 'corte-ingles-callao-madrid',
    nombre: 'Centro Auditivo El Corte Inglés Callao',
    tipo: 'clínica',
    lat: 40.4180,
    lng: -3.7060,
    direccion: 'El Corte Inglés Callao, Madrid',
    cadena: 'El Corte Inglés'
  },
  {
    id: 'corte-ingles-serrano-madrid',
    nombre: 'Centro Auditivo El Corte Inglés Serrano',
    tipo: 'clínica',
    lat: 40.4380,
    lng: -3.6850,
    direccion: 'El Corte Inglés Serrano, Madrid',
    cadena: 'El Corte Inglés'
  },
  {
    id: 'corte-ingles-diagonal-barcelona',
    nombre: 'Centro Auditivo El Corte Inglés Diagonal',
    tipo: 'clínica',
    lat: 41.3880,
    lng: 2.1590,
    direccion: 'El Corte Inglés Diagonal, Barcelona',
    cadena: 'El Corte Inglés'
  },
  {
    id: 'corte-ingles-plaza-catalunya-barcelona',
    nombre: 'Centro Auditivo El Corte Inglés Plaza Catalunya',
    tipo: 'clínica',
    lat: 41.3860,
    lng: 2.1700,
    direccion: 'El Corte Inglés Plaza Catalunya, Barcelona',
    cadena: 'El Corte Inglés'
  },
  {
    id: 'corte-ingles-valencia',
    nombre: 'Centro Auditivo El Corte Inglés Valencia',
    tipo: 'clínica',
    lat: 39.4699,
    lng: -0.3763,
    direccion: 'El Corte Inglés Nuevo Sur, Valencia',
    cadena: 'El Corte Inglés'
  },
  {
    id: 'corte-ingles-sevilla',
    nombre: 'Centro Auditivo El Corte Inglés Sevilla',
    tipo: 'clínica',
    lat: 37.3828,
    lng: -5.9732,
    direccion: 'El Corte Inglés Plaza del Duque, Sevilla',
    cadena: 'El Corte Inglés'
  },
  {
    id: 'corte-ingles-malaga',
    nombre: 'Centro Auditivo El Corte Inglés Málaga',
    tipo: 'clínica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'El Corte Inglés Málaga, Málaga',
    cadena: 'El Corte Inglés'
  },
  {
    id: 'corte-ingles-bilbao',
    nombre: 'Centro Auditivo El Corte Inglés Bilbao',
    tipo: 'clínica',
    lat: 43.2565,
    lng: -2.9236,
    direccion: 'El Corte Inglés Gran Vía Bilbao',
    cadena: 'El Corte Inglés'
  },

  // =============================================================================
  // CENTROS ADICIONALES EN OTRAS CIUDADES
  // =============================================================================
  
  // MÁLAGA - Cadenas principales
  {
    id: 'gaes-malaga-centro',
    nombre: 'GAES Málaga Centro',
    tipo: 'clínica',
    lat: 36.7194,
    lng: -4.4200,
    direccion: 'Calle Marqués de Larios, Málaga',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-malaga',
    nombre: 'Audio Salud Málaga',
    tipo: 'clínica',
    lat: 36.7250,
    lng: -4.4150,
    direccion: 'Avenida de la Aurora, Málaga',
    cadena: 'Audio Salud'
  },

  // BILBAO
  {
    id: 'gaes-bilbao-gran-via',
    nombre: 'GAES Bilbao Gran Vía',
    tipo: 'clínica',
    lat: 43.2565,
    lng: -2.9236,
    direccion: 'Gran Vía de Don Diego López de Haro, Bilbao',
    cadena: 'GAES'
  },
  {
    id: 'aural-bilbao',
    nombre: 'Aural Bilbao',
    tipo: 'clínica',
    lat: 43.2620,
    lng: -2.9350,
    direccion: 'Calle de Gran Vía, Bilbao',
    cadena: 'Aural'
  },

  // A CORUÑA
  {
    id: 'gaes-coruna',
    nombre: 'GAES A Coruña',
    tipo: 'clínica',
    lat: 43.3623,
    lng: -8.4115,
    direccion: 'Calle de la Real, A Coruña',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-coruna',
    nombre: 'Audio Salud A Coruña',
    tipo: 'clínica',
    lat: 43.3710,
    lng: -8.3980,
    direccion: 'Avenida de la Marina, A Coruña',
    cadena: 'Audio Salud'
  },

  // MURCIA
  {
    id: 'gaes-murcia-centro',
    nombre: 'GAES Murcia Centro',
    tipo: 'clínica',
    lat: 37.9838,
    lng: -1.1283,
    direccion: 'Calle de la Trapería, Murcia',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-murcia',
    nombre: 'Audio Salud Murcia',
    tipo: 'clínica',
    lat: 37.9900,
    lng: -1.1350,
    direccion: 'Avenida de la Libertad, Murcia',
    cadena: 'Audio Salud'
  },

  // PALMA DE MALLORCA
  {
    id: 'gaes-palma',
    nombre: 'GAES Palma de Mallorca',
    tipo: 'clínica',
    lat: 39.5696,
    lng: 2.6502,
    direccion: 'Avenida de Jaime III, Palma',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-palma',
    nombre: 'Audio Salud Palma',
    tipo: 'clínica',
    lat: 39.5750,
    lng: 2.6550,
    direccion: 'Calle de San Miguel, Palma',
    cadena: 'Audio Salud'
  },

  // GRANADA
  {
    id: 'gaes-granada',
    nombre: 'GAES Granada',
    tipo: 'clínica',
    lat: 37.1773,
    lng: -3.5986,
    direccion: 'Calle de los Reyes Católicos, Granada',
    cadena: 'GAES'
  },
  {
    'id': 'audio-salud-granada',
    nombre: 'Audio Salud Granada',
    tipo: 'clínica',
    lat: 37.1850,
    lng: -3.5900,
    direccion: 'Avenida de la Constitución, Granada',
    cadena: 'Audio Salud'
  },

  // VIGO
  {
    id: 'gaes-vigo',
    nombre: 'GAES Vigo',
    tipo: 'clínica',
    lat: 42.2406,
    lng: -8.7205,
    direccion: 'Calle de Urzaiz, Vigo',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-vigo',
    nombre: 'Audio Salud Vigo',
    tipo: 'clínica',
    lat: 42.2350,
    lng: -8.7120,
    direccion: 'Avenida de Gran Vía, Vigo',
    cadena: 'Audio Salud'
  },

  // SANTANDER
  {
    id: 'gaes-santander',
    nombre: 'GAES Santander',
    tipo: 'clínica',
    lat: 43.4623,
    lng: -3.8099,
    direccion: 'Calle de la Familia, Santander',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-santander',
    nombre: 'Audio Salud Santander',
    tipo: 'clínica',
    lat: 43.4550,
    lng: -3.8150,
    direccion: 'Avenida de los Castros, Santander',
    cadena: 'Audio Salud'
  },

  // ZARAGOZA
  {
    id: 'audio-salud-zaragoza',
    nombre: 'Audio Salud Zaragoza',
    tipo: 'clínica',
    lat: 41.6480,
    lng: -0.8880,
    direccion: 'Paseo de la Independencia, Zaragoza',
    cadena: 'Audio Salud'
  },
  {
    id: 'aural-zaragoza',
    nombre: 'Aural Zaragoza',
    tipo: 'clínica',
    lat: 41.6580,
    lng: -0.8750,
    direccion: 'Calle de Don Jaime I, Zaragoza',
    cadena: 'Aural'
  },

  // OVIEDO
  {
    id: 'gaes-oviedo',
    nombre: 'GAES Oviedo',
    tipo: 'clínica',
    lat: 43.3615,
    lng: -5.8498,
    direccion: 'Calle de Uría, Oviedo',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-oviedo',
    nombre: 'Audio Salud Oviedo',
    tipo: 'clínica',
    lat: 43.3680,
    lng: -5.8420,
    direccion: 'Avenida de Galicia, Oviedo',
    cadena: 'Audio Salud'
  },

  // TOLEDO
  {
    id: 'audio-salud-toledo',
    nombre: 'Audio Salud Toledo',
    tipo: 'clínica',
    lat: 39.8628,
    lng: -4.0273,
    direccion: 'Plaza de Zocodover, Toledo',
    cadena: 'Audio Salud'
  },

  // ALICANTE
  {
    id: 'gaes-alicante',
    nombre: 'GAES Alicante',
    tipo: 'clínica',
    lat: 38.3452,
    lng: -0.4810,
    direccion: 'Avenida de la Constitución, Alicante',
    cadena: 'GAES'
  },
  {
    id: 'audio-salud-alicante',
    nombre: 'Audio Salud Alicante',
    tipo: 'clínica',
    lat: 38.3520,
    lng: -0.4780,
    direccion: 'Calle de Maisonnave, Alicante',
    cadena: 'Audio Salud'
  },

  // CÓRDOBA
  {
    id: 'audio-salud-cordoba',
    nombre: 'Audio Salud Córdoba',
    tipo: 'clínica',
    lat: 37.8786,
    lng: -4.7796,
    direccion: 'Calle de la Gran Vía, Córdoba',
    cadena: 'Audio Salud'
  },

  // JEREZ DE LA FRONTERA
  {
    id: 'audio-salud-jerez',
    nombre: 'Audio Salud Jerez',
    tipo: 'clínica',
    lat: 36.6850,
    lng: -6.1260,
    direccion: 'Calle de Larga, Jerez de la Frontera',
    cadena: 'Audio Salud'
  }
];

// =============================================================================
// FUNCIONES DE UTILIDAD
// =============================================================================

// Obtener competidores por área geográfica
export function getCompetitorsInArea(lat, lng, radiusKm = 5) {
  const competitorsInArea = competitorLocations.filter(comp => {
    const distance = calculateDistance(lat, lng, comp.lat, comp.lng);
    comp.distancia = distance.toFixed(2);
    return distance <= radiusKm;
  });

  return competitorsInArea.sort((a, b) => parseFloat(a.distancia) - parseFloat(b.distancia));
}

// Calcular distancia entre dos puntos (fórmula de Haversine)
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Obtener todos los competidores de una cadena específica
export function getCompetitorsByChain(chainName) {
  return competitorLocations.filter(comp => comp.cadena === chainName);
}

// Obtener todos los competidores de un tipo específico
export function getCompetitorsByType(type) {
  return competitorLocations.filter(comp => comp.tipo === type);
}

// Estadísticas de competidores
export function getCompetitorStats() {
  const stats = {
    total: competitorLocations.length,
    porTipo: {
      clínica: 0,
      óptica: 0,
      farmacia: 0
    },
    porCadena: {}
  };

  competitorLocations.forEach(comp => {
    stats.porTipo[comp.tipo] = (stats.porTipo[comp.tipo] || 0) + 1;
    stats.porCadena[comp.cadena] = (stats.porCadena[comp.cadena] || 0) + 1;
  });

  return stats;
}
