import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Users,
  Building2,
  Factory,
  Eye,
  Target,
  Navigation,
  ZoomIn,
  ZoomOut,
  Layers,
  X
} from 'lucide-react';
import { generateHeatmapData } from '../utils/mockData';
import { competitorLocations, competitorChains, getVisibleCompetitors } from '../utils/competitorDataComplete';
import { loadGoogleMaps, searchAllNearby, isGoogleMapsLoaded } from '../utils/googleMapsService';
import { getLogoPath, getLogoAlt, needsPlaceholder } from '../utils/logoMapping';

// Configuración de iconos personalizados con soporte para hover
const createIcon = (type, size = 36, isHovered = false) => {
  const colors = {
    clinisord: 'linear-gradient(135deg, #0ea5e9, #0f172a)',
    competitor: 'linear-gradient(135deg, #ef4444, #dc2626)',
    candidate: 'linear-gradient(135deg, #10b981, #059669)',
    optica: 'linear-gradient(135deg, #f59e0b, #d97706)',
    farmacia: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  };
  
  const icons = {
    clinisord: '🏥',
    competitor: '⚕️',
    candidate: '📍',
    optica: '👓',
    farmacia: '💊'
  };
  
  // Efecto de iluminación cuando está en hover
  const glowEffect = isHovered 
    ? `box-shadow: 0 0 20px 5px ${type === 'competitor' ? '#ef4444' : type === 'optica' ? '#f59e0b' : type === 'farmacia' ? '#8b5cf6' : '#10b981'};`
    : 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);';
  
  const transform = isHovered ? 'scale(1.2)' : 'scale(1)';
  const transition = 'all 0.3s ease';
  
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="custom-marker" style="
        background: ${colors[type]};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${size * 0.5}px;
        border: 3px solid white;
        ${glowEffect}
        transform: ${transform};
        transition: ${transition};
        cursor: pointer;
        z-index: ${isHovered ? '1000' : '1'};
      ">
        ${icons[type]}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Función para crear iconos personalizados basados en la cadena de competencia
const createChainIcon = (chainId, chainColor, size = 26, isHovered = false) => {
  // Determinar el icono basado en el tipo de cadena
  const chain = competitorChains?.find(c => c.id === chainId);
  const iconType = chain?.type === 'óptica' ? '👓' : '⚕️';
  
  // Efecto de iluminación cuando está en hover
  const glowEffect = isHovered 
    ? `box-shadow: 0 0 20px 5px ${chainColor};`
    : 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);';
  
  const transform = isHovered ? 'scale(1.2)' : 'scale(1)';
  const transition = 'all 0.3s ease';
  
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="custom-marker" style="
        background: linear-gradient(135deg, ${chainColor}, ${adjustColorBrightness(chainColor, -20)});
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${size * 0.5}px;
        border: 3px solid white;
        ${glowEffect}
        transform: ${transform};
        transition: ${transition};
        cursor: pointer;
        z-index: ${isHovered ? '1000' : '1'};
      ">
        ${iconType}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Función para crear iconos con LOGOS de las cadenas de competencia
const createLogoIcon = (chainId, size = 36, isHovered = false) => {
  const logoPath = getLogoPath(chainId);
  const logoAlt = getLogoAlt(chainId);
  const usePlaceholder = needsPlaceholder(chainId);
  
  // Escala para hover
  const scale = isHovered ? 1.2 : 1;
  const scaledSize = size * scale;
  
  // Efecto de iluminación cuando está en hover
  const glowEffect = isHovered 
    ? 'box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.5);'
    : 'box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.3);';
  
  // Estilo base del contenedor
  const containerStyle = `
    background: white;
    width: ${scaledSize}px;
    height: ${scaledSize}px;
    border-radius: 50%;
    border: 3px solid white;
    ${glowEffect}
    transform: scale(${scale});
    transition: all 0.3s ease;
    cursor: pointer;
    z-index: ${isHovered ? '1000' : '1'};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // Estilo de la imagen del logo
  const imageStyle = `
    width: ${scaledSize * 0.75}px;
    height: ${scaledSize * 0.75}px;
    object-fit: contain;
  `;
  
  // Estilo del placeholder con iniciales
  const placeholderStyle = `
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    font-size: ${scaledSize * 0.35}px;
    font-weight: bold;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // Obtener iniciales para el placeholder
  const initials = chainId
    .split(/(?=[A-Z])/)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="custom-marker-logo" style="${containerStyle}">
        ${logoPath && !usePlaceholder 
          ? `<img src="${logoPath}" alt="${logoAlt}" style="${imageStyle}" />`
          : `<div style="${placeholderStyle}">${initials}</div>`
        }
      </div>
    `,
    iconSize: [scaledSize, scaledSize],
    iconAnchor: [scaledSize / 2, scaledSize / 2],
    popupAnchor: [0, -scaledSize / 2]
  });
};

// Función específica para crear icono con logo de Clinisord
const createClinisordLogoIcon = (size = 40, isHovered = false) => {
  const logoPath = '/logos/logo-centro-social.png';
  const logoAlt = 'Clinisord Centro Social del Audífono';
  
  // Escala para hover
  const scale = isHovered ? 1.15 : 1;
  const scaledSize = size * scale;
  
  // Efecto de iluminación cuando está en hover
  const glowEffect = isHovered 
    ? 'box-shadow: 0 0 25px 8px rgba(14, 165, 233, 0.6);'
    : 'box-shadow: 0 4px 12px -3px rgba(0, 0, 0, 0.4);';
  
  // Estilo base del contenedor
  const containerStyle = `
    background: white;
    width: ${scaledSize}px;
    height: ${scaledSize}px;
    border-radius: 50%;
    border: 3px solid white;
    ${glowEffect}
    transform: scale(${scale});
    transition: all 0.3s ease;
    cursor: pointer;
    z-index: ${isHovered ? '1001' : '2'};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // Estilo de la imagen del logo
  const imageStyle = `
    width: ${scaledSize * 0.8}px;
    height: ${scaledSize * 0.8}px;
    object-fit: contain;
  `;
  
  return L.divIcon({
    className: 'custom-marker-container clinisord-marker',
    html: `
      <div class="custom-marker-clinisord" style="${containerStyle}">
        <img src="${logoPath}" alt="${logoAlt}" style="${imageStyle}" />
      </div>
    `,
    iconSize: [scaledSize, scaledSize],
    iconAnchor: [scaledSize / 2, scaledSize / 2],
    popupAnchor: [0, -scaledSize / 2]
  });
};
  
// Función auxiliar para ajustar el brillo de un color
// Función auxiliar para ajustar el brillo de un color
function adjustColorBrightness(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
}

// Componente de tooltip personalizado para hover
const MarkerTooltip = ({ name, type, position, isVisible }) => {
  if (!isVisible || !name) return null;
  
  const typeLabels = {
    clinisord: 'Clinisord',
    competitor: 'Clínica',
    optica: 'Óptica',
    farmacia: 'Farmacia',
    candidate: 'Candidato'
  };
  
  const typeColors = {
    clinisord: 'bg-cyan-500',
    competitor: 'bg-red-500',
    optica: 'bg-amber-500',
    farmacia: 'bg-purple-500',
    candidate: 'bg-green-500'
  };
  
  return (
    <div 
      className="absolute z-[1001] pointer-events-none"
      style={{
        left: position.x,
        top: position.y - 10,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="bg-white rounded-lg shadow-xl px-3 py-2 min-w-[150px] text-center animate-fade-in">
        <div className={`inline-block w-2 h-2 rounded-full ${typeColors[type]} mr-2`}></div>
        <span className="text-sm font-semibold text-slate-800">{name}</span>
        <div className="text-xs text-slate-500 mt-1">{typeLabels[type] || type}</div>
      </div>
      {/* Flecha del tooltip */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
      </div>
    </div>
  );
};

// Componente para manejar eventos del mapa
const MapEventsHandler = ({ onLocationSelect, enabled }) => {
  useMapEvents({
    click(e) {
      if (enabled) {
        const { lat, lng } = e.latlng;
        onLocationSelect(lat, lng);
      }
    }
  });
  return null;
};

// Componente para controlar la vista del mapa
const MapController = ({ center, zoom }) => {
  const map = useMap();
  const prevCenterRef = useRef(null);
  
  useEffect(() => {
    // Solo actualizar si el center cambió (comparando valores, no referencias)
    // El center viene como array [lat, lng]
    if (center && center.length === 2) {
      const newLat = center[0];
      const newLng = center[1];
      
      if (!prevCenterRef.current || 
          prevCenterRef.current[0] !== newLat || 
          prevCenterRef.current[1] !== newLng) {
        console.log('[MapController] Center changed from', prevCenterRef.current, 'to', center);
        map.setView(center, zoom || 14);
        prevCenterRef.current = center;
      }
    }
  }, [map, center, zoom]);
  
  return null;
};

// Componente de controles personalizados del mapa
const CustomMapControls = ({ onZoomIn, onZoomOut, onResetView }) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
        title="Acercar"
      >
        <ZoomIn size={20} className="text-slate-700" />
      </button>
      <button
        onClick={onZoomOut}
        className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
        title="Alejar"
      >
        <ZoomOut size={20} className="text-slate-700" />
      </button>
      <button
        onClick={onResetView}
        className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
        title="Vista completa"
      >
        <Navigation size={20} className="text-slate-700" />
      </button>
    </div>
  );
};

// Componente de leyenda del mapa
const MapLegend = ({ layers, googleMapsLoaded, chainVisibility, competitorChains, selectedLocation, isOpen, onToggle }) => {
  // Contar cadenas visibles
  const visibleChainsCount = chainVisibility 
    ? Object.values(chainVisibility).filter(v => v).length 
    : competitorChains?.length || 0;
  
  // Don't render if panel is closed
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="absolute bottom-4 left-4 z-[1000] glass-panel rounded-xl shadow-lg p-3 flex items-center gap-2 hover:bg-white/90 transition-all"
        title="Mostrar leyenda"
      >
        <Layers size={18} className="text-slate-600" />
        <span className="text-sm font-medium text-slate-700">Leyenda</span>
      </button>
    );
  }
  
  return (
    <div className="absolute bottom-4 left-4 z-[1000] glass-panel rounded-xl shadow-lg max-w-xs transition-all duration-300">
      {/* Header con botón de cerrar */}
      <div className="p-3 flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
        <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Layers size={16} />
          Leyenda
        </h4>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
          title="Ocultar leyenda"
        >
          <X size={14} className="text-slate-500" />
        </button>
      </div>
      
      <div className="p-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span>Clinisord (Tus centros)</span>
        </div>
        {layers?.showHeatmap && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 opacity-50"></span>
            <span>Densidad &gt;65 años</span>
          </div>
        )}
        {layers?.showCompetitors && (
          <>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Clínicas competencia ({visibleChainsCount} cadenas)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>Ópticas</span>
            </div>
          </>
        )}
        {layers?.showInfluenceArea && (
          <div className="flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-500 opacity-50 rounded"></span>
            <span>Área de influencia (1km)</span>
          </div>
        )}
        {layers?.showCompetitors && selectedLocation && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span>Candidato analizado</span>
          </div>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-500 italic">
          💡 Pasa el cursor sobre los marcadores para ver nombres
        </p>
        {googleMapsLoaded && (
          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Google Maps conectado
          </p>
        )}
      </div>
    </div>
  );
};

// Función auxiliar para calcular distancia en el mapa (fórmula de Haversine)
function calculateMapDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Componente principal del mapa
const Map = ({ 
  selectedLocation, 
  viabilityData, 
  layers, 
  mapConfig, 
  clinisordLocations, 
  heatmapData,
  chainVisibility,
  competitorChains,
  currentCity,
  onLocationSelect,
  onReset 
}) => {
  const [currentZoom, setCurrentZoom] = useState(6);
  const mapRef = useRef(null);
  
  // Estados para hover
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [hoveredMarkerType, setHoveredMarkerType] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Estado para datos de Google Maps
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [loadingCompetitors, setLoadingCompetitors] = useState(false);
  const [googleCompetitors, setGoogleCompetitors] = useState([]);
  
  // Estado para visibilidad de la leyenda
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  
  // Función para filtrar competidores por ciudad
  const filterCompetitorsByCity = useMemo(() => {
    return (competitors, city) => {
      if (!city || city === 'all') return competitors;
      
      // Definir bounding boxes para cada ciudad
      const cityBounds = {
        madrid: { minLat: 40.3, maxLat: 40.55, minLng: -3.9, maxLng: -3.5 },
        barcelona: { minLat: 41.3, maxLat: 41.5, minLng: 2.0, maxLng: 2.3 },
        valencia: { minLat: 39.4, maxLat: 39.5, minLng: -0.4, maxLng: -0.3 },
        sevilla: { minLat: 37.35, maxLat: 37.45, minLng: -6.0, maxLng: -5.9 }
      };
      
      const bounds = cityBounds[city];
      if (!bounds) return competitors;
      
      return competitors.filter(comp => 
        comp.lat >= bounds.minLat && 
        comp.lat <= bounds.maxLat && 
        comp.lng >= bounds.minLng && 
        comp.lng <= bounds.maxLng
      );
    };
  }, []);
  
  // Calcular competidores visibles basados en la selección del usuario y la ciudad
  const visibleCompetitors = useMemo(() => {
    console.log('[Map] useMemo recalculating visibleCompetitors for city:', currentCity);
    console.log('[Map] chainVisibility received:', JSON.stringify(chainVisibility));
    
    // Primero filtrar por visibilidad de cadenas
    let competitors = chainVisibility ? getVisibleCompetitors(chainVisibility) : competitorLocations;
    
    // Luego filtrar por ciudad
    competitors = filterCompetitorsByCity(competitors, currentCity);
    
    console.log('[Map] visibleCompetitors calculated:', competitors.length, 'competitors for', currentCity);
    console.log('[Map] visibleCompetitors sample:', competitors.slice(0, 3).map(c => ({ id: c.id, cadena: c.cadena, nombre: c.nombre })));
    return competitors;
  }, [chainVisibility, currentCity, filterCompetitorsByCity]);
  
  // Obtener el color de la cadena
  const getChainColor = (chainId) => {
    const chain = competitorChains?.find(c => c.id === chainId);
    return chain?.color || '#ef4444';
  };
  
  // Obtener el tipo de icono basado en la cadena
  const getChainIconType = (chainId) => {
    const chain = competitorChains?.find(c => c.id === chainId);
    if (chain?.type === 'óptica') return 'optica';
    if (chain?.type === 'clínica') return 'competitor';
    return 'competitor';
  };
  
  const handleZoomEnd = (e) => {
    setCurrentZoom(e.target.getZoom());
  };
  
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };
  
  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };
  
  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setView([40.4168, -3.7038], 6);
      onReset();
    }
  };
  
  // Inicializar Google Maps al cargar el componente
  useEffect(() => {
    const initGoogleMaps = async () => {
      try {
        await loadGoogleMaps();
        setGoogleMapsLoaded(true);
        console.log('Google Maps cargado correctamente');
      } catch (error) {
        console.log('Google Maps no disponible, usando datos estáticos');
        setGoogleMapsLoaded(false);
      }
    };
    
    initGoogleMaps();
  }, []);
  
  // Buscar competidores usando Google Maps cuando se selecciona una ubicación
  useEffect(() => {
    const fetchGoogleMapsCompetitors = async () => {
      if (!selectedLocation || !googleMapsLoaded) return;
      
      setLoadingCompetitors(true);
      try {
        const results = await searchAllNearby(
          { lat: selectedLocation.lat, lng: selectedLocation.lng },
          1000
        );
        setGoogleCompetitors(results.competidores);
      } catch (error) {
        console.log('Error buscando competidores en Google Maps:', error);
        setGoogleCompetitors([]);
      } finally {
        setLoadingCompetitors(false);
      }
    };
    
    if (selectedLocation) {
      fetchGoogleMapsCompetitors();
    }
  }, [selectedLocation, googleMapsLoaded]);
  
  // Generar competidores para la ubicación seleccionada
  const getCompetitorsForLocation = () => {
    if (!selectedLocation || !viabilityData) return [];
    
    // Usar datos de Google Maps si están disponibles
    if (googleMapsLoaded && googleCompetitors.length > 0) {
      return googleCompetitors;
    }
    
    return viabilityData.analysis?.competition?.competitors || [];
  };
  
  const competitors = getCompetitorsForLocation();
  
  // Manejadores de hover
  const handleMarkerMouseEnter = (e, markerId, markerType, markerName) => {
    const map = mapRef.current;
    if (map) {
      const point = map.latLngToContainerPoint(e.latlng);
      setTooltipPosition({ x: point.x, y: point.y });
    }
    setHoveredMarker(markerId);
    setHoveredMarkerType(markerType);
  };
  
  const handleMarkerMouseLeave = () => {
    setHoveredMarker(null);
    setHoveredMarkerType(null);
  };
  
  return (
    <div className="w-full h-full relative">
      <MapContainer
        ref={mapRef}
        center={[mapConfig.center.lat, mapConfig.center.lng]}
        zoom={mapConfig.zoom}
        style={{ height: '100%', width: '100%' }}
        onZoomEnd={handleZoomEnd}
        zoomControl={false}
      >
        {/* Capa de teselas de OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Controlador de eventos del mapa */}
        <MapEventsHandler 
          onLocationSelect={onLocationSelect} 
          enabled={true}
        />
        
        {/* Controlador de vista del mapa */}
        <MapController 
          center={[mapConfig.center.lat, mapConfig.center.lng]} 
          zoom={mapConfig.zoom}
        />
        
        {/* Heatmap de población mayor de 65 años */}
        {layers?.showHeatmap && currentZoom >= 8 && (
          <Circle
            center={[40.4168, -3.7038]}
            radius={500000}
            pathOptions={{
              color: '#0ea5e9',
              fillColor: '#0ea5e9',
              fillOpacity: 0.1,
              weight: 0
            }}
          />
        )}
        
        {/* Marcadores de ubicaciones Clinisord */}
        {layers?.showClinisord && clinisordLocations?.map((location) => (
          <Marker
            key={`clinisord-${location.id}`}
            position={[location.lat, location.lng]}
            icon={createClinisordLogoIcon(40, hoveredMarker === `clinisord-${location.id}`)}
            eventHandlers={{
              mouseover: (e) => handleMarkerMouseEnter(e, `clinisord-${location.id}`, 'clinisord', location.nombre),
              mouseout: handleMarkerMouseLeave
            }}
          >
            <Popup>
              <div className="text-sm p-1">
                <strong className="block text-slate-800 mb-1">{location.nombre}</strong>
                <span className="text-slate-600">{location.direccion}</span>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Marcadores de todos los competidores reales (filtrados por ciudad y visibilidad de cadenas) */}
        {layers?.showCompetitors && visibleCompetitors.length > 0 && visibleCompetitors.map((competitor) => {
          const chainColor = getChainColor(competitor.cadena);
          // Usar logo si está disponible, otherwise usar el color de la cadena
          const hasLogo = getLogoPath(competitor.cadena) && !needsPlaceholder(competitor.cadena);
          return (
            <Marker
              key={`all-competitor-${competitor.id}`}
              position={[competitor.lat, competitor.lng]}
              icon={hasLogo 
                ? createLogoIcon(competitor.cadena, 36, hoveredMarker === `all-competitor-${competitor.id}`)
                : createChainIcon(competitor.cadena, chainColor, 26, hoveredMarker === `all-competitor-${competitor.id}`)
              }
              eventHandlers={{
                mouseover: (e) => handleMarkerMouseEnter(e, `all-competitor-${competitor.id}`, competitor.tipo, competitor.nombre),
                mouseout: handleMarkerMouseLeave
              }}
            >
              <Popup>
                <div className="text-sm p-1">
                  <strong className="block text-slate-800 mb-1 flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: chainColor }}
                    />
                    {competitor.nombre}
                  </strong>
                  <span className="text-slate-500 text-xs">{competitor.direccion}</span>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>{competitorChains?.find(c => c.id === competitor.cadena)?.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs" 
                      style={{ 
                        backgroundColor: `${chainColor}20`,
                        color: chainColor
                      }}
                    >
                      {competitor.tipo === 'clínica' ? 'Clínica' : 'Óptica'}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })};
        
        {/* Marcador de ubicación seleccionada */}
        {selectedLocation && (
          <>
            {/* Área de influencia */}
            {layers?.showInfluenceArea && (
              <Circle
                center={[selectedLocation.lat, selectedLocation.lng]}
                radius={1000}
                pathOptions={{
                  color: '#0ea5e9',
                  fillColor: '#0ea5e9',
                  fillOpacity: 0.15,
                  weight: 2,
                  dashArray: '5, 10'
                }}
              />
            )}
            
            {/* Marcador candidato */}
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={createIcon('candidate', 40, hoveredMarker === 'candidate')}
              eventHandlers={{
                mouseover: (e) => handleMarkerMouseEnter(e, 'candidate', 'candidate', selectedLocation.name),
                mouseout: handleMarkerMouseLeave
              }}
            >
              <Popup>
                <div className="text-sm p-2 min-w-[200px]">
                  <strong className="block text-slate-800 text-base mb-2">
                    📍 {selectedLocation.name}
                  </strong>
                  {viabilityData && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Score:</span>
                          <span className="font-semibold" style={{ color: viabilityData.color }}>
                            {viabilityData.score}/100
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Pob. &gt;65:</span>
                          <span className="font-semibold text-slate-700">
                            {viabilityData.analysis?.demographics?.targetPopulation?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Competidores:</span>
                          <span className="font-semibold text-slate-700">
                            {loadingCompetitors ? (
                              <span className="flex items-center gap-1">
                                <span className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                                Buscando...
                              </span>
                            ) : (
                              viabilityData.analysis?.competition?.totalCompetitors || competitors.length
                            )}
                          </span>
                        </div>
                        {googleMapsLoaded && (
                          <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Datos de Google Maps
                          </div>
                        )}
                      </div>
                      <div 
                        className="mt-3 p-2 rounded-lg text-center text-sm font-medium"
                        style={{ backgroundColor: `${viabilityData.color}20`, color: viabilityData.color }}
                      >
                        {viabilityData.category}
                      </div>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
            
            {/* Marcadores de competidores */}
            {layers?.showCompetitors && competitors?.map((competitor) => (
              <Marker
                key={`competitor-${competitor.id}`}
                position={[competitor.lat, competitor.lng]}
                icon={createIcon(competitor.tipo === 'clínica' ? 'competitor' : 
                               competitor.tipo === 'óptica' ? 'optica' : 'farmacia', 28, hoveredMarker === `competitor-${competitor.id}`)}
                eventHandlers={{
                  mouseover: (e) => handleMarkerMouseEnter(e, `competitor-${competitor.id}`, competitor.tipo, competitor.nombre),
                  mouseout: handleMarkerMouseLeave
                }}
              >
                <Popup>
                  <div className="text-sm p-1">
                    <strong className="block text-slate-800 mb-1">
                      {competitor.tipo === 'clínica' ? '⚕️' : 
                       competitor.tipo === 'óptica' ? '👓' : '💊'} {competitor.nombre}
                    </strong>
                    <span className="text-slate-500 text-xs">
                      {competitor.distancia ? `Distancia: ${competitor.distancia} km` : ''}
                    </span>
                    <span className="block text-xs text-slate-400 mt-1">{competitor.direccion || competitor.vicinity || ''}</span>
                    {competitor.fuente && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        {competitor.fuente}
                      </span>
                    )}
                    <div className="text-amber-500 text-xs mt-1">
                      {'★'.repeat(Math.floor(competitor.rating || 0))}
                      <span className="text-slate-400">
                        {'★'.repeat(5 - Math.floor(competitor.rating || 0))}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
      
      {/* Tooltip flotante para hover */}
      {hoveredMarker && hoveredMarkerType && (
        <MarkerTooltip
          name={hoveredMarkerType === 'clinisord' 
            ? clinisordLocations.find(l => `clinisord-${l.id}` === hoveredMarker)?.nombre
            : hoveredMarker === 'candidate'
              ? selectedLocation?.name
              : competitors.find(c => `competitor-${c.id}` === hoveredMarker)?.nombre ||
                competitorLocations.find(c => `all-competitor-${c.id}` === hoveredMarker)?.nombre
          }
          type={hoveredMarkerType}
          position={tooltipPosition}
          isVisible={true}
        />
      )}
      
      {/* Controles personalizados */}
      <CustomMapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
      />
      
      {/* Leyenda */}
      <MapLegend 
        layers={layers} 
        googleMapsLoaded={googleMapsLoaded}
        chainVisibility={chainVisibility}
        competitorChains={competitorChains}
        selectedLocation={selectedLocation}
        isOpen={isLegendOpen}
        onToggle={() => setIsLegendOpen(!isLegendOpen)}
      />
      
      {/* Instrucciones */}
      {!selectedLocation && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] glass-panel rounded-xl px-4 py-2 shadow-lg">
          <p className="text-sm text-slate-600 flex items-center gap-2">
            <Target size={16} className="text-primary-500" />
            Haz clic en cualquier punto del mapa para analizar la ubicación
          </p>
        </div>
      )}
      
      {/* Información de zoom */}
      <div className="absolute bottom-4 right-4 z-[1000] glass-panel rounded-lg px-3 py-2 text-xs text-slate-500">
        Zoom: {currentZoom}x
      </div>
    </div>
  );
};

export default Map;
