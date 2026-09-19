import { useState } from "react";
import { CensusModal } from "./CensusModal";
import { Sparkles, Dna, Gift, RefreshCw, Trophy, Star } from "lucide-react";

interface HairGachaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  censusNumber?: string;
}

interface GachaItem {
  id: string;
  name: string;
  rarity: "LEGENDARY" | "EPIC" | "RARE" | "COMMON";
  emoji: string;
  color: string;
  description: string;
}

export function HairGachaModal({
  open,
  onOpenChange,
  censusNumber = "MU-884920",
}: HairGachaModalProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPull, setCurrentPull] = useState<GachaItem | null>(null);
  const [inventory, setInventory] = useState<GachaItem[]>([]);

  const gachaPool: GachaItem[] = [
    {
      id: "g1",
      name: "Golden Follicle of Destiny",
      rarity: "LEGENDARY",
      emoji: "🌟",
      color: "border-amber-400 text-amber-300 bg-amber-950/60",
      description: "A mythical strand said to grant +10,000 extra hair population count.",
    },
    {
      id: "g2",
      name: "Crown of 200,000 Strands",
      rarity: "LEGENDARY",
      emoji: "👑",
      color: "border-amber-400 text-amber-300 bg-amber-950/60",
      description: "Ceremonial crown awarded to sovereign scalp rulers.",
    },
    {
      id: "g3",
      name: "Silky Shampoo Blessing",
      rarity: "EPIC",
      emoji: "🧴",
      color: "border-purple-400 text-purple-300 bg-purple-950/60",
      description: "Permanently reduces frizz turbulence by 42%.",
    },
    {
      id: "g4",
      name: "Bedhead Immunity Aura",
      rarity: "EPIC",
      emoji: "✨",
      color: "border-purple-400 text-purple-300 bg-purple-950/60",
      description: "Protects against midnight pillow friction attacks.",
    },
    {
      id: "g5",
      name: "Tactical Anti-Static Comb",
      rarity: "RARE",
      emoji: "🪮",
      color: "border-sky-400 text-sky-300 bg-sky-950/60",
      description: "Precision comb engineered for high-density forest styling.",
    },
    {
      id: "g6",
      name: "Wind-Tunnel Resistance Helmet",
      rarity: "RARE",
      emoji: "🪖",
      color: "border-sky-400 text-sky-300 bg-sky-950/60",
      description: "Shields your hair against Category 5 wind advisories.",
    },
    {
      id: "g7",
      name: "Stray Strand #49,201",
      rarity: "COMMON",
      emoji: "🌾",
      color: "border-slate-700 text-slate-300 bg-slate-900",
      description: "A single, humble follicle registered in the global archives.",
    },
    {
      id: "g8",
      name: "Complimentary Hair Pin",
      rarity: "COMMON",
      emoji: "📌",
      color: "border-slate-700 text-slate-300 bg-slate-900",
      description: "Issued by the National Hair Census Bureau.",
    },
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    setCurrentPull(null);

    setTimeout(() => {
      const rand = Math.random();
      let selected: GachaItem;

      if (rand < 0.08) {
        selected = gachaPool[Math.floor(Math.random() * 2)]; // Legendary
      } else if (rand < 0.3) {
        selected = gachaPool[2 + Math.floor(Math.random() * 2)]; // Epic
      } else if (rand < 0.65) {
        selected = gachaPool[4 + Math.floor(Math.random() * 2)]; // Rare
      } else {
        selected = gachaPool[6 + Math.floor(Math.random() * 2)]; // Common
      }

      setCurrentPull(selected);
      setInventory((prev) => [selected, ...prev]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="HAIR GACHA CAPSULE MACHINE"
      meta={`FOLLICULAR LOTTERY · REF ${censusNumber}`}
    >
      <div className="space-y-5 font-mono text-left select-none">
        {/* Machine Header Banner */}
        <div className="border-2 border-purple-500/40 bg-slate-950 p-4 rounded text-paper flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-xl animate-bounce">
              🎰
            </div>
            <div>
              <div className="wordmark font-black text-purple-400 text-sm">
                FOLLICLE GACHA REELS
              </div>
              <div className="label-tech text-[10px] text-slate-400">
                PULL RARE HAIR ARTIFACTS & ITEM BADGES
              </div>
            </div>
          </div>
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="label-tech flex items-center gap-1.5 border-2 border-purple-400 bg-purple-600 hover:bg-purple-500 text-paper font-black px-4 py-2 text-xs cursor-pointer shadow hover:scale-105 transition-all"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSpinning ? "animate-spin" : ""}`} />
            <span>PULL CAPSULE (FREE)</span>
          </button>
        </div>

        {/* Reel Display Stage */}
        <div className="border-2 border-purple-800 bg-slate-900/90 p-6 rounded text-center relative overflow-hidden min-h-[180px] flex flex-col items-center justify-center space-y-3">
          {isSpinning ? (
            <div className="space-y-3 animate-pulse">
              <div className="text-6xl animate-spin">🎰</div>
              <div className="wordmark text-xl font-black text-purple-400">
                SPINNING FOLLICLE CAPSULE MACHINE...
              </div>
            </div>
          ) : currentPull ? (
            <div className={`border-2 p-5 rounded-lg space-y-2 max-w-sm w-full animate-rise shadow-2xl ${currentPull.color}`}>
              <div className="text-5xl">{currentPull.emoji}</div>
              <div className="label-tech text-[10px] font-bold tracking-widest uppercase">
                {currentPull.rarity} ITEM UNLOCKED
              </div>
              <div className="wordmark text-xl font-black">{currentPull.name}</div>
              <p className="text-xs font-sans italic opacity-90">"{currentPull.description}"</p>
            </div>
          ) : (
            <div className="space-y-2 text-slate-400">
              <div className="text-5xl">🎁</div>
              <div className="wordmark text-lg font-black text-paper">TAP PULL CAPSULE TO SPIN!</div>
              <p className="text-xs font-sans">Collect Legendary, Epic, and Rare hair artifacts.</p>
            </div>
          )}
        </div>

        {/* Pulled Items Inventory Grid */}
        {inventory.length > 0 && (
          <div className="space-y-2">
            <div className="label-tech text-xs text-slate-400 font-bold flex items-center justify-between">
              <span>UNLOCKED COLLECTION ({inventory.length})</span>
              <span className="text-[10px] text-purple-400">RECENT PULLS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {inventory.slice(0, 4).map((item, idx) => (
                <div key={idx} className="border border-slate-800 bg-slate-900 p-2 rounded text-center text-xs space-y-1">
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="wordmark font-bold text-[11px] text-paper truncate">{item.name}</div>
                  <div className="label-tech text-[8px] text-purple-300">{item.rarity}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-2 text-[10px] text-slate-400 text-center font-sans">
          FICTIONAL GACHA MINI-GAME — FOR ENTERTAINMENT PURPOSES ONLY. NO REAL MONETARY VALUE.
        </div>
      </div>
    </CensusModal>
  );
}
