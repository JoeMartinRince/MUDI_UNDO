import { HelpCircle, Sparkles, AlertOctagon, CheckCircle } from "lucide-react";
import { useCountUp } from "./useCountUp";

interface GuessAccuracyCardProps {
  userGuess: number;
  actualEstimate: number;
  difference?: number;
  accuracy?: number;
}

export function GuessAccuracyCard({
  userGuess,
  actualEstimate,
  difference: passedDiff,
  accuracy: passedAcc,
}: GuessAccuracyCardProps) {
  const diff = passedDiff ?? Math.abs(actualEstimate - userGuess);
  
  // Sensible accuracy formula
  const calculatedAcc =
    passedAcc ??
    Math.max(0, Math.min(100, Math.round((1 - diff / Math.max(actualEstimate, userGuess, 1)) * 100)));

  const animatedGuess = useCountUp(userGuess, 1400, 200);
  const animatedEstimate = useCountUp(actualEstimate, 1400, 200);
  const animatedDiff = useCountUp(diff, 1400, 200);
  const animatedAccuracy = useCountUp(calculatedAcc, 1400, 200);

  // Funny messages depending on accuracy score
  let message = "Your prediction has been rejected by the Census Authority.";
  let badgeText = "PREDICTION REJECTED 🚫";
  let badgeColor = "border-destructive text-destructive bg-destructive/10";

  if (calculatedAcc >= 85) {
    message = "Are you secretly a hair scientist?";
    badgeText = "MASTER PREDICTOR 🔬";
    badgeColor = "border-emerald-600 text-emerald-700 bg-emerald-500/10 font-bold";
  } else if (calculatedAcc >= 50) {
    message = "Not bad, citizen.";
    badgeText = "ACCEPTABLE ESTIMATE 📜";
    badgeColor = "border-amber-600 text-amber-700 bg-amber-500/10 font-bold";
  }

  return (
    <section className="animate-rise border-2 border-primary bg-paper p-5 sm:p-7 text-left space-y-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h3 className="label-tech-ink text-base font-bold">GUESS YOUR HAIR COUNT — REVEAL</h3>
        </div>
        <span className={`label-tech border px-2.5 py-1 font-mono text-xs ${badgeColor}`}>
          {badgeText}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono">
        <div className="border border-hairline bg-muted/20 p-3">
          <span className="label-tech text-muted-foreground">YOUR GUESS</span>
          <div className="wordmark text-2xl font-black text-foreground mt-1.5">
            {animatedGuess.toLocaleString("en-US")}
          </div>
          <span className="label-tech text-[0.55rem] text-muted-foreground">SUBMITTED PREDICTION</span>
        </div>

        <div className="border border-hairline bg-muted/20 p-3">
          <span className="label-tech text-primary font-bold">CENSUS ESTIMATE</span>
          <div className="wordmark text-2xl font-black text-primary mt-1.5">
            {animatedEstimate.toLocaleString("en-US")}
          </div>
          <span className="label-tech text-[0.55rem] text-primary">AI CALCULATED</span>
        </div>

        <div className="border border-hairline bg-muted/20 p-3">
          <span className="label-tech text-muted-foreground">DIFFERENCE</span>
          <div className="wordmark text-2xl font-black text-foreground mt-1.5">
            {animatedDiff.toLocaleString("en-US")}
          </div>
          <span className="label-tech text-[0.55rem] text-muted-foreground">ABSOLUTE VARIANCE</span>
        </div>

        <div className="border border-hairline bg-muted/20 p-3">
          <span className="label-tech text-emerald-700 font-bold">GUESS ACCURACY</span>
          <div className="wordmark text-3xl font-black text-emerald-700 mt-1">
            {animatedAccuracy}%
          </div>
          <span className="label-tech text-[0.55rem] text-emerald-700 font-bold">SCORE RATIO</span>
        </div>
      </div>

      <div className="border-l-4 border-primary bg-secondary/40 p-4 space-y-1">
        <div className="label-tech text-primary font-bold flex items-center gap-1.5">
          <Sparkles className="h-4 w-4" /> BUREAU ACCURACY EVALUATION:
        </div>
        <p className="wordmark text-xl sm:text-2xl text-foreground italic">
          "{message}"
        </p>
      </div>

      <p className="label-tech text-[0.6rem] text-muted-foreground">
        THIS MINI-GAME IS FOR ENTERTAINMENT PURPOSES ONLY AND DOES NOT IMPLY SCIENTIFIC OR CLINICAL PRECISION.
      </p>
    </section>
  );
}
