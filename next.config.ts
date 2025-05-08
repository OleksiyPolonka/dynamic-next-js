/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки TypeScript при сборке
  },
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ошибки ESLint при сборке
  },
};

module.exports = nextConfig;