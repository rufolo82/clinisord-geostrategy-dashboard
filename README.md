# Clinisord GeoStrategy Dashboard

## Aplicación de Geomarketing y Análisis de Viabilidad

Esta aplicación ayuda a Clinisord a tomar decisiones estratégicas sobre dónde abrir su próximo centro de audioprótesis, analizando factores demográficos, competencia y proximidad a otros centros de la red.

## Características

### Panel de Control
- **Dashboard moderno** con diseño corporativo minimalista
- **Mapa interactivo** con tecnología Leaflet (OpenStreetMap)
- **Búsqueda por código postal o municipio** de España
- **Panel lateral** con Score de Viabilidad (0-100)

### Capas de Datos
1. **Densidad Demográfica (Target Silver)**
   - Población mayor de 65 años
   - Porcentaje de población objetivo
   - Nivel de densidad urbana

2. **Análisis de Competencia**
   - Clínicas de audición cercanas
   - Ópticas (servicios de audiología)
   - Farmacias del entorno
   - Nivel de saturación del mercado

3. **Presencia Clinisord**
   - Red de centros propios (16 ubicaciones)
   - Riesgo de canibalización
   - Distancia al centro más cercano

### Algoritmo de Decisión
El score de viabilidad se calcula ponderando:
- **Demografía**: 40%
- **Competencia**: 30%
- **Canibalización**: 20%
- **Accesibilidad**: 10%

Categorías resultantes:
- 🟢 **Alta Viabilidad** (80-100): Recomendado
- 🟡 **Viabilidad Media** (60-79): Revisar
- 🟠 **Riesgo Moderado** (40-59): Precaución
- 🔴 **Alto Riesgo** (<40): No recomendado

### Mejoras de Valor Añadido
- **Área de Influencia**: Radio de 1km visualizable
- **Estimación de Captación**: Proyección de pacientes mensuales
- **Exportación PDF**: Informe completo para el equipo directivo

## Instalación

```bash
# Navegar al directorio del proyecto
cd clinisord-dashboard

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Uso

1. **Buscar ubicación**: Introduce un código postal (28001) o municipio (Madrid)
2. **Click en el mapa**: Selecciona cualquier punto para analizar
3. **Ver score**: El panel lateral muestra la viabilidad (0-100)
4. **Capas de datos**: Activa/desactiva capas para ver competidores, Clinisord, etc.
5. **Exportar**: Genera un PDF con el informe completo

## Tecnologías

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Mapas**: Leaflet + React-Leaflet
- **Iconos**: Lucide React
- **PDF**: jsPDF

## Notas

- Los datos demográficos y de competencia son **simulados** para el MVP
- En producción, conectar con APIs oficiales (INE, Google Places)
- La aplicación incluye base de datos de códigos postales de España

## Licencia

© 2024 Clinisord - Todos los derechos reservados
