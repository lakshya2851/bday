import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyMilestones } from '../data/memories';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const heartTrackerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Vertical connecting line fill animation on scroll
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );

        // Heart tracker position sync
        gsap.to(heartTrackerRef.current, {
          y: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        });

        // Milestone cards staggered reveal
        const cards = sectionRef.current.querySelectorAll('.timeline-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 35, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 bg-cream overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest">
            Timeline
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mt-3 mb-4">
            Our Little Story
          </h2>
          <p className="font-handwriting text-xl text-rose font-medium">
            Step by step, memory by memory ✨
          </p>
        </div>

        {/* Timeline Content Wrapper */}
        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 -translate-x-1/2 w-1 bg-blush/40 rounded-full" />
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-6 sm:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-rose via-soft-pink to-burgundy rounded-full origin-top"
          />

          {/* Heart Tracker following scroll line */}
          <div
            ref={heartTrackerRef}
            className="absolute top-0 left-6 sm:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="w-8 h-8 rounded-full bg-cream border-2 border-rose flex items-center justify-center shadow-soft-glow">
              <span className="text-xs animate-heart-beat">💖</span>
            </div>
          </div>

          {/* Milestones List */}
          <div className="space-y-12">
            {storyMilestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`timeline-card relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Marker */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-4 w-4 h-4 rounded-full bg-rose border-4 border-cream z-10 shadow-sm" />

                  {/* Card Content */}
                  <div className="ml-14 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="glass-card p-6 rounded-2xl border border-rose/20 shadow-romantic hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-handwriting text-xl font-bold text-rose">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-burgundy mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-burgundy/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
