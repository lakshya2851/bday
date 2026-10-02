import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const textSequence = [
    "Something special is loading for you...",
    `Made with love by ${siteConfig.senderName || "Lakshya"} ❤️`,
    `for ${siteConfig.name}`
  ];

  useEffect(() => {
    // 0 to 100 counter over ~2.2 seconds
    const duration = 2200;
    const interval = 25;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Text sequence timers
    const t1 = setTimeout(() => setTextIndex(1), 900);
    const t2 = setTimeout(() => setTextIndex(2), 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const doneTimer = setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600); // Wait for fade out animation
      }, 500);

      return () => clearTimeout(doneTimer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream transition-all duration-700 ease-out ${
        isDone ? 'opacity-0 scale-105 blur-md pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-1/4 left-1/5 text-2xl animate-sparkle">✨</span>
        <span className="absolute top-1/3 right-1/4 text-xl animate-sparkle delay-200">💖</span>
        <span className="absolute bottom-1/3 left-1/3 text-lg animate-sparkle delay-500">🌸</span>
        <span className="absolute bottom-1/4 right-1/5 text-2xl animate-sparkle delay-300">✨</span>
      </div>

      <div className="relative flex flex-col items-center max-w-xs text-center px-4">
        {/* Animated filling SVG Heart */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            <defs>
              <linearGradient id="heartGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#E899A5" />
                <stop offset="100%" stopColor="#FFB6C1" />
              </linearGradient>
              <clipPath id="heartClip">
                <path d="M 50 88 C 20 60 5 40 5 25 C 5 10 18 2 32 2 C 42 2 48 8 50 12 C 52 8 58 2 68 2 C 82 2 95 10 95 25 C 95 40 80 60 50 88 Z" />
              </clipPath>
            </defs>

            {/* Heart outline / background */}
            <path
              d="M 50 88 C 20 60 5 40 5 25 C 5 10 18 2 32 2 C 42 2 48 8 50 12 C 52 8 58 2 68 2 C 82 2 95 10 95 25 C 95 40 80 60 50 88 Z"
              fill="#FFD1DC"
              opacity="0.4"
              stroke="#E899A5"
              strokeWidth="2"
            />

            {/* Filling layer */}
            <rect
              x="0"
              y={100 - progress}
              width="100"
              height={progress}
              fill="url(#heartGradient)"
              clipPath="url(#heartClip)"
            />
          </svg>

          {/* Pulse effect at 100% */}
          {progress >= 100 && (
            <div className="absolute inset-0 rounded-full border-2 border-rose animate-ping opacity-75" />
          )}
        </div>

        {/* Counter Percentage */}
        <div className="font-serif text-3xl font-bold text-burgundy tracking-wider mb-3">
          {Math.floor(progress)}%
        </div>

        {/* Text Sequence Stagger */}
        <div className="h-10 flex items-center justify-center">
          <p
            key={textIndex}
            className="text-sm sm:text-base text-burgundy/80 font-medium animate-gentle-float transition-all duration-300"
          >
            {textSequence[textIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
