import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getLocale } from "@/lib/i18n/server";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sun* Annual Awards 2025 — Root Further",
  description:
    "Lễ trao giải Sun* Annual Awards 2025 với chủ đề Root Further. Đếm ngược, hệ thống giải thưởng và phong trào Sun* Kudos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${montserrat.variable} h-full`}>
      <body className="min-h-full bg-saa-bg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
