import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Hi",
  description: "",
};

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <div className="bg-background">
            {children}
            <Toaster />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
