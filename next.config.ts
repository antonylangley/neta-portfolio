import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The project mirror's instructions are read-only; do not auto-rewrite them.
  agentRules: false,
  images: {
    qualities: [95],
  },
};
export default nextConfig;
