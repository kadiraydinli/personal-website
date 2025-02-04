/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    nodejs_compat: true
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  // Hydration hatalarını önlemek için
  onDemandEntries: {
    // Sayfaların bellekte tutulma süresi
    maxInactiveAge: 25 * 1000,
    // Aynı anda bellekte tutulacak sayfa sayısı
    pagesBufferLength: 2,
  },
  // Hydration hatalarını önlemek için
  swcMinify: true,
  modularizeImports: {
    '@/app/constants': {
      transform: '@/app/constants/{{member}}'
    }
  }
};

export default config;
