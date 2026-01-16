"use client";

import React from 'react';
import Image from 'next/image';

// Placeholder images for the marquee
const covers = [
    "/images/0886445151930_600.jpg",
    "/images/1900x1900-000000-80-0-0.jpg",
    "/images/Eraserhead-1200x675.jpeg",
    "/images/VEXZT7ZZIFAPFPGY3Q7O44UWYE.jpg",
    "/images/a-clockwork-orange-md-web.jpg",
    "/images/blue-velvet-md-web (5).jpg",
    "/images/chungking-express-md-web (5).jpg",
    "/images/cure-md-web.jpg",
    "/images/fantastic-planet-md-web (5).jpg",
    "/images/inland-empire-md-web.jpg",
    "/images/memories-of-murder-md-web.jpg",
    "/images/possession-md-web (1).jpg",
    "/images/the-elephant-man-md-web (2).jpg",
    "/images/twin-peaks-md-web.jpg"
];

export const Marquee = () => {
    return (
        <section className="py-12 bg-white overflow-hidden cursor-scale">
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

            <div className="group w-full overflow-hidden">
                <div
                    className="flex gap-4 md:gap-8 animate-marquee w-max"
                >
                    {/* Quadruple the array to ensure smooth loop */}
                    {[...covers, ...covers, ...covers, ...covers].map((src, i) => (
                        <div
                            key={i}
                            className={`
                relative flex-shrink-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] overflow-hidden transition-all duration-500 hover:opacity-100 opacity-80
                ${i % 2 === 0 ? 'rounded-full' : 'rounded-none'}
              `}
                        >
                            <Image
                                src={src}
                                alt={`Album Cover ${i}`}
                                fill
                                sizes="(min-width: 768px) 300px, 200px"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110 hover:rotate-3"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
