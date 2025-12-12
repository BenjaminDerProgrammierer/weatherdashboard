import type { Metadata } from "next";
import { CloudSun } from "lucide-react";

import "./globals.css";

import ModeSwitcher from "@/components/ModeSwitcher";

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
        <header>
          <h1 className="title">
            <CloudSun
              size={32}
            />
            Weather
          </h1>
          <ModeSwitcher />
        </header>
        <main>
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
