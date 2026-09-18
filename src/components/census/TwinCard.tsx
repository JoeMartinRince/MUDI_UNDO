import { useState } from "react";
import type { CensusResult } from "@/data/census";
import { TwinExplorerModal } from "./TwinExplorerModal";
import { Users, Sparkles, ShieldAlert } from "lucide-react";
import { CensusButton } from "./CensusButton";

interface TwinCardProps {
  twin: CensusResult["twin"];
  hairCoverage?: number;
  scalpExposure?: number;
}

export function TwinCard({ twin, hairCoverage, scalpExposure }: TwinCardProps) {
  const [explorerOpen, setExplorerOpen] = useState(false);

  const imageSrc = twin.image || "/census-twins/placeholder.webp";
  const matchPercent = twin.matchScore ? `${Number(twin.matchScore).toFixed(0)}%` : "91%";

  const matchValue = twin.matchScore ?? 91;
  const totalBlocks = 20;
  const filledBlocks = Math.min(
    totalBlocks,
    Math.max(1, Math.round((matchValue / 100) * totalBlocks))
  );
  const blockMeterStr = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

  const coverageVal = hairCoverage ?? 78.4;
  const exposureVal = scalpExposure ?? Number((100 - coverageVal).toFixed(1));

  return (
    <>
      <section key={twin.id || twin.name} className="border border-border bg-paper p-0 text-left">
        {/* Header Bar */}
        <div className="hairline-b flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <h3 className="label-tech-ink font-bold">YOUR HAIR TWIN</h3>
          </div>
          <button
            onClick={() => setExplorerOpen(true)}
            className="label-tech flex items-center gap-1 text-primary hover:underline cursor-pointer"
          >
            <Users className="h-3.5 w-3.5" />
            <span>EXPLORE ALL 20 TWINS</span>
          </button>
        </div>

        <div className="flex flex-col items-center p-5 text-center sm:p-7">
          {/* Fictional Twin Character Avatar Container */}
          <div className="relative mx-auto my-2 flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden border-2 border-primary bg-secondary/40 shadow-md sm:h-56 sm:w-56">
            <div className="grid-paper absolute inset-0 opacity-40" aria-hidden />

            <img
              key={twin.id || twin.image}
              src={imageSrc}
              alt={twin.name}
              className="relative z-10 h-full w-full object-cover transition-opacity duration-300"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/census-twins/placeholder.webp";
              }}
            />

            <span className="label-tech absolute top-1.5 right-1.5 z-20 border border-border bg-paper/90 px-1.5 py-0.5 text-[10px] backdrop-blur-sm">
              CHARACTER MATCH ID #{twin.id ? twin.id.toUpperCase() : "MU-TWIN"}
            </span>
          </div>

          {/* Character Name & Franchise */}
          <h2 className="wordmark mt-4 text-3xl font-black text-foreground sm:text-4xl">{twin.name}</h2>
          {twin.franchise && (
            <div className="label-tech mt-1 text-xs tracking-wider text-muted-foreground uppercase font-bold">
              {twin.franchise}
            </div>
          )}

          {/* Fictional Hair Characteristic Tag */}
          <div className="mt-3 inline-flex items-center gap-1 border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="label-tech-ink text-xs font-bold">{twin.association}</span>
          </div>

          {/* Hair Similarity Match Score Box */}
          <div className="mt-5 w-full max-w-md border border-hairline bg-secondary/30 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="label-tech font-bold text-foreground">HAIR SIMILARITY</span>
              <span className="wordmark num-tabular text-2xl font-black text-primary">{matchPercent}</span>
            </div>

            <div className="mt-2.5 flex flex-col gap-1 text-left">
              <div className="label-tech text-[10px] text-muted-foreground">
                FOLLICULAR DENSITY MATCH INDEX
              </div>
              <div
                className="wordmark num-tabular tracking-widest text-foreground/90 text-sm select-none overflow-x-auto whitespace-nowrap"
                aria-label={`Similarity meter: ${matchPercent}`}
              >
                {blockMeterStr}
              </div>
            </div>
          </div>

          {/* Funny Character Description Quote */}
          <blockquote className="mt-4 max-w-prose border-l-2 border-primary bg-secondary/20 p-3 text-sm italic leading-relaxed text-foreground/90 sm:text-base">
            "{twin.note}"
          </blockquote>

          {/* Actual Census Metrics Comparison Strip */}
          <div className="hairline-t mt-6 grid w-full grid-cols-2 gap-3 pt-4 sm:max-w-md">
            <div className="border border-hairline bg-paper px-3 py-2 text-left">
              <span className="label-tech block text-[10px] text-muted-foreground">YOUR HAIR COVERAGE</span>
              <span className="wordmark num-tabular text-lg font-bold">{coverageVal.toFixed(1)}%</span>
            </div>
            <div className="border border-hairline bg-paper px-3 py-2 text-left">
              <span className="label-tech block text-[10px] text-muted-foreground font-bold">SCALP EXPOSURE</span>
              <span className="wordmark num-tabular text-lg font-bold">{exposureVal.toFixed(1)}%</span>
            </div>
          </div>

          {/* Strict Non-Facial Recognition Disclaimer */}
          <div className="mt-4 flex items-start gap-2 max-w-md border border-hairline bg-secondary/20 p-2.5 text-left text-[11px] text-muted-foreground label-tech">
            <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              IMPORTANT: THIS IS NOT FACIAL RECOGNITION. DOES NOT IDENTIFY THE REAL PERSON IN THE UPLOADED IMAGE. MATCHING IS BASED ONLY ON GENERATED HAIR STATISTICS.
            </span>
          </div>

          <div className="mt-4 w-full sm:max-w-md">
            <CensusButton
              variant="outline"
              size="sm"
              onClick={() => setExplorerOpen(true)}
              className="w-full"
            >
              <Users className="h-3.5 w-3.5 mr-1" /> VIEW FULL 20 CHARACTER ARCHIVE
            </CensusButton>
          </div>
        </div>
      </section>

      <TwinExplorerModal
        open={explorerOpen}
        onOpenChange={setExplorerOpen}
        activeTwinId={twin.id}
        userCoverage={coverageVal}
      />
    </>
  );
}
