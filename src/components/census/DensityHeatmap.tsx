import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DensityHeatmapProps {
  coverage: number;
  width?: number;
  height?: number;
  className?: string;
  active?: boolean;
}

export function DensityHeatmap({
  coverage,
  width = 640,
  height = 480,
  className,
  active = true,
}: DensityHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const centerX = w / 2;
    const centerY = h * 0.44;
    const radiusX = w * 0.28;
    const radiusY = h * 0.36;

    // Generate pseudo-thermal gradient nodes based on hair coverage percentage
    const numPoints = 80;
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random();
      
      const px = centerX + Math.cos(angle) * radiusX * dist;
      const py = centerY + Math.sin(angle) * radiusY * dist;

      // Higher y (lower part of scalp/head) typically has different density than crown
      const pointDensity = Math.min(
        100,
        Math.max(0, coverage + (Math.random() * 24 - 12) - (py > centerY ? 15 : 0))
      );

      const rad = 25 + Math.random() * 20;

      // Thermal color mapping: Green (Dense) -> Yellow (Medium) -> Red (Exposure)
      let color = "rgba(34, 197, 94, 0.45)"; // Emerald Green
      if (pointDensity < 40) {
        color = "rgba(239, 68, 68, 0.55)"; // Destructive Red
      } else if (pointDensity < 70) {
        color = "rgba(234, 179, 8, 0.5)"; // Amber Yellow
      }

      const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Grid contour overlay
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();

  }, [coverage, active, width, height]);

  if (!active) return null;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="h-full w-full object-cover mix-blend-screen opacity-85"
      />
      
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between border border-hairline bg-paper/90 px-3 py-1.5 backdrop-blur-xs text-[0.625rem] font-mono tracking-widest text-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> DENSE (&gt;70%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> THINNING (40-70%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" /> EXPOSED (&lt;40%)
        </span>
      </div>
    </div>
  );
}
