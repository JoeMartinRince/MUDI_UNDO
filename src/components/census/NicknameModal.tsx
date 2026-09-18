import { useState } from "react";
import { Trophy, Sparkles, ShieldCheck } from "lucide-react";
import { CensusModal } from "./CensusModal";
import { CensusButton } from "./CensusButton";
import { addLeaderboardEntry } from "@/services/censusStorage";
import type { CensusResult } from "@/data/census";

interface NicknameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: CensusResult;
  onSubmitted?: () => void;
}

export function NicknameModal({ open, onOpenChange, result, onSubmitted }: NicknameModalProps) {
  const [nickname, setNickname] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Assign a funny title based on classification & hair count
  let funnyTitle = "Follicle Citizen";
  if (result.hairPopulation >= 120000) funnyTitle = "The Follicle Overlord";
  else if (result.hairPopulation >= 90000) funnyTitle = "Rainforest Guardian";
  else if (result.hairPopulation >= 60000) funnyTitle = "Forest Master";
  else if (result.hairPopulation >= 30000) funnyTitle = "The Comb Lord";
  else if (result.hairPopulation >= 10000) funnyTitle = "Savanna Tactician";
  else funnyTitle = "Aerodynamic Champion";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    addLeaderboardEntry({
      censusNumber: result.censusNumber,
      name: nickname.trim().toUpperCase(),
      hairPopulation: result.hairPopulation,
      hairCoverage: result.hairCoverage,
      classification: result.classification,
      funnyTitle,
      date: new Date().toISOString().split("T")[0]!,
      badge: result.hairCoverage > 80 ? "DENSITY TITAN" : result.hairCoverage < 15 ? "AERODYNAMIC" : "VERIFIED SCALP",
    });

    setSubmitted(true);
    if (onSubmitted) onSubmitted();
    setTimeout(() => {
      onOpenChange(false);
    }, 1200);
  };

  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="REGISTER ON NATIONAL LEADERBOARD"
      meta={`CENSUS ID: ${result.censusNumber}`}
    >
      {submitted ? (
        <div className="py-6 text-center space-y-3 font-mono">
          <Trophy className="h-10 w-10 text-amber-500 mx-auto animate-bounce" />
          <div className="wordmark text-xl text-primary">SCALP REGISTERED!</div>
          <p className="label-tech text-muted-foreground">
            {nickname.toUpperCase()} HAS BEEN ENTERED AS "{funnyTitle.toUpperCase()}" ON THE NATIONAL LEADERBOARD.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>ENTER YOUR NICKNAME FOR THE SCALP LEADERBOARD:</span>
          </div>

          <div className="border border-hairline bg-secondary/30 p-3 space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="label-tech">RECORDED POPULATION:</span>
              <strong className="text-primary font-bold">{result.hairPopulation.toLocaleString()} FOLLICLES</strong>
            </div>
            <div className="flex justify-between">
              <span className="label-tech">CLASSIFICATION:</span>
              <strong className="text-foreground">{result.classification}</strong>
            </div>
            <div className="flex justify-between">
              <span className="label-tech">ASSIGNED FUNNY TITLE:</span>
              <strong className="text-amber-600 font-extrabold">{funnyTitle}</strong>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="label-tech font-bold block text-foreground">NICKNAME / ALIAS:</label>
            <input
              type="text"
              placeholder="e.g. HAIRY POTTER, COMB LORD, FOREST MAN"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={24}
              required
              className="w-full bg-paper border-2 border-primary px-3 py-2 font-mono text-sm uppercase text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-xs"
            />
          </div>

          <div className="hairline-t pt-3">
            <CensusButton type="submit" size="lg" disabled={!nickname.trim()} className="w-full">
              <Sparkles className="h-4 w-4 mr-1.5" /> SUBMIT TO LIVE LEADERBOARD
            </CensusButton>
          </div>
        </form>
      )}
    </CensusModal>
  );
}
