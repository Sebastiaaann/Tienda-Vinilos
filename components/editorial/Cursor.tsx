"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor = () => {
    const [hovered, setHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only run on client and if not touch device generally
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            const target = e.target as HTMLElement;
            // check if hovering over something clickable or interactive
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.cursor-scale')
            ) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    // Hide on touch devices via CSS
    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black z-[9999] pointer-events-none mix-blend-difference bg-white hidden md:block"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                scale: hovered ? 2.5 : 1,
            }}
        >
            <motion.div
                className="w-full h-full bg-black rounded-full opacity-0"
                animate={{ opacity: hovered ? 0.1 : 0 }}
            />
        </motion.div>
    );
};
