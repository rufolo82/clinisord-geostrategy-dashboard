import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { generateMockData } from './utils/mockData';
import { initializeSpainData } from './utils/spainData';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inicializar datos de España y generar mock data
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        // Inicializar datos geográficos de España
        initializeSpainData();
        
        // Generar datos mock iniciales
        generateMockData();
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error inicializando la aplicación:', err);
        setError('Error al inicializar la aplicación. Por favor, recargue la página.');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Cargando Clinisord GeoStrategy...</p>
          <p className="text-slate-400 text-sm mt-1">Preparando datos de análisis</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Error de Inicialización</h2>
          <p className="text-slate-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Recargar Página
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
