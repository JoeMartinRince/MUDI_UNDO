import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Trophy, Sparkles, ShieldCheck, Activity } from "lucide-react";
import { AuthoritySeal } from "./AuthoritySeal";

interface CinematicResultRevealCardProps {
  hairPopulation: number;
  hairCoverage: number;
  confidence: number;
  classification: string;
  censusNumber: string;
  onOpenNicknameModal?: () => void;
}

export function CinematicResultRevealCard({
  hairPopulation,
  hairCoverage,
  confidence,
  classification,
  censusNumber,
  onOpenNicknameModal,
}: CinematicResultRevealCardProps) {
  const [displayText, setDisplayText] = useState<string>("CENSUS COMPLETE");
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [showClassification, setShowClassification] = useState<boolean>(false);
  const [currentStepValue, setCurrentStepValue] = useState<string>("0");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const numStr = hairPopulation.toString();

  // Rapid digit building animation: "1" -> "11" -> "117" -> "1,174" -> "11,748" -> "117,482"
  useEffect(() => {
    const prefixes: string[] = [];
    for (let i = 1; i <= numStr.length; i++) {
      const slice = numStr.slice(0, i);
      const parsed = parseInt(slice, 10);
      prefixes.push(parsed.toLocaleString());
    }

    let step = 0;
    const interval = setInterval(() => {
      if (step < prefixes.length) {
        setCurrentStepValue(prefixes[step]);
        step++;
      } else {
        clearInterval(interval);
        setCurrentStepValue(hairPopulation.toLocaleString());
        setIsLocked(true);
        setDisplayText("HAIR POPULATION CONFIRMED");

        // Trigger classification transition after reveal lock-in
        setTimeout(() => {
          setShowClassification(true);
        }, 1200);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [hairPopulation, numStr]);

  // Particle burst Canvas Engine when locked in
  useEffect(() => {
    if (!isLocked) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 280);

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }> = [];

    const colors = ["#10b981", "#34d399", "#38bdf8", "#fbbf24", "#ffffff"];

    // Spawn 120 confetti sparkle particles from center
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      particles.push({
        x: width / 2,
        y: height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (particles.some((p) => p.life > 0)) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLocked]);

  return (
    <section className="animate-rise border-2 border-primary bg-slate-950 p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl text-paper rounded-md transition-all duration-700">
      {/* Background Radial Scan Grid Layer */}
      <div className="grid-paper absolute inset-0 opacity-15 pointer-events-none" />

      {/* Sweeping Radial Scan Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-primary/20 bg-primary/5 animate-[ping_4s_infinite] pointer-events-none" />

      {/* Particle Canvas Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-5">
        {/* Top Header Status Bar */}
        <div className="flex flex-wrap items-center justify-between w-full border-b border-slate-800 pb-3 gap-2">
          <div className="label-tech flex items-center gap-1.5 font-bold text-primary text-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>CENSUS STATUS: OFFICIALLY REGISTERED & VERIFIED</span>
          </div>
          {onOpenNicknameModal && (
            <button
              onClick={onOpenNicknameModal}
              className="label-tech flex items-center gap-1 font-bold text-amber-400 hover:underline cursor-pointer border border-amber-500/40 bg-amber-500/10 px-2.5 py-1"
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>REGISTER NICKNAME</span>
            </button>
          )}
        </div>

        {/* Bureau Seal & Headline */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <AuthoritySeal className="h-14 w-14 shrink-0" />
          <div className="text-center sm:text-left">
            <h1 className="wordmark text-3xl sm:text-5xl text-paper font-black tracking-tight">
              {displayText}
            </h1>
            <div className="label-tech text-primary font-bold mt-0.5">
              NATIONAL HAIR CENSUS AUTHORITY • OFFICIAL RECORD #{censusNumber}
            </div>
          </div>
        </div>

        {/* Rapid Digit-Building Count Box with Glowing Effect */}
        <div className="border-2 border-primary/50 bg-slate-900/90 p-6 sm:p-8 rounded-lg w-full max-w-xl space-y-2 relative shadow-2xl backdrop-blur-sm transition-transform duration-500 scale-100 hover:scale-102">
          <div className="label-tech text-xs text-slate-400 font-bold tracking-widest">
            {isLocked ? "VERIFIED FOLLICLE POPULATION" : "CALCULATING DIGIT SEQUENCE..."}
          </div>

          <div
            className={`wordmark text-4xl sm:text-7xl font-black text-emerald-400 tracking-tight transition-all duration-300 ${
              isLocked
                ? "drop-shadow-[0_0_25px_rgba(16,185,129,0.9)] scale-105"
                : "animate-pulse"
            }`}
          >
            {currentStepValue}
          </div>

          <div className="label-tech text-[10px] text-slate-400 flex items-center justify-center gap-2 pt-1">
            <Activity className="h-3 w-3 text-primary animate-pulse" />
            <span>CONFIDENCE RATING: {confidence}% · VISION PIPELINE v2.0</span>
          </div>
        </div>

        {/* Post-reveal Classification Transition Banner */}
        {showClassification && (
          <div className="border-2 border-amber-500/50 bg-amber-950/40 p-4 rounded-md w-full max-w-xl space-y-1 animate-rise shadow-lg backdrop-blur-sm">
            <div className="label-tech text-xs text-amber-400 font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="h-4 w-4" /> HAIR CLASSIFICATION UNLOCKED
            </div>
            <div className="wordmark text-3xl sm:text-4xl font-black text-amber-300 uppercase tracking-tight">
              {classification}
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              Scalp ecosystem assigned to official census classification tier.
            </p>
          </div>
        )}

        {/* Authority Metrics Strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full pt-2 text-left font-mono">
          <div className="border border-slate-800 bg-slate-900 p-3">
            <span className="label-tech text-slate-400">DENSITY INDEX</span>
            <div className="wordmark text-xl text-emerald-400 font-bold mt-1">{hairCoverage}%</div>
            <span className="label-tech text-[0.55rem] text-slate-500">SCALP COVERAGE</span>
          </div>

          <div className="border border-slate-800 bg-slate-900 p-3">
            <span className="label-tech text-slate-400">CONFIDENCE</span>
            <div className="wordmark text-xl text-paper font-bold mt-1">{confidence}%</div>
            <span className="label-tech text-[0.55rem] text-slate-500">AI VISION SCORE</span>
          </div>

          <div className="border border-slate-800 bg-slate-900 p-3">
            <span className="label-tech text-slate-400">CLASSIFICATION</span>
            <div className="wordmark text-lg text-amber-400 font-bold mt-1 truncate">{classification}</div>
            <span className="label-tech text-[0.55rem] text-slate-500">ECOSYSTEM TIER</span>
          </div>

          <div className="border border-slate-800 bg-slate-900 p-3">
            <span className="label-tech text-slate-400">CENSUS ID</span>
            <div className="wordmark text-sm font-mono text-paper font-bold mt-1 truncate">{censusNumber}</div>
            <span className="label-tech text-[0.55rem] text-slate-500">REGISTRATION REF</span>
          </div>
        </div>
      </div>
    </section>
  );
}
