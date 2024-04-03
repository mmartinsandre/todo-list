import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do list",
  description: "Um aplicativo simples de lista de tarefas desenvolvido com Node.js, Express e React/Next.js. Permite aos usuários cadastrar, visualizar, editar e excluir tarefas de forma fácil e intuitiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
