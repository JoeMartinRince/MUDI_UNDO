import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, Wind, Dna, DollarSign, Users, ShieldAlert } from "lucide-react";
import { Wordmark } from "@/components/census/Wordmark";
import { StatusDot } from "@/components/census/StatusDot";
import { MetaStrip } from "@/components/census/MetaStrip";
import { CensusButton } from "@/components/census/CensusButton";
import { ScanVisualization } from "@/components/census/ScanVisualization";
import { SiteFooter } from "@/components/census/SiteFooter";
import { GlobalCensusTicker } from "@/components/census/GlobalCensusTicker";
import { SYSTEM_META } from "@/data/census";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MUDI UNDO? — Official Human Hair Population Survey" },
      {
        name: "description",
        content:
          "An advanced computer-vision census designed to determine the current population status of human hair. Estimates coverage, scalp exposure and hair population.",
      },
      { property: "og:title", content: "MUDI UNDO? — Official Human Hair Population Survey" },
      {
        property: "og:description",
        content:
          "A deadpan computer-vision census that estimates your hair population, coverage and baldness index.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 space-y-6">
        {/* masthead */}
        <div className="hairline-b grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 py-4">
          <div className="min-w-0">
            <div className="label-tech">{SYSTEM_META.department}</div>
            <div className="label-tech mt-1">{SYSTEM_META.division}</div>
          </div>
          <StatusDot className="hidden sm:inline-flex" />
          <StatusDot label="ONLINE" className="sm:hidden" />
        </div>

        <GlobalCensusTicker />

        <main>
          <section className="grid gap-8 py-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div className="min-w-0 text-left">
              <Wordmark size="xl" showSub={false} showLogo={true} />
              <div
                lang="ml"
                className="mt-3 font-sans text-lg text-muted-foreground sm:text-xl"
              >
                മുടി ഉണ്ടോ?
              </div>
              <div className="label-tech mt-3">OFFICIAL HUMAN HAIR POPULATION SURVEY</div>

              <h1 className="wordmark mt-8 text-4xl leading-[0.95] sm:text-6xl">
                WE NEED TO KNOW.
              </h1>

              <p className="mt-5 max-w-prose text-base leading-relaxed text-foreground/80">
                An advanced computer-vision census designed to determine the current population
                status of human hair. Includes live leaderboards, wind tunnel lab, financial hair valuation, and character twin matching.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CensusButton asChild size="lg">
                  <Link to="/camera">
                    BEGIN CENSUS <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CensusButton>
                <div className="label-tech space-y-1 sm:ml-2">
                  <p>NO REGISTRATION REQUIRED</p>
                  <p>CAMERA ACCESS REQUIRED</p>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="border border-hairline bg-paper p-2 sm:p-3">
                <div className="label-tech mb-2 flex items-center justify-between px-1">
                  <span>SPECIMEN VIEW / MU-01</span>
                  <span>CAL 0.998</span>
                </div>
                <ScanVisualization scanning />
              </div>
            </div>
          </section>

          {/* Feature Badges Grid */}
          <section className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-left">
            <div className="border border-hairline bg-paper p-3 space-y-1">
              <div className="label-tech flex items-center gap-1.5 text-primary">
                <Users className="h-3.5 w-3.5" /> 20 HAIR TWINS
              </div>
              <div className="text-xs font-mono font-bold text-foreground">CHARACTER MATCHING</div>
              <p className="label-tech text-[0.55rem]">Match Saitama, Bob Ross & Gojo</p>
            </div>

            <div className="border border-hairline bg-paper p-3 space-y-1">
              <div className="label-tech flex items-center gap-1.5 text-amber-600">
                <Wind className="h-3.5 w-3.5" /> AERODYNAMICS LAB
              </div>
              <div className="text-xs font-mono font-bold text-foreground">WIND TUNNEL TEST</div>
              <p className="label-tech text-[0.55rem]">Drag coefficient & wind tolerance</p>
            </div>

            <div className="border border-hairline bg-paper p-3 space-y-1">
              <div className="label-tech flex items-center gap-1.5 text-emerald-600">
                <DollarSign className="h-3.5 w-3.5" /> HAIR ECONOMY
              </div>
              <div className="text-xs font-mono font-bold text-foreground">FINANCIAL REPORT</div>
              <p className="label-tech text-[0.55rem]">Portfolio worth & Barber tax</p>
            </div>

            <div className="border border-hairline bg-paper p-3 space-y-1">
              <div className="label-tech flex items-center gap-1.5 text-primary">
                <Trophy className="h-3.5 w-3.5" /> LEADERBOARD
              </div>
              <div className="text-xs font-mono font-bold text-foreground">NATIONAL RANKINGS</div>
              <p className="label-tech text-[0.55rem]">Compete for top scalp population</p>
            </div>
          </section>

          <MetaStrip className="mb-10" />
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
