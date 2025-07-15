# Sistema de Imágenes Optimizado para Portfolio

Este sistema permite que el sitio web muestre imágenes en múltiples formatos (PNG, WEBP, JPG, SVG) sin necesidad de conversión manual.

## Características

### ✅ Soporte Multi-formato
- **WEBP**: Formato moderno con mejor compresión
- **PNG**: Ideal para imágenes con transparencia
- **JPG/JPEG**: Formato estándar para fotografías
- **SVG**: Vectores escalables para ilustraciones

### ✅ Detección Automática
El sistema detecta automáticamente qué formato de imagen está disponible para cada proyecto y lo carga dinámicamente.

### ✅ Fallback Inteligente
Si no encuentra ninguna imagen, muestra un placeholder con gradiente personalizado.

### ✅ Optimización de Rendimiento
- Lazy loading automático
- Cache de verificación de imágenes
- Preload opcional para mejor UX

## Cómo Usar

### 1. Agregar Imágenes al Portfolio

Simplemente coloca tus imágenes en la carpeta `public/images/portfolio/` con el nombre del proyecto:

```
public/images/portfolio/
├── mi-proyecto.webp     ← Formato preferido
├── mi-proyecto.png      ← Alternativa
├── mi-proyecto.jpg      ← Otra alternativa
└── mi-proyecto.svg      ← Fallback vectorial
```

### 2. Configuración por Proyecto

Edita `src/config/imageConfig.js` para especificar qué formatos tiene cada proyecto:

```javascript
export const PROJECT_IMAGE_CONFIG = {
  'mi-proyecto': {
    formats: ['webp', 'png', 'jpg', 'svg'],
    preferredFormat: 'webp'
  }
};
```

### 3. Uso en Componentes

El componente `OptimizedPortfolioImage` se encarga de todo automáticamente:

```jsx
<OptimizedPortfolioImage
  projectId={project.id}
  projectTitle={project.title}
  className="w-full h-full object-cover"
  fallbackGradient="from-blue-500 to-purple-600"
/>
```

## Estructura de Archivos

```
src/
├── components/
│   └── OptimizedPortfolioImage.jsx    ← Componente principal
├── config/
│   └── imageConfig.js                 ← Configuración de formatos
├── utils/
│   └── imageUtils.js                  ← Utilidades de imagen
└── pages/
    └── Portfolio.jsx                  ← Página que usa las imágenes
```

## Convención de Nombres

El sistema busca imágenes usando estos patrones:

1. `nombre-del-proyecto.ext`
2. `nombre-del-proyecto-{id}.ext`
3. `proyecto-{id}.ext`
4. `{id}.ext`

Donde `ext` puede ser: `webp`, `png`, `jpg`, `jpeg`, `svg`

## Ejemplos de Uso

### Proyecto con múltiples formatos:
```
carpediem-online.webp    ← Se carga primero (mejor calidad/tamaño)
carpediem-online.png     ← Fallback si no hay WEBP
carpediem-online.svg     ← Fallback final
```

### Proyecto solo con SVG:
```
boutique-luna.svg        ← Único formato disponible
```

### Proyecto con fotografías:
```
constructora-cm.jpg      ← Formato original
constructora-cm.webp     ← Versión optimizada (se prefiere)
```

## Beneficios

1. **Flexibilidad**: Acepta cualquier formato sin modificar código
2. **Rendimiento**: Carga el formato más eficiente disponible
3. **Mantenibilidad**: Fácil agregar/cambiar imágenes
4. **Escalabilidad**: Soporta cientos de proyectos sin problemas
5. **UX**: Siempre muestra algo, nunca imágenes rotas

## Configuración Avanzada

### Personalizar orden de preferencia:
```javascript
// En imageConfig.js
export const GLOBAL_IMAGE_CONFIG = {
  preferenceOrder: ['webp', 'png', 'jpg', 'jpeg', 'svg']
};
```

### Agregar nuevos formatos:
```javascript
// En imageConfig.js
export const GLOBAL_IMAGE_CONFIG = {
  supportedFormats: ['webp', 'avif', 'png', 'jpg', 'jpeg', 'svg']
};
```

### Personalizar placeholders:
```javascript
// En imageConfig.js
export const GLOBAL_IMAGE_CONFIG = {
  placeholder: {
    gradients: [
      'from-blue-500 to-purple-600',
      'from-green-500 to-blue-600',
      // Agregar más gradientes...
    ]
  }
};
```

## Migración desde Sistema Anterior

Si ya tienes imágenes en formato específico, no necesitas hacer nada. El sistema:

1. Detectará automáticamente las imágenes existentes
2. Las mostrará sin problemas
3. Te permitirá agregar formatos adicionales gradualmente

## Troubleshooting

### Las imágenes no se cargan:
1. Verifica que estén en `public/images/portfolio/`
2. Revisa que el nombre coincida con el slug del proyecto
3. Confirma que la extensión esté en `supportedFormats`

### Rendimiento lento:
1. Usa formatos WEBP para mejor compresión
2. Optimiza el tamaño de las imágenes
3. Considera usar lazy loading

### Placeholder no aparece:
1. Verifica que `showFallback={true}`
2. Revisa la configuración de gradientes
3. Confirma que Tailwind CSS esté funcionando