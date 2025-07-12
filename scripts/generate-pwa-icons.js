import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tamaños de iconos necesarios para PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Template SVG base
const createIconSVG = (size) => {
  const padding = Math.floor(size * 0.167); // 16.7% padding
  const contentSize = size - (padding * 2);
  const fontSize = Math.floor(size * 0.111); // Tamaño de fuente proporcional
  const textY = size - padding + (fontSize * 0.3);
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.floor(size * 0.222)}" fill="#3b82f6"/>
  <g transform="translate(${padding}, ${padding})">
    <path d="M${contentSize/2} ${contentSize*0.094}L${contentSize*0.75} ${contentSize*0.25}L${contentSize/2} ${contentSize*0.406}L${contentSize*0.25} ${contentSize*0.25}L${contentSize/2} ${contentSize*0.094}Z" fill="white" stroke="white" stroke-width="${Math.max(1, size/36)}" stroke-linejoin="round"/>
    <path d="M${contentSize*0.25} ${contentSize*0.25}V${contentSize*0.656}L${contentSize/2} ${contentSize*0.812}L${contentSize*0.75} ${contentSize*0.656}V${contentSize*0.25}" fill="none" stroke="white" stroke-width="${Math.max(1, size/36)}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${contentSize/2} ${contentSize*0.406}V${contentSize*0.812}" fill="none" stroke="white" stroke-width="${Math.max(1, size/36)}" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${contentSize/2}" y="${textY}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold">ET</text>
  </g>
</svg>`;
};

// Crear directorio de iconos si no existe
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generar iconos SVG
iconSizes.forEach(size => {
  const svgContent = createIconSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`✅ Generado: ${filename}`);
});

// Crear favicon.ico como SVG
const faviconSVG = createIconSVG(32);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), faviconSVG);
console.log('✅ Generado: favicon.svg');

// Crear apple-touch-icon
const appleTouchIcon = createIconSVG(180);
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.svg'), appleTouchIcon);
console.log('✅ Generado: apple-touch-icon.svg');

console.log('\n🎉 Todos los iconos PWA han sido generados exitosamente!');
console.log('📁 Ubicación:', iconsDir);
console.log('\n📋 Iconos generados:');
iconSizes.forEach(size => {
  console.log(`   - icon-${size}x${size}.svg`);
});
console.log('   - apple-touch-icon.svg');
console.log('   - favicon.svg (actualizado)');