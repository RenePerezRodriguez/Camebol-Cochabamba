"use client"

import { useState, useEffect, useCallback } from "react";

type ScrollDirection = "up" | "down" | null;

interface UseScrollOptions {
  threshold?: number;
}

export function useScroll(options: UseScrollOptions = {}) {
    const { 
      threshold = 20, 
    } = options;

    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [direction, setDirection] = useState<ScrollDirection>(null);
    const [progress, setProgress] = useState(0);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Set scroll progress
        if (scrollHeight > 0) {
            setProgress((currentScrollY / scrollHeight) * 100);
        } else {
            setProgress(0);
        }

        // Set scrolled status
        setScrolled(currentScrollY > threshold);
        
        // Set scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > threshold) {
            setDirection("down");
        } else if (currentScrollY < lastScrollY) {
            setDirection("up");
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY, threshold]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return { scrolled, direction, progress };
}
