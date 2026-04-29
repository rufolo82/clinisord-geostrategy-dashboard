// Mapeo de logos para la aplicación
// Los logos se almacenan en /public/logos/

export const logos = {
  // Marca principal
  centroSocial: {
    path: '/logos/logo-centro-social.png',
    alt: 'Centro Social del Audífono'
  },
  
  // Competidores
  gaes: {
    path: '/logos/logo-gaes.png',
    alt: 'GAES'
  },
  aural: {
    path: '/logos/logo-aural.jpg',
    alt: 'Aural'
  },
  audika: {
    path: '/logos/logo-audika.svg',
    alt: 'Audika'
  },
  afflelou: {
    path: '/logos/logo-afflelou.svg',
    alt: 'Alain Afflelou'
  },
  multiopticas: {
    path: '/logos/logo-multiopticas.png',
    alt: 'Multiópticas'
  },
  opticalia: {
    path: '/logos/logo-opticalia.svg',
    alt: 'Opticalia',
    placeholder: true // Logo no disponible, usar inicial
  },
  federopticos: {
    path: '/logos/logo-federopticos.jpg',
    alt: 'Federópticos'
  },
  naturaloptics: {
    path: '/logos/logo-naturaloptics.png',
    alt: 'Natural Optics'
  },
  belio: {
    path: '/logos/logo-belio.png',
    alt: 'Belio Audición'
  },
  cottet: {
    path: '/logos/logo-cottet.jpg',
    alt: 'Cottet Audio'
  },
  audionova: {
    path: '/logos/logo-audionova.jpg',
    alt: 'AudioNova'
  },
  generaloptica: {
    path: null,
    alt: 'General Óptica',
    placeholder: true
  },
  audicost: {
    path: null,
    alt: 'Audicost',
    placeholder: true
  },
  vistalia: {
    path: null,
    alt: 'Vistalia',
    placeholder: true
  },
  sioigo: {
    path: null,
    alt: 'SiOigo',
    placeholder: true
  },
  audimad: {
    path: null,
    alt: 'Audimad',
    placeholder: true
  },
  grandaudition: {
    path: null,
    alt: 'GrandAudition',
    placeholder: true
  },
  audioplan: {
    path: null,
    alt: 'Audioplan',
    placeholder: true
  },
  elcorteingles: {
    path: null,
    alt: 'El Corte Inglés',
    placeholder: true
  },
  oidox: {
    path: null,
    alt: 'Centro Auditivo Oidox',
    placeholder: true
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
