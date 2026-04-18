'use client';
// Force rebuild timestamp: 12

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useABTest } from '@/hooks/use-ab-test';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';

const CTA_VARIANTS = ['Afíliate', 'Únete Ahora'];

// Variants for staggered text animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

export function HeroSection() {
  const ctaText = useABTest('home-cta-text', CTA_VARIANTS);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force video playback on mount to bypass some browser restrictions
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Autoplay blocked by browser - expected on some devices
      });
    }
  }, []);

  return (
    <section
      className="relative text-white overflow-hidden min-h-screen flex flex-col items-center justify-center pt-24 pb-32"
    >
      {/* 1. Background Video + Dark Overlay (Cinematic Feel) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute w-full h-full object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/studio-862112545-ad13b.firebasestorage.app/o/home%2Fvideos%2Fhero-background.mp4?alt=media"
        />
        {/* Lighter Gradient for Text Readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
      </div>

      {/* 2. Main Content (CENTERED) */}
      <div className="container mx-auto relative z-20 px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Staggered Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight mb-8 uppercase tracking-tighter text-white drop-shadow-2xl">
            <motion.span variants={itemVariants} className="block text-white/90">FORMA PARTE DE LA MAYOR</motion.span>
            <motion.span variants={itemVariants} className="block text-white">RED DE MUJERES</motion.span>
            <motion.span variants={itemVariants} className="block text-brand-pink mt-2">EMPRESARIAS</motion.span>
          </h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            Somos una Cámara Multisectorial que construye y conecta espacios para visibilizar el liderazgo de las mujeres en el ámbito empresarial boliviano.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center w-full items-center">
            <MagneticButton strength={0.2}>
              <Button size="lg" className="bg-brand-pink text-white hover:bg-brand-pink/90 font-bold text-lg px-12 py-8 shadow-[0_0_40px_-10px_var(--brand-pink)] transition-all duration-300 w-full sm:w-auto rounded-full hover:scale-105" asChild>
                <Link href="/afiliate">
                  {ctaText} <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/10 font-medium text-lg px-12 py-8 backdrop-blur-md transition-all duration-300 w-full sm:w-auto rounded-full hover:scale-105" asChild>
                <Link href="/servicios">
                  Ver Beneficios
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Bottom Shape Divider (Triangle UP) & Text */}
      <div className="absolute bottom-0 left-0 w-full z-10 flex flex-col justify-end items-center pointer-events-none">
        {/* Text JUNTAS SOMOS IMPARABLES */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-xs sm:text-sm font-bold tracking-[0.3em] text-white/80 uppercase mb-8 drop-shadow-lg"
        >
          Juntas somos imparables
        </motion.span>

        {/* White Triangle Pointing UP (Standard CSS Triangle) */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-0 h-0 
                 border-l-[40px] md:border-l-[60px] border-l-transparent 
                 border-r-[40px] md:border-r-[60px] border-r-transparent 
                 border-b-[40px] md:border-b-[60px] border-b-white"
          />
        </motion.div>
      </div>
    </section>
  );
}
