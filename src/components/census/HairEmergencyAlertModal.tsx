import { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert, X, Radio, CheckCircle, Sparkles } from "lucide-react";
import type { CensusResult } from "@/data/census";

interface HairEmergencyAlertModalProps {
  result: CensusResult;
}

export function HairEmergencyAlertModal({ result }: HairEmergencyAlertModalProps) {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash] = useState(false);

  const pop = result.hairPopulation;
  const isHigh = pop >= 80000;
  const isLow = pop <= 20000;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if alert was already triggered for this specific census scan session
    const storageKey = `mudi_emergency_alert_triggered_${result.censusNumber}`;
    const alreadyTriggered = sessionStorage.getItem(storageKey);

    // Controlled trigger: trigger if high/low threshold met OR 50% random chance, and not already triggered
    const shouldTrigger = !alreadyTriggered && (isHigh || isLow || Math.random() > 0.5);

    if (shouldTrigger) {
      sessionStorage.setItem(storageKey, "true");
      
      // Delay alert slightly after page load for dramatic impact (1.2 seconds)
      const timer = setTimeout(() => {
        setOpen(true);
        setFlash(true);

        // Flash screen for 400ms
        setTimeout(() => setFlash(false), 450);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [result.censusNumber, isHigh, isLow]);

  // Countdown timer logic (3 -> 2 -> 1 -> 0)
  useEffect(() => {
    if (!open) return;

    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 900);
      return () => clearInterval(interval);
    } else {
      setRevealed(true);
    }
  }, [open, countdown]);

  if (!open) return null;

  // Determine dynamic copy based on hair population count
  const alertTitle = isHigh
    ? "HAIR POPULATION ALERT"
    : isLow
    ? "CRITICAL FOLLICULAR DEFICIT"
    : "STATISTICAL ANOMALY DETECTED";

  const alertSubtitle = isHigh
    ? "An unusually large number of hairs have been detected."
    : isLow
    ? "Unusually high aerodynamic scalp efficiency detected."
    : "Follicle density requires immediate Bureau documentation.";

  const statusText = isHigh
    ? "⚠️ ABOVE NATIONAL AVERAGE"
    : isLow
    ? "⚠️ AERODYNAMIC EXTREME"
    : "⚠️ UNUSUAL FOLLICULAR DISTRIBUTION";

  const recommendedAction = isHigh
    ? "Do absolutely nothing."
    : isLow
    ? "Secure all headwear immediately."
    : "Maintain current posture until further notice.";

  return (
    <>
      {/* Brief Screen Flash Strobe Overlay */}
      {flash && (
        <div className="fixed inset-0 z-50 bg-rose-600/30 backdrop-invert pointer-events-none animate-ping" />
      )}

      {/* Emergency Alert Modal Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
        {/* Emergency Alert Panel Container */}
        <div className="relative w-full max-w-lg border-2 border-rose-600 bg-slate-950 text-paper p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden font-mono text-left animate-rise">
          {/* Animated Background Scanning Lines */}
          <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(244,63,94,0.6)_2px,rgba(244,63,94,0.6)_4px)] pointer-events-none" />

          {/* Top Emergency Header Bar */}
          <div className="flex items-center justify-between border-b border-rose-600/50 pb-3">
            <div className="flex items-center gap-2 text-rose-500">
              <Radio className="h-4 w-4 animate-pulse" />
              <span className="label-tech text-xs font-bold tracking-widest uppercase">
                NATIONAL CENSUS EMERGENCY BROADCAST
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-paper p-1 rounded transition-colors cursor-pointer"
              title="Close Emergency Alert"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Hazard Pulsing Icon & Title */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-600/20 border border-rose-600/60 rounded shrink-0">
              <ShieldAlert className="h-8 w-8 text-rose-500 animate-bounce" />
            </div>
            <div className="space-y-1">
              <div className="wordmark text-2xl sm:text-3xl font-black text-rose-500 tracking-tight">
                🚨 {alertTitle}
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {alertSubtitle}
              </p>
            </div>
          </div>

          {/* Main Hair Population Stats Box */}
          <div className="border border-rose-600/40 bg-rose-950/30 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="label-tech text-slate-400">REGISTERED FOLLICLE COUNT</span>
              <span className="label-tech font-bold text-rose-400">{statusText}</span>
            </div>

            <div className="wordmark text-4xl sm:text-5xl font-black text-paper tracking-tight">
              {pop.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-400">HAIRS</span>
            </div>
          </div>

          {/* Short Countdown Reveal / Recommended Action */}
          <div className="border border-slate-800 bg-slate-900/80 p-4 space-y-2">
            <div className="label-tech text-[10px] text-slate-400 flex items-center justify-between">
              <span>DIRECTIVE PROTOCOL</span>
              {!revealed && (
                <span className="text-rose-400 font-bold animate-pulse">
                  CALCULATING DIRECTIVE IN {countdown}s...
                </span>
              )}
            </div>

            {!revealed ? (
              <div className="h-10 flex items-center justify-center space-x-2 text-rose-400 font-mono text-sm">
                <div className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <span>ANALYZING STRATEGIC RESPONSE... ({countdown})</span>
              </div>
            ) : (
              <div className="space-y-1 animate-rise">
                <div className="label-tech text-xs text-amber-400 font-bold flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400" /> RECOMMENDED ACTION:
                </div>
                <div className="wordmark text-xl text-paper font-black uppercase text-emerald-400">
                  {recommendedAction}
                </div>
              </div>
            )}
          </div>

          {/* Mandatory Required Entertainment Disclaimer */}
          <div className="border-t border-slate-800 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="label-tech text-[0.6rem] text-rose-400/90 font-bold">
              FICTIONAL CENSUS ALERT — FOR ENTERTAINMENT ONLY
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto border border-rose-600 bg-rose-600 hover:bg-rose-700 text-paper px-4 py-2 text-xs font-bold font-mono tracking-wider transition-all cursor-pointer shadow-md"
            >
              DISMISS EMERGENCY ALERT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
