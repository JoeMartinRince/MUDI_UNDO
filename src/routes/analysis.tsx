import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/census/SiteHeader";
import { ScanVisualization } from "@/components/census/ScanVisualization";
import { MetaStrip } from "@/components/census/MetaStrip";
import { ANALYSIS_TELEMETRY } from "@/data/census";
import { analyzeHair, getCapturedImage, getGeminiDebugInfo } from "@/services/hairAnalysis";
import { cn } from "@/lib/utils";
import { Sparkles, Activity } from "lucide-react";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Census In Progress — MUDI UNDO?" },
      {
        name: "description",
        content: "Segmenting scalp regions and estimating follicle population under census protocol MU-01.",
      },
      { property: "og:title", content: "Census In Progress — MUDI UNDO?" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AnalysisPage,
});

const CINEMATIC_STAGES = [
  { id: "init", label: "Initializing Census...", at: 300 },
  { id: "geometry", label: "Analyzing head geometry...", at: 1000 },
  { id: "density", label: "Estimating hair density...", at: 1800 },
  { id: "population", label: "Calculating population...", at: 2600 },
  { id: "reveal", label: "Revealing final census record...", at: 3400 },
];

function AnalysisPage() {
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(0);
  const [debugInfo, setDebugInfo] = useState<{ received: boolean; data?: any; error?: string }>({ received: false });

  const capturedImage = getCapturedImage();
  const previewUrl =
    capturedImage && typeof capturedImage === "object" && "dataUrl" in capturedImage
      ? capturedImage.dataUrl
      : typeof capturedImage === "string"
        ? capturedImage
        : null;

  const analysisStartedRef = useRef(false);

  useEffect(() => {
    // Ensure analysis is strictly invoked ONCE
    if (analysisStartedRef.current) return;
    analysisStartedRef.current = true;

    const startedAt = performance.now();
    let rafId = 0;

    const tick = () => {
      setElapsed(performance.now() - startedAt);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const controller = new AbortController();

    async function runPipeline() {
      try {
        await analyzeHair(capturedImage, { signal: controller.signal });
        setDebugInfo(getGeminiDebugInfo());

        // Pause to complete cinematic stages sequence before navigating to results
        setTimeout(() => {
          navigate({ to: "/results" });
        }, 3600);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("[MUDI DEBUG ERROR] Analysis execution failed:", err);
          setDebugInfo(getGeminiDebugInfo());
        }
      }
    }

    runPipeline();

    return () => {
      cancelAnimationFrame(rafId);
      controller.abort();
    };
  }, [capturedImage, navigate]);

  const progress = Math.min(elapsed / 3600, 1);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader context="NATIONAL HAIR CENSUS ENGINE" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8 text-left space-y-6">
        <div className="label-tech flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold text-primary">
            <Activity className="h-3.5 w-3.5 animate-pulse" /> CINEMATIC CENSUS REVEAL PIPELINE
          </span>
          <span className="num-tabular font-bold text-foreground text-sm">{Math.round(progress * 100)}% COMPLETE</span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/mudi-undo-logo.jpeg"
            alt="MUDI UNDO Engine"
            className="h-10 w-10 shrink-0 object-cover rounded border border-hairline bg-paper shadow-sm"
          />
          <h1 className="wordmark text-3xl sm:text-4xl">ANALYZING SPECIMEN FOLLICLES</h1>
        </div>

        {/* Animated Progress Bar */}
        <div className="h-2 w-full overflow-hidden border border-hairline bg-secondary shadow-inner">
          <div
            className="h-full bg-primary transition-[width] duration-200 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="border border-hairline bg-paper p-2 sm:p-3">
            <div className="label-tech mb-2 flex items-center justify-between px-1">
              <span>SCANNER VIEWPORT</span>
              <span className="animate-blip font-bold text-primary">● PROCESSING FOLLICLES</span>
            </div>
            <ScanVisualization scanning previewUrl={previewUrl} />
          </div>

          <div className="min-w-0 space-y-4">
            <ol className="divide-y divide-border border border-border bg-paper shadow-xs">
              {CINEMATIC_STAGES.map((stage, idx) => {
                const isDone = elapsed >= stage.at || debugInfo.received;
                const isCurrent = elapsed >= (CINEMATIC_STAGES[idx - 1]?.at ?? 0) && elapsed < stage.at;

                return (
                  <li
                    key={stage.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 transition-colors font-mono text-xs",
                      isCurrent && "bg-accent/40 font-bold",
                    )}
                  >
                    <span
                      className={cn(
                        "w-5 shrink-0 text-center font-mono text-sm",
                        isDone ? "text-primary font-bold" : isCurrent ? "animate-bounce text-primary" : "text-muted-foreground",
                      )}
                      aria-hidden
                    >
                      {isDone ? "✓" : isCurrent ? "→" : "○"}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 tracking-wider uppercase",
                        isDone ? "text-foreground font-semibold" : isCurrent ? "text-primary font-bold" : "text-muted-foreground",
                      )}
                    >
                      {stage.label}
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* Development-only Gemini Debug Panel */}
            <div className="border border-border bg-paper p-4 font-mono text-xs space-y-1">
              <div className="font-bold text-primary tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> GEMINI AI VISION DIAGNOSTICS
              </div>
              <div className="text-[0.65rem]">
                SERVER STATUS:{" "}
                <span className={debugInfo.received ? "text-emerald-700 font-bold" : "text-muted-foreground"}>
                  {debugInfo.received ? "SUCCESSFUL RESPONSE RECEIVED" : "EXECUTING MULTI-KEY VISION CALL..."}
                </span>
              </div>
              {debugInfo.error && <div className="text-destructive text-[0.65rem]">Error: {debugInfo.error}</div>}
              {debugInfo.data && (
                <div className="mt-2 space-y-1 border-t border-hairline pt-2 text-[0.65rem]">
                  <div>HEAD DETECTED: <span className="font-bold">{String(debugInfo.data.headDetected)}</span></div>
                  <div>COVERAGE %: <span className="font-bold">{debugInfo.data.hairCoverage}%</span></div>
                  <div>CONFIDENCE: <span className="font-bold">{debugInfo.data.confidence}%</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <MetaStrip
          className="mt-8"
          items={[
            { label: "MODEL", value: ANALYSIS_TELEMETRY.model },
            { label: "FRAME RATE", value: ANALYSIS_TELEMETRY.frameRate },
            { label: "MODE", value: "GEMINI VISION PIPELINE" },
            { label: "PROTOCOL", value: "NHCA-PROTOCOL-01" },
          ]}
        />
      </main>
    </div>
  );
}
