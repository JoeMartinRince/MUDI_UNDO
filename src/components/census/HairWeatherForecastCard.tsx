import { useState } from "react";
import { Cloud, Wind, CloudRain, Zap, Sun, AlertTriangle, RefreshCw, Compass } from "lucide-react";

interface HairWeatherForecastCardProps {
  hairPopulation?: number;
  censusNumber?: string;
}

export function HairWeatherForecastCard({ hairPopulation = 85000, censusNumber = "MU-884920" }: HairWeatherForecastCardProps) {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Deterministic calculation for overall chaos % based on hair census number
  const seed = censusNumber.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const chaosPercentage = 65 + (seed % 25); // ~65% - 89%, defaulted around 78%

  const forecastMessages = [
    "Comb conditions are poor.",
    "Frizz warning issued.",
    "Strong wind may cause hairstyle instability.",
    "Humidity advisory: Expect 40% sudden volume expansion.",
    "Barometric scalp pressure holding steady at 1013 hPa.",
    "Static electricity surge detected on crown region.",
    "Severe bedhead front approaching from the West.",
  ];

  const refreshForecast = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setActiveMessageIndex((prev) => (prev + 1) % forecastMessages.length);
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div className="border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative">
      {/* Top Header */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <CloudRain className="h-5 w-5 text-sky-400 animate-bounce" />
          <h3 className="wordmark text-2xl sm:text-3xl text-sky-400 font-black tracking-wider">
            HAIR WEATHER FORECAST
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-sky-400/50 bg-sky-400/10 px-2 py-0.5 text-[10px] font-bold text-sky-300 uppercase">
            FICTIONAL HAIR WEATHER
          </span>
          <button
            onClick={refreshForecast}
            disabled={isRefreshing}
            className="label-tech flex items-center gap-1 border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-sky-300 hover:text-paper cursor-pointer transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>UPDATE RADAR</span>
          </button>
        </div>
      </div>

      {/* Atmospheric Canvas & Animated Weather Effects Container */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-paper p-5 sm:p-7 space-y-6 overflow-hidden">
        {/* Animated Background Weather Layer: Clouds, Rain, Wind & Hair Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
          {/* Animated Clouds */}
          <div className="absolute top-2 left-[-10%] text-slate-400/40 animate-[pulse_4s_infinite,bounce_8s_infinite] flex items-center gap-8">
            <Cloud className="h-16 w-16" />
            <Cloud className="h-24 w-24" />
          </div>
          <div className="absolute top-10 right-[-5%] text-sky-300/30 animate-[pulse_6s_infinite]">
            <Cloud className="h-20 w-20" />
          </div>

          {/* Wind Streaks */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent animate-pulse" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent animate-pulse delay-500" />

          {/* Simulated Rain Drops */}
          <div className="absolute top-0 left-1/4 w-0.5 h-12 bg-sky-400/60 rotate-12 animate-[ping_2s_infinite]" />
          <div className="absolute top-8 left-2/3 w-0.5 h-10 bg-sky-300/50 rotate-12 animate-[ping_1.5s_infinite_0.3s]" />
          <div className="absolute top-4 left-4/5 w-0.5 h-14 bg-indigo-400/60 rotate-12 animate-[ping_2.5s_infinite_0.7s]" />

          {/* Lightning Flash Accent */}
          <div className="absolute top-3 right-1/3 text-amber-300/40 animate-pulse">
            <Zap className="h-8 w-8" />
          </div>

          {/* Floating Hair Strand Particles */}
          <div className="absolute inset-0 flex justify-around items-center text-xs opacity-60">
            <span className="animate-[bounce_3s_infinite_0.2s]">~</span>
            <span className="animate-[bounce_4s_infinite_0.6s]">~</span>
            <span className="animate-[bounce_2.5s_infinite_0.9s]">~</span>
            <span className="animate-[bounce_3.5s_infinite_0.4s]">~</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="relative z-10 space-y-6">
          {/* Top Overall Hair Weather Banner */}
          <div className="border-2 border-sky-500/40 bg-slate-900/90 p-5 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-sm">
            <div className="space-y-1 text-center sm:text-left">
              <div className="label-tech text-xs text-sky-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                <Compass className="h-4 w-4 animate-spin" /> OVERALL HAIR WEATHER
              </div>
              <div className="wordmark text-3xl sm:text-5xl font-black text-paper tracking-tight">
                <span className="text-sky-400">{chaosPercentage}%</span> CHAOTIC
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Scalp atmospheric pressure indicates erratic follicle turbulence.
              </p>
            </div>

            <div className="border border-sky-500/30 bg-sky-950/40 p-4 text-center rounded shrink-0 space-y-1 min-w-[180px]">
              <div className="label-tech text-[10px] text-sky-300">ATMOSPHERIC STATUS</div>
              <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-lg">
                <Wind className="h-5 w-5 animate-pulse" /> HIGH TURBULENCE
              </div>
              <div className="text-[10px] text-slate-400">BAROMETER: 1013 hPa</div>
            </div>
          </div>

          {/* Today's Hair Forecast 4-Time Window Grid */}
          <div className="space-y-3">
            <div className="label-tech text-xs text-sky-300 font-bold flex items-center gap-1">
              <Sun className="h-4 w-4 text-amber-400" /> TODAY'S HAIR FORECAST
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* MORNING */}
              <div className="border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 rounded text-center hover:border-sky-400 transition-colors shadow">
                <div className="label-tech text-[10px] text-slate-400 font-bold uppercase">MORNING</div>
                <div className="text-3xl">🌤️</div>
                <div className="wordmark font-bold text-sm text-emerald-400">Stable</div>
                <div className="text-[10px] text-slate-400">06:00 - 12:00</div>
              </div>

              {/* AFTERNOON */}
              <div className="border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 rounded text-center hover:border-sky-400 transition-colors shadow">
                <div className="label-tech text-[10px] text-slate-400 font-bold uppercase">AFTERNOON</div>
                <div className="text-3xl">💨</div>
                <div className="wordmark font-bold text-sm text-sky-300">Slightly Chaotic</div>
                <div className="text-[10px] text-slate-400">12:00 - 17:00</div>
              </div>

              {/* EVENING */}
              <div className="border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 rounded text-center hover:border-sky-400 transition-colors shadow">
                <div className="label-tech text-[10px] text-slate-400 font-bold uppercase">EVENING</div>
                <div className="text-3xl">🌪️</div>
                <div className="wordmark font-bold text-sm text-amber-400">High Chaos</div>
                <div className="text-[10px] text-slate-400">17:00 - 22:00</div>
              </div>

              {/* NIGHT */}
              <div className="border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 rounded text-center hover:border-sky-400 transition-colors shadow">
                <div className="label-tech text-[10px] text-slate-400 font-bold uppercase">NIGHT</div>
                <div className="text-3xl">🌧️</div>
                <div className="wordmark font-bold text-sm text-indigo-400">Pillow Friction</div>
                <div className="text-[10px] text-slate-400">22:00 - 06:00</div>
              </div>
            </div>
          </div>

          {/* Random Forecast Advisory Message Ticker */}
          <div className="border border-amber-500/40 bg-amber-950/30 p-3 rounded flex items-center justify-between gap-3 text-amber-200 text-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="font-bold">METEOROLOGICAL ADVISORY:</span>
              <span className="italic font-sans text-slate-200 animate-fade-in">
                "{forecastMessages[activeMessageIndex]}"
              </span>
            </div>
            <button
              onClick={refreshForecast}
              className="text-[10px] underline text-amber-400 hover:text-paper cursor-pointer shrink-0"
            >
              NEXT ADVISORY
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Footer */}
      <div className="bg-slate-950 border-t border-slate-800 p-3 text-[11px] text-slate-400 flex items-center justify-between font-sans">
        <div className="flex items-center gap-2">
          <span className="label-tech text-[10px] font-bold text-sky-400 border border-sky-400/40 px-1.5 py-0.5">
            FICTIONAL HAIR WEATHER
          </span>
          <span>Forecast data is simulated for entertainment purposes only and does not reflect actual weather or clinical predictions.</span>
        </div>
      </div>
    </div>
  );
}
