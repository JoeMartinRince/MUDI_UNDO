import { useState } from "react";
import { Wind, Gauge, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";

interface WindTunnelCardProps {
  hairCoverage: number;
  baldnessIndex: number;
}

export function WindTunnelCard({ hairCoverage }: WindTunnelCardProps) {
  // Preset wind speeds required by prompt: 10 KM/H, 30 KM/H, 50 KM/H, 80 KM/H, 120 KM/H
  const windPresets = [10, 30, 50, 80, 120];
  const [currentKmH, setCurrentKmH] = useState<number>(30);

  // Deterministically calculate fictional MAXIMUM HAIR RESISTANCE based on hair coverage (e.g. 83 KM/H)
  const maxResistanceKmH = Math.min(115, Math.max(45, Math.round(50 + hairCoverage * 0.42)));

  // Calculate aerodynamic drag force (fictional game metric)
  const dragForceNewtons = Number((0.5 * 1.225 * Math.pow(currentKmH * 0.27778, 2) * 0.05).toFixed(1));

  // Hair deflection angle in degrees (0 to 45 deg)
  const deflectionDeg = Math.min(50, Math.round((currentKmH / 120) * 45));

  // Determine status message
  const isSurviving = currentKmH <= maxResistanceKmH;
  const statusMessage = isSurviving ? "Your hairstyle survived." : "ALERT: Maximum hair resistance exceeded!";

  return (
    <div className="border border-border bg-paper text-left">
      {/* Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <Wind className="h-4.5 w-4.5 text-primary" />
          <h3 className="label-tech-ink font-bold">HAIR STRESS TEST</h3>
        </div>
        <span className="label-tech border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-700">
          FICTIONAL GAME SCORE
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Top Fictional Resistance Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="border border-hairline bg-secondary/30 p-3.5 space-y-1">
            <div className="label-tech text-[10px] text-muted-foreground font-bold">MAXIMUM HAIR RESISTANCE</div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-primary">
              {maxResistanceKmH} <span className="text-xs font-sans font-bold text-foreground">KM/H</span>
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">CRITICAL BREAKING POINT</div>
          </div>

          <div className="border border-hairline bg-secondary/30 p-3.5 space-y-1">
            <div className="label-tech text-[10px] text-muted-foreground font-bold">CURRENT SIMULATED WIND</div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-foreground">
              {currentKmH} <span className="text-xs font-sans font-bold text-foreground">KM/H</span>
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">TESTING VELOCITY</div>
          </div>

          <div className="border border-hairline bg-secondary/30 p-3.5 space-y-1 col-span-2 sm:col-span-1">
            <div className="label-tech text-[10px] text-muted-foreground font-bold">AERODYNAMIC DRAG FORCE</div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-emerald-700">
              {dragForceNewtons} <span className="text-xs font-sans font-bold text-foreground">NEWTONS</span>
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground font-bold">TURBULENCE LOAD</div>
          </div>
        </div>

        {/* Interactive Wind Speed Selector Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs label-tech">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-primary" /> SELECT TEST WIND SPEED
            </span>
            <span className="text-primary font-bold">{currentKmH} KM/H</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {windPresets.map((speed) => {
              const active = currentKmH === speed;
              return (
                <button
                  key={speed}
                  onClick={() => setCurrentKmH(speed)}
                  className={`border py-2 px-1 text-center transition-all cursor-pointer ${
                    active
                      ? "border-primary bg-primary text-paper font-bold shadow-sm"
                      : "border-hairline bg-paper hover:bg-secondary/40 text-foreground"
                  }`}
                >
                  <div className="wordmark text-xs sm:text-sm font-black">{speed}</div>
                  <div className="label-tech text-[0.55rem] opacity-80">KM/H</div>
                </button>
              );
            })}
          </div>

          <input
            type="range"
            min={5}
            max={140}
            step={5}
            value={currentKmH}
            onChange={(e) => setCurrentKmH(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer mt-1"
          />
        </div>

        {/* Animated Hair Avatar Reaction Display */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden border-2 border-hairline bg-slate-950 text-paper p-4 flex flex-col justify-between shadow-inner">
          {/* Animated Wind Particle Stream Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <div
              className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(56,189,248,0.4)_20px,rgba(56,189,248,0.4)_40px)] animate-scanline"
              style={{
                animationDuration: `${Math.max(0.15, 1.8 - (currentKmH / 120) * 1.5)}s`,
              }}
            />
          </div>

          {/* Interactive Head & Hair Avatar SVG */}
          <div className="relative z-10 flex-1 flex items-center justify-center">
            <div
              className="relative transition-transform duration-300 flex flex-col items-center justify-center"
              style={{
                transform: `rotate(${currentKmH > maxResistanceKmH ? (Math.random() > 0.5 ? 4 : -4) : 0}deg) translateX(${
                  currentKmH > maxResistanceKmH ? (Math.random() > 0.5 ? 2 : -2) : 0
                }px)`,
              }}
            >
              {/* Scalp Head Avatar */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-slate-700 bg-slate-900 flex items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl select-none">
                  {currentKmH > maxResistanceKmH ? "😱" : currentKmH > 50 ? "😮" : "😎"}
                </span>

                {/* Animated Dynamic Hair Strands Overlay */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 sm:w-32 flex justify-center gap-1.5 pointer-events-none">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 sm:w-2 bg-amber-400 origin-bottom transition-all duration-200 rounded-t-full shadow-sm"
                      style={{
                        height: `${24 + (i % 3) * 6}px`,
                        transform: `rotate(${deflectionDeg + (i - 4) * 5}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Output Banner */}
          <div className="relative z-20 hairline-t pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span className="label-tech text-slate-400">TEST STATUS:</span>
              <span className={`font-bold ${isSurviving ? "text-emerald-400" : "text-rose-400 animate-pulse"}`}>
                {statusMessage}
              </span>
            </div>

            <div className="label-tech text-[10px] text-slate-400">
              DEFLECTION: {deflectionDeg}° · DEFENSE SCORE: {Math.round((maxResistanceKmH / 120) * 100)}%
            </div>
          </div>
        </div>

        {/* Fictional Game Score Disclaimer */}
        <div className="border-l-2 border-amber-500 bg-amber-500/10 p-3 text-xs text-foreground/90 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold label-tech text-[10px] text-amber-700">FICTIONAL GAME SCORE NOTICE</div>
            <p className="text-[11px] leading-snug">
              THIS FEATURE IS AN ENTERTAINMENT GAME SCORE SIMULATION AND IS NOT A REAL PHYSICAL OR AERODYNAMIC MEASUREMENT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
