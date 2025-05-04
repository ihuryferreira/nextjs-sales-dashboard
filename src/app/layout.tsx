import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard de Vendas",
  description: "Acompanhe e analise seus resultados em tempo real. Tenha acesso a métricas detalhadas, gráficos intuitivos e insights estratégicos para otimizar suas vendas e maximizar seus lucros.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("http://localhost:3000/"),
  openGraph: {
    title: "Dashboard de Vendas",
    description: "Acompanhe e analise seus resultados em tempo real. Tenha acesso a métricas detalhadas, gráficos intuitivos e insights estratégicos para otimizar suas vendas e maximizar seus lucros.",
    url: "http://localhost:3000/",
    siteName: "Dashboard de Vendas",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 600,
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="PT-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
