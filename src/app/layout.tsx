import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./global.css";

import Navigation from "./ui/navigation/Navigation";
import ToastContainer from "./ui/common/toast/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "loevray's lab",
  description: "다양한 기능을 가진 사이트",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer />
        <div className="flex flex-col md:flex-row-reverse min-h-dvh overflow-y-auto">
          <div className="md:flex-1 min-h-dvh md:p-5">{children}</div>
          <Navigation />
        </div>
      </body>
    </html>
  );
}
