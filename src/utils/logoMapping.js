// Mapeo de logos para la aplicación
// Todos los logos están almacenados localmente en /public/logos/ para máxima fiabilidad

export const logos = {
  // Marca principal
  centroSocial: {
    path: '/logos/logo-centro-social.png',
    alt: 'Centro Social del Audífono'
  },

  // --- CADENAS DE AUDÍFONOS ---
  gaes: {
    path: '/logos/logo-gaes.png',
    alt: 'GAES (Amplifon)'
  },
  aural: {
    path: '/logos/logo-aural.jpg',
    alt: 'Aural Centros Auditivos'
  },
  audika: {
    path: '/logos/logo-audika.svg',
    alt: 'Audika'
  },
  microson: {
    path: '/logos/logo-microson.png',
    alt: 'Microson'
  },
  audicion_activa: {
    path: '/logos/logo-audicion-activa.webp',
    alt: 'Audición Activa'
  },
  audifon: {
    path: '/logos/logo-audifon.svg',
    alt: 'Audifon'
  },
  audical: {
    path: '/logos/logo-audical.png',
    alt: 'Audical'
  },
  audionova: {
    path: '/logos/logo-audionova.jpg',
    alt: 'AudioNova'
  },
  eurosone: {
    path: '/logos/logo-eurosone.png',
    alt: 'Eurosone'
  },
  audias: {
    path: '/logos/logo-audias.png',
    alt: 'Audias'
  },
  audiotek: {
    path: '/logos/logo-audiotek.png',
    alt: 'Audiotek'
  },
  belio: {
    path: '/logos/logo-belio.png',
    alt: 'Belio Audición'
  },
  audicost: {
    path: '/logos/logo-audicost.svg',
    alt: 'Audicost'
  },
  specsavers: {
    path: '/logos/logo-specsavers.svg',
    alt: 'Specsavers'
  },
  oidox: {
    path: null,
    alt: 'Centro Auditivo Oidox',
    placeholder: true
  },

  // --- CADENAS DE ÓPTICA CON SERVICIO AUDITIVO ---
  afflelou_acoustics: {
    path: '/logos/logo-afflelou.svg',
    alt: 'Alain Afflelou Acoustics'
  },
  multiopticas: {
    path: '/logos/logo-multiopticas.png',
    alt: 'Multiópticas'
  },
  opticalia: {
    path: '/logos/logo-opticalia.svg',
    alt: 'Opticalia'
  },
  federopticos: {
    path: '/logos/logo-federopticos.jpg',
    alt: 'Federópticos'
  },
  general_optica: {
    path: '/logos/logo-general-optica.png',
    alt: 'General Óptica'
  },
  elcorteingles: {
    path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/El_Corte_Ingl%C3%A9s_logo.svg/1200px-El_Corte_Ingl%C3%A9s_logo.svg.png',
    alt: 'El Corte Inglés'
  },
  vistaoptica: {
    path: '/logos/logo-vistaoptica.svg',
    alt: 'Vistaóptica'
  },
  mainat: {
    path: '/logos/logo-mainat.png',
    alt: 'Mainat'
  },
  natural_optics: {
    path: '/logos/logo-naturaloptics.png',
    alt: 'Natural Optics Group'
  },
  cottet: {
    path: '/logos/logo-cottet.jpg',
    alt: 'Cottet Audio'
  }
};

// Función para obtener el path del logo de una cadena
export function getLogoPath(chainId) {
  const logo = logos[chainId];
  if (!logo) return null;
  if (logo.placeholder) return null;
  return logo.path;
}

// Función para obtener el alt del logo
export function getLogoAlt(chainId) {
  const logo = logos[chainId];
  if (!logo) return chainId;
  return logo.alt;
}

// Función para verificar si necesita placeholder
export function needsPlaceholder(chainId) {
  const logo = logos[chainId];
  return logo?.placeholder || false;
}
