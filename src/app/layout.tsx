import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Jobtrackr",
  description:
    "Simple job tracker app built with Next.js, powered by Xata, Vercel, and Cloudflare",
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
            <main
              className={`flex flex-col min-h-screen ${inter.className} antialiased`}
            >
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
