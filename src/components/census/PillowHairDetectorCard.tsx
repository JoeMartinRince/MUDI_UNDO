import { useEffect, useState } from "react";
import { Search, ShieldAlert, AlertOctagon, RefreshCw, FileText, CheckCircle2, Sparkles } from "lucide-react";

interface PillowHairDetectorCardProps {
  censusNumber?: string;
  initialPopulation?: number;
}

export function PillowHairDetectorCard({
  censusNumber = "MU-2026-48291",
  initialPopulation = 50000,
}: PillowHairDetectorCardProps) {
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<"idle" | "scanning" | "evidence" | "verdict">("idle");
  const [scanProgress, setScanProgress] = useState(0);

  // Deterministically calculate suspicious strands count based on initial population
  const suspiciousStrands = Math.round(1800 + (initialPopulation % 2400));

  const handleStartScan = () => {
    setScanning(true);
    setScanStep("scanning");
    setScanProgress(0);

    // Animate scanner bar progress from 0% to 100% over 2.5 seconds
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 120);

    // Step 2: Evidence found at 2.6s
    setTimeout(() => {
      setScanStep("evidence");
    }, 2600);

    // Step 3: Final verdict & Confidential stamp at 4.2s
    setTimeout(() => {
      setScanning(false);
      setScanStep("verdict");
    }, 4200);
  };

  const handleReset = () => {
    setScanning(false);
    setScanStep("idle");
    setScanProgress(0);
  };

  return (
    <div className="border border-border bg-paper text-left overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <Search className="h-4.5 w-4.5 text-primary" />
          <h3 className="label-tech-ink font-bold">PILLOW HAIR DETECTOR</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-700">
            COMEDY INVESTIGATION — NOT SCIENTIFIC
          </span>
          {scanStep !== "idle" && (
            <button
              onClick={handleReset}
              className="label-tech flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" /> RESET
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 font-mono">
        {/* Main Control Strip */}
        <div className="border border-hairline bg-secondary/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="label-tech text-xs text-muted-foreground font-bold">NOCTURNAL PILLOW DOSSIER</div>
            <div className="wordmark text-xl sm:text-2xl font-black text-foreground">
              CASE REF #{censusNumber.replace("MU-", "MU-PLW-")}
            </div>
          </div>

          <button
            onClick={handleStartScan}
            disabled={scanning}
            className={`border px-5 py-2.5 text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md ${
              scanning
                ? "border-amber-500 bg-amber-600 text-paper animate-pulse cursor-not-allowed"
                : "border-primary bg-primary text-paper hover:bg-primary/90"
            }`}
          >
            <Search className="h-4 w-4" />
            <span>{scanning ? "SCANNING PILLOW..." : "START PILLOW SCAN"}</span>
          </button>
        </div>

        {/* Detective-Style Viewport with Stylized Pillow Illustration */}
        <div className="relative border-2 border-hairline bg-slate-950 rounded overflow-hidden shadow-inner p-4 flex flex-col items-center justify-center min-h-[260px]">
          {/* Scanning Radar Grid Overlay */}
          <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(56,189,248,0.6)_2px,rgba(56,189,248,0.6)_4px)] pointer-events-none" />

          {/* Animated Sweeping Scanner Line */}
          {scanStep === "scanning" && (
            <div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#fbbf24] z-20 transition-all duration-100"
              style={{ top: `${scanProgress}%` }}
            />
          )}

          {/* Stylized Pillow Illustration SVG */}
          <div className="relative w-64 sm:w-72 h-36 sm:h-40 flex items-center justify-center">
            <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-xl">
              {/* Soft Pillow Shape */}
              <rect x="15" y="15" width="170" height="90" rx="25" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
              <rect x="25" y="25" width="150" height="70" rx="18" fill="#0f172a" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Pillow Fluff Seams */}
              <path d="M 20,20 Q 50,60 20,100" stroke="#334155" strokeWidth="2" fill="none" />
              <path d="M 180,20 Q 150,60 180,100" stroke="#334155" strokeWidth="2" fill="none" />

              {/* Fictional Evidence Strands on Pillow */}
              {(scanStep === "evidence" || scanStep === "verdict") && (
                <g className="animate-rise">
                  <path d="M 50,45 Q 65,55 80,48" stroke="#fbbf24" strokeWidth="2" fill="none" />
                  <path d="M 110,65 Q 125,75 145,60" stroke="#fbbf24" strokeWidth="2" fill="none" />
                  <path d="M 85,80 Q 95,90 115,82" stroke="#fbbf24" strokeWidth="2" fill="none" />
                </g>
              )}
            </svg>

            {/* Evidence Markers #01, #02, #03 */}
            {(scanStep === "evidence" || scanStep === "verdict") && (
              <>
                <div className="absolute top-8 left-16 bg-amber-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-300 animate-bounce">
                  EVIDENCE #01
                </div>
                <div className="absolute bottom-10 right-16 bg-amber-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-300 animate-bounce">
                  EVIDENCE #02
                </div>
                <div className="absolute bottom-6 left-28 bg-amber-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-300 animate-bounce">
                  EVIDENCE #03
                </div>
              </>
            )}
          </div>

          {/* Scanning Progress Status */}
          {scanStep === "scanning" && (
            <div className="relative z-10 label-tech text-xs text-sky-400 font-bold flex items-center gap-1.5 mt-2 bg-slate-900/90 px-3 py-1 border border-sky-500/40">
              <Search className="h-4 w-4 animate-spin text-amber-400" />
              <span>🔍 SCANNING PILLOW... ({scanProgress}%)</span>
            </div>
          )}

          {/* Evidence Found Banner Reveal */}
          {(scanStep === "evidence" || scanStep === "verdict") && (
            <div className="relative z-10 text-center space-y-1 mt-2 animate-rise">
              <div className="label-tech text-xs text-rose-500 font-bold flex items-center justify-center gap-1">
                <ShieldAlert className="h-4 w-4 animate-pulse" /> 🚨 HAIR EVIDENCE FOUND
              </div>
              <div className="wordmark text-xl sm:text-2xl text-amber-400 font-black">
                {suspiciousStrands.toLocaleString()} SUSPICIOUS STRANDS
              </div>
              <div className="label-tech text-[10px] text-slate-300">
                PRIMARY SUSPECT: <span className="text-paper font-bold underline">THE PILLOW</span>
              </div>
            </div>
          )}

          {/* Red Confidential Detective Stamp Overlay */}
          {scanStep === "verdict" && (
            <div className="absolute top-4 right-4 z-30 border-2 border-rose-600 bg-rose-950/80 p-3 text-center rotate-12 shadow-2xl animate-rise">
              <div className="label-tech text-[9px] text-rose-400 font-bold border-b border-rose-600 pb-1">
                CONFIDENTIAL
              </div>
              <div className="wordmark text-lg font-black text-rose-500 tracking-wider">
                CASE STATUS:
              </div>
              <div className="wordmark text-xl font-black text-paper tracking-widest">
                UNSOLVED 🔍
              </div>
            </div>
          )}
        </div>

        {/* Required Entertainment Disclaimer Box */}
        <div className="border-l-2 border-rose-600 bg-rose-500/10 p-3 text-xs text-foreground/90 flex items-start gap-2">
          <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold label-tech text-[10px] text-rose-700">
              COMEDY INVESTIGATION — NOT SCIENTIFIC
            </div>
            <p className="text-[11px] leading-snug">
              THIS MINI-GAME IS FOR ENTERTAINMENT PURPOSES ONLY AND DOES NOT DETECT ACTUAL HAIR LOSS, DISEASE, OR CLINICAL MEDICAL CONDITIONS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
