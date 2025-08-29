import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const poppins = Poppins({
    variable: "--font-poppins-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const bricolageGrotesque = Bricolage_Grotesque({
    variable: "--font-bricolage-grotesque-serif",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Speezy",
    description: "Managing expenses is easy!",
    keywords: ["speezy", "expense", "easy"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Speezy"
                />
            </head>
            <body className={`${poppins.variable} ${bricolageGrotesque.variable} h-dvh-safe w-full overflow-hidden font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <div className="from-background to-primary/40 scrollbar-hidden flex h-full w-full flex-col overflow-auto bg-gradient-to-br">{children}</div>
                    <Toaster
                        richColors
                        closeButton={false}
                        expand={false}
                        position="bottom-center"
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
