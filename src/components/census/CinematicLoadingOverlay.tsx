import { useState, useEffect } from "react";
import { Search, Radio, Sparkles, Activity, ShieldAlert, Cpu } from "lucide-react";

interface CinematicLoadingOverlayProps {
  stageLabel?: string;
  subtext?: string;
}

export function CinematicLoadingOverlay({ stageLabel, subtext }: CinematicLoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [counterValue, setCounterValue] = useState<number>(14290);

  const cinematicMessages = [
    "🔍 Searching for hair...",
    "🧑‍🔬 Consulting hair scientists...",
    "📡 Contacting satellite...",
    "🧮 Counting...",
    "🛰️ Checking orbital records...",
    "🪮 Calculating comb requirements...",
    "🌳 Measuring forest density...",
    "Still counting...",
    "Please remain patient. You have a lot of hair.",
  ];

  // Message rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % cinematicMessages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Simulated rapid counter ticker for technical HUD effect
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCounterValue((prev) => Math.min(135000, prev + Math.floor(Math.random() * 8500 + 1200)));
    }, 150);
    return () => clearInterval(counterInterval);
  }, []);

  const activeMessage = stageLabel || cinematicMessages[messageIndex];

  return (
    <div className="relative border-2 border-primary bg-slate-950 text-paper p-6 sm:p-8 rounded-md overflow-hidden shadow-2xl space-y-6 font-mono select-none">
      {/* Background Technical Grid Overlay */}
      <div className="grid-paper absolute inset-0 opacity-15 pointer-events-none" />

      {/* Laser Scanning Line Animation */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[ping_2s_infinite,pulse_1s_infinite] shadow-[0_0_12px_var(--color-primary)] pointer-events-none" />

      {/* Ambient Particle Sparks */}
      <div className="absolute inset-0 pointer-events-none opacity-30 flex justify-around items-center">
        <div className="w-1 h-1 bg-primary rounded-full animate-[bounce_2s_infinite_0.1s]" />
        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-[bounce_2.5s_infinite_0.4s]" />
        <div className="w-1 h-1 bg-amber-400 rounded-full animate-[bounce_1.8s_infinite_0.7s]" />
      </div>

      {/* Header HUD Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary animate-pulse" />
          <span className="label-tech text-xs text-primary font-bold">
            NHCA VISION ANALYTICS ENGINE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-primary/50 bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary uppercase">
            SIMULATED LOADING HUD
          </span>
        </div>
      </div>

      {/* Main Rotating Message Display */}
      <div className="relative z-10 py-6 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary text-primary animate-bounce shadow-lg">
          <Cpu className="h-8 w-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="wordmark text-2xl sm:text-4xl font-black text-paper tracking-tight min-h-[48px] flex items-center justify-center animate-rise">
            {activeMessage}
          </div>
          {subtext && (
            <p className="text-xs text-slate-400 font-sans max-w-prose mx-auto">
              {subtext}
            </p>
          )}
        </div>

        {/* Technical Ticker & Counter Gauge */}
        <div className="inline-block border border-slate-800 bg-slate-900/80 px-4 py-2 rounded text-xs font-bold text-sky-400 font-mono">
          RAW ESTIMATED FOLLICLES: <span className="text-paper">{counterValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Sweeping Technical HUD Loading Bar */}
      <div className="relative z-10 space-y-2">
        <div className="h-2 w-full bg-slate-900 rounded overflow-hidden p-0.5 border border-slate-800">
          <div className="h-full bg-gradient-to-r from-primary via-sky-400 to-emerald-400 animate-[pulse_1s_infinite] rounded-sm w-full" />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-400">
          <span>PIPELINE PROTOCOL: NHCA-ANALYSIS-01</span>
          <span className="text-primary font-bold animate-blip">PROCESSING FOLLICLE MESH...</span>
        </div>
      </div>

      {/* Explicit Entertainment Disclaimer */}
      <div className="relative z-10 border-t border-slate-800 pt-3 text-[10px] text-slate-500 text-center font-sans">
        SIMULATED CENSUS LOADING — VISUAL HUD ANIMATIONS ARE FOR ENTERTAINMENT PURPOSES ONLY.
      </div>
    </div>
  );
}
