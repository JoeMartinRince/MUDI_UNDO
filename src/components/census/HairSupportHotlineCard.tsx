import { useState } from "react";
import { Phone, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { HairSupportHotlineModal } from "./HairSupportHotlineModal";

interface HairSupportHotlineCardProps {
  censusNumber?: string;
}

export function HairSupportHotlineCard({ censusNumber = "MU-884920" }: HairSupportHotlineCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative">
        <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-emerald-400 animate-bounce" />
            <h3 className="wordmark text-2xl sm:text-3xl text-emerald-400 font-black tracking-wider">
              HAIR SUPPORT HOTLINE
            </h3>
          </div>
          <span className="label-tech border border-emerald-400/50 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
            24/7 FOLLICULAR HELPLINE
          </span>
        </div>

        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-paper flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="wordmark text-xl sm:text-2xl font-black text-paper flex items-center gap-2 justify-center sm:justify-start">
              <span>MUDI UNDO CENSUS HELPLINE</span>
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-300 font-sans max-w-prose">
              Experiencing rogue follicle movement, suspicious counting results, or unexpected volume spikes? Connect with our virtual support operators.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="label-tech flex items-center gap-2 border-2 border-emerald-400 bg-emerald-600 hover:bg-emerald-500 text-paper font-black px-6 py-3 text-sm cursor-pointer shadow-lg hover:scale-105 transition-all shrink-0"
          >
            <Phone className="h-4 w-4 animate-pulse" />
            <span>☎️ CALL HAIR SUPPORT</span>
          </button>
        </div>
      </div>

      <HairSupportHotlineModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        censusNumber={censusNumber}
      />
    </>
  );
}
