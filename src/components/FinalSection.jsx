import React from 'react';
import { siteConfig } from '../data/config';

export default function FinalSection() {
  return (
    <footer
      id="final"
      className="relative py-20 px-4 bg-gradient-to-b from-cream via-blush/30 to-rose/20 text-center border-t border-rose/20 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Heart Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-cream shadow-romantic flex items-center justify-center border border-rose/30">
          <span className="text-3xl animate-heart-beat">💖</span>
        </div>

        {/* Main Heading */}
        <h2 className="font-serif text-4xl sm:text-6xl font-bold text-burgundy tracking-tight">
          Happy Birthday, {siteConfig.name} <span className="text-rose">❤️</span>
        </h2>

        {/* Date badge */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/80 border border-rose/30 shadow-xs">
          <span className="font-serif font-bold text-lg text-burgundy tracking-widest">
            14.10.2003
          </span>
        </div>

        {/* Closing Wish */}
        <p className="font-serif text-xl sm:text-2xl text-burgundy/80 font-medium italic max-w-xl mx-auto leading-relaxed">
          Here's to more memories, more laughter, more adventures, and more us.
        </p>

        {/* Footer Credit */}
        <div className="pt-12 border-t border-rose/20 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-medium text-burgundy/70">
          <span>Made with love by {siteConfig.senderName || "Lakshya"}, just for you</span>
          <span className="text-rose animate-heart-beat inline-block">❤️</span>
        </div>
      </div>
    </footer>
  );
}
