import { Kanit, Roboto, Sarabun } from "next/font/google";

export const interfaceFont = Sarabun({
  variable: "--font-interface",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const displayFont = Kanit({
  variable: "--font-display",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const englishFont = Roboto({
  variable: "--font-english",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
