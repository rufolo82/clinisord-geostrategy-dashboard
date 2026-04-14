// Test básico para verificar que la aplicación carga correctamente
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testDashboard() {
  console.log('🧪 Iniciando pruebas del Dashboard...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  
  // Capturar errores de consola
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  
  try {
    // Navegar a la aplicación
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Página cargada correctamente');
    
    // Verificar elementos principales
    const title = await page.title();
    console.log(`📄 Título: ${title}`);
    
    // Verificar que el mapa está presente
    const mapContainer = await page.$('.leaflet-container');
    if (mapContainer) {
      console.log('✅ Contenedor del mapa encontrado');
    } else {
      console.log('⚠️ Contenedor del mapa no encontrado');
    }
    
    // Verificar que el sidebar está presente
    const sidebar = await page.$('aside');
    if (sidebar) {
      console.log('✅ Sidebar encontrado');
    } else {
      console.log('⚠️ Sidebar no encontrado');
    }
    
    // Verificar botón de búsqueda
    const searchInput = await page.$('input[placeholder*="Código postal"]');
    if (searchInput) {
      console.log('✅ Campo de búsqueda encontrado');
    } else {
      console.log('⚠️ Campo de búsqueda no encontrado');
    }
    
    // Verificar botones de capas
    const layerButtons = await page.$$('button');
    const hasLayers = layerButtons.some(btn => btn.textContent().includes('Capas') || btn.textContent().includes('Capas'));
    console.log(hasLayers ? '✅ Controles de capas encontrados' : '⚠️ Controles de capas no encontrados');
    
    // Esperar un momento para detectar errores tardíos
    await page.waitForTimeout(2000);
    
    // Reportar errores
    if (errors.length > 0) {
      console.log('\n❌ Errores de consola detectados:');
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('\n✅ No hay errores de consola');
    }
    
    console.log('\n🧪 Pruebas completadas');
    
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
  } finally {
    await browser.close();
  }
}

testDashboard();
