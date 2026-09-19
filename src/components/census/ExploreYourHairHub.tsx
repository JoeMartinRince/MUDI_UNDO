import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Compass } from "lucide-react";
import { CombSimulatorCard } from "./CombSimulatorCard";
import { ShowerSimulatorCard } from "./ShowerSimulatorCard";
import { WhereDidYourHairGoCard } from "./WhereDidYourHairGoCard";
import { PillowHairDetectorCard } from "./PillowHairDetectorCard";
import { HairGachaCard } from "./HairGachaCard";
import { HairBossBattleCard } from "./HairBossBattleCard";
import { HairWeatherForecastCard } from "./HairWeatherForecastCard";
import { HairSupportHotlineCard } from "./HairSupportHotlineCard";
import { HairCourtCard } from "./HairCourtCard";
import { HairStadiumCard } from "./HairStadiumCard";
import { HairEvolutionCard } from "./HairEvolutionCard";

interface ExploreYourHairHubProps {
  hairPopulation: number;
  hairCoverage: number;
  classification: string;
  censusNumber: string;
}

export function ExploreYourHairHub({
  hairPopulation,
  hairCoverage,
  classification,
  censusNumber,
}: ExploreYourHairHubProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const featureCards = [
    { id: "comb", label: "Comb Simulator", emoji: "🪮", badge: "MINI-GAME" },
    { id: "shower", label: "Shower Simulator", emoji: "🚿", badge: "SIMULATOR" },
    { id: "investigation", label: "CSI: Hair Unit", emoji: "🕵️", badge: "PARODY LAB" },
    { id: "gacha", label: "Hair Gacha", emoji: "🎰", badge: "LOTTERY" },
    { id: "battle", label: "Hair Boss Battle", emoji: "⚔️", badge: "CANVAS GAME" },
    { id: "weather", label: "Hair Weather", emoji: "🌦️", badge: "FORECAST" },
    { id: "support", label: "Hair Support", emoji: "☎️", badge: "HOTLINE" },
    { id: "court", label: "Hair Court", emoji: "⚖️", badge: "COURTROOM" },
    { id: "stadium", label: "Hair Stadium", emoji: "🏟️", badge: "VISUALIZER" },
    { id: "evolution", label: "Hair Evolution", emoji: "🧬", badge: "TREE" },
  ];

  const toggleFeature = (id: string) => {
    setActiveFeature((prev) => (prev === id ? null : id));
  };

  return (
    <section className="border-2 border-primary bg-slate-950 p-5 sm:p-7 space-y-6 text-paper font-mono rounded-md shadow-xl text-left">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="label-tech text-xs text-primary font-bold flex items-center gap-1.5">
            <Compass className="h-4 w-4 animate-spin" /> INTERACTIVE ENTERTAINMENT LABS
          </div>
          <h2 className="wordmark text-2xl sm:text-4xl font-black text-paper tracking-tight mt-0.5">
            EXPLORE YOUR HAIR
          </h2>
        </div>
        <span className="label-tech border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase">
          10 EXPERIMENTAL FEATURES
        </span>
      </div>

      {/* Grid Launcher Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {featureCards.map((item) => {
          const isActive = activeFeature === item.id;

          return (
            <button
              key={item.id}
              onClick={() => toggleFeature(item.id)}
              className={`border p-3.5 rounded text-left space-y-2 transition-all cursor-pointer shadow-md hover:scale-102 ${
                isActive
                  ? "border-primary bg-primary/20 ring-2 ring-primary/50"
                  : "border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="text-2xl select-none">{item.emoji}</span>
                <span className="label-tech text-[8px] border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-slate-400">
                  {item.badge}
                </span>
              </div>
              <div className="wordmark font-bold text-xs text-paper truncate">
                {item.label}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans pt-1">
                <span>{isActive ? "CLOSE FEATURE" : "LAUNCH"}</span>
                {isActive ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Expanded Feature Component Container */}
      {activeFeature && (
        <div className="pt-4 border-t border-slate-800 animate-rise space-y-6">
          {activeFeature === "comb" && (
            <CombSimulatorCard initialPopulation={hairPopulation} />
          )}

          {activeFeature === "shower" && (
            <ShowerSimulatorCard initialPopulation={hairPopulation} />
          )}

          {activeFeature === "investigation" && (
            <div className="space-y-6">
              <WhereDidYourHairGoCard hairPopulation={hairPopulation} censusNumber={censusNumber} />
              <PillowHairDetectorCard censusNumber={censusNumber} initialPopulation={hairPopulation} />
            </div>
          )}

          {activeFeature === "gacha" && (
            <HairGachaCard censusNumber={censusNumber} />
          )}

          {activeFeature === "battle" && (
            <HairBossBattleCard hairPopulation={hairPopulation} />
          )}

          {activeFeature === "weather" && (
            <HairWeatherForecastCard hairPopulation={hairPopulation} censusNumber={censusNumber} />
          )}

          {activeFeature === "support" && (
            <HairSupportHotlineCard censusNumber={censusNumber} />
          )}

          {activeFeature === "court" && (
            <HairCourtCard
              hairPopulation={hairPopulation}
              hairCoverage={hairCoverage}
              classification={classification}
              censusNumber={censusNumber}
            />
          )}

          {activeFeature === "stadium" && (
            <HairStadiumCard hairPopulation={hairPopulation} />
          )}

          {activeFeature === "evolution" && (
            <HairEvolutionCard
              classification={classification}
              hairPopulation={hairPopulation}
              hairCoverage={hairCoverage}
            />
          )}
        </div>
      )}
    </section>
  );
}
