"use client";

import React from 'react';
import Link from 'next/link';

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

export const Intro = () => {
    return (
        <section className="py-20 px-6 md:px-12 bg-[#FDFBF7] text-black"> {/* Background slightly warm like reference */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {categories.map((cat, i) => (
                    <Link
                        key={i}
                        href={cat.href}
                        className={`
              flex items-center justify-center py-4 px-6 
              rounded-full border border-black 
              text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase 
              transition-all duration-200 cursor-scale
              hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              ${cat.variant === 'yellow' ? 'bg-[#FFFACD] hover:bg-[#FFFACD]' : ''}
              ${cat.variant === 'black' ? 'bg-black text-white hover:bg-black hover:text-white' : ''}
              ${cat.variant === 'default' ? 'bg-white hover:bg-neutral-50' : ''}
            `}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};
