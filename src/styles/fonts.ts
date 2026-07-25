import { IBM_Plex_Sans_Thai, Manrope } from "next/font/google";

export const interfaceFont = IBM_Plex_Sans_Thai({
  variable: "--font-interface",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const displayFont = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
