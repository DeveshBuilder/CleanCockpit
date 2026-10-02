import React from 'react';
import { 
  Sliders, 
  BrainCircuit, 
  ListOrdered, 
  ListFilter, 
  AlignLeft, 
  GitFork, 
  Network, 
  Workflow, 
  HelpCircle, 
  Search, 
  ShieldAlert, 
  Zap,
  Globe2
} from 'lucide-react';
import { playCockpitClick } from '../utils/audio';

export function ControlPanel({
  complexity,
  setComplexity,
  outputFormat,
  setOutputFormat,
  visualType,
  setVisualType,
  quizCount,
  setQuizCount,
  quizLevel,
  setQuizLevel,
  webGroundingEnabled,
  setWebGroundingEnabled,
  onGenerate,
  isProcessing,
  soundEnabled
}) {
  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-sky-500/20 shadow-xl hud-border-corner">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-sky-900/40">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 m-0 font-hud">
            <Sliders className="w-4 h-4 text-sky-400" />
            2. AI CONTROL PANEL & SYNTHESIS ENGINE
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Calibrate cognitive depth, formatting structure, visual diagrams & DGCA mock question volume
          </p>
        </div>

        {/* DGCA Web Grounding Indicator */}
        <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-950/70 border border-sky-700/40 hover:border-sky-500/60 transition-colors">
          <input
            type="checkbox"
            checked={webGroundingEnabled}
            onChange={(e) => {
              if (soundEnabled) playCockpitClick();
              setWebGroundingEnabled(e.target.checked);
            }}
            className="w-4 h-4 rounded text-sky-500 focus:ring-0 bg-slate-900 border-slate-600"
          />
          <div className="flex items-center gap-1.5 text-xs">
            <Globe2 className={`w-3.5 h-3.5 ${webGroundingEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span className={`font-semibold ${webGroundingEnabled ? 'text-emerald-300' : 'text-slate-400'}`}>
              DGCA Web Grounding (CARs & AIP)
            </span>
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {/* 1. Explanation Complexity */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 text-sky-400" />
            Explanation Complexity:
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'eli5', label: "Explain like I'm 5 (ELI5)", desc: 'Simple analogies & intuition' },
              { id: 'physics', label: '12th-Grade Physics', desc: 'Vectors, forces & kinematics' },
              { id: 'instructor', label: 'Senior DGCA Flight Instructor', desc: 'CAR references & check-ride depth' }
            ].map((option) => (
              <label
                key={option.id}
                onClick={() => {
                  if (soundEnabled && complexity !== option.id) playCockpitClick();
                  setComplexity(option.id);
                }}
                className={`flex items-start p-2.5 rounded-xl border cursor-pointer transition-all ${
                  complexity === option.id
                    ? 'bg-sky-500/15 border-sky-400 text-sky-200 shadow-sm shadow-sky-500/10'
                    : 'bg-[#09152b]/60 border-slate-800 text-slate-400 hover:bg-[#0c1d3c]/50 hover:text-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="complexity"
                  checked={complexity === option.id}
                  onChange={() => setComplexity(option.id)}
                  className="mt-0.5 mr-2 text-sky-500 focus:ring-0 bg-slate-900 border-slate-600"
                />
                <div>
                  <div className="text-xs font-semibold text-slate-200">{option.label}</div>
                  <div className="text-[10px] text-slate-400">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 2. Output Format */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <ListFilter className="w-3.5 h-3.5 text-cyan-400" />
            Output Format:
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'bullets', label: 'Bullet Points', desc: 'High-yield memory checklists', icon: ListFilter },
              { id: 'numbered', label: 'Numbered Lists', desc: 'Sequential action steps & formulae', icon: ListOrdered },
              { id: 'paragraphs', label: 'Detailed Paragraphs', desc: 'Comprehensive technical discourse', icon: AlignLeft }
            ].map((fmt) => {
              const Icon = fmt.icon;
              return (
                <label
                  key={fmt.id}
                  onClick={() => {
                    if (soundEnabled && outputFormat !== fmt.id) playCockpitClick();
                    setOutputFormat(fmt.id);
                  }}
                  className={`flex items-start p-2.5 rounded-xl border cursor-pointer transition-all ${
                    outputFormat === fmt.id
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-sm shadow-cyan-500/10'
                      : 'bg-[#09152b]/60 border-slate-800 text-slate-400 hover:bg-[#0c1d3c]/50 hover:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="outputFormat"
                    checked={outputFormat === fmt.id}
                    onChange={() => setOutputFormat(fmt.id)}
                    className="mt-0.5 mr-2 text-cyan-500 focus:ring-0 bg-slate-900 border-slate-600"
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-cyan-400" />
                      <span>{fmt.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{fmt.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 3. Visual Generation */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-amber-400" />
            Visual Diagram Architecture:
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'flowchart', label: 'Flowchart', desc: 'Decision branch logic (IF/THEN)', icon: GitFork },
              { id: 'mindmap', label: 'Mind-Map', desc: 'Hierarchical concept breakdown', icon: Network },
              { id: 'process', label: 'Process Diagram', desc: 'Linear timeline & flight phase steps', icon: Workflow }
            ].map((diag) => {
              const Icon = diag.icon;
              return (
                <label
                  key={diag.id}
                  onClick={() => {
                    if (soundEnabled && visualType !== diag.id) playCockpitClick();
                    setVisualType(diag.id);
                  }}
                  className={`flex items-start p-2.5 rounded-xl border cursor-pointer transition-all ${
                    visualType === diag.id
                      ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-sm shadow-amber-500/10'
                      : 'bg-[#09152b]/60 border-slate-800 text-slate-400 hover:bg-[#0c1d3c]/50 hover:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="visualType"
                    checked={visualType === diag.id}
                    onChange={() => setVisualType(diag.id)}
                    className="mt-0.5 mr-2 text-amber-500 focus:ring-0 bg-slate-900 border-slate-600"
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-amber-400" />
                      <span>{diag.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{diag.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 4. Quiz Settings & CTA */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                DGCA Mock Quiz Count:
              </span>
              <span className="font-mono text-emerald-400 font-bold text-sm bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/50">
                {quizCount} Questions
              </span>
            </label>

            {/* Slider and number input */}
            <input
              type="range"
              min="3"
              max="15"
              step="1"
              value={quizCount}
              onChange={(e) => {
                if (soundEnabled) playCockpitClick();
                setQuizCount(parseInt(e.target.value));
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>3 Min</span>
              <span>5 Standard</span>
              <span>10 Exam</span>
              <span>15 Marathon</span>
            </div>

            {/* License Level Filter */}
            <div className="pt-1">
              <label className="text-[11px] text-slate-400 block mb-1">Target Exam Caliber:</label>
              <select
                value={quizLevel}
                onChange={(e) => setQuizLevel(e.target.value)}
                className="w-full text-xs rounded-lg bg-[#061021] border border-sky-800/60 p-2 text-slate-200 focus:border-sky-400 outline-none"
              >
                <option value="cpl">CPL (Commercial Pilot Licence) - Standard</option>
                <option value="atpl">ATPL (Airline Transport Pilot) - Advanced</option>
                <option value="ppl">PPL / SPL (Student Pilot) - Foundational</option>
              </select>
            </div>
          </div>

          {/* Generate CTA Button */}
          <button
            onClick={() => {
              if (soundEnabled) playCockpitClick();
              onGenerate();
            }}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-sm font-hud tracking-wide shadow-xl shadow-sky-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>SYNTHESIZE DGCA STUDY PACKAGE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
