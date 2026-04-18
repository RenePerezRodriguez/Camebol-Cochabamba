# Contribuir

Guía para colaboradores del sitio web de CAMEBOL Cochabamba.

## Requisitos

- Node.js 20+
- pnpm 10+
- Variables de entorno en `.env.local` (solicitar al administrador)

## Setup

```bash
git clone https://github.com/RenePerezRodriguez/Camebol-Cochabamba.git
cd Camebol-Cochabamba
pnpm install
pnpm dev
```

## Flujo de trabajo

1. Crea una rama desde `main`:

   ```bash
   git checkout -b feat/descripcion-corta
   ```

2. Haz tus cambios.
3. Verifica que el build pase:

   ```bash
   pnpm build
   ```

4. Haz commit con un mensaje descriptivo:

   ```bash
   git commit -m "feat: descripción del cambio"
   ```

5. Abre un Pull Request hacia `main`.

## Convenciones

- **Commits**: Usar [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`).
- **TypeScript**: No usar `any`. Tipos explícitos en funciones exportadas.
- **Imports**: Usar alias `@/` para imports desde `src/`.
- **Estilos**: Tailwind CSS. No CSS custom salvo `globals.css`.
- **Server Actions**: Toda mutación de datos en `src/actions/` con validación Zod y guard `requireAdmin()`.

## Estructura clave

| Directorio | Propósito |
| --- | --- |
| `src/app/(public)/` | Páginas públicas del sitio |
| `src/app/admin/` | Panel de administración |
| `src/actions/` | Server Actions (CRUD Firestore) |
| `src/components/` | Componentes React reutilizables |
| `src/lib/` | Firebase config, utilidades, schemas |

## Reportar problemas

Usa las [plantillas de issues](https://github.com/RenePerezRodriguez/Camebol-Cochabamba/issues/new/choose) en GitHub.
