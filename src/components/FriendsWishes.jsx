import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { friendsWishes } from '../data/friends';

gsap.registerPlugin(ScrollTrigger);

export default function FriendsWishes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!friendsWishes || friendsWishes.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && sectionRef.current) {
        const notes = sectionRef.current.querySelectorAll('.sticky-note');
        gsap.fromTo(
          notes,
          { opacity: 0, y: 30, rotate: -5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            stagger: 0.15,
            duration: 0.7,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Automatically hide section if empty array
  if (!friendsWishes || friendsWishes.length === 0) {
    return null;
  }

  const bgStyles = [
    'bg-[#FFFDF0] border-amber-200/60',
    'bg-[#FFF0F5] border-rose-200/60',
    'bg-[#F0F8FF] border-blue-200/60',
  ];

  return (
    <section
      id="friends"
      ref={sectionRef}
      className="relative min-h-[70vh] py-24 px-4 sm:px-6 bg-cream overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest">
            Warm Wishes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mt-3 mb-4">
            Messages From Friends
          </h2>
          <p className="font-handwriting text-xl text-rose font-medium">
            A sticky note scrapbook full of love 🎈
          </p>
        </div>

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {friendsWishes.map((item, idx) => {
            const bgStyle = bgStyles[idx % bgStyles.length];
            return (
              <div
                key={item.id || idx}
                className={`sticky-note relative p-6 rounded-2xl shadow-md border ${bgStyle} hover:scale-105 transition-transform duration-300 flex flex-col justify-between`}
              >
                {/* Decorative Pin / Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-rose/20 border border-burgundy/10 rounded-xs transform rotate-1 opacity-75" />

                <div>
                  {/* Photo or Video if available */}
                  {item.photoUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden aspect-video bg-white/50 border border-burgundy/10">
                      <img
                        src={item.photoUrl}
                        alt={`Wish photo from ${item.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {item.videoUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden aspect-video bg-black/10">
                      <iframe
                        src={item.videoUrl}
                        title={`Video wish from ${item.name}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}

                  <p className="font-handwriting text-lg text-burgundy/90 leading-relaxed mb-6">
                    "{item.message}"
                  </p>
                </div>

                <div className="pt-3 border-t border-burgundy/10 flex items-center justify-between">
                  <span className="font-serif font-bold text-burgundy text-base">
                    — {item.name}
                  </span>
                  <span className="text-base">🎈</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
