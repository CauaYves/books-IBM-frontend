"use client";
import { Inter } from "next/font/google";
import { ModuleProvider } from "@/context/module-context";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ModuleProvider>{children}</ModuleProvider>
      </body>
    </html>
  );
}
