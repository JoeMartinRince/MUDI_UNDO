import { useState, useEffect } from "react";
import { CensusModal } from "./CensusModal";
import { Tv, Radio, X, Sparkles, AlertCircle, ArrowRight } from "lucide-react";

interface BreakingNewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hairPopulation: number;
  censusNumber?: string;
}

export function BreakingNewsModal({
  open,
  onOpenChange,
  hairPopulation,
  censusNumber = "MU-884920",
}: BreakingNewsModalProps) {
  const [tickerOffset, setTickerOffset] = useState<number>(0);

  // Marquee scroll animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open) {
      interval = setInterval(() => {
        setTickerOffset((prev) => (prev + 1) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [open]);

  const tickerItems = [
    "MUDI UNDO NEWS",
    "HAIR POPULATION RISING NATIONWIDE",
    "COMB PRICES EXPECTED TO INCREASE BY 14%",
    "NATIONAL SHAMPOO RESERVES HOLDING STEADY",
    "SCALP SURVEYORS ADVISE FRIZZ CAUTION",
    "LOCAL FOLLICLE DENSITY SURGES PAST RECORD HIGH",
  ];

  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="MUDI UNDO BREAKING NEWS"
      meta={`SPECIAL BROADCAST · REF ${censusNumber}`}
    >
      <div className="space-y-4 font-mono text-left relative overflow-hidden select-none">
        {/* TV Screen Viewport Container with CRT Scanline Effect */}
        <div className="relative border-4 border-slate-900 bg-slate-950 rounded-lg overflow-hidden shadow-2xl min-h-[360px] flex flex-col justify-between p-4 sm:p-6 text-paper">
          {/* Subtle CRT Scanlines & Screen Distortion Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20" />
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-30 z-20" />

          {/* Top Live Broadcast Header Banner */}
          <div className="relative z-30 flex items-center justify-between gap-2 border-b border-rose-600/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span className="bg-rose-600 text-paper font-black px-2.5 py-0.5 text-xs tracking-wider uppercase flex items-center gap-1">
                <Radio className="h-3.5 w-3.5" /> 🔴 BREAKING NEWS
              </span>
              <span className="label-tech text-[10px] text-slate-400 hidden sm:inline">
                FOLLICULAR NEWS NETWORK (FNN)
              </span>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              className="label-tech flex items-center gap-1 bg-slate-900 hover:bg-rose-950 border border-slate-700 text-rose-400 hover:text-paper px-3 py-1 text-xs cursor-pointer transition-colors z-40"
            >
              <span>SKIP BROADCAST</span>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Central News Anchor Studio Graphic & Main Headline */}
          <div className="relative z-30 my-6 space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-500/10 text-amber-300 px-3 py-1 text-xs font-bold rounded">
              <Tv className="h-4 w-4" /> LIVE SPECIAL REPORT FROM THE BUREAU
            </div>

            <div className="space-y-2">
              <h2 className="wordmark text-2xl sm:text-4xl font-black text-rose-500 uppercase tracking-tight drop-shadow animate-rise">
                LOCAL CITIZEN REPORTED WITH {hairPopulation.toLocaleString()} HAIRS
              </h2>
              <p className="text-lg sm:text-xl font-black text-amber-400 italic font-sans border-l-4 border-amber-400 pl-3 py-1 bg-slate-900/60">
                "Experts have absolutely no explanation."
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="border border-slate-800 bg-slate-900 px-2 py-1 rounded">
                LOCATION: DISTRICT 7 SCALP METROPOLIS
              </span>
              <span className="border border-slate-800 bg-slate-900 px-2 py-1 rounded">
                CHIEF ANCHOR: BARNABY STRAND
              </span>
            </div>
          </div>

          {/* TV News Lower-Third Banner & Marquee News Ticker */}
          <div className="relative z-30 space-y-2">
            {/* Fake Reporter Lower-Third Graphic */}
            <div className="bg-gradient-to-r from-rose-900 via-rose-950 to-slate-950 border-l-4 border-rose-500 p-3 flex flex-wrap items-center justify-between gap-2 shadow">
              <div>
                <div className="label-tech text-[10px] text-rose-300 font-bold">
                  LIVE REPORT · UNPRECEDENTED CENSUS ANOMALY
                </div>
                <div className="wordmark text-sm sm:text-base font-black text-paper">
                  NATIONAL FOLLICULAR EMERGENCY BOARD IN SESSION
                </div>
              </div>
              <span className="label-tech border border-rose-500/40 bg-rose-500/20 text-rose-300 text-[9px] px-2 py-0.5 font-bold">
                LIVE FEED
              </span>
            </div>

            {/* Scrolling Marquee News Ticker */}
            <div className="bg-amber-400 text-slate-950 text-xs font-black uppercase overflow-hidden whitespace-nowrap py-1.5 px-3 flex items-center">
              <span className="bg-slate-950 text-amber-400 px-2 py-0.5 text-[9px] font-bold shrink-0 mr-3">
                TICKER
              </span>
              <div className="flex gap-8 animate-[marquee_20s_linear_infinite]">
                {tickerItems.concat(tickerItems).map((item, idx) => (
                  <span key={idx} className="flex items-center gap-2">
                    <span>{item}</span>
                    <span className="text-rose-700">★</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Satirical Entertainment Disclaimer */}
        <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-400 text-center font-sans">
          SATIRICAL / ENTERTAINMENT CONTENT — THIS NEWS BROADCAST IS ENTIRELY FICTIONAL AND DOES NOT REPRESENT A REAL TELEVISION TRANSMISSION.
        </div>
      </div>
    </CensusModal>
  );
}
