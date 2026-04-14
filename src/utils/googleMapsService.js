// Google Maps Service para Clinisord Dashboard
// Para usar este servicio necesitas:
// 1. Una cuenta de Google Cloud Console
// 2. Habilitar "Maps JavaScript API" y "Places API"
// 3. Obtener una API Key
// 4. Reemplazar YOUR_API_KEY_HERE con tu clave real

// CONFIGURACIÓN - REQUIERE TU API KEY DE GOOGLE CLOUD CONSOLE
const GOOGLE_MAPS_CONFIG = {
  apiKey: 'YOUR_API_KEY_HERE', // ⚠️ REEMPLAZAR CON TU API KEY
  libraries: ['places', 'geometry'],
  version: 'weekly',
  language: 'es'
};

// URL base para cargar Google Maps (se carga dinámicamente)
const GOOGLE_MAPS_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=${GOOGLE_MAPS_CONFIG.libraries.join(',')}&v=${GOOGLE_MAPS_CONFIG.version}&language=${GOOGLE_MAPS_CONFIG.language}`;

// Estado del servicio
let isLoaded = false;
let placesService = null;
let geocoder = null;

// Cargar Google Maps dinámicamente
export const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (isLoaded && window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    // Verificar si el script ya existe
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.onload = () => {
        isLoaded = true;
        resolve(window.google.maps);
      };
      return;
    }

    // Crear script
    const script = document.createElement('script');
    script.src = GOOGLE_MAPS_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isLoaded = true;
      resolve(window.google.maps);
    };
    
    script.onerror = (error) => {
      reject(new Error('Error cargando Google Maps. Verifica tu API Key.'));
    };

    document.head.appendChild(script);
  });
};

// Inicializar servicios de Google Maps
export const initializeGoogleMapsServices = (map) => {
  if (!window.google) {
    throw new Error('Google Maps no está cargado');
  }

  placesService = new window.google.maps.places.PlacesService(map);
  geocoder = new window.google.maps.Geocoder();
  
  return { placesService, geocoder };
};

// Buscar centros auditivos/audiólogos cerca de una ubicación
export const searchHearingCentersNearby = (location, radius = 1000) => {
  if (!placesService) {
    throw new Error('Places Service no inicializado');
  }

  return new Promise((resolve, reject) => {
    const request = {
      location: location,
      radius: radius,
      keyword: 'centro auditivo audiólogo GAES',
      type: ['store']
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results.map(place => ({
          id: place.place_id,
          nombre: place.name,
          direccion: place.vicinity,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          rating: place.rating || 0,
          tipo: 'clínica',
          fuente: 'Google Maps'
        })));
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Error en búsqueda: ${status}`));
      }
    });
  });
};

// Buscar ópticas cerca de una ubicación
export const searchOpticiansNearby = (location, radius = 1000) => {
  if (!placesService) {
    throw new Error('Places Service no inicializado');
  }

  return new Promise((resolve, reject) => {
    const request = {
      location: location,
      radius: radius,
      keyword: 'óptica optica',
      type: ['store']
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results.map(place => ({
          id: place.place_id,
          nombre: place.name,
          direccion: place.vicinity,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          rating: place.rating || 0,
          tipo: 'óptica',
          fuente: 'Google Maps'
        })));
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Error en búsqueda: ${status}`));
      }
    });
  });
};

// Buscar farmacias cerca de una ubicación
export const searchPharmaciesNearby = (location, radius = 1000) => {
  if (!placesService) {
    throw new Error('Places Service no inicializado');
  }

  return new Promise((resolve, reject) => {
    const request = {
      location: location,
      radius: radius,
      keyword: 'farmacia',
      type: ['pharmacy']
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results.map(place => ({
          id: place.place_id,
          nombre: place.name,
          direccion: place.vicinity,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          rating: place.rating || 0,
          tipo: 'farmacia',
          fuente: 'Google Maps'
        })));
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Error en búsqueda: ${status}`));
      }
    });
  });
};

// Buscar un lugar específico por nombre
export const searchPlaceByName = (query, location = null) => {
  if (!placesService) {
    throw new Error('Places Service no inicializado');
  }

  return new Promise((resolve, reject) => {
    const request = {
      query: query,
      location: location,
      radius: 50000 // 50km
    };

    placesService.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results.map(place => ({
          id: place.place_id,
          nombre: place.name,
          direccion: place.formatted_address || place.vicinity,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })));
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Error en búsqueda: ${status}`));
      }
    });
  });
};

// Geocodificación: dirección a coordenadas
export const geocodeAddress = (address) => {
  if (!geocoder) {
    throw new Error('Geocoder no inicializado');
  }

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const result = results[0];
        resolve({
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          formattedAddress: result.formatted_address
        });
      } else {
        reject(new Error(`Error en geocodificación: ${status}`));
      }
    });
  });
};

// Geocodificación inversa: coordenadas a dirección
export const reverseGeocode = (lat, lng) => {
  if (!geocoder) {
    throw new Error('Geocoder no inicializado');
  }

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK') {
        resolve({
          address: results[0].formatted_address,
          components: parseAddressComponents(results[0].address_components)
        });
      } else {
        reject(new Error(`Error en geocodificación inversa: ${status}`));
      }
    });
  });
};

// Obtener detalles de un lugar específico
export const getPlaceDetails = (placeId) => {
  if (!placesService) {
    throw new Error('Places Service no inicializado');
  }

  return new Promise((resolve, reject) => {
    const request = {
      placeId: placeId,
      fields: ['name', 'formatted_address', 'geometry', 'rating', 'user_ratings_total', 'photos', 'formatted_phone_number', 'opening_hours']
    };

    placesService.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve({
          nombre: place.name,
          direccion: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          rating: place.rating,
          totalRatings: place.user_ratings_total,
          telefono: place.formatted_phone_number,
          horario: place.opening_hours?.weekday_text || []
        });
      } else {
        reject(new Error(`Error obteniendo detalles: ${status}`));
      }
    });
  });
};

// Buscar múltiples tipos de establecimientos en un área
export const searchAllNearby = async (location, radius = 500) => {
  try {
    const [centros, opticas, farmacias] = await Promise.all([
      searchHearingCentersNearby(location, radius),
      searchOpticiansNearby(location, radius),
      searchPharmaciesNearby(location, radius)
    ]);

    return {
      competidores: [...centros, ...opticas, ...farmacias],
      total: centros.length + opticas.length + farmacias.length
    };
  } catch (error) {
    console.error('Error en búsqueda completa:', error);
    throw error;
  }
};

// Utilidad para parsear componentes de dirección
const parseAddressComponents = (components) => {
  const parsed = {};
  const mapping = {
    street_number: 'streetNumber',
    route: 'street',
    locality: 'city',
    administrative_area_level_1: 'state',
    administrative_area_level_2: 'county',
    country: 'country',
    postal_code: 'postalCode',
    neighborhood: 'neighborhood'
  };

  components.forEach(component => {
    component.types.forEach(type => {
      if (mapping[type]) {
        parsed[mapping[type]] = component.long_name;
      }
    });
  });

  return parsed;
};

// Obtener configuración actual
export const getConfig = () => ({ ...GOOGLE_MAPS_CONFIG });

// Verificar si Google Maps está cargado
export const isGoogleMapsLoaded = () => isLoaded;
