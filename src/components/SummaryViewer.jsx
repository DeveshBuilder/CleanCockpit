import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Bookmark,
  Share2
} from 'lucide-react';
import { speakText, stopSpeaking, playCockpitClick } from '../utils/audio';

export function SummaryViewer({ 
  summaryText, 
  carReferences = [], 
  complexity, 
  outputFormat, 
  onDownloadPdf,
  soundEnabled 
}) {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = () => {
    if (soundEnabled) playCockpitClick();
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeak = () => {
    if (soundEnabled) playCockpitClick();
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(summaryText.replace(/[*_#`]/g, ''), () => {
        setIsPlayingAudio(false);
      });
    }
  };

  // Sanitize any broken LaTeX or math formatting to clean unicode aviation notation
  const cleanAviationText = (text) => {
    if (!text) return '';
    return text
      // Replace broken LaTeX expressions
      .replace(/\$\\ge\s*([^\$]+)\$/g, '≥ $1')
      .replace(/\$\\le\s*([^\$]+)\$/g, '≤ $1')
      .replace(/\$ge\s*([^\$]+)\$/g, '≥ $1')
      .replace(/\$le\s*([^\$]+)\$/g, '≤ $1')
      .replace(/\\ge\b/g, '≥')
      .replace(/\\le\b/g, '≤')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/ext\{([^}]+)\}/g, '$1')
      .replace(/\\circ\b/g, '°')
      .replace(/\^\circ/g, '°')
      .replace(/\\approx\b/g, '≈')
      .replace(/\\times\b/g, '×')
      .replace(/\\cdot\b/g, '·')
      .replace(/\\pm\b/g, '±')
      .replace(/\\Delta\b/g, 'Δ')
      .replace(/\\alpha\b/g, 'α')
      .replace(/\\beta\b/g, 'β')
      .replace(/\\theta\b/g, 'θ')
      .replace(/\\tau\b/g, 'τ')
      .replace(/\\rho\b/g, 'ρ')
      .replace(/\\omega\b/g, 'ω')
      .replace(/\\phi\b/g, 'φ')
      .replace(/\\eta\b/g, 'η')
      .replace(/\\pi\b/g, 'π')
      .replace(/\\quad/g, '  ')
      .replace(/\$\$/g, '')
      .replace(/\$/g, '');
  };

  // Comprehensive Markdown parser for flight dossiers
  const formatMarkdown = (content) => {
    const lines = content.split('\n');
    return lines.map((rawLine, idx) => {
      const line = cleanAviationText(rawLine);

      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-base sm:text-lg font-bold text-sky-300 mt-6 mb-3 font-hud flex items-center gap-2 border-b border-sky-900/40 pb-1.5">
            <span className="w-1.5 h-4 bg-sky-400 rounded-sm inline-block"></span>
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-white mt-6 mb-3 font-hud border-b border-sky-800/50 pb-2">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-sky-400 mt-6 mb-3 font-hud">
            {line.replace('# ', '')}
          </h2>
        );
      }

      // Blockquotes / Warnings
      if (line.trim().startsWith('> ')) {
        const quoteContent = line.trim().replace(/^>\s*/, '');
        return (
          <div key={idx} className="my-3 p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 text-sm leading-relaxed font-mono">
            {quoteContent}
          </div>
        );
      }

      // Math equation lines
      if (line.trim().startsWith('$$') || (line.includes('=') && (line.includes('TE') || line.includes('CA') || line.includes('Thrust') || line.includes('VMC') || line.includes('Tau')))) {
        return (
          <div key={idx} className="my-2.5 px-4 py-2 rounded-lg bg-[#061327] border border-sky-600/30 text-sky-200 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
            {line.replace(/\$\$/g, '')}
          </div>
        );
      }

      // Format bold text and aviation terminology
      const parseBolds = (str) => {
        const parts = str.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
              <strong key={pIdx} className="text-sky-300 font-semibold bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-700/40">
                {inner}
              </strong>
            );
          }
          return part;
        });
      };

      // Nested sub-bullets
      if (/^\s{2,}[-*]\s+/.test(line)) {
        const clean = line.replace(/^\s+[-*]\s+/, '');
        return (
          <li key={idx} className="ml-8 list-circle text-slate-300 text-sm leading-relaxed my-1 marker:text-sky-500">
            {parseBolds(clean)}
          </li>
        );
      }

      // Main bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ')) {
        const clean = line.trim().replace(/^[-*•]\s+/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200 text-sm leading-relaxed my-1.5 marker:text-sky-400">
            {parseBolds(clean)}
          </li>
        );
      }

      // Numbered items
      if (/^\d+\.\s+/.test(line.trim())) {
        const clean = line.trim().replace(/^\d+\.\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-3 my-2 text-sm leading-relaxed text-slate-200">
            <span className="w-5 h-5 rounded-md bg-sky-900/60 text-sky-300 font-mono text-xs flex items-center justify-center shrink-0 border border-sky-600/50 mt-0.5 font-bold">
              {line.trim().match(/^\d+/)[0]}
            </span>
            <span>{parseBolds(clean)}</span>
          </div>
        );
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-2"></div>;
      }

      // Standard paragraph
      return (
        <p key={idx} className="text-sm leading-relaxed text-slate-300 my-2 font-sans">
          {parseBolds(line)}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      {summaryText && summaryText.trim() && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-sky-900/40">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold uppercase tracking-wider font-mono">
              {complexity === 'eli5' ? 'ELI5 Level' : complexity === 'physics' ? '12th-Physics Level' : 'DGCA Instructor Caliber'}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              Format: {outputFormat}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Read Aloud Audio */}
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isPlayingAudio 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 animate-pulse' 
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Read summary aloud in pilot ATC cadence"
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
              <span>{isPlayingAudio ? 'Stop Reading' : 'Audio Briefing'}</span>
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
              title="Copy notes to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Notes'}</span>
            </button>

            {/* Download PDF */}
            <button
              onClick={() => {
                if (soundEnabled) playCockpitClick();
                onDownloadPdf();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-md shadow-sky-600/20"
              title="Download formatted DGCA pilot dossier PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div 
        id="dgca-study-summary-content"
        className="glass-panel p-6 sm:p-8 rounded-2xl border border-sky-500/20 text-slate-100 shadow-xl"
      >
        {summaryText && summaryText.trim() ? (
          formatMarkdown(summaryText)
        ) : (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <h4 className="text-base font-bold text-white font-hud tracking-wide m-0">
              READY FOR AI SYNTHESIS
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto m-0">
              Click <strong className="text-sky-300 font-hud">"SYNTHESIZE DGCA STUDY PACKAGE"</strong> in the control panel above to generate your customized study summary, diagrams, and mock quiz.
            </p>
          </div>
        )}
      </div>

      {/* Official DGCA CARs & AIP Grounding References Box */}
      {summaryText && summaryText.trim() && carReferences && carReferences.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#071329] to-[#0c1d3c] border border-emerald-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono m-0">
              DGCA Grounding & Regulatory Citations (CARs & AIP India)
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {carReferences.map((ref, idx) => (
              <div 
                key={idx}
                className="flex items-start justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
              >
                <div>
                  <div className="font-semibold text-sky-300 font-mono">{ref.code}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{ref.title}</div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 shrink-0 ml-2">
                  Verified CAR
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
