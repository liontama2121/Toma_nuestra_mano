/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ⚠️ @react-pdf/renderer NO es edge-compatible (usa Node fs/stream/Buffer).
    // Lo aislamos del bundle server para que NO sea enlazado por error desde un
    // server component. Solo debe importarse vía dynamic import en client
    // components (ver src/presentation/components/plataforma/certificate/CertificateView.tsx).
    // Si esto se rompe, el build de Cloudflare Pages (@cloudflare/next-on-pages) falla.
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Solo Node server: externalizar (evita bundle pesado en SSR).
    // En edge runtime los externals NO resuelven y rompen el build,
    // por eso filtramos por nextRuntime.
    if (isServer && nextRuntime === 'nodejs') {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        '@react-pdf/renderer',
      ];
    }
    return config;
  },
};

export default nextConfig;
