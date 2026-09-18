import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Activity, ShieldAlert } from "lucide-react";
import { CensusButton } from "./CensusButton";
import { getCapturedImage } from "@/services/hairAnalysis";

interface VisualDensityHeatmapCardProps {
  hairCoverage: number;
  confidence: number;
}

export function VisualDensityHeatmapCard({ hairCoverage, confidence }: VisualDensityHeatmapCardProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const captured = getCapturedImage();
  const imageUrl =
    captured && typeof captured === "object" && "dataUrl" in captured
      ? captured.dataUrl
      : typeof captured === "string"
      ? captured
      : null;

  useEffect(() => {
    if (!showOverlay || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const centerX = w / 2;
    const centerY = h * 0.45;
    const radiusX = w * 0.32;
    const radiusY = h * 0.38;

    // Thermal density point simulation based on hairCoverage
    const pointsCount = 120;
    for (let i = 0; i < pointsCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(Math.random());

      const px = centerX + Math.cos(angle) * radiusX * dist;
      const py = centerY + Math.sin(angle) * radiusY * dist;

      // Higher Y position (crown vs forehead) variations
      const densityVal = Math.min(
        100,
        Math.max(5, hairCoverage + (Math.random() * 30 - 15) - (py > centerY ? 20 : 0))
      );

      const rad = 24 + Math.random() * 22;

      // Color spectrum: Emerald (High > 70%), Amber (Medium 40-70%), Red (Low < 40%)
      let color = "rgba(16, 185, 129, 0.55)"; // High Density - Emerald
      if (densityVal < 40) {
        color = "rgba(239, 68, 68, 0.65)"; // Low Density - Red
      } else if (densityVal < 70) {
        color = "rgba(245, 158, 11, 0.6)"; // Medium Density - Amber
      }

      const gradient = ctx.createRadialGradient(px, py, 0, px, py, rad);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(px, py, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Grid contour line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();

  }, [hairCoverage, showOverlay]);

  return (
    <div className="border-2 border-border bg-paper text-left">
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="label-tech-ink font-bold">VISUAL HAIR DENSITY ESTIMATE</h3>
        </div>
        <CensusButton
          size="sm"
          variant="outline"
          onClick={() => setShowOverlay(!showOverlay)}
          className="h-7 text-[0.65rem] px-2.5"
        >
          {showOverlay ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
          {showOverlay ? "RAW SPECIMEN VIEW" : "HEATMAP OVERLAY"}
        </CensusButton>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* Specimen Viewport Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden border border-hairline bg-ink shadow-inner rounded-xs">
          <div className="grid-paper absolute inset-0 opacity-30" aria-hidden />

          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Census Specimen"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-paper/60">
              [ SPECIMEN FRAME AVAILABLE ]
            </div>
          )}

          {/* Thermal Overlay Canvas */}
          {showOverlay && (
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-90 transition-opacity duration-300"
            />
          )}

          <div className="absolute top-2 left-2 label-tech bg-paper/90 px-2 py-1 text-[0.6rem] border border-hairline backdrop-blur-xs">
            {showOverlay ? "MODE: THERMAL DENSITY OVERLAY" : "MODE: DIRECT SPECIMEN"}
          </div>
        </div>

        {/* Legend */}
        <div className="border border-hairline bg-secondary/30 p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="label-tech font-bold text-foreground">HEATMAP LEGEND:</span>
          
          <div className="flex flex-wrap items-center gap-4 text-[0.65rem]">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-xs" />
              <span className="text-emerald-700">HIGH DENSITY</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-3 w-3 rounded-full bg-amber-500 shadow-xs" />
              <span className="text-amber-700">MEDIUM DENSITY</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-3 w-3 rounded-full bg-red-500 shadow-xs" />
              <span className="text-red-700">LOW DENSITY</span>
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-[0.6rem] label-tech text-muted-foreground border-t border-hairline pt-3">
          <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>
            VISUAL HAIR DENSITY ESTIMATE IS PRODUCED FOR STATISTICAL ENTERTAINMENT ONLY. THIS IS NOT A MEDICAL MEASUREMENT, DERMATOLOGICAL ANALYSIS, OR CLINICAL DIAGNOSIS.
          </span>
        </div>
      </div>
    </div>
  );
}
