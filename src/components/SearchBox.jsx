import React, { useState, useMemo } from 'react';
import { Search, MapPin, AlertCircle } from 'lucide-react';
import { getAllPostalCodes } from '../utils/spainData';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Obtener lista de códigos postales para autocompletado
  const postalCodes = useMemo(() => getAllPostalCodes(), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setError(null);

    if (value.length >= 2) {
      // Filtrar códigos postales y municipios
      const filtered = postalCodes.filter(item => {
        const searchValue = value.toLowerCase();
        return item.value.includes(value) || 
               item.label.toLowerCase().includes(searchValue);
      }).slice(0, 8);

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(`${suggestion.value} - ${suggestion.municipio}`);
    setShowSuggestions(false);
    onSearch(suggestion.value, {
      lat: suggestion.lat,
      lng: suggestion.lng,
      municipio: suggestion.municipio,
      provincia: suggestion.provincia
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Por favor, introduce una dirección, municipio o código postal');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      // Usar Nominatim de OpenStreetMap para buscar ubicaciones reales
      // Agregamos "España" si el usuario no lo ha escrito para acotar la búsqueda
      const searchQuery = query.toLowerCase().includes('españa') || query.toLowerCase().includes('spain')
        ? query 
        : `${query}, España`;
        
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`);
      
      if (!response.ok) {
        throw new Error('Error en el servidor de mapas');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        onSearch(query, {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          // Usamos la primera parte del display_name como nombre principal
          municipio: result.name || result.display_name.split(',')[0],
          provincia: ''
        });
        setShowSuggestions(false);
      } else {
        setError('No se encontró la ubicación. Intenta ser más específico o prueba con otro término.');
      }
    } catch (err) {
      console.error('Error buscando ubicación:', err);
      setError('Error al conectar con el servicio de mapas. Inténtalo de nuevo más tarde.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsSearching(false);
          onSearch('Ubicación actual', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            municipio: 'Tu ubicación',
            provincia: 'Detectada'
          });
        },
        (error) => {
          setIsSearching(false);
          setError('No se pudo obtener tu ubicación. Por favor, asegúrate de haber dado los permisos necesarios en tu navegador.');
        }
      );
    } else {
      setError('Tu navegador no soporta geolocalización.');
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <label className="block text-xs font-medium text-slate-600 mb-2">
          Buscar ubicación
        </label>
        <div className="relative">
          {isSearching ? (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
          )}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Dirección, CP o ciudad (ej. Toledo, 28030)"
            className={`w-full pl-10 pr-10 py-3 bg-slate-100 border ${
              error ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-primary-500'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm`}
            disabled={isSearching}
          />
          {query && !isSearching && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Sugerencias */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.value}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-0 flex items-center gap-3 transition-colors"
            >
              <MapPin size={16} className="text-primary-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {suggestion.value}
                </p>
                <p className="text-xs text-slate-500">
                  {suggestion.municipio}, {suggestion.provincia}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Botón de ubicación actual */}
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        disabled={isSearching}
        className={`mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
          isSearching ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-primary-50 hover:bg-primary-100 text-primary-600'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Usar mi ubicación actual
      </button>
    </div>
  );
};

export default SearchBox;
