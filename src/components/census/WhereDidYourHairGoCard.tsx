import { useState } from "react";
import { Search, ShieldAlert, FileQuestion, HelpCircle, AlertOctagon, ChevronDown, ChevronUp } from "lucide-react";

interface WhereDidYourHairGoCardProps {
  hairPopulation: number;
  censusNumber: string;
}

export function WhereDidYourHairGoCard({ hairPopulation, censusNumber }: WhereDidYourHairGoCardProps) {
  // Reference baseline population of 100,000 strands
  const referencePopulation = 100000;
  const estimatedDifference = Math.max(0, referencePopulation - hairPopulation);

  // Auto-expand card if population is lower than 80,000, but accessible manually for all
  const [expanded, setExpanded] = useState<boolean>(hairPopulation < 80000);

  // Generate deterministic suspect percentages totaling 100% based on census number
  const seed = censusNumber.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const rawPillow = 25 + (seed % 15); // ~25-39%
  const rawShower = 20 + ((seed * 3) % 15); // ~20-34%
  const rawShampoo = 15 + ((seed * 7) % 12); // ~15-26%
  const rawSleep = 8 + ((seed * 11) % 10); // ~8-17%
  const totalRaw = rawPillow + rawShower + rawShampoo + rawSleep;
  
  // Remaining goes to Unknown
  const pctPillow = Math.round((rawPillow / totalRaw) * 92);
  const pctShower = Math.round((rawShower / totalRaw) * 92);
  const pctShampoo = Math.round((rawShampoo / totalRaw) * 92);
  const pctSleep = 92 - (pctPillow + pctShower + pctShampoo);
  const pctUnknown = 8; // Constant mystery 8%

  const suspects = [
    {
      id: "pillow",
      emoji: "🛏️",
      name: "Pillow",
      alias: "Frictional Friction Suspect",
      percentage: pctPillow,
      color: "bg-amber-600",
      notes: "Suspected of absorbing strands during nocturnal tossing & turning.",
    },
    {
      id: "shower",
      emoji: "🚿",
      name: "Shower",
      alias: "Aquatic Drain Syndicate",
      percentage: pctShower,
      color: "bg-sky-600",
      notes: "Known accomplice in whirlpool drainage escapes.",
    },
    {
      id: "shampoo",
      emoji: "🧴",
      name: "Shampoo",
      alias: "Sudsy Lather Smuggler",
      percentage: pctShampoo,
      color: "bg-purple-600",
      notes: "Rinses away evidence under the cover of dense foam.",
    },
    {
      id: "sleep",
      emoji: "😴",
      name: "Sleep",
      alias: "Midnight REM Heist",
      percentage: pctSleep,
      color: "bg-indigo-600",
      notes: "Strands vanish into dreams while subject is unconscious.",
    },
    {
      id: "unknown",
      emoji: "❓",
      name: "Unknown",
      alias: "Spatiotemporal Anomaly",
      percentage: pctUnknown,
      color: "bg-emerald-600",
      notes: "Unexplained disappearance into parallel dimensions.",
    },
  ];

  return (
    <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm">
      {/* Top Police Investigation Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Search className="h-4.5 w-4.5 text-primary animate-pulse" />
          <h3 className="label-tech-ink font-black tracking-wide text-foreground">WHERE DID YOUR HAIR GO?</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-rose-500/50 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-700 uppercase">
            COMEDY INVESTIGATION — NOT SCIENTIFIC
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="label-tech flex items-center gap-1 border border-hairline bg-paper px-2 py-0.5 text-xs text-primary hover:bg-secondary cursor-pointer"
          >
            {expanded ? (
              <>
                <span>HIDE CASE FILE</span> <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span>OPEN INVESTIGATION</span> <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Police Crime Scene Caution Tape Banner */}
      <div className="bg-amber-400 text-slate-950 font-mono text-[10px] font-black uppercase tracking-widest py-1 px-4 flex justify-between overflow-hidden select-none">
        <span>⚠️ BUREAU HAIR CRIME SCENE ⚠️</span>
        <span className="hidden sm:inline">DO NOT ATTEMPT TO COMB</span>
        <span>CONFIDENTIAL DOSSIER</span>
      </div>

      {expanded && (
        <div className="p-4 sm:p-6 space-y-6 animate-rise">
          {/* Main Investigation Figures Grid */}
          <div className="border border-hairline bg-secondary/20 p-4 space-y-3">
            <div className="label-tech font-bold text-xs text-foreground flex items-center gap-1.5">
              <FileQuestion className="h-4 w-4 text-primary" /> HAIR INVESTIGATION METRICS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="border border-hairline bg-paper p-3 text-left">
                <span className="label-tech text-[10px] text-muted-foreground font-bold">ESTIMATED POPULATION</span>
                <div className="wordmark text-2xl font-black text-foreground mt-1">
                  {hairPopulation.toLocaleString()}
                </div>
                <span className="label-tech text-[0.55rem] text-muted-foreground">SCALP COUNT ON RECORD</span>
              </div>

              <div className="border border-hairline bg-paper p-3 text-left">
                <span className="label-tech text-[10px] text-muted-foreground font-bold">REFERENCE POPULATION</span>
                <div className="wordmark text-2xl font-black text-primary mt-1">
                  {referencePopulation.toLocaleString()}
                </div>
                <span className="label-tech text-[0.55rem] text-muted-foreground">STANDARD BUREAU BENCHMARK</span>
              </div>

              <div className="border border-hairline bg-paper p-3 text-left">
                <span className="label-tech text-[10px] text-muted-foreground font-bold">ESTIMATED DIFFERENCE</span>
                <div className="wordmark text-2xl font-black text-rose-700 mt-1">
                  {estimatedDifference.toLocaleString()}
                </div>
                <span className="label-tech text-[0.55rem] text-muted-foreground">MISSING FOLLICLES UNDER INVESTIGATION</span>
              </div>
            </div>
          </div>

          {/* Suspect Lineup Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs label-tech">
              <span className="font-bold text-foreground">FICTIONAL SUSPECT LINEUP</span>
              <span className="text-[10px] text-muted-foreground">PROBABILITY SHARE TOTAL: 100%</span>
            </div>

            <div className="space-y-2.5">
              {suspects.map((suspect) => (
                <div key={suspect.id} className="border border-hairline bg-paper p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{suspect.emoji}</span>
                      <div>
                        <span className="wordmark font-black text-sm text-foreground">{suspect.name}</span>
                        <span className="label-tech text-[10px] text-muted-foreground ml-2">({suspect.alias})</span>
                      </div>
                    </div>
                    <span className="wordmark font-black text-base text-primary">{suspect.percentage}%</span>
                  </div>

                  {/* Progress Bar for Suspect */}
                  <div className="h-2 w-full bg-secondary/80 overflow-hidden border border-hairline">
                    <div
                      className={`h-full ${suspect.color} transition-all duration-700 ease-out`}
                      style={{ width: `${suspect.percentage}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-muted-foreground italic font-sans">
                    "{suspect.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Status Detective Stamp Box */}
          <div className="border-2 border-dashed border-rose-600 bg-rose-500/10 p-4 text-center space-y-2 relative">
            <div className="absolute top-2 right-2 border border-rose-600 text-rose-700 font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase rotate-6">
              CASE REF #{censusNumber}
            </div>

            <div className="label-tech text-xs text-rose-800 font-bold">DEPARTMENT FINDING</div>
            <div className="wordmark text-3xl sm:text-4xl font-black text-rose-700 tracking-wider">
              CASE STATUS: UNSOLVED 🔍
            </div>
            <p className="text-xs text-foreground/80 font-sans max-w-prose mx-auto">
              The Bureau has launched an official surveillance protocol. Pillow, Shower, and Shampoo remain under active observation.
            </p>
          </div>

          {/* Mandatory Comedy Disclaimer */}
          <div className="border-l-2 border-rose-600 bg-rose-500/10 p-3 text-xs text-foreground/90 flex items-start gap-2">
            <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold label-tech text-[10px] text-rose-700">
                COMEDY INVESTIGATION — NOT SCIENTIFIC
              </div>
              <p className="text-[11px] leading-snug">
                THIS IS A COMEDY FEATURE ONLY. THIS SYSTEM DOES NOT DETECT HAIR LOSS, DISEASE, MEDICAL CONDITIONS, OR ACTUAL CAUSES OF HAIR LOSS. FOR ENTERTAINMENT PURPOSES ONLY.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
