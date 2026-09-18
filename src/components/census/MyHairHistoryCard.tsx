import { useEffect, useState } from "react";
import { History, Trash2, TrendingUp, AlertCircle, Sparkles, Award } from "lucide-react";
import { getCensusHistory, clearCensusHistory } from "@/services/censusStorage";
import type { CensusResult } from "@/data/census";

interface MyHairHistoryCardProps {
  currentResult?: CensusResult;
}

export function MyHairHistoryCard({ currentResult }: MyHairHistoryCardProps) {
  const [historyRecords, setHistoryRecords] = useState<CensusResult[]>([]);

  const loadHistory = () => {
    const list = getCensusHistory();
    // Sort chronologically (oldest scan first = Scan #1, newest = Scan #N)
    const sorted = [...list].reverse();
    setHistoryRecords(sorted);
  };

  useEffect(() => {
    loadHistory();
  }, [currentResult]);

  const handleClear = () => {
    clearCensusHistory();
    setHistoryRecords([]);
  };

  // Compute Summary Statistics
  const count = historyRecords.length;
  const populations = historyRecords.map((r) => r.hairPopulation);
  const highest = count > 0 ? Math.max(...populations) : 0;
  const lowest = count > 0 ? Math.min(...populations) : 0;
  const average = count > 0 ? Math.round(populations.reduce((a, b) => a + b, 0) / count) : 0;

  // Chart Dimensions & Scaling
  const chartWidth = 500;
  const chartHeight = 180;
  const paddingX = 40;
  const paddingY = 30;

  const minVal = count > 0 ? Math.max(0, Math.min(...populations) * 0.85) : 0;
  const maxVal = count > 0 ? Math.max(120000, Math.max(...populations) * 1.1) : 120000;

  const points = historyRecords.map((item, idx) => {
    const x =
      count === 1
        ? chartWidth / 2
        : paddingX + (idx / (count - 1)) * (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      ((item.hairPopulation - minVal) / (maxVal - minVal || 1)) * (chartHeight - paddingY * 2);
    return { x, y, item, idx };
  });

  const pathD =
    points.length > 0
      ? points.reduce(
          (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
          ""
        )
      : "";

  return (
    <div className="border border-border bg-paper text-left overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <History className="h-4.5 w-4.5 text-primary" />
          <h3 className="label-tech-ink font-bold">MY HAIR HISTORY</h3>
        </div>
        {count > 0 && (
          <button
            onClick={handleClear}
            className="label-tech text-destructive hover:underline flex items-center gap-1 cursor-pointer text-xs"
          >
            <Trash2 className="h-3.5 w-3.5" /> CLEAR HISTORY
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Summary Statistics Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="border border-hairline bg-secondary/30 p-3 space-y-1">
            <div className="label-tech text-[10px] text-muted-foreground font-bold">HIGHEST ESTIMATE</div>
            <div className="wordmark text-xl sm:text-2xl font-black text-emerald-700">
              {highest > 0 ? highest.toLocaleString() : "—"}
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">MAX RECORDED CROP</div>
          </div>

          <div className="border border-hairline bg-secondary/30 p-3 space-y-1">
            <div className="label-tech text-[10px] text-muted-foreground font-bold">LOWEST ESTIMATE</div>
            <div className="wordmark text-xl sm:text-2xl font-black text-amber-700">
              {lowest > 0 ? lowest.toLocaleString() : "—"}
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">MIN RECORDED CROP</div>
          </div>

          <div className="border border-hairline bg-secondary/30 p-3 space-y-1">
            <div className="label-tech text-[10px] text-muted-foreground font-bold">AVERAGE ESTIMATE</div>
            <div className="wordmark text-xl sm:text-2xl font-black text-primary">
              {average > 0 ? average.toLocaleString() : "—"}
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">MEAN FOLLICLE COUNT</div>
          </div>

          <div className="border border-hairline bg-secondary/30 p-3 space-y-1">
            <div className="label-tech text-[10px] text-muted-foreground font-bold">TOTAL SCANS</div>
            <div className="wordmark text-xl sm:text-2xl font-black text-foreground">
              {count} <span className="text-xs font-sans text-muted-foreground">RECORDS</span>
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">ARCHIVED PROFILES</div>
          </div>
        </div>

        {/* Animated Line Chart */}
        <div className="border border-hairline bg-slate-950 p-4 space-y-2 text-paper relative">
          <div className="flex items-center justify-between text-xs label-tech">
            <span className="flex items-center gap-1.5 font-bold text-slate-200">
              <TrendingUp className="h-4 w-4 text-primary" /> ESTIMATED HAIR POPULATION TREND
            </span>
            <span className="text-slate-400 text-[10px]">LOCAL SESSION ARCHIVE</span>
          </div>

          {count === 0 ? (
            <div className="py-10 text-center text-xs text-slate-400 space-y-1 font-mono">
              <div>NO SCANS ARCHIVED YET</div>
              <div className="text-[10px] text-slate-500">Your hair census history will plot here across scans.</div>
            </div>
          ) : (
            <div className="relative w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-44 sm:h-52 overflow-visible select-none"
              >
                {/* Background Grid Lines */}
                <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#334155" strokeDasharray="3 3" />
                <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#334155" strokeDasharray="3 3" />
                <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#334155" strokeDasharray="3 3" />

                {/* Y-Axis Label Max & Min */}
                <text x={paddingX - 5} y={paddingY + 4} fill="#94a3b8" fontSize="9" textAnchor="end" className="font-mono">
                  {Math.round(maxVal / 1000)}k
                </text>
                <text x={paddingX - 5} y={chartHeight - paddingY + 4} fill="#94a3b8" fontSize="9" textAnchor="end" className="font-mono">
                  {Math.round(minVal / 1000)}k
                </text>

                {/* Animated Trend Line Path */}
                {pathD && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-700 ease-out"
                  />
                )}

                {/* Data Points & Labels */}
                {points.map((p) => (
                  <g key={p.item.censusNumber} className="group cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="6"
                      fill="#e11d48"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-125"
                    />
                    <text
                      x={p.x}
                      y={p.y - 12}
                      fill="#f8fafc"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      {p.item.hairPopulation.toLocaleString()}
                    </text>
                    <text
                      x={p.x}
                      y={chartHeight - 8}
                      fill="#94a3b8"
                      fontSize="9"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      Scan #{p.idx + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )}
        </div>

        {/* Scan List Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs label-tech font-bold text-foreground">
            <span>ARCHIVED SCANS ({count})</span>
            <span className="text-[10px] text-muted-foreground">CHRONOLOGICAL ORDER</span>
          </div>

          {count === 0 ? (
            <div className="border border-dashed border-hairline p-4 text-center text-xs text-muted-foreground font-mono">
              Complete hair scans automatically accumulate in your local session history.
            </div>
          ) : (
            <div className="divide-y divide-hairline border border-hairline bg-paper max-h-64 overflow-y-auto">
              {historyRecords.map((item, idx) => (
                <div
                  key={item.censusNumber}
                  className="p-3 flex items-center justify-between text-xs font-mono hover:bg-secondary/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">Scan #{idx + 1}</span>
                      <span className="wordmark font-bold text-foreground text-sm">
                        {item.hairPopulation.toLocaleString()} FOLLICLES
                      </span>
                    </div>
                    <div className="label-tech text-[0.6rem] text-muted-foreground flex items-center gap-2">
                      <span>REF: {item.censusNumber}</span>
                      <span>•</span>
                      <span>DENSITY: {item.hairCoverage}%</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">{item.classification}</span>
                    </div>
                  </div>

                  <div className="text-right label-tech text-[10px] text-muted-foreground">
                    <div>{item.issuedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Required Disclaimer Notice */}
        <div className="border-l-2 border-primary bg-secondary/30 p-3 text-xs text-foreground/90 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <div className="font-bold label-tech text-[10px] text-primary">HISTORICAL VARIABILITY DISCLAIMER</div>
            <p className="text-[11px] leading-snug">
              "Changes between scans can be caused by lighting, camera angle, hairstyle, image quality, and AI estimation variability."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
