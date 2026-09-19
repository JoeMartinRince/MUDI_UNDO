import { useState, useEffect, useRef } from "react";
import { Swords, ShieldAlert, Sparkles, RefreshCw, Trophy, Flame, Zap } from "lucide-react";

interface HairBossBattleCardProps {
  hairPopulation: number;
}

export function HairBossBattleCard({ hairPopulation }: HairBossBattleCardProps) {
  const maxBossHp = 100000;
  const [bossHp, setBossHp] = useState<number>(maxBossHp);
  const [armyHp, setArmyHp] = useState<number>(hairPopulation);
  const [battleState, setBattleState] = useState<"IDLE" | "FIGHTING" | "PHASE_2" | "VICTORY">("IDLE");
  const [currentMessage, setCurrentMessage] = useState<string>("READY TO ENGAGE THE BALDNESS BOSS");
  const [floatingDamage, setFloatingDamage] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [screenShake, setScreenShake] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const battleMessages = [
    "HAIR ARMY ATTACK!",
    "COMB COMBO!",
    "FOLLICLE STRIKE!",
    "SHAMPOO SHACKLE!",
    "BEDHEAD BARRAGE!",
    "CONDITIONER COUNTER-ATTACK!",
  ];

  // Efficient HTML5 Canvas Particle Engine for Flying Hair Army Projectiles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 200;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn ambient particles when fighting
      if (battleState === "FIGHTING" || battleState === "PHASE_2") {
        if (Math.random() < 0.4) {
          particles.push({
            x: 40 + Math.random() * 60,
            y: 80 + Math.random() * 40,
            vx: 8 + Math.random() * 8,
            vy: (Math.random() - 0.5) * 4,
            size: 2 + Math.random() * 3,
            color: Math.random() > 0.5 ? "#38bdf8" : "#f43f5e",
            life: 1,
          });
        }
      }

      // Render & update particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Hit explosion effect near boss position (around 75% width)
        if (p.x > canvas.width * 0.7) {
          p.life = 0;
        }
      });

      particles = particles.filter((p) => p.life > 0);
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [battleState]);

  // Trigger floating damage text animation
  const triggerHitEffect = (dmgText: string) => {
    const newHit = {
      id: Date.now() + Math.random(),
      text: dmgText,
      x: 65 + (Math.random() * 20 - 10),
      y: 30 + (Math.random() * 20 - 10),
    };
    setFloatingDamage((prev) => [...prev.slice(-4), newHit]);
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 200);
  };

  const handleAttack = () => {
    if (battleState === "IDLE") {
      setBattleState("FIGHTING");
    }

    const damage = Math.floor(12000 + Math.random() * 18000);
    const msg = battleMessages[Math.floor(Math.random() * battleMessages.length)];
    setCurrentMessage(msg);

    setBossHp((prev) => {
      const nextHp = Math.max(0, prev - damage);
      triggerHitEffect(`-${damage.toLocaleString()} HP!`);

      if (nextHp <= 50000 && nextHp > 0 && battleState !== "PHASE_2") {
        setBattleState("PHASE_2");
        setCurrentMessage("⚠️ WARNING: BALDNESS HAS ENTERED PHASE 2!");
      } else if (nextHp === 0) {
        setBattleState("VICTORY");
        setCurrentMessage("🏆 HAIR HAS WON! THE BALDNESS BOSS WAS DEFEATED!");
      }

      return nextHp;
    });
  };

  const resetBattle = () => {
    setBossHp(maxBossHp);
    setArmyHp(hairPopulation);
    setBattleState("IDLE");
    setCurrentMessage("READY TO ENGAGE THE BALDNESS BOSS");
    setFloatingDamage([]);
  };

  return (
    <div
      className={`border-2 border-border bg-paper text-left overflow-hidden shadow-sm font-mono relative transition-transform ${
        screenShake ? "translate-x-1 -translate-y-1" : ""
      }`}
    >
      {/* Top Header */}
      <div className="hairline-b flex flex-wrap items-center justify-between gap-2 bg-slate-950 text-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <Swords className="h-5 w-5 text-rose-500 animate-pulse" />
          <h3 className="wordmark text-2xl sm:text-3xl text-rose-500 font-black tracking-wider">
            HAIR BOSS BATTLE
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-tech border border-rose-500/50 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 uppercase">
            FICTIONAL MINI-GAME
          </span>
          <button
            onClick={resetBattle}
            className="label-tech flex items-center gap-1 border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-rose-400 hover:text-paper cursor-pointer transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>RESET BATTLE</span>
          </button>
        </div>
      </div>

      {/* Battle Arena Stage */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-rose-950 text-paper p-5 sm:p-7 space-y-6 overflow-hidden">
        {/* Particle Canvas Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Floating Damage Indicators */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {floatingDamage.map((hit) => (
            <div
              key={hit.id}
              className="absolute font-black text-rose-400 text-lg sm:text-2xl animate-rise drop-shadow-md select-none"
              style={{ left: `${hit.x}%`, top: `${hit.y}%` }}
            >
              {hit.text}
            </div>
          ))}
        </div>

        {/* Fighters Health & Stats Strip */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Player Hair Army Card */}
          <div className="border-2 border-sky-500/40 bg-slate-900/90 p-4 rounded space-y-2 backdrop-blur-sm shadow">
            <div className="flex justify-between items-center">
              <div className="label-tech text-xs text-sky-400 font-bold flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> YOUR HAIR ARMY
              </div>
              <span className="label-tech text-[10px] text-slate-400">COMMANDER</span>
            </div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-paper">
              {hairPopulation.toLocaleString()} <span className="text-xs text-sky-400 font-normal">STRANDS</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
              <div className="h-full bg-sky-400 transition-all duration-300" style={{ width: "100%" }} />
            </div>
          </div>

          {/* Boss Card */}
          <div className="border-2 border-rose-500/40 bg-slate-900/90 p-4 rounded space-y-2 backdrop-blur-sm shadow">
            <div className="flex justify-between items-center">
              <div className="label-tech text-xs text-rose-400 font-bold flex items-center gap-1">
                <Flame className="h-4 w-4" /> THE BALDNESS BOSS
              </div>
              <span className="label-tech text-[10px] text-rose-400 font-bold">
                {battleState === "PHASE_2" ? "PHASE 2 ACTIVE" : "PHASE 1"}
              </span>
            </div>
            <div className="wordmark text-2xl sm:text-3xl font-black text-rose-400">
              {bossHp > 0 ? `${bossHp.toLocaleString()} HP` : "DEFEATED!"}
            </div>
            <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${(bossHp / maxBossHp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Visual Arena Clash Visualization */}
        <div className="relative z-10 border border-slate-800 bg-slate-950/80 p-6 rounded flex items-center justify-between gap-4 text-center">
          {/* Hair Army Side */}
          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl animate-bounce">🧑‍🦱</div>
            <div className="wordmark text-xs font-bold text-sky-300">HAIR BATTALION</div>
          </div>

          {/* Center VS & Message Banner */}
          <div className="flex-1 space-y-2">
            <div className="wordmark text-2xl sm:text-4xl font-black text-amber-400 tracking-wider">
              VS
            </div>
            <div className="border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 rounded text-xs text-amber-200 font-bold animate-pulse">
              "{currentMessage}"
            </div>
          </div>

          {/* Boss Side */}
          <div className="space-y-1">
            <div className={`text-4xl sm:text-6xl ${battleState === "PHASE_2" ? "animate-pulse scale-110" : ""}`}>
              👴⚡
            </div>
            <div className="wordmark text-xs font-bold text-rose-400">
              {battleState === "PHASE_2" ? "ENRAGED BOSS" : "BALDNESS MONARCH"}
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="relative z-10 flex flex-wrap gap-3 justify-center pt-2">
          {battleState !== "VICTORY" ? (
            <>
              <button
                onClick={handleAttack}
                className="label-tech flex items-center gap-2 border-2 border-rose-500 bg-rose-600 hover:bg-rose-500 text-paper font-black px-6 py-3 text-sm cursor-pointer shadow-lg hover:scale-105 transition-all"
              >
                <Swords className="h-4 w-4" />
                <span>FOLLICLE ATTACK!</span>
              </button>
              <button
                onClick={handleAttack}
                className="label-tech flex items-center gap-2 border border-sky-400 bg-sky-950 hover:bg-sky-900 text-sky-300 font-bold px-5 py-3 text-xs cursor-pointer transition-colors"
              >
                <Zap className="h-4 w-4" />
                <span>COMB COMBO!</span>
              </button>
            </>
          ) : (
            <div className="border-2 border-emerald-500 bg-emerald-950/60 p-4 rounded text-center space-y-2 w-full">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-xl">
                <Trophy className="h-6 w-6" /> HAIR HAS WON!
              </div>
              <p className="text-xs text-slate-300 font-sans">
                The Hair Army successfully defended the scalp territory against all odds!
              </p>
              <button
                onClick={resetBattle}
                className="label-tech border border-emerald-400 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300 hover:text-paper cursor-pointer mt-2"
              >
                REPLAY BATTLE
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Disclaimer Footer */}
      <div className="bg-slate-950 border-t border-slate-800 p-3 text-[11px] text-slate-400 flex items-center justify-between font-sans">
        <div className="flex items-center gap-2">
          <span className="label-tech text-[10px] font-bold text-rose-400 border border-rose-400/40 px-1.5 py-0.5">
            FICTIONAL MINI-GAME
          </span>
          <span>THIS BATTLE IS ENTIRELY FICTIONAL AND DOES NOT IMPLY ANYTHING ABOUT CLINICAL HAIR HEALTH OR DIAGNOSIS.</span>
        </div>
      </div>
    </div>
  );
}
