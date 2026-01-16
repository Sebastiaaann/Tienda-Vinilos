import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Tienda de Vinilos",
    description: "Tu destino definitivo para encontrar los mejores vinilos en Chile",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={`${montserrat.variable} ${openSans.variable}`}>
            <body className="font-sans antialiased text-text-dark bg-warm-beige">
                <QueryProvider>
                    {children}
                    <Toaster position="top-right" duration={3000} richColors closeButton />
                </QueryProvider>
            </body>
        </html>
    );
}
