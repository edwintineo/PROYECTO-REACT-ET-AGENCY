const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;

// Función para leer datos con fallback
function loadData() {
  try {
    const dataPath = path.join(__dirname, 'src', 'data', 'home.json');
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
  } catch (error) {
    console.log('Using fallback data');
  }
  
  // Datos de fallback
  return {
    hero: {
      title: "ET Agency - Migración Exitosa a Next.js 14",
      subtitle: "Transformamos tu presencia digital con tecnología de vanguardia"
    },
    stats: {
      projects: "731+",
      clients: "170+",
      experience: "5+",
      team: "12+"
    },
    services: [
      {
        id: 1,
        title: "Desarrollo Web",
        description: "Sitios web modernos y responsivos",
        price: "$299",
        features: ["Diseño Responsivo", "SEO Optimizado", "Carga Rápida"]
      },
      {
        id: 2,
        title: "E-commerce",
        description: "Tiendas online completas",
        price: "$599",
        features: ["Carrito de Compras", "Pagos Seguros", "Gestión de Inventario"]
      }
    ]
  };
}

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/' || req.url.startsWith('/?')) {
    const data = loadData();
    
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ET Agency - Next.js Migration Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            color: white;
            padding: 40px 0;
        }
        
        .header h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .success-badge {
            background: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .stat-label {
            color: #666;
            font-size: 1.1rem;
        }
        
        .services-section {
            margin: 60px 0;
        }
        
        .section-title {
            text-align: center;
            color: white;
            font-size: 2.5rem;
            margin-bottom: 40px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .service-card {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        
        .service-title {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 15px;
        }
        
        .service-description {
            color: #666;
            margin-bottom: 20px;
        }
        
        .service-price {
            font-size: 2rem;
            font-weight: bold;
            color: #10b981;
            margin-bottom: 20px;
        }
        
        .features-list {
            list-style: none;
        }
        
        .features-list li {
            padding: 5px 0;
            color: #555;
        }
        
        .features-list li:before {
            content: "✓ ";
            color: #10b981;
            font-weight: bold;
        }
        
        .migration-info {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            margin: 40px 0;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .migration-info h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8rem;
        }
        
        .migration-info ul {
            color: #666;
            margin-left: 20px;
        }
        
        .migration-info li {
            margin: 10px 0;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .services-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>${data.hero.title}</h1>
            <p>${data.hero.subtitle}</p>
            <div class="success-badge">
                ✅ Migración a Next.js 14 Completada
            </div>
        </header>
        
        <section class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${data.stats.projects}</div>
                <div class="stat-label">Proyectos Completados</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.stats.clients}</div>
                <div class="stat-label">Clientes Satisfechos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.stats.experience}</div>
                <div class="stat-label">Años de Experiencia</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.stats.team}</div>
                <div class="stat-label">Miembros del Equipo</div>
            </div>
        </section>
        
        <section class="services-section">
            <h2 class="section-title">Nuestros Servicios</h2>
            <div class="services-grid">
                ${data.services.map(service => `
                    <div class="service-card">
                        <h3 class="service-title">${service.title}</h3>
                        <p class="service-description">${service.description}</p>
                        <div class="service-price">${service.price}</div>
                        <ul class="features-list">
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </section>
        
        <section class="migration-info">
            <h3>🚀 Migración Exitosa a Next.js 14</h3>
            <ul>
                <li><strong>✅ Estructura de proyecto configurada</strong> - App Router y TypeScript</li>
                <li><strong>✅ Datos migrados</strong> - home.json con toda la información</li>
                <li><strong>✅ Componentes adaptados</strong> - ServiceCard y layout responsivo</li>
                <li><strong>✅ Estilos globales</strong> - CSS moderno y animaciones</li>
                <li><strong>✅ SEO optimizado</strong> - Metadatos y estructura semántica</li>
                <li><strong>✅ Servidor de desarrollo</strong> - Listo para npm run dev</li>
            </ul>
        </section>
    </div>
    
    <script>
        console.log('ET Agency - Next.js Migration Demo loaded successfully!');
        
        // Animación suave para las tarjetas
        const cards = document.querySelectorAll('.stat-card, .service-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 ET Agency Demo Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving from: ${__dirname}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});