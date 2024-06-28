import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Navigation from "./ui/Navigation/Navigation";
import { ComponentProps } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "loevray's lab",
  description: "다양한 기능을 가진 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex min-h-screen">
          <Navigation />
          <div className="flex-1 min-h-screen p-5">{children}</div>
        </div>
      </body>
    </html>
  );
}
