import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terminos = () => {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones - ET Agency</title>
        <meta name="description" content="Lee nuestros términos y condiciones de servicio." />
      </Helmet>
      <div className="container-custom section-padding min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Términos y Condiciones</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Bienvenido a ET Agency. Al acceder y utilizar nuestro sitio web y servicios, 
            aceptas cumplir y estar sujeto a los siguientes términos y condiciones de uso. 
            Por favor, léelos detenidamente.
          </p>
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al utilizar nuestros servicios, aceptas estos Términos y Condiciones, 
            así como nuestra Política de Privacidad. Si no estás de acuerdo con 
            alguna parte de estos términos, no debes utilizar nuestros servicios.
          </p>
          <h2>2. Servicios Ofrecidos</h2>
          <p>
            ET Agency ofrece servicios de diseño web, desarrollo de tiendas online, 
            mantención de sitios web, optimización SEO e integraciones. Los detalles 
            específicos de cada servicio se acordarán en un contrato individual.
          </p>
          <h2>3. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, 
            imágenes y software, es propiedad de ET Agency o de sus proveedores de contenido 
            y está protegido por las leyes de derechos de autor.
          </p>
          <h2>4. Limitación de Responsabilidad</h2>
          <p>
            ET Agency no será responsable de ningún daño directo, indirecto, incidental, 
            especial o consecuente que resulte del uso o la imposibilidad de usar nuestros 
            servicios.
          </p>
          <h2>5. Modificaciones de los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier 
            momento. Las modificaciones entrarán en vigor inmediatamente después de su 
            publicación en el sitio web. Es tu responsabilidad revisar estos términos 
            periódicamente.
          </p>
          <h2>6. Ley Aplicable</h2>
          <p>
            Estos Términos y Condiciones se rigen e interpretan de acuerdo con las leyes 
            de Chile. Cualquier disputa que surja en relación con estos términos será 
            sometida a la jurisdicción exclusiva de los tribunales de Santiago, Chile.
          </p>
          <h2>7. Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor 
            contáctanos en info@etagency.cl.
          </p>
        </div>
      </div>
    </>
  );
};

export default Terminos;