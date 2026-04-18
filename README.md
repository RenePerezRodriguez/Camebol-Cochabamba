# CAMEBOL Cochabamba

Sitio web oficial de la **Cámara de Mujeres Empresarias de Bolivia — Filial Cochabamba**.

Plataforma institucional para conectar, informar y empoderar a las mujeres empresarias de la región.

**Producción:** [camebolcochabamba.com](https://camebolcochabamba.com)

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 + Radix UI |
| Backend | Firebase (Auth, Firestore, Storage) |
| Hosting | Firebase App Hosting (us-central1) |
| Package manager | pnpm |

## Requisitos

- Node.js 20+
- pnpm 10+
- Cuenta de Firebase con proyecto configurado

## Instalación

```bash
git clone https://github.com/RenePerezRodriguez/Camebol-Cochabamba.git
cd Camebol-Cochabamba
pnpm install
```

Crea un archivo `.env.local` en la raíz con las variables de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

## Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

## Estructura

```text
src/
├── app/           # Rutas y páginas (App Router)
│   ├── (public)/  # Páginas públicas
│   ├── admin/     # Panel de administración
│   └── api/       # Rutas API
├── actions/       # Server Actions (Firestore CRUD)
├── components/    # Componentes UI
├── hooks/         # Custom hooks
└── lib/           # Utilidades, Firebase config, schemas
```

## Despliegue

El proyecto se despliega automáticamente a Firebase App Hosting. La configuración está en `apphosting.yaml`.

Para desplegar reglas de Firebase manualmente:

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## Licencia

Este software es propiedad exclusiva de CAMEBOL Cochabamba. Todos los derechos reservados. Ver [LICENSE](LICENSE).
