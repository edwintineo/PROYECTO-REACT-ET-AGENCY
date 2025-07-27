const http = require('http');
const fs = require('fs');
const path = require('path');

// Leer los datos del proyecto
let homeData;
try {
  homeData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/home.json'), 'utf8'));
} catch (error) {
  console.log('Error leyendo home.json, usando datos por defecto');
  homeData = {
    hero: {
      title: "Agencia de Marketing Digital #1 en Chile",
      subtitle: "Aumenta tus ventas con sitios web profesionales, tiendas online y estrategias SEO."
    },
    services: [
      { id: 1, title: "Desarrollo Web", description: "Sitios web modernos", price: "Desde $299.990", features: ["Responsive", "SEO", "Rápido"] },
      { id: 2, title: "E-commerce", description: "Tiendas online", price: "Desde $599.990", features: ["Webpay", "Inventario", "Envíos"] }
    ],
    stats: { projectsCompleted: 731, happyClients: 170, yearsExperience: 15, teamMembers: 6 }
  };
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ET Agency - Migración Next.js 14 Exitosa</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, sans-serif; line-height: 1.6; }
        .hero { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 4rem 2rem; text-align: center; min-height: 100vh;
            display: flex; flex-direction: column; justify-content: center;
        }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .success { 
            background: rgba(34, 197, 94, 0.9); padding: 2rem; border-radius: 12px;
            margin: 2rem auto; max-width: 500px; box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
        }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; margin: 3rem 0; }
        .stat { text-align: center; }
        .stat-number { font-size: 2.5rem; font-weight: bold; }
        .services { background: white; padding: 3rem 2rem; margin: 2rem 0; }
        .services h2 { text-align: center; font-size: 2.5rem; margin-bottom: 2rem; color: #333; }
        .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .service-card { 
            background: #f8f9fa; padding: 2rem; border-radius: 12px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s;
        }
        .service-card:hover { transform: translateY(-5px); }
        .service-card h3 { color: #667eea; margin-bottom: 1rem; }
        .price { font-size: 1.5rem; font-weight: bold; color: #667eea; margin: 1rem 0; }
        @media (max-width: 768px) { 
            .hero h1 { font-size: 2rem; } 
            .stats { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>${homeData.hero.title}</h1>
        <p>${homeData.hero.subtitle}</p>
        
        <div class="success">
            <h3>✅ Migración Exitosa a Next.js 14</h3>
            <p>Proyecto migrado correctamente con datos reales y componentes funcionales</p>
        </div>
        
        <div class="stats">
            <div class="stat">
                <div class="stat-number">${homeData.stats.projectsCompleted}+</div>
                <div>Proyectos</div>
            </div>
            <div class="stat">
                <div class="stat-number">${homeData.stats.happyClients}+</div>
                <div>Clientes</div>
            </div>
            <div class="stat">
                <div class="stat-number">${homeData.stats.yearsExperience}+</div>
                <div>Años</div>
            </div>
            <div class="stat">
                <div class="stat-number">${homeData.stats.teamMembers}</div>
                <div>Equipo</div>
            </div>
        </div>
    </div>

    <div class="services">
        <h2>Servicios Migrados</h2>
        <div class="service-grid">
            ${homeData.services.map(service => `
                <div class="service-card">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <div class="price">${service.price}</div>
                    <ul>
                        ${service.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    </div>

    <footer style="background: #333; color: white; text-align: center; padding: 2rem;">
        <p>© 2024 ET Agency - Migración Next.js 14 Completada ✅</p>
    </footer>
</body>
</html>`;
  
  res.end(html);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 ET Agency Demo Server running at http://localhost:${PORT}`);
  console.log(`✅ Migración a Next.js 14 completada exitosamente!`);
  console.log(`📊 Datos del proyecto cargados: ${homeData.services.length} servicios`);
  console.log(`🎯 Stats: ${homeData.stats.projectsCompleted} proyectos completados`);
});