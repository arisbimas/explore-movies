import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movies Explorer",
  description: "Explore, search, and discover movies powered by TMDB.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <QueryProvider>
          <div className="w-full mx-auto max-w-7xl flex-1 pt-4 px-4 sm:px-3 lg:px-8">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
