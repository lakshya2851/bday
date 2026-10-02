import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photoMemories } from '../data/photos';

gsap.registerPlugin(ScrollTrigger);

export default function Memories() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.polaroid-card');

        cards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -40 : 40;

          gsap.fromTo(
            card,
            { opacity: 0, x: direction, y: 30, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 60%',
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
      id="memories"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-cream overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest">
            Photo Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mt-3 mb-4">
            Little Moments, Big Memories
          </h2>
          <p className="font-handwriting text-xl text-rose font-medium">
            Tap or hover over each polaroid to uncover the memory 📸
          </p>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {photoMemories.map((photo) => {
            const isVideo = photo.url.endsWith('.mp4') || photo.url.endsWith('.webm');
            return (
              <div
                key={photo.id}
                className="polaroid-card group relative bg-white p-4 pb-6 rounded-sm shadow-md border border-burgundy/10 cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:-rotate-0 hover:shadow-soft-glow hover:z-20"
                style={{ transform: `rotate(${photo.rotation})` }}
              >
                {/* Decorative Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-blush/60 border border-burgundy/10 rounded-xs transform -rotate-2 opacity-80 group-hover:opacity-100 transition-opacity z-10" />

                {/* Photo / Video Frame */}
                <div className="relative aspect-[4/5] bg-cream-card rounded-xs overflow-hidden mb-4 border border-burgundy/5">
                  {isVideo ? (
                    <video
                      src={photo.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Polaroid Caption */}
                <div className="text-center px-2">
                  <p className="font-handwriting text-lg sm:text-xl text-burgundy font-semibold group-hover:text-rose transition-colors">
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
