import { LegalPageLayout } from '@/components/layout/legal-page-layout';

export default function TerminosPage() {
  const lastUpdated = "17 de Abril de 2026";

  return (
    <LegalPageLayout
      title="T&eacute;rminos y Condiciones"
      lastUpdated={lastUpdated}
    >
      <p>
        Bienvenido al sitio web de la C&aacute;mara de Mujeres Empresarias de Bolivia &mdash; CAMEBOL Cochabamba. Al acceder y utilizar <strong>camebolcochabamba.com</strong>, usted acepta cumplir con los siguientes t&eacute;rminos y condiciones.
      </p>

      <h3>1. Uso del Sitio</h3>
      <ul>
        <li>El contenido de este sitio es para informaci&oacute;n general y uso de las asociadas y el p&uacute;blico interesado.</li>
        <li>No est&aacute; permitido el uso del sitio para fines ilegales o no autorizados.</li>
        <li>Usted se compromete a no interferir con la seguridad o el funcionamiento del sitio.</li>
      </ul>

      <h3>2. Propiedad Intelectual</h3>
      <p>
        Todo el contenido (textos, logos, im&aacute;genes, dise&ntilde;o) es propiedad de CAMEBOL Cochabamba o de sus licenciantes. Est&aacute; prohibida la reproducci&oacute;n, distribuci&oacute;n o modificaci&oacute;n sin autorizaci&oacute;n previa por escrito.
      </p>

      <h3>3. Afiliaci&oacute;n y Directorio</h3>
      <ul>
        <li>La informaci&oacute;n proporcionada para la afiliaci&oacute;n debe ser veraz y actual.</li>
        <li>CAMEBOL se reserva el derecho de admitir o rechazar solicitudes de afiliaci&oacute;n seg&uacute;n sus estatutos.</li>
        <li>El Directorio de Asociadas es para uso comercial leg&iacute;timo y networking; est&aacute; prohibido su uso para spam o acoso.</li>
      </ul>

      <h3>4. Cuentas de Usuario</h3>
      <p>
        El acceso administrativo al sitio requiere autenticaci&oacute;n mediante Google Sign-In. Usted es responsable de mantener la confidencialidad de su cuenta y de todas las actividades que ocurran bajo ella.
      </p>

      <h3>5. Enlaces a Terceros</h3>
      <p>
        Este sitio puede contener enlaces a sitios web de terceros (aliados, asociadas). No somos responsables del contenido ni de las pr&aacute;cticas de privacidad de esos sitios.
      </p>

      <h3>6. Limitaci&oacute;n de Responsabilidad</h3>
      <p>
        CAMEBOL Cochabamba no se hace responsable de da&ntilde;os directos, indirectos o consecuentes derivados del uso o la imposibilidad de uso de este sitio web.
      </p>

      <h3>7. Ley Aplicable</h3>
      <p>
        Estos t&eacute;rminos se rigen por las leyes del Estado Plurinacional de Bolivia. Cualquier disputa se resolver&aacute; en los tribunales de Cochabamba.
      </p>

      <h3>8. Contacto</h3>
      <p>
        Si tiene preguntas sobre estos t&eacute;rminos, cont&aacute;ctenos en: <strong>info@camebolcochabamba.com</strong>
      </p>
    </LegalPageLayout>
  );
}
