"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = [
    { name: 'VINILOS', href: '/catalogo?category=vinilos', variant: 'yellow' },
    { name: 'TORNAMESAS', href: '/catalogo?category=tornamesas', variant: 'default' },
    { name: 'CÁPSULAS Y AGUJAS', href: '/catalogo?category=capsulas', variant: 'default' },
    { name: 'PARLANTES', href: '/catalogo?category=parlantes', variant: 'default' },
    { name: 'AUDÍFONOS', href: '/catalogo?category=audifonos', variant: 'default' },
    { name: 'AMPLIFICADORES', href: '/catalogo?category=amplificadores', variant: 'default' },
    { name: 'PRE PHONO', href: '/catalogo?category=pre-phono', variant: 'default' },
    { name: 'PACKS', href: '/catalogo?category=packs', variant: 'black' },
];

export default function CategoryFilter() {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');

    return (
        <section className="py-12 px-6 md:px-12 bg-neutral-50 border-b border-gray-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {categories.map((cat, i) => {
                    const isActive = currentCategory === cat.href.split('=')[1];
                    const isYellow = cat.variant === 'yellow';
                    const isBlack = cat.variant === 'black';

                    return (
                        <Link
                            key={i}
                            href={cat.href}
                            className={`
                            flex items-center justify-center py-4 px-6 
                            rounded-full border border-black 
                            text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase 
                            transition-all duration-200 cursor-scale
                            hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            ${isActive ? 'bg-black text-white' : ''}
                            ${!isActive && isYellow ? 'bg-[#FFFACD] hover:bg-[#FFFACD]' : ''}
                            ${!isActive && isBlack ? 'bg-black text-white hover:bg-black hover:text-white' : ''}
                            ${!isActive && !isYellow && !isBlack ? 'bg-white hover:bg-neutral-50' : ''}
                        `}
                        >
                            {cat.name}
                        </Link>
                    )
                })}
            </div>

            {(currentCategory) && (
                <div className="text-center mt-8">
                    <Link
                        href="/catalogo"
                        className="text-xs font-bold underline text-gray-500 hover:text-black uppercase tracking-widest"
                    >
                        Clear Filters
                    </Link>
                </div>
            )}
        </section>
    );
}
