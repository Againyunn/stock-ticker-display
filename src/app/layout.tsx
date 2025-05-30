import type { Metadata } from "next";
import "@/styles/globals.css";
import {
  wooridaumB,
  wooridaumL,
  wooridaumR,
} from "./fonts/wooribank/wooridaum";

export const metadata: Metadata = {
  title: "연합인포맥스",
  description: "연합인포맥스 제공 전광판",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${wooridaumB.variable} ${wooridaumR.variable} ${wooridaumL.variable} `}
    >
      <head>
        <link rel="icon" href="/icon/infomax.svg" />
      </head>
      <body className="font-wooridaumR">{children}</body>
    </html>
  );
}
