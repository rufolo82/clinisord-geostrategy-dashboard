import React, { useState, useMemo } from 'react';
import { BarChart2, ShieldAlert, Target, DollarSign, TrendingUp, ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertCircle, Zap, Star, ArrowRight, Info } from 'lucide-react';
import { getAllCompetitorProfiles, CLINISORD_PROFILE, generateServiceComparison, calculateMarketShare, identifyVulnerableCompetitors, getDAFOAnalysis } from '../utils/competitorIntelligence';
import { getCompetitorsInArea } from '../utils/competitorData';

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
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={strokeW}
              strokeDasharray={`${s.dash} ${circumference - s.dash}`} strokeDashoffset={s.offset}
              className="transition-all duration-500" />
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

function CuotaPanel({ selectedLocation }) {
  const competitors = useMemo(() => {
    if (!selectedLocation) return [];
    return getCompetitorsInArea(selectedLocation.lat, selectedLocation.lng, 5);
  }, [selectedLocation]);
  const marketShare = useMemo(() => calculateMarketShare(competitors), [competitors]);
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
        {marketShare.length > 0 ? <DonutChart data={marketShare} /> : <p className="text-sm text-slate-500 text-center py-4">Sin competidores en el área</p>}
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
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ranking competidores en zona</h4>
        {marketShare.map((d, i) => (
          <div key={d.chainId} className={`flex items-center gap-3 p-3 rounded-lg border ${d.chainId === 'clinisord' ? 'bg-sky-50 border-sky-200' : 'bg-white border-slate-100'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{d.nombre}</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                <div className="h-1.5 rounded-full" style={{ width: `${d.cuota}%`, backgroundColor: d.color }} />
              </div>
            </div>
            <span className="text-sm font-bold text-slate-800">{d.cuota}%</span>
            <span className="text-xs text-slate-500">{d.centros} ctr.</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FichasPanel() {
  const profiles = getAllCompetitorProfiles();
  const [expandedId, setExpandedId] = useState(null);
  const SERVICIOS_MOSTRADOS = [
    { key: 'audiometria', label: 'Audiometría' },
    { key: 'teleaudiologia', label: 'Teleaudiología' },
    { key: 'rehabilitacionAuditiva', label: 'Rehabilitación' },
    { key: 'servicioSocial', label: 'Servicio social' },
    { key: 'financiacion', label: 'Financiación' },
  ];
  return (
    <div className="p-4 space-y-3">
      {profiles.map(profile => {
        const expanded = expandedId === profile.id;
        const dafo = getDAFOAnalysis(profile.id);
        return (
          <div key={profile.id} className="border border-slate-200 rounded-xl overflow-hidden">
            <button onClick={() => setExpandedId(expanded ? null : profile.id)} className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors text-left">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: profile.color }}>
                {profile.nombre.charAt(0)}
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
            {expanded && (
              <div className="border-t border-slate-100 bg-slate-50">
                <div className="p-3 border-b border-slate-100">
                  <p className="text-xs text-slate-600">{profile.descripcion}</p>
                </div>
                <div className="p-3 border-b border-slate-100">
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
                              {compService?.disponible ? <CheckCircle2 size={13} className="text-emerald-500" /> : <XCircle size={13} className="text-slate-300" />}
                            </div>
                            {clinWins && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1 rounded">✅ Clinisord gana</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="p-3 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Precios audífonos</p>
                  {[{ label: 'Básica', data: profile.precios?.audifonos?.gama_basica }, { label: 'Media', data: profile.precios?.audifonos?.gama_media }, { label: 'Alta', data: profile.precios?.audifonos?.gama_alta }].map(({ label, data }) => data?.min != null && (
                    <div key={label} className="flex justify-between items-center py-1">
                      <span className="text-xs text-slate-500">Gama {label}</span>
                      <span className="text-xs font-medium text-slate-700">{data.display}</span>
                    </div>
                  ))}
                </div>
                {dafo && dafo.oportunidades.length > 0 && (
                  <div className="p-3">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-1"><Target size={10} /> Oportunidades para Clinisord</p>
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
          </div>
        );
      })}
    </div>
  );
}

function VulnerabilidadesPanel({ selectedLocation }) {
  const competitors = useMemo(() => {
    if (!selectedLocation) return [];
    return getCompetitorsInArea(selectedLocation.lat, selectedLocation.lng, 3);
  }, [selectedLocation]);
  const vulnerable = useMemo(() => identifyVulnerableCompetitors(competitors), [competitors]);
  const allOportunidades = useMemo(() => {
    const ops = [];
    vulnerable.forEach(comp => {
      (comp.vulnerabilidades || []).forEach(v => {
        ops.push({ tipo: 'competidor_debil', competidor: comp.nombre || comp.cadena, distancia: comp.distancia, rating: comp.rating, titulo: v.titulo, descripcion: v.descripcion, accion: v.oportunidadClinosord });
      });
    });
    if (competitors.length > 0 && competitors.every(c => { const p = { gaes: true, audical: true }[c.cadena]; return !p; })) {
      ops.push({ tipo: 'vacio_servicio', competidor: null, titulo: 'Vacío: Teleaudiología', descripcion: 'Ningún competidor en la zona ofrece seguimiento remoto.', accion: 'Clinisord puede ser el único proveedor de teleaudiología en este área.' });
    }
    if (competitors.length === 0) {
      ops.push({ tipo: 'sin_competencia', competidor: null, titulo: '🚀 Sin competencia directa', descripcion: 'No hay centros auditivos en radio de 3km.', accion: 'Oportunidad de ser el primer operador. Inicio rápido de captación.' });
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
      {allOportunidades.length === 0 ? (
        <div className="text-center py-6 text-slate-400">
          <AlertCircle size={24} className="mx-auto mb-2" />
          <p className="text-sm">No se detectaron vulnerabilidades explotables en esta zona</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allOportunidades.map((op, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className={`px-3 py-2 flex items-center gap-2 ${op.tipo === 'sin_competencia' ? 'bg-purple-50 border-b border-purple-100' : op.tipo === 'vacio_servicio' ? 'bg-blue-50 border-b border-blue-100' : 'bg-amber-50 border-b border-amber-100'}`}>
                {op.competidor && <span className="text-xs text-slate-500">{op.competidor}{op.distancia && ` · ${op.distancia}km`}{op.rating && ` · ⭐${op.rating}`}</span>}
                <span className={`text-xs font-semibold ml-auto px-2 py-0.5 rounded-full border ${TAG_COLORS[op.tipo] || TAG_COLORS.oportunidad}`}>{op.tipo.replace('_', ' ')}</span>
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

function PreciosPanel() {
  const { servicios, competidores, clinisord } = generateServiceComparison();
  const SHOWN_CHAINS = ['gaes', 'audical', 'afflelou_acoustics', 'specsavers', 'independiente'];
  const shown = competidores.filter(c => SHOWN_CHAINS.includes(c.id));
  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1"><DollarSign size={12} /> Precios de audífonos (por unidad)</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 text-left font-semibold text-slate-600">Gama</th>
                {shown.map(c => (
                  <th key={c.id} className="px-2 py-2 text-center font-semibold text-slate-600">
                    <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: c.color }} />
                    {c.nombre.split(' ')[0]}
                  </th>
                ))}
                <th className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50">CSA</th>
              </tr>
            </thead>
            <tbody>
              {[{ key: 'gama_basica', label: 'Básica' }, { key: 'gama_media', label: 'Media' }, { key: 'gama_alta', label: 'Alta' }].map(({ key, label }) => (
                <tr key={key} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2 font-medium text-slate-700">{label}</td>
                  {shown.map(c => (
                    <td key={c.id} className="px-2 py-2 text-center text-slate-600">
                      {c.precios?.audifonos?.[key]?.min != null ? c.precios.audifonos[key].display : <span className="text-slate-300">N/D</span>}
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50">{clinisord.precios?.audifonos?.[key]?.display}</td>
                </tr>
              ))}
              <tr className="bg-slate-50">
                <td className="px-3 py-2 font-medium text-slate-700">Audiometría</td>
                {shown.map(c => <td key={c.id} className="px-2 py-2 text-center text-emerald-600 font-medium">Gratis</td>)}
                <td className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50">Gratis</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><Info size={10} /> Precios estimados por unidad. Datos curados — Abril 2026.</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1"><CheckCircle2 size={12} /> Comparativa de servicios</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 text-left font-semibold text-slate-600">Servicio</th>
                {shown.map(c => <th key={c.id} className="px-2 py-2 text-center font-semibold text-slate-600"><div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: c.color }} /><span className="hidden sm:inline">{c.nombre.split(' ')[0]}</span></th>)}
                <th className="px-2 py-2 text-center font-bold text-sky-700 bg-sky-50">CSA</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map(({ key, label }) => (
                <tr key={key} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-700">{label}</td>
                  {shown.map(c => (
                    <td key={c.id} className="px-2 py-2 text-center">
                      {c.servicios?.[key]?.disponible ? <CheckCircle2 size={13} className="text-emerald-500 mx-auto" /> : <XCircle size={13} className="text-slate-200 mx-auto" />}
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center bg-sky-50">
                    {clinisord.servicios?.[key]?.disponible ? <CheckCircle2 size={13} className="text-emerald-500 mx-auto" /> : <XCircle size={13} className="text-slate-200 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 bg-sky-50 rounded-lg border border-sky-100">
          <p className="text-xs font-semibold text-sky-700 mb-1 flex items-center gap-1"><Star size={11} /> Ventajas exclusivas de Clinisord</p>
          <ul className="space-y-1">
            {CLINISORD_PROFILE.ventajasCompetitivas.map((v, i) => (
              <li key={i} className="text-xs text-sky-700 flex gap-1"><ArrowRight size={10} className="mt-0.5 flex-shrink-0" />{v}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const CompetitorIntelligencePanel = ({ selectedLocation }) => {
  const [activeSubTab, setActiveSubTab] = useState('cuota');
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BarChart2 size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Inteligencia Competitiva</h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">Análisis estratégico del mercado auditivo español</p>
        <div className="flex border-b border-slate-200 -mx-4 px-4 overflow-x-auto">
          {SUB_TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveSubTab(id)} className={`flex items-center gap-1 px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeSubTab === id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              <Icon size={12} />{label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeSubTab === 'cuota' && <CuotaPanel selectedLocation={selectedLocation} />}
        {activeSubTab === 'fichas' && <FichasPanel />}
        {activeSubTab === 'vulnerabilidades' && <VulnerabilidadesPanel selectedLocation={selectedLocation} />}
        {activeSubTab === 'precios' && <PreciosPanel />}
      </div>
    </div>
  );
};

export default CompetitorIntelligencePanel;
