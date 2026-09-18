import { useEffect, useState } from "react";
import { Globe, Users, Database, Award, Activity, BarChart3 } from "lucide-react";
import { getRealGlobalStats, type RealGlobalStats } from "@/services/censusStorage";
import { useCountUp } from "./useCountUp";

export function GlobalCensusDashboard({ className = "" }: { className?: string }) {
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

  const animatedPeople = useCountUp(stats.peopleScanned, 1500, 200);
  const animatedTotalHairs = useCountUp(stats.totalHairsCounted, 1500, 200);
  const animatedAvgHairs = useCountUp(stats.averageHairPopulation, 1500, 200);
  const animatedHighest = useCountUp(stats.highestEstimate, 1500, 200);
  const animatedScans = useCountUp(stats.numberOfScans, 1500, 200);

  const isEmpty = stats.numberOfScans === 0;

  return (
    <section className={`border-2 border-primary bg-paper p-5 sm:p-7 text-left space-y-5 shadow-md ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary animate-pulse" />
          <h2 className="wordmark text-2xl sm:text-3xl text-foreground font-black">
            GLOBAL MUDI CENSUS
          </h2>
        </div>
        <span className="label-tech font-mono font-bold text-primary border border-primary/40 bg-accent/40 px-2.5 py-1">
          REAL ACCUMULATED APPLICATION DATA
        </span>
      </div>

      {isEmpty ? (
        <div className="py-8 text-center space-y-2 border border-dashed border-hairline p-4 font-mono">
          <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto" />
          <div className="wordmark text-lg text-muted-foreground">NO SCANS LOGGED IN DATABASE</div>
          <p className="label-tech text-xs text-muted-foreground">
            COMPLETE A CENSUS SCAN AND REGISTER YOUR SCALP TO START ACCUMULATING GLOBAL STATISTICS.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 font-mono">
          <div className="border border-hairline bg-muted/20 p-3.5 space-y-1">
            <div className="label-tech flex items-center gap-1 text-muted-foreground">
              <Users className="h-3.5 w-3.5 text-primary" /> PEOPLE SCANNED
            </div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-foreground">
              {animatedPeople.toLocaleString()}
            </div>
            <div className="label-tech text-[0.55rem]">UNIQUE CITIZENS</div>
          </div>

          <div className="border border-hairline bg-muted/20 p-3.5 space-y-1">
            <div className="label-tech flex items-center gap-1 text-emerald-700 font-bold">
              <Database className="h-3.5 w-3.5 text-emerald-600" /> TOTAL HAIRS COUNTED
            </div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-emerald-700 truncate">
              {animatedTotalHairs.toLocaleString()}
            </div>
            <div className="label-tech text-[0.55rem] text-emerald-700 font-bold">CUMULATIVE FOLLICLES</div>
          </div>

          <div className="border border-hairline bg-muted/20 p-3.5 space-y-1">
            <div className="label-tech flex items-center gap-1 text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-primary" /> AVERAGE POPULATION
            </div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-foreground truncate">
              {animatedAvgHairs.toLocaleString()}
            </div>
            <div className="label-tech text-[0.55rem]">MEAN SCALP ESTIMATE</div>
          </div>

          <div className="border border-hairline bg-muted/20 p-3.5 space-y-1">
            <div className="label-tech flex items-center gap-1 text-amber-600 font-bold">
              <Award className="h-3.5 w-3.5 text-amber-500" /> HIGHEST ESTIMATE
            </div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-amber-600 truncate">
              {animatedHighest.toLocaleString()}
            </div>
            <div className="label-tech text-[0.55rem] text-amber-600 font-bold">ALL-TIME RECORD</div>
          </div>

          <div className="border border-hairline bg-muted/20 p-3.5 space-y-1 col-span-2 sm:col-span-1">
            <div className="label-tech flex items-center gap-1 text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5 text-primary" /> NUMBER OF SCANS
            </div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-foreground">
              {animatedScans.toLocaleString()}
            </div>
            <div className="label-tech text-[0.55rem]">TOTAL LOGGED EXECUTIONS</div>
          </div>
        </div>
      )}

      <p className="label-tech text-[0.6rem] text-muted-foreground">
        ALL GLOBAL STATISTICS ARE COMPUTED DIRECTLY FROM ACCUMULATED DATABASE RECORDS. ZERO FABRICATED DATA.
      </p>
    </section>
  );
}
