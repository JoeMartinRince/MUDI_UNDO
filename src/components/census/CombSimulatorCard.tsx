import { useEffect, useRef, useState } from "react";
import { Scissors, AlertCircle, RefreshCw, Sparkles, Hand } from "lucide-react";

interface CombSimulatorCardProps {
  initialPopulation?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function CombSimulatorCard({ initialPopulation = 50000 }: CombSimulatorCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hairsDisturbed, setHairsDisturbed] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [isCombing, setIsCombing] = useState(false);
  const [combPos, setCombPos] = useState({ x: 250, y: 140 });
  const [showWarning, setShowWarning] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const strandsRef = useRef<Array<{ x: number; y: number; length: number; angle: number; currentAngle: number }>>([]);

  // Sound-ready interaction hook callback
  const triggerSwipeSoundHook = (intensity: number) => {
    // Sound hook stub for future Web Audio API expansion
    if (typeof window !== "undefined" && (window as any).onCombSwipe) {
      (window as any).onCombSwipe(intensity);
    }
  };

  // Initialize Canvas & Hair Strands
  useEffect(() => {
    const strands: Array<{ x: number; y: number; length: number; angle: number; currentAngle: number }> = [];
    const numStrands = 90;
    const centerX = 250;
    const centerY = 150;
    const radius = 80;

    for (let i = 0; i < numStrands; i++) {
      const angle = (i / numStrands) * Math.PI - Math.PI / 2;
      const r = radius * (0.4 + Math.random() * 0.6);
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r * 0.8 - 20;
      const baseAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;

      strands.push({
        x,
        y,
        length: 25 + Math.random() * 20,
        angle: baseAngle,
        currentAngle: baseAngle,
      });
    }

    strandsRef.current = strands;
  }, []);

  // 60 FPS Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid Lines
      ctx.strokeStyle = "rgba(51, 65, 85, 0.3)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Render Stylized Head Scalp Oval
      ctx.beginPath();
      ctx.ellipse(250, 150, 85, 75, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Render Head Emoji / Face
      ctx.font = "28px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(showWarning ? "😫" : isCombing ? "😮" : "😎", 250, 155);

      // Render & Spring-Animate Hair Strands
      strandsRef.current.forEach((s) => {
        // Return strand angle to base position smoothly
        s.currentAngle += (s.angle - s.currentAngle) * 0.1;

        const tipX = s.x + Math.cos(s.currentAngle) * s.length;
        const tipY = s.y + Math.sin(s.currentAngle) * s.length;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(
          s.x + (tipX - s.x) * 0.5 + 5,
          s.y + (tipY - s.y) * 0.5,
          tipX,
          tipY
        );
        ctx.strokeStyle = showWarning ? "#f43f5e" : "#fbbf24";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      // Update & Render Micro Hair Particles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      // Render Comb Graphic at Pointer Location
      if (combPos.x > 0 && combPos.y > 0) {
        ctx.save();
        ctx.translate(combPos.x, combPos.y);

        // Comb Body
        ctx.fillStyle = "#e11d48";
        ctx.fillRect(-25, -6, 50, 12);

        // Comb Teeth
        ctx.fillStyle = "#ffffff";
        for (let i = -22; i <= 22; i += 4) {
          ctx.fillRect(i, 6, 2, 10);
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [combPos, isCombing, showWarning]);

  // Pointer Drag Handler (Mouse & Touch compatible)
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;

    setCombPos({ x: px, y: py });

    // Check if dragging across hair region
    if (e.buttons === 1 || e.pointerType === "touch") {
      setIsCombing(true);

      const dx = px - 250;
      const dy = py - 150;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 110) {
        // Disturb strands & emit particles
        const swipeIncrement = Math.round(180 + Math.random() * 250);
        setHairsDisturbed((prev) => {
          const next = prev + swipeIncrement;
          if (next >= 15000) {
            setShowWarning(true);
          }
          return next;
        });

        setSwipeCount((prev) => prev + 1);
        triggerSwipeSoundHook(swipeIncrement);

        // Bend nearby strands
        strandsRef.current.forEach((s) => {
          const sDist = Math.hypot(px - s.x, py - s.y);
          if (sDist < 45) {
            s.currentAngle += (Math.random() - 0.5) * 1.2;
          }
        });

        // Spawn 4 micro particles
        for (let k = 0; k < 4; k++) {
          particlesRef.current.push({
            x: px + (Math.random() - 0.5) * 10,
            y: py + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 1,
            life: 0,
            maxLife: 25 + Math.random() * 15,
            color: "#fbbf24",
          });
        }
      }
    } else {
      setIsCombing(false);
    }
  };

  const handleReset = () => {
    setHairsDisturbed(0);
    setSwipeCount(0);
    setShowWarning(false);
  };

  return (
    <div className="border border-border bg-paper text-left overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <Scissors className="h-4.5 w-4.5 text-primary" />
          <h3 className="label-tech-ink font-bold">COMB SIMULATOR</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            FICTIONAL GAME STATISTICS
          </span>
          {hairsDisturbed > 0 && (
            <button
              onClick={handleReset}
              className="label-tech flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" /> RESET
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* Counter Display & Instruction */}
        <div className="border border-hairline bg-secondary/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="label-tech text-xs text-muted-foreground font-bold">HAIRS DISTURBED</div>
            <div className="wordmark text-3xl sm:text-4xl text-primary font-black">
              {hairsDisturbed.toLocaleString()} <span className="text-xs font-sans font-normal text-foreground">STRANDS</span>
            </div>
          </div>
          <div className="label-tech flex items-center gap-1.5 border border-border bg-paper px-3 py-1.5 text-xs text-foreground font-bold">
            <Hand className="h-4 w-4 text-primary animate-pulse" />
            <span>DRAG COMB ACROSS SCALP (MOUSE OR TOUCH)</span>
          </div>
        </div>

        {/* Interactive 60 FPS HTML5 Canvas Simulator */}
        <div className="relative border-2 border-hairline bg-slate-950 rounded overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={500}
            height={280}
            onPointerDown={handlePointerMove}
            onPointerMove={handlePointerMove}
            className="w-full h-56 sm:h-64 touch-none cursor-crosshair block"
          />

          {/* Interactive Comb Simulator Status Overlay */}
          <div className="absolute top-2 left-2 label-tech text-[10px] text-sky-400 bg-slate-900/90 border border-sky-500/40 px-2 py-1 backdrop-blur-sm">
            SWIPES LOGGED: {swipeCount} · STATUS: {isCombing ? "COMBING IN PROGRESS..." : "WAITING FOR SWIPE"}
          </div>

          {/* Warning Banner Overlay when Comb Limit Reached */}
          {showWarning && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3 animate-rise z-20">
              <div className="p-3 bg-rose-600/20 border border-rose-600 rounded-full animate-bounce">
                <AlertCircle className="h-8 w-8 text-rose-500" />
              </div>
              <div className="wordmark text-2xl sm:text-3xl text-rose-500 font-black tracking-tight">
                ⚠️ WARNING: PLEASE STOP COMBING.
              </div>
              <p className="text-sm font-sans font-semibold text-paper italic max-w-prose">
                "Your hair has requested a break."
              </p>
              <button
                onClick={handleReset}
                className="border border-rose-500 bg-rose-600 hover:bg-rose-700 text-paper font-mono text-xs font-bold px-4 py-2 rounded transition-all cursor-pointer shadow-md"
              >
                RESET COMB SIMULATOR
              </button>
            </div>
          )}
        </div>

        {/* Required Entertainment Disclaimer Box */}
        <div className="border-l-2 border-primary bg-secondary/30 p-3 text-xs text-foreground/90 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <div className="font-bold label-tech text-[10px] text-primary">NOTICE</div>
            <p className="text-[11px] leading-snug">
              THIS MINI-GAME IS FOR ENTERTAINMENT PURPOSES ONLY. HAIRS DISTURBED IS A FICTIONAL GAME METRIC AND DOES NOT ALTER OR IMPACT YOUR ACTUAL HAIR COUNT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
