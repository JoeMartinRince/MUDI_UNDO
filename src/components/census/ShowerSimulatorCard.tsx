import { useEffect, useRef, useState } from "react";
import { ShowerHead, AlertTriangle, RefreshCw, Sparkles, Droplet } from "lucide-react";

interface ShowerSimulatorCardProps {
  initialPopulation?: number;
}

interface Drop {
  x: number;
  y: number;
  vy: number;
  length: number;
}

interface Strand {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  angle: number;
}

export function ShowerSimulatorCard({ initialPopulation = 50000 }: ShowerSimulatorCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [collectedCount, setCollectedCount] = useState(0);
  const [stage, setStage] = useState<"idle" | "showering" | "oh_no" | "complaint">("idle");

  const dropsRef = useRef<Drop[]>([]);
  const strandsRef = useRef<Strand[]>([]);
  const drainStrandsRef = useRef<Array<{ x: number; y: number; angle: number }>>([]);

  // Initialize Falling Water Drops & Hair Strands Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid & Drain Styling
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Shower Head at Top (250, 20)
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(250, 20, 24, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = "#475569";
      ctx.fillRect(245, 0, 10, 15);

      // Render Drain Grate at Bottom (250, 240)
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(250, 245, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Drain Holes
      ctx.fillStyle = "#020617";
      for (let r = 10; r <= 30; r += 10) {
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          ctx.beginPath();
          ctx.arc(250 + Math.cos(a) * r, 245 + Math.sin(a) * r, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render Accumulated Hair Strands on Drain
      drainStrandsRef.current.forEach((ds) => {
        ctx.beginPath();
        ctx.moveTo(ds.x, ds.y);
        ctx.lineTo(ds.x + Math.cos(ds.angle) * 12, ds.y + Math.sin(ds.angle) * 12);
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // If Shower Active: Spawn & Render Water Drops
      if (isRunning) {
        if (Math.random() > 0.2) {
          dropsRef.current.push({
            x: 230 + Math.random() * 40,
            y: 20,
            vy: 8 + Math.random() * 6,
            length: 8 + Math.random() * 8,
          });
        }

        // Spawn Hair Particles falling from Head (250, 100) toward Drain (250, 240)
        if (Math.random() > 0.4) {
          strandsRef.current.push({
            x: 230 + Math.random() * 40,
            y: 90,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 3.5 + Math.random() * 2.5,
            length: 14 + Math.random() * 10,
            angle: Math.random() * Math.PI,
          });
        }
      }

      // Render & Update Falling Water Drops
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      dropsRef.current.forEach((d) => {
        d.y += d.vy;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.length);
        ctx.stroke();
      });
      dropsRef.current = dropsRef.current.filter((d) => d.y < 250);

      // Render & Update Floating Hair Strands
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      strandsRef.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + Math.cos(s.angle) * s.length, s.y + Math.sin(s.angle) * s.length);
        ctx.stroke();

        // When strand hits drain area, accumulate
        if (s.y >= 235 && Math.hypot(s.x - 250, s.y - 245) < 40) {
          if (drainStrandsRef.current.length < 80) {
            drainStrandsRef.current.push({
              x: s.x,
              y: s.y,
              angle: s.angle,
            });
          }
        }
      });
      strandsRef.current = strandsRef.current.filter((s) => s.y < 240);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isRunning]);

  // Handle Start Shower Animation Timeline
  const handleStartShower = () => {
    setIsRunning(true);
    setStage("showering");
    setCollectedCount(0);
    drainStrandsRef.current = [];

    // Increment count during shower
    const interval = setInterval(() => {
      setCollectedCount((prev) => prev + Math.round(180 + Math.random() * 240));
    }, 250);

    // Stage 2: "OH NO." after 2.2s
    setTimeout(() => {
      setStage("oh_no");
    }, 2200);

    // Stage 3: Complaint filed after 4.2s
    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setCollectedCount(2381);
      setStage("complaint");
    }, 4200);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStage("idle");
    setCollectedCount(0);
    drainStrandsRef.current = [];
  };

  return (
    <div className="border border-border bg-paper text-left overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <ShowerHead className="h-4.5 w-4.5 text-primary" />
          <h3 className="label-tech-ink font-bold">SHOWER HAIR SIMULATOR</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-700">
            FICTIONAL SIMULATION — NOT A HAIR-LOSS TEST
          </span>
          {stage !== "idle" && (
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
        {/* Main Counter Display */}
        <div className="border border-hairline bg-secondary/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="label-tech text-xs text-muted-foreground font-bold">SHOWER HAIR COLLECTED</div>
            <div className="wordmark text-3xl sm:text-4xl text-primary font-black">
              {collectedCount.toLocaleString()}{" "}
              <span className="text-xs font-sans font-normal text-foreground">FICTIONAL STRANDS</span>
            </div>
          </div>

          <button
            onClick={handleStartShower}
            disabled={isRunning}
            className={`border px-5 py-2.5 text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md ${
              isRunning
                ? "border-sky-500 bg-sky-600 text-paper animate-pulse cursor-not-allowed"
                : "border-primary bg-primary text-paper hover:bg-primary/90"
            }`}
          >
            <Droplet className="h-4 w-4" />
            <span>{isRunning ? "SHOWER RUNNING..." : "START SHOWER"}</span>
          </button>
        </div>

        {/* 60 FPS Canvas Shower Scene */}
        <div className="relative border-2 border-hairline bg-slate-950 rounded overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={500}
            height={280}
            className="w-full h-56 sm:h-64 block"
          />

          {/* Dynamic "OH NO." Dramatic Overlay */}
          {stage === "oh_no" && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-rise z-20">
              <div className="wordmark text-4xl sm:text-6xl text-rose-500 font-black tracking-widest animate-bounce">
                "OH NO."
              </div>
            </div>
          )}

          {/* Stage 3 Complaint Filed Overlay */}
          {stage === "complaint" && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-5 text-center space-y-3 animate-rise z-20">
              <div className="p-3 bg-rose-600/20 border border-rose-600 rounded-full animate-pulse">
                <AlertTriangle className="h-8 w-8 text-rose-500" />
              </div>
              <div className="wordmark text-2xl sm:text-3xl text-rose-500 font-black tracking-tight">
                YOUR SHOWER HAS FILED A COMPLAINT.
              </div>
              <p className="text-xs font-sans font-semibold text-slate-300 max-w-prose">
                The Plumbing Bureau reports severe fictional drainage clogging due to cumulative strand buildup.
              </p>
              <button
                onClick={handleReset}
                className="border border-sky-500 bg-sky-600 hover:bg-sky-700 text-paper font-mono text-xs font-bold px-4 py-2 rounded transition-all cursor-pointer shadow-md"
              >
                CLEAR SHOWER DRAIN
              </button>
            </div>
          )}
        </div>

        {/* Required Entertainment Disclaimer Box */}
        <div className="border-l-2 border-sky-600 bg-sky-500/10 p-3 text-xs text-foreground/90 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold label-tech text-[10px] text-sky-700">
              FICTIONAL SIMULATION — NOT A HAIR-LOSS TEST
            </div>
            <p className="text-[11px] leading-snug">
              THIS MINI-GAME IS FOR ENTERTAINMENT PURPOSES ONLY AND DOES NOT MEASURE REAL HAIR LOSS, CLINICAL SHEDDING, OR SCALP HEALTH.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
