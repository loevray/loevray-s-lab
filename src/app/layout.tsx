import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Navigation from "./ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "심플 룰렛",
  description: "간단한 룰렛입니다!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex overflow-y-auto w-screen min-h-screen">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
