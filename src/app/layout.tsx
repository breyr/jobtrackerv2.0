import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobtrackerv2",
  description: "Simple job tracker app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en" className="dark">
        <body>
          <Providers>
            <main className={`flex flex-col min-h-screen ${inter} antialiased`}>
              <Nav />
              {children}
              <Footer />
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
