"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useCallback } from "react";

export function useTour() {
    const startTour = useCallback((steps: { element: string, popover: { title: string, description: string, side?: string, align?: string } }[], tourId: string, force = false) => {
        const hasSeen = localStorage.getItem(`tour_${tourId}`);
        if (!force && hasSeen === "true") {
            return;
        }

        const driverObj = driver({
            showProgress: true,
            animate: true,
            nextBtnText: 'Siguiente →',
            prevBtnText: '← Anterior',
            doneBtnText: '¡Entendido!',
            progressText: '{{current}} de {{total}}',
            popoverClass: 'camebol-tour-theme',
            onDestroyStarted: () => {
                // If it's a forced tour (by button), we don't necessarily mark it as seen forever, 
                // but the auto-trigger logic usually checks this.
                localStorage.setItem(`tour_${tourId}`, "true");
                driverObj.destroy();
            },
            steps: steps as any
        });

        setTimeout(() => {
            driverObj.drive();
        }, 300);
    }, []);

    return { startTour };
}
