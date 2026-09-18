import { useState } from "react";
import { HelpCircle, Sparkles, Check } from "lucide-react";
import { saveUserGuess } from "@/services/censusStorage";
import { CensusButton } from "./CensusButton";

interface GuessCountInputProps {
  onGuessSubmitted?: (guess: number) => void;
}

export function GuessCountInput({ onGuessSubmitted }: GuessCountInputProps) {
  const [guess, setGuess] = useState<number>(100000);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSave = () => {
    saveUserGuess(guess);
    setIsSubmitted(true);
    if (onGuessSubmitted) onGuessSubmitted(guess);
  };

  const setPreset = (val: number) => {
    setGuess(val);
    setIsSubmitted(false);
  };

  return (
    <div className="border-2 border-primary/50 bg-paper p-5 sm:p-6 text-left space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-hairline pb-2.5">
        <div className="flex items-center gap-2 text-primary font-bold text-xs font-mono">
          <HelpCircle className="h-4 w-4" />
          <span>MINI-GAME: GUESS YOUR HAIR COUNT</span>
        </div>
        <span className="label-tech font-mono text-[0.65rem] text-primary font-bold">
          {isSubmitted ? "GUESS SUBMITTED ✓" : "PRE-ANALYSIS STEP"}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="wordmark text-xl sm:text-2xl text-foreground font-black">
          How many hairs do you think are on your head?
        </h3>
        <p className="text-xs leading-relaxed text-foreground/80 font-sans">
          Enter your prediction before running the AI Census engine. An accuracy score & reveal card will be generated on your final report.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {/* Large Interactive Number Input */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            max={300000}
            step={500}
            value={guess}
            onChange={(e) => {
              setGuess(Math.max(0, Number(e.target.value)));
              setIsSubmitted(false);
            }}
            className="flex-1 bg-secondary/40 border-2 border-primary px-4 py-2.5 font-mono text-2xl sm:text-3xl font-black text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-xs"
          />
          <span className="label-tech font-bold text-xs text-primary shrink-0">FOLLICLES</span>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-tech text-[0.6rem] text-muted-foreground mr-1">PRESETS:</span>
          {[10000, 50000, 100000, 120000].map((presetVal) => (
            <button
              key={presetVal}
              type="button"
              onClick={() => setPreset(presetVal)}
              className={`label-tech border px-2.5 py-1 text-[0.65rem] cursor-pointer transition-colors ${
                guess === presetVal
                  ? "border-primary bg-primary text-paper font-bold"
                  : "border-hairline bg-paper hover:bg-muted/40 text-foreground"
              }`}
            >
              {presetVal.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={0}
          max={200000}
          step={1000}
          value={guess}
          onChange={(e) => {
            setGuess(Number(e.target.value));
            setIsSubmitted(false);
          }}
          className="w-full accent-primary cursor-pointer mt-2"
        />
        <div className="flex justify-between label-tech text-[0.55rem]">
          <span>0 (BALD)</span>
          <span>100K (AVERAGE)</span>
          <span>200K (TITAN)</span>
        </div>
      </div>

      <div className="pt-2">
        <CensusButton
          type="button"
          size="lg"
          variant={isSubmitted ? "outline" : "default"}
          onClick={handleSave}
          className="w-full"
        >
          {isSubmitted ? <Check className="h-4 w-4 mr-1.5" /> : <Sparkles className="h-4 w-4 mr-1.5" />}
          {isSubmitted ? "GUESS SUBMITTED (CLICK TO UPDATE)" : "[SUBMIT GUESS]"}
        </CensusButton>
      </div>
    </div>
  );
}
