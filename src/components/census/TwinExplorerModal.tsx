import { CENSUS_TWINS, type CensusTwinProfile } from "@/data/censusTwins";
import { CensusModal } from "./CensusModal";
import { UserCheck } from "lucide-react";

interface TwinExplorerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTwinId?: string;
  userCoverage?: number;
}

export function TwinExplorerModal({
  open,
  onOpenChange,
  activeTwinId,
  userCoverage,
}: TwinExplorerModalProps) {
  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="CENSUS TWIN ARCHIVES"
      meta="20 ICONIC SCALP PROFILES · PROTOCOL MU-05"
    >
      <div className="space-y-4 text-left">
        <p className="label-tech text-xs">
          THE BUREAU REGISTRY MAINTAINS 20 CERTIFIED CHARACTER PROFILES RANGING FROM 0% (SAITAMA) TO 96% (HAGRID).
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-h-96 overflow-y-auto pr-1">
          {CENSUS_TWINS.map((twin: CensusTwinProfile) => {
            const isMatch = twin.id === activeTwinId;

            return (
              <div
                key={twin.id}
                className={`border p-3 flex gap-3 transition-colors ${
                  isMatch
                    ? "border-primary bg-accent/40 ring-1 ring-primary"
                    : "border-hairline bg-paper hover:bg-muted/30"
                }`}
              >
                <img
                  src={twin.image}
                  alt={twin.name}
                  className="h-14 w-14 shrink-0 object-cover border border-hairline bg-secondary"
                />
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-xs font-bold text-foreground truncate">
                      {twin.name}
                    </span>
                    {isMatch && (
                      <span className="label-tech bg-primary text-paper px-1 rounded text-[0.55rem]">
                        YOUR MATCH
                      </span>
                    )}
                  </div>
                  <div className="label-tech text-[0.6rem]">{twin.franchise}</div>
                  <div className="label-tech text-primary text-[0.6rem] font-bold">
                    TARGET COVERAGE: {twin.targetHairCoverage}%
                  </div>
                  <p className="text-[0.65rem] text-muted-foreground line-clamp-2 italic">
                    "{twin.description}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CensusModal>
  );
}
