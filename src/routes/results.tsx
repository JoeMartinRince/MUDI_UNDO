import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, FileText, CheckCircle2, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/census/SiteHeader";
import { SiteFooter } from "@/components/census/SiteFooter";
import { StatCard } from "@/components/census/StatCard";
import { ClassificationCard } from "@/components/census/ClassificationCard";
import { PopulationScale } from "@/components/census/PopulationScale";
import { TwinCard } from "@/components/census/TwinCard";
import { CensusButton } from "@/components/census/CensusButton";
import { CensusModal } from "@/components/census/CensusModal";
import { CensusCertificate } from "@/components/census/CensusCertificate";
import { DisputeModal } from "@/components/census/DisputeModal";
import { MetaStrip } from "@/components/census/MetaStrip";
import { getLatestResult, clearCapturedImage } from "@/services/hairAnalysis";

import { GlobalCensusTicker } from "@/components/census/GlobalCensusTicker";
import { HairPersonalityCard } from "@/components/census/HairPersonalityCard";
import { HairEconomyCard } from "@/components/census/HairEconomyCard";
import { WindTunnelCard } from "@/components/census/WindTunnelCard";
import { HairDnaCard } from "@/components/census/HairDnaCard";
import { AuthoritySeal } from "@/components/census/AuthoritySeal";
import { VisualDensityHeatmapCard } from "@/components/census/VisualDensityHeatmapCard";
import { FollicleParticleCanvas } from "@/components/census/FollicleParticleCanvas";
import { GuessAccuracyCard } from "@/components/census/GuessAccuracyCard";
import { GlobalCensusDashboard } from "@/components/census/GlobalCensusDashboard";
import { NicknameModal } from "@/components/census/NicknameModal";
import { WhereDidYourHairGoCard } from "@/components/census/WhereDidYourHairGoCard";
import { MyHairHistoryCard } from "@/components/census/MyHairHistoryCard";
import { EasterEggAlerts } from "@/components/census/EasterEggAlerts";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Hair Census Complete — MUDI UNDO?" },
      {
        name: "description",
        content:
          "Official hair census report: estimated hair population, coverage, scalp exposure, baldness index and classification.",
      },
      { property: "og:title", content: "Hair Census Complete — MUDI UNDO?" },
      {
        property: "og:description",
        content: "Your official hair population report, classification and census certificate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const result = getLatestResult();
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const [nicknameOpen, setNicknameOpen] = useState(true);

  if (!result) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <SiteHeader context="NO CENSUS ON RECORD" />
        <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
          <h1 className="wordmark text-3xl sm:text-5xl font-black">NO CENSUS ON RECORD</h1>
          <p className="max-w-prose text-sm leading-relaxed text-foreground/80">
            The department has no completed hair census for this session. Please submit an image
            for analysis.
          </p>
          <CensusButton asChild size="lg">
            <Link to="/camera">
              BEGIN CENSUS <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CensusButton>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-16 md:pb-0">
      <SiteHeader context={`REPORT ${result.censusNumber}`} />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8 space-y-6">
        <GlobalCensusTicker />

        {/* 1. HAIR POPULATION REVEAL - Competition Result Dashboard Header */}
        <section className="animate-rise border-2 border-primary bg-paper p-6 sm:p-8 text-center relative overflow-hidden shadow-md">
          <div className="grid-paper absolute inset-0 opacity-20" aria-hidden />

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="flex flex-wrap items-center justify-between w-full border-b border-hairline pb-3 gap-2">
              <div className="label-tech flex items-center gap-1.5 font-bold text-primary text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>CENSUS STATUS: OFFICIALLY REGISTERED & VERIFIED</span>
              </div>
              <button
                onClick={() => setNicknameOpen(true)}
                className="label-tech flex items-center gap-1 font-bold text-amber-600 hover:underline cursor-pointer border border-amber-500/40 bg-amber-500/10 px-2.5 py-1"
              >
                <Trophy className="h-3.5 w-3.5" />
                <span>REGISTER NICKNAME</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <AuthoritySeal className="h-14 w-14 shrink-0" />
              <div className="text-center sm:text-left">
                <h1 className="wordmark text-3xl sm:text-5xl text-foreground font-black tracking-tight">
                  HAIR CENSUS COMPLETE
                </h1>
                <div className="label-tech text-primary font-bold mt-0.5">
                  NATIONAL HAIR CENSUS AUTHORITY • OFFICIAL RECORD
                </div>
              </div>
            </div>

            {/* Particle Canvas & Animated Hair Population Counter */}
            <FollicleParticleCanvas targetPopulation={result.hairPopulation} />

            {/* Quick Authority Metrics Strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full pt-2 text-left font-mono">
              <div className="border border-hairline bg-paper p-3">
                <span className="label-tech">DENSITY INDEX</span>
                <div className="wordmark text-xl text-primary font-bold mt-1">{result.hairCoverage}%</div>
                <span className="label-tech text-[0.55rem]">SCALP COVERAGE</span>
              </div>

              <div className="border border-hairline bg-paper p-3">
                <span className="label-tech">CONFIDENCE</span>
                <div className="wordmark text-xl text-foreground font-bold mt-1">{result.confidence}%</div>
                <span className="label-tech text-[0.55rem]">AI VISION SCORE</span>
              </div>

              <div className="border border-hairline bg-paper p-3">
                <span className="label-tech">CLASSIFICATION</span>
                <div className="wordmark text-lg text-emerald-700 font-bold mt-1 truncate">{result.classification}</div>
                <span className="label-tech text-[0.55rem]">ECOSYSTEM TIER</span>
              </div>

              <div className="border border-hairline bg-paper p-3">
                <span className="label-tech">CENSUS ID</span>
                <div className="wordmark text-sm font-mono text-foreground font-bold mt-1 truncate">{result.censusNumber}</div>
                <span className="label-tech text-[0.55rem]">REGISTRATION REF</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DYNAMIC EASTER EGG ALERTS */}
        <EasterEggAlerts result={result} />

        {/* 3. GUESS VS REALITY REVEAL CARD */}
        {typeof result.userGuess === "number" && (
          <GuessAccuracyCard
            userGuess={result.userGuess}
            actualEstimate={result.hairPopulation}
            difference={result.userGuessDifference}
            accuracy={result.userGuessAccuracy}
          />
        )}

        {/* 4. HAIR PROFILE - Classification & Core Statistics Grid */}
        <ClassificationCard result={result} />

        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard label="HAIR COVERAGE" value={`${result.hairCoverage}%`} index={0} />
          <StatCard label="SCALP EXPOSURE" value={`${result.scalpExposure}%`} index={1} />
          <StatCard label="BALDNESS INDEX" value={`${result.baldnessIndex}`} index={2} />
          <StatCard label="CONFIDENCE" value={`${result.confidence}%`} index={3} />
        </section>

        <p className="label-tech text-[0.6rem] text-left text-muted-foreground">
          ALL METRICS ARE EXPERIMENTAL ESTIMATES PRODUCED BY AN UNVERIFIED VISION PIPELINE.
        </p>

        {/* 5. DENSITY HEATMAP */}
        <VisualDensityHeatmapCard
          hairCoverage={result.hairCoverage}
          confidence={result.confidence}
        />

        {/* 6. WHERE DID YOUR HAIR GO? INVESTIGATION */}
        <WhereDidYourHairGoCard
          hairPopulation={result.hairPopulation}
          censusNumber={result.censusNumber}
        />

        {/* 7. HAIR TWIN */}
        <TwinCard
          twin={result.twin}
          hairCoverage={result.hairCoverage}
          scalpExposure={result.scalpExposure}
        />

        {/* 8. HAIR DNA */}
        <HairDnaCard
          censusNumber={result.censusNumber}
          hairCoverage={result.hairCoverage}
          confidence={result.confidence}
        />

        {/* 9. HAIR PERSONALITY */}
        <HairPersonalityCard
          hairCoverage={result.hairCoverage}
          hairPopulation={result.hairPopulation}
        />

        {/* 10. HAIR ECONOMY */}
        <HairEconomyCard
          hairPopulation={result.hairPopulation}
          hairCoverage={result.hairCoverage}
        />

        {/* 11. WIND RESISTANCE TEST */}
        <WindTunnelCard
          hairCoverage={result.hairCoverage}
          baldnessIndex={result.baldnessIndex}
        />

        {/* 12. MY HAIR HISTORY */}
        <MyHairHistoryCard currentResult={result} />

        {/* 13. GLOBAL CENSUS & LEADERBOARD DASHBOARD */}
        <GlobalCensusDashboard />

        {/* 14. POPULATION SCALE VISUALIZATION */}
        <PopulationScale active={result.classification} />

        {/* 15. FINAL VERDICT */}
        <section className="border border-border bg-paper text-left">
          <div className="hairline-b flex items-center justify-between px-4 py-3">
            <h3 className="label-tech-ink font-bold">FINAL VERDICT</h3>
            <span className="label-tech font-mono">DOC MU-07</span>
          </div>
          <div className="p-5 sm:p-7">
            <p className="wordmark text-xl sm:text-2xl font-black">HAIR DETECTED.</p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-foreground/80">
              The census department confirms that the subject currently possesses a statistically
              significant quantity of hair.
            </p>
            <div className="hairline-t mt-6 grid gap-2 pt-4 sm:grid-cols-2 text-xs">
              <span className="label-tech">CERTIFIED BY: NATIONAL HAIR CENSUS AUTHORITY</span>
              <span className="label-tech sm:text-right font-mono">REF {result.censusNumber}</span>
            </div>
          </div>
        </section>

        {/* 16. ACTIONS & CERTIFICATE TRIGGER */}
        <section className="flex flex-col gap-3">
          <CensusButton asChild size="lg" className="w-full">
            <Link to="/camera" onClick={() => clearCapturedImage()}>
              TAKE ANOTHER CENSUS <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CensusButton>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CensusButton
              variant="outline"
              size="lg"
              className="w-full sm:flex-1"
              onClick={() => setCertOpen(true)}
            >
              <FileText className="h-3.5 w-3.5" /> GENERATE CENSUS CERTIFICATE
            </CensusButton>
            <CensusButton
              variant="danger"
              size="lg"
              className="w-full sm:flex-1"
              onClick={() => setDisputeOpen(true)}
            >
              DISPUTE THIS CENSUS
            </CensusButton>
          </div>
        </section>

        <MetaStrip
          className="mt-8"
          items={[
            { label: "CENSUS NUMBER", value: result.censusNumber },
            { label: "ANALYSIS REGION", value: result.telemetry.analysisRegion },
            { label: "PIXELS ANALYZED", value: result.telemetry.pixelsAnalysed.toLocaleString("en-US") },
            { label: "DATA SOURCE", value: "CAMERA / ACQUIRED" },
          ]}
        />
      </main>

      <SiteFooter />

      <NicknameModal
        open={nicknameOpen}
        onOpenChange={setNicknameOpen}
        result={result}
      />

      <DisputeModal
        open={disputeOpen}
        onOpenChange={setDisputeOpen}
        censusNumber={result.censusNumber}
      />

      <CensusModal
        open={certOpen}
        onOpenChange={setCertOpen}
        title="CENSUS CERTIFICATE"
        meta={`DOC MU-11 · ${result.censusNumber}`}
      >
        <CensusCertificate result={result} />
        <p className="label-tech mt-4">SCREENSHOT THIS DOCUMENT TO RETAIN YOUR RECORD.</p>
      </CensusModal>
    </div>
  );
}
