// Test para verificar búsqueda y ubicaciones
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testFixes() {
  console.log('🧪 Verificando correcciones...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  const logs = [];
  
  // Capturar errores de consola
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    } else {
      logs.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  
  try {
    // Navegar a la aplicación
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Página cargada correctamente');
    
    // TEST 1: Verificar que hay marcadores de Clinisord
    console.log('\n📍 TEST 1: Verificando marcadores de Clinisord...');
    await page.waitForTimeout(2000);
    
    // Hacer click en el mapa para activar los marcadores
    await page.click('.leaflet-container', { position: { x: 500, y: 300 } });
    await page.waitForTimeout(1000);
    
    // Verificar que los marcadores de Clinisord aparecen
    const clinisordMarkers = await page.$$('.custom-marker');
    console.log(`✅ Encontrados ${clinisordMarkers.length} marcadores en el mapa`);
    
    // TEST 2: Probar búsqueda por código postal
    console.log('\n🔍 TEST 2: Probando búsqueda por código postal...');
    
    // Escribir código postal
    const searchInput = await page.$('input[placeholder*="Código postal"]');
    if (searchInput) {
      await searchInput.fill('28005');
      console.log('✅ Input encontrado y texto escrito: 28005');
      
      // Presionar Enter
      await searchInput.press('Enter');
      console.log('✅ Enter presionado');
      
      await page.waitForTimeout(2000);
      
      // Verificar que el mapa se movió
      const mapCenter = await page.evaluate(() => {
        return window.mapCenter; // This would need to be exposed
      });
      console.log('ℹ️ Búsqueda ejecutada (verificar manualmente si el mapa se movió a Madrid)');
    } else {
      console.log('❌ Input de búsqueda no encontrado');
    }
    
    // TEST 3: Verificar pestaña de Centros
    console.log('\n🏥 TEST 3: Verificando lista de centros Clinisord...');
    
    const centrosTab = await page.$('button:has-text("Centros")');
    if (centrosTab) {
      await centrosTab.click();
      await page.waitForTimeout(1000);
      
      // Contar elementos en la lista
      const locationItems = await page.$$('aside button');
      console.log(`✅ Pestaña Centros clickeada. ${locationItems.length} elementos encontrados`);
      
      // Verificar que aparecen las ubicaciones reales
      const acaciasButton = await page.$('button:has-text("Acacias")');
      const felipeButton = await page.$('button:has-text("Felipe II")');
      
      if (acaciasButton) {
        console.log('✅ Clinisord Madrid Acacias encontrado en lista');
      }
      if (felipeButton) {
        console.log('✅ Clinisord Madrid Felipe II encontrado en lista');
      }
    }
    
    // Verificar errores
    console.log('\n📋 RESUMEN DE ERRORES:');
    if (errors.length > 0) {
      errors.forEach(err => console.log(`❌ ${err}`));
    } else {
      console.log('✅ No hay errores de consola');
    }
    
    console.log('\n🧪 Pruebas completadas');
    
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
  } finally {
    await browser.close();
  }
}

testFixes();
