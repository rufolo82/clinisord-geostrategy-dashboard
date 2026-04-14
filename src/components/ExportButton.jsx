import React, { useState } from 'react';
import { Download, FileText, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import { generateViabilityReport } from '../utils/algorithm';

const ExportButton = ({ viabilityData, selectedLocation, disabled }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null); // null, 'success', 'error'

  const handleExport = async () => {
    if (!selectedLocation || !viabilityData || disabled) return;

    setIsExporting(true);
    setExportStatus(null);

    try {
      // Generar reporte completo
      const report = generateViabilityReport(
        selectedLocation.lat,
        selectedLocation.lng,
        selectedLocation.name
      );

      // Crear PDF
      const doc = new jsPDF();
      
      // Configuración de página
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = 20;
      
      // Header
      doc.setFillColor(15, 23, 42); // Slate 900
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Clinisord GeoStrategy', margin, 25);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Informe de Viabilidad', margin, 33);
      
      yPos = 55;
      
      // Reset color de texto
      doc.setTextColor(30, 41, 59);
      
      // Información de ubicación
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Información de Ubicación', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Ubicación: ${report.location.name}`, margin, yPos);
      yPos += 7;
      doc.text(`Coordenadas: ${report.location.coordinates.lat}, ${report.location.coordinates.lng}`, margin, yPos);
      yPos += 7;
      doc.text(`Fecha: ${new Date(report.generatedAt).toLocaleDateString('es-ES')}`, margin, yPos);
      yPos += 15;
      
      // Score de viabilidad
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Análisis de Viabilidad', margin, yPos);
      yPos += 10;
      
      // Box de score
      const scoreColor = viabilityData.score >= 60 ? [16, 185, 129] : 
                        viabilityData.score >= 40 ? [245, 158, 11] : [239, 68, 68];
      doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      doc.roundedRect(margin, yPos, 60, 25, 3, 3, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(`${report.viability.score}`, margin + 15, yPos + 17);
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Categoría: ${report.viability.category}`, margin + 70, yPos + 10);
      doc.text(report.viability.recommendation.substring(0, 50) + '...', margin + 70, yPos + 17);
      
      yPos += 40;
      
      // Demografía
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Datos Demográficos', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Población total: ${report.demographics.population.toLocaleString()}`, margin, yPos);
      yPos += 7;
      doc.text(`Población objetivo (>65): ${report.demographics.targetPopulation.toLocaleString()}`, margin, yPos);
      yPos += 7;
      doc.text(`Porcentaje mayores 65: ${report.demographics.elderlyPercentage}%`, margin, yPos);
      yPos += 15;
      
      // Competencia
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Análisis de Competencia', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total competidores: ${report.competition.totalCompetitors}`, margin, yPos);
      yPos += 7;
      doc.text(`  - Clínicas: ${report.competition.clinics}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`  - Ópticas: ${report.competition.optics}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`  - Farmacias: ${report.competition.pharmacies}`, margin + 5, yPos);
      yPos += 7;
      doc.text(`Nivel de saturación: ${report.competition.saturation}`, margin, yPos);
      yPos += 15;
      
      // Proyección
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Proyección de Captación', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Captación mensual estimada: ${report.captures.monthlyExpected} pacientes`, margin, yPos);
      yPos += 7;
      doc.text(`Rango mensual: ${report.captures.monthlyRange} pacientes`, margin, yPos);
      yPos += 7;
      doc.text(`Proyección anual: ${parseInt(report.captures.annualProjection).toLocaleString()}€`, margin, yPos);
      yPos += 15;
      
      // Red Clinisord
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Red Clinisord', margin, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Centro más cercano: ${report.clinisord.nearestCenter}`, margin, yPos);
      yPos += 7;
      doc.text(`Distancia: ${report.clinisord.distance} km`, margin, yPos);
      yPos += 20;
      
      // Footer
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text('Generado por Clinisord GeoStrategy Dashboard', margin, 280);
      doc.text('Este informe es orientativo. Se recomienda verificación in situ.', margin, 286);
      
      // Descargar PDF
      const fileName = `clinisord-viability-${report.location.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      setExportStatus('success');
      
      // Resetear estado después de 3 segundos
      setTimeout(() => {
        setExportStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error exportando PDF:', error);
      setExportStatus('error');
      
      setTimeout(() => {
        setExportStatus(null);
      }, 3000);
    } finally {
      setIsExporting(false);
    }
  };

  // Obtener contenido del botón según estado
  const getButtonContent = () => {
    if (isExporting) {
      return (
        <>
          <Loader size={18} className="animate-spin" />
          <span>Generando PDF...</span>
        </>
      );
    }
    
    if (exportStatus === 'success') {
      return (
        <>
          <CheckCircle size={18} />
          <span>PDF descargado</span>
        </>
      );
    }
    
    if (exportStatus === 'error') {
      return (
        <>
          <AlertCircle size={18} />
          <span>Error - Intenta de nuevo</span>
        </>
      );
    }
    
    return (
      <>
        <Download size={18} />
        <span>Exportar Informe PDF</span>
      </>
    );
  };

  // Clases del botón según estado
  const getButtonClass = () => {
    const baseClass = 'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all';
    
    if (exportStatus === 'success') {
      return `${baseClass} bg-emerald-500 text-white`;
    }
    
    if (exportStatus === 'error') {
      return `${baseClass} bg-red-500 text-white`;
    }
    
    if (disabled) {
      return `${baseClass} bg-slate-200 text-slate-400 cursor-not-allowed`;
    }
    
    return `${baseClass} bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl`;
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || isExporting}
      className={getButtonClass()}
    >
      {getButtonContent()}
    </button>
  );
};

export default ExportButton;
