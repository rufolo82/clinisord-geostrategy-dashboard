import React from 'react';
import { Layers, Eye, Users, Building2, Circle } from 'lucide-react';

const LayerControls = ({ layers, onToggle }) => {
  const layerConfigs = [
    {
      key: 'showHeatmap',
      icon: <Users size={18} />,
      label: 'Densidad >65 años',
      description: 'Muestra concentración de población mayor',
      color: 'text-blue-500'
    },
    {
      key: 'showCompetitors',
      icon: <Building2 size={18} />,
      label: 'Competencia',
      description: 'Clínicas, ópticas y farmacias cercanas',
      color: 'text-amber-500'
    },
    {
      key: 'showClinisord',
      icon: <Circle size={18} />,
      label: 'Centros Clinisord',
      description: 'Red de centros propios',
      color: 'text-emerald-500'
    },
    {
      key: 'showInfluenceArea',
      icon: <Eye size={18} />,
      label: 'Área de influencia',
      description: 'Radio de 1km desde el punto',
      color: 'text-cyan-500'
    }
  ];

  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={20} className="text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Capas de Datos
        </h3>
      </div>

      <div className="space-y-2">
        {layerConfigs.map((config) => (
          <LayerToggle
            key={config.key}
            config={config}
            isActive={layers[config.key]}
            onToggle={() => onToggle(config.key)}
          />
        ))}
      </div>
    </div>
  );
};

// Componente de interruptor de capa
const LayerToggle = ({ config, isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-primary-50 border border-primary-200' 
          : 'bg-slate-50 border border-transparent hover:bg-slate-100'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
        isActive ? 'bg-white shadow-sm' : 'bg-slate-200'
      }`}>
        <span className={isActive ? config.color : 'text-slate-400'}>
          {config.icon}
        </span>
      </div>
      
      <div className="flex-1 text-left">
        <p className={`text-sm font-medium transition-colors ${
          isActive ? 'text-slate-800' : 'text-slate-500'
        }`}>
          {config.label}
        </p>
        <p className="text-xs text-slate-400">
          {config.description}
        </p>
      </div>
      
      <div className={`w-12 h-6 rounded-full transition-colors ${
        isActive ? 'bg-primary-500' : 'bg-slate-300'
      }`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
          isActive ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </div>
    </button>
  );
};

export default LayerControls;
