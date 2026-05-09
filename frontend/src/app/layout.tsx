import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Starfield } from "@/components/layout/Starfield";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ASPANDAS",
  description: "Сообщество астрономов Казахстана и Центральной Азии.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="page-shell">
          <Starfield />
          <Navbar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
