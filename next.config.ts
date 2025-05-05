import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/tabela",
        destination: "/tabelaView",
      },
    ];
  },
};

export default nextConfig;
