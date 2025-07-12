import { i18n } from "./next-i18next.config";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  i18n,
};

export default nextConfig;
