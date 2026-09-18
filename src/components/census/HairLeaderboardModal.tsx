import { useState, useEffect } from "react";
import { Trophy, Award, Medal, Users } from "lucide-react";
import { CensusModal } from "./CensusModal";
import { CensusButton } from "./CensusButton";
import { getLeaderboard, addLeaderboardEntry, type LeaderboardEntry } from "@/services/censusStorage";
import type { CensusResult } from "@/data/census";

interface HairLeaderboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentResult?: CensusResult | null;
}

export function HairLeaderboardModal({
  open,
  onOpenChange,
  currentResult,
}: HairLeaderboardModalProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setEntries(getLeaderboard());
    }
  }, [open]);

  const handleEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentResult || !userName.trim()) return;

    let funnyTitle = "Follicle Citizen";
    if (currentResult.hairPopulation >= 120000) funnyTitle = "The Follicle Overlord";
    else if (currentResult.hairPopulation >= 90000) funnyTitle = "Rainforest Guardian";
    else if (currentResult.hairPopulation >= 60000) funnyTitle = "Forest Master";
    else if (currentResult.hairPopulation >= 30000) funnyTitle = "The Comb Lord";
    else if (currentResult.hairPopulation >= 10000) funnyTitle = "Savanna Tactician";
    else funnyTitle = "Aerodynamic Champion";

    addLeaderboardEntry({
      censusNumber: currentResult.censusNumber,
      name: userName.trim().toUpperCase(),
      hairPopulation: currentResult.hairPopulation,
      hairCoverage: currentResult.hairCoverage,
      classification: currentResult.classification,
      funnyTitle,
      date: new Date().toISOString().split("T")[0]!,
      badge: currentResult.hairCoverage > 80 ? "TITAN CANOPY" : currentResult.hairCoverage < 15 ? "AERODYNAMIC" : "VERIFIED SCALP",
    });

    setEntries(getLeaderboard());
    setSubmitted(true);
    setUserName("");
  };

  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="LIVE SCALP LEADERBOARD"
      meta="BUREAU RANKING REGISTRY · REAL ACCUMULATED RECORDS"
    >
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-hairline pb-2">
          <span className="label-tech font-bold">ACCUMULATED LEADERBOARD ({entries.length} CITIZENS)</span>
          <span className="label-tech text-primary font-bold">REAL USER SCANS ONLY</span>
        </div>

        {currentResult && !submitted && (
          <form onSubmit={handleEntrySubmit} className="border-2 border-primary/50 bg-accent/20 p-3.5 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <Trophy className="h-4 w-4" />
              <span>SUBMIT YOUR SCALP TO THE LIVE LEADERBOARD</span>
            </div>
            <p className="text-muted-foreground text-[0.7rem] font-mono">
              Recorded Estimate: <strong className="text-foreground">{currentResult.hairPopulation.toLocaleString()} Follicles</strong> ({currentResult.classification})
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ENTER YOUR NICKNAME"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={24}
                required
                className="flex-1 bg-paper border border-hairline px-3 py-1.5 font-mono uppercase text-xs focus:outline-none focus:border-primary"
              />
              <CensusButton size="sm" type="submit">
                REGISTER SCORE
              </CensusButton>
            </div>
          </form>
        )}

        {entries.length === 0 ? (
          <div className="py-8 text-center space-y-2 border border-dashed border-hairline p-4 font-mono">
            <Users className="h-8 w-8 text-muted-foreground mx-auto" />
            <div className="wordmark text-lg text-muted-foreground">NO LEADERBOARD RECORDS YET</div>
            <p className="label-tech text-xs text-muted-foreground">
              BE THE FIRST CITIZEN TO COMPLETE A CENSUS SCAN AND SUBMIT YOUR SCALP NICKNAME TO THE RANKINGS.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-hairline border border-hairline bg-paper max-h-80 overflow-y-auto">
            {entries.map((entry, idx) => (
              <div
                key={entry.id}
                className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 text-xs font-mono"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-bold text-muted-foreground w-7 shrink-0 text-center font-mono">
                    {idx === 0 ? (
                      <span className="text-base" role="img" aria-label="1st Place">🥇</span>
                    ) : idx === 1 ? (
                      <span className="text-base" role="img" aria-label="2nd Place">🥈</span>
                    ) : idx === 2 ? (
                      <span className="text-base" role="img" aria-label="3rd Place">🥉</span>
                    ) : (
                      `#${idx + 1}`
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="font-extrabold text-foreground truncate text-sm">
                      {entry.name}
                    </div>
                    <div className="label-tech text-[0.6rem] text-primary font-bold">
                      {entry.funnyTitle ? `"${entry.funnyTitle}" • ` : ""}{entry.classification}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-black text-primary text-sm">{entry.hairPopulation.toLocaleString()}</div>
                  <div className="label-tech text-[0.55rem]">{entry.hairCoverage}% COVERAGE</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="label-tech text-center text-[0.6rem]">
          ALL LEADERBOARD RECORDS ARE COMPUTED FROM REAL ACCUMULATED SCANS. ZERO FABRICATED DATA.
        </p>
      </div>
    </CensusModal>
  );
}
