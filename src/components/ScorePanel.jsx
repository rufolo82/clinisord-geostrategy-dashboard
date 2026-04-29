import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ScorePanel = ({ viabilityData, selectedLocation, isLoading }) => {
  // Determinar el gauge score y color
  const score = viabilityData?.score || 0;
  const category = viabilityData?.category || 'SIN DATOS';
  const recommendation = viabilityData?.recommendation || 'Selecciona una ubicación en el mapa para ver el análisis de viabilidad.';
  const color = viabilityData?.color || '#94a3b8';
  
  // Calcular posición del gauge (0-100)
  const gaugeValue = score;
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (gaugeValue / 100) * circumference;
  
  // Determinar icono de tendencia
  const getTrendIcon = () => {
    if (score >= 80) return <TrendingUp size={20} className="text-emerald-500" />;
    if (score >= 50) return <Minus size={20} className="text-amber-500" />;
    return <TrendingDown size={20} className="text-red-500" />;
  };
  
  // Obtener breakdown
  const breakdown = viabilityData?.breakdown || {
    demographic: 0,
    competition: 0,
    cannibalization: 0,
    accessibility: 0
  };

  if (!selectedLocation) {
    return (
      <div className="p-4">
        <div className="bg-slate-100 rounded-xl p-6 text-center">
          <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Activity size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Análisis de Viabilidad
          </h3>
          <p className="text-sm text-slate-500">
            Haz clic en el mapa o busca una ubicación para comenzar el análisis
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="bg-slate-100 rounded-xl p-6 text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-sm text-slate-600">Calculando viabilidad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={20} className="text-primary-500" />
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Score de Viabilidad
        </h3>
      </div>
      
      {/* Gauge Circular */}
      <div className="flex justify-center mb-6">
        <div className="gauge-container">
          <svg viewBox="0 0 160 160" className="transform -rotate-90">
            {/* Fondo del gauge */}
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />
            {/* Progreso del gauge */}
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="gauge-text" style={{ color: color }}>
            {score}
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-slate-500">
            / 100
          </div>
        </div>
      </div>
      
      {/* Categoría */}
      <div 
        className="text-center p-3 rounded-xl mb-4"
        style={{ backgroundColor: `${color}15` }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          {getTrendIcon()}
          <span className="font-bold text-sm" style={{ color: color }}>
            {category}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {recommendation}
        </p>
      </div>
      
      {/* Desglose de puntuación */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
          Desglose de Puntuación
        </h4>
        
        <ScoreItem 
          label="Demografía" 
          value={breakdown.demographic} 
          color="#0ea5e9" 
          weight={40}
        />
        <ScoreItem 
          label="Competencia" 
          value={breakdown.competition} 
          color="#f59e0b" 
          weight={30}
        />
        <ScoreItem 
          label="Canibalización" 
          value={breakdown.cannibalization} 
          color="#8b5cf6" 
          weight={20}
        />
        <ScoreItem 
          label="Accesibilidad" 
          value={breakdown.accessibility} 
          color="#10b981" 
          weight={10}
        />
      </div>
    </div>
  );
};

// Componente de ítem de puntuación
const ScoreItem = ({ label, value, color, weight }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 text-xs text-slate-500 font-medium">{value}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-600">{label}</span>
          <span className="text-xs text-slate-400">{weight}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${value}%`,
              backgroundColor: color 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScorePanel;
