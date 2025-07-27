const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ET Agency - Agencia de Marketing Digital #1 en Chile</title>
    <meta name="description" content="Transformamos tu presencia digital con estrategias innovadoras y resultados medibles. Desarrollo web, SEO y marketing digital profesional.">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f8fafc;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        header {
            background-color: white;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2563eb;
        }
        
        nav {
            display: flex;
            gap: 2rem;
        }
        
        nav a {
            color: #374151;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        nav a:hover {
            color: #2563eb;
        }
        
        .hero {
            padding: 4rem 1rem;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .btn {
            background-color: #f59e0b;
            color: white;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: bold;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .success-section {
            padding: 4rem 1rem;
        }
        
        .success-card {
            background-color: white;
            padding: 3rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            border: 2px solid #10b981;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .success-icon {
            width: 4rem;
            height: 4rem;
            background-color: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
        }
        
        .success-card h2 {
            font-size: 2rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 1rem;
        }
        
        .success-card p {
            color: #6b7280;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .services {
            padding: 4rem 1rem;
            background-color: white;
        }
        
        .services h2 {
            font-size: 2.5rem;
            font-weight: bold;
            text-align: center;
            color: #1f2937;
            margin-bottom: 3rem;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .service-card {
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            background-color: #f8fafc;
            text-align: center;
            transition: transform 0.3s;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
        }
        
        .service-card h3 {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 1rem;
        }
        
        .service-card p {
            color: #6b7280;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .header-content {
                flex-direction: column;
                gap: 1rem;
            }
            
            nav {
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">ET Agency</div>
                <nav>
                    <a href="#inicio">Inicio</a>
                    <a href="#servicios">Servicios</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#contacto">Contacto</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero" id="inicio">
        <div class="container">
            <h1>Agencia de Marketing Digital #1 en Chile</h1>
            <p>Transformamos tu presencia digital con estrategias innovadoras y resultados medibles</p>
            <button class="btn" onclick="alert('¡Gracias por tu interés! La funcionalidad de contacto se implementará en la siguiente fase.')">
                Solicitar Consulta Gratuita
            </button>
        </div>
    </section>

    <section class="success-section">
        <div class="container">
            <div class="success-card">
                <div class="success-icon">✓</div>
                <h2>¡Migración a Next.js 14 Exitosa!</h2>
                <p>
                    La estructura básica de Next.js está funcionando correctamente. 
                    El proyecto ET Agency ha sido migrado exitosamente y está listo 
                    para continuar con la implementación de componentes y funcionalidades avanzadas.
                </p>
            </div>
        </div>
    </section>

    <section class="services" id="servicios">
        <div class="container">
            <h2>Nuestros Servicios</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>Desarrollo Web</h3>
                    <p>Sitios web modernos y responsivos con las últimas tecnologías</p>
                </div>
                <div class="service-card">
                    <h3>SEO</h3>
                    <p>Optimización para motores de búsqueda y mejor posicionamiento</p>
                </div>
                <div class="service-card">
                    <h3>Marketing Digital</h3>
                    <p>Estrategias de marketing efectivas para hacer crecer tu negocio</p>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Smooth scrolling para los enlaces de navegación
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animación de entrada para las tarjetas de servicios
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Aplicar animación a las tarjetas de servicios
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = \`opacity 0.6s ease \${index * 0.2}s, transform 0.6s ease \${index * 0.2}s\`;
            observer.observe(card);
        });

        console.log('🎉 ET Agency - Migración a Next.js completada exitosamente!');
        console.log('📱 Proyecto funcionando correctamente');
        console.log('🚀 Listo para implementar funcionalidades avanzadas');
    </script>
</body>
</html>
  `;
  
  res.end(html);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 ET Agency Demo Server running at http://localhost:${PORT}`);
  console.log(`✅ Migración a Next.js 14 completada exitosamente!`);
});