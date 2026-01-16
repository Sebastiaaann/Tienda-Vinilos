"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const vinyls = [
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
];

export default function VinylCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === "left" ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full py-12 bg-neutral-50 overflow-hidden group">
            {/* Scroll Buttons */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full border border-gray-200 shadow-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <button
                onClick={() => scroll("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full border border-gray-200 shadow-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <ArrowRight size={20} className="text-gray-600" />
            </button>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto px-12 no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {vinyls.map((src, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 snap-center"
                    >
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="absolute inset-0 bg-black/5 z-10 rounded-full pointer-events-none mix-blend-multiply" />
                            {/* Vinyl center hole visual effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-50 rounded-full z-20 border border-gray-300" />

                            <Image
                                src={src}
                                alt={`Vinyl ${i}`}
                                fill
                                className="object-cover animate-spin-slow hover:pause-spin"
                                style={{ animationDuration: '20s' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hover\:pause-spin:hover {
                    animation-play-state: paused;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
            `}</style>
        </div>
    );
}
