import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import EntryGate from './components/EntryGate';
import Hero from './components/Hero';
import Reminder from './components/Reminder';
import Memories from './components/Memories';
import Timeline from './components/Timeline';
import LoveCards from './components/LoveCards';
import Reasons from './components/Reasons';

import MusicButton from './components/MusicButton';
import FloatingParticles from './components/FloatingParticles';
import FloatingNav from './components/FloatingNav';
import CustomCursor from './components/CustomCursor';

// Below-the-fold components lazy loaded for optimal initial bundle & page speed
const SecretLetter = lazy(() => import('./components/SecretLetter'));
const FriendsWishes = lazy(() => import('./components/FriendsWishes'));
const BirthdayCountdown = lazy(() => import('./components/BirthdayCountdown'));
const Surprise = lazy(() => import('./components/Surprise'));
const FinalSection = lazy(() => import('./components/FinalSection'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Detect mobile touch
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // Initialize Lenis smooth scroll tuned for desktop & mobile
    const lenis = new Lenis({
      duration: isTouch ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
      smoothTouch: false, // Let mobile touch scroll use native hardware acceleration for 60 FPS
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleGateOpened = () => {
    setAudioUnlocked(true);
  };

  return (
    <div className="relative min-h-screen bg-cream text-burgundy selection:bg-rose/30 selection:text-burgundy">
      {/* Global Background Particles & Custom Cursor */}
      <FloatingParticles />
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Experience Story Sequence */}
      {!isLoading && (
        <>
          {/* Entry Gate Envelope Wax Seal */}
          <EntryGate onOpenGate={handleGateOpened} />

          {/* Floating Navigation & Music Button */}
          <FloatingNav lenisRef={lenisRef} />
          <MusicButton audioUnlocked={audioUnlocked} />

          {/* Section 3: Hero */}
          <Hero lenisRef={lenisRef} />

          {/* Section 4: A Little Reminder */}
          <Reminder />

          {/* Section 5: Photo Memories */}
          <Memories />

          {/* Section 6: Our Little Story Timeline */}
          <Timeline />

          {/* Section 7: Things I Love About You */}
          <LoveCards />

          {/* Section 8: 20 Little Reasons */}
          <Reasons />

          {/* Lazy loaded sections */}
          <Suspense fallback={<div className="py-12 text-center font-handwriting text-rose text-lg">Loading story... 💖</div>}>
            {/* Section 9: Secret Letter */}
            <SecretLetter />

            {/* Section 10: Friends' Wishes */}
            <FriendsWishes />

            {/* Section 11: Birthday Countdown / Moment */}
            <BirthdayCountdown />

            {/* Section 12: One Last Surprise */}
            <Surprise />

            {/* Section 13: Final Sentiment */}
            <FinalSection />
          </Suspense>
        </>
      )}
    </div>
  );
}
