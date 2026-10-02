import React, { useState } from 'react';
import { Download, X, Printer, ShieldCheck, Check, Plane } from 'lucide-react';
import { playCockpitClick } from '../utils/audio';

export function PdfExportModal({ 
  isOpen, 
  onClose, 
  title, 
  summaryText, 
  carReferences = [], 
  quizzes = [], 
  complexity, 
  soundEnabled 
}) {
  const [candidateName, setCandidateName] = useState('Capt. Pilot Trainee');
  const [candidateRoll, setCandidateRoll] = useState('DGCA-CPL-2026-IND');

  if (!isOpen) return null;

  const handlePrint = () => {
    if (soundEnabled) playCockpitClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0b172d] border border-sky-500/40 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-sky-900/60 bg-[#060e1d]">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white font-hud tracking-wide m-0">
              OFFLINE DGCA STUDY DOSSIER EXPORT
            </h3>
          </div>
          <button
            onClick={() => {
              if (soundEnabled) playCockpitClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Configuration Strip */}
        <div className="p-4 bg-sky-950/30 border-b border-sky-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div>
              <label className="text-slate-400 block text-[10px]">Candidate Name:</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-slate-400 block text-[10px]">DGCA Computer No / Roll:</label>
              <input
                type="text"
                value={candidateRoll}
                onChange={(e) => setCandidateRoll(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-sky-600/30"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Preview Area (Formatted printable document) */}
        <div className="p-6 overflow-y-auto space-y-6 bg-slate-950 font-sans text-slate-200" id="printable-dossier">
          {/* Document Header */}
          <div className="border-b-2 border-sky-500 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-sky-400 font-mono tracking-widest">
                DIRECTORATE GENERAL OF CIVIL AVIATION (DGCA) INDIA
              </div>
              <h1 className="text-2xl font-bold text-white mt-1 m-0">
                {title || 'DGCA Pilot Study Briefing'}
              </h1>
              <p className="text-xs text-slate-400 mt-1 m-0">
                Ground School Knowledge Package • Caliber: {complexity.toUpperCase()}
              </p>
            </div>
            <div className="text-right text-xs font-mono text-slate-400">
              <div>Candidate: <strong className="text-slate-200">{candidateName}</strong></div>
              <div>Roll: <strong className="text-slate-200">{candidateRoll}</strong></div>
              <div>Date: {new Date().toLocaleDateString('en-IN')}</div>
              <div className="text-emerald-400 mt-1 font-semibold">✓ CAR & AIP Grounded</div>
            </div>
          </div>

          {/* Notes Content */}
          <div className="space-y-3 text-sm leading-relaxed">
            <h3 className="text-base font-bold text-sky-300 font-mono border-b border-slate-800 pb-1">
              1. Aeronautical Knowledge Synthesis & Flight Rules
            </h3>
            <div className="whitespace-pre-wrap bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-slate-300">
              {summaryText}
            </div>
          </div>

          {/* Regulatory Backing */}
          {carReferences.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-base font-bold text-sky-300 font-mono border-b border-slate-800 pb-1">
                2. Applicable DGCA CARs & Statutory References
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {carReferences.map((ref, i) => (
                  <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800">
                    <div className="font-bold text-sky-400 font-mono">{ref.code}</div>
                    <div className="text-slate-400 text-[11px]">{ref.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mock Questions & Answer Key */}
          {quizzes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-sky-300 font-mono border-b border-slate-800 pb-1">
                3. DGCA Pariksha Exam Practice Questions & Solutions
              </h3>
              <div className="space-y-4">
                {quizzes.map((q, idx) => (
                  <div key={q.id} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 text-xs space-y-2">
                    <p className="font-semibold text-slate-200 m-0">
                      Q{idx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 pl-2 text-slate-400">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className={oIdx === q.correctIndex ? 'text-emerald-400 font-semibold' : ''}>
                          {String.fromCharCode(65 + oIdx)}. {opt} {oIdx === q.correctIndex ? '✓ [Correct]' : ''}
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-950 p-2 rounded text-[11px] text-sky-300 border border-slate-800">
                      <strong>Instructor Note:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 text-center font-mono">
            AeroGround DGCA • Generated for Indian Aspiring Pilots • Strictly for Examination & Ground School Training
          </div>
        </div>
      </div>
    </div>
  );
}
