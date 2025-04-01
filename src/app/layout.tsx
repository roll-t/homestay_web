
import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";


export const metadata: Metadata = {
    title: "Next.js App",
    description: "A modern Next.js 15 application",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <ThemeProvider>
                    <SessionProviderWrapper session={session}>
                        {children}
                    </SessionProviderWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
