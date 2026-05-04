import React, { useState, useMemo } from 'react';
import {
  BarChart2, ShieldAlert, Target, DollarSign, TrendingUp,
  ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertCircle,
  Zap, Users, Star, ArrowRight, Info, Briefcase, MessageSquare,
  ThumbsUp, ThumbsDown, Activity, Building2, Euro, Maximize2, Minimize2
} from 'lucide-react';
import {
  getAllCompetitorProfiles,
  CLINISORD_PROFILE,
  generateServiceComparison,
  calculateMarketShare,
  identifyVulnerableCompetitors,
  getDAFOAnalysis,
} from '../utils/competitorIntelligence';
import { getCompetitorsInArea, calculateDistance } from '../utils/competitorData';
import { clinisordLocations } from '../utils/spainData';
import ViabilityTransparencyModal from './ViabilityTransparencyModal';

// -------------------------------------------------------
// Utilidades visuales
// -------------------------------------------------------
const TAG_COLORS = {
  oportunidad: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  diferenciacion: 'bg-blue-100 text-blue-700 border-blue-200',
  competencia: 'bg-red-100 text-red-700 border-red-200',
  consolidacion: 'bg-amber-100 text-amber-700 border-amber-200',
  expansion: 'bg-purple-100 text-purple-700 border-purple-200',
};

const SUB_TABS = [
  { id: 'cuota', label: 'Cuota', icon: BarChart2 },
  { id: 'fichas', label: 'Fichas', icon: Target },
  { id: 'vulnerabilidades', label: 'Oportunidades', icon: ShieldAlert },
  { id: 'precios', label: 'Precios', icon: DollarSign },
];

// -------------------------------------------------------
// Mini donut chart (SVG puro)
// -------------------------------------------------------
function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.cuota, 0);
  let cumulative = 0;
  const r = 52, cx = 60, cy = 60, strokeW = 16;
  const circumference = 2 * Math.PI * r;

  const slices = data.map((d) => {
    const pct = d.cuota / (total || 1);
    const offset = circumference * (1 - cumulative);
    const dash = circumference * pct;
    cumulative += pct;
    return { ...d, dash, offset };
  });

  const clinisord = data.find(d => d.chainId === 'clinisord');

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-shrink-0">
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          {slices.map((s, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={strokeW}
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={s.offset}
              className="transition-all duration-500"
            />
          ))}
        </svg>
        {clinisord && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-sky-600">{clinisord.cuota}%</span>
            <span className="text-[9px] text-slate-500 font-medium">Clinisord</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        {data.slice(0, 6).map(d => (
          <div key={d.chainId} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-xs text-slate-600 truncate">{d.nombre}</span>
            <span className="text-xs font-semibold text-slate-800 ml-auto">{d.cuota}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Sub-panel: Cuota de Mercado
// -------------------------------------------------------
function CuotaPanel({ selectedLocation }) {
  const competitors = useMemo(() => {
    if (!selectedLocation) return [];
    return getCompetitorsInArea(selectedLocation.lat, selectedLocation.lng, 5);
  }, [selectedLocation]);

  const clinisordCount = useMemo(() => {
    if (!selectedLocation) return 1;
    const inArea = clinisordLocations.filter(c => calculateDistance(selectedLocation.lat, selectedLocation.lng, c.lat, c.lng) <= 10).length;
    return Math.max(1, inArea); // Siempre asumimos mínimo 1 para que aparezca Clinisord en la simulación
  }, [selectedLocation]);

  const marketShare = useMemo(() => calculateMarketShare(competitors, clinisordCount), [competitors, clinisordCount]);

  const capturable = useMemo(() => {
    if (competitors.length === 0) return 0;
    const clinisord = marketShare.find(d => d.chainId === 'clinisord');
    return clinisord ? Math.min(35, Math.round(clinisord.cuota * 1.8)) : 10;
  }, [marketShare, competitors]);

  if (!selectedLocation) {
    return (
      <div className="p-6 text-center">
        <BarChart2 size={32} className="text-slate-300 mx-auto mb-2" />
        <p className="text-sm text-slate-500">Selecciona una ubicación en el mapa para ver el análisis de cuota de mercado</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl p-4 border border-sky-100">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1">
          <BarChart2 size={12} /> Cuota estimada — Radio 5km
        </h4>
        {marketShare.length > 0 ? (
          <DonutChart data={marketShare} />
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">Sin competidores en el área</p>
        )}
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-600 font-medium">Potencial capturable estimado</p>
            <p className="text-2xl font-bold text-emerald-700">+{capturable}%</p>
            <p className="text-xs text-emerald-600 mt-1">de cuota de mercado adicional</p>
          </div>
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <TrendingUp size={24} className="text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ranking de competidores en zona</h4>
        {marketShare.map((d, i) => (
          <div key={d.chainId} className={`flex items-center gap-3 p-3 rounded-lg border ${d.chainId === 'clinisord' ? 'bg-sky-50 border-sky-200' : 'bg-white border-slate-100'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
              {i + 1}
            </span>
            <div className="flex-1 min-w-0 flex items-center gap-2">
              {d.logo && (
                <img src={d.logo} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{d.nombre}</p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                  <div className="h-1.5 rounded-full" style={{ width: `${d.cuota}%`, backgroundColor: d.color }} />
                </div>
              </div>
            </div>
            <span className="text-sm font-bold text-slate-800">{d.cuota}%</span>
            <span className="text-xs text-slate-500">{d.centros} centros</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Sub-panel: Fichas de Competidores
// -------------------------------------------------------
function FichasPanel() {
  const profiles = getAllCompetitorProfiles();
  const [expandedId, setExpandedId] = useState(null);
  const [fichaTab, setFichaTab] = useState('estrategia'); // estrategia | metricas | sentimiento

  const ServiceIcon = ({ available }) =>
    available
      ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
      : <XCircle size={14} className="text-slate-300 flex-shrink-0" />;

  const SERVICIOS_MOSTRADOS = [
    { key: 'audiometria', label: 'Audiometría' },
    { key: 'teleaudiologia', label: 'Teleaudiología' },
    { key: 'rehabilitacionAuditiva', label: 'Rehabilitación' },
    { key: 'servicioSocial', label: 'Servicio social' },
    { key: 'financiacion', label: 'Financiación' },
  ];

  const FICHA_TABS = [
    { id: 'estrategia', label: 'Modus Operandi', icon: Briefcase },
    { id: 'metricas', label: 'Métricas', icon: Activity },
    { id: 'sentimiento', label: 'Voz del Cliente', icon: MessageSquare },
  ];

  // Max values para barras relativas
  const maxPacientes = Math.max(...profiles.map(p => p.metricasNegocio?.ratioPacientesAnual || 0), 1);
  const maxFacturacion = Math.max(...profiles.map(p => {
    const f = p.metricasNegocio?.facturacionMedia;
    return f ? parseInt(f.replace(/[^0-9]/g, '')) : 0;
  }), 1);

  return (
    <div className="p-4 space-y-3">
      {profiles.map(profile => {
        const expanded = expandedId === profile.id;
        const dafo = getDAFOAnalysis(profile.id);
        const metricas = profile.metricasNegocio;
        const sentimiento = profile.analisisSentimiento;
        const facNum = metricas?.facturacionMedia ? parseInt(metricas.facturacionMedia.replace(/[^0-9]/g, '')) : 0;

        return (
          <div key={profile.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <button
              onClick={() => { setExpandedId(expanded ? null : profile.id); setFichaTab('estrategia'); }}
              className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 overflow-hidden flex-shrink-0 p-1">
                {profile.logo ? (
                  <img src={profile.logo} alt="" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white rounded" style={{ backgroundColor: profile.color }}>
                    {profile.nombre.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{profile.nombre}</p>
                <p className="text-xs text-slate-500">{profile.presenciaEspana} · {profile.cuotaMercadoEstimada}% cuota est.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                  <Star size={10} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-medium text-amber-700">{profile.ratings?.google?.promedio}</span>
                </div>
                {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </div>
            </button>

            {/* Expandido */}
            {expanded && (
              <div className="border-t border-slate-100 bg-slate-50">
                {/* Descripción */}
                <div className="p-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 size={12} className="text-slate-400" />
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{profile.tipo} · {profile.propietario || 'N/D'}</span>
                  </div>
                  <p className="text-xs text-slate-600">{profile.descripcion}</p>
                </div>

                {/* Sub-tabs de ficha */}
                <div className="flex border-b border-slate-200 bg-white">
                  {FICHA_TABS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setFichaTab(id)}
                      className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 text-[11px] font-medium border-b-2 transition-colors ${
                        fichaTab === id
                          ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50'
                          : 'border-transparent text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <Icon size={11} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* TAB: Estrategia / Modus Operandi */}
                {fichaTab === 'estrategia' && (
                  <div className="p-3 space-y-3">
                    {/* Estrategia operativa */}
                    {profile.estrategiaOperativa && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Briefcase size={10} /> Estrategia Comercial
                        </p>
                        <p className="text-xs text-amber-900 leading-relaxed">{profile.estrategiaOperativa}</p>
                      </div>
                    )}

                    {/* Servicios vs Clinisord */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Servicios vs Clinisord</p>
                      <div className="grid grid-cols-1 gap-1">
                        {SERVICIOS_MOSTRADOS.map(({ key, label }) => {
                          const compService = profile.servicios[key];
                          const clinService = CLINISORD_PROFILE.servicios[key];
                          const clinWins = clinService?.disponible && !compService?.disponible;
                          return (
                            <div key={key} className={`flex items-center justify-between px-2 py-1 rounded-lg ${clinWins ? 'bg-emerald-50' : 'bg-white'}`}>
                              <span className="text-xs text-slate-600">{label}</span>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <ServiceIcon available={compService?.disponible} />
                                  <span className="text-[10px] text-slate-500">{profile.nombre.split(' ')[0]}</span>
                                </div>
                                {clinWins && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1 rounded">✅ Clinisord gana</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Oportunidades para Clinisord */}
                    {dafo && dafo.oportunidades.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                          <Target size={10} /> Oportunidades para Clinisord
                        </p>
                        <div className="space-y-1">
                          {dafo.oportunidades.map((op, i) => (
                            <div key={i} className="flex gap-2 items-start bg-emerald-50 rounded-lg p-2">
                              <ArrowRight size={11} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-emerald-700">{op}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: Métricas de Negocio */}
                {fichaTab === 'metricas' && (
                  <div className="p-3 space-y-3">
                    {metricas ? (
                      <>
                        {/* KPI Cards */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-2.5 text-center">
                            <Users size={14} className="text-blue-500 mx-auto mb-1" />
                            <p className="text-lg font-bold text-blue-700">{metricas.ratioPacientesAnual}</p>
                            <p className="text-[9px] text-blue-500 font-medium">Pac./Año</p>
                          </div>
                          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-2.5 text-center">
                            <Euro size={14} className="text-emerald-500 mx-auto mb-1" />
                            <p className="text-sm font-bold text-emerald-700">{metricas.facturacionMedia}</p>
                            <p className="text-[9px] text-emerald-500 font-medium">Fact./Centro</p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200 rounded-lg p-2.5 text-center">
                            <DollarSign size={14} className="text-purple-500 mx-auto mb-1" />
                            <p className="text-sm font-bold text-purple-700">{metricas.ticketMedio}</p>
                            <p className="text-[9px] text-purple-500 font-medium">Ticket Medio</p>
                          </div>
                        </div>

                        {/* Barras comparativas */}
                        <div className="space-y-2">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Comparativa relativa</p>
                          <div>
                            <div className="flex justify-between text-[10px] mb-0.5">
                              <span className="text-slate-500">Volumen de pacientes</span>
                              <span className="font-medium text-slate-700">{metricas.ratioPacientesAnual} pac./año</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700"
                                style={{ width: `${(metricas.ratioPacientesAnual / maxPacientes) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] mb-0.5">
                              <span className="text-slate-500">Facturación estimada</span>
                              <span className="font-medium text-slate-700">{metricas.facturacionMedia}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700"
                                style={{ width: `${(facNum / maxFacturacion) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Precios rápidos */}
                        <div className="border-t border-slate-100 pt-2">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Precios audífonos</p>
                          {[
                            { label: 'Básica', data: profile.precios?.audifonos?.gama_basica },
                            { label: 'Media', data: profile.precios?.audifonos?.gama_media },
                            { label: 'Alta', data: profile.precios?.audifonos?.gama_alta },
                          ].map(({ label, data }) => data?.min != null && (
                            <div key={label} className="flex justify-between items-center py-1">
                              <span className="text-xs text-slate-500">Gama {label}</span>
                              <span className="text-xs font-medium text-slate-700">{data.display}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 text-slate-400">
                        <Activity size={24} className="mx-auto mb-2" />
                        <p className="text-sm">Métricas no disponibles para este perfil</p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: Voz del Cliente (Análisis de Sentimiento) */}
                {fichaTab === 'sentimiento' && (
                  <div className="p-3 space-y-3">
                    {sentimiento ? (
                      <>
                        {/* Quejas comunes */}
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-3">
                          <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <ThumbsDown size={10} /> Quejas frecuentes
                          </p>
                          <div className="space-y-1.5">
                            {sentimiento.quejasComunes.map((q, i) => (
                              <div key={i} className="flex gap-2 items-start">
                                <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">●</span>
                                <p className="text-xs text-red-800 leading-relaxed">"{q}"</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Elogios comunes */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                          <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <ThumbsUp size={10} /> Elogios frecuentes
                          </p>
                          <div className="space-y-1.5">
                            {sentimiento.elogiosComunes.map((e, i) => (
                              <div key={i} className="flex gap-2 items-start">
                                <span className="text-green-400 text-xs mt-0.5 flex-shrink-0">●</span>
                                <p className="text-xs text-green-800 leading-relaxed">"{e}"</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Insight para Clinisord */}
                        <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                          <p className="text-[10px] font-semibold text-sky-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Zap size={10} /> Insight para Clinisord
                          </p>
                          <p className="text-xs text-sky-800 leading-relaxed">
                            Las quejas de los pacientes de {profile.nombre.split(' ')[0]} revelan oportunidades directas de captación.
                            {sentimiento.quejasComunes[0] && ` La queja más común ("${sentimiento.quejasComunes[0].substring(0, 50)}...") puede ser contrarrestada por Clinisord.`}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 text-slate-400">
                        <MessageSquare size={24} className="mx-auto mb-2" />
                        <p className="text-sm">Análisis de sentimiento no disponible</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// -------------------------------------------------------
// Sub-panel: Vulnerabilidades / Oportunidades
// -------------------------------------------------------
function VulnerabilidadesPanel({ selectedLocation }) {
  const competitors = useMemo(() => {
    if (!selectedLocation) return [];
    return getCompetitorsInArea(selectedLocation.lat, selectedLocation.lng, 3);
  }, [selectedLocation]);

  const vulnerable = useMemo(() => identifyVulnerableCompetitors(competitors), [competitors]);

  // Consolidar todas las oportunidades
  const allOportunidades = useMemo(() => {
    const ops = [];
    // Por competidores vulnerables
    vulnerable.forEach(comp => {
      (comp.vulnerabilidades || []).forEach(v => {
        ops.push({
          tipo: 'competidor_debil',
          competidor: comp.nombre || comp.cadena,
          distancia: comp.distancia,
          rating: comp.rating,
          titulo: v.titulo,
          descripcion: v.descripcion,
          accion: v.oportunidadClinosord,
        });
      });
    });
    // Por vacíos de servicio
    const sinTeleau = competitors.every(c => {
      const p = { gaes: true, audical: true, afflelou_acoustics: true, specsavers: true, el_corte_ingles: true }[c.cadena];
      return !p;
    });
    if (competitors.length > 0 && sinTeleau) {
      ops.push({
        tipo: 'vacio_servicio',
        competidor: null,
        titulo: 'Vacío: Teleaudiología',
        descripcion: 'Ningún competidor en la zona ofrece seguimiento remoto.',
        accion: 'Clinisord puede ser el único proveedor de teleaudiología en este área. Alta diferenciación.',
      });
    }
    if (competitors.length === 0) {
      ops.push({
        tipo: 'sin_competencia',
        competidor: null,
        titulo: '🚀 Sin competencia directa',
        descripcion: 'No hay centros auditivos en radio de 3km.',
        accion: 'Oportunidad de ser el primer operador. Inicio rápido de captación.',
      });
    }
    return ops;
  }, [vulnerable, competitors]);

  if (!selectedLocation) {
    return (
      <div className="p-6 text-center">
        <ShieldAlert size={32} className="text-slate-300 mx-auto mb-2" />
        <p className="text-sm text-slate-500">Selecciona una ubicación para ver las oportunidades estratégicas</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Resumen */}
      <div className={`rounded-xl p-4 border ${allOportunidades.length > 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${allOportunidades.length > 0 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
            <Target size={20} className={allOportunidades.length > 0 ? 'text-emerald-600' : 'text-slate-400'} />
          </div>
          <div>
            <p className="font-semibold text-slate-800">{allOportunidades.length} oportunidades detectadas</p>
            <p className="text-xs text-slate-500">En radio de 3km · {competitors.length} competidores analizados</p>
          </div>
        </div>
      </div>

      {/* Lista de oportunidades */}
      {allOportunidades.length === 0 ? (
        <div className="text-center py-6 text-slate-400">
          <AlertCircle size={24} className="mx-auto mb-2" />
          <p className="text-sm">No se detectaron vulnerabilidades explotables en esta zona</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allOportunidades.map((op, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className={`px-3 py-2 flex items-center gap-2 ${
                op.tipo === 'sin_competencia' ? 'bg-purple-50 border-b border-purple-100' :
                op.tipo === 'vacio_servicio' ? 'bg-blue-50 border-b border-blue-100' :
                'bg-amber-50 border-b border-amber-100'
              }`}>
                {op.competidor && (
                  <span className="text-xs text-slate-500">
                    {op.competidor}
                    {op.distancia && ` · ${op.distancia}km`}
                    {op.rating && ` · ⭐${op.rating}`}
                  </span>
                )}
                <span className={`text-xs font-semibold ml-auto px-2 py-0.5 rounded-full border ${TAG_COLORS[op.tipo] || TAG_COLORS.oportunidad}`}>
                  {op.tipo.replace('_', ' ')}
                </span>
              </div>
              <div className="p-3 space-y-2">
                <p className="text-sm font-semibold text-slate-800">{op.titulo}</p>
                <p className="text-xs text-slate-600">{op.descripcion}</p>
                <div className="flex gap-2 items-start bg-sky-50 rounded-lg p-2">
                  <Zap size={12} className="text-sky-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-sky-700 font-medium">{op.accion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------
// Sub-panel: Comparativa de Precios y Servicios
// -------------------------------------------------------
function PreciosPanel() {
  const { servicios, competidores, clinisord } = generateServiceComparison();

  const SHOWN_CHAINS = ['gaes', 'aural', 'audika', 'audifon', 'audical', 'afflelou_acoustics', 'specsavers', 'independiente'];
  const shown = competidores.filter(c => SHOWN_CHAINS.includes(c.id));

  const ServiceCell = ({ service, isClinosord = false }) => {
    if (!service) return <td className="px-2 py-2 text-center text-xs text-slate-300">—</td>;
    return (
      <td className={`px-2 py-2 text-center ${isClinosord ? 'bg-sky-50' : ''}`}>
        {service.disponible
          ? <span className="flex items-center justify-center gap-1">
              <CheckCircle2 size={13} className="text-emerald-500" />
              {service.precio && <span className="text-[10px] text-emerald-600 hidden lg:inline">{service.precio}</span>}
            </span>
          : <XCircle size={13} className="text-slate-200 mx-auto" />
        }
      </td>
    );
  };

  return (
    <div className="p-4">
      {/* Tabla de precios */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1">
          <DollarSign size={12} /> Precios de audífonos (por unidad)
        </h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 text-left font-semibold text-slate-600 whitespace-nowrap">Gama</th>
                {shown.map(c => (
                  <th key={c.id} className="px-2 py-2 text-center font-semibold text-slate-600 whitespace-nowrap">
                    {c.logo ? (
                      <img src={c.logo} alt={c.nombre} className="h-6 w-auto mx-auto mb-1 object-contain mix-blend-multiply" />
                    ) : (
                      <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: c.color }} />
                    )}
                    {c.nombre.split(' ')[0]}
                  </th>
                ))}
                <th className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50 whitespace-nowrap">
                  <img src={clinisord.logo} alt="Clinisord" className="h-6 w-auto mx-auto mb-1 object-contain" />
                  Clinisord
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'gama_basica', label: 'Básica' },
                { key: 'gama_media', label: 'Media' },
                { key: 'gama_alta', label: 'Alta' },
              ].map(({ key, label }) => (
                <tr key={key} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2 font-medium text-slate-700 whitespace-nowrap">{label}</td>
                  {shown.map(c => (
                    <td key={c.id} className="px-2 py-2 text-center text-slate-600">
                      {c.precios?.audifonos?.[key]?.min != null
                        ? <span className={`${ (c.precios.audifonos[key].min || 9999) > (clinisord.precios.audifonos[key]?.min || 0) ? 'text-slate-500' : 'text-red-500' }`}>
                            {c.precios.audifonos[key].display}
                          </span>
                        : <span className="text-slate-300">N/D</span>
                      }
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50 whitespace-nowrap">
                    {clinisord.precios?.audifonos?.[key]?.display}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50">
                <td className="px-3 py-2 font-medium text-slate-700">Audiometría</td>
                {shown.map(c => (
                  <td key={c.id} className="px-2 py-2 text-center text-emerald-600 font-medium">
                    {c.precios?.audiometria?.display || 'Gratis'}
                  </td>
                ))}
                <td className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50">Gratis</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
          <Info size={10} /> Precios estimados por unidad. Datos curados — Abril 2026.
        </p>
      </div>

      {/* Tabla de servicios */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1">
          <CheckCircle2 size={12} /> Comparativa de servicios
        </h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 text-left font-semibold text-slate-600">Servicio</th>
                {shown.map(c => (
                  <th key={c.id} className="px-2 py-2 text-center font-semibold text-slate-600">
                    <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: c.color }} />
                    <span className="hidden sm:inline">{c.nombre.split(' ')[0]}</span>
                  </th>
                ))}
                <th className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50">CSA</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map(({ key, label }) => (
                <tr key={key} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-700 whitespace-nowrap">{label}</td>
                  {shown.map(c => (
                    <ServiceCell key={c.id} service={c.servicios?.[key]} />
                  ))}
                  <ServiceCell service={clinisord.servicios?.[key]} isClinosord />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 bg-sky-50 rounded-lg border border-sky-100">
          <p className="text-xs font-semibold text-sky-700 mb-1 flex items-center gap-1">
            <Star size={11} /> Ventajas exclusivas de Clinisord
          </p>
          <ul className="space-y-1">
            {CLINISORD_PROFILE.ventajasCompetitivas.map((v, i) => (
              <li key={i} className="text-xs text-sky-700 flex gap-1">
                <ArrowRight size={10} className="mt-0.5 flex-shrink-0" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Panel Principal
// -------------------------------------------------------
const CompetitorIntelligencePanel = ({ selectedLocation }) => {
  const [activeSubTab, setActiveSubTab] = useState('cuota');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const content = (
    <>
      {/* Header */}
      <div className="px-4 pt-4 pb-0 flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BarChart2 size={14} className="text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Inteligencia Competitiva</h3>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMethodologyOpen(true)}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors uppercase tracking-wider"
            >
              <Info size={10} />
              Metodología
            </button>
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              title={isFullScreen ? "Salir de pantalla completa" : "Pantalla completa"}
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-3">Análisis estratégico del mercado auditivo español</p>

        {/* Sub-tabs */}
        <div className="flex border-b border-slate-200 -mx-4 px-4 overflow-x-auto">
          {SUB_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSubTab(id)}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeSubTab === id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${isFullScreen ? 'bg-slate-50 p-4 md:p-8 rounded-b-xl' : ''}`}>
        <div className={isFullScreen ? "max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200" : ""}>
          {activeSubTab === 'cuota' && <CuotaPanel selectedLocation={selectedLocation} />}
          {activeSubTab === 'fichas' && <FichasPanel />}
          {activeSubTab === 'vulnerabilidades' && <VulnerabilidadesPanel selectedLocation={selectedLocation} />}
          {activeSubTab === 'precios' && <PreciosPanel />}
        </div>
      </div>
      {/* Modal de Metodología */}
      <ViabilityTransparencyModal 
        isOpen={isMethodologyOpen} 
        onClose={() => setIsMethodologyOpen(false)} 
      />
    </>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
        <div className="bg-white w-full h-full max-w-6xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {content}
    </div>
  );
};

export default CompetitorIntelligencePanel;
