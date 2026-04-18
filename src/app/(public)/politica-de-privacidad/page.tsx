import { LegalPageLayout } from '@/components/layout/legal-page-layout';

export default function PrivacidadPage() {
  const lastUpdated = "17 de Abril de 2026";

  return (
    <LegalPageLayout
      title="Pol&iacute;tica de Privacidad"
      lastUpdated={lastUpdated}
    >
      <p>
        La C&aacute;mara de Mujeres Empresarias de Bolivia &mdash; CAMEBOL Cochabamba (&quot;nosotros&quot;, &quot;nuestro&quot;) se compromete a proteger su privacidad. Esta Pol&iacute;tica de Privacidad explica c&oacute;mo recopilamos, usamos y compartimos su informaci&oacute;n personal cuando visita <strong>camebolcochabamba.com</strong> o utiliza nuestros servicios.
      </p>

      <h3>1. Informaci&oacute;n que Recopilamos</h3>
      <p>Podemos recopilar los siguientes tipos de informaci&oacute;n:</p>
      <ul>
        <li><strong>Informaci&oacute;n de contacto:</strong> Nombre, correo electr&oacute;nico, n&uacute;mero de tel&eacute;fono (al llenar formularios de contacto o afiliaci&oacute;n).</li>
        <li><strong>Informaci&oacute;n empresarial:</strong> Nombre de empresa, cargo, rubro, NIT, matr&iacute;cula de comercio (para solicitudes de afiliaci&oacute;n).</li>
        <li><strong>Informaci&oacute;n profesional:</strong> Empresa, sector (para el Directorio de Asociadas).</li>
        <li><strong>Datos de autenticaci&oacute;n:</strong> Si inicia sesi&oacute;n con Google, recibimos su nombre y correo electr&oacute;nico de su cuenta de Google.</li>
        <li><strong>Informaci&oacute;n t&eacute;cnica:</strong> Direcci&oacute;n IP, tipo de navegador, p&aacute;ginas visitadas (a trav&eacute;s de cookies y herramientas de an&aacute;lisis).</li>
        <li><strong>Fotograf&iacute;a y firma digital:</strong> Proporcionadas voluntariamente durante el proceso de afiliaci&oacute;n.</li>
      </ul>

      <h3>2. Uso de la Informaci&oacute;n</h3>
      <p>Utilizamos su informaci&oacute;n para:</p>
      <ul>
        <li>Procesar solicitudes de afiliaci&oacute;n y contacto.</li>
        <li>Brindar los servicios y beneficios de la c&aacute;mara.</li>
        <li>Mantener y actualizar el Directorio de Asociadas.</li>
        <li>Enviarle boletines informativos y convocatorias a eventos (con su consentimiento).</li>
        <li>Mejorar nuestro sitio web y servicios.</li>
        <li>Cumplir con obligaciones legales.</li>
      </ul>

      <h3>3. Compartir Informaci&oacute;n</h3>
      <p>No vendemos ni alquilamos su informaci&oacute;n personal a terceros. Podemos compartir su informaci&oacute;n con:</p>
      <ul>
        <li><strong>Proveedores de servicios:</strong> Google (Firebase) para hosting, autenticaci&oacute;n y almacenamiento de datos.</li>
        <li><strong>Aliados estrat&eacute;gicos:</strong> Solo con su consentimiento expl&iacute;cito para oportunidades de networking.</li>
        <li><strong>Autoridades legales:</strong> Si es requerido por ley.</li>
      </ul>

      <h3>4. Sus Derechos</h3>
      <p>Usted tiene derecho a:</p>
      <ul>
        <li>Acceder a su informaci&oacute;n personal.</li>
        <li>Corregir informaci&oacute;n inexacta.</li>
        <li>Solicitar la eliminaci&oacute;n de sus datos.</li>
        <li>Oponerse al procesamiento de sus datos.</li>
      </ul>
      <p>Para ejercer estos derechos, cont&aacute;ctenos en: <strong>info@camebolcochabamba.com</strong></p>

      <h3>5. Seguridad</h3>
      <p>Implementamos medidas de seguridad razonables para proteger su informaci&oacute;n, incluyendo cifrado en tr&aacute;nsito (HTTPS) y controles de acceso a nivel de base de datos. Sin embargo, ninguna transmisi&oacute;n por Internet es 100% segura.</p>

      <h3>6. Cambios a esta Pol&iacute;tica</h3>
      <p>Podemos actualizar esta pol&iacute;tica ocasionalmente. Le notificaremos sobre cambios significativos publicando la nueva pol&iacute;tica en nuestro sitio web con la fecha de la &uacute;ltima actualizaci&oacute;n.</p>
    </LegalPageLayout>
  );
}
