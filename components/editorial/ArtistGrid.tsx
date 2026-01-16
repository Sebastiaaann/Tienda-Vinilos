"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const artists = [
    { name: 'LANA DEL REY', image: '/images/blue-velvet-md-web (1).jpg' },
    { name: 'MITSKI', image: '/images/happy-together-md-web (1).jpg' },
    { name: 'BILLIE', image: '/images/fallen-angels-md-web (2).jpg' },
    { name: 'TAYLOR SWIFT', image: '/images/masculin-feminin-md-web (1).jpg' },
    { name: 'MAG BAY', image: '/images/chungking-express-md-web (2).jpg' },
    { name: 'CHARLI XCX', image: '/images/masculin-feminin-md-web (2).jpg' },
    { name: 'MAC MILLER', image: '/images/la-chimera-md-web (1).jpg' },
    { name: 'OLIVIA', image: '/images/the-thing-md-web.jpg' },
    { name: 'ELLIOTT SMITH', image: '/images/paris-texas-md-web (1).jpg' },
    { name: 'TATE', image: '/images/pierrot-le-fou-md-web (1).jpg' },
    { name: 'SABRINA', image: '/images/eraserhead-md-web (1).jpg' },
    { name: 'JEFF BUCKLEY', image: '/images/fantastic-planet-md-web (1).jpg' },
    { name: 'NIRVANA', image: '/images/suspiria-md-web (1).jpg' },
    { name: 'RADIOHEAD', image: '/images/the-elephant-man-md-web.jpg' },
];

const toImageSrc = (src: string) => encodeURI(src);

export const ArtistGrid = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-neutral-100/50 text-black">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-12 gap-x-6">
                {artists.map((artist, i) => (
                    <Link href={`/catalogo?search=${artist.name}`} key={i} className="group flex flex-col items-center gap-4 cursor-scale">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full aspect-square relative rounded-3xl overflow-hidden shadow-sm"
                        >
                            <Image
                                src={toImageSrc(artist.image)}
                                alt={artist.name}
                                fill
                                sizes="(min-width: 1024px) 12vw, (min-width: 768px) 20vw, 40vw"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </motion.div>
                        <span className="text-xs md:text-sm font-black font-heading uppercase tracking-widest text-center group-hover:underline underline-offset-4">
                            SHOP {artist.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};
