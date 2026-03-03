import type { Metadata } from "next";
import { Playfair } from "next/font/google";
import "./globals.css";

const playfair = Playfair({
  subsets: ["cyrillic"],
  variable: "--font-playfair"
});


export const metadata: Metadata = {
  title: "Свето Писмо",
  description: "Свето Писмо - веб апликација која омогућава брзу претрагу стихова из Светог Писма.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body
        className={`${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
