'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ target, duration = 1500, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const frameRef = useRef<number>();

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const currentCount = Math.min(target, Math.floor((progress / duration) * target));
        setCount(currentCount);

        if (progress < duration) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
            setCount(target);
        }
      };
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [inView, target, duration]);

  return <span ref={ref} className={className}>{count.toLocaleString('es')}</span>;
}
