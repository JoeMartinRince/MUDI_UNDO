import { useEffect, useState } from "react";
import { Globe, Users, Database } from "lucide-react";
import { getRealGlobalStats, type RealGlobalStats } from "@/services/censusStorage";

export function GlobalCensusTicker({ className }: { className?: string }) {
  const [stats, setStats] = useState<RealGlobalStats>({
    peopleScanned: 0,
    totalHairsCounted: 0,
    averageHairPopulation: 0,
    highestEstimate: 0,
    numberOfScans: 0,
  });

  useEffect(() => {
    setStats(getRealGlobalStats());
  }, []);

  return (
    <div className={`border border-hairline bg-paper px-4 py-2 text-xs font-mono ${className ?? ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 text-[0.65rem]">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Globe className="h-3.5 w-3.5 animate-pulse" />
          <span>ACCUMULATED LIVE CENSUS TELEMETRY</span>
        </div>

        <div className="flex items-center gap-4 text-foreground/80 flex-wrap">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            PEOPLE SCANNED: <strong className="text-foreground">{stats.peopleScanned.toLocaleString()}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Database className="h-3 w-3 text-muted-foreground" />
            TOTAL HAIRS COUNTED: <strong className="text-primary font-extrabold">{stats.totalHairsCounted.toLocaleString()}</strong>
          </span>
          <span className="hidden sm:inline">
            AVERAGE POPULATION: <strong>{stats.averageHairPopulation.toLocaleString()}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
