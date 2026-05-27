# Fundación Toma Nuestra Mano — Sitio web + Plataforma educativa

Proyecto **Next.js 14 (App Router)** para la **Fundación Toma Nuestra Mano Para Tu Desarrollo Social Integral** (ESAL, NIT 900.363.058-9, Bogotá D.C.).

Incluye sitio público institucional + plataforma de cursos para estudiantes con certificación.

---

## Stack

- **Next.js 14.2.35** (App Router, Server + Client Components)
- **TypeScript 5** + **Tailwind CSS 3**
- **Clean Architecture** (domain / application / infrastructure / presentation)
- **anime.js v4** + **framer-motion** (animaciones)
- **Keycloak (PKCE)** para auth real + modo demo con mock users
- **@react-pdf/renderer** (certificados, solo client-side)
- **Cloudflare Pages** (deploy) vía `@cloudflare/next-on-pages`

---

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # build Next.js estándar
```

### Rutas

**Sitio público** (route group `(public)` con Navbar + Footer compartidos):

| Ruta | Descripción |
|---|---|
| `/` | Home con secciones scrolleables |
| `/quienes-somos` | Misión, visión, historia + video corporativo |
| `/que-hacemos` | 7 áreas de trabajo oficiales |
| `/programas` | Catálogo de programas |
| `/cursos` | Catálogo de cursos por programa |
| `/contacto` | Dirección, teléfonos, correo |
| `/transparencia` | NIT, ESAL, inscripción CCB S0037201 |

**Plataforma educativa** (layout custom, protegida por middleware):

| Ruta | Descripción |
|---|---|
| `/auth/login`, `/auth/register`, `/auth/callback` | Flujo de autenticación |
| `/plataforma` | Dashboard estudiante |
| `/plataforma/programa/[programId]` | Detalle programa + cursos |
| `/plataforma/programa/[programId]/curso/[courseId]/seccion/[order]` | Lección con video + quiz |
| `/plataforma/programa/[programId]/curso/[courseId]/certificado` | Certificado PDF |

---

## Deploy en Cloudflare Pages

El proyecto está configurado con **`@cloudflare/next-on-pages`** para deploy en Cloudflare Pages con edge runtime.

### Build local (verificación)

```bash
npm run pages:build          # genera .vercel/output/static
npm run pages:preview        # corre wrangler pages dev local
```

> **Nota Windows:** El build local requiere **Developer Mode activado** + **reboot** para que el token de usuario incluya `SeCreateSymbolicLinkPrivilege`. Sin esto, vercel CLI falla con `EPERM symlink`. Cloudflare Pages builder (Linux) no tiene este problema.

### Configuración del formulario Cloudflare Pages

| Campo | Valor |
|---|---|
| Production branch | `Juancode_v0` |
| Framework preset | `Next.js` (o `None`) |
| Build command | `npm run pages:build` |
| Build output directory | `.vercel/output/static` |
| Environment variable | `NODE_VERSION = 20` |
| Compatibility flags (Production) | `nodejs_compat` |
| Compatibility flags (Preview) | `nodejs_compat` |

### Variables de entorno en CF Pages

Solo necesarias si activas Keycloak real (ver sección Autenticación):

- `NEXT_PUBLIC_KEYCLOAK_URL`
- `NEXT_PUBLIC_KEYCLOAK_REALM`
- `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID`
- `NEXT_PUBLIC_APP_URL`

Sin estas variables, la plataforma corre en **modo demo** con usuarios mock (ver abajo).

### Notas técnicas del adapter

- Todas las páginas exportan `export const runtime = 'edge'` (forzado por next-on-pages).
- `.npmrc` con `legacy-peer-deps=true` (peer mismatch Next 14.2 vs adapter ≥14.3).
- `@react-pdf/renderer` se externaliza **solo en runtime nodejs**, no en edge (rompería el bundle). Ver `next.config.mjs`.
- `@react-pdf/renderer` **NO es edge-compatible** — solo importarlo desde client components con `dynamic import` (ver `CertificateView.tsx`).

---

## Autenticación

La plataforma tiene **dos modos**: Keycloak real (producción) y mock (demo/local).

### Modo demo (sin Keycloak)

Activo cuando `NEXT_PUBLIC_KEYCLOAK_URL` está vacío. Usuarios hardcoded en `src/lib/mockUsers.ts`:

| Rol | Email | Contraseña |
|---|---|---|
| Estudiante | `sofia@tomanuestramano.org` | `Sofia2025*` |
| Docente + Estudiante | `carlos@tomanuestramano.org` | `Carlos2025*` |
| Admin + Docente + Estudiante | `laura@tomanuestramano.org` | `Laura2025*` |

> ⚠️ **Estas credenciales son públicas en el repositorio.** Para producción real, configura Keycloak.

### Modo Keycloak (producción)

Flujo **Authorization Code + PKCE**. Variables requeridas (ver `.env.example`):

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_KEYCLOAK_URL` | URL base del servidor Keycloak | `https://auth.tudominio.com` |
| `NEXT_PUBLIC_KEYCLOAK_REALM` | Nombre del realm | `toma-nuestra-mano` |
| `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` | Client ID de la app | `plataforma-estudiante` |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app | `https://tudominio.com` |

#### Configurar el servidor Keycloak

1. Accede a la consola de administración de Keycloak
2. Crea un nuevo **Realm** (ej: `toma-nuestra-mano`)
3. Ve a **Clients → Create client** y configura:
   - **Client ID**: `plataforma-estudiante`
   - **Client type**: `Public`
   - **Standard flow**: activado
   - **Direct access grants**: desactivado

4. En **Valid redirect URIs** agrega:
   ```
   http://localhost:3000/auth/callback
   https://tudominio.com/auth/callback
   ```

5. En **Valid post logout redirect URIs** agrega:
   ```
   http://localhost:3000
   https://tudominio.com
   ```

6. En **Web origins** agrega:
   ```
   http://localhost:3000
   https://tudominio.com
   ```

### Roles

El sistema reconoce roles del JWT (`realm_access.roles` + `resource_access.<clientId>.roles`):

| Rol | Acceso |
|---|---|
| `estudiante` | Plataforma de cursos |
| `docente` | Plataforma + gestión de contenidos |
| `admin` | Acceso completo |

Para asignar roles: **Realm roles → Create role** y luego asígnalos a los usuarios.

---

## Arquitectura

Clean Architecture, 4 capas:

```
src/
  domain/          # entidades + interfaces de repositorio (TypeScript puro)
  application/     # casos de uso — orquestan domain
  infrastructure/  # StaticXRepository (datos hardcoded) + KeycloakAuthRepository
  presentation/    # componentes React + hooks
  lib/
    di.ts          # inyección de dependencias manual (server)
    diClient.ts    # inyección client-side
    tokens.ts      # constantes de paleta
    keycloak.ts    # singleton Keycloak
    mockUsers.ts   # usuarios demo
  middleware.ts    # protección de rutas /plataforma + /auth
```

Para agregar una sección/feature, ver `CLAUDE.md`.

---

## Tests (legacy)

Hay un archivo `src/__tests__/auth/keycloakAuthRepository.test.ts.bak` deshabilitado (sin runner instalado). Para reactivar:

```bash
npm install -D jest ts-jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
mv src/__tests__/auth/keycloakAuthRepository.test.ts.bak src/__tests__/auth/keycloakAuthRepository.test.ts
npx jest src/__tests__/auth/
```

---

Hecho con ♥ por **JuanCode** · TPZ INFORMATICA LTDA
