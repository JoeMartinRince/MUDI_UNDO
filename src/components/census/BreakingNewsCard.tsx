import { useState } from "react";
import { Tv, Radio, Sparkles } from "lucide-react";
import { BreakingNewsModal } from "./BreakingNewsModal";

interface BreakingNewsCardProps {
  hairPopulation: number;
  censusNumber?: string;
}

export function BreakingNewsCard({ hairPopulation, censusNumber = "MU-884920" }: BreakingNewsCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative">
        <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-rose-500 animate-pulse" />
            <h3 className="wordmark text-2xl sm:text-3xl text-rose-500 font-black tracking-wider">
              MUDI UNDO BREAKING NEWS
            </h3>
          </div>
          <span className="label-tech border border-rose-500/50 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 uppercase">
            SPECIAL TV BROADCAST
          </span>
        </div>

        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 text-paper flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="wordmark text-xl sm:text-2xl font-black text-paper flex items-center gap-2 justify-center sm:justify-start">
              <span>SPECIAL BROADCAST REPORT</span>
              <Sparkles className="h-4 w-4 text-rose-400" />
            </div>
            <p className="text-xs text-slate-300 font-sans max-w-prose">
              The Follicular News Network (FNN) has interrupted regular programming to cover your recent census statistics live on air.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="label-tech flex items-center gap-2 border-2 border-rose-500 bg-rose-600 hover:bg-rose-500 text-paper font-black px-6 py-3 text-sm cursor-pointer shadow-lg hover:scale-105 transition-all shrink-0"
          >
            <Tv className="h-4 w-4 animate-bounce" />
            <span>🔴 WATCH BREAKING NEWS</span>
          </button>
        </div>
      </div>

      <BreakingNewsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        hairPopulation={hairPopulation}
        censusNumber={censusNumber}
      />
    </>
  );
}
