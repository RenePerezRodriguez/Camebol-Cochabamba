'use client';

import { useState, useEffect } from 'react';

export function useABTest<T>(testName: string, variants: T[]): T {
    const [variant, setVariant] = useState<T>(variants[0]);

    useEffect(() => {
        try {
            const storageKey = `ab-test-${testName}`;
            const storedVariantIndex = localStorage.getItem(storageKey);

            if (storedVariantIndex !== null) {
                const index = parseInt(storedVariantIndex, 10);
                if (index >= 0 && index < variants.length) {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setVariant(variants[index]);
                    return;
                }
            }

            // Assign new variant
            const newIndex = Math.floor(Math.random() * variants.length);
            localStorage.setItem(storageKey, newIndex.toString());
            setVariant(variants[newIndex]);

            // Optional: Log assignment to analytics here

        } catch (error) {
            console.error('Error in useABTest:', error);
            // Fallback to control (first variant)
            setVariant(variants[0]);
        }
    }, [testName, variants]);

    return variant;
}
