import { useEffect, useState } from "react";
import { X, Sparkles, MessageSquare } from "lucide-react";
import type { CensusResult } from "@/data/census";

interface ProfessorMudiAvatarProps {
  result?: CensusResult;
  autoTrigger?: boolean;
}

export function ProfessorMudiAvatar({ result, autoTrigger = true }: ProfessorMudiAvatarProps) {
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [seqIndex, setSeqIndex] = useState(0);

  const sequences = [
    [
      "Interesting...",
      "Very interesting...",
      "I've studied 14,291 heads.",
      "I've never seen anything this unnecessary.",
    ],
    [
      "Fascinating specimen...",
      "Scanning density wavelengths...",
      "According to my calculations...",
      "Your scalp is operating at peak comedic efficiency.",
    ],
    [
      "Hold on...",
      "Adjusting my optical lenses...",
      "Ah yes, official Bureau confirmation.",
      "This canopy should be registered as a national landmark.",
    ],
    [
      "Remarkable!",
      "I've published 42 papers on hair density.",
      "None of them prepared me for this specimen.",
      "Carry on, citizen.",
    ],
  ];

  useEffect(() => {
    if (!autoTrigger) return;

    if (typeof window === "undefined") return;

    // Check session trigger to avoid spamming
    const storageKey = `mudi_prof_mudi_shown_${result?.censusNumber || "default"}`;
    const alreadyShown = sessionStorage.getItem(storageKey);

    if (!alreadyShown) {
      sessionStorage.setItem(storageKey, "true");

      // Randomize sequence index
      const randomIndex = Math.floor(Math.random() * sequences.length);
      setSeqIndex(randomIndex);

      // Slide in after 2 seconds on results page
      const entranceTimer = setTimeout(() => {
        setVisible(true);
      }, 2000);

      return () => clearTimeout(entranceTimer);
    }
  }, [result?.censusNumber, autoTrigger, sequences.length]);

  // Dialogue steps timer
  useEffect(() => {
    if (!visible) return;

    const currentSeq = sequences[seqIndex] || sequences[0];

    if (stepIndex < currentSeq.length) {
      const stepTimer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 2200);
      return () => clearTimeout(stepTimer);
    } else {
      // Auto exit after dialogue finishes
      const exitTimer = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(exitTimer);
    }
  }, [visible, stepIndex, seqIndex, sequences]);

  const handleSkip = () => {
    setVisible(false);
  };

  if (!visible) return null;

  const currentSeq = sequences[seqIndex] || sequences[0];
  const activeLine = currentSeq[Math.min(stepIndex, currentSeq.length - 1)];

  return (
    <aside
      className="fixed bottom-16 sm:bottom-6 right-4 z-50 flex items-end gap-3 max-w-sm font-mono text-left animate-rise pointer-events-auto"
      aria-label="Professor Mudi commentary"
    >
      {/* Speech Bubble Container */}
      <div className="relative bg-slate-950 text-paper border-2 border-primary p-3.5 sm:p-4 rounded-xl shadow-2xl space-y-1.5 max-w-[240px] sm:max-w-[280px]">
        {/* Speech Bubble Triangle Pointer */}
        <div className="absolute -right-2.5 bottom-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-primary" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold">
            <Sparkles className="h-3 w-3" /> PROFESSOR MUDI
          </div>
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-paper text-[10px] font-bold border border-slate-700 bg-slate-900 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
          >
            SKIP
          </button>
        </div>

        {/* Active Speech Line */}
        <p className="text-xs sm:text-sm font-sans font-semibold text-paper leading-snug italic py-1 animate-fade-in">
          "{activeLine}"
        </p>

        {/* Step Indicator Dots */}
        <div className="flex items-center gap-1 pt-1 justify-end">
          {currentSeq.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === stepIndex ? "w-4 bg-primary" : "w-1.5 bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fictional Original Cartoon Scientist Design (SVG Avatar) */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-primary bg-slate-900 shadow-xl overflow-hidden flex items-center justify-center">
          {/* Cartoon Scientist Original SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background Circle */}
            <circle cx="50" cy="50" r="48" fill="#0f172a" />

            {/* Crazy Wild White Hair */}
            <path
              d="M 15,45 Q 10,20 30,15 Q 40,5 50,15 Q 60,5 70,15 Q 90,20 85,45 Q 95,35 85,60 C 80,70 70,75 50,75 C 30,75 20,70 15,60 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Head Face */}
            <ellipse cx="50" cy="52" rx="26" ry="24" fill="#fde047" />

            {/* Round Glasses */}
            <circle cx="40" cy="48" r="9" fill="none" stroke="#0f172a" strokeWidth="3" />
            <circle cx="60" cy="48" r="9" fill="none" stroke="#0f172a" strokeWidth="3" />
            <line x1="49" y1="48" x2="51" y2="48" stroke="#0f172a" strokeWidth="3" />

            {/* Eyes */}
            <circle cx="40" cy="48" r="3" fill="#0f172a" />
            <circle cx="60" cy="48" r="3" fill="#0f172a" />

            {/* Mustache */}
            <path d="M 38,62 Q 50,56 62,62 Q 50,68 38,62 Z" fill="#e2e8f0" />

            {/* Smile Mouth */}
            <path d="M 44,66 Q 50,72 56,66" stroke="#0f172a" strokeWidth="2.5" fill="none" />

            {/* White Lab Coat Collar & Green Bowtie */}
            <path d="M 28,75 L 50,95 L 72,75 Z" fill="#ffffff" />
            <polygon points="46,76 54,76 58,82 42,82" fill="#16a34a" />
          </svg>
        </div>

        <span className="label-tech text-[9px] text-primary font-bold bg-slate-950 px-1.5 py-0.5 border border-primary/40 rounded mt-1 shadow-xs">
          PROF. MUDI
        </span>
      </div>
    </aside>
  );
}
