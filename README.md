# Backoffice base

Base para sistemas de backoffice: autenticación, gestión de usuarios y empresas, roles y layout con el design system (Panda CSS).

Sirve como punto de partida para forks (multitenant o no). Lo específico de cada dominio vive en su propio fork.

## Scripts

- `pnpm dev`: servidor de desarrollo
- `pnpm static-gen`: genera `styled-system` (Panda CSS)
- `pnpm build`: build de producción
- `pnpm lint`: ESLint
- `pnpm test`: tests con Vitest

## Estructura

- `src/components/ui`: componentes compartidos del design system
- `src/components/Sidenav`: navegación lateral (las entradas se definen en `Sidenav.config.ts`)
- `src/domain/constants/routes.constant.ts`: rutas y roles con acceso
- `src/pages`: Login, Users, Companies, MyCompany, Profile

## Crear un fork

1. Agregar las rutas del dominio en `routes.constant.ts` y `AppPrivate.tsx`.
2. Agregar las entradas del menú en `Sidenav.config.ts`.
3. Cambiar el título en `index.html` y el branding en `PublicLayout.tsx`.
