import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { StatusDot } from "./StatusDot";
import { SYSTEM_META } from "@/data/census";
import { cn } from "@/lib/utils";
import { History, Trophy, Home, Camera, FileText, Globe, Award, Sparkles } from "lucide-react";
import { CensusHistoryDrawer } from "./CensusHistoryDrawer";
import { HairLeaderboardModal } from "./HairLeaderboardModal";
import { CensusModal } from "./CensusModal";
import { CensusCertificate } from "./CensusCertificate";
import { getLatestResult, setLatestResult } from "@/services/hairAnalysis";
import { getCensusHistory, unlockEasterEgg } from "@/services/censusStorage";
import { toast } from "sonner";

export function SiteHeader({ context, className }: { context?: string; className?: string }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const latestResult = getLatestResult();

  const handleLogoClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      unlockEasterEgg("SAITAMA_CLEARANCE");
      toast.success("EASTER EGG UNLOCKED! Level 5 Bureau Saitama Clearance Granted.", {
        description: "0% Drag Coefficient authorization active.",
      });
      setClickCount(0);
    }
  };

  const handleCertificateClick = () => {
    if (latestResult) {
      setCertOpen(true);
    } else {
      const history = getCensusHistory();
      if (history.length > 0) {
        setLatestResult(history[0]);
        setCertOpen(true);
      } else {
        toast.info("No census record found.", {
          description: "Please complete a hair census first.",
        });
        navigate({ to: "/camera" });
      }
    }
  };

  return (
    <>
      {/* Desktop & Tablet Main Header */}
      <header
        className={cn(
          "sticky top-0 z-30 border-b border-hairline bg-background/95 backdrop-blur-md shadow-xs",
          className
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 min-w-0 group cursor-pointer"
            aria-label="MUDI UNDO — home"
          >
            <img
              src="/mudi-undo-logo.jpeg"
              alt="MUDI UNDO Logo"
              className="h-9 w-9 shrink-0 object-cover rounded border border-hairline bg-paper shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 text-left">
              <Wordmark size="sm" showSub={false} />
              <div className="label-tech mt-0.5 truncate text-primary font-bold">
                {context ?? `${SYSTEM_META.department}`}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 label-tech text-xs font-bold">
            <Link
              to="/"
              className="px-2.5 py-1.5 hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              <Home className="h-3.5 w-3.5" /> HOME
            </Link>
            <Link
              to="/camera"
              className="px-2.5 py-1.5 text-primary hover:underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <Camera className="h-3.5 w-3.5" /> CENSUS
            </Link>
            <Link
              to="/results"
              className="px-2.5 py-1.5 hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              <FileText className="h-3.5 w-3.5" /> RESULT
            </Link>
            <button
              onClick={() => setLeaderboardOpen(true)}
              className="px-2.5 py-1.5 hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-500" /> LEADERBOARD
            </button>
            <button
              onClick={() => setHistoryOpen(true)}
              className="px-2.5 py-1.5 hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              <History className="h-3.5 w-3.5" /> MY HISTORY
            </button>
            <button
              onClick={handleCertificateClick}
              className="px-2.5 py-1.5 text-emerald-700 hover:underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <Award className="h-3.5 w-3.5" /> CERTIFICATE
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <StatusDot className="hidden sm:inline-flex" />
          </div>
        </div>
      </header>

      {/* Clean Mobile Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-hairline bg-background/98 backdrop-blur-md px-2 py-2 flex items-center justify-around shadow-lg"
        aria-label="Mobile Navigation"
      >
        <Link
          to="/"
          className="flex flex-col items-center gap-0.5 text-[10px] label-tech text-foreground/80 hover:text-primary transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>HOME</span>
        </Link>

        <Link
          to="/camera"
          className="flex flex-col items-center gap-0.5 text-[10px] label-tech font-bold text-primary"
        >
          <Camera className="h-4 w-4 text-primary" />
          <span>CENSUS</span>
        </Link>

        <Link
          to="/results"
          className="flex flex-col items-center gap-0.5 text-[10px] label-tech text-foreground/80 hover:text-primary transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>RESULT</span>
        </Link>

        <button
          onClick={() => setLeaderboardOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] label-tech text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
        >
          <Trophy className="h-4 w-4 text-amber-500" />
          <span>LEADERBOARD</span>
        </button>

        <button
          onClick={() => setHistoryOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] label-tech text-foreground/80 hover:text-primary transition-colors cursor-pointer"
        >
          <History className="h-4 w-4" />
          <span>HISTORY</span>
        </button>

        <button
          onClick={handleCertificateClick}
          className="flex flex-col items-center gap-0.5 text-[10px] label-tech text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
        >
          <Award className="h-4 w-4 text-emerald-600" />
          <span>CERT</span>
        </button>
      </nav>

      {/* Drawers and Modals */}
      <CensusHistoryDrawer open={historyOpen} onOpenChange={setHistoryOpen} />
      <HairLeaderboardModal open={leaderboardOpen} onOpenChange={setLeaderboardOpen} />

      {latestResult && (
        <CensusModal
          open={certOpen}
          onOpenChange={setCertOpen}
          title="CENSUS CERTIFICATE"
          meta={`DOC MU-11 · ${latestResult.censusNumber}`}
        >
          <CensusCertificate result={latestResult} />
          <p className="label-tech mt-4">SCREENSHOT THIS DOCUMENT TO RETAIN YOUR RECORD.</p>
        </CensusModal>
      )}
    </>
  );
}
