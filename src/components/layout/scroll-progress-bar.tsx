'use client';

import { Progress } from '@/components/ui/progress';

interface ScrollProgressBarProps {
  progress: number;
  scrolled: boolean;
}

export function ScrollProgressBar({ progress, scrolled }: ScrollProgressBarProps) {
  if (!scrolled) {
    return null;
  }
  
  return (
    <Progress value={progress} className="absolute bottom-0 w-full h-0.5 rounded-none" />
  );
}
