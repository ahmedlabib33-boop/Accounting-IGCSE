/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The teacher playbook is read from disk at request time, so it must ship with the route.
  outputFileTracingIncludes: { "/admin/playbook": ["./content/**/*"] },
  async headers() {
    return [
      {
        // The service worker must always be fetched fresh so updates reach installed apps.
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
