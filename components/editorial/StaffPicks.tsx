"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const staffMembers = [
    {
        id: 'rosetta',
        name: "ROSETTA'S STAFF PICKS",
        image: "/images/50699-solo-sunny-0-2000-0-3000-crop.jpg",
        picks: [
            { id: '101', artist: 'UPCHUCK', album: "I'm Nice Now (Vinyl LP)", label: 'Domino', price: 62.00, image: '/images/blue-velvet-md-web (2).jpg' },
            { id: '102', artist: 'STEVEN JULIEN', album: "Time / Wraap't (Vinyl LP)", label: 'Apron Records', price: 56.00, image: '/images/eraserhead-md-web (2).jpg' },
            { id: '103', artist: 'WHATEVER THE WEATHER', album: "Whatever the Weather II", label: 'Ghostly', price: 45.00, image: '/images/chungking-express-md-web (3).jpg' },
        ]
    },
    {
        id: 'matthew',
        name: "MATTHEW'S STAFF PICKS",
        image: "/images/G4Xt2OSasAEr8ZX.jpeg",
        picks: [
            { id: '201', artist: 'RADIOHEAD', album: "In Rainbows", label: 'XL', price: 79.00, image: '/images/suspiria-md-web (1).jpg' },
            { id: '202', artist: 'APHEX TWIN', album: "Selected Ambient Works", label: 'Warp', price: 89.00, image: '/images/paris-texas-md-web (1).jpg' },
        ]
    },
    { id: 'nick', name: "NICK'S STAFF PICKS", image: "/images/Russell_Young_Mick_Rock_Lou_Reed_vbawgv.jpg", picks: [] },
    { id: 'hunter', name: "HUNTER'S STAFF PICKS", image: "/images/1977-e28093-the-year-punk-broke-box-set-inner3.jpg", picks: [] },
    { id: 'sophie', name: "SOPHIE'S STAFF PICKS", image: "/images/lilya-4ever-md-web.jpg", picks: [] },
];

export const StaffPicks = () => {
    const [activeTab, setActiveTab] = useState(staffMembers[0].id);
    const activeStaff = staffMembers.find(m => m.id === activeTab) || staffMembers[0];

    return (
        <section className="py-20 bg-white text-black">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 px-6 border-b border-neutral-100 pb-4">
                {staffMembers.map((member) => (
                    <button
                        key={member.id}
                        onClick={() => setActiveTab(member.id)}
                        className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${activeTab === member.id
                            ? 'border-black text-black'
                            : 'border-transparent text-neutral-400 hover:text-black'
                            }`}
                    >
                        {member.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-6 md:px-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col lg:flex-row gap-8"
                    >
                        {/* Staff Photo */}
                        <div className="w-full lg:w-1/4">
                            <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100">
                                <img src={activeStaff.image} alt={activeStaff.name} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Picks Grid */}
                        <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-6">
                            {(activeStaff.picks.length > 0 ? activeStaff.picks : staffMembers[0].picks).map((pick, i) => (
                                <Link href={`/productos/${pick.id}`} key={i} className="group cursor-scale">
                                    <div className="aspect-square relative overflow-hidden bg-neutral-50 mb-4">
                                        <img src={pick.image} alt={pick.album} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black font-heading uppercase text-sm">{pick.artist}</h4>
                                        <p className="text-xs text-neutral-600 font-medium leading-tight">{pick.album}</p>
                                        <p className="text-[10px] text-neutral-400 font-bold uppercase">{pick.label}</p>
                                        <p className="text-xs font-mono font-bold mt-2">${pick.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};
