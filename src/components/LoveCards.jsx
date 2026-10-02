import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { loveCardsData } from '../data/loveCards';

gsap.registerPlugin(ScrollTrigger);

export default function LoveCards() {
  const [flippedCards, setFlippedCards] = useState({});
  const [bursts, setBursts] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const cards = sectionRef.current.querySelectorAll('.flip-card-wrapper');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.6,
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

  const handleCardClick = (id, e) => {
    const isFlipped = !!flippedCards[id];
    setFlippedCards((prev) => ({ ...prev, [id]: !isFlipped }));

    // Heart Burst animation coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newBurst = {
      id: Math.random(),
      cardId: id,
      x: clickX,
      y: clickY,
    };

    setBursts((prev) => [...prev, newBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 700);
  };

  return (
    <section
      id="lovecards"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-cream overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest">
            Love Notes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mt-3 mb-4">
            Things I Love About You
          </h2>
          <p className="font-handwriting text-xl text-rose font-medium">
            Tap any card to flip it over and reveal a hidden note 💌
          </p>
        </div>

        {/* 7 Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loveCardsData.map((card) => {
            const isFlipped = flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={(e) => handleCardClick(card.id, e)}
                className="flip-card-wrapper relative h-56 cursor-pointer group perspective-1000"
              >
                {/* Heart Burst Particle Effect */}
                {bursts
                  .filter((b) => b.cardId === card.id)
                  .map((b) => (
                    <div
                      key={b.id}
                      className="absolute pointer-events-none z-30 animate-ping"
                      style={{ left: `${b.x}px`, top: `${b.y}px` }}
                    >
                      <span className="text-2xl drop-shadow-md">💖</span>
                    </div>
                  ))}

                {/* Flip Card Container */}
                <div
                  className={`flip-card-inner w-full h-full rounded-2xl shadow-romantic relative transition-transform duration-700 transform-style-3d ${
                    isFlipped ? 'flip-card-flipped' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className={`flip-card-front absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br ${card.bgColor} border border-rose/30 backface-hidden`}>
                    <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                      {card.icon}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy">
                      {card.title}
                    </h3>
                    <span className="text-xs font-handwriting text-rose font-semibold mt-4 flex items-center gap-1">
                      Tap to flip 🔄
                    </span>
                  </div>

                  {/* Back Side */}
                  <div className="flip-card-back absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white border border-rose/40 shadow-inner backface-hidden">
                    <span className="text-xs font-handwriting text-rose font-bold uppercase tracking-wider mb-2">
                      Hidden Message 💌
                    </span>
                    <p className="font-handwriting text-lg sm:text-xl text-burgundy leading-relaxed">
                      "{card.hiddenNote}"
                    </p>
                    <span className="text-xs text-burgundy/60 mt-4 flex items-center gap-1">
                      Tap to flip back
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
