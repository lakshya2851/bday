import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/config';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ lenisRef }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const dateRef = useRef(null);
  const taglineRef = useRef(null);
  const scrollBtnRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Initial entrance sequential stagger timeline
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(text1Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
          .fromTo(text2Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '+=0.2')
          .fromTo(text3Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '+=0.2')
          .fromTo(text4Ref.current, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.7)' }, '+=0.3')
          .fromTo(dateRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '+=0.2')
          .fromTo(taglineRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '<')
          .fromTo(scrollBtnRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '+=0.3');

        // Scroll fade out on scroll down
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.95,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('reminder');
    if (nextSection) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(nextSection, { offset: -20, duration: 1.2 });
      } else {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-b from-cream via-blush/20 to-cream"
    >
      {/* Background Animated SVG Flowers & Heart Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Soft Pulsing Giant Heart Backdrop */}
        <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] bg-rose/15 rounded-full blur-3xl animate-slow-pulse" />

        {/* Decorative Floating SVG Flowers */}
        <svg className="absolute top-12 left-8 w-16 h-16 text-rose/30 animate-gentle-float" viewBox="0 0 100 100">
          <circle cx="50" cy="30" r="15" fill="currentColor" />
          <circle cx="70" cy="50" r="15" fill="currentColor" />
          <circle cx="50" cy="70" r="15" fill="currentColor" />
          <circle cx="30" cy="50" r="15" fill="currentColor" />
          <circle cx="50" cy="50" r="12" fill="#FFB6C1" />
        </svg>

        <svg className="absolute bottom-24 right-10 w-20 h-20 text-soft-pink/40 animate-gentle-float delay-500" viewBox="0 0 100 100">
          <circle cx="50" cy="30" r="15" fill="currentColor" />
          <circle cx="70" cy="50" r="15" fill="currentColor" />
          <circle cx="50" cy="70" r="15" fill="currentColor" />
          <circle cx="30" cy="50" r="15" fill="currentColor" />
          <circle cx="50" cy="50" r="12" fill="#E899A5" />
        </svg>
      </div>

      {/* Main Content Stagger */}
      <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto py-12 flex flex-col items-center">
        <p ref={text1Ref} className="font-handwriting text-2xl sm:text-3xl text-rose font-bold mb-2">
          Hey {siteConfig.name}...
        </p>

        <p ref={text2Ref} className="text-base sm:text-xl text-burgundy/80 font-medium tracking-wide mb-1">
          Today isn't just another day.
        </p>

        <p ref={text3Ref} className="text-lg sm:text-2xl text-burgundy font-medium tracking-wide mb-6">
          It's your day.
        </p>

        <h1 ref={text4Ref} className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-burgundy tracking-tight leading-tight mb-6 drop-shadow-sm">
          Happy Birthday <span className="inline-block text-rose animate-heart-beat">❤️</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8">
          <span ref={dateRef} className="px-4 py-1.5 rounded-full bg-rose/15 text-burgundy font-serif font-bold text-lg sm:text-xl border border-rose/30">
            14 October
          </span>
          <span ref={taglineRef} className="text-sm sm:text-base text-burgundy/70 font-medium">
            {siteConfig.tagline}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollBtnRef} className="absolute bottom-8 z-10 flex flex-col items-center">
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-burgundy/70 hover:text-burgundy transition-colors duration-300 cursor-pointer group"
          aria-label="Scroll down to discover surprise"
        >
          <span className="text-xs sm:text-sm font-handwriting text-base font-semibold">
            Scroll to discover your surprise
          </span>
          <span className="text-lg animate-bounce-down text-rose group-hover:scale-125 transition-transform">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}
