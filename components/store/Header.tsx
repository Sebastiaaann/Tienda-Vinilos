"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Selected unique images from public/images
    const featuredImage = "/images/a-clockwork-orange-md-web.jpg";
    const productImages = [
        { src: "/images/Eraserhead-1200x675.jpeg", artist: "David Lynch", title: "Eraserhead OST" },
        { src: "/images/blue-velvet-md-web.jpg", artist: "Angelo Badalamenti", title: "Blue Velvet" },
        { src: "/images/chungking-express-md-web.jpg", artist: "Wong Kar-Wai", title: "Chungking Express" },
        { src: "/images/fallen-angels-md-web.jpg", artist: "Wong Kar-Wai", title: "Fallen Angels" },
        { src: "/images/fantastic-planet-md-web.jpg", artist: "Alain Goraguer", title: "La Planète Sauvage" },
    ];

    return (
        <div className="w-full bg-white text-black font-sans relative z-50 border-b border-gray-100">
            {/* Top Bar - Logo (Centered) */}
            <div className="container mx-auto px-6 py-8 flex flex-col items-center relative">
                {/* Mobile Menu Button - Absolute Left */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 lg:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Logo */}
                <Link href="/" className="text-3xl font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-opacity mb-6">
                    Record Store
                </Link>

                {/* Right Icons - Absolute Right */}
                <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 items-center gap-6">
                    <button className="hover:opacity-70">
                        <Search size={20} />
                    </button>
                    <button className="hover:opacity-70">
                        <User size={20} />
                    </button>
                    <button className="hover:opacity-70">
                        <ShoppingBag size={20} />
                    </button>
                </div>

                {/* Navigation Bar - Centered below logo */}
                <nav className="hidden lg:flex justify-center items-center gap-12 text-xs font-bold tracking-widest uppercase">

                    {/* Mega Menu Trigger */}
                    <div className="group">
                        <Link href="/catalogo" className="py-2 hover:text-gray-600 transition-colors">
                            EXPLORAR
                        </Link>

                        {/* Mega Menu Content */}
                        <div className="absolute top-full left-0 w-full bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 mt-4 border-t border-gray-100 text-left normal-case tracking-normal">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-4 gap-8 p-12">
                                    {/* Column 1: Featured */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-sm">DESTACADO</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li><Link href="/search?q=new" className="hover:text-black">Salido esta semana</Link></li>
                                            <li><Link href="/search?q=just-landed" className="hover:text-black">Recién Llegados</Link></li>
                                            <li><Link href="/search?q=recent" className="hover:text-black">Lanzamientos Recientes</Link></li>
                                            <li><Link href="/search?q=local" className="hover:text-black">Artistas Chilenos</Link></li>
                                            <li><Link href="/search?q=top10" className="hover:text-black">Top 10 Semanal</Link></li>
                                            <li><Link href="/search?q=essential" className="hover:text-black">Esenciales</Link></li>
                                            <li><Link href="/search?q=sale" className="hover:text-black">Ofertas</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 2: Format */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-sm">FORMATO</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li><Link href="/vinilos" className="hover:text-black">Vinilos</Link></li>
                                            <li><Link href="/cds" className="hover:text-black">CDs</Link></li>
                                            <li><Link href="/tornamesas" className="hover:text-black">Tornamesas</Link></li>
                                            <li><Link href="/cuidado-vinilos" className="hover:text-black">Cuidado de Vinilos</Link></li>
                                            <li><Link href="/casetes" className="hover:text-black">Casetes</Link></li>
                                            <li><Link href="/libros" className="hover:text-black">Libros</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 3: Gifts */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-sm">REGALOS</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li><Link href="/gift-cards" className="hover:text-black">Tarjetas de Regalo</Link></li>
                                            <li><Link href="/under-60" className="hover:text-black">Vinilos bajo $60</Link></li>
                                            <li><Link href="/merch" className="hover:text-black">Merch</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 4: Featured Image */}
                                    <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                                        <Image
                                            src={featuredImage}
                                            alt="Featured"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/10" />
                                    </div>
                                </div>

                                {/* Bottom Product Row */}
                                <div className="border-t border-gray-100 p-8 bg-gray-50/50">
                                    <div className="grid grid-cols-5 gap-6">
                                        {productImages.map((product, index) => (
                                            <div key={index} className="group/product cursor-pointer">
                                                <div className="aspect-square bg-gray-200 rounded-sm mb-3 relative overflow-hidden">
                                                    <Image
                                                        src={product.src}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover group-hover/product:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <h4 className="font-bold text-sm truncate">{product.artist}</h4>
                                                <p className="text-xs text-gray-500 truncate">{product.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/pre-orders" className="hover:text-gray-600 transition-colors">PRE-ORDENES</Link>
                    <Link href="/genres" className="hover:text-gray-600 transition-colors">GENEROS</Link>
                    <Link href="/club" className="hover:text-gray-600 transition-colors">CLUB DE VINILOS</Link>
                    <Link href="/points" className="hover:text-gray-600 transition-colors">PUNTOS FJO</Link>
                    <Link href="/events" className="hover:text-gray-600 transition-colors">EVENTOS</Link>
                    <Link href="/about" className="hover:text-gray-600 transition-colors">NOSOTROS</Link>
                </nav>
            </div>

            {/* Mobile Menu Content (Simplified) */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg p-6 flex flex-col gap-4 z-50">
                    <Link href="/browse" className="text-lg font-medium">EXPLORAR</Link>
                    <Link href="/pre-orders" className="text-lg font-medium">PRE-ORDENES</Link>
                    <Link href="/genres" className="text-lg font-medium">GENEROS</Link>
                    <Link href="/club" className="text-lg font-medium">CLUB DE VINILOS</Link>
                    <Link href="/events" className="text-lg font-medium">EVENTOS</Link>
                    <Link href="/about" className="text-lg font-medium">NOSOTROS</Link>
                </div>
            )}
        </div>
    );
}
