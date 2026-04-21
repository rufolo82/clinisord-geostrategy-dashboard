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
      titulo: 'Localización de Competidores',
      fuente: 'OpenStreetMap / Overpass API',
      url: 'https://overpass-api.de/',
      metodologia: 'Consulta en tiempo real a la base de datos colaborativa de OpenStreetMap. Se filtran establecimientos de tipo healthcare:audiology, shop:hearing_aids y optician en toda España.',
      campos: [
        { nombre: 'Número de competidores', descripcion: 'Centros auditivos en un radio configurable' },
        { nombre: 'Tipo de establecimiento', descripcion: 'Clínica especializada, óptica, farmacia o independiente' },
        { nombre: 'Coordenadas geográficas', descripcion: 'Posición exacta para cálculo de distancias y mapas' },
        { nombre: 'Nombre del establecimiento', descripcion: 'Nombre oficial según OpenStreetMap' }
      ]
    },
    inteligenciaCompetitiva: {
      titulo: 'Inteligencia Competitiva',
      fuente: 'Datos Curados Clinisord + Análisis de Mercado',
      metodologia: 'Perfiles detallados de 7 cadenas competidoras elaborados mediante observación directa, análisis de precios publicados en webs oficiales, y revisión de reseñas en Google Maps. Actualización manual trimestral.',
      subcategorias: [
        {
          nombre: 'Perfiles de Cadenas',
          fuente: 'Elaboración propia',
          descripcion: 'Fichas completas de GAES (Amplifon), Audical, Alain Afflelou Acoustics, Specsavers, El Corte Inglés, Independientes y Farmacias. Incluyen servicios, precios estimados, puntos fuertes/débiles y valoraciones Google Maps.',
          actualizacion: 'Abril 2026'
        },
        {
          nombre: 'Cuota de Mercado',
          fuente: 'Estimación basada en dato de centros OSM + cuota nacional declarada',
          descripcion: 'Cálculo proporcional al número de centros de cada cadena dentro del radio analizado, ajustado por cuota de mercado nacional estimada.',
          actualizacion: 'En tiempo real (según datos OSM)'
        },
        {
          nombre: 'Vulnerabilidades y Oportunidades',
          fuente: 'Modelo de análisis Clinisord',
          descripcion: 'Detección automática de competidores con rating bajo, zonas sin teleaudiología, mercados atomizados en independientes, o áreas sin servicio social integrado.',
          actualizacion: 'Calculado dinámicamente por ubicación'
        },
        {
          nombre: 'Ratings y Valoraciones',
          fuente: 'Google Maps (observación manual 2024)',
          descripcion: 'Rangos de valoraciones observados en centros de Madrid y Barcelona. No son datos en tiempo real. Para valoraciones actualizadas se requiere Google Maps Places API.',
          actualizacion: 'Diciembre 2024'
        }
      ]
    },
    algoritmo: {
      titulo: 'Algoritmo de Viabilidad',
      fuente: 'Desarrollo interno Clinisord',
      metodologia: 'Modelo predictivo de 5 factores ponderados que calcula un score de viabilidad de 0–100 para cualquier ubicación en España.',
      campos: [
        { nombre: 'Factor demográfico (35%)', descripcion: 'Puntuación basada en población total, densidad y porcentaje de mayores de 65 años' },
        { nombre: 'Factor competitivo (25%)', descripcion: 'Inverso de la saturación de competidores en radio de 1-3km' },
        { nombre: 'Factor de canibalización (15%)', descripcion: 'Penalización por proximidad a otros centros Clinisord propios' },
        { nombre: 'Factor de accesibilidad (10%)', descripcion: 'Puntuación basada en transporte público y accesibilidad de la zona' },
        { nombre: 'Factor oportunidad estratégica (15%)', descripcion: 'Score de oportunidad basado en vulnerabilidades de competidores, vacíos de teleaudiología y servicio social detectados en el área' }
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
              <p className="text-sm text-slate-500 mt-2"><strong>Última actualización:</strong> Enero 2024</p>
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

          {/* Localización de Competidores (OSM) */}
          <div className="border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{sources.competencia.titulo}</h3>
                <p className="text-sm text-slate-500">{sources.competencia.fuente}</p>
              </div>
              <a
                href={sources.competencia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-600 hover:underline"
              >
                overpass-api.de ↗
              </a>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-sm text-slate-600"><strong>Metodología:</strong> {sources.competencia.metodologia}</p>
              <p className="text-sm text-slate-500 mt-2"><strong>Datos obtenibles:</strong></p>
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

          {/* Inteligencia Competitiva */}
          <div className="border border-sky-200 bg-sky-50/40 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-sky-100 rounded-lg">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-800">{sources.inteligenciaCompetitiva.titulo}</h3>
                  <span className="text-xs bg-sky-500 text-white px-2 py-0.5 rounded-full font-medium">Nuevo</span>
                </div>
                <p className="text-sm text-slate-500">{sources.inteligenciaCompetitiva.fuente}</p>
              </div>
            </div>
            <div className="pl-12 space-y-3">
              <p className="text-sm text-slate-600"><strong>Metodología:</strong> {sources.inteligenciaCompetitiva.metodologia}</p>
              <div className="space-y-3 mt-2">
                {sources.inteligenciaCompetitiva.subcategorias.map((sub, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-sky-100 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-slate-700">📊 {sub.nombre}</p>
                      <span className="text-xs text-slate-400">Act.: {sub.actualizacion}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1"><em>Fuente:</em> {sub.fuente}</p>
                    <p className="text-sm text-slate-600">{sub.descripcion}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                <p className="text-xs text-amber-800">
                  <strong>⚠️ Google Maps Places API (opcional):</strong> Para obtener ratings actualizados y en tiempo real de los competidores, se requiere una clave de API de Google Maps Places. Sin ella, se usan los rangos curados de Abril 2026.
                </p>
              </div>
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
              <p className="text-sm text-slate-500 mt-2"><strong>Factores de cálculo (5 factores):</strong></p>
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
