import React, { useEffect, useState } from 'react';
import { siteConfig } from '../data/config';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!siteConfig.features.enableCustomCursor) {
      setEnabled(false);
      return;
    }

    // Check touch device
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) {
      setEnabled(false);
      return;
    }

    let lastSparkleTime = 0;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setPos({ x: clientX, y: clientY });

      // Check hoverable target
      const target = e.target;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(isClickable);

      // Create sparkle trail
      const now = Date.now();
      if (now - lastSparkleTime > 40) {
        lastSparkleTime = now;
        const newSparkle = {
          id: Math.random(),
          x: clientX + (Math.random() * 12 - 6),
          y: clientY + (Math.random() * 12 - 6),
          size: Math.random() * 8 + 4,
        };
        setSparkles((prev) => [...prev.slice(-12), newSparkle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [sparkles]);

  if (!enabled) return null;

  return (
    <>
      {/* Sparkle Trail */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="fixed pointer-events-none z-50 transition-opacity duration-500 ease-out"
          style={{
            left: `${sp.x}px`,
            top: `${sp.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span
            className="block text-rose/80 animate-ping"
            style={{ fontSize: `${sp.size}px` }}
          >
            ✨
          </span>
        </div>
      ))}

      {/* Main Heart Cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 custom-cursor transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            isPointer ? 1.4 : 1
          })`,
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-8 h-8 rounded-full bg-soft-pink/30 blur-sm animate-pulse" />
          <span className="text-sm select-none drop-shadow-sm">💖</span>
        </div>
      </div>
    </>
  );
}
