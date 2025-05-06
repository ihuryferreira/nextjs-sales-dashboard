import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProgressProviderWrapper from "./components/progress";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard de Vendas",
  description: "Acompanhe e analise seus resultados em tempo real. Tenha acesso a métricas detalhadas, gráficos intuitivos e insights estratégicos para otimizar suas vendas e maximizar seus lucros.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://nextjs-sales-dashboard.vercel.app/"), // Alterado para um domínio público

  openGraph: {
    title: "Dashboard de Vendas",
    description: "Acompanhe e analise seus resultados em tempo real. Tenha acesso a métricas detalhadas, gráficos intuitivos e insights estratégicos para otimizar suas vendas e maximizar seus lucros.",
    url: "https://nextjs-sales-dashboard.vercel.app",
    siteName: "Dashboard de Vendas",
    images: [
      {
        url: "https://nextjs-sales-dashboard.vercel.app/imagem-de-preview.jpg", // URL da imagem correta
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt-BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dashboard de Vendas",
    description: "Acompanhe e analise seus resultados em tempo real.",
    images: ["https://nextjs-sales-dashboard.vercel.app/imagem-de-preview.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta property="og:title" content="Dashboard de Vendas" />
        <meta property="og:description" content="Acompanhe e analise seus resultados em tempo real." />
        <meta property="og:image" content="https://nextjs-sales-dashboard.vercel.app/imagem-de-preview.jpg?v=1" />
        <meta property="og:url" content="https://nextjs-sales-dashboard.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard de Vendas" />
        <meta name="twitter:description" content="Acompanhe e analise seus resultados em tempo real." />
        <meta name="twitter:image" content="https://nextjs-sales-dashboard.vercel.app/imagem-de-preview.jpg?v=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProgressProviderWrapper>
          {children}
        </ProgressProviderWrapper>
      </body>
    </html>
  );
}
