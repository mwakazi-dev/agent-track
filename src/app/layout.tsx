import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

const fonts = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Track App",
  description:
    "Agent Track is a platform designed for admins to monitor and manage agents' on-site activities in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

// Mona Sans
