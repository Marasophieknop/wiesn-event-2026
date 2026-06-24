import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Wiesn-Event 2026 · Building Radar",
  description:
    "Ein Tag bei Building Radar: die neuesten KI-Entwicklungen für die Baubranche, Einblicke aus unserer Praxis – und danach gemeinsam aufs Oktoberfest. 22. September 2026, München.",
  openGraph: {
    title: "Wiesn-Event 2026 · Building Radar",
    description:
      "Erst die Insights, dann die Wiesn. KI für die Baubranche am Vormittag, Oktoberfest am Nachmittag. 22.09.2026 in München.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${roboto.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
