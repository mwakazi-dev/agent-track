import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import { getUser } from "@/lib/dal";
import LayoutWrapper from "@/components/LayoutWrapper";

const fonts = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Track App",
  description:
    "Agent Track is a platform designed for admins to monitor and manage agents' on-site activities in real time.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.className} suppressHydrationWarning>
        <AuthProvider>
          <LayoutWrapper user={user?.data}>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

// Mona Sans
