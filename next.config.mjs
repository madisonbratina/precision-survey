/** @type {import('next').NextConfig} */
const nextConfig = {};

// export default nextConfig;

// next.config.mjs
const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'ON';

export default {
  async redirects() {
    if (isMaintenanceMode) {
      return [
        {
          source: '/((?!maintenance).*)',
          destination: '/maintenance',
          permanent: false,
        },
      ];
    } else {
      return nextConfig;
    }
  },
};
