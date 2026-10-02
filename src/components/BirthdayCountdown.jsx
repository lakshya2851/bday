import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check URL override: ?preview=birthday
    const params = new URLSearchParams(window.location.search);
    const isPreview = params.get('preview') === 'birthday';

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Oct 14 date object (Month is 9 in 0-indexed JS Date)
      const oct14ThisYear = new Date(currentYear, 9, 14, 0, 0, 0);
      const isTodayOct14 = now.getMonth() === 9 && now.getDate() === 14;

      if (isTodayOct14 || isPreview) {
        setIsBirthday(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      let targetDate = oct14ThisYear;
      if (now > oct14ThisYear) {
        targetDate = new Date(currentYear + 1, 9, 14, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Restrained Canvas Confetti & Balloon Celebration when isBirthday === true
  useEffect(() => {
    if (!isBirthday) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const confetti = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 25 + 10,
      color: ['#FFB6C1', '#E899A5', '#FFD1DC', '#FFFDD0', '#E8E3F5'][
        Math.floor(Math.random() * 5)
      ],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      confetti.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 1 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isBirthday]);

  return (
    <section
      id="countdown"
      className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-cream via-soft-pink/15 to-cream text-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <span className="px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-widest">
          {isBirthday ? 'Celebration Time 🎉' : 'The Big Moment'}
        </span>

        {isBirthday ? (
          <div className="mt-6 space-y-4">
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-burgundy animate-heart-beat">
              IT'S YOUR DAY, {siteConfig.name.toUpperCase()}! 🎂❤️
            </h2>
            <p className="font-handwriting text-2xl text-rose font-bold">
              Wishing you the happiest birthday filled with infinite love & joy! ✨
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy">
              Counting Down To Your Special Day
            </h2>
            <p className="font-handwriting text-xl text-rose font-medium">
              Every second brings us closer to celebrating you ⏳
            </p>

            {/* Countdown Timer Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mt-10">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-rose/30 shadow-romantic flex flex-col items-center justify-center"
                >
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-burgundy">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-rose font-semibold mt-2">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confetti Overlay Canvas */}
      {isBirthday && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}
    </section>
  );
}
