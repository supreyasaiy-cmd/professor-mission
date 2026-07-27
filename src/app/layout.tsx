import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { displayFont, englishFont, interfaceFont } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supreya Atipongchai",
  description: "A personal career-learning game for short practice and review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${interfaceFont.variable} ${displayFont.variable} ${englishFont.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
