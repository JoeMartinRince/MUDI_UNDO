import { useState, useEffect, useRef } from "react";
import { Landmark, Sparkles, RefreshCw, Volume2, ShieldAlert, Award } from "lucide-react";

interface HairStadiumCardProps {
  hairPopulation: number;
}

export function HairStadiumCard({ hairPopulation }: HairStadiumCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capacityPercent, setCapacityPercent] = useState<number>(0);
  const [isFullCapacity, setIsFullCapacity] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  // High-performance HTML5 Canvas Particle Engine for Crowd & Confetti
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseY: number;
      phase: number;
    }> = [];

    let confetti: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vRot: number;
    }> = [];

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 300);

    // Initialize 800 high-performance stadium crowd particles
    const totalParticles = 800;
    const colors = ["#38bdf8", "#818cf8", "#f43f5e", "#fbbf24", "#34d399", "#e879f9"];

    for (let i = 0; i < totalParticles; i++) {
      const row = Math.floor(i / 80);
      const col = i % 80;
      const targetX = (width * 0.08) + (col / 80) * (width * 0.84);
      const targetY = (height * 0.35) + (row / 10) * (height * 0.55);

      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 50,
        y: height + 20,
        vx: (targetX - width * 0.5) * 0.025,
        vy: (targetY - height) * 0.025,
        size: 2.5 + Math.random() * 2,
        color: colors[i % colors.length],
        baseY: targetY,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let fillProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Stadium Arena Architecture Background
      const gridGradients = ctx.createLinearGradient(0, 0, 0, height);
      gridGradients.addColorStop(0, "#020617");
      gridGradients.addColorStop(1, "#0f172a");
      ctx.fillStyle = gridGradients;
      ctx.fillRect(0, 0, width, height);

      // Stadium Grandstand Tier Lines
      ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
      ctx.lineWidth = 1;
      for (let y = height * 0.35; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(width * 0.05, y);
        ctx.lineTo(width * 0.95, y);
        ctx.stroke();
      }

      // Sweeping Overhead Spotlight Beams
      const time = Date.now() * 0.002;
      ctx.save();
      ctx.globalAlpha = 0.15;
      const spotlight1X = width * 0.3 + Math.sin(time) * 150;
      const spotlight2X = width * 0.7 + Math.cos(time) * 150;

      const grad1 = ctx.createRadialGradient(spotlight1X, 0, 10, spotlight1X, height, 200);
      grad1.addColorStop(0, "#38bdf8");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(spotlight2X, 0, 10, spotlight2X, height, 200);
      grad2.addColorStop(0, "#fbbf24");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Update & Draw Stadium Crowd Particles
      if (fillProgress < 1) {
        fillProgress += 0.008;
        setCapacityPercent(Math.min(100, Math.round(fillProgress * 100)));
      } else {
        if (!isFullCapacity) {
          setIsFullCapacity(true);
          setIsAnimating(false);
          // Spawn celebratory confetti explosion
          for (let c = 0; c < 120; c++) {
            confetti.push({
              x: width * 0.5 + (Math.random() - 0.5) * 200,
              y: height * 0.4,
              vx: (Math.random() - 0.5) * 12,
              vy: -6 - Math.random() * 8,
              size: 4 + Math.random() * 4,
              color: colors[Math.floor(Math.random() * colors.length)],
              rotation: Math.random() * Math.PI * 2,
              vRot: (Math.random() - 0.5) * 0.2,
            });
          }
        }
      }

      particles.forEach((p, idx) => {
        // Move towards target seat during entry phase
        if (fillProgress < 1) {
          p.x += p.vx * 0.15;
          p.y += p.vy * 0.15;
        } else {
          // Ambient crowd wave animation
          const wave = Math.sin(time * 4 + p.x * 0.02) * 4;
          p.y = p.baseY + wave;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Confetti Particles
      confetti.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.2; // Gravity
        c.rotation += c.vRot;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
        ctx.restore();
      });

      confetti = confetti.filter((c) => c.y < height + 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating]);

  const refillStadium = () => {
    setCapacityPercent(0);
    setIsFullCapacity(false);
    setIsAnimating(true);
  };

  return (
    <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative">
      {/* Top Header */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-amber-400 animate-bounce" />
          <h3 className="wordmark text-2xl sm:text-3xl text-amber-400 font-black tracking-wider">
            THE HAIR STADIUM
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase">
            EFFICIENT PARTICLE ENGINE
          </span>
          <button
            onClick={refillStadium}
            className="label-tech flex items-center gap-1 border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-amber-300 hover:text-paper cursor-pointer transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>REFILL STADIUM</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Arena Box */}
      <div className="relative bg-slate-950 text-paper p-4 sm:p-6 space-y-5 overflow-hidden">
        {/* Army Count & Capacity Progress Bar Overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <div className="border-2 border-amber-500/40 bg-slate-900/90 p-4 rounded space-y-1 shadow">
            <div className="label-tech text-xs text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> YOUR HAIR ARMY
            </div>
            <div className="wordmark text-3xl sm:text-5xl font-black text-paper">
              {hairPopulation.toLocaleString()}
            </div>
            <span className="label-tech text-[10px] text-slate-400">REGISTERED FOLLICLE CITIZENS</span>
          </div>

          <div className="border-2 border-sky-500/40 bg-slate-900/90 p-4 rounded space-y-2 shadow">
            <div className="flex justify-between items-center text-xs">
              <span className="label-tech text-sky-400 font-bold">STADIUM CAPACITY</span>
              <span className="wordmark text-lg font-black text-sky-300">{capacityPercent}%</span>
            </div>

            <div className="h-4 w-full bg-slate-800 rounded overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-amber-400 transition-all duration-300 rounded-sm"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>

            <div className="label-tech text-[10px] text-slate-400 flex items-center justify-between">
              <span>ARENA OCCUPANCY RATIO</span>
              {isFullCapacity && <span className="text-emerald-400 font-bold">100% FULL</span>}
            </div>
          </div>
        </div>

        {/* High Performance 2D Canvas Stadium Layer */}
        <div className="relative border-2 border-slate-800 rounded overflow-hidden shadow-2xl h-[300px]">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Center Announcement Box when full */}
          {isFullCapacity && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-slate-950/90 border-2 border-amber-400 p-4 rounded text-center space-y-2 animate-rise shadow-2xl backdrop-blur-sm z-20">
              <div className="wordmark text-2xl sm:text-4xl font-black text-amber-400 tracking-wider flex items-center justify-center gap-2">
                <Award className="h-6 w-6 text-amber-400" /> FULL CAPACITY REACHED.
              </div>
              <p className="text-xs sm:text-sm font-sans font-bold text-slate-200 italic">
                "Additional infrastructure may be required to house your hair army."
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Disclaimer Footer */}
      <div className="bg-slate-950 border-t border-slate-800 p-3 text-[11px] text-slate-400 flex items-center justify-between font-sans">
        <div className="flex items-center gap-2">
          <span className="label-tech text-[10px] font-bold text-amber-400 border border-amber-400/40 px-1.5 py-0.5">
            FICTIONAL VISUALIZATION
          </span>
          <span>THIS STADIUM IS A FICTIONAL SIMULATION FOR ENTERTAINMENT PURPOSES ONLY.</span>
        </div>
      </div>
    </div>
  );
}
