import { useState } from "react";
import { Sparkles } from "lucide-react";
import { HairGachaModal } from "./HairGachaModal";

interface HairGachaCardProps {
  censusNumber?: string;
}

export function HairGachaCard({ censusNumber = "MU-884920" }: HairGachaCardProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative">
        <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl select-none">🎰</span>
            <h3 className="wordmark text-2xl sm:text-3xl text-purple-400 font-black tracking-wider">
              HAIR GACHA
            </h3>
          </div>
          <span className="label-tech border border-purple-400/50 bg-purple-400/10 px-2 py-0.5 text-[10px] font-bold text-purple-300 uppercase">
            FOLLICLE LOTTERY
          </span>
        </div>

        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 text-paper flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="wordmark text-xl sm:text-2xl font-black text-paper flex items-center gap-2 justify-center sm:justify-start">
              <span>UNLOCK RARE HAIR ARTIFACTS</span>
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-xs text-slate-300 font-sans max-w-prose">
              Spin the official Hair Census Gacha Machine to collect Legendary Follicles, Anti-Static Combs, and Bedhead Protection Auras.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="label-tech flex items-center gap-2 border-2 border-purple-400 bg-purple-600 hover:bg-purple-500 text-paper font-black px-6 py-3 text-sm cursor-pointer shadow-lg hover:scale-105 transition-all shrink-0"
          >
            <span>🎰 SPIN GACHA</span>
          </button>
        </div>
      </div>

      <HairGachaModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        censusNumber={censusNumber}
      />
    </>
  );
}
