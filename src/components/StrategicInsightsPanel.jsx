import React, { useMemo, useState } from 'react';
import { Zap, ChevronDown, ChevronUp, Lightbulb, ArrowRight } from 'lucide-react';
import { generateStrategicRecommendations } from '../utils/competitorIntelligence';

const TIPO_STYLES = {
  oportunidad: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  diferenciacion: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-400' },
  competencia: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-400' },
  consolidacion: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400' },
  expansion: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-400' },
};

const StrategicInsightsPanel = ({ selectedLocation }) => {
  const [expanded, setExpanded] = useState(true);

  const recommendations = useMemo(() => {
    if (!selectedLocation) return [];
    return generateStrategicRecommendations(selectedLocation.lat, selectedLocation.lng, null);
  }, [selectedLocation]);

  if (!selectedLocation) return null;

  return (
    <div className="border-t border-slate-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-900 to-indigo-800 cursor-pointer w-full"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
            <Lightbulb size={13} className="text-amber-300" />
          </div>
          <span className="text-xs font-semibold text-white">Oportunidades estratégicas</span>
          {recommendations.length > 0 && (
            <span className="text-[10px] font-bold bg-amber-400 text-amber-900 px-1.5 py-0.5 rounded-full">
              {recommendations.length}
            </span>
          )}
        </div>
        {expanded
          ? <ChevronUp size={14} className="text-indigo-300" />
          : <ChevronDown size={14} className="text-indigo-300" />
        }
      </button>

      {expanded && (
        <div className="divide-y divide-slate-100">
          {recommendations.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-xs text-slate-500">No se detectaron oportunidades específicas en esta zona</p>
            </div>
          ) : (
            recommendations.map((rec, i) => {
              const s = TIPO_STYLES[rec.tipo] || TIPO_STYLES.oportunidad;
              return (
                <div key={i} className={`p-3 ${s.bg}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5 flex-shrink-0">{rec.icono}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 leading-snug mb-1">{rec.titulo}</p>
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">{rec.descripcion}</p>
                      <div className={`flex gap-1.5 items-start p-2 rounded-lg border ${s.border} bg-white`}>
                        <Zap size={11} className={`${s.text} mt-0.5 flex-shrink-0`} />
                        <p className={`text-xs font-medium ${s.text} leading-snug`}>{rec.accion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default StrategicInsightsPanel;
