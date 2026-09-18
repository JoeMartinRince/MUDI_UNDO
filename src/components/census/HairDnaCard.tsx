import { Dna, AlertCircle, Sparkles, Activity, ShieldCheck, Sun, Flame } from "lucide-react";
import { generateHairDna } from "@/data/hairFeatures";

interface HairDnaCardProps {
  censusNumber: string;
  hairCoverage: number;
  confidence: number;
}

export function HairDnaCard({ censusNumber, hairCoverage, confidence }: HairDnaCardProps) {
  const dna = generateHairDna(censusNumber, hairCoverage, confidence);

  const dnaStats = [
    { label: "Density", value: dna.density, color: "bg-primary" },
    { label: "Volume", value: dna.volume, color: "bg-emerald-600" },
    { label: "Chaos", value: dna.chaos, color: "bg-amber-500" },
    { label: "Shine", value: dna.shine, color: "bg-sky-500" },
    { label: "Darkness", value: dna.darkness, color: "bg-purple-600" },
  ];

  return (
    <div className="border border-border bg-paper text-left">
      {/* Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <Dna className="h-4.5 w-4.5 text-primary" />
          <h3 className="label-tech-ink font-bold">HAIR DNA</h3>
        </div>
        <span className="label-tech border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          FICTIONAL HAIR PROFILE
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* DNA Sequence Barcode Header */}
        <div className="border border-hairline bg-secondary/40 p-4 text-center space-y-1.5">
          <div className="label-tech flex items-center justify-center gap-1.5 text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>SYNTHETIC GENOMIC SEQUENCE BARCODE</span>
          </div>
          <div className="font-mono text-xl sm:text-3xl font-black tracking-widest text-primary selection:bg-primary selection:text-paper">
            {dna.sequenceCode.split("").join(" ")}
          </div>
          <div className="label-tech text-[0.6rem] text-muted-foreground">
            GENERATED FROM CENSUS REF #{censusNumber}
          </div>
        </div>

        {/* Fictional Hair DNA Stats Grid */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs label-tech">
            <span className="font-bold text-foreground">FICTIONAL HAIR PROFILE METRICS</span>
            <span className="text-[10px] text-muted-foreground">NOT BIOLOGICAL DATA</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border border-hairline bg-secondary/20 p-4">
            {dnaStats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="label-tech text-foreground/80 font-bold">{stat.label}</span>
                  <span className="wordmark font-bold text-foreground text-sm">{stat.value}%</span>
                </div>
                <div className="h-2.5 w-full bg-secondary/80 overflow-hidden border border-hairline">
                  <div
                    className={`h-full ${stat.color} transition-all duration-700 ease-out`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Secondary Markers */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-1">
          <div className="border border-hairline bg-muted/20 p-3">
            <div className="label-tech flex items-center gap-1 text-[10px]">
              <Activity className="h-3 w-3 text-primary" /> CURL INDEX
            </div>
            <div className="wordmark mt-1 text-xl text-foreground font-bold">
              {dna.curlIndex} / 100
            </div>
            <div className="label-tech text-[0.55rem] mt-0.5 text-muted-foreground">FOLLICLE WAVELENGTH</div>
          </div>

          <div className="border border-hairline bg-muted/20 p-3">
            <div className="label-tech flex items-center gap-1 text-[10px]">
              <Flame className="h-3 w-3 text-amber-600" /> GROWTH RATE
            </div>
            <div className="wordmark mt-1 text-xl text-foreground font-bold">
              {dna.growthPotential} MM
            </div>
            <div className="label-tech text-[0.55rem] mt-0.5 text-muted-foreground">ESTIMATED / MONTH</div>
          </div>

          <div className="border border-hairline bg-muted/20 p-3">
            <div className="label-tech flex items-center gap-1 text-[10px]">
              <Sun className="h-3 w-3 text-amber-500" /> SOLAR REFLECTION
            </div>
            <div className="wordmark mt-1 text-xl text-foreground font-bold">
              {dna.solarReflectionRate}%
            </div>
            <div className="label-tech text-[0.55rem] mt-0.5 text-muted-foreground">UV DISPERSION RATIO</div>
          </div>

          <div className="border border-hairline bg-muted/20 p-3">
            <div className="label-tech flex items-center gap-1 text-[10px]">
              <ShieldCheck className="h-3 w-3 text-emerald-600" /> RESILIENCE
            </div>
            <div className="wordmark mt-1 text-xl text-emerald-700 font-bold">
              {dna.stressResilience}%
            </div>
            <div className="label-tech text-[0.55rem] mt-0.5 text-muted-foreground">FOLLICULAR DURABILITY</div>
          </div>
        </div>

        {/* Disclaimer Warning Box */}
        <div className="border-l-2 border-amber-500 bg-amber-500/10 p-3 text-xs text-foreground/90 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-bold label-tech text-[10px] text-amber-700">IMPORTANT DISCLAIMER</div>
            <p className="text-[11px] leading-snug">
              THESE VALUES ARE FICTIONAL ALGORITHMIC CALCULATIONS AND MUST NOT BE PRESENTED OR INTERPRETED AS ACTUAL BIOLOGICAL OR GENETIC MEASUREMENTS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
