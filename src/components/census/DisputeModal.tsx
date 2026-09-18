import { useState } from "react";
import { CensusModal } from "./CensusModal";
import { CensusButton } from "./CensusButton";
import { DISPUTE_REASONS, DISPUTE_RESPONSE } from "@/data/census";
import { cn } from "@/lib/utils";
import { Search, Sliders, ShieldAlert, CheckCircle2 } from "lucide-react";

export function DisputeModal({
  open,
  onOpenChange,
  censusNumber,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  censusNumber: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [calibrationOffset, setCalibrationOffset] = useState<number>(0);
  const [investigating, setInvestigating] = useState(false);

  const toggle = (reason: string) =>
    setSelected((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason],
    );

  const handleOpenChange = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setSubmitted(false);
        setInvestigating(false);
        setSelected([]);
        setCalibrationOffset(0);
      }, 200);
    }
  };

  const handleStartInvestigation = (e: React.FormEvent) => {
    e.preventDefault();
    setInvestigating(true);
    setTimeout(() => {
      setInvestigating(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <CensusModal
      open={open}
      onOpenChange={handleOpenChange}
      title="HAIR INVESTIGATION & FORMAL DISPUTE"
      meta={`INVESTIGATION PROTOCOL MU-12 · REF ${censusNumber}`}
    >
      {investigating ? (
        <div className="py-8 text-center space-y-4 font-mono text-xs">
          <Search className="h-10 w-10 text-primary mx-auto animate-bounce" />
          <div className="wordmark text-xl text-primary">CONDUCTING FORENSIC RE-SCAN...</div>
          <p className="label-tech text-muted-foreground animate-blip">
            CALIBRATING FOLLICLE DENSITY MARGINS WITH OFFSET ({calibrationOffset > 0 ? `+${calibrationOffset}%` : `${calibrationOffset}%`})...
          </p>
        </div>
      ) : submitted ? (
        <div className="animate-rise space-y-4 text-left">
          <div className="border border-emerald-500/40 bg-emerald-50/20 p-3.5 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <div className="label-tech-ink text-emerald-700 font-bold">FORENSIC INVESTIGATION CONCLUDED</div>
              <div className="label-tech text-[0.6rem] text-emerald-600">CASE FILE #{censusNumber}-DISPUTE</div>
            </div>
          </div>

          <div className="border border-hairline bg-paper p-3 text-xs font-mono space-y-1">
            <div>CALIBRATION ADJUSTMENT: <strong className="text-primary">{calibrationOffset > 0 ? `+${calibrationOffset}%` : `${calibrationOffset}%`}</strong></div>
            <div>VERDICT STATUS: <strong className="text-foreground">DISPUTE ARCHIVED & FORWARDED</strong></div>
          </div>

          <ul className="space-y-2">
            {DISPUTE_RESPONSE.map((line) => (
              <li key={line} className="flex gap-2 text-xs font-mono leading-relaxed text-foreground/90">
                <span className="text-primary font-bold">▸</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="hairline-t pt-4">
            <CensusButton variant="outline" size="md" onClick={() => handleOpenChange(false)}>
              CLOSE INVESTIGATION FILE
            </CensusButton>
          </div>
        </div>
      ) : (
        <form onSubmit={handleStartInvestigation} className="text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <span>SELECT DISPUTE GROUNDS & CALIBRATION:</span>
          </div>

          <div className="divide-y divide-border border border-border">
            {DISPUTE_REASONS.map((reason) => {
              const checked = selected.includes(reason);
              return (
                <label
                  key={reason}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors text-xs font-mono",
                    checked ? "bg-accent/50" : "hover:bg-secondary/60",
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggle(reason)}
                  />
                  <span
                    className={cn(
                      "grid h-4 w-4 shrink-0 place-items-center border",
                      checked ? "border-primary bg-primary" : "border-hairline bg-paper",
                    )}
                    aria-hidden
                  >
                    {checked && <span className="h-1.5 w-1.5 bg-primary-foreground" />}
                  </span>
                  <span className="min-w-0">{reason}</span>
                </label>
              );
            })}
          </div>

          {/* Forensic Recalibration Slider */}
          <div className="border border-hairline bg-muted/20 p-3 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                <Sliders className="h-3.5 w-3.5 text-primary" /> FORENSIC CALIBRATION OFFSET
              </span>
              <span className="text-primary font-bold">{calibrationOffset > 0 ? `+${calibrationOffset}%` : `${calibrationOffset}%`}</span>
            </div>
            <input
              type="range"
              min={-25}
              max={25}
              step={5}
              value={calibrationOffset}
              onChange={(e) => setCalibrationOffset(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between label-tech text-[0.55rem]">
              <span>-25% (LESS)</span>
              <span>0% (ORIGINAL)</span>
              <span>+25% (MORE)</span>
            </div>
          </div>

          <div className="hairline-t pt-3">
            <CensusButton type="submit" size="lg" disabled={selected.length === 0} className="w-full">
              LAUNCH BUREAU INVESTIGATION
            </CensusButton>
            <p className="label-tech mt-2 text-center text-[0.6rem]">
              ALL INVESTIGATIONS ARE SATIRICAL AND DO NOT MUTATE OFFICIAL SCIENTIFIC TRUTH.
            </p>
          </div>
        </form>
      )}
    </CensusModal>
  );
}
