# ET Agency - Agencia de Marketing Digital

![ET Agency Logo](./public/images/logo.png)

## 🚀 Descripción

ET Agency es una aplicación web moderna desarrollada con React que representa una agencia de marketing digital especializada en desarrollo web, posicionamiento SEO y estrategias digitales. El proyecto incluye un diseño responsivo, animaciones fluidas y una arquitectura escalable.

## Características

- ✅ **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- ✅ **Totalmente Responsive**: Optimizado para todos los dispositivos
- ✅ **Rendimiento Optimizado**: Carga rápida y experiencia fluida
- ✅ **SEO Friendly**: Estructura optimizada para motores de búsqueda
- ✅ **Componentes Reutilizables**: Arquitectura modular y mantenible
- ✅ **Chat Bot Integrado**: Asistente virtual para atención al cliente

## Tecnologías Utilizadas

- **React 18**: Framework principal
- **React Router DOM**: Navegación entre páginas
- **Tailwind CSS**: Framework de estilos
- **Framer Motion**: Animaciones y transiciones
- **Lucide React**: Iconografía moderna
- **Vite**: Herramienta de desarrollo y build

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Navegación principal
│   ├── Footer.jsx          # Pie de página
│   └── ChatBot.jsx         # Chat bot integrado
├── pages/
│   ├── Home.jsx            # Página principal
│   ├── Services.jsx        # Página de servicios
│   ├── Portfolio.jsx       # Portfolio de trabajos
│   ├── Contact.jsx         # Página de contacto
│   └── Blog.jsx            # Blog corporativo
├── App.jsx                 # Componente principal
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales
```

## Páginas Incluidas

### 🏠 **Página Principal (Home)**
- Hero section con llamada a la acción
- Servicios principales
- Características destacadas
- Planes y precios
- Testimonios de clientes
- Sección de contacto

### 🛠️ **Servicios**
- Diseño Web Profesional
- Tiendas Online (E-commerce)
- Mantenimiento Web
- Posicionamiento SEO
- Servicios adicionales
- Proceso de trabajo

### 💼 **Portfolio**
- Filtros por categoría
- Proyectos destacados
- Detalles técnicos
- Estadísticas de resultados

### 📞 **Contacto**
- Formulario de cotización
- Información de contacto
- Preguntas frecuentes
- Mapa de ubicación

### 📝 **Blog**
- Artículos sobre diseño web, SEO y marketing
- Sistema de búsqueda
- Filtros por categoría
- Sidebar con contenido relacionado

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Navegar al directorio del proyecto**
   ```bash
   cd "PROYECTO REACT ET AGENCY"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   - El sitio estará disponible en: `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para revisar el código

## Configuración de Producción

### Build para Producción
```bash
npm run build
```

Esto generará una carpeta `dist/` con todos los archivos optimizados para producción.

### Despliegue
Los archivos de la carpeta `dist/` pueden ser desplegados en cualquier servidor web estático como:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cualquier hosting tradicional

## Funcionalidades Implementadas

### 🎨 **Diseño y UX**
- Diseño responsive para móviles, tablets y desktop
- Animaciones suaves con Framer Motion
- Paleta de colores profesional
- Tipografía optimizada para legibilidad

### 🚀 **Rendimiento**
- Lazy loading de componentes
- Optimización de imágenes
- Código dividido por rutas
- CSS optimizado con Tailwind

### 📱 **Interactividad**
- Chat bot funcional
- Formularios con validación
- Filtros dinámicos en portfolio y blog
- Navegación suave entre secciones

### 🔍 **SEO**
- Meta tags optimizados
- Estructura semántica HTML5
- URLs amigables
- Sitemap automático

## Personalización

### Colores
Los colores principales se pueden modificar en `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... más tonos
    900: '#1e3a8a'
  }
}
```

### Contenido
- Textos: Modificar directamente en los componentes
- Imágenes: Reemplazar en la carpeta `public/`
- Información de contacto: Actualizar en `Contact.jsx`

## Próximas Mejoras

- [ ] Integración con CMS headless
- [ ] Sistema de comentarios en el blog
- [ ] Integración con Google Analytics
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro
- [ ] Multiidioma (i18n)

## Soporte

Para soporte técnico o consultas sobre el proyecto:
- Email: info@etagency.cl
- Teléfono: +56 9 1234 5678

## Licencia

Este proyecto es propiedad de ET Agency. Todos los derechos reservados.

---

**Desarrollado con ❤️ por ET Agency**