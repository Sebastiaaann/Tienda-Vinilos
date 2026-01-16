"use client";

import React from 'react';
import { Star } from 'lucide-react';

export const TextTicker = () => {
    return (
        <section className="py-4 bg-black text-white overflow-hidden border-y border-black">
            <div className="flex whitespace-nowrap animate-marquee">
                {/* Repeated content for seamless loop */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12 mx-6">
                        <span className="text-3xl font-black font-heading uppercase tracking-widest flex items-center gap-12">
                            ICONIC ARTISTS <Star className="w-6 h-6 fill-white text-white" />
                            CURATED SELECTION <Star className="w-6 h-6 fill-white text-white" />
                            SHOP THE LEGENDS <Star className="w-6 h-6 fill-white text-white" />
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};
