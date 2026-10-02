import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reasonsList } from '../data/reasons';

gsap.registerPlugin(ScrollTrigger);

export default function Reasons() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const cards = sectionRef.current.querySelectorAll('.reason-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reasons"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-cream overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest">
            Special Qualities
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mt-3 mb-4">
            20 Little Reasons Why You're Special
          </h2>
          <p className="font-handwriting text-xl text-rose font-medium">
            Here are just a few of the endless reasons ✨
          </p>
        </div>

        {/* Reasons Grid (12 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reasonsList.map((reason, idx) => (
            <div
              key={idx}
              className="reason-card relative glass-card p-6 rounded-2xl border border-rose/20 shadow-romantic hover:scale-105 hover:border-rose/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-2xl font-bold text-rose/60 group-hover:text-rose transition-colors">
                    #{reason.number}
                  </span>
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {reason.icon}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-burgundy/80 leading-relaxed">
                  {reason.text}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose/10 flex items-center justify-end">
                <span className="text-xs text-rose opacity-0 group-hover:opacity-100 transition-opacity">
                  ❤️
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
