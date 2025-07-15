#!/usr/bin/env node

/**
 * Script para analizar la efectividad de la compresión de assets
 * Compara tamaños de archivos originales vs comprimidos
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const brotliCompress = promisify(zlib.brotliCompress);

class CompressionAnalyzer {
  constructor(distPath = './dist') {
    this.distPath = distPath;
    this.results = {
      files: [],
      totals: {
        original: 0,
        gzip: 0,
        brotli: 0
      },
      savings: {
        gzip: 0,
        brotli: 0
      }
    };
  }

  async analyzeDirectory() {
    console.log('🔍 Analizando compresión de assets...\n');
    
    if (!fs.existsSync(this.distPath)) {
      console.error('❌ Directorio dist no encontrado. Ejecuta "npm run build" primero.');
      process.exit(1);
    }

    await this.scanFiles(this.distPath);
    this.calculateTotals();
    this.displayResults();
  }

  async scanFiles(dir, relativePath = '') {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const relativeFilePath = path.join(relativePath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await this.scanFiles(fullPath, relativeFilePath);
      } else if (this.shouldAnalyze(file)) {
        await this.analyzeFile(fullPath, relativeFilePath);
      }
    }
  }

  shouldAnalyze(filename) {
    // Analizar solo archivos que se benefician de compresión
    return /\.(js|css|html|json|svg|xml|txt)$/i.test(filename) && 
           !filename.endsWith('.gz') && 
           !filename.endsWith('.br');
  }

  async analyzeFile(filePath, relativePath) {
    try {
      const content = fs.readFileSync(filePath);
      const originalSize = content.length;

      // Comprimir con Gzip
      const gzipContent = await gzip(content, { level: 9 });
      const gzipSize = gzipContent.length;

      // Comprimir con Brotli
      const brotliContent = await brotliCompress(content, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      });
      const brotliSize = brotliContent.length;

      // Verificar si existen archivos precomprimidos
      const gzipExists = fs.existsSync(filePath + '.gz');
      const brotliExists = fs.existsSync(filePath + '.br');

      const fileResult = {
        path: relativePath,
        originalSize,
        gzipSize,
        brotliSize,
        gzipSavings: ((originalSize - gzipSize) / originalSize * 100),
        brotliSavings: ((originalSize - brotliSize) / originalSize * 100),
        gzipExists,
        brotliExists
      };

      this.results.files.push(fileResult);

    } catch (error) {
      console.warn(`⚠️  Error analizando ${relativePath}:`, error.message);
    }
  }

  calculateTotals() {
    this.results.files.forEach(file => {
      this.results.totals.original += file.originalSize;
      this.results.totals.gzip += file.gzipSize;
      this.results.totals.brotli += file.brotliSize;
    });

    const { original, gzip, brotli } = this.results.totals;
    this.results.savings.gzip = ((original - gzip) / original * 100);
    this.results.savings.brotli = ((original - brotli) / original * 100);
  }

  displayResults() {
    console.log('📊 Resultados del Análisis de Compresión\n');
    console.log('=' .repeat(80));

    // Resumen general
    console.log('\n📈 RESUMEN GENERAL:');
    console.log(`Original: ${this.formatBytes(this.results.totals.original)}`);
    console.log(`Gzip:     ${this.formatBytes(this.results.totals.gzip)} (${this.results.savings.gzip.toFixed(1)}% ahorro)`);
    console.log(`Brotli:   ${this.formatBytes(this.results.totals.brotli)} (${this.results.savings.brotli.toFixed(1)}% ahorro)`);

    // Archivos más grandes
    console.log('\n🔍 ARCHIVOS MÁS GRANDES:');
    const largestFiles = this.results.files
      .sort((a, b) => b.originalSize - a.originalSize)
      .slice(0, 10);

    console.log('\n' + 'Archivo'.padEnd(40) + 'Original'.padEnd(12) + 'Gzip'.padEnd(12) + 'Brotli'.padEnd(12) + 'Ahorro%');
    console.log('-'.repeat(80));

    largestFiles.forEach(file => {
      const name = file.path.length > 35 ? '...' + file.path.slice(-32) : file.path;
      const original = this.formatBytes(file.originalSize);
      const gzip = this.formatBytes(file.gzipSize);
      const brotli = this.formatBytes(file.brotliSize);
      const savings = file.brotliSavings.toFixed(1) + '%';
      
      console.log(
        name.padEnd(40) + 
        original.padEnd(12) + 
        gzip.padEnd(12) + 
        brotli.padEnd(12) + 
        savings
      );
    });

    // Verificar archivos precomprimidos
    console.log('\n🗜️  ARCHIVOS PRECOMPRIMIDOS:');
    const precompressed = this.results.files.filter(f => f.gzipExists || f.brotliExists);
    
    if (precompressed.length > 0) {
      console.log(`✅ ${precompressed.length} archivos tienen versiones precomprimidas`);
      const gzipCount = precompressed.filter(f => f.gzipExists).length;
      const brotliCount = precompressed.filter(f => f.brotliExists).length;
      console.log(`   - Gzip: ${gzipCount} archivos`);
      console.log(`   - Brotli: ${brotliCount} archivos`);
    } else {
      console.log('⚠️  No se encontraron archivos precomprimidos');
      console.log('   Ejecuta "npm run build:prod" para generar versiones comprimidas');
    }

    // Recomendaciones
    console.log('\n💡 RECOMENDACIONES:');
    
    if (this.results.savings.brotli > 20) {
      console.log('✅ Excelente compresión Brotli (>20% ahorro)');
    } else if (this.results.savings.brotli > 10) {
      console.log('👍 Buena compresión Brotli (>10% ahorro)');
    } else {
      console.log('⚠️  Compresión Brotli limitada (<10% ahorro)');
    }

    const largeUncompressed = this.results.files.filter(f => 
      f.originalSize > 10000 && f.brotliSavings > 30
    );
    
    if (largeUncompressed.length > 0) {
      console.log(`🎯 ${largeUncompressed.length} archivos grandes se beneficiarían de compresión`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✨ Análisis completado\n');
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Exportar resultados a JSON
  exportResults(outputPath = './compression-analysis.json') {
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Resultados exportados a: ${outputPath}`);
  }
}

// Ejecutar análisis si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new CompressionAnalyzer();
  
  analyzer.analyzeDirectory()
    .then(() => {
      // Exportar resultados si se especifica flag
      if (process.argv.includes('--export')) {
        analyzer.exportResults();
      }
    })
    .catch(error => {
      console.error('❌ Error durante el análisis:', error);
      process.exit(1);
    });
}

export default CompressionAnalyzer;