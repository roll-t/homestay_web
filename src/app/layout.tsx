import "@/styles/globals.css"; // Import global styles
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next.js App",
    description: "A modern Next.js 15 application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <header>Header</header>
                <main>{children}</main>
                <footer>Footer</footer>
            </body>
        </html>
    );
}
