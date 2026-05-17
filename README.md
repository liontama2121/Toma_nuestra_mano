This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Autenticación con Keycloak

La plataforma educativa usa **Keycloak** con flujo **Authorization Code + PKCE** para autenticar estudiantes.

### Variables de entorno requeridas

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_KEYCLOAK_URL` | URL base del servidor Keycloak | `https://auth.tudominio.com` |
| `NEXT_PUBLIC_KEYCLOAK_REALM` | Nombre del realm | `toma-nuestra-mano` |
| `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` | Client ID de la app | `plataforma-estudiante` |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app | `https://tudominio.com` |

> Si `NEXT_PUBLIC_KEYCLOAK_URL` está vacío, la plataforma usa autenticación simulada (modo desarrollo).

### Configurar el servidor Keycloak

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

### Roles disponibles

El sistema reconoce estos roles del token JWT de Keycloak:

| Rol | Acceso |
|---|---|
| `estudiante` | Plataforma de cursos |
| `docente` | Plataforma + gestión de contenidos |
| `admin` | Acceso completo |

Para asignar roles: **Realm roles → Create role** y luego asígnalos a los usuarios.

### Ejecutar tests de autenticación

Primero instala el runner de tests:

```bash
npm install -D jest ts-jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

Luego ejecuta:

```bash
npx jest src/__tests__/auth/
```
