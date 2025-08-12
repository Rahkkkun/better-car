import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/hooks/use-theme";
import { dark } from '@clerk/themes'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "BETTER-CAR",
  description: "Find your Dream Car with Better-Car AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className}`}>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen"> {children}</main>
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
