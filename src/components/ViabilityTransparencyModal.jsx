import React from 'react';
import { X, Info, Calculator, Users, Building2, MapPin, TrendingUp, Zap } from 'lucide-react';

// Pesos del algoritmo (deben coincidir con utils/algorithm.js)
const ALGORITHM_WEIGHTS = {
  demographic: 0.35,
  competition: 0.25,
  cannibalization: 0.15,
  accessibility: 0.10,
  strategic: 0.15
};

const ViabilityTransparencyModal = ({ isOpen, onClose, viabilityData }) => {
  if (!isOpen) return null;

  const formatWeight = (weight) => `${(weight * 100).toFixed(0)}%`;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 rounded-xl">
                <Calculator size={24} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Cómo se calcula la viabilidad
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Transparencia total en nuestro algoritmo de análisis
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Formula Overview */}
          <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <TrendingUp size={16} />
              Fórmula del Score de Viabilidad
            </h3>
            <div className="text-center py-4">
              <div className="text-lg font-mono text-slate-700 leading-relaxed">
                Score = (Demografía × 35%) + (Competencia × 25%) + (Canibalización × 15%) + (Accesibilidad × 10%) + (Oportunidad Estratégica × 15%)
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              El score final va de 0 a 100. Mayor puntuación = mejor ubicación potencial.
            </p>
          </div>

          {/* Breakdown Factors */}
          <div className="space-y-4">
            {/* Demographics */}
            <div className="p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-blue-500" />
                  <h4 className="font-semibold text-slate-700">Demografía</h4>
                </div>
                <span className="text-sm font-bold text-blue-600">{formatWeight(ALGORITHM_WEIGHTS.demographic)}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Analizamos la población objetivo (&gt;65 años) en un radio de 1km:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4 list-disc">
                <li>Población total objetivo (mayor peso)</li>
                <li>Porcentaje de mayores de 65 años</li>
                <li>Densidad urbana del área</li>
              </ul>
            </div>

            {/* Competition */}
            <div className="p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-red-500" />
                  <h4 className="font-semibold text-slate-700">Competencia</h4>
                </div>
                <span className="text-sm font-bold text-red-600">{formatWeight(ALGORITHM_WEIGHTS.competition)}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Evaluamos la saturación del mercado local:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4 list-disc">
                <li>Número de competidores en el área (a menos, mejor)</li>
                <li>Nivel de saturación (Bajo/Medio/Alto)</li>
                <li>Índice de competencia específico de la zona</li>
              </ul>
            </div>

            {/* Cannibalization */}
            <div className="p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-amber-500" />
                  <h4 className="font-semibold text-slate-700">Canibalización</h4>
                </div>
                <span className="text-sm font-bold text-amber-600">{formatWeight(ALGORITHM_WEIGHTS.cannibalization)}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Riesgo de afectar a tus propios centros Clinisord:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4 list-disc">
                <li>Distancia al centro Clinisord más cercano</li>
                <li>Nivel de riesgo de canibalización (Bajo/Medio/Alto)</li>
              </ul>
            </div>

            {/* Accessibility */}
            <div className="p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-green-500" />
                  <h4 className="font-semibold text-slate-700">Accesibilidad</h4>
                </div>
                <span className="text-sm font-bold text-green-600">{formatWeight(ALGORITHM_WEIGHTS.accessibility)}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Facilidad de acceso a la ubicación:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4 list-disc">
                <li>Proximidad a transporte público</li>
                <li>Facilidad de aparcar</li>
                <li>Visibilidad y acceso peatonal</li>
              </ul>
            </div>

            {/* Strategic Opportunity */}
            <div className="p-4 border border-indigo-200 rounded-xl bg-indigo-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-indigo-500" />
                  <h4 className="font-semibold text-slate-700">Oportunidad Estratégica</h4>
                </div>
                <span className="text-sm font-bold text-indigo-600">{formatWeight(ALGORITHM_WEIGHTS.strategic)}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Oportunidades detectadas de capturar cuota a la competencia local:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4 list-disc">
                <li>Competidores con baja valoración Google Maps en la zona</li>
                <li>Vacíos de servicio (teleaudiología, orientación social)</li>
                <li>Mercado atomizado en independientes (sin marca ni continuidad)</li>
                <li>Zonas sin competencia directa en radio de 3km</li>
              </ul>
            </div>
          </div>

          {/* New Section: Data Sources & Methodology */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Info size={16} className="text-primary-500" />
              Fuentes de Datos y Metodología
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-slate-700 uppercase mb-2">📍 Competencia (OSM + Curación)</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Los datos de ubicación provienen de <strong>OpenStreetMap (Overpass API)</strong>, filtrados y verificados mediante un motor de inteligencia que descarta centros no audiológicos. Los perfiles de cadenas se actualizan trimestralmente (Última: Abril 2026).
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-700 uppercase mb-2">📊 Demografía (INE + Modelos)</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Basado en el <strong>Censo 2024 del INE</strong>. Las proyecciones de población mayor de 65 años se calculan por sección censal y código postal, aplicando modelos de densidad urbana.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-slate-700 uppercase mb-2">⚖️ Lógica de Comparativa</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <strong>¿Cómo detectamos si Clinisord gana?</strong><br/>
                    El sistema compara cada servicio y precio. Clinisord se marca como ventaja ("gana") cuando:
                  </p>
                  <ul className="text-[10px] text-slate-500 mt-1 space-y-1 ml-3 list-disc">
                    <li><strong>Precio:</strong> El ticket medio de Clinisord es inferior al del competidor en esa gama.</li>
                    <li><strong>Servicio:</strong> Clinisord ofrece servicios exclusivos (Teleaudiología, Rehabilitación, Orientación Social) que el competidor no tiene disponibles.</li>
                    <li><strong>Valoración:</strong> El rating de Clinisord es superior al promedio local de la cadena.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Current Analysis Breakdown */}
          {viabilityData && (
            <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-200">
              <h4 className="text-sm font-semibold text-primary-800 mb-3 flex items-center gap-2">
                <Calculator size={16} />
                Desglose de tu análisis actual
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{viabilityData.breakdown?.demographic || 0}</div>
                  <div className="text-xs text-slate-500">Demografía</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{viabilityData.breakdown?.competition || 0}</div>
                  <div className="text-xs text-slate-500">Competencia</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{viabilityData.breakdown?.cannibalization || 0}</div>
                  <div className="text-xs text-slate-500">Canibalización</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{viabilityData.breakdown?.accessibility || 0}</div>
                  <div className="text-xs text-slate-500">Accesibilidad</div>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="text-2xl font-bold text-indigo-600">{viabilityData.breakdown?.strategic || 0}</div>
                  <div className="text-xs text-indigo-500 font-medium">Oport. Estrat.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViabilityTransparencyModal;
