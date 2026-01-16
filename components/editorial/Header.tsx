"use client";

import React from 'react';
import {
    Heart,
    Search,
    ShoppingBag,
    User,
    Menu
} from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/stores';
import { cn } from '@/lib/utils';

export const Header = () => {
    const totalItems = useCartStore((state) => state.getTotalItems());

    const navLinks = [
        { label: 'BROWSE', href: '/catalogo' },
        { label: 'PRE-ORDERS', href: '/pre-orders' },
        { label: 'GENRES', href: '/categories' },
        { label: 'RECORD CLUB', href: '/club' },
        { label: 'EVENTS', href: '/events' },
        { label: 'ABOUT', href: '/about' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white text-black border-b border-transparent transition-all pointer-events-auto">
            {/* Top Bar: Logo & Actions */}
            <div className="container mx-auto px-6 py-6 flex items-center justify-between relative">

                {/* Placeholder for left symmetry or mobile menu */}
                <div className="flex md:hidden">
                    <button className="p-2 -ml-2 hover:opacity-70 transition-opacity">
                        <Menu size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Center Logo */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
                    <Link href="/" className="block group">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none group-hover:opacity-80 transition-opacity">
                            Flying Out
                        </h1>
                        <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase block mt-1">
                            Record Store
                        </span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 ml-auto z-10">
                    <span className="text-xs font-bold hidden md:block cursor-pointer hover:opacity-70">
                        NZD $
                    </span>

                    <button className="p-2 hover:opacity-70 transition-opacity hidden md:block">
                        <User size={20} strokeWidth={1.5} />
                    </button>

                    <button className="p-2 hover:opacity-70 transition-opacity hidden md:block">
                        <Search size={20} strokeWidth={1.5} />
                    </button>

                    <button className="p-2 hover:opacity-70 transition-opacity hidden md:block">
                        <Heart size={20} strokeWidth={1.5} />
                    </button>

                    <Link href="/cart" className="p-2 hover:opacity-70 transition-opacity relative group">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white text-[9px] font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Bottom Bar: Navigation (Desktop) */}
            <div className="hidden md:flex justify-center pb-6">
                <nav className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-xs font-bold tracking-widest uppercase hover:opacity-60 transition-opacity hover:underline underline-offset-4 decoration-1"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};
