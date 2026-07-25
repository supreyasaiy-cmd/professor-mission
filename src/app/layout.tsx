import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { displayFont, interfaceFont } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "✦ Professor Mission ✦",
  description: "A personal career-learning game for short practice and review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${interfaceFont.variable} ${displayFont.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
