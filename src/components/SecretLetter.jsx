import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { secretLetterContent } from '../data/letter';

export default function SecretLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);

  const handleReveal = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsOpen(true);
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(true);
        setIsAnimating(false);
      }
    });

    tl.to(flapRef.current, { rotateX: 180, duration: 0.7, ease: 'power2.inOut' })
      .to(letterRef.current, { y: -200, zIndex: 30, duration: 0.9, ease: 'back.out(1.2)' }, '-=0.2')
      .to(letterRef.current, { y: 0, scale: 1.05, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <section
      id="letter"
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-gradient-to-b from-cream via-blush/20 to-cream flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center">
        {/* Header */}
        <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest mb-3">
          Secret Letter
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mb-2">
          I Have Something To Tell You...
        </h2>
        <p className="font-handwriting text-xl text-rose font-medium mb-10">
          A personal note written straight from the heart 💌
        </p>

        {!isOpen && (
          <div className="flex flex-col items-center">
            {/* Sealed Pink Envelope */}
            <div
              ref={envelopeRef}
              className="relative w-80 h-52 sm:w-96 sm:h-60 rounded-2xl bg-gradient-to-br from-blush to-soft-pink shadow-romantic border border-rose/30 p-4 flex flex-col items-center justify-center perspective-1000 mb-8 animate-gentle-float"
            >
              {/* Envelope Flap */}
              <div
                ref={flapRef}
                className="absolute top-0 left-0 right-0 h-1/2 bg-rose/40 rounded-t-2xl border-b border-rose/30 origin-top transform-style-3d z-20"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Secret Letter Card Peek */}
              <div
                ref={letterRef}
                className="absolute bottom-4 left-6 right-6 h-40 bg-white rounded-xl p-6 shadow-md border border-rose/20 flex flex-col items-center justify-center z-10"
              >
                <span className="text-3xl mb-1">💌</span>
                <p className="font-handwriting text-lg text-burgundy font-bold">
                  For {secretLetterContent.recipient}
                </p>
              </div>

              {/* Envelope Front Ribbon */}
              <div className="z-10 text-center pointer-events-none">
                <span className="text-4xl drop-shadow-sm">🎀</span>
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleReveal}
              disabled={isAnimating}
              className="px-8 py-3.5 rounded-full bg-rose text-white font-serif font-bold text-lg shadow-romantic hover:bg-burgundy hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>Tap to reveal</span>
              <span className="text-xl">💌</span>
            </button>
          </div>
        )}

        {/* Revealed Handwritten Letter Card */}
        {isOpen && (
          <div className="w-full max-w-2xl bg-[#FFFDF9] paper-texture rounded-3xl p-8 sm:p-12 shadow-envelope border border-rose/30 text-left relative animate-gentle-float">
            {/* Stamp & Ribbon Detail */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="px-3 py-1 bg-rose/10 border border-rose/30 rounded-md font-handwriting text-xs text-rose font-bold">
                14 OCT 2003 📮
              </span>
            </div>

            <h3 className="font-handwriting text-3xl sm:text-4xl font-bold text-burgundy mb-6">
              Dearest {secretLetterContent.recipient},
            </h3>

            <p className="font-handwriting text-xl sm:text-2xl text-burgundy leading-relaxed whitespace-pre-line mb-8">
              {secretLetterContent.message}
            </p>

            <div className="text-right">
              <p className="font-handwriting text-lg text-rose font-medium">
                {secretLetterContent.signOff}
              </p>
              <p className="font-handwriting text-2xl font-bold text-burgundy mt-1">
                {secretLetterContent.sender}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
