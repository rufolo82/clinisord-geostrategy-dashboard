import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, CheckCircle, Loader, AlertCircle, ChevronDown, BarChart2, TrendingUp } from 'lucide-react';
import jsPDF from 'jspdf';
import { generateViabilityReport } from '../utils/algorithm';
import {
  generateStrategicRecommendations,
  calculateMarketShare,
  getStealableMarketShare,
  generateServiceComparison,
  COMPETITOR_PROFILES,
  CLINISORD_PROFILE,
} from '../utils/competitorIntelligence';
import { getCompetitorsInArea } from '../utils/competitorData';

const ExportButton = ({ viabilityData, selectedLocation, disabled }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null); // null, 'success', 'error'
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ----------------------------------------------------------------
  // INFORME DE VIABILIDAD (existente)
  // ----------------------------------------------------------------
  const exportViabilityReport = async () => {
    setShowDropdown(false);
    if (!selectedLocation || !viabilityData || disabled) return;
    setIsExporting(true);
    setExportStatus(null);

    try {
      const report = generateViabilityReport(
        selectedLocation.lat,
        selectedLocation.lng,
        selectedLocation.name
      );

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = 20;

      // Header
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20); doc.setFont('helvetica', 'bold');
      doc.text('Clinisord GeoStrategy', margin, 25);
      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.text('Informe de Viabilidad de Ubicación', margin, 33);
      yPos = 55;

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('Información de Ubicación', margin, yPos); yPos += 10;
      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.text("Ubicación: " + report.location.name, margin, yPos); yPos += 7;
      doc.text("Coordenadas: " + report.location.coordinates.lat + ", " + report.location.coordinates.lng, margin, yPos); yPos += 7;
      doc.text("Fecha: " + new Date(report.generatedAt).toLocaleDateString('es-ES'), margin, yPos); yPos += 15;

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('Score de Viabilidad', margin, yPos); yPos += 10;
      const scoreColor = viabilityData.score >= 60 ? [16, 185, 129] : viabilityData.score >= 40 ? [245, 158, 11] : [239, 68, 68];
      doc.setFillColor(...scoreColor);
      doc.roundedRect(margin, yPos, 60, 25, 3, 3, 'F');
      doc.setTextColor(255, 255, 255); doc.setFontSize(22); doc.setFont('helvetica', 'bold');
      doc.text("" + report.viability.score, margin + 15, yPos + 17);
      doc.setTextColor(30, 41, 59); doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.text("Categoría: " + report.viability.category, margin + 70, yPos + 10);
      const recText = doc.splitTextToSize(report.viability.recommendation, pageWidth - margin - 70 - 10);
      doc.text(recText[0] || '', margin + 70, yPos + 17);
      yPos += 40;

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('Datos Demográficos', margin, yPos); yPos += 10;
      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.text("Población total: " + report.demographics.population.toLocaleString(), margin, yPos); yPos += 7;
      doc.text("Población >65 años: " + report.demographics.targetPopulation.toLocaleString() + " (" + report.demographics.elderlyPercentage + "%)", margin, yPos); yPos += 15;

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('Competencia en el Área', margin, yPos); yPos += 10;
      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.text("Competidores totales: " + report.competition.totalCompetitors + "  |  Saturación: " + report.competition.saturation, margin, yPos); yPos += 15;

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('Proyección de Captación', margin, yPos); yPos += 10;
      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.text("Captación mensual estimada: " + report.captures.monthlyExpected + " pacientes", margin, yPos); yPos += 7;
      doc.text("Proyección anual de ingresos: " + parseInt(report.captures.annualProjection).toLocaleString() + "€", margin, yPos); yPos += 15;

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('Red Clinisord', margin, yPos); yPos += 10;
      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.text("Centro más cercano: " + report.clinisord.nearestCenter + "  (" + report.clinisord.distance + " km)", margin, yPos);

      doc.setFontSize(9); doc.setTextColor(148, 163, 184);
      doc.text('Generado por Clinisord GeoStrategy Dashboard — Orientativo. Verificar in situ.', margin, 285);

      const fileName = "clinisord-viability-" + report.location.name.replace(/\s+/g, '-').toLowerCase() + "-" + new Date().toISOString().split('T')[0] + ".pdf";
      doc.save(fileName);
      setExportStatus('success');
    } catch (err) {
      console.error('Error exportando PDF viabilidad:', err);
      setExportStatus('error');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  // ----------------------------------------------------------------
  // INFORME COMPETITIVO (nuevo)
  // ----------------------------------------------------------------
  const exportCompetitiveReport = async () => {
    setShowDropdown(false);
    if (!selectedLocation || disabled) return;
    setIsExporting(true);
    setExportStatus(null);

    try {
      const { lat, lng, name } = selectedLocation;
      const competitors = getCompetitorsInArea(lat, lng, 5);
      const marketShare = calculateMarketShare(competitors);
      const stealable = getStealableMarketShare(lat, lng, 3);
      const recommendations = generateStrategicRecommendations(lat, lng, viabilityData || {});
      const today = new Date().toLocaleDateString('es-ES');

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let y = 20;

      // ---- PORTADA ----
      doc.setFillColor(14, 165, 233); // sky-500
      doc.rect(0, 0, pageWidth, 50, 'F');
      doc.setFillColor(2, 132, 199);
      doc.rect(0, 38, pageWidth, 12, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22); doc.setFont('helvetica', 'bold');
      doc.text('Informe de Inteligencia Competitiva', margin, 22);
      doc.setFontSize(12); doc.setFont('helvetica', 'normal');
      doc.text("Clinisord GeoStrategy  ·  " + name + "  ·  " + today, margin, 33);

      y = 65;
      doc.setTextColor(30, 41, 59);

      // ---- CUOTA DE MERCADO (radio 5km) ----
      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('1. Cuota de Mercado Estimada (radio 5 km)', margin, y); y += 3;
      doc.setDrawColor(14, 165, 233); doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y); y += 8;

      doc.setFontSize(10); doc.setFont('helvetica', 'normal');
      doc.text("Competidores analizados: " + competitors.length + "   |   Cuota capturable estimada: " + stealable.porcentaje + "%", margin, y); y += 10;

      if (marketShare.length > 0) {
        const barMaxW = pageWidth - margin * 2 - 60;
        const maxCuota = Math.max(...marketShare.map(m => m.cuota), 1);
        marketShare.slice(0, 8).forEach(entry => {
          const barW = Math.max(2, (entry.cuota / maxCuota) * barMaxW);
          const isClinisord = entry.chainId === 'clinisord';
          // color bar
          if (isClinisord) doc.setFillColor(14, 165, 233);
          else doc.setFillColor(100, 116, 139);
          doc.roundedRect(margin + 55, y - 5, barW, 7, 1, 1, 'F');
          doc.setFontSize(9);
          doc.setFont('helvetica', isClinisord ? 'bold' : 'normal');
          doc.setTextColor(isClinisord ? 14 : 71, isClinisord ? 165 : 85, isClinisord ? 233 : 105);
          doc.text("" + entry.nombre.substring(0, 16), margin, y);
          doc.setTextColor(30, 41, 59);
          doc.text("" + entry.cuota + "%", margin + 57 + barW + 2, y);
          y += 10;
        });
      }
      y += 5;

      // ---- OPORTUNIDADES ESTRATÉGICAS ----
      if (y > 240) { doc.addPage(); y = 25; }
      doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(30, 41, 59);
      doc.text('2. Oportunidades Estratégicas Detectadas', margin, y); y += 3;
      doc.setDrawColor(14, 165, 233); doc.line(margin, y, pageWidth - margin, y); y += 8;

      if (recommendations.length === 0) {
        doc.setFontSize(10); doc.setFont('helvetica', 'normal');
        doc.text('No hay recomendaciones específicas para esta ubicación.', margin, y); y += 10;
      } else {
        recommendations.slice(0, 5).forEach((rec, i) => {
          if (y > 255) { doc.addPage(); y = 25; }
          doc.setFontSize(11); doc.setFont('helvetica', 'bold');
          doc.setTextColor(14, 165, 233);
          doc.text((rec.icono || '•') + " " + rec.titulo, margin, y); y += 6;
          doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(71, 85, 105);
          const descLines = doc.splitTextToSize(rec.descripcion, pageWidth - margin * 2 - 5);
          doc.text(descLines, margin + 3, y); y += descLines.length * 5 + 2;
          doc.setTextColor(22, 163, 74);
          const accionLines = doc.splitTextToSize("→ " + rec.accion, pageWidth - margin * 2 - 5);
          doc.text(accionLines, margin + 3, y); y += accionLines.length * 5 + 5;
        });
      }

      // ---- PERFILES DE COMPETIDORES (top 4) ----
      doc.addPage(); y = 25;
      doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(30, 41, 59);
      doc.text('3. Perfiles de Competidores Clave', margin, y); y += 3;
      doc.setDrawColor(14, 165, 233); doc.line(margin, y, pageWidth - margin, y); y += 8;

      const topProfiles = Object.values(COMPETITOR_PROFILES).slice(0, 4);
      topProfiles.forEach(profile => {
        if (y > 240) { doc.addPage(); y = 25; }
        // Header de perfil
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(margin - 2, y - 5, pageWidth - margin * 2 + 4, 10, 2, 2, 'F');
        doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(30, 41, 59);
        doc.text(profile.nombre + "  (" + profile.cuotaMercadoEstimada + "% cdt. mercado)", margin, y); y += 8;

        doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(71, 85, 105);
        doc.text("Tipo: " + profile.tipo + "  |  Centros en España: " + profile.presenciaEspana + "  |  Rating: ~" + (profile.ratings?.google?.promedio) + "⭐", margin, y); y += 6;

        // Precios
        const p = profile.precios?.audifonos;
        if (p) {
          doc.text("Precio audífonos — Básica: " + (p.gama_basica?.display || 'N/A') + "  |  Media: " + (p.gama_media?.display || 'N/A') + "  |  Alta: " + (p.gama_alta?.display || 'N/A'), margin, y); y += 6;
        }

        // Puntos débiles (máx 2)
        const debiles = profile.puntosDebiles?.slice(0, 2) || [];
        if (debiles.length > 0) {
          doc.setTextColor(239, 68, 68);
          doc.text("Debilidades: " + debiles.join('  |  '), margin, y); y += 6;
        }

        // Mejor oportunidad para Clinisord
        const vuln = profile.vulnerabilidades?.[0];
        if (vuln) {
          doc.setTextColor(22, 163, 74);
          const opLines = doc.splitTextToSize("Oportunidad: " + vuln.oportunidadClinosord, pageWidth - margin * 2 - 5);
          doc.text(opLines, margin, y); y += opLines.length * 5;
        }
        y += 7;
      });

      // ---- TABLA COMPARATIVA DE SERVICIOS ----
      if (y > 215) { doc.addPage(); y = 25; }
      doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(30, 41, 59);
      doc.text('4. Ventajas Diferenciales de Clinisord', margin, y); y += 3;
      doc.setDrawColor(14, 165, 233); doc.line(margin, y, pageWidth - margin, y); y += 8;

      const ventajas = CLINISORD_PROFILE.ventajasCompetitivas || [];
      doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(71, 85, 105);
      ventajas.forEach(v => {
        if (y > 270) { doc.addPage(); y = 25; }
        doc.setTextColor(14, 165, 233);
        doc.text('✓', margin, y);
        doc.setTextColor(30, 41, 59);
        const lines = doc.splitTextToSize(v, pageWidth - margin * 2 - 10);
        doc.text(lines, margin + 8, y); y += lines.length * 6 + 2;
      });

      // ---- FOOTER ----
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8); doc.setTextColor(148, 163, 184);
        doc.text("Clinisord GeoStrategy  ·  Informe Competitivo  ·  " + today + "  ·  Pág. " + i + "/" + totalPages, margin, 290);
      }

      const fileName = "clinisord-competitivo-" + name.replace(/\s+/g, '-').toLowerCase() + "-" + new Date().toISOString().split('T')[0] + ".pdf";
      doc.save(fileName);
      setExportStatus('success');
    } catch (err) {
      console.error('Error exportando informe competitivo:', err);
      setExportStatus('error');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  // ---- RENDER ----
  if (isExporting) {
    return (
      <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-900 text-white opacity-80">
        <Loader size={18} className="animate-spin" />
        <span>Generando PDF...</span>
      </button>
    );
  }

  if (exportStatus === 'success') {
    return (
      <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-emerald-500 text-white">
        <CheckCircle size={18} />
        <span>PDF descargado</span>
      </button>
    );
  }

  if (exportStatus === 'error') {
    return (
      <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-red-500 text-white">
        <AlertCircle size={18} />
        <span>Error — Intenta de nuevo</span>
      </button>
    );
  }

  const isDisabled = disabled || !selectedLocation;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Split button */}
      <div className={"flex rounded-xl overflow-hidden shadow-lg " + (isDisabled ? 'opacity-50 cursor-not-allowed' : '')}>
        {/* Botón principal */}
        <button
          onClick={exportViabilityReport}
          disabled={isDisabled}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all"
        >
          <Download size={16} />
          <span className="text-sm">Exportar PDF</span>
        </button>
        {/* Botón desplegable */}
        <button
          onClick={() => !isDisabled && setShowDropdown(v => !v)}
          disabled={isDisabled}
          className="px-3 py-3 bg-slate-700 hover:bg-slate-600 text-white border-l border-slate-600 transition-all"
        >
          <ChevronDown size={16} className={"transition-transform " + (showDropdown ? 'rotate-180' : '')} />
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && !isDisabled && (
        <div className="absolute bottom-full mb-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
          <button
            onClick={exportViabilityReport}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="p-1.5 bg-slate-100 rounded-lg">
              <FileText size={16} className="text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Informe de Viabilidad</p>
              <p className="text-xs text-slate-500">Score, demografía, proyección, red Clinisord</p>
            </div>
          </button>
          <div className="h-px bg-slate-100" />
          <button
            onClick={exportCompetitiveReport}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-sky-50 transition-colors"
          >
            <div className="p-1.5 bg-sky-100 rounded-lg">
              <BarChart2 size={16} className="text-sky-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Informe Competitivo</p>
              <p className="text-xs text-slate-500">Cuota de mercado, perfiles, oportunidades estratégicas</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
