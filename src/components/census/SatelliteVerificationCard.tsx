import { useEffect, useState } from "react";
import { Globe, Radio, Search, CheckCircle2, ShieldAlert, Sparkles, Satellite } from "lucide-react";

interface SatelliteVerificationCardProps {
  hairPopulation?: number;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export function SatelliteVerificationCard({
  hairPopulation = 50000,
  onComplete,
  autoPlay = true,
}: SatelliteVerificationCardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const steps = [
    { icon: "📡", label: "Establishing satellite connection..." },
    { icon: "🛰️", label: "Connecting to orbital unit..." },
    { icon: "🌍", label: "Acquiring coordinates..." },
    { icon: "🔍", label: "Zooming into subject..." },
    { icon: "🧑‍🦱", label: "Analyzing hair population..." },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    if (activeStep < steps.length) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const confirmTimer = setTimeout(() => {
        setConfirmed(true);
        if (onComplete) {
          onComplete();
        }
      }, 800);
      return () => clearTimeout(confirmTimer);
    }
  }, [activeStep, autoPlay, steps.length, onComplete]);

  const confirmationText =
    hairPopulation > 80000
      ? "Satellite confirms: Still too much hair."
      : hairPopulation < 20000
      ? "Satellite confirms: Extreme aerodynamic scalp."
      : "Satellite confirms: Statistically valid human crown.";

  return (
    <div className="border-2 border-primary bg-slate-950 text-paper p-5 sm:p-7 text-left space-y-5 shadow-2xl relative overflow-hidden font-mono">
      {/* Background Scanning Radar Grid & HUD Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.4)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.4)_2px,rgba(255,255,255,0.4)_4px)] pointer-events-none" />

      {/* Top Satellite HUD Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-sky-400">
          <Satellite className="h-5 w-5 animate-pulse" />
          <h3 className="wordmark text-2xl sm:text-3xl text-paper font-black tracking-wide">
            SATELLITE VERIFICATION
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-xs font-bold text-sky-400">
            SIMULATED SATELLITE VERIFICATION
          </span>
          {!confirmed && (
            <button
              onClick={() => {
                setActiveStep(steps.length);
                setConfirmed(true);
                if (onComplete) onComplete();
              }}
              className="label-tech border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-sky-300 hover:text-paper cursor-pointer transition-colors"
            >
              FAST-FORWARD ⏩
            </button>
          )}
        </div>
      </div>

      <p className="relative z-10 text-xs text-slate-300 font-sans italic">
        "Cross-checking census data..."
      </p>

      {/* Futuristic Orbit Radar & Satellite Viewport */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-5 items-center">
        {/* Animated Satellite Radar Viewport */}
        <div className="relative h-44 sm:h-48 w-full border border-sky-500/40 bg-slate-900 flex items-center justify-center overflow-hidden rounded">
          {/* Radar Sweeping Beam */}
          <div className="absolute inset-0 border-2 border-sky-500/30 rounded-full scale-75 animate-ping opacity-30" />
          <div className="absolute inset-0 border border-sky-500/20 rounded-full scale-50" />
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(56,189,248,0.3)_360deg)] animate-spin opacity-70" />

          {/* Satellite Orbit Reticle Center */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-1">
            <span className="text-4xl select-none animate-bounce">🛰️</span>
            <div className="label-tech text-[10px] text-sky-300 font-bold bg-slate-950/80 px-2 py-0.5 border border-sky-500/40">
              ORBITAL UNIT ORB-09
            </div>
            <div className="label-tech text-[9px] text-slate-400 font-mono">
              LAT: 37.7749° N · LONG: -122.4194° W
            </div>
          </div>
        </div>

        {/* Animated Telemetry Steps Sequence */}
        <div className="space-y-2">
          <div className="label-tech text-[10px] text-slate-400 mb-1">TELEMETRY TIMELINE</div>

          <div className="space-y-2">
            {steps.map((step, idx) => {
              const isDone = activeStep > idx || confirmed;
              const isCurrent = activeStep === idx && !confirmed;

              return (
                <div
                  key={step.label}
                  className={`flex items-center gap-3 p-2 border transition-all duration-300 text-xs font-mono ${
                    isDone
                      ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 font-semibold"
                      : isCurrent
                      ? "border-sky-500 bg-sky-950/40 text-sky-300 font-bold shadow-sm"
                      : "border-slate-800 bg-slate-900/40 text-slate-500 opacity-60"
                  }`}
                >
                  <span className="text-base select-none">{step.icon}</span>
                  <span className="flex-1 tracking-wider uppercase text-[11px] sm:text-xs">
                    {step.label}
                  </span>
                  <span className="shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <Radio className="h-4 w-4 text-sky-400 animate-pulse" />
                    ) : (
                      "○"
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Satellite Confirmation Reveal Box */}
      {confirmed && (
        <div className="relative z-10 border-2 border-emerald-500 bg-emerald-950/40 p-4 sm:p-5 space-y-2 text-center animate-rise">
          <div className="label-tech text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" /> SATELLITE CONFIRMATION
          </div>
          <div className="wordmark text-2xl sm:text-3xl text-paper font-black tracking-tight italic">
            "{confirmationText}"
          </div>
          <div className="label-tech text-[10px] text-emerald-300/80">
            ORBITAL TELEMETRY CROSS-CHECK COMPLETE · MATCH VERIFIED 100%
          </div>
        </div>
      )}

      {/* Required Disclaimer Box */}
      <div className="relative z-10 border-t border-slate-800 pt-3 text-[10px] text-slate-400 label-tech flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-sky-400 font-bold">
          <ShieldAlert className="h-3.5 w-3.5" /> SIMULATED SATELLITE VERIFICATION
        </div>
        <div>THE SATELLITE IS FICTIONAL AND DOES NOT PERFORM PHYSICAL OR BIOMETRIC ANALYSIS.</div>
      </div>
    </div>
  );
}
