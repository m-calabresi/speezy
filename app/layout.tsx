import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
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
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.variable} ${bricolageGrotesque.variable} font-sans`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
