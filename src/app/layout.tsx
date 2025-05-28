import type { Metadata } from "next";
import "@/styles/globals.css";

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
    <html lang="ko">
      <head>
        <link rel="icon" href="/icon/infomax.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
