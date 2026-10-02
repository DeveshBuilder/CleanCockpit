import React, { useState } from 'react';
import { 
  Plane, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Compass, 
  BookOpen, 
  CloudLightning, 
  Cpu, 
  Scale, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { playCockpitClick } from '../utils/audio';

export function Header({ 
  soundEnabled, 
  setSoundEnabled, 
  currentSubject, 
  onSelectSubject, 
  subjects 
}) {
  const [firDropdownOpen, setFirDropdownOpen] = useState(false);

  const firs = [
    { code: 'VIDP', name: 'Delhi FIR', met: 'CAT I Active / 18°C', qnh: '1014 hPa' },
    { code: 'VABB', name: 'Mumbai FIR', met: 'VMC CAVOK / 29°C', qnh: '1011 hPa' },
    { code: 'VECC', name: 'Kolkata FIR', met: 'Scattered 3000 / 26°C', qnh: '1013 hPa' },
    { code: 'VOMM', name: 'Chennai FIR', met: 'Light Wind / 31°C', qnh: '1010 hPa' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-sky-500/20 shadow-lg shadow-sky-950/30">
      {/* Top Cockpit Telemetry Strip */}
      <div className="bg-[#050b16] border-b border-sky-950/60 px-4 py-1 text-[11px] text-sky-400 flex flex-wrap items-center justify-between font-mono-code">
        <div className="flex items-center space-x-4 overflow-x-auto py-0.5">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            DGCA CAR GROUNDED: SECTION 2, 7 & 8
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:flex items-center gap-1 text-sky-300">
            <Radio className="w-3 h-3 text-sky-400" />
            INDIAN AIP AMDT 02/2026 SYNCED
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-slate-400">
            GAGAN SBAS: GSAT-8 (PRN 127) LOCKED
          </span>
        </div>

        <div className="flex items-center space-x-3 ml-auto">
          {/* FIR Status Pill */}
          <div className="relative">
            <button 
              onClick={() => {
                if (soundEnabled) playCockpitClick();
                setFirDropdownOpen(!firDropdownOpen);
              }}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950/70 hover:bg-sky-900/60 text-sky-300 border border-sky-800/40 text-[10px] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>4 Indian FIRs Nominal</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {firDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 glass-panel-elevated p-2 rounded-lg text-xs z-50 shadow-2xl border border-sky-500/30">
                <div className="font-semibold text-sky-300 border-b border-sky-800/50 pb-1 mb-1.5 flex items-center justify-between">
                  <span>Indian FIR Operations</span>
                  <span className="text-[10px] text-slate-400">UTC+05:30</span>
                </div>
                {firs.map(f => (
                  <div key={f.code} className="py-1 px-1.5 rounded hover:bg-sky-900/40 flex justify-between items-center text-[11px]">
                    <div>
                      <span className="font-bold text-sky-200">{f.code}</span> <span className="text-slate-400">({f.name})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-mono">{f.qnh}</div>
                      <div className="text-[9px] text-slate-400">{f.met}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cockpit Audio Toggle */}
          <button 
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playCockpitClick();
            }}
            title={soundEnabled ? "Mute Cockpit Audio" : "Enable Cockpit Audio"}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/50 text-[10px] transition-colors"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">AV-AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-slate-500" />
                <span className="text-slate-500">AUDIO OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="relative group cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-[#09152b] rounded-[10px] flex items-center justify-center">
                  <Plane className="w-6 h-6 text-sky-400 transform -rotate-45 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-amber-500 text-[#070e1b] font-bold text-[9px] rounded font-hud tracking-widest">
                DGCA
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-hud flex items-center gap-1.5 m-0">
                  <span>AERO<span className="text-sky-400">GROUND</span></span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 font-sans font-medium">
                    AI Ground School
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 m-0">
                DGCA India Pilot Examination Assistant • CPL / ATPL / PPL
              </p>
            </div>
          </div>

          {/* Quick Subject Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {subjects.map(subj => {
              const isActive = currentSubject === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => {
                    if (soundEnabled) playCockpitClick();
                    onSelectSubject(subj.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-200 border-sky-400/50 shadow-sm shadow-sky-500/20'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  {subj.id === 'air_regs' && <Scale className="w-3.5 h-3.5 text-sky-400" />}
                  {subj.id === 'met' && <CloudLightning className="w-3.5 h-3.5 text-cyan-400" />}
                  {subj.id === 'nav' && <Compass className="w-3.5 h-3.5 text-amber-400" />}
                  {subj.id === 'tech_gen' && <Cpu className="w-3.5 h-3.5 text-emerald-400" />}
                  {subj.id === 'rtr' && <Radio className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{subj.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
