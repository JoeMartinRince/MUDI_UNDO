import { DollarSign, Scissors, Sparkles, Scale, Ruler, AlertCircle } from "lucide-react";

interface HairEconomyCardProps {
  hairPopulation: number;
  hairCoverage: number;
}

export function HairEconomyCard({ hairPopulation, hairCoverage }: HairEconomyCardProps) {
  // Calculations based on 10cm average strand length (0.1m)
  const totalLengthKm = Number(((hairPopulation * 0.1) / 1000).toFixed(1));
  
  // Imaginary yarn production: ~0.02 grams per strand -> kg
  const yarnWeightKg = Number(((hairPopulation * 0.02) / 1000).toFixed(1));
  
  // Imaginary Paintbrushes: ~750 strands per artist brush
  const paintbrushes = Math.round(hairPopulation / 750);

  // Imaginary market net worth @ $0.045 per strand
  const netWorthUsd = Math.round(hairPopulation * 0.045);

  // Imaginary mattress filling capacity
  const mattressFillBeds = Number((hairPopulation / 300000).toFixed(2));

  return (
    <div className="border border-border bg-paper text-left">
      {/* Card Header Bar */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4.5 w-4.5 text-primary" />
          <h3 className="label-tech-ink font-bold">HAIR ECONOMY</h3>
        </div>
        <span className="label-tech border border-emerald-600/40 bg-emerald-600/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          FICTIONAL CONVERSIONS
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Main Hair Population Anchor */}
        <div className="border border-hairline bg-secondary/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="label-tech text-xs text-muted-foreground font-bold">ESTIMATED HAIR POPULATION</div>
            <div className="wordmark text-3xl sm:text-4xl text-primary font-black">
              {hairPopulation.toLocaleString()} <span className="text-sm font-sans font-normal text-foreground/80">FOLLICLES</span>
            </div>
          </div>
          <div className="label-tech border border-border bg-paper px-3 py-1.5 text-xs text-foreground font-bold">
            CROP DENSITY: {hairCoverage}%
          </div>
        </div>

        {/* Humorous Ridiculous Equivalents Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Imaginary Total Length */}
          <div className="border border-hairline bg-muted/20 p-3 space-y-1">
            <div className="label-tech flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
              <Ruler className="h-3 w-3 text-primary" /> TOTAL HAIR LENGTH
            </div>
            <div className="wordmark text-xl sm:text-2xl font-black text-foreground">
              {totalLengthKm} <span className="text-xs font-normal">KM</span>
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">IF STRETCHED END-TO-END</div>
          </div>

          {/* Imaginary Yarn Production */}
          <div className="border border-hairline bg-muted/20 p-3 space-y-1">
            <div className="label-tech flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
              <Scale className="h-3 w-3 text-emerald-600" /> YARN PRODUCTION
            </div>
            <div className="wordmark text-xl sm:text-2xl font-black text-foreground">
              {yarnWeightKg} <span className="text-xs font-normal">KG</span>
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">IMAGINARY SWEATER MATERIAL</div>
          </div>

          {/* Imaginary Paintbrushes */}
          <div className="border border-hairline bg-muted/20 p-3 space-y-1">
            <div className="label-tech flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
              <Scissors className="h-3 w-3 text-amber-600" /> ARTIST BRUSHES
            </div>
            <div className="wordmark text-xl sm:text-2xl font-black text-foreground">
              {paintbrushes.toLocaleString()}
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">HIGH-END PAINTBRUSHES</div>
          </div>

          {/* Imaginary Follicle Portfolio Net Worth */}
          <div className="border border-hairline bg-muted/20 p-3 space-y-1">
            <div className="label-tech flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
              <Sparkles className="h-3 w-3 text-sky-600" /> IMAGINARY NET WORTH
            </div>
            <div className="wordmark text-xl sm:text-2xl font-black text-emerald-700">
              ${netWorthUsd.toLocaleString()}
            </div>
            <div className="label-tech text-[0.55rem] text-muted-foreground">@ $0.045 / FOLLICLE</div>
          </div>
        </div>

        {/* Mattress Fill Bonus Metric */}
        <div className="border border-hairline bg-secondary/20 p-3 flex items-center justify-between text-xs label-tech">
          <span className="text-muted-foreground">IMAGINARY MATTRESS FILLING EQUIVALENT:</span>
          <span className="font-bold text-foreground font-mono">{mattressFillBeds} FULL-SIZE BEDS</span>
        </div>

        {/* Required Entertainment Disclaimer Box */}
        <div className="border-l-2 border-primary bg-secondary/30 p-3 text-xs text-foreground/90 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <div className="font-bold label-tech text-[10px] text-primary">NOTICE</div>
            <p className="text-[11px] leading-snug">
              "These calculations are fictional and created for entertainment."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
