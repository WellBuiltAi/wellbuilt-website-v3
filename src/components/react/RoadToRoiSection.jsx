import React, { useEffect, useRef } from 'react';
import { Activity, Database, RefreshCw, Zap, Calendar, Shield, ArrowRight } from 'lucide-react';
import { Button } from './NeonButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlowingEffect } from './GlowingEffect';

gsap.registerPlugin(ScrollTrigger);

const RoadToRoiSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray('.roi-step').forEach((step) => {
          gsap.fromTo(step, 
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
        
        gsap.utils.toArray('.roi-line').forEach((line) => {
          gsap.fromTo(line, 
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top",
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: line,
                start: "top 75%",
              }
            }
          );
        });
      }, containerRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  const steps = [
    { num: "01", icon: Activity, title: "THE REVENUE UPSELL", desc: "Plugs directly into your core offer with the value to back it. You command a new $3K–$10K setup fee plus an ongoing performance retainer—adding a pure-profit revenue layer without hiring." },
    { num: "02", icon: Database, title: "CRM & CAMPAIGN SYNC", desc: "Hooks naturally into your client's CRM and ad campaigns, instantly routing all new leads to the AI." },
    { num: "03", icon: RefreshCw, title: "DATABASE REACTIVATION", desc: "We reactivate your client's dead leads and turn them into booked jobs—generating revenue from day one. This is how the system pays for itself in the first 30 days." },
    { num: "04", icon: Zap, title: "INSTANT ENGAGEMENT", desc: "The second a lead clicks submit, our Voice and SMS AI fire simultaneously. They answer questions and handle objections instantly—when intent is at its peak." },
    { num: "05", icon: Calendar, title: "AUTOMATED CLOSING", desc: "The AI doesn't just chat. It drives the lead straight into your client's schedule and can even capture deposit payments on the spot. Zero human intervention." },
    { num: "06", icon: Shield, title: "UNBREAKABLE RETENTION", desc: "Your clients get drastically better results from the exact same ad spend. They pay more and stay longer. Your agency becomes completely irreplaceable." },
  ];

  return (
    <section id="road-to-roi" className="py-24 md:py-40 px-6 md:px-12 w-full flex justify-center bg-transparent border-b border-white/10 relative overflow-hidden" ref={containerRef}>
      {/* Ambient glows */}
      <div className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] opacity-[0.15] mix-blend-screen pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(178, 133, 27, 0.35) 0%, rgba(178, 133, 27, 0) 60%)' }}></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] opacity-[0.12] mix-blend-screen pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(178, 133, 27, 0.3) 0%, rgba(178, 133, 27, 0) 55%)' }}></div>

      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-7xl lg:text-8xl font-sans font-bold uppercase tracking-tighter leading-[0.9] drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] md:whitespace-nowrap">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d4d4d4] to-[#737373] mr-2 md:mr-6" style={{ filter: 'drop-shadow(0px 2px 2px rgba(255,255,255,0.3))' }}>THE SYSTEM</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#b48618] to-[#5c4004] font-drama italic font-normal tracking-tight" style={{ filter: 'drop-shadow(0px 2px 2px rgba(228,172,38,0.4))' }}>MECHANICS</span>
          </h2>
        </div>

        {/* Linear Vertical Flow */}
        <div className="relative w-full max-w-[800px] flex flex-col items-center md:items-start mt-4 md:mt-8">
          
          {/* Main Connecting Vertical Line (Desktop Left Aligned) */}
          <div className="absolute left-[39px] md:left-[55px] top-[40px] bottom-[40px] w-[2px] bg-gradient-to-b from-transparent via-accent/30 to-accent/50 hidden md:block z-0 roi-line"></div>

          <div className="flex flex-col gap-10 md:gap-12 w-full relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="roi-step relative w-full flex flex-col md:flex-row items-center gap-6 md:gap-10 group">
                  
                  {/* Icon / Number Identifier */}
                  <div className="relative z-10 flex flex-col items-center justify-center shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-full md:rounded-3xl bg-[#050505] border border-white/5 group-hover:bg-[#0f0c08] transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] md:shadow-none overflow-hidden">
                    {/* Inner Accent ring */}
                    <div className="absolute inset-[2px] rounded-full md:rounded-[1.4rem] border border-accent/20 group-hover:border-accent/40 transition-colors"></div>
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1} className="rounded-full md:rounded-[1.4rem]" />
                    
                    <Icon size={28} className="text-accent/80 group-hover:text-accent transition-colors relative z-20 drop-shadow-[0_0_10px_rgba(228,172,38,0.5)]" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left w-full bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors duration-500 border border-white/5 rounded-3xl p-6 md:p-8 flex-1">
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="rounded-3xl" />
                    
                    <div className="w-full relative z-10">
                      <div className="md:hidden font-mono text-xs text-accent font-bold mb-3 bg-accent/10 w-fit mx-auto px-3 py-1 rounded-full border border-accent/20">
                        STEP {step.num}
                      </div>

                      <h3 className="font-sans text-xl md:text-2xl font-bold text-accent mb-3 uppercase tracking-wider drop-shadow-[0_0_12px_rgba(178,133,27,0.3)]">{step.title}</h3>
                      <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed max-w-xl md:max-w-none">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Mobile Connecting line */}
                  {i !== steps.length - 1 && (
                    <div className="md:hidden w-[2px] h-10 bg-accent/30 my-1 roi-line absolute -bottom-[46px] left-1/2 -translate-x-1/2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
};

export default RoadToRoiSection;
