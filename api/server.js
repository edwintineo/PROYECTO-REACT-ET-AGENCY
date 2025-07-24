import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares básicos
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API específicas que tu servidor Express maneja
// Ejemplo:
app.get('/api/data', (req, res) => {
  res.json({ message: 'Datos desde la API serverless' });
});

// Exportar la aplicación Express para Vercel
export default app;