import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../../lib/gsap-setup';
import { ArrowRight } from 'lucide-react';
import { Globe } from './Globe';
import { Button } from './NeonButton';

export default function AnimatedHero() {
  const comp = useRef(null);
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Profit Margins.", "Client Results.", "Average Retainer.", "Client Retention.", "Recurring Revenue."],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3600);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-col-anim', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative w-full px-6 md:px-[6vw] lg:px-[4vw] xl:px-12 border-b border-white/10 flex flex-col justify-start pt-[38vh] pb-16 md:justify-center md:pt-0 md:pb-0 min-h-[100dvh] md:min-h-screen bg-transparent overflow-hidden">
      {/* Mobile Globe — tucked behind text, right side */}
      <div className="absolute top-[52%] -translate-y-[50%] -right-[22%] w-[60vw] h-[60vw] md:hidden pointer-events-none mix-blend-screen opacity-25 z-0">
        <div className="absolute inset-0 bg-accent/3 blur-[40px] rounded-full pointer-events-none"></div>
        <Globe size={280} dotColor="rgba(178, 133, 27, ALPHA)" markerColor="rgba(178, 133, 27, 1)" arcColor="rgba(178, 133, 27, 0.4)" autoRotateSpeed={0.00055} />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto hero-col-anim flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-between gap-6 lg:gap-4">
        {/* LEFT COLUMN — left-aligned always */}
        <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col items-start pr-0 md:pr-4 z-20">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="font-mono text-[9px] md:text-[10px] text-accent tracking-[0.15em] md:tracking-[0.2em] uppercase border border-accent/20 rounded-full px-3 md:px-4 py-1 md:py-1.5 leading-snug">
              <span className="md:hidden">Introducing CloseStack</span>
              <span className="hidden md:inline">Your offer has a ceiling. Our system removes it.</span>
            </span>
          </div>

          <h1 className="text-[clamp(2.1rem,7.5vw,5.2rem)] font-sans font-bold uppercase tracking-tighter text-white leading-[1.05] mb-4 md:mb-6 w-full whitespace-nowrap">
            Multiply Your SMMA's <br />
            <span className="relative flex w-full md:min-w-max justify-start overflow-hidden text-accent font-drama italic font-normal tracking-tight leading-[1] mix-blend-lighten mt-1 md:mt-3 h-[1.35em] pr-4">
              {titles.map((title, index) => {
                const isCurrent = titleNumber === index;
                const isPrev = index === (titleNumber === 0 ? titles.length - 1 : titleNumber - 1);
                return (
                  <motion.span
                    key={index}
                    className="absolute left-0 whitespace-nowrap pb-2"
                    style={{ willChange: 'transform, opacity' }}
                    initial={{ opacity: 0, y: "100%" }}
                    transition={{ type: "tween", duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                    animate={{
                      y: isCurrent ? "0%" : (isPrev ? "-100%" : "100%"),
                      opacity: isCurrent ? 1 : 0
                    }}
                  >
                    {title}
                  </motion.span>
                );
              })}
            </span>
          </h1>

          <p className="font-mono text-[8px] md:text-base text-white/30 md:text-white/50 uppercase tracking-[0.1em] md:tracking-widest max-w-[280px] md:max-w-xl mb-5 md:mb-8 leading-relaxed">
            Same book of business. One powerful addition. First month pays for itself.
          </p>

          <div className="flex flex-col items-start gap-4 w-full md:w-auto hero-col-anim border-t border-white/5 pt-5 md:pt-10">
            <Button
              onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
              variant="default"
              size="default"
              className="flex items-center justify-center gap-1.5 text-[10px] md:text-base px-4 py-2 md:px-8 md:py-3"
            >
              See If You Qualify
              <ArrowRight className="opacity-80 w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Globe */}
        <div className="hidden md:flex absolute lg:relative top-[50%] lg:top-auto left-1/2 lg:left-auto -translate-x-[60%] sm:-translate-x-[55%] md:-translate-x-1/2 lg:translate-x-12 -translate-y-1/2 lg:-translate-y-0 w-[70vw] lg:w-[45%] items-center justify-center lg:justify-end min-h-[500px] pointer-events-none lg:pointer-events-auto mix-blend-screen opacity-55 lg:opacity-85 lg:hover:opacity-100 transition-opacity duration-1000 lg:scale-[1.2] lg:origin-right z-0 lg:z-10">
          <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
          <Globe size={700} dotColor="rgba(178, 133, 27, ALPHA)" markerColor="rgba(178, 133, 27, 1)" arcColor="rgba(178, 133, 27, 0.4)" autoRotateSpeed={0.00092} />
        </div>
      </div>
    </section>
  );
}
