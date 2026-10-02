import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';

export default function MusicButton({ audioUnlocked }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(siteConfig.music.path);
    audio.loop = true;
    audio.volume = siteConfig.music.defaultVolume || 0.3;

    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });

    audio.addEventListener('error', () => {
      console.log('Audio file missing or failed to load. Operating in silent mode.');
      setAudioLoaded(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // When EntryGate is opened by user interaction, start audio playback automatically
  useEffect(() => {
    if (audioUnlocked && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay after user unlock prevented:', err);
        });
    }
  }, [audioUnlocked]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Audio playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-pill text-burgundy shadow-romantic hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        <span className={`text-base transition-transform duration-300 ${isPlaying ? 'animate-bounce' : ''}`}>
          {isPlaying ? '🎵' : '🎼'}
        </span>
        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? "Playing 'Meet' (Arijit Singh) 💕" : siteConfig.music.title}
        </span>
        {isPlaying && (
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-rose rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-soft-pink rounded-full animate-pulse delay-75" />
            <span className="w-1 h-2 bg-rose rounded-full animate-pulse delay-150" />
          </span>
        )}
      </button>
    </div>
  );
}
