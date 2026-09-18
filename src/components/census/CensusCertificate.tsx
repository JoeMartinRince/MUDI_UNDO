import type { CensusResult } from "@/data/census";
import { AuthoritySeal } from "./AuthoritySeal";
import { SYSTEM_META } from "@/data/census";

export function CensusCertificate({ result }: { result: CensusResult }) {
  // Density index approximation in follicles per cm²
  const densityIndex = Math.max(1, Math.round((result.hairCoverage / 100) * 280));

  const rows: Array<[string, string]> = [
    ["CENSUS ID", result.censusNumber],
    ["CENSUS STATUS", "OFFICIALLY REGISTERED & VERIFIED"],
    ["HAIR POPULATION", `${result.hairPopulation.toLocaleString("en-US")} FOLLICLES`],
    ["HAIR COVERAGE", `${result.hairCoverage}%`],
    ["DENSITY INDEX", `${densityIndex} FOLLICLES / CM²`],
    ["CLASSIFICATION", result.classification],
    ["VERIFICATION REF", `NHCA-VERIFIED-${result.censusNumber.slice(-5)}`],
    ...(typeof result.userGuess === "number"
      ? [
          ["PRE-SCAN GUESS", `${result.userGuess.toLocaleString("en-US")} FOLLICLES`],
          ["GUESS ACCURACY", `${result.userGuessAccuracy}% SCORE`],
        ]
      : []),
  ] as Array<[string, string]>;

  return (
    <article className="relative overflow-hidden border-2 border-primary bg-paper text-left">
      <div className="grid-paper absolute inset-0 opacity-25" aria-hidden />
      <div className="relative m-1.5 border border-hairline px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col items-center text-center">
          <AuthoritySeal className="h-16 w-16 mb-2" />
          <div className="wordmark text-2xl sm:text-3xl text-foreground">
            NATIONAL HAIR CENSUS AUTHORITY
          </div>
          <div className="label-tech font-bold text-primary mt-1">
            "{SYSTEM_META.tagline}"
          </div>
          <div className="label-tech mt-1 text-[0.6rem] text-muted-foreground">
            OFFICIAL CERTIFICATE OF HUMAN HAIR REGISTRATION
          </div>
          <div className="mx-auto mt-4 h-px w-24 bg-primary" />
        </div>

        <dl className="mt-6 divide-y divide-border border-y border-border">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-3"
            >
              <dt className="label-tech min-w-0">{label}</dt>
              <dd className="num-tabular font-mono text-xs sm:text-sm font-semibold tracking-tight break-words text-ink">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/mudi-undo-logo.jpeg"
              alt="MUDI UNDO Seal"
              className="h-12 w-12 object-cover rounded border border-hairline bg-paper"
            />
            <div className="text-left">
              <div className="label-tech font-bold text-primary">OFFICIAL BUREAU STAMP</div>
              <div className="label-tech text-[0.55rem] text-muted-foreground">STAMP ID: {SYSTEM_META.sealCode}</div>
            </div>
          </div>

          <div className="min-w-0 text-right">
            <div className="label-tech">ISSUED DATE</div>
            <div className="num-tabular font-mono text-xs">{result.issuedAt}</div>
            <div className="label-tech mt-1.5">SIGNATURE</div>
            <div className="font-mono text-xs italic text-primary font-bold">Chief Registrar of Follicles</div>
          </div>
        </div>

        <div className="hairline-t mt-6 pt-4 text-center">
          <div className="label-tech-ink">NATIONAL HAIR CENSUS AUTHORITY</div>
          <div className="label-tech mt-1 text-[0.55rem]">
            THIS DOCUMENT IS PRODUCED FOR STATISTICAL AND ENTERTAINMENT PURPOSES ONLY.
          </div>
        </div>
      </div>
    </article>
  );
}
