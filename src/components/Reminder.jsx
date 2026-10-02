import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/config';

gsap.registerPlugin(ScrollTrigger);

export default function Reminder() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && textContainerRef.current) {
        const words = textContainerRef.current.querySelectorAll('.reveal-word');

        gsap.fromTo(
          words,
          { opacity: 0.15, filter: 'blur(4px)', y: 10 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 40%',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraph1 = "Do you know what makes today special?";
  const paragraph2 = "Because the world got a little brighter on 14 October 2003.";
  const paragraph3 = `Because ${siteConfig.name} was born.`;

  return (
    <section
      id="reminder"
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 bg-cream text-center overflow-hidden"
    >
      {/* Background subtle doodle hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-between px-10">
        <span className="text-4xl animate-gentle-float">✨</span>
        <span className="text-4xl animate-gentle-float delay-300">🌸</span>
      </div>

      <div className="max-w-2xl mx-auto z-10 flex flex-col items-center">
        <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest mb-8">
          A Little Reminder
        </span>

        {/* Scroll-scrubbed reveal text */}
        <div ref={textContainerRef} className="space-y-6">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-burgundy font-medium leading-relaxed">
            {paragraph1.split(' ').map((word, idx) => (
              <span key={idx} className="reveal-word inline-block mr-2">
                {word}
              </span>
            ))}
          </p>

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-rose font-semibold leading-relaxed">
            {paragraph2.split(' ').map((word, idx) => (
              <span key={idx} className="reveal-word inline-block mr-2">
                {word}
              </span>
            ))}
          </p>

          <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy font-bold leading-tight">
            {paragraph3.split(' ').map((word, idx) => (
              <span key={idx} className="reveal-word inline-block mr-2">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Subtle Birthdate Badge */}
        <div className="mt-12 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-xs sm:text-sm font-handwriting text-burgundy/70 px-4 py-2 rounded-full border border-burgundy/20 bg-cream-card">
            Born: 14 October 2003 ✨
          </span>
        </div>
      </div>
    </section>
  );
}
