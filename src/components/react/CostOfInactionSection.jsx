import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap-setup';
import { X, Check, ArrowRight } from 'lucide-react';
import { GlowingEffect } from './GlowingEffect';
import { Button } from './NeonButton';

export default function CostOfInactionSection() {
  const withoutCardRef = useRef(null);
  const withCardRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered reveal for both cards
      if (withoutCardRef.current) {
        const withoutItems = withoutCardRef.current.querySelectorAll('.cost-item');
        withoutItems.forEach((item) => {
          gsap.fromTo(item,
            { opacity: 0.1, x: -20 },
            {
              opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 90%", once: true }
            }
          );
        });
      }
      if (withCardRef.current) {
        const withItems = withCardRef.current.querySelectorAll('.cost-item');
        withItems.forEach((item) => {
          gsap.fromTo(item,
            { opacity: 0, x: 25 },
            {
              opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 90%", once: true }
            }
          );
        });
      }
    });

    ctxRef.current = ctx;

    return () => {
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, []);

  const withoutItems = [
    "Revenue plateaus. Workload doesn't.",
    "Client churn eats what growth builds.",
    "Can't scale without hiring. Hiring kills margin.",
    "No moat. Easily replaced.",
  ];

  const withItems = [
    "More revenue. Same book of business.",
    "Clients stay longer. Churn drops.",
    "Irreplaceable to every client.",
    "No new headcount. Predictable income.",
    { text: "Adds ", highlight: "$5k–$15k MRR", rest: " without ad spend." },
    "Immediate, 24/7 hyper-responsive sales floor.",
  ];

  return (
    <section id="the-problem" className="w-full relative flex flex-col items-center bg-transparent py-20 md:py-28">
      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-15%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] opacity-[0.15] mix-blend-screen pointer-events-none -rotate-6" style={{ background: 'radial-gradient(ellipse at center, rgba(178, 133, 27, 0.35) 0%, rgba(178, 133, 27, 0) 60%)' }} />
      <div className="absolute bottom-[5%] right-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] opacity-[0.12] mix-blend-screen pointer-events-none rotate-6" style={{ background: 'radial-gradient(ellipse at center, rgba(178, 133, 27, 0.3) 0%, rgba(178, 133, 27, 0) 55%)' }} />

      {/* Header */}
      <div className="text-center mb-10 md:mb-20 pt-8 md:pt-32 relative z-20 shrink-0 px-6">
        <h2 className="text-3xl md:text-[clamp(2.5rem,5.5vw,5rem)] lg:text-7xl font-sans font-bold uppercase tracking-tighter leading-[0.9] drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d4d4d4] to-[#737373] inline" style={{ filter: 'drop-shadow(0px 2px 2px rgba(255,255,255,0.3))' }}>YOUR OFFER </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#b48618] to-[#5c4004] inline font-drama italic font-normal tracking-tight" style={{ filter: 'drop-shadow(0px 2px 2px rgba(228,172,38,0.4))' }}>SUPERCHARGED</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto flex items-start justify-center relative z-10 px-6 md:px-12">
        <div className="w-[88%] md:w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-[1100px] mx-auto">

          {/* WITHOUT CloseStack */}
          <div
            ref={withoutCardRef}
            style={{ backgroundColor: 'rgba(15, 10, 10, 0.85)' }}
            className="relative border border-white/10 rounded-2xl p-6 md:p-10 lg:p-12"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-full border border-red-500/40 bg-red-500/15 flex items-center justify-center">
                  <X size={18} className="text-red-400" />
                </div>
                <span className="font-sans text-lg font-bold text-red-400 uppercase tracking-wider">Without CloseStack™</span>
              </div>
              <div className="flex flex-col gap-5">
                {withoutItems.map((item, i) => (
                  <div key={i} className="cost-item flex items-center gap-4">
                    <div className="w-5 h-5 rounded border border-red-500/20 bg-red-500/5 flex items-center justify-center shrink-0">
                      <X size={10} className="text-red-400/60" />
                    </div>
                    <span className="text-white/40 font-sans text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WITH CloseStack */}
          <div
            ref={withCardRef}
            style={{ backgroundColor: 'rgba(18, 14, 8, 0.85)' }}
            className="relative border border-accent/20 rounded-2xl p-6 md:p-10 lg:p-12"
          >
            <GlowingEffect spread={80} glow={true} disabled={false} proximity={100} inactiveZone={0} borderWidth={3} />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-accent/20">
                <div className="w-10 h-10 rounded-full border border-accent/50 bg-accent/20 flex items-center justify-center shadow-[0_0_20px_rgba(228,172,38,0.4)]">
                  <Check size={18} className="text-accent" />
                </div>
                <span className="font-sans text-lg font-bold text-accent uppercase tracking-wider drop-shadow-[0_0_10px_rgba(228,172,38,0.5)]">With CloseStack™</span>
              </div>
              <div className="flex flex-col gap-5">
                {withItems.map((item, i) => (
                  <div key={i} className="cost-item flex items-center gap-4 group/item">
                    <div className="w-5 h-5 rounded border border-accent/40 bg-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent/20 transition-colors">
                      <Check size={10} className="text-accent" />
                    </div>
                    <span className="text-white/60 font-sans text-sm leading-snug font-medium group-hover/item:text-white transition-colors">
                      {typeof item === 'object' ? (
                        <>{item.text}<span className="text-accent font-bold drop-shadow-[0_0_8px_rgba(178,133,27,0.4)]">{item.highlight}</span>{item.rest}</>
                      ) : item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-accent/15 cost-item">
                <Button
                  onClick={() => window.openBooking?.()}
                  variant="default"
                  size="default"
                  className="w-full flex items-center justify-center gap-2"
                >
                  Book Your Discovery Call
                  <ArrowRight size={16} className="opacity-80" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
