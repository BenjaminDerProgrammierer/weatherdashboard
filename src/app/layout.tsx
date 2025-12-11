import type { Metadata } from "next";
import { CloudSun } from "lucide-react";

import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Weather",
  description: "A sleek and modern weather dashboard application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Weather" />
      </head>
      <body>
        <main>
          <h1 className="title">
            <CloudSun
              size={32}
            />
            Weather
          </h1>
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
