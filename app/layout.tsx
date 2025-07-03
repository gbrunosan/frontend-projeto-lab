import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meu Projeto",
  description: "Projeto simples com Next.js e Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
