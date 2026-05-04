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
    alt: 'GAES (Amplifon)'
  },
  aural: {
    path: 'https://www.auralcentrosauditivos.es/wp-content/themes/aural/assets/img/logo-aural.svg',
    alt: 'Aural'
  },
  audika: {
    path: 'https://www.audika.es/Content/img/logo-audika.svg',
    alt: 'Audika'
  },
  afflelou_acoustics: {
    path: 'https://www.afflelou.es/Content/img/logo-afflelou.svg',
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
  natural_optics: {
    path: 'https://naturalopticsgroup.com/wp-content/uploads/2022/10/logo_nog.png',
    alt: 'Natural Optics Group'
  },
  microson: {
    path: 'https://www.microson.es/Img/Logo2.PNG',
    alt: 'Microson'
  },
  audicion_activa: {
    path: 'https://audicionactiva.com/wp-content/uploads/2023/10/logo-audicion-activa.png',
    alt: 'Audición Activa'
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
  audifon: {
    path: 'https://centrosauditivos.es/wp-content/uploads/2018/11/audifon-logo.png',
    alt: 'Audifon'
  },
  audical: {
    path: 'https://www.audical.com.uy/content/dam/latam/icons/brand-logo/red-logos/audical-logo-header.png/jcr:content/renditions/cq5dam.web.1280.1280.png',
    alt: 'Audical'
  },
  belio: {
    path: '/logos/logo-belio.png',
    alt: 'Belio Audición'
  },
  cottet: {
    path: 'https://www.cottet.com/skin/frontend/cottet/default/images/logo.png',
    alt: 'Cottet Audio'
  },
  audionova: {
    path: '/logos/logo-audionova.jpg',
    alt: 'AudioNova'
  },
  specsavers: {
    path: 'https://www.specsavers.es/sites/default/files/logo.png',
    alt: 'Specsavers'
  },
  audicost: {
    path: '/logos/logo-audicost.svg',
    alt: 'Audicost'
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
