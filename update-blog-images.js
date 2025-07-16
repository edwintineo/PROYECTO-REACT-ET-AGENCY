/**
 * Script para actualizar las referencias de imágenes en BlogPost.jsx
 * Reemplaza las etiquetas Image con src="/images/blog/..." por OptimizedBlogImage
 */

import fs from 'fs';
import path from 'path';

const filePath = 'c:\\Users\\brimo\\Desktop\\PROYECTO-REACT-ET-AGENCY\\src\\pages\\BlogPost.jsx';

// Leer el archivo
const content = fs.readFileSync(filePath, 'utf8');

// Patrón para encontrar las etiquetas Image con rutas del blog
const imagePattern = /<Image\s+src="\/images\/blog\/([^"]+)\.svg"\s+alt="([^"]+)"\s+style=\{[^}]+\}\s+(?:lazy=\{true\}\s+)?(?:webp=\{true\}\s+)?\/?>/g;

// Reemplazar con OptimizedBlogImage
const updatedContent = content.replace(imagePattern, (match, imageName, altText) => {
  return `<OptimizedBlogImage 
          imageName="${imageName}" 
          alt="${altText}" 
          className="w-full h-[300px] object-cover rounded-lg mb-8" 
        />`;
});

// Escribir el archivo actualizado
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('✅ Archivo BlogPost.jsx actualizado con OptimizedBlogImage');
console.log(`📊 Reemplazos realizados: ${(content.match(imagePattern) || []).length}`);