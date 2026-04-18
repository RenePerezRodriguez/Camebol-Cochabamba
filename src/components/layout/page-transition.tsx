'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} className="w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {children}
                </motion.div>

                {/* Diamond Wipe Effect Overlay - Moved inside the keyed div to avoid multiple direct children in wait mode */}
                <motion.div
                    className="fixed inset-0 z-[60] pointer-events-none bg-primary"
                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                    animate={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                    exit={{ clipPath: ["polygon(0 0, 0 0, 0 100%, 0% 100%)", "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
