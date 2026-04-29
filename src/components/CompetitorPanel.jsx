import React from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff, X, MapPin, Zap, Star } from 'lucide-react';
import { getLogoPath, getLogoAlt, needsPlaceholder } from '../utils/logoMapping';
import { COMPETITOR_PROFILES } from '../utils/competitorIntelligence';

const CompetitorPanel = ({ 
  chains, 
  chainVisibility, 
  toggleChain, 
  toggleAll, 
  isOpen, 
  setIsOpen,
  currentCity
}) => {
  const visibleCount = Object.values(chainVisibility).filter(v => v).length;
  
  const cityLabels = {
    madrid: 'Madrid y área metropolitana',
    barcelona: 'Barcelona y área metropolitana',
    valencia: 'Valencia y área metropolitana',
    sevilla: 'Sevilla y área metropolitana'
  };

  // Cadenas con vulnerabilidades conocidas
  const getVulnerabilityLevel = (chainId) => {
    const profile = COMPETITOR_PROFILES[chainId];
    if (!profile) return null;
    const rating = profile.ratings?.google?.promedio;
    if (rating < 3.9) return 'high';
    if (rating < 4.1) return 'medium';
    return null;
  };

  const vulnerableCount = chains.filter(c => getVulnerabilityLevel(c.id) !== null).length;
  
  // Don't render if panel is closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-4 z-[1000] glass-panel rounded-xl shadow-lg p-3 flex items-center gap-2 hover:bg-white/90 transition-all"
        title="Mostrar competencia"
      >
        <Eye size={18} className="text-primary-500" />
        <span className="text-sm font-medium text-slate-700">Competencia</span>
        <span className="text-xs text-slate-500">({visibleCount}/{chains.length})</span>
        {vulnerableCount > 0 && (
          <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-200">
            <Zap size={9} />
            {vulnerableCount} op.
          </span>
        )}
      </button>
    );
  }
  
  return (
    <div className="absolute top-4 left-4 z-[1000] glass-panel rounded-xl shadow-lg w-72 transition-all duration-300">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          <Eye size={18} className="text-primary-500" />
          Competencia
          {vulnerableCount > 0 && (
            <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-200">
              <Zap size={9} />
              {vulnerableCount} oport.
            </span>
          )}
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
          title="Ocultar panel"
        >
          <X size={16} className="text-slate-500" />
        </button>
      </div>

      {/* Ciudad Actual */}
      <div className="px-4 py-2 bg-primary-50 border-b border-primary-100">
        <div className="flex items-center gap-2 text-sm text-primary-700">
          <MapPin size={14} />
          <span className="font-medium">{cityLabels[currentCity] || currentCity}</span>
        </div>
      </div>

      {/* Toggle All Button */}
      <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <button
          onClick={toggleAll}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          {visibleCount === chains.length ? (
            <>
              <EyeOff size={14} />
              Ocultar todas
            </>
          ) : (
            <>
              <Eye size={14} />
              Mostrar todas
            </>
          )}
        </button>
        <span className="text-xs text-slate-500">{visibleCount}/{chains.length} activas</span>
      </div>

      {/* Chain List */}
      <div className="max-h-72 overflow-y-auto">
          {chains.map((chain) => {
            const logoPath = getLogoPath(chain.id);
            const logoAlt = getLogoAlt(chain.id);
            const usePlaceholder = needsPlaceholder(chain.id);
            const vulLevel = getVulnerabilityLevel(chain.id);
            const profile = COMPETITOR_PROFILES[chain.id];
            
            return (
              <div 
                key={chain.id}
                className={`px-4 py-2 border-b border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center justify-between ${
                  !chainVisibility[chain.id] ? 'opacity-50' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleChain(chain.id);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {logoPath ? (
                      <img
                        src={logoPath}
                        alt={logoAlt}
                        className="w-8 h-8 object-contain rounded"
                      />
                    ) : usePlaceholder ? (
                      <div 
                        className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: chain.color }}
                      >
                        {logoAlt.charAt(0)}
                      </div>
                    ) : (
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: chain.color }}
                      />
                    )}
                    {/* Indicador de vulnerabilidad */}
                    {vulLevel && (
                      <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white ${
                        vulLevel === 'high' ? 'bg-red-500 animate-pulse' : 'bg-amber-400'
                      }`} title="Competidor con oportunidad de captación" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-700 block">
                      {chain.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {chain.count} centros
                      </span>
                      {profile?.ratings?.google?.promedio && (
                        <span className="flex items-center gap-0.5 text-[10px] text-amber-600">
                          <Star size={9} className="fill-amber-400 text-amber-400" />
                          {profile.ratings.google.promedio}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  chainVisibility[chain.id] 
                    ? 'border-primary-500 bg-primary-500 text-white' 
                    : 'border-slate-300'
                }`}>
                  {chainVisibility[chain.id] && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Clínicas auditivas especializadas</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>Ópticas con departamento de audiología</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
              <span>Indicador de oportunidad de captación</span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CompetitorPanel;


