// next.config.mjs
import { NextConfig } from 'next';

/** @type {NextConfig} */
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
