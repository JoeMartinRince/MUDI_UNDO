import type { CensusResult } from "@/data/census";
import { CLASSIFICATION_DETAILS } from "@/data/census";
import { Trees, Sparkles } from "lucide-react";

export function ClassificationCard({ result }: { result: CensusResult }) {
  const details = CLASSIFICATION_DETAILS[result.classification] ?? {
    name: result.classification.toUpperCase(),
    icon: "🌲",
    badge: `${result.hairPopulation.toLocaleString()} FOLLICLES`,
    description: "Your scalp ecosystem has been officially cataloged by the Census Authority.",
  };

  return (
    <section className="animate-rise border-2 border-primary/40 bg-accent/30 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-primary/30 px-4 py-3 sm:px-6">
        <h3 className="label-tech-ink flex items-center gap-1.5">
          <Trees className="h-4 w-4 text-primary" />
          <span>OFFICIAL HAIR CLASSIFICATION</span>
        </h3>
        <span className="label-tech font-bold text-primary">{details.badge}</span>
      </div>

      <div className="p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl leading-none select-none" aria-hidden>
            {details.icon}
          </span>
          <div>
            <h2 className="wordmark text-3xl sm:text-5xl text-foreground font-black tracking-tight">
              {details.name}
            </h2>
            <div className="label-tech text-primary mt-1 flex items-center gap-1 font-bold">
              <Sparkles className="h-3 w-3" /> STATISTICAL CLASSIFICATION CATEGORY
            </div>
          </div>
        </div>

        <blockquote className="border-l-2 border-primary bg-paper/80 p-3.5 italic text-sm text-foreground/90 font-sans leading-relaxed">
          "{details.description}"
        </blockquote>

        <p className="label-tech text-[0.6rem] text-muted-foreground">
          CLASSIFICATION SYSTEM CREATED FOR ENTERTAINMENT AND STATISTICAL DEMONSTRATIONS ONLY.
        </p>
      </div>
    </section>
  );
}
