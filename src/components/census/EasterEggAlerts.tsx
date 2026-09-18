import { AlertTriangle, Sparkles, Target, Zap, ShieldAlert } from "lucide-react";
import type { CensusResult } from "@/data/census";

interface EasterEggAlertsProps {
  result: CensusResult;
  nickname?: string;
}

export function EasterEggAlerts({ result, nickname }: EasterEggAlertsProps) {
  const pop = result.hairPopulation;
  const cov = result.hairCoverage;
  const nickLower = nickname?.toLowerCase().trim();

  const isLowHair = pop < 10000 || cov < 15;
  const isHighHair = pop > 120000 || cov > 85;
  const isPerfectRound = pop === 100000 || pop % 10000 === 0 || pop === 50000;
  const isSaitama = nickLower === "saitama" || nickLower?.includes("saitama");

  if (!isLowHair && !isHighHair && !isPerfectRound && !isSaitama) {
    return null;
  }

  return (
    <div className="space-y-3 animate-rise text-left">
      {/* 1. Very Low Hair Count Easter Egg */}
      {isLowHair && (
        <div className="border-2 border-rose-600 bg-rose-600/10 p-4 relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <div className="wordmark text-xl sm:text-2xl font-black text-rose-700 tracking-tight">
                🚨 CRITICAL LOW HAIR EVENT
              </div>
              <div className="label-tech text-xs font-bold text-rose-800">
                "Please remain calm."
              </div>
              <p className="text-xs text-foreground/80 font-sans">
                Follicle population has breached lower emergency thresholds. Emergency thermal caps are available at the Bureau front desk.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Extremely High Hair Count Easter Egg */}
      {isHighHair && (
        <div className="border-2 border-amber-500 bg-amber-500/10 p-4 relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <div className="wordmark text-xl sm:text-2xl font-black text-amber-700 tracking-tight">
                ⚠️ HAIR POPULATION ALERT
              </div>
              <div className="label-tech text-xs font-bold text-amber-800">
                "Additional infrastructure may be required."
              </div>
              <p className="text-xs text-foreground/80 font-sans">
                Scalp canopy density exceeds local zoning laws. Please clear immediate airspace for incoming barbers and heavy-duty combs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Exactly 100,000 / Perfectly Round Hair Easter Egg */}
      {isPerfectRound && (
        <div className="border-2 border-emerald-600 bg-emerald-600/10 p-4 relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-3">
            <Target className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="wordmark text-xl sm:text-2xl font-black text-emerald-700 tracking-tight">
                🎯 PERFECTLY ROUND HAIR
              </div>
              <div className="label-tech text-xs font-bold text-emerald-800">
                "Statistically suspicious."
              </div>
              <p className="text-xs text-foreground/80 font-sans">
                Your estimated hair count is a perfectly round integer. The Census Audit Department is inspecting your scalp for mathematical neatness.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Saitama Nickname Easter Egg */}
      {isSaitama && (
        <div className="border-2 border-primary bg-primary/10 p-4 relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-3">
            <Zap className="h-6 w-6 text-primary shrink-0 mt-0.5 animate-spin" />
            <div className="space-y-1">
              <div className="wordmark text-xl sm:text-2xl font-black text-primary tracking-tight">
                💥 HAIR CENSUS FAILED
              </div>
              <div className="label-tech text-xs font-bold text-primary">
                "Population too low."
              </div>
              <p className="text-xs text-foreground/80 font-sans">
                Hero Clearance Verified: 0 Drag Coefficient. You did 100 push-ups, 100 sit-ups, 100 squats, and a 10km run every single day.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
