import { UserCheck, Sparkles, Quote, Info } from "lucide-react";
import { getPersonalityArchetype } from "@/data/hairFeatures";

interface HairPersonalityCardProps {
  hairCoverage: number;
  hairPopulation?: number;
}

export function HairPersonalityCard({ hairCoverage, hairPopulation = 50000 }: HairPersonalityCardProps) {
  const archetype = getPersonalityArchetype(hairCoverage, hairPopulation);

  const statsList = [
    { label: "DENSITY", value: archetype.stats.density, color: "bg-primary" },
    { label: "VOLUME", value: archetype.stats.volume, color: "bg-emerald-600" },
    { label: "CHAOS", value: archetype.stats.chaos, color: "bg-amber-500" },
    { label: "SHINE", value: archetype.stats.shine, color: "bg-sky-500" },
  ];

  return (
    <div className="border border-border bg-paper text-left">
      {/* Card Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-primary" />
          <h3 className="label-tech-ink">HAIR PERSONALITY</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            FOR ENTERTAINMENT ONLY
          </span>
          <span className="label-tech font-mono hidden sm:inline-block">{archetype.code}</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-4">
          <div>
            <div className="wordmark text-2xl sm:text-4xl text-primary font-black tracking-tight">
              {archetype.title}
            </div>
            <div className="label-tech text-muted-foreground mt-1 font-semibold">
              {archetype.subtitle} · {archetype.trait}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 bg-accent/50 px-2.5 py-1 text-xs font-mono font-bold text-accent-foreground border border-accent shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> PERSONALITY ARCHETYPE
          </span>
        </div>

        {/* Fictional Stats Grid: Density, Volume, Chaos, Shine */}
        <div className="space-y-3 bg-secondary/20 border border-hairline p-4">
          <div className="flex items-center justify-between text-xs label-tech mb-1">
            <span className="font-bold text-foreground">FICTIONAL PERSONALITY METRICS</span>
            <span className="text-[10px] text-muted-foreground">FOR ENTERTAINMENT ONLY</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statsList.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="label-tech text-muted-foreground">{stat.label}</span>
                  <span className="wordmark font-bold text-foreground">{stat.value}%</span>
                </div>
                <div className="h-2 w-full bg-secondary/80 overflow-hidden border border-hairline">
                  <div
                    className={`h-full ${stat.color} transition-all duration-700 ease-out`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Motto */}
        <p className="text-sm leading-relaxed text-foreground/90 font-sans">
          {archetype.description}
        </p>

        <div className="border-l-2 border-primary bg-secondary/30 p-3 italic text-xs text-foreground/80 flex items-start gap-2">
          <Quote className="h-4 w-4 text-primary shrink-0 not-italic mt-0.5" />
          <span>"{archetype.motto}"</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground label-tech">
          <Info className="h-3 w-3 text-muted-foreground shrink-0" />
          <span>This profile is a fictional entertainment categorization generated from crown coverage data.</span>
        </div>
      </div>
    </div>
  );
}
