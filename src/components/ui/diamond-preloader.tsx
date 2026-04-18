'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DiamondPreloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial load or wait for resources
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust duration as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Diamond Pulse Animation */}
                        <motion.div
                            className="w-24 h-24 bg-primary/20 rotate-45 rounded-xl absolute"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                                rotate: [45, 90, 45]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="w-24 h-24 border-2 border-primary rotate-45 rounded-xl absolute"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [45, -45, 45]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2
                            }}
                        />

                        {/* Logo or Icon */}
                        <motion.div
                            className="relative z-10 bg-white p-4 rounded-full shadow-xl"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src="/img/logos/CAMEBOL Cochabamba Logotipo.webp"
                                alt="CAMEBOL Preloader"
                                className="h-8 w-auto"
                            />
                        </motion.div>

                        <motion.p
                            className="mt-12 text-primary font-bold tracking-widest text-sm uppercase"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            Cargando...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
