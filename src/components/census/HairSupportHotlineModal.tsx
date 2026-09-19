import { useState, useEffect } from "react";
import { CensusModal } from "./CensusModal";
import { Phone, PhoneOff, MicOff, Volume2, Music, MessageSquare, Sparkles, User, ShieldAlert } from "lucide-react";

interface HairSupportHotlineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  censusNumber?: string;
}

export function HairSupportHotlineModal({
  open,
  onOpenChange,
  censusNumber = "MU-884920",
}: HairSupportHotlineModalProps) {
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeResponse, setActiveResponse] = useState<string[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOnHold, setIsOnHold] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Call timer effect when modal is active
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      setCallDuration(0);
      setActiveResponse(null);
      setSelectedOption(null);
      setIsOnHold(false);
      setIsMuted(false);
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [open]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const supportOptions = [
    {
      id: 1,
      label: "1. My hair count is suspicious.",
      responses: [
        "Thank you for calling. Our computer vision algorithms are certified by the National Hair Census Authority.",
        "If you believe your hair count was inflated by static electricity, please gently smooth down your scalp and re-verify.",
        "Case file logged: #MU-SUPP-9921. No further action required.",
      ],
    },
    {
      id: 2,
      label: "2. My hair is behaving strangely.",
      responses: [
        "Our Senior Follicle Specialist has been notified.",
        "Please check for sudden humidity spikes, rogue hair gel, or localized wind tunnels.",
        "Do not panic. Strange hair behavior is 94% linked to uncombable morning momentum.",
      ],
    },
    {
      id: 3,
      label: "3. My hair is too powerful.",
      responses: [
        "Sir/Madam, please remain calm.",
        "Have you tried a comb?",
        "Please do not attempt to fight your hair.",
        "If your hair attempts to declare independence, contact municipal authorities immediately.",
      ],
    },
    {
      id: 4,
      label: "4. I just wanted to hear someone say hello.",
      responses: [
        "Hello! The National Hair Census Authority appreciates your dedication to scalp census integrity.",
        "You are doing great. Your hair is looking statistically magnificent today.",
        "Have a wonderful and voluminous afternoon!",
      ],
    },
  ];

  const handleSelectOption = (optionId: number) => {
    const target = supportOptions.find((o) => o.id === optionId);
    if (!target) return;

    setSelectedOption(optionId);
    setIsTyping(true);
    setActiveResponse(null);

    setTimeout(() => {
      setIsTyping(false);
      setActiveResponse(target.responses);
    }, 1200);
  };

  return (
    <CensusModal
      open={open}
      onOpenChange={onOpenChange}
      title="HAIR SUPPORT HOTLINE"
      meta={`HOTLINE OPERATOR · REF ${censusNumber}`}
    >
      <div className="space-y-5 font-mono text-left">
        {/* Support Call Top Status Bar */}
        <div className="border-2 border-emerald-500/40 bg-slate-950 p-4 rounded text-paper flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-400 flex items-center justify-center shrink-0 animate-pulse">
              <Phone className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="wordmark font-black text-emerald-400 text-sm">
                MUDI UNDO SUPPORT
              </div>
              <div className="label-tech text-[10px] text-slate-400">
                NATIONAL HAIR CENSUS AUTHORITY
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="label-tech border border-emerald-400/50 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 font-bold">
              CALL IN PROGRESS • {formatTimer(callDuration)}
            </span>
          </div>
        </div>

        {/* Animated Hold Music Bar */}
        {isOnHold && (
          <div className="border border-amber-500/40 bg-amber-950/40 p-3 rounded text-amber-200 text-xs flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-amber-400 animate-spin" />
              <span>[Hold Music Playing: 'Smooth Scalp Serenade']</span>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-amber-400 animate-[bounce_1s_infinite_0.1s]" />
              <div className="w-1 h-4 bg-amber-400 animate-[bounce_1s_infinite_0.3s]" />
              <div className="w-1 h-4 bg-amber-400 animate-[bounce_1s_infinite_0.5s]" />
            </div>
          </div>
        )}

        {/* Chat / Response Terminal Box */}
        <div className="border border-slate-800 bg-slate-900/90 p-4 rounded min-h-[160px] space-y-3 relative shadow-inner text-xs">
          {/* Agent Initial Message */}
          <div className="flex items-start gap-2 text-sky-300">
            <div className="w-6 h-6 rounded-full bg-sky-950 border border-sky-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
              🎧
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 max-w-[85%]">
              "Hello. Thank you for contacting the National Hair Census Authority. How may we direct your follicular query today?"
            </div>
          </div>

          {/* User Selected Query */}
          {selectedOption && (
            <div className="flex justify-end text-emerald-300">
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded max-w-[85%] text-right font-bold">
                {supportOptions.find((o) => o.id === selectedOption)?.label}
              </div>
            </div>
          )}

          {/* Typing Indicator Animation */}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 animate-pulse pt-2">
              <MessageSquare className="h-4 w-4 text-emerald-400 animate-bounce" />
              <span className="italic text-[11px]">Operator is consulting scalp manual...</span>
            </div>
          )}

          {/* Operator Reply Messages */}
          {activeResponse && !isTyping && (
            <div className="space-y-2 pt-1 animate-rise">
              {activeResponse.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2 text-emerald-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    🎧
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-emerald-500/30 max-w-[85%] font-sans text-slate-100">
                    "{line}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options Menu Grid */}
        <div className="space-y-2">
          <div className="label-tech text-xs text-slate-400 font-bold">
            SELECT SUPPORT TOPIC:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {supportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isTyping}
                className={`p-3 text-left border rounded text-xs transition-all cursor-pointer ${
                  selectedOption === option.id
                    ? "border-emerald-400 bg-emerald-950 text-emerald-200 font-bold"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-emerald-500 hover:bg-slate-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Call Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3">
          <div className="flex gap-2">
            <button
              onClick={() => setIsOnHold(!isOnHold)}
              className={`label-tech flex items-center gap-1.5 px-3 py-1.5 border text-xs cursor-pointer rounded ${
                isOnHold
                  ? "border-amber-500 bg-amber-950 text-amber-300 font-bold"
                  : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Music className="h-3.5 w-3.5" />
              <span>{isOnHold ? "RESUME CALL" : "HOLD MUSIC"}</span>
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`label-tech flex items-center gap-1.5 px-3 py-1.5 border text-xs cursor-pointer rounded ${
                isMuted
                  ? "border-rose-500 bg-rose-950 text-rose-300 font-bold"
                  : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <MicOff className="h-3.5 w-3.5" />
              <span>{isMuted ? "UNMUTE" : "MUTE"}</span>
            </button>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="label-tech flex items-center gap-1.5 border border-rose-600 bg-rose-600 hover:bg-rose-500 text-paper font-black px-4 py-1.5 text-xs cursor-pointer rounded shadow"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            <span>END CALL</span>
          </button>
        </div>

        {/* Parody Disclaimer */}
        <div className="border-t border-slate-800 pt-2 text-[10px] text-slate-400 text-center font-sans">
          PARODY SUPPORT HOTLINE — NO REAL PHONE CALL OCCURS. FOR ENTERTAINMENT ONLY.
        </div>
      </div>
    </CensusModal>
  );
}
