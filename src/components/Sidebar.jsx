import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Building2,
  Users,
  TrendingUp,
  AlertCircle,
  Download,
  Menu,
  X,
  ChevronRight,
  RefreshCw,
  Database,
  Globe
} from 'lucide-react';
import SearchBox from './SearchBox';
import ScorePanel from './ScorePanel';
import MetricsPanel from './MetricsPanel';
import LayerControls from './LayerControls';
import ExportButton from './ExportButton';
import { logos } from '../utils/logoMapping';

const Sidebar = ({ 
  selectedLocation, 
  viabilityData, 
  isLoading, 
  layers, 
  onLayerToggle, 
  onReset,
  onPostalCodeSearch,
  onCenterOnClinisord,
  clinisordLocations,
  onShowDataSources,
  onCityChange
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const [showLocationsList, setShowLocationsList] = useState(false);
  const [selectedCity, setSelectedCity] = useState('madrid');

  const cities = [
    { id: 'madrid', name: 'Madrid', postalCode: '28001', lat: 40.4168, lng: -3.7038 },
    { id: 'barcelona', name: 'Barcelona', postalCode: '08001', lat: 41.3851, lng: 2.1734 },
    { id: 'valencia', name: 'Valencia', postalCode: '46001', lat: 39.4699, lng: -0.3763, comingSoon: true },
    { id: 'sevilla', name: 'Sevilla', postalCode: '41001', lat: 37.3828, lng: -5.9732, comingSoon: true }
  ];

  const filteredClinisordLocations = clinisordLocations.filter(loc => 
    loc.direccion.toLowerCase().includes(selectedCity.toLowerCase())
  );

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    if (onCityChange) {
      const city = cities.find(c => c.id === cityId);
      if (city) {
        onCityChange(city);
      }
    }
  };

  return (
    <aside 
      className={`${isCollapsed ? 'w-16' : 'w-96'} bg-white shadow-xl z-[1000] transition-all duration-300 flex flex-col h-full`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img
                src={logos.centroSocial.path}
                alt={logos.centroSocial.alt}
                className="w-12 h-12 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h1 className="text-lg font-bold text-white">Centro Social del Audífono</h1>
                <p className="text-xs text-slate-400">Clinisord GeoStrategy Dashboard</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isCollapsed ? <Menu size={20} className="text-white" /> : <X size={20} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Selector de Ciudad */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <label className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
            <Globe size={12} />
            Seleccionar Ciudad
          </label>
          <div className="grid grid-cols-2 gap-2">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => !city.comingSoon && handleCityChange(city.id)}
                disabled={city.comingSoon}
                className={`relative px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  city.comingSoon
                    ? 'bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed opacity-80'
                    : selectedCity === city.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-primary-50 border border-slate-200'
                }`}
              >
                {city.name}
                {city.comingSoon && (
                  <span className="block text-[10px] text-amber-500 font-normal mt-0.5 leading-none">Próximamente</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Buscador */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-200">
          <SearchBox key={selectedCity} onSearch={onPostalCodeSearch} />
        </div>
      )}

      {/* Tabs */}
      {!isCollapsed && (
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'analysis' 
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <TrendingUp size={16} className="inline mr-1" />
            Análisis
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'locations' 
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <MapPin size={16} className="inline mr-1" />
            Centros
          </button>
        </div>
      )}

      {/* Contenido principal */}
      {!isCollapsed && activeTab === 'analysis' && (
        <div className="flex-1 overflow-y-auto">
          {/* Panel de Score */}
          <ScorePanel 
            viabilityData={viabilityData} 
            selectedLocation={selectedLocation}
            isLoading={isLoading}
          />

          {/* Panel de Métricas */}
          <MetricsPanel 
            viabilityData={viabilityData}
            selectedLocation={selectedLocation}
          />

          {/* Controles de Capas */}
          <LayerControls 
            layers={layers}
            onToggle={onLayerToggle}
          />

          {/* Acciones */}
          <div className="p-4 border-t border-slate-200 space-y-3">
            <ExportButton 
              viabilityData={viabilityData}
              selectedLocation={selectedLocation}
              disabled={!selectedLocation}
            />
            
            {selectedLocation && (
              <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
              >
                <RefreshCw size={18} />
                Nueva Búsqueda
              </button>
            )}
            
            {/* Botón de fuentes de datos */}
            <button
              onClick={onShowDataSources}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors font-medium border border-indigo-200"
            >
              <Database size={18} />
              Fuentes de Datos
            </button>
          </div>
        </div>
      )}

      {/* Lista de ubicaciones Clinisord */}
      {!isCollapsed && activeTab === 'locations' && (
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Building2 size={16} />
            Red de Centros Clinisord
          </h3>
          <div className="space-y-2">
            {filteredClinisordLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => onCenterOnClinisord(location)}
                className="w-full p-3 bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-lg transition-colors text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate group-hover:text-primary-700">
                      {location.nombre}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {location.direccion}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-primary-500" />
                </div>
              </button>
            ))}
          </div>
          
          {/* Botón de fuentes de datos también en esta pestaña */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <button
              onClick={onShowDataSources}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors font-medium border border-indigo-200"
            >
              <Database size={18} />
              Fuentes de Datos
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Clinisord</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Sistema activo
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
