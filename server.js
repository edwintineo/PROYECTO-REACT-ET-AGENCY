import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const resend = new Resend(process.env.RESEND_API_KEY);

// Middlewares básicos
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nueva ruta para manejar el envío de correos
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, company, service, budget, timeline, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ET Agency <onboarding@etagency.cl>', // Reemplaza con tu dominio verificado en Resend
      to: ['info@etagency.cl'], // Reemplaza con tu dirección de correo electrónico
      subject: `Nuevo mensaje de ${name} - ${service}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Empresa:</strong> ${company || 'No proporcionado'}</p>
        <p><strong>Servicio de Interés:</strong> ${service}</p>
        <p><strong>Presupuesto Estimado:</strong> ${budget || 'No proporcionado'}</p>
        <p><strong>Tiempo Estimado:</strong> ${timeline || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Error al enviar correo:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Correo enviado exitosamente', data });
  } catch (error) {
    console.error('Error en el endpoint /api/send-email:', error);
    res.status(500).json({ error: 'Error interno del servidor al enviar correo.' });
  }
});

// Servir archivos estáticos desde dist
app.use(express.static(path.join(__dirname, 'dist')));

// Manejar rutas SPA - servir index.html para todas las rutas no encontradas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📦 Sirviendo archivos desde: ${path.join(__dirname, 'dist')}`);
  console.log(`⚡ Modo: ${process.env.NODE_ENV || 'development'}`);
});

export default async (req, res) => {
  app(req, res);
};