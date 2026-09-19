import { useState, useEffect } from "react";
import { Dna, Sparkles, ChevronRight, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";

interface HairEvolutionCardProps {
  classification: string;
  hairPopulation: number;
  hairCoverage: number;
}

export function HairEvolutionCard({ classification, hairPopulation, hairCoverage }: HairEvolutionCardProps) {
  // Define 6 evolutionary stages
  const evolutionStages = [
    { level: 1, emoji: "👶", title: "Infant Fuzz", species: "NEONATAL CROP", minCount: 0 },
    { level: 2, emoji: "🌱", title: "Sprout Crop", species: "GERMINATED STRANDS", minCount: 15000 },
    { level: 3, emoji: "🌾", title: "Wheat Meadow", species: "SAVANNA TIER", minCount: 35000 },
    { level: 4, emoji: "🌳", title: "Oak Forest", species: "TEMPERATE CANOPY", minCount: 65000 },
    { level: 5, emoji: "🌲", title: "Pine Canopy", species: "RAINFOREST CLASS", minCount: 85000 },
    { level: 6, emoji: "🌴", title: "Tropical Jungle", species: "AMAZON PRIME BIOME", minCount: 110000 },
  ];

  // Determine target stage index based on population / classification
  const getTargetStageIndex = () => {
    if (hairPopulation >= 110000 || classification.toLowerCase().includes("amazon")) return 5;
    if (hairPopulation >= 85000 || classification.toLowerCase().includes("rainforest")) return 4;
    if (hairPopulation >= 65000 || classification.toLowerCase().includes("forest")) return 3;
    if (hairPopulation >= 35000 || classification.toLowerCase().includes("savanna")) return 2;
    if (hairPopulation >= 15000 || classification.toLowerCase().includes("grassland")) return 1;
    return 0;
  };

  const targetIndex = getTargetStageIndex();
  const targetStage = evolutionStages[targetIndex];

  // Calculate Evolution Level (e.g. 87)
  const evolutionLevel = Math.min(99, Math.max(12, Math.round((hairPopulation / 120000) * 85 + 14)));

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  // Animate step by step progression from 0 to targetIndex
  useEffect(() => {
    setIsAnimating(true);
    setActiveStep(0);
    let current = 0;
    const interval = setInterval(() => {
      if (current < targetIndex) {
        current += 1;
        setActiveStep(current);
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [targetIndex]);

  const replayAnimation = () => {
    setIsAnimating(true);
    setActiveStep(0);
    let current = 0;
    const interval = setInterval(() => {
      if (current < targetIndex) {
        current += 1;
        setActiveStep(current);
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 450);
  };

  const funnyDescriptions = [
    "Your hair has developed advanced ecosystem capabilities.",
    "Follicular evolution index indicates high photosynthesis efficiency.",
    "Crown biome has achieved self-sustaining ecological equilibrium.",
    "Strands have mutated to resist high-velocity wind turbulence.",
    "Scalp ecosystem qualified for protected national forest designation.",
  ];

  const selectedDescription = funnyDescriptions[hairPopulation % funnyDescriptions.length];

  return (
    <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative">
      {/* Top Header */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-emerald-400 animate-spin" />
          <h3 className="wordmark text-2xl sm:text-3xl text-emerald-400 font-black tracking-wider">
            HAIR EVOLUTION
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-emerald-400/50 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
            FICTIONAL HAIR EVOLUTION
          </span>
          <button
            onClick={replayAnimation}
            disabled={isAnimating}
            className="label-tech flex items-center gap-1 border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-emerald-300 hover:text-paper cursor-pointer transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isAnimating ? "animate-spin" : ""}`} />
            <span>REPLAY EVOLUTION</span>
          </button>
        </div>
      </div>

      {/* Main Evolution Canvas Stage */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-paper p-5 sm:p-7 space-y-6 overflow-hidden">
        {/* Visual Evolution Tree Progression Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="label-tech text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> FOLLICULAR EVOLUTIONARY TREE
            </span>
            <span className="label-tech text-slate-400 text-[10px]">
              STAGE {activeStep + 1} OF {evolutionStages.length}
            </span>
          </div>

          {/* Responsive Stage Stepper Node List */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
            {evolutionStages.map((stage, idx) => {
              const isPassed = idx <= activeStep;
              const isCurrentTarget = idx === targetIndex && !isAnimating;

              return (
                <div
                  key={stage.level}
                  className={`border p-3 text-center rounded relative transition-all duration-300 flex flex-col items-center justify-between min-h-[90px] ${
                    isCurrentTarget
                      ? "border-emerald-400 bg-emerald-900/60 ring-2 ring-emerald-400/50 scale-105 shadow-lg"
                      : isPassed
                      ? "border-emerald-500/50 bg-slate-900 text-emerald-300"
                      : "border-slate-800 bg-slate-950/60 text-slate-600"
                  }`}
                >
                  <div className="text-2xl sm:text-3xl select-none animate-pulse">
                    {stage.emoji}
                  </div>
                  <div className="space-y-0.5 mt-1">
                    <div className={`wordmark text-[10px] font-bold ${isPassed ? "text-paper" : "text-slate-500"}`}>
                      {stage.title}
                    </div>
                    <div className="label-tech text-[8px] opacity-70">STAGE {stage.level}</div>
                  </div>

                  {/* Active Indicator Arrow */}
                  {idx === activeStep && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlighted Evolution Level & Species Status Card */}
        <div className="border-2 border-emerald-500/40 bg-slate-900/90 p-5 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4 backdrop-blur-sm shadow-md">
          {/* Level Box */}
          <div className="space-y-1 text-center sm:text-left">
            <div className="label-tech text-xs text-emerald-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldCheck className="h-4 w-4" /> EVOLUTION LEVEL
            </div>
            <div className="wordmark text-4xl sm:text-6xl font-black text-paper tracking-tight">
              {evolutionLevel}
            </div>
            <div className="h-2 w-full bg-slate-800 rounded overflow-hidden mt-2">
              <div
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${(activeStep + 1) * 16.6}%` }}
              />
            </div>
          </div>

          {/* Species Box */}
          <div className="space-y-1 text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
            <div className="label-tech text-xs text-emerald-400 font-bold">HAIR SPECIES</div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">
              {targetStage.species}
            </div>
            <p className="text-xs text-slate-300 font-sans italic mt-1 leading-snug">
              "{selectedDescription}"
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Footer */}
      <div className="bg-slate-950 border-t border-slate-800 p-3 text-[11px] text-slate-400 flex items-center justify-between font-sans">
        <div className="flex items-center gap-2">
          <span className="label-tech text-[10px] font-bold text-emerald-400 border border-emerald-400/40 px-1.5 py-0.5">
            ENTERTAINMENT ONLY
          </span>
          <span>THIS EVOLUTION TREE IS FICTIONAL AND DOES NOT CONSTITUTE A BIOLOGICAL OR SCIENTIFIC CLASSIFICATION.</span>
        </div>
      </div>
    </div>
  );
}
