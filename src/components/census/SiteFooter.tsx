import { DISCLAIMER, SYSTEM_META } from "@/data/census";

export function SiteFooter() {
  return (
    <footer className="hairline-t mt-12 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/mudi-undo-logo.jpeg"
            alt="MUDI UNDO Logo"
            className="h-8 w-8 object-cover rounded border border-hairline bg-paper"
          />
          <div className="label-tech text-xs">
            {SYSTEM_META.department} · {SYSTEM_META.division}
          </div>
        </div>
        <div className="label-tech space-y-1.5">
          {DISCLAIMER.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="hairline-t mt-6 grid gap-2 pt-4 sm:grid-cols-2">
          <p className="label-tech">
            {SYSTEM_META.department} · {SYSTEM_META.division}
          </p>
          <p className="label-tech sm:text-right">
            PROTOCOL {SYSTEM_META.protocol} · VERSION {SYSTEM_META.version}
          </p>
        </div>
      </div>
    </footer>
  );
}
