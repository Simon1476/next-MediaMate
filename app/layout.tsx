import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./../context/AuthContext";
import Navbar from "@/components/navbar/Navbar";
import { FavoriteStoreProvider } from "@/providers/favorite-store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <FavoriteStoreProvider>
          <body className={inter.className}>
            {" "}
            <Navbar />
            {children}
          </body>
        </FavoriteStoreProvider>
      </AuthProvider>
    </html>
  );
}
