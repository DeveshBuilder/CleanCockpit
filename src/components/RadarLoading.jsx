import React, { useState, useEffect } from 'react';
import { Radio, Compass, Plane, ShieldCheck, Search, Sparkles } from 'lucide-react';

export function RadarLoading({ currentStage = 0 }) {
  const stages = [
    { text: "Parsing ingested flight notes & extracting aeronautical terms...", icon: Compass },
    { text: "Querying DGCA CAR Section 8 & eAIP India database...", icon: Search },
    { text: "Synthesizing regulatory explanations & high-yield mnemonics...", icon: Sparkles },
    { text: "Compiling interactive Mermaid.js airspace logic diagram...", icon: Radio },
    { text: "Calibrating DGCA Pariksha-style MCQs with authentic distractors...", icon: ShieldCheck }
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <div className="glass-panel-elevated rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-sky-400/30 shadow-2xl relative overflow-hidden my-8">
      {/* Decorative Radar Sweep Display */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 flex items-center justify-center">
        {/* Radar Outer Circles */}
        <div className="absolute inset-0 rounded-full border-2 border-sky-500/20 shadow-inner"></div>
        <div className="absolute inset-4 rounded-full border border-sky-500/30"></div>
        <div className="absolute inset-10 rounded-full border border-sky-500/40"></div>
        <div className="absolute inset-16 rounded-full border border-sky-500/20"></div>

        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-sky-500/30"></div>
        <div className="absolute h-full w-[1px] bg-sky-500/30"></div>

        {/* Rotating Radar Sweep Cone */}
        <div className="absolute inset-0 rounded-full overflow-hidden animate-radar pointer-events-none">
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-sky-400/40 via-sky-500/10 to-transparent origin-bottom-right"></div>
        </div>

        {/* Spinning Propeller at Center */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-sky-950 via-[#071329] to-sky-900 border-2 border-sky-400/80 flex items-center justify-center shadow-lg shadow-sky-500/30">
          <Plane className="w-8 h-8 text-sky-300 transform -rotate-45 animate-pulse" />
          {/* Twin-blade propeller overlay */}
          <div className="absolute w-20 h-1 bg-amber-400/80 rounded-full animate-propeller"></div>
        </div>

        {/* Simulated Blips */}
        <div className="absolute top-10 right-12 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
        <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: '0.6s' }}></div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white font-hud tracking-wide m-0">
        AI GROUND SCHOOL ENGINE SYNTHESIZING...
      </h3>
      <p className="text-xs sm:text-sm text-sky-300/80 mt-1 max-w-md mx-auto m-0">
        Synthesizing uploaded study material with official Indian DGCA CARs, AIP India rules & IMD meteorological standards.
      </p>

      {/* Progress Steps Log */}
      <div className="mt-6 space-y-2 max-w-md mx-auto text-left">
        {stages.map((stg, idx) => {
          const Icon = stg.icon;
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2 rounded-lg text-xs transition-all ${
                isCurrent
                  ? 'bg-sky-500/20 border border-sky-400/40 text-sky-200 font-semibold shadow-sm'
                  : isDone
                  ? 'text-emerald-300 opacity-80'
                  : 'text-slate-500 opacity-40'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-mono ${
                isDone ? 'bg-emerald-500/20 text-emerald-400' : isCurrent ? 'bg-sky-500 text-[#070e1b] animate-bounce' : 'bg-slate-800 text-slate-500'
              }`}>
                {isDone ? '✓' : idx + 1}
              </div>
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{stg.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
