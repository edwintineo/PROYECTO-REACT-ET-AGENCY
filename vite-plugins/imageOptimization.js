import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Plugin de Vite para optimización automática de imágenes
 * Genera versiones WebP y diferentes tamaños durante el build
 */
export function imageOptimizationPlugin(options = {}) {
  const {
    inputDir = 'public/images',
    outputDir = 'dist/images',
    formats = ['webp', 'jpg'],
    sizes = [480, 768, 1024, 1280, 1920],
    quality = {
      webp: 85,
      jpg: 85,
      png: 90
    },
    progressive = true,
    includeOriginal = true
  } = options;

  return {
    name: 'image-optimization',
    
    async buildStart() {
      console.log('🖼️  Iniciando optimización de imágenes...');
    },

    async writeBundle() {
      try {
        await optimizeImages();
        console.log('✅ Optimización de imágenes completada');
      } catch (error) {
        console.error('❌ Error en optimización de imágenes:', error);
      }
    }
  };

  async function optimizeImages() {
    // Crear directorio de salida si no existe
    await fs.mkdir(outputDir, { recursive: true });

    // Buscar todas las imágenes en el directorio de entrada
    const imageFiles = await findImageFiles(inputDir);
    
    console.log(`📸 Procesando ${imageFiles.length} imágenes...`);

    // Procesar cada imagen
    const promises = imageFiles.map(async (filePath) => {
      try {
        await processImage(filePath);
      } catch (error) {
        console.warn(`⚠️  Error procesando ${filePath}:`, error.message);
      }
    });

    await Promise.all(promises);
  }

  async function findImageFiles(dir) {
    const files = [];
    const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    async function scanDirectory(currentDir) {
      try {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          
          if (entry.isDirectory()) {
            await scanDirectory(fullPath);
          } else if (supportedExtensions.includes(path.extname(entry.name).toLowerCase())) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        // Directorio no existe, continuar
      }
    }

    await scanDirectory(dir);
    return files;
  }

  async function processImage(filePath) {
    const relativePath = path.relative(inputDir, filePath);
    const { name, ext } = path.parse(relativePath);
    const outputPath = path.join(outputDir, path.dirname(relativePath));
    
    // Crear directorio de salida
    await fs.mkdir(outputPath, { recursive: true });

    // Cargar imagen con Sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Generar versiones en diferentes tamaños y formatos
    const tasks = [];

    for (const format of formats) {
      for (const size of sizes) {
        // Solo generar si el tamaño es menor o igual al original
        if (size <= metadata.width) {
          const outputFileName = `${name}_${size}w.${format}`;
          const outputFilePath = path.join(outputPath, outputFileName);
          
          tasks.push(
            generateOptimizedImage(image, outputFilePath, {
              width: size,
              format,
              quality: quality[format] || 85,
              progressive
            })
          );
        }
      }
      
      // Generar versión original optimizada
      if (includeOriginal) {
        const originalFileName = `${name}.${format}`;
        const originalFilePath = path.join(outputPath, originalFileName);
        
        tasks.push(
          generateOptimizedImage(image, originalFilePath, {
            format,
            quality: quality[format] || 85,
            progressive
          })
        );
      }
    }

    await Promise.all(tasks);
  }

  async function generateOptimizedImage(image, outputPath, options) {
    const { width, height, format, quality, progressive } = options;
    
    let pipeline = image.clone();
    
    // Redimensionar si se especifica
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Aplicar formato y calidad
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ 
          quality,
          effort: 6 // Máxima compresión
        });
        break;
      case 'jpg':
      case 'jpeg':
        pipeline = pipeline.jpeg({ 
          quality,
          progressive,
          mozjpeg: true
        });
        break;
      case 'png':
        pipeline = pipeline.png({ 
          quality,
          compressionLevel: 9,
          progressive
        });
        break;
    }
    
    await pipeline.toFile(outputPath);
  }
}

/**
 * Plugin para generar manifesto de imágenes optimizadas
 */
export function imageManifestPlugin(options = {}) {
  const {
    outputFile = 'dist/image-manifest.json',
    publicPath = '/images/'
  } = options;

  return {
    name: 'image-manifest',
    
    async writeBundle() {
      try {
        const manifest = await generateImageManifest();
        await fs.writeFile(outputFile, JSON.stringify(manifest, null, 2));
        console.log('📋 Manifesto de imágenes generado');
      } catch (error) {
        console.error('❌ Error generando manifesto de imágenes:', error);
      }
    }
  };

  async function generateImageManifest() {
    const manifest = {};
    const imagesDir = 'dist/images';
    
    try {
      const files = await findAllFiles(imagesDir);
      
      for (const file of files) {
        const relativePath = path.relative(imagesDir, file);
        const { name, ext } = path.parse(relativePath);
        
        // Extraer información del nombre del archivo
        const match = name.match(/^(.+)_(\d+)w$/);
        
        if (match) {
          const [, baseName, width] = match;
          const format = ext.slice(1); // Remover el punto
          
          if (!manifest[baseName]) {
            manifest[baseName] = {
              formats: {},
              sizes: []
            };
          }
          
          if (!manifest[baseName].formats[format]) {
            manifest[baseName].formats[format] = {};
          }
          
          manifest[baseName].formats[format][width] = `${publicPath}${relativePath}`;
          
          if (!manifest[baseName].sizes.includes(parseInt(width))) {
            manifest[baseName].sizes.push(parseInt(width));
          }
        } else {
          // Imagen original
          const format = ext.slice(1);
          
          if (!manifest[name]) {
            manifest[name] = {
              formats: {},
              sizes: []
            };
          }
          
          if (!manifest[name].formats[format]) {
            manifest[name].formats[format] = {};
          }
          
          manifest[name].formats[format].original = `${publicPath}${relativePath}`;
        }
      }
      
      // Ordenar tamaños
      Object.values(manifest).forEach(item => {
        item.sizes.sort((a, b) => a - b);
      });
      
    } catch (error) {
      console.warn('Directorio de imágenes no encontrado');
    }
    
    return manifest;
  }

  async function findAllFiles(dir) {
    const files = [];
    
    async function scan(currentDir) {
      try {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          
          if (entry.isDirectory()) {
            await scan(fullPath);
          } else {
            files.push(fullPath);
          }
        }
      } catch (error) {
        // Ignorar errores
      }
    }
    
    await scan(dir);
    return files;
  }
}