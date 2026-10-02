import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { siteConfig } from '../data/config';

export default function EntryGate({ onOpenGate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const containerRef = useRef(null);
  const sealRef = useRef(null);
  const sealLeftRef = useRef(null);
  const sealRightRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const envelopeRef = useRef(null);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (onOpenGate) onOpenGate();
      setIsOpen(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(true);
        if (onOpenGate) onOpenGate();
      }
    });

    // Step a: Seal cracks & splits
    tl.to(sealRef.current, { scale: 1.25, duration: 0.2, ease: 'back.out(2)' })
      .to(sealLeftRef.current, { x: -35, y: 15, rotate: -30, opacity: 0, duration: 0.5, ease: 'power2.in' }, 'crack')
      .to(sealRightRef.current, { x: 35, y: 15, rotate: 30, opacity: 0, duration: 0.5, ease: 'power2.in' }, 'crack')

    // Step b: Top Flap flips back in 3D (revealing inside opening)
      .to(flapRef.current, { rotateX: 180, duration: 0.75, ease: 'power2.inOut' }, '-=0.15')

    // Step c: Letter slides UP out from behind the front envelope pocket
      .to(letterRef.current, { y: -190, zIndex: 35, duration: 0.95, ease: 'back.out(1.3)' }, '-=0.1')

    // Step d & e: Letter expands, screen cross-fades into Hero
      .to(letterRef.current, { scale: 2.2, opacity: 0, duration: 0.7, ease: 'power2.in' }, '+=0.15')
      .to(envelopeRef.current, { opacity: 0, scale: 0.88, duration: 0.5, ease: 'power2.in' }, '<');
  };

  if (isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream/95 backdrop-blur-md px-4 overflow-hidden"
    >
      {/* Background soft ambient particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-1/6 left-1/4 text-2xl animate-gentle-float">🌸</span>
        <span className="absolute top-1/4 right-1/4 text-xl animate-sparkle">✨</span>
        <span className="absolute bottom-1/4 left-1/5 text-lg animate-gentle-float">💖</span>
        <span className="absolute bottom-1/5 right-1/3 text-2xl animate-sparkle delay-300">✨</span>
      </div>

      <div className="flex flex-col items-center text-center max-w-sm z-10">
        <p className="text-xs uppercase tracking-widest text-burgundy/60 font-semibold mb-2">
          Before you enter...
        </p>

        {/* Envelope Container */}
        <div
          ref={envelopeRef}
          className="relative w-80 h-52 sm:w-96 sm:h-60 rounded-2xl bg-[#EDE0D8] shadow-envelope border border-burgundy/15 perspective-1000 my-4 animate-gentle-float"
        >
          {/* Envelope Inner Back Cavity (Z-0) */}
          <div className="absolute inset-0 rounded-2xl bg-[#E2D2C8] border border-burgundy/10 shadow-inner" />

          {/* Letter inside envelope pocket (Z-10, tucked low) */}
          <div
            ref={letterRef}
            className="absolute bottom-3 left-4 right-4 h-44 bg-white rounded-xl p-4 shadow-md flex flex-col items-center justify-center border border-rose/30 z-10 pointer-events-none transform translate-y-4"
          >
            <span className="text-2xl mb-1">💌</span>
            <h3 className="font-serif text-lg font-bold text-burgundy">
              Happy Birthday, {siteConfig.name} ❤️
            </h3>
            <p className="font-handwriting text-base text-rose mt-1 font-semibold">
              Open your surprise
            </p>
          </div>

          {/* Front Envelope Pocket (Z-20) covering lower half of letter */}
          <div
            className="absolute bottom-0 left-0 right-0 h-4/5 bg-[#F5EBE6] paper-texture rounded-b-2xl border-t border-burgundy/10 z-20 flex flex-col items-center justify-center pointer-events-none shadow-xs"
            style={{
              clipPath: 'polygon(0 35%, 50% 0, 100% 35%, 100% 100%, 0 100%)',
            }}
          >
            <span className="font-handwriting text-2xl sm:text-3xl text-burgundy font-bold drop-shadow-sm mt-10">
              For {siteConfig.name} 💌
            </span>
          </div>

          {/* Top Envelope Flap (Z-25, 3D rotateX) */}
          <div
            ref={flapRef}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#EDE0D8] border-b border-burgundy/20 rounded-t-2xl origin-top transform-style-3d z-25 shadow-sm"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />

          {/* Wax Seal Button centered on flap (Z-30) */}
          <div ref={sealRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <button
              onClick={handleOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpen();
                }
              }}
              aria-label="Open your surprise"
              disabled={isOpening}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-burgundy text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose/50"
            >
              {/* Pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-rose/40 animate-ping opacity-75" />

              {/* Split Wax Seal Halves */}
              <div
                ref={sealLeftRef}
                className="absolute inset-0 rounded-full bg-burgundy border-2 border-rose/40 flex items-center justify-center overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
              >
                <span className="text-xl sm:text-2xl select-none">💖</span>
              </div>
              <div
                ref={sealRightRef}
                className="absolute inset-0 rounded-full bg-burgundy border-2 border-rose/40 flex items-center justify-center overflow-hidden"
                style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
              >
                <span className="text-xl sm:text-2xl select-none">💖</span>
              </div>

              {/* Central Seal Icon */}
              <span className="relative z-10 text-xl sm:text-2xl select-none">💖</span>
            </button>
          </div>
        </div>

        {/* Prompt label */}
        <p className="text-sm font-handwriting text-rose font-semibold tracking-wide animate-pulse">
          Tap the seal to open 💌
        </p>
      </div>
    </div>
  );
}
