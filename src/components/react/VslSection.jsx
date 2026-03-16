import React, { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { GlowingEffect } from './GlowingEffect';
import { Button } from './NeonButton';

export default function VslSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="vsl" className="relative w-full py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-[1400px] mx-auto flex flex-col">

        {/* HEADER */}
        <div className="mb-10 md:mb-16 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[8px] md:text-[11px] text-white/30 md:text-accent tracking-[0.2em] md:tracking-[0.35em] uppercase mb-2 md:mb-6 block font-medium">Metrics Without Conversion Are Vanity.</span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-sans font-bold uppercase tracking-tighter leading-[0.9] drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            {/* Mobile: one line */}
            <span className="md:hidden whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d4d4d4] to-[#737373]" style={{ filter: 'drop-shadow(0px 2px 2px rgba(255,255,255,0.3))' }}>Supercharge </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#b48618] to-[#5c4004] font-drama italic font-normal tracking-tight" style={{ filter: 'drop-shadow(0px 2px 2px rgba(228,172,38,0.4))' }}>Your Offer.</span>
            </span>
            {/* Desktop: original layout */}
            <span className="hidden md:inline">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d4d4d4] to-[#737373]" style={{ filter: 'drop-shadow(0px 2px 2px rgba(255,255,255,0.3))' }}>IT'S TIME TO </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#b48618] to-[#5c4004] font-drama italic font-normal tracking-tight" style={{ filter: 'drop-shadow(0px 2px 2px rgba(228,172,38,0.4))' }}>SUPERCHARGE YOUR OFFER.</span>
            </span>
          </h2>
        </div>

        {/* VSL VIDEO */}
        <div className="relative w-full max-w-[1200px] mx-auto mb-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-accent/40 blur-[100px] md:blur-[150px] rounded-[100px] pointer-events-none mix-blend-screen opacity-80"></div>

          <div className="w-full aspect-video bg-[#000] border border-white/20 rounded-xl md:rounded-2xl lg:rounded-3xl relative group overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(178,133,27,0.15)] z-10">
            {!isPlaying ? (
              <div
                className="absolute inset-0 cursor-pointer flex items-center justify-center group"
                onClick={() => setIsPlaying(true)}
              >
                <img src="/vsl-thumbnail.jpg" alt="WellBuilt AI Rev² system walkthrough video thumbnail" loading="lazy" width="1200" height="675" className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent shadow-2xl cursor-pointer">
                  <Play className="text-white w-6 h-6 md:w-8 md:h-8 ml-1 transition-colors duration-300 group-hover:text-background" fill="currentColor" />
                </div>
              </div>
            ) : (
              <iframe
                src="https://drive.google.com/file/d/1fWvLzMY9XfUZndFc4aOG3Udd-I3PBAzS/preview"
                className="absolute top-0 left-0 w-full h-full border-0"
                title="WellBuilt AI Rev² system walkthrough"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-14 max-w-[1200px] mx-auto">
          {[
            { stat: "21x", label: "More conversions for your clients.", desc: "Our system engages every lead before they go cold." },
            { stat: "78%", label: "Of jobs go to the first responder.", desc: "Your clients always answer first. We guarantee it." },
            { stat: "63%", label: "Of leads are never contacted.", desc: "Your clients' leads always are. Every single one." },
            { stat: "<1%", label: "Of agencies offer this.", desc: "Yours does. The ultimate competitive advantage for your agency." },
          ].map((card, i) => (
            <div key={i} className="relative bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-500 border border-white/5 rounded-xl md:rounded-2xl p-3 md:p-6 focus-stat flex flex-col justify-start items-start">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="relative z-10 flex flex-col items-start justify-start h-full w-full text-left font-sans">
                <div className="w-full text-center text-xl md:text-4xl lg:text-5xl font-bold text-accent drop-shadow-[0_0_20px_rgba(178,133,27,0.3)] mb-1.5 md:mb-4 leading-none tracking-tight">{card.stat}</div>
                <span className="block mb-0.5 md:mb-2 text-[11px] md:text-sm text-white/90 font-medium leading-snug">{card.label}</span>
                <div className="text-[9px] md:text-xs text-white/50 leading-relaxed">{card.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center w-full mt-4">
          <Button
            onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
            variant="default"
            size="lg"
            className="w-auto flex items-center justify-center gap-2 text-[10px] md:text-lg px-4 py-2.5 md:px-8 md:py-4 shadow-[0_0_30px_rgba(178,133,27,0.4)] hover:shadow-[0_0_50px_rgba(178,133,27,0.7)]"
          >
            Book Your Discovery Call
            <ArrowRight size={18} className="opacity-80" />
          </Button>
        </div>

      </div>
    </section>
  );
}
