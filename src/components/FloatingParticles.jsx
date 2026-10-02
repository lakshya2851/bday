import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../data/config';

export default function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!siteConfig.features.enableParticles) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 55;

    const shapes = ['heart', 'star', 'dot', 'sparkle'];
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (isMobile ? 10 : 16) + 6,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: ['#FFB6C1', '#E899A5', '#FFD1DC', '#E8E3F5', '#FFC0CB'][
        Math.floor(Math.random() * 5)
      ],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
    }));

    const drawHeart = (ctx, x, y, size, color, opacity, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        size,
        0,
        size
      );
      ctx.bezierCurveTo(
        0,
        size,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (ctx, x, y, size, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos(((1 + i * 2) * Math.PI) / 4) * size, Math.sin(((1 + i * 2) * Math.PI) / 4) * size);
        ctx.lineTo(Math.cos(((i * 2) * Math.PI) / 4) * (size / 2.5), Math.sin(((i * 2) * Math.PI) / 4) * (size / 2.5));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        if (p.shape === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.shape === 'star' || p.shape === 'sparkle') {
          drawStar(ctx, p.x, p.y, p.size * 0.7, p.color, p.opacity);
        } else {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        render();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
