"use client";

import React from 'react';
import { motion } from 'framer-motion';

const letterAnim = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

const containerAnim = {
    animate: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        }
    }
};

export const Hero = () => {
    const title = "EL SONIDO";
    const subtitle = "ORIGINAL";

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white text-black pt-40 overflow-hidden">
            <div className="w-full px-4 text-center z-10">
                <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter mb-4 select-none flex flex-col items-center justify-center py-[2vw] mix-blend-exclusion">
                    <motion.div
                        variants={containerAnim}
                        initial="initial"
                        animate="animate"
                        className="flex overflow-hidden"
                    >
                        {title.split('').map((char, i) => (
                            <motion.span key={i} variants={letterAnim} className="inline-block relative">
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={containerAnim}
                        initial="initial"
                        animate="animate"
                        className="flex overflow-hidden text-transparent bg-clip-text bg-gradient-to-b from-black to-neutral-400"
                    >
                        {subtitle.split('').map((char, i) => (
                            <motion.span key={i} variants={letterAnim} className="inline-block relative">
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                        <motion.span
                            variants={letterAnim}
                            className="text-2xl md:text-5xl align-top ml-2 font-light inline-block mt-[1vw] text-black"
                        >
                            ®
                        </motion.span>
                    </motion.div>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-xl md:text-3xl text-neutral-600 font-medium tracking-tight mt-8 max-w-2xl mx-auto"
                >
                    Colección curada de vinilos para el melómano moderno.
                </motion.p>
            </div>

            {/* Abstract Background Elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 border border-black/5 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 border border-black/5 rounded-full animate-reverse-spin pointer-events-none" />
        </section>
    );
};
