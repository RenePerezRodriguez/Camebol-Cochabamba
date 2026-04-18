# CAMEBOL Cochabamba - Blueprint Técnico y de Contenido

## 1. Visión General
**Nombre de la App**: CAMEBOL Cochabamba
**Descripción**: Plataforma web oficial para la Cámara de Mujeres Empresarias de Bolivia - Filial Cochabamba.
**Stack Tecnológico**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Radix UI, Firebase Hosting.

## 2. Arquitectura de Contenido (Basado en Brochure Oficial)

### 2.1 Página de Inicio (`/`)
*   **Hero**: "Forma parte de la mayor red de mujeres empresarias y emprendedoras de Cochabamba".
*   **Estadísticas**: +1000 asociadas a nivel nacional, presencia en los 9 departamentos.
*   **Call to Action**: Únete a nuestra red colaborativa.

### 2.2 Quiénes Somos (`/quienes-somos`)
*   **Propósito**: Construir y conectar espacios de desarrollo, visibilizar a la mujer empresarial.
*   **Enfoque Transformativo de Género**:
    *   Reducir barreras.
    *   Visibilizar aporte económico.
    *   Mujeres en toma de decisiones.
    *   Incidencia en políticas públicas.
*   **Representación Institucional**: Defensa de intereses, promoción y alianzas (CECI, CNI, AMCHAM, etc.).

### 2.3 Servicios y Programas (`/servicios`)
Estructurado en áreas clave:
*   **Asesoramiento e Innovación Empresarial**:
    *   Funciones Gerenciales (Planeación, RRHH).
    *   Estrategia (Comercial, Marketing).
    *   Finanzas (Asesoría, Acceso a financiamiento).
    *   Legal y Administrativo (Corporativo, Contable, Tributario).
    *   Transformación Digital.
*   **Seguridad Industrial y Salud Ocupacional**:
    *   Medio Ambiente (Fichas ambientales, Gestión de residuos).
    *   Seguridad Industrial (Programas PSST, Representación ante Ministerio).

### 2.4 CAMEBOL Business Academy (`/academia`)
*   **Oferta**: Conferencias, talleres, networking.
*   **Programas Específicos**:
    *   Capacitaciones con Enfoque de Género (Alta Dirección).
    *   Programa de Mentoría (Expertos guiando a nuevos talentos).
    *   Programa de Formación para Emprendedoras (Estrategia, Legal, Liderazgo, Negociación).

### 2.5 Networking y Negocios (`/negocios` o `/asociadas`)
*   **Espacios**: Ruedas de Negocios, Misiones Comerciales, Ferias, Networking.
*   **Herramientas**:
    *   **Directorio de Empresas Asociadas**: Interconexión y prospección.
    *   **Catálogo de Descuentos y Promociones**: Fomento del consumo interno entre asociadas.
*   **Visibilización**: Reconocimientos a historias de éxito.

### 2.6 Afiliación (`/afiliate`)
Requisitos diferenciados:
*   **Empresas**: Formulario, NIT, Matrícula de comercio, Carta de representatividad (si aplica), Testimonio y Poder (si es sociedad).
*   **Emprendedoras**: Formulario, Fotocopia de C.I.
*   **Contacto**: Dirección (Av. Oquendo N° 690), Teléfonos, Email.

## 3. Arquitectura Técnica

### 3.1 Estructura del Sitio (App Router)
-   `/` (Inicio)
-   `/quienes-somos`
-   `/servicios`
-   `/academia` (Nueva sección sugerida por el contenido)
-   `/asociadas` (Directorio y Catálogo)
-   `/afiliate`
-   `/legal/*`

### 3.2 Componentes Clave
-   `ServiceCard`: Para mostrar los múltiples servicios de asesoría.
-   `PartnerLogoGrid`: Para las alianzas (CECI, CNI, etc.).
-   `MembershipRequirements`: Componente tipo "Tabs" para alternar entre requisitos de Empresa vs Emprendedora.
-   `AcademyProgram`: Tarjeta para cursos y programas de mentoría.

## 4. Sistema de Diseño

### 4.1 Paleta de Colores
Definida en `tailwind.config.ts`.
*   **Primario**: `#c41661` (Rosa CAMEBOL)
*   **Secundario**: `#770157` (Púrpura)
*   **Acentos**: `#450072` (Índigo), `#1f6b37` (Verde), `#FDC400` (Oro).

### 4.2 Tipografía
*   **Cuerpo**: 'PT Sans'
*   **Titulares**: 'PT Serif'

## 5. Estrategia de Datos
*   **Asociadas**: Base de datos para el Directorio y el Catálogo de Descuentos.
*   **Eventos**: Calendario para la Business Academy y Ferias.