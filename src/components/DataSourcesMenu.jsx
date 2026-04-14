import React from 'react';

const DataSourcesMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sources = {
    demografia: {
      titulo: 'Demografía y Población',
      fuente: 'Instituto Nacional de Estadística (INE)',
      url: 'https://www.ine.es/dyngs/INEbase/es/categoria.htm?c=Estadistica_P&cid=1254734710984',
      metodologia: 'Censo Anual de Población a 1 de enero de 2024. Datos provisionales.',
      campos: [
        { nombre: 'Población total', descripcion: 'Habitantes empadronados a 1 de enero de 2024' },
        { nombre: 'Densidad de población', descripcion: 'Habitantes por kilómetro cuadrado' },
        { nombre: 'Población mayor de 65 años', descripcion: 'Porcentaje de población envejecida' },
        { nombre: 'Distribución por sexo', descripcion: 'Porcentaje de hombres y mujeres' }
      ]
    },
    competencia: {
      titulo: 'Competencia',
      fuente: 'Base de datos propia de Clinisord',
      metodologia: 'Geolocalización de centros auditivos competidores mediante búsqueda directa y directorios especializados.',
      campos: [
        { nombre: 'Número de competidores', descripcion: 'Centros auditivos en un radio de 500m' },
        { nombre: 'Tipo de competencia', descripción: 'Cadenas especializadas vs. ópticas' }
      ]
    },
    algoritmo: {
      titulo: 'Algoritmo de Viabilidad',
      fuente: 'Desarrollo interno Clinisord',
      metodologia: 'Modelo predictivo basado en ponderación de factores demográficos y de mercado.',
      campos: [
        { nombre: 'Score de viabilidad', descripcion: 'Puntuación de 0-100 basada en múltiples factores' },
        { nombre: 'Factor demográfico', descripcion: 'Población total y densidad' },
        { nombre: 'Factor de envejecimiento', descripcion: 'Población mayor de 65 años' },
        { nombre: 'Factor competitivo', descripcion: 'Densidad de competidores' }
      ]
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay de fondo */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Fuentes de Datos</h2>
            <p className="text-indigo-100 text-sm">Información sobre las fuentes y metodología</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Contenido scrollable */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] space-y-6">
          {/* Demografía */}
          <div className="border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{sources.demografia.titulo}</h3>
                <p className="text-sm text-slate-500">{sources.demografia.fuente}</p>
              </div>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-sm text-slate-600"><strong>Metodología:</strong> {sources.demografia.metodologia}</p>
              <p className="text-sm text-slate-600"><strong>Última actualización:</strong> Enero 2024</p>
              <p className="text-sm text-slate-500 mt-2"><strong>Campos disponibles:</strong></p>
              <ul className="text-sm text-slate-600 space-y-1">
                {sources.demografia.campos.map((campo, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>{campo.nombre}:</strong> {campo.descripcion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Competencia */}
          <div className="border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{sources.competencia.titulo}</h3>
                <p className="text-sm text-slate-500">{sources.competencia.fuente}</p>
              </div>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-sm text-slate-600"><strong>Metodología:</strong> {sources.competencia.metodologia}</p>
              <p className="text-sm text-slate-500 mt-2"><strong>Campos disponibles:</strong></p>
              <ul className="text-sm text-slate-600 space-y-1">
                {sources.competencia.campos.map((campo, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>{campo.nombre}:</strong> {campo.descripcion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Algoritmo */}
          <div className="border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{sources.algoritmo.titulo}</h3>
                <p className="text-sm text-slate-500">{sources.algoritmo.fuente}</p>
              </div>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-sm text-slate-600"><strong>Metodología:</strong> {sources.algoritmo.metodologia}</p>
              <p className="text-sm text-slate-500 mt-2"><strong>Factores de cálculo:</strong></p>
              <ul className="text-sm text-slate-600 space-y-1">
                {sources.algoritmo.campos.map((campo, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span><strong>{campo.nombre}:</strong> {campo.descripcion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Nota legal */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> Los datos presentados son estimaciones basadas en fuentes públicas y metodología propia. 
              Se recomienda validar los resultados con estudios de campo específicos antes de tomar decisiones de inversión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourcesMenu;
