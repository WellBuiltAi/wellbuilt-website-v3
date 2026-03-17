import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap-setup';
import { X, Check } from 'lucide-react';
import { GlowingEffect } from './GlowingEffect';

export default function CostOfInactionSection() {
  const canvasRef = useRef(null);
  const withoutCardRef = useRef(null);
  const withCardRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    const frameCount = 26;
    const currentFrame = index => (
      `/scale-sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const animState = { frame: 0 };

    const render = () => {
      if (images[animState.frame] && images[animState.frame].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[animState.frame];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const cx = (canvas.width - img.width * ratio) / 2;
        const cy = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
      }
    };

    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) render();
        if (loadedCount === frameCount) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
          });
        }
      };
      img.src = currentFrame(i);
      images.push(img);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#the-problem",
          start: "top top",
          end: "+=250%",
          scrub: 2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          preventOverlaps: true,
        },
      });

      tl.to(animState, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
        onUpdate: render,
      }, 0);

      if (withoutCardRef.current) {
        tl.to(withoutCardRef.current, {
          y: -80, opacity: 0.4, scale: 0.88,
          duration: 1, ease: "power2.inOut",
        }, 0);
        const withoutItems = withoutCardRef.current.querySelectorAll('.cost-item');
        withoutItems.forEach((item, i) => {
          tl.fromTo(item,
            { opacity: 0.1, x: -20, filter: "blur(4px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.12, ease: "power2.out" },
            i * 0.06
          );
        });
      }

      if (withCardRef.current) {
        tl.to(withCardRef.current, {
          y: 60, scale: 1.05,
          duration: 1, ease: "power2.inOut",
        }, 0);
        const withItems = withCardRef.current.querySelectorAll('.cost-item');
        withItems.forEach((item, i) => {
          tl.fromTo(item,
            { opacity: 0, x: 25, filter: "blur(6px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.12, ease: "power2.out" },
            0.25 + i * 0.08
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const withoutItems = [
    "Revenue plateaus. Workload doesn't.",
    "Client churn eats what growth builds",
    "Can't scale without hiring. Hiring kills margin.",
    "No moat. Easily replaced.",
  ];

  const withItems = [
    "More revenue. Same book of business.",
    "Clients stay longer. Churn drops.",
    "Irreplaceable to every client",
    "No new headcount. Predictable income.",
    "Adds $5k–$15k MRR without ad spend.",
    "Immediate, 24/7 hyper-responsive sales floor.",
  ];

  return (
    <section id="the-problem" className="h-screen w-full relative overflow-hidden flex flex-col">
      {/* Independent black background with feathered/faded edges */}
      <div className="absolute inset-0 bg-black pointer-events-none z-0" style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 90%, transparent 100%)'
      }} />

      {/* Header */}
      <div className="text-center pt-12 pb-8 relative z-20 shrink-0">
        <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-sans font-bold uppercase tracking-tighter leading-none whitespace-nowrap drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d4d4d4] to-[#737373]" style={{ filter: 'drop-shadow(0px 2px 2px rgba(255,255,255,0.3))' }}>TIP THE SCALE OF </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#b48618] to-[#5c4004]" style={{ filter: 'drop-shadow(0px 2px 2px rgba(228,172,38,0.4))' }}>SUCCESS</span>
        </h2>
      </div>

      <div className="flex-1 w-[95vw] max-w-[1300px] mx-auto flex flex-col items-center relative z-10 overflow-visible">
        <div className="w-full flex justify-between shrink-0 z-[2] relative px-[5%]">

          {/* WITHOUT CloseStack */}
          <div
            ref={withoutCardRef}
            className="relative will-change-transform bg-[#0a0808]/95 backdrop-blur-xl border border-red-500/20 rounded-[1.5rem] p-5 lg:p-7"
            style={{ width: '30%', maxWidth: '340px' }}
          >
            <div className="absolute -inset-[2px] rounded-[1.5rem] bg-gradient-to-b from-red-500/20 via-red-500/5 to-red-500/15 -z-10 blur-[1px]"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-7 h-7 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center">
                  <X size={13} className="text-red-400" />
                </div>
                <span className="font-mono text-xs text-red-400/80 tracking-[0.2em] uppercase font-bold">Without CloseStack</span>
              </div>
              <div className="flex flex-col gap-4">
                {withoutItems.map((item, i) => (
                  <div key={i} className="cost-item flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-red-500/20 bg-red-500/5 flex items-center justify-center shrink-0">
                      <X size={9} className="text-red-400/60" />
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
            className="relative will-change-transform bg-gradient-to-b from-[#141008]/95 to-[#0a0905]/95 backdrop-blur-2xl border border-accent/50 rounded-[1.5rem] p-5 lg:p-7 ring-1 ring-accent/10"
            style={{ width: '30%', maxWidth: '340px' }}
          >
            <div className="absolute -inset-[2px] rounded-[1.5rem] bg-gradient-to-b from-accent/25 via-accent/5 to-accent/20 -z-10 blur-[1px]"></div>
            <GlowingEffect spread={80} glow={true} disabled={false} proximity={100} inactiveZone={0} borderWidth={3} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-accent/20">
                <div className="w-8 h-8 rounded-full border border-accent/50 bg-accent/20 flex items-center justify-center shadow-[0_0_20px_rgba(228,172,38,0.4)]">
                  <Check size={15} className="text-accent" />
                </div>
                <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase font-bold drop-shadow-[0_0_10px_rgba(228,172,38,0.5)]">With CloseStack</span>
              </div>
              <div className="flex flex-col gap-4">
                {withItems.map((item, i) => (
                  <div key={i} className="cost-item flex items-center gap-3 group/item">
                    <div className="w-5 h-5 rounded border border-accent/40 bg-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent/20 transition-colors">
                      <Check size={10} className="text-accent" />
                    </div>
                    <span className="text-white/90 font-sans text-sm leading-snug font-medium group-hover/item:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scale canvas */}
        <div className="w-full flex items-start justify-center z-[1] pointer-events-none -mt-[12vh]" style={{ height: '50vh' }}>
          <canvas ref={canvasRef} width={2560} height={1432} className="w-[98%] max-w-none mix-blend-lighten" style={{ aspectRatio: '16/9' }}></canvas>
        </div>
      </div>
    </section>
  );
}
