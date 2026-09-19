import { useState } from "react";
import { Search, ShieldAlert, FileQuestion, AlertOctagon, ChevronDown, ChevronUp, MapPin, Sparkles } from "lucide-react";

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
  const rawComb = 8 + ((seed * 11) % 10); // ~8-17%
  const totalRaw = rawPillow + rawShower + rawShampoo + rawComb;

  const pctPillow = Math.round((rawPillow / totalRaw) * 92);
  const pctShower = Math.round((rawShower / totalRaw) * 92);
  const pctShampoo = Math.round((rawShampoo / totalRaw) * 92);
  const pctComb = 92 - (pctPillow + pctShower + pctShampoo);
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
      id: "comb",
      emoji: "🪮",
      name: "Comb",
      alias: "Tangle Trawler Operative",
      percentage: pctComb,
      color: "bg-indigo-600",
      notes: "Traps loose strands in tooth grid during morning styling.",
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
    <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono">
      {/* Top CSI: HAIR UNIT Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <Search className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
          <h3 className="wordmark text-2xl sm:text-3xl text-rose-500 font-black tracking-wider">
            CSI: HAIR UNIT
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-rose-500/50 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 uppercase">
            COMEDY INVESTIGATION — NOT SCIENTIFIC
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="label-tech flex items-center gap-1 border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-rose-400 hover:text-paper cursor-pointer transition-colors"
          >
            {expanded ? (
              <>
                <span>HIDE DOSSIER</span> <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span>OPEN EVIDENCE BOARD</span> <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Crime Scene Caution Tape Banner */}
      <div className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest py-1 px-4 flex justify-between overflow-hidden select-none">
        <span>⚠️ CRIME SCENE · DO NOT ATTEMPT TO COMB ⚠️</span>
        <span className="hidden sm:inline">OFFICIAL DETECTIVE EVIDENCE BOARD</span>
        <span>DOSSIER #{censusNumber}</span>
      </div>

      {expanded && (
        <div className="p-4 sm:p-6 space-y-6 animate-rise">
          {/* Main Crime Scene Header Dossier */}
          <div className="border-2 border-hairline bg-secondary/30 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div className="label-tech font-bold text-primary flex items-center gap-1.5">
                <FileQuestion className="h-4 w-4" /> CRIME SCENE CASE FILE
              </div>
              <span className="label-tech font-bold text-muted-foreground">CASE #{censusNumber}</span>
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
                <span className="label-tech text-[10px] text-muted-foreground font-bold">REFERENCE BASELINE</span>
                <div className="wordmark text-2xl font-black text-primary mt-1">
                  {referencePopulation.toLocaleString()}
                </div>
                <span className="label-tech text-[0.55rem] text-muted-foreground">STANDARD CENSUS CROP</span>
              </div>

              <div className="border border-hairline bg-paper p-3 text-left">
                <span className="label-tech text-[10px] text-muted-foreground font-bold">MISSING HAIRS</span>
                <div className="wordmark text-2xl font-black text-rose-700 mt-1">
                  {estimatedDifference.toLocaleString()}
                </div>
                <span className="label-tech text-[0.55rem] text-muted-foreground">STRANDS UNDER INVESTIGATION</span>
              </div>
            </div>
          </div>

          {/* Evidence-Board Layout with Red Pin Connection Lines */}
          <div className="border-2 border-dashed border-rose-900/60 bg-slate-950 text-paper p-4 sm:p-6 space-y-5 relative rounded overflow-hidden shadow-inner">
            {/* Background Red Pin String Connections SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <line x1="50%" y1="20" x2="15%" y2="120" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="50%" y1="20" x2="35%" y2="120" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="50%" y1="20" x2="55%" y2="120" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="50%" y1="20" x2="75%" y2="120" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="50%" y1="20" x2="90%" y2="120" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
            </svg>

            <div className="relative z-10 flex flex-col items-center text-center space-y-1">
              <div className="inline-flex items-center gap-1 bg-rose-600 text-paper px-3 py-1 font-bold text-xs shadow-md">
                <MapPin className="h-3.5 w-3.5" /> CRIME BOARD CENTRAL EVIDENCE HUB
              </div>
              <div className="label-tech text-[10px] text-slate-400">
                CONNECTING SUSPECT PROBABILITIES · TOTAL SHARE 100%
              </div>
            </div>

            {/* Suspect Cards Lineup Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {suspects.map((suspect) => (
                <div
                  key={suspect.id}
                  className="border border-slate-800 bg-slate-900/90 p-3 space-y-2 relative rounded shadow-md hover:border-rose-500 transition-colors"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rose-600 border border-paper shadow-sm" />

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-2xl select-none">{suspect.emoji}</span>
                    <span className="wordmark text-lg font-black text-rose-400">{suspect.percentage}%</span>
                  </div>

                  <div>
                    <div className="wordmark font-black text-sm text-paper">{suspect.name}</div>
                    <div className="label-tech text-[9px] text-slate-400 truncate">{suspect.alias}</div>
                  </div>

                  <div className="h-1.5 w-full bg-slate-800 overflow-hidden rounded">
                    <div
                      className={`h-full ${suspect.color}`}
                      style={{ width: `${suspect.percentage}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-slate-300 font-sans italic leading-tight">
                    "{suspect.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Suspect & Case Status Stamp Box */}
          <div className="border-2 border-rose-600 bg-rose-950/40 p-5 text-center space-y-3 relative shadow-md">
            <div className="absolute top-3 right-3 border-2 border-rose-600 text-rose-500 font-mono text-[10px] font-black px-2 py-0.5 uppercase rotate-12 bg-slate-950 shadow-lg">
              CONFIDENTIAL
            </div>

            <div className="space-y-1">
              <div className="label-tech text-xs text-rose-400 font-bold">DETECTIVE VERDICT</div>
              <div className="wordmark text-2xl sm:text-4xl font-black text-paper tracking-tight">
                PRIMARY SUSPECT: <span className="text-rose-500 underline">THE PILLOW</span>
              </div>
            </div>

            <div className="hairline-t pt-3 space-y-1">
              <div className="wordmark text-3xl sm:text-5xl font-black text-rose-600 tracking-wider">
                CASE STATUS: UNSOLVED 🔍
              </div>
              <p className="text-xs text-slate-300 font-sans max-w-prose mx-auto">
                CSI: Hair Unit has placed Pillow, Shower, Shampoo, and Comb under active surveillance.
              </p>
            </div>
          </div>

          {/* Required Comedy Disclaimer */}
          <div className="border-l-2 border-rose-600 bg-rose-500/10 p-3 text-xs text-foreground/90 flex items-start gap-2 font-sans">
            <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold label-tech text-[10px] text-rose-700">
                COMEDY INVESTIGATION — NOT SCIENTIFIC
              </div>
              <p className="text-[11px] leading-snug text-muted-foreground">
                THIS PARODY CRIME INVESTIGATION IS FOR ENTERTAINMENT PURPOSES ONLY AND DOES NOT DETECT ACTUAL HAIR LOSS, DISEASE, OR CLINICAL MEDICAL CONDITIONS.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
