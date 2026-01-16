"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Music, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[#1A1A1A] text-neutral-400 text-sm font-sans pt-20 pb-10 border-t-4 border-retro-red">

            {/* Newsletter Section */}
            <div className="container mx-auto px-6 md:px-12 mb-20">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                    <div className="max-w-xl">
                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase mb-4 tracking-tight">
                            Únete al Club del Vinilo
                        </h3>
                        <p className="text-base leading-relaxed">
                            Recibe novedades, lanzamientos exclusivos y ofertas especiales. Sin spam, solo buena música.
                        </p>
                    </div>
                    <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-0 w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="w-full h-12 px-4 bg-transparent border border-neutral-600 focus:border-white text-white outline-none rounded-none placeholder:text-neutral-600 transition-colors"
                        />
                        <button className="h-12 px-8 bg-[#FCD758] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors">
                            Suscribirse
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-neutral-800 my-12" />

            {/* Grid Links Section */}
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-8 h-8 bg-retro-red flex items-center justify-center rounded-sm">
                            <Music className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-widest uppercase">Tienda de Vinilos</span>
                    </div>
                    <p className="leading-relaxed text-xs">
                        Tu destino definitivo para encontrar los mejores vinilos en Chile. Curamos nuestra colección con pasión por la música analógica y el sonido de alta fidelidad.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div>
                    <h4 className="text-[#FCD758] font-bold uppercase tracking-widest mb-6 text-xs">Enlaces Rápidos</h4>
                    <ul className="space-y-3 text-xs font-bold uppercase tracking-wide">
                        <li><Link href="/catalogo" className="text-white hover:text-retro-red transition-colors">Catálogo Completo</Link></li>
                        <li><Link href="/novedades" className="text-white hover:text-retro-red transition-colors">Novedades</Link></li>
                        <li><Link href="/ofertas" className="text-white hover:text-retro-red transition-colors">Ofertas</Link></li>
                        <li><Link href="/blog" className="text-white hover:text-retro-red transition-colors">Blog Musical</Link></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div>
                    <h4 className="text-[#FCD758] font-bold uppercase tracking-widest mb-6 text-xs">Servicio al Cliente</h4>
                    <ul className="space-y-3 text-xs font-bold uppercase tracking-wide">
                        <li><Link href="#" className="text-white hover:text-retro-red transition-colors">Información de Envíos</Link></li>
                        <li><Link href="#" className="text-white hover:text-retro-red transition-colors">Cambios y Devoluciones</Link></li>
                        <li><Link href="#" className="text-white hover:text-retro-red transition-colors">Términos y Condiciones</Link></li>
                        <li><Link href="#" className="text-white hover:text-retro-red transition-colors">Política de Privacidad</Link></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="text-[#FCD758] font-bold uppercase tracking-widest mb-6 text-xs">Contacto</h4>
                    <ul className="space-y-4 text-xs">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-retro-red shrink-0" />
                            <span>Av. Providencia 1234, Oficina 505<br />Santiago, Chile</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-retro-red shrink-0" />
                            <span>+56 9 1234 5678</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-retro-red shrink-0" />
                            <span className="hover:text-white cursor-pointer">contacto@tiendavinilos.cl</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-neutral-800 mt-20 pt-8">
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs">© 2026 TIENDA DE VINILOS. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest mr-2">Pagos Seguros:</span>
                        <div className="flex gap-2 opacity-50">
                            {/* Mock Icons for payment */}
                            <div className="w-8 h-5 bg-neutral-700 rounded-sm"></div>
                            <div className="w-8 h-5 bg-neutral-700 rounded-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
