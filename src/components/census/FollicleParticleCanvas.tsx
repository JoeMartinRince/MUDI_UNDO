import { useEffect, useRef } from "react";
import { useCountUp } from "./useCountUp";

interface FollicleParticleCanvasProps {
  targetPopulation: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  angle: number;
  orbitRadius: number;
  speed: number;
  opacity: number;
}

export function FollicleParticleCanvas({ targetPopulation, className = "" }: FollicleParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animatedCount = useCountUp(targetPopulation, 2000, 300);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth ?? 600);
    let height = (canvas.height = 260);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 260;
    };
    window.addEventListener("resize", handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Scale particle count for performance: 250 - 500 particles max representing full population
    const particleCount = Math.min(500, Math.max(150, Math.round(targetPopulation / 300)));
    const particles: Particle[] = [];

    const colors = [
      "rgba(16, 185, 129, 0.8)", // Emerald Green
      "rgba(52, 211, 153, 0.7)", // Mint
      "rgba(245, 158, 11, 0.6)", // Amber
      "rgba(255, 255, 255, 0.9)", // Crisp White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        radius: Math.random() * 2 + 1,
        color: colors[i % colors.length]!,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * (Math.min(width, height) * 0.42) + 40,
        speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      const expansionProgress = Math.min(1, elapsed / 2200);

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        p.angle += p.speed;

        const currentOrbit = p.orbitRadius * expansionProgress;
        p.x = centerX + Math.cos(p.angle) * currentOrbit;
        p.y = centerY + Math.sin(p.angle) * currentOrbit;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * expansionProgress;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle connecting lines between close particles
        if (i % 6 === 0 && i > 0) {
          const prev = particles[i - 1]!;
          const dx = p.x - prev.x;
          const dy = p.y - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(prev.x, prev.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPopulation]);

  return (
    <div className={`relative w-full border-2 border-primary bg-ink overflow-hidden rounded-xs p-4 ${className}`}>
      <div className="grid-paper absolute inset-0 opacity-20" aria-hidden />

      <canvas ref={canvasRef} className="relative z-10 w-full h-65 block" />

      {/* Center Count Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-paper select-none">
        <div className="label-tech text-paper/70 tracking-widest text-[0.65rem] font-mono uppercase">
          PARALLAX FOLLICLE FIELD VISUALIZATION
        </div>
        <div className="wordmark num-tabular text-5xl sm:text-7xl text-paper font-black tracking-tight mt-1 drop-shadow-md">
          {animatedCount.toLocaleString("en-US")}
        </div>
        <div className="label-tech text-emerald-400 font-mono font-bold mt-1 text-xs">
          ESTIMATED POPULATION FOLLICLES
        </div>
      </div>
    </div>
  );
}
