
'use client';

import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

const Countdown = ({ targetDate }: { targetDate: Date }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const timer = setInterval(() => {
            const now = new Date();
            const diff = differenceInSeconds(targetDate, now);

            if (diff <= 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (60 * 60 * 24)),
                hours: Math.floor((diff / (60 * 60)) % 24),
                minutes: Math.floor((diff / 60) % 60),
                seconds: Math.floor(diff % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isClient, targetDate]);

    if (!isClient) {
        return null; // Or a placeholder
    }

    const isFuture = differenceInSeconds(targetDate, new Date()) > 0;
    
    if (!isFuture) {
        return <p className="text-xl font-semibold text-primary">¡El evento ya ha comenzado!</p>;
    }


    return (
        <div className="flex gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-3 w-20">
                    <span className="text-3xl font-bold text-primary">{value}</span>
                    <span className="text-xs text-muted-foreground uppercase">{unit}</span>
                </div>
            ))}
        </div>
    );
};

export default Countdown;
