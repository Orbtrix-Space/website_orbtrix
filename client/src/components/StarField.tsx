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

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: [number, number, number];
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const STAR_COLORS: [number, number, number][] = [
  [255, 255, 255],
  [200, 210, 255],
  [170, 180, 255],
  [129, 140, 248],   // indigo-light
  [99, 102, 241],    // indigo
  [167, 139, 250],   // violet
  [200, 200, 220],
];

const METEOR_COLORS: [number, number, number][] = [
  [99, 102, 241],    // indigo
  [129, 140, 248],   // indigo-light
  [20, 184, 166],    // teal
  [167, 139, 250],   // violet
];

const NEBULA_COLORS: [number, number, number][] = [
  [99, 102, 241],    // indigo
  [20, 184, 166],    // teal
  [129, 140, 248],   // indigo-light
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
    let nebulae: Nebula[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initNebulae();
    };

    const pickColor = (colors: [number, number, number][]) =>
      colors[Math.floor(Math.random() * colors.length)];

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.2,
        opacity: Math.random() * 0.8 + 0.1,
        speed: Math.random() * 0.05 + 0.005,
        twinkleSpeed: Math.random() * 0.025 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: pickColor(STAR_COLORS),
      }));
    };

    const initNebulae = () => {
      nebulae = Array.from({ length: 3 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 150,
        color: pickColor(NEBULA_COLORS),
        opacity: Math.random() * 0.015 + 0.005,
        pulseSpeed: Math.random() * 0.005 + 0.002,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    const spawnShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.008) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 10 + 5,
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

      // Draw nebulae
      for (const neb of nebulae) {
        const pulse = Math.sin(time * neb.pulseSpeed + neb.pulseOffset) * 0.3 + 0.7;
        const [r, g, b] = neb.color;
        const gradient = ctx.createRadialGradient(
          neb.x, neb.y, 0,
          neb.x, neb.y, neb.radius
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${neb.opacity * pulse})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${neb.opacity * pulse * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(neb.x - neb.radius, neb.y - neb.radius, neb.radius * 2, neb.radius * 2);
      }

      // Draw stars
      for (const star of stars) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const alpha = star.opacity * twinkle;
        const [r, g, b] = star.color;

        // Glow for brighter stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.08})`;
          ctx.fill();
        }

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

      // Shooting stars
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

        // Wider glow
        const outerGlow = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        outerGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        outerGlow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.08})`);
        outerGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.25})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = outerGlow;
        ctx.lineWidth = 6;
        ctx.stroke();

        // Meteor glow
        const glow = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        glow.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.2})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = glow;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Bright core
        const core = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        core.addColorStop(0, `rgba(255, 255, 255, 0)`);
        core.addColorStop(0.7, `rgba(255, 255, 255, ${s.opacity * 0.4})`);
        core.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = core;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Head dot with glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.3})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 0.95})`;
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
