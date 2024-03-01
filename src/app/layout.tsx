"use client";
import { Inter } from "next/font/google";
import { ModuleProvider } from "@/context/module-context";
import { BooksProvider } from "@/context/books-context";
import { ReservesProvider } from "@/context/reserves-context";
import { CopiesProvider } from "@/context/copies-context";
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
            <CopiesProvider>
              <ModuleProvider>{children}</ModuleProvider>
            </CopiesProvider>
          </ReservesProvider>
        </BooksProvider>
      </body>
    </html>
  );
}
