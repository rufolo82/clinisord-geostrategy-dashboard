import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import CompetitorPanel from './CompetitorPanel';
import DataSourcesMenu from './DataSourcesMenu';
import ViabilityTransparencyModal from './ViabilityTransparencyModal';
import { generateHeatmapData } from '../utils/mockData';
import { getClinisordLocations } from '../utils/spainData';
import { calculateViabilityScore } from '../utils/algorithm';
import { competitorChains, competitorLocations } from '../utils/competitorDataComplete';
import { Info } from 'lucide-react';

const Dashboard = () => {
  // Estados principales
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viabilityData, setViabilityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado del menú de fuentes de datos
  const [showDataSources, setShowDataSources] = useState(false);
  
  // Estado del modal de transparencia
  const [showTransparencyModal, setShowTransparencyModal] = useState(false);
  
  // Estados de capas
  const [layers, setLayers] = useState({
    showHeatmap: true,
    showCompetitors: true,
    showClinisord: true,
    showInfluenceArea: false
  });
  
  // Ciudad actual
  const [currentCity, setCurrentCity] = useState('madrid');
  
  // Estado de visibilidad de cadenas de competencia
  const [chainVisibility, setChainVisibility] = useState(() => {
    const initialVisibility = {};
    competitorChains.forEach(chain => {
      initialVisibility[chain.id] = true;
    });
    return initialVisibility;
  });
  
  // Estado del panel de competencia
  const [competitorPanelOpen, setCompetitorPanelOpen] = useState(false);
  
  // Configuración del mapa
  const [mapConfig, setMapConfig] = useState({
    center: { lat: 40.4168, lng: -3.7038 },
    zoom: 6
  });
  
  // Datos estáticos
  const [clinisordLocations, setClinisordLocations] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  
  // Inicializar datos
  useEffect(() => {
    const initData = () => {
      setClinisordLocations(getClinisordLocations());
      setHeatmapData(generateHeatmapData());
    };
    initData();
  }, []);
  
  // Manejar selección de ubicación en el mapa
  const handleLocationSelect = useCallback(async (lat, lng, locationName = 'Ubicación seleccionada') => {
    setIsLoading(true);
    setSelectedLocation({ lat, lng, name: locationName });
    
    try {
      // Calcular viabilidad
      const viability = calculateViabilityScore(lat, lng, locationName);
      setViabilityData(viability);
      
      // Actualizar configuración del mapa
      setMapConfig(prev => ({
        ...prev,
        center: { lat, lng },
        zoom: 14
      }));
    } catch (error) {
      console.error('Error calculando viabilidad:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Manejar búsqueda de código postal
  const handlePostalCodeSearch = useCallback((postalCode, locationData) => {
    console.log('[Dashboard] handlePostalCodeSearch called:', postalCode, locationData);
    if (locationData) {
      console.log('[Dashboard] Calling handleLocationSelect with:', locationData.lat, locationData.lng);
      handleLocationSelect(
        locationData.lat,
        locationData.lng,
        `${locationData.municipio}, ${locationData.provincia}`
      );
    } else {
      console.log('[Dashboard] locationData is null or undefined');
    }
  }, [handleLocationSelect]);
  
  // Manejar cambio de capas
  const handleLayerToggle = useCallback((layerName) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  }, []);
  
  // Manejar cambio de visibilidad de cadenas de competencia
  const handleChainToggle = useCallback((chainId) => {
    console.log('handleChainToggle called with:', chainId);
    console.log('Current chainVisibility:', JSON.stringify(chainVisibility));
    setChainVisibility(prev => {
      console.log('Updating chainVisibility for:', chainId);
      const newState = { ...prev, [chainId]: !prev[chainId] };
      console.log('New chainVisibility:', JSON.stringify(newState));
      return newState;
    });
  }, []);
  
  // Alternar todas las cadenas
  const handleToggleAllChains = useCallback(() => {
    console.log('handleToggleAllChains called');
    console.log('Current chainVisibility:', JSON.stringify(chainVisibility));
    const allVisible = Object.values(chainVisibility).every(v => v);
    console.log('All visible:', allVisible);
    setChainVisibility(prev => {
      const newVisibility = { ...prev };
      competitorChains.forEach(chain => {
        newVisibility[chain.id] = !allVisible;
      });
      console.log('New chainVisibility:', JSON.stringify(newVisibility));
      return newVisibility;
    });
  }, [chainVisibility]);
  
  // Log when chainVisibility changes
  useEffect(() => {
    console.log('chainVisibility changed:', JSON.stringify(chainVisibility));
  }, [chainVisibility]);
  
  // Manejar centrado en ubicación Clinisord
  const handleCenterOnClinisord = useCallback((location) => {
    handleLocationSelect(location.lat, location.lng, location.nombre);
  }, [handleLocationSelect]);

  // Manejar cambio de ciudad
  const handleCityChange = useCallback((city) => {
    setCurrentCity(city.id);
    setMapConfig({
      center: { lat: city.lat, lng: city.lng },
      zoom: 12
    });
    setSelectedLocation(null);
    setViabilityData(null);
    
    // Resetear visibilidad de todas las cadenas al cambiar de ciudad
    setChainVisibility(prev => {
      const newVisibility = {};
      competitorChains.forEach(chain => {
        newVisibility[chain.id] = true;
      });
      return newVisibility;
    });
  }, []);

  // Obtener cadenas con contadores dinámicos según la ciudad
  const getChainsForCity = useCallback((city) => {
    return competitorChains.map(chain => {
      // Contar competidores en el área de la ciudad
      const competitorsInCity = competitorLocations.filter(comp => {
        let compLat = comp.lat;
        let compLng = comp.lng;
        
        // Definir bounding boxes aproximadas para cada ciudad
        if (city === 'madrid') {
          return compLat >= 40.3 && compLat <= 40.55 && compLng >= -3.9 && compLng <= -3.5;
        } else if (city === 'barcelona') {
          return compLat >= 41.3 && compLat <= 41.5 && compLng >= 2.0 && compLng <= 2.3;
        } else if (city === 'valencia') {
          return compLat >= 39.4 && compLat <= 39.5 && compLng >= -0.4 && compLng <= -0.3;
        } else if (city === 'sevilla') {
          return compLat >= 37.35 && compLat <= 37.45 && compLng >= -6.0 && compLng <= -5.9;
        }
        return false;
      }).filter(comp => comp.cadena === chain.id);
      
      return {
        ...chain,
        count: competitorsInCity.length
      };
    });
  }, []);
  
  // Reiniciar análisis
  const handleReset = useCallback(() => {
    setSelectedLocation(null);
    setViabilityData(null);
    setMapConfig({
      center: { lat: 40.4168, lng: -3.7038 },
      zoom: 6
    });
  }, []);
  
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Panel lateral */}
      <Sidebar 
        selectedLocation={selectedLocation}
        viabilityData={viabilityData}
        isLoading={isLoading}
        layers={layers}
        onLayerToggle={handleLayerToggle}
        onReset={handleReset}
        onPostalCodeSearch={handlePostalCodeSearch}
        onCenterOnClinisord={handleCenterOnClinisord}
        clinisordLocations={clinisordLocations}
        onShowDataSources={() => setShowDataSources(true)}
        onCityChange={handleCityChange}
      />
      
      {/* Área principal del mapa */}
      <main className="flex-1 relative">
        <Map
          selectedLocation={selectedLocation}
          viabilityData={viabilityData}
          layers={layers}
          mapConfig={mapConfig}
          clinisordLocations={clinisordLocations}
          heatmapData={heatmapData}
          chainVisibility={chainVisibility}
          competitorChains={competitorChains}
          currentCity={currentCity}
          onLocationSelect={handleLocationSelect}
          onReset={handleReset}
        />
        
        {/* Panel de competencia */}
        <CompetitorPanel
          chains={getChainsForCity(currentCity)}
          chainVisibility={chainVisibility}
          toggleChain={handleChainToggle}
          toggleAll={handleToggleAllChains}
          isOpen={competitorPanelOpen}
          setIsOpen={setCompetitorPanelOpen}
          currentCity={currentCity}
        />
        
        {/* Botón de fuentes de datos */}
        <button
          onClick={() => setShowDataSources(true)}
          className="absolute top-4 right-4 z-[40] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-slate-200 group"
        >
          <svg className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800">Fuentes de Datos</span>
        </button>
        
        {/* Botón de transparencia del algoritmo */}
        <button
          onClick={() => setShowTransparencyModal(true)}
          className="absolute top-4 right-48 z-[40] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-slate-200 group"
          title="Ver cómo se calcula la viabilidad"
        >
          <Info size={18} className="text-primary-600 group-hover:text-primary-700" />
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800">Ver cálculo</span>
        </button>
        
        {/* Overlay de loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 text-center">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-slate-700 font-medium">Analizando ubicación...</p>
              <p className="text-slate-500 text-sm mt-1">Calculando viabilidad</p>
            </div>
          </div>
        )}
        
        {/* Menú de fuentes de datos */}
        <DataSourcesMenu 
          isOpen={showDataSources} 
          onClose={() => setShowDataSources(false)} 
        />
        
        {/* Modal de transparencia del algoritmo */}
        <ViabilityTransparencyModal
          isOpen={showTransparencyModal}
          onClose={() => setShowTransparencyModal(false)}
          viabilityData={viabilityData}
        />
      </main>
    </div>
  );
};

export default Dashboard;
