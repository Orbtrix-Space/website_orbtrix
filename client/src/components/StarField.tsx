import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: [number, number, number];
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  life: number;
  maxLife: number;
  color: [number, number, number];
}

// Meteor-inspired palette: icy blues, blue-whites, cool cyans
const STAR_COLORS: [number, number, number][] = [
  [255, 255, 255],   // white
  [200, 220, 255],   // blue-white
  [160, 200, 255],   // light blue
  [120, 180, 255],   // sky blue
  [80, 160, 255],    // bright blue
  [140, 220, 255],   // cyan-blue
  [100, 200, 240],   // icy cyan
];

const METEOR_COLORS: [number, number, number][] = [
  [100, 180, 255],   // electric blue
  [60, 150, 255],    // deep sky blue
  [130, 200, 255],   // ice blue
  [80, 200, 240],    // bright cyan
];

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const pickColor = (colors: [number, number, number][]) =>
      colors[Math.floor(Math.random() * colors.length)];

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.6 + 0.3,
        opacity: Math.random() * 0.7 + 0.15,
        speed: Math.random() * 0.06 + 0.008,
        twinkleSpeed: Math.random() * 0.02 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: pickColor(STAR_COLORS),
      }));
    };

    const spawnShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.006) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
          opacity: 1,
          angle: (Math.random() * 30 + 15) * (Math.PI / 180),
          life: 0,
          maxLife: Math.random() * 55 + 30,
          color: pickColor(METEOR_COLORS),
        });
      }
    };

    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.35 + 0.65;
        const alpha = star.opacity * twinkle;
        const [r, g, b] = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height + 5) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }
      }

      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = 1 - s.life / s.maxLife;

        const [r, g, b] = s.color;
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        // Meteor glow
        const glow = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        glow.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.15})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.5})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = glow;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Bright core
        const core = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        core.addColorStop(0, `rgba(255, 255, 255, 0)`);
        core.addColorStop(0.7, `rgba(255, 255, 255, ${s.opacity * 0.3})`);
        core.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.8})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = core;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Head dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 0.9})`;
        ctx.fill();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      aria-hidden="true"
    />
  );
}
