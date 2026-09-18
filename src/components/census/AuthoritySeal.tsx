import { ShieldCheck } from "lucide-react";

export function AuthoritySeal({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full animate-spin-slow text-primary"
        role="img"
        aria-label="Official Seal of the National Hair Census Authority"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path
          id="sealTextPath"
          d="M 15, 50 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          fill="none"
        />
        <text fontSize="5.5" fontWeight="bold" fontFamily="var(--font-mono)" fill="currentColor" letterSpacing="1.2">
          <textPath href="#sealTextPath" startOffset="0%">
            NATIONAL HAIR CENSUS AUTHORITY • EST 2026 •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <ShieldCheck className="h-6 w-6 text-primary" />
      </div>
    </div>
  );
}
