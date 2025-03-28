import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
    title: "Next.js App",
    description: "A modern Next.js 15 application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <ThemeProvider>
                    <Navbar />
                    <main className="flex-1">
                        {children}
                        <ThemeToggle />
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
