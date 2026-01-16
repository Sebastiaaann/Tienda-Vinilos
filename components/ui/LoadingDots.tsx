"use client";

import { motion } from "framer-motion";

export const LoadingDots = () => {
    return (
        <div className="flex space-x-2 justify-center items-center h-full min-h-[50vh]">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-3 h-3 bg-gray-400 rounded-full"
                    animate={{
                        y: ["0%", "-50%", "0%"],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};
