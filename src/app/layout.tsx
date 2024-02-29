"use client";
import { Inter } from "next/font/google";
import { ModuleProvider } from "@/context/module-context";
import { BooksProvider } from "@/context/books-context";
import { ReservesProvider } from "@/context/reserves-context";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <BooksProvider>
          <ReservesProvider>
            <ModuleProvider>{children}</ModuleProvider>
          </ReservesProvider>
        </BooksProvider>
      </body>
    </html>
  );
}
