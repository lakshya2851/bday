import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { siteConfig } from '../data/config';
import { surprisePhotos } from '../data/photos';

export default function Surprise() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  const handleOpenSurprise = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsOpen(true);
      setIsAnimating(false);
      return;
    }

    setIsOpen(true);

    setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      });

      tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 })
        .fromTo(contentRef.current, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.3');
    }, 50);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section
      id="surprise"
      className="relative min-h-[60vh] py-24 px-4 sm:px-6 bg-cream text-center flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-xl mx-auto z-10">
        <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest">
          Final Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mt-3 mb-4">
          Before You Go...
        </h2>
        <p className="font-handwriting text-xl text-rose font-medium mb-8">
          One more tiny gift waiting for you 🎁
        </p>

        {/* Surprise Launcher Button */}
        <button
          onClick={handleOpenSurprise}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-rose to-burgundy text-white font-serif font-bold text-xl shadow-romantic hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-3 mx-auto group"
        >
          <span>One Last Surprise</span>
          <span className="text-2xl group-hover:animate-bounce">💗</span>
        </button>
      </div>

      {/* Cinematic Modal Overlay */}
      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-50 bg-burgundy/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            ref={contentRef}
            className="relative w-full max-w-3xl bg-cream rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose/40 text-center my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose/20 text-burgundy font-bold flex items-center justify-center hover:bg-rose hover:text-white transition-colors cursor-pointer"
              aria-label="Close surprise modal"
            >
              ✕
            </button>

            {/* Revealed Text Sequence */}
            <span className="text-4xl mb-4 inline-block animate-heart-beat">💖</span>
            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy mb-2">
              Happy Birthday, {siteConfig.name}.
            </h3>
            <p className="font-handwriting text-2xl text-rose font-semibold mb-8">
              Thank you for being you.
            </p>

            {/* Final Photo Reel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {surprisePhotos.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-2xl shadow-md border border-rose/20 flex flex-col items-center"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-cream-card">
                    {item.url.endsWith('.mp4') || item.url.endsWith('.webm') ? (
                      <video src={item.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <p className="font-handwriting text-base text-burgundy font-medium text-center">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-rose text-white font-serif font-bold text-base shadow-sm hover:bg-burgundy transition-colors"
            >
              Close with love ❤️
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
