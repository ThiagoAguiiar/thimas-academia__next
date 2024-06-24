import { IChildren } from "@/types/children";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SlideOverProvider } from "@/contexts/slideOverContext";
import { Toaster } from "@/components/ui/toaster";

import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<IChildren>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SlideOverProvider>
          <NextTopLoader />
          {children}
          <Toaster />
        </SlideOverProvider>
      </body>
    </html>
  );
}