import React from 'react';
import { X, Info, Calculator, Users, Building2, MapPin, TrendingUp } from 'lucide-react';

// Pesos del algoritmo (deben coincidir con utils/algorithm.js)
const ALGORITHM_WEIGHTS = {
  demographic: 0.40,
  competition: 0.30,
  cannibalization: 0.20,
  accessibility: 0.10
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
              <div className="text-2xl font-mono text-slate-700">
                Score = (Demografía × 40%) + (Competencia × 30%) + (Canibalización × 20%) + (Accesibilidad × 10%)
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
          </div>

          {/* Current Analysis Breakdown */}
          {viabilityData && (
            <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-200">
              <h4 className="text-sm font-semibold text-primary-800 mb-3 flex items-center gap-2">
                <Info size={16} />
                Desglose de tu análisis actual
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
