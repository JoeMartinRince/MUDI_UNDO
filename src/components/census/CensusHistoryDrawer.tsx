import { useEffect, useState } from "react";
import { History, Trash2, ArrowUpRight } from "lucide-react";
import { CensusModal } from "./CensusModal";
import { CensusButton } from "./CensusButton";
import { getCensusHistory, clearCensusHistory } from "@/services/censusStorage";
import { setLatestResult } from "@/services/hairAnalysis";
import { useNavigate } from "@tanstack/react-router";
import type { CensusResult } from "@/data/census";

interface CensusHistoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CensusHistoryDrawer({ open, onOpenChange }: CensusHistoryDrawerProps) {
  const [history, setHistory] = useState<CensusResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setHistory(getCensusHistory());
    }
  }, [open]);

  const handleClear = () => {
    clearCensusHistory();
    setHistory([]);
  };

  const handleLoadResult = (res: CensusResult) => {
    setLatestResult(res);
    onOpenChange(false);
    navigate({ to: "/results" });
  };

  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="CENSUS HISTORY ARCHIVES"
      meta="BUREAU SESSION LOGS · PROTOCOL MU-03"
    >
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-hairline pb-2">
          <span className="label-tech">PREVIOUS CENSUS RECORDS ({history.length})</span>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="label-tech text-destructive hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="h-3 w-3" /> CLEAR HISTORY
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center space-y-2 border border-dashed border-hairline p-4">
            <History className="h-8 w-8 text-muted-foreground mx-auto" />
            <div className="wordmark text-lg text-muted-foreground">NO ARCHIVED SCANS</div>
            <p className="label-tech text-xs text-muted-foreground">
              COMPLETED HAIR SCANS WILL AUTOMATICALLY SAVE TO YOUR LOCAL BROWSER ARCHIVE.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-hairline border border-hairline bg-paper max-h-80 overflow-y-auto">
            {history.map((item) => (
              <div
                key={item.censusNumber}
                className="flex items-center justify-between px-3 py-3 hover:bg-muted/30 transition-colors text-xs font-mono"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <span>{item.censusNumber}</span>
                    <span className="label-tech bg-secondary px-1.5 py-0.5">{item.classification}</span>
                  </div>
                  <div className="label-tech text-[0.6rem] text-muted-foreground">
                    DATE: {item.issuedAt} · COVERAGE: {item.hairCoverage}%
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-extrabold text-primary">{item.hairPopulation.toLocaleString()}</div>
                    <div className="label-tech text-[0.55rem]">FOLLICLES</div>
                  </div>

                  <CensusButton
                    size="sm"
                    variant="outline"
                    onClick={() => handleLoadResult(item)}
                    className="h-7 px-2"
                  >
                    <ArrowUpRight className="h-3 w-3" />
                  </CensusButton>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="label-tech text-center text-[0.6rem]">
          ALL HISTORICAL CENSUS RECORDS ARE STORED LOCALLY IN BROWSER STORAGE.
        </p>
      </div>
    </CensusModal>
  );
}
