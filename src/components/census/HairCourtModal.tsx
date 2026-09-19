import { useState, useEffect } from "react";
import { CensusModal } from "./CensusModal";
import { Scale, ShieldAlert, Sparkles, RefreshCw, Award, FileText } from "lucide-react";

interface HairCourtModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hairPopulation: number;
  hairCoverage: number;
  classification: string;
  censusNumber?: string;
}

export function HairCourtModal({
  open,
  onOpenChange,
  hairPopulation,
  hairCoverage,
  classification,
  censusNumber = "MU-884920",
}: HairCourtModalProps) {
  const [trialStage, setTrialStage] = useState<"ENTRY" | "EVIDENCE" | "PAUSE" | "VERDICT">("ENTRY");
  const [gavelStrike, setGavelStrike] = useState<boolean>(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;

    if (open) {
      setTrialStage("ENTRY");
      setGavelStrike(true);

      timer1 = setTimeout(() => {
        setGavelStrike(false);
        setTrialStage("EVIDENCE");
      }, 1000);

      timer2 = setTimeout(() => {
        setTrialStage("PAUSE");
      }, 2500);

      timer3 = setTimeout(() => {
        setGavelStrike(true);
        setTrialStage("VERDICT");
        setTimeout(() => setGavelStrike(false), 500);
      }, 4000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [open]);

  const isExcessive = hairPopulation >= 60000;
  const verdictText = isExcessive
    ? "GUILTY OF EXCESSIVE HAIR."
    : "INSUFFICIENT HAIR. CASE DISMISSED.";
  const sentenceText = isExcessive
    ? "Sentence: One complimentary comb."
    : "Sentence: Mandatory daily scalp encouragement.";

  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="THE HAIR COURT"
      meta={`FOLLICULAR JUSTICE DOCKET · CASE REF ${censusNumber}`}
    >
      <div className="space-y-5 font-mono text-left relative overflow-hidden select-none">
        {/* Courtroom Bench & Header */}
        <div className="border-2 border-amber-600/60 bg-slate-950 text-paper p-4 sm:p-5 rounded-md relative shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-600/40 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-amber-400 animate-pulse" />
              <div>
                <h3 className="wordmark text-xl sm:text-2xl text-amber-400 font-black">
                  HIGH COURT OF FOLLICULAR JUSTICE
                </h3>
                <div className="label-tech text-[10px] text-slate-400">
                  NATIONAL HAIR CENSUS AUTHORITY JUDICIAL DIVISION
                </div>
              </div>
            </div>
            <span className="label-tech border border-amber-400/50 bg-amber-400/10 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              DOCKET #{censusNumber}
            </span>
          </div>

          {/* Animated Judge Bench Scene */}
          <div className="py-4 text-center space-y-2 relative">
            {/* Gavel Strike Visual Effect */}
            <div
              className={`text-5xl transition-transform duration-150 inline-block select-none ${
                gavelStrike ? "rotate-45 scale-125 text-amber-400" : "-rotate-12"
              }`}
            >
              🔨
            </div>

            <div className="wordmark text-lg font-black text-amber-200">
              {trialStage === "ENTRY" && "⚖️ THE HONORABLE JUDGE MUDI PRESIDING..."}
              {trialStage === "EVIDENCE" && "📜 EXAMINING EXHIBIT A: SCALP CENSUS DATA"}
              {trialStage === "PAUSE" && "🤔 COURT DELIBERATING..."}
              {trialStage === "VERDICT" && "⚖️ FINAL JUDGMENT PRONOUNCED"}
            </div>
          </div>
        </div>

        {/* Accusation Charge Sheet Scroll */}
        <div className="border-2 border-dashed border-amber-700/60 bg-amber-950/20 p-4 rounded text-amber-100 space-y-2 shadow-inner">
          <div className="flex items-center gap-1.5 label-tech text-xs text-amber-400 font-bold">
            <FileText className="h-4 w-4" /> OFFICIAL FORMAL ACCUSATION
          </div>
          <p className="text-xs sm:text-sm font-sans italic text-slate-200">
            "The Citizen named in registration <span className="font-bold font-mono text-amber-400">{censusNumber}</span> is hereby accused of:"
          </p>
          <div className="wordmark text-lg sm:text-xl font-black text-amber-300 bg-slate-950/80 p-2.5 rounded border border-amber-500/30 text-center">
            "POSSESSING AN UNREASONABLE AMOUNT OF HAIR."
          </div>
        </div>

        {/* Evidence Cards Display Grid */}
        <div className="space-y-2">
          <div className="label-tech text-xs text-slate-400 font-bold">
            EXHIBIT A — EVIDENCE BOARD:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border border-slate-800 bg-slate-900 p-3 rounded text-center">
              <span className="label-tech text-[10px] text-slate-400 font-bold">HAIR POPULATION</span>
              <div className="wordmark text-xl font-black text-sky-400 mt-1">
                {hairPopulation.toLocaleString()}
              </div>
              <span className="label-tech text-[8px] text-slate-500">COUNT ON RECORD</span>
            </div>

            <div className="border border-slate-800 bg-slate-900 p-3 rounded text-center">
              <span className="label-tech text-[10px] text-slate-400 font-bold">SCALP DENSITY</span>
              <div className="wordmark text-xl font-black text-emerald-400 mt-1">
                {hairCoverage}%
              </div>
              <span className="label-tech text-[8px] text-slate-500">COVERAGE RATIO</span>
            </div>

            <div className="border border-slate-800 bg-slate-900 p-3 rounded text-center">
              <span className="label-tech text-[10px] text-slate-400 font-bold">CLASSIFICATION</span>
              <div className="wordmark text-lg font-black text-amber-400 mt-1 truncate">
                {classification}
              </div>
              <span className="label-tech text-[8px] text-slate-500">ECOSYSTEM TIER</span>
            </div>
          </div>
        </div>

        {/* Final Verdict Banner */}
        {trialStage === "VERDICT" ? (
          <div className="border-2 border-amber-500 bg-amber-950/80 p-5 rounded text-center space-y-3 shadow-xl animate-rise">
            <div className="label-tech text-xs text-amber-400 font-bold flex items-center justify-center gap-1">
              <Award className="h-4 w-4" /> OFFICIAL COURT VERDICT
            </div>

            <div className="wordmark text-2xl sm:text-4xl font-black text-amber-300 tracking-wider">
              {verdictText}
            </div>

            <div className="border-t border-amber-600/40 pt-2 font-sans text-sm text-slate-200 font-bold">
              {sentenceText}
            </div>
          </div>
        ) : (
          <div className="border border-slate-800 bg-slate-900 p-4 rounded text-center text-slate-400 text-xs italic animate-pulse">
            Waiting for Judge Mudi to strike the gavel...
          </div>
        )}

        {/* Parody Disclaimer */}
        <div className="border-t border-slate-800 pt-2 text-[10px] text-slate-400 text-center font-sans">
          FICTIONAL COURTROOM PARODY — FOR ENTERTAINMENT PURPOSES ONLY. NO REAL LEGAL PROCEEDINGS OCCUR.
        </div>
      </div>
    </CensusModal>
  );
}
