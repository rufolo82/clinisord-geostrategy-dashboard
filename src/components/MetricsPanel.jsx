import React from 'react';
import { 
  Users, 
  Building2, 
  Target, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Calculator,
  Eye
} from 'lucide-react';

const MetricsPanel = ({ viabilityData, selectedLocation }) => {
  if (!selectedLocation || !viabilityData || viabilityData.isInvalid) {
    return null;
  }

  const { analysis } = viabilityData;
  const demographics = analysis?.demographics || {};
  const competition = analysis?.competition || {};
  const clinisord = analysis?.clinisord || {};
  
  // Calcular captación estimada
  const targetPop = demographics.targetPopulation || 0;
  const competitors = competition.totalCompetitors || 0;
  
  // Estimación de captación mensual
  const estimatedCaptures = Math.floor(targetPop * 0.30 * 0.40 * Math.max(0.05, 0.15 - competitors * 0.015));
  
  // Proyección anual (considerando ticket promedio de 2.500€)
  const annualProjection = estimatedCaptures * 2500;

  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Calculator size={20} className="text-primary-500" />
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Métricas Clave
        </h3>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Población Objetivo */}
        <MetricCard
          icon={<Users size={18} />}
          label="Pob. >65 años"
          value={targetPop.toLocaleString()}
          subvalue={`${demographics.elderlyPercentage}% del área`}
          color="blue"
        />
        
        {/* Total Competidores */}
        <MetricCard
          icon={<Building2 size={18} />}
          label="Competidores"
          value={competitors}
          subvalue={competition.saturationLevel || 'N/A'}
          color={competitors > 5 ? 'red' : competitors > 2 ? 'amber' : 'emerald'}
        />
        
        {/* Centro Clinisord más cercano */}
        <MetricCard
          icon={<MapPin size={18} />}
          label="Clinisord cercano"
          value={clinisord.nearestCenter || 'N/A'}
          subvalue={`${clinisord.distanceToNearest} km`}
          color="purple"
        />
        
        {/* Área de influencia */}
        <MetricCard
          icon={<Eye size={18} />}
          label="Área influencia"
          value={`${demographics.areaKm2 || '3.14'} km²`}
          subvalue="Radio 1km"
          color="cyan"
        />
      </div>

      {/* Estimación de captación */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target size={18} className="text-primary-600" />
          <h4 className="text-sm font-semibold text-primary-800">
            Estimación de Captación
          </h4>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/70 rounded-lg p-2">
            <p className="text-lg font-bold text-slate-700">
              {Math.floor(estimatedCaptures * 0.7)}
            </p>
            <p className="text-xs text-slate-500">Conservador</p>
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <p className="text-lg font-bold text-primary-600">
              {estimatedCaptures}
            </p>
            <p className="text-xs text-slate-500">Esperado</p>
          </div>
          <div className="bg-white/70 rounded-lg p-2">
            <p className="text-lg font-bold text-slate-700">
              {Math.floor(estimatedCaptures * 1.4)}
            </p>
            <p className="text-xs text-slate-500">Optimista</p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-primary-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary-700">Proyección anual estimada</span>
            <span className="text-lg font-bold text-primary-700">
              {annualProjection.toLocaleString()}€
            </span>
          </div>
        </div>
      </div>

      {/* Detalle de competidores */}
      {competition.totalCompetitors > 0 && (
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-slate-600" />
            <h4 className="text-sm font-semibold text-slate-700">
              Análisis de Competencia
            </h4>
          </div>
          
          <div className="space-y-2">
            <CompetitorRow 
              type="clínicas" 
              count={competition.clinics} 
              color="red"
              icon="⚕️"
            />
            <CompetitorRow 
              type="ópticas" 
              count={competition.optics} 
              color="amber"
              icon="👓"
            />
            <CompetitorRow 
              type="farmacias" 
              count={competition.pharmacies} 
              color="purple"
              icon="💊"
            />
          </div>
          
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Nivel de saturación: <span className="font-medium text-slate-700">{competition.saturationLevel}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de tarjeta de métrica
const MetricCard = ({ icon, label, value, subvalue, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    cyan: 'bg-cyan-50 text-cyan-600'
  };

  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <div className={`w-8 h-8 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400">{subvalue}</p>
    </div>
  );
};

// Componente de fila de competidor
const CompetitorRow = ({ type, count, color, icon }) => {
  const colorClasses = {
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-sm">{icon}</span>
        <span className="text-sm text-slate-600 capitalize">{type}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${colorClasses[color]} rounded-full`}
            style={{ width: `${Math.min(100, count * 20)}%` }}
          />
        </div>
        <span className="text-sm font-medium text-slate-700 w-6 text-right">{count}</span>
      </div>
    </div>
  );
};

export default MetricsPanel;
