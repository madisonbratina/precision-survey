// next.config.mjs
//maintenance
const nextConfig = {
  async redirects() {
    return process.env.MAINTENANCE_MODE === 'ON'
      ? [
          {
            source: '/((?!maintenance).*)',
            destination: '/maintenance',
            permanent: false
          }
        ]
      : [];
  }
};

export default nextConfig;
