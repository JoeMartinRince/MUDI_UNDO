import { useState } from "react";
import { Scale, Sparkles, Gavel } from "lucide-react";
import { HairCourtModal } from "./HairCourtModal";

interface HairCourtCardProps {
  hairPopulation: number;
  hairCoverage: number;
  classification: string;
  censusNumber?: string;
}

export function HairCourtCard({
  hairPopulation,
  hairCoverage,
  classification,
  censusNumber = "MU-884920",
}: HairCourtCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative">
        <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-400 animate-bounce" />
            <h3 className="wordmark text-2xl sm:text-3xl text-amber-400 font-black tracking-wider">
              THE HAIR COURT
            </h3>
          </div>
          <span className="label-tech border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase">
            FOLLICULAR JUSTICE DIVISION
          </span>
        </div>

        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-paper flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="wordmark text-xl sm:text-2xl font-black text-paper flex items-center gap-2 justify-center sm:justify-start">
              <span>HIGH COURT TRIAL SESSION</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-xs text-slate-300 font-sans max-w-prose">
              The High Court of Follicular Justice has summoned your census record #{censusNumber} to examine charges of possessing an unreasonable amount of hair.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="label-tech flex items-center gap-2 border-2 border-amber-500 bg-amber-600 hover:bg-amber-500 text-paper font-black px-6 py-3 text-sm cursor-pointer shadow-lg hover:scale-105 transition-all shrink-0"
          >
            <Gavel className="h-4 w-4 animate-pulse" />
            <span>⚖️ ENTER COURTROOM</span>
          </button>
        </div>
      </div>

      <HairCourtModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        hairPopulation={hairPopulation}
        hairCoverage={hairCoverage}
        classification={classification}
        censusNumber={censusNumber}
      />
    </>
  );
}
