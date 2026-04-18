import { LegalPageLayout } from '@/components/layout/legal-page-layout';

export default function CookiesPage() {
  const lastUpdated = "17 de Abril de 2026";

  return (
    <LegalPageLayout
      title="Pol&iacute;tica de Cookies"
      lastUpdated={lastUpdated}
    >
      <p>
        La C&aacute;mara de Mujeres Empresarias de Bolivia &mdash; CAMEBOL Cochabamba utiliza cookies en <strong>camebolcochabamba.com</strong> para mejorar su experiencia de navegaci&oacute;n y analizar el tr&aacute;fico del sitio.
      </p>

      <h3>1. &iquest;Qu&eacute; son las Cookies?</h3>
      <p>
        Las cookies son peque&ntilde;os archivos de texto que se guardan en su dispositivo cuando visita un sitio web. Ayudan al sitio a recordar informaci&oacute;n sobre su visita, como sus preferencias, facilitando su pr&oacute;xima visita.
      </p>

      <h3>2. Cookies que Utilizamos</h3>
      <ul>
        <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento b&aacute;sico del sitio, como mantener la sesi&oacute;n de autenticaci&oacute;n (Firebase Authentication / Google Sign-In).</li>
        <li><strong>Cookies de Rendimiento y An&aacute;lisis:</strong> Google Analytics nos ayuda a entender c&oacute;mo los visitantes interact&uacute;an con el sitio, qu&eacute; p&aacute;ginas visitan y cu&aacute;nto tiempo permanecen.</li>
        <li><strong>Cookies de Funcionalidad:</strong> Permiten recordar sus preferencias, como el tema visual (claro/oscuro).</li>
      </ul>

      <h3>3. Cookies de Terceros</h3>
      <p>Nuestro sitio utiliza servicios de Google (Firebase, Analytics) que pueden establecer sus propias cookies. Le recomendamos consultar la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Pol&iacute;tica de Privacidad de Google</a> para m&aacute;s informaci&oacute;n.</p>

      <h3>4. C&oacute;mo Controlar las Cookies</h3>
      <p>
        Puede configurar su navegador para rechazar cookies o para que le avise cuando se env&iacute;en. Sin embargo, si desactiva las cookies esenciales, algunas funcionalidades del sitio (como el inicio de sesi&oacute;n) podr&iacute;an no funcionar correctamente.
      </p>
      <p>Para gestionar cookies en los navegadores m&aacute;s comunes:</p>
      <ul>
        <li><strong>Chrome:</strong> Configuraci&oacute;n &rarr; Privacidad y seguridad &rarr; Cookies</li>
        <li><strong>Firefox:</strong> Opciones &rarr; Privacidad y seguridad &rarr; Cookies</li>
        <li><strong>Edge:</strong> Configuraci&oacute;n &rarr; Cookies y permisos del sitio</li>
        <li><strong>Safari:</strong> Preferencias &rarr; Privacidad &rarr; Cookies</li>
      </ul>

      <h3>5. Contacto</h3>
      <p>
        Si tiene preguntas sobre nuestra pol&iacute;tica de cookies, cont&aacute;ctenos en: <strong>info@camebolcochabamba.com</strong>
      </p>
    </LegalPageLayout>
  );
}
