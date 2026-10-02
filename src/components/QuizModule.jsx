import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Flag, 
  Clock, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  FileText
} from 'lucide-react';
import { playCockpitClick, playChimeSuccess, playAlertTone } from '../utils/audio';

export function QuizModule({ 
  quizzes = [], 
  quizCount = 5, 
  quizLevel = 'cpl',
  soundEnabled 
}) {
  // Truncate or match quiz count
  const activeQuestions = quizzes.slice(0, quizCount);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [examMode, setExamMode] = useState(false); // instant feedback vs timed exam
  const [examFinished, setExamFinished] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // all, incorrect, flagged

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (qId, optionIdx) => {
    if (submittedAnswers[qId] && !examMode) return; // already locked in instant mode
    if (soundEnabled) playCockpitClick();
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuestion = (qId) => {
    const isCorrect = selectedAnswers[qId] === currentQ.correctIndex;
    if (soundEnabled) {
      if (isCorrect) playChimeSuccess();
      else playAlertTone();
    }
    setSubmittedAnswers(prev => ({ ...prev, [qId]: true }));
  };

  const handleToggleFlag = (qId) => {
    if (soundEnabled) playCockpitClick();
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleFinishExam = () => {
    // Lock all answers
    const allSubmitted = {};
    activeQuestions.forEach(q => {
      allSubmitted[q.id] = true;
    });
    setSubmittedAnswers(allSubmitted);
    setExamFinished(true);

    // Compute score
    const correctCount = activeQuestions.filter(q => selectedAnswers[q.id] === q.correctIndex).length;
    const percentage = Math.round((correctCount / activeQuestions.length) * 100);

    if (percentage >= 70) {
      if (soundEnabled) playChimeSuccess();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      if (soundEnabled) playAlertTone();
    }
  };

  const handleReset = () => {
    if (soundEnabled) playCockpitClick();
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setFlaggedQuestions({});
    setExamFinished(false);
    setCurrentIndex(0);
  };

  // Score statistics
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = activeQuestions.filter(q => selectedAnswers[q.id] === q.correctIndex).length;
  const scorePercent = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;
  const isPassed = scorePercent >= 70;

  if (activeQuestions.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center border border-sky-500/20">
        <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white">No Mock Questions Generated</h3>
        <p className="text-xs text-slate-400 mt-1">
          Adjust the question count in the AI Control Panel and click "Synthesize DGCA Study Package".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner / Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-sky-900/40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-hud font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            DGCA PARIKSHA SIMULATOR
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-mono border border-sky-800/40 uppercase">
            {quizLevel.toUpperCase()} Syllabus
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 font-mono border border-emerald-800/40">
            Pass Threshold: 70%
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => {
                if (soundEnabled) playCockpitClick();
                setExamMode(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                !examMode ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Study Mode (Instant)
            </button>
            <button
              onClick={() => {
                if (soundEnabled) playCockpitClick();
                setExamMode(true);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                examMode ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Timed Exam Mode
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Question Stepper / Status Grid */}
      <div className="glass-panel p-4 rounded-xl border border-sky-900/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {activeQuestions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isSubmitted = submittedAnswers[q.id];
            const isCorrect = selectedAnswers[q.id] === q.correctIndex;
            const isFlagged = flaggedQuestions[q.id];

            let badgeClass = 'bg-slate-800/80 text-slate-400 border-slate-700';
            if (isSubmitted) {
              badgeClass = isCorrect 
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500' 
                : 'bg-rose-600/30 text-rose-300 border-rose-500';
            } else if (isAnswered) {
              badgeClass = 'bg-sky-600/30 text-sky-200 border-sky-400';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  if (soundEnabled) playCockpitClick();
                  setCurrentIndex(idx);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center relative transition-all border ${badgeClass} ${
                  isCurrent ? 'ring-2 ring-sky-400 scale-105' : 'hover:border-slate-500'
                }`}
              >
                {idx + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Score Ticker */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="text-slate-300">
            Progress: <span className="text-sky-400 font-bold">{answeredCount}/{activeQuestions.length}</span>
          </div>
          {Object.keys(submittedAnswers).length > 0 && (
            <div className="text-slate-300">
              Score: <span className={scorePercent >= 70 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {correctCount}/{activeQuestions.length} ({scorePercent}%)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sky-500/20 shadow-xl space-y-6">
          {/* Question Title Bar */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/40 flex items-center justify-center font-mono font-bold text-sm shrink-0">
                Q{currentIndex + 1}
              </span>
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                DGCA Question ID: IND-{currentQ.id.toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => handleToggleFlag(currentQ.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                flaggedQuestions[currentQ.id]
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag Question'}</span>
            </button>
          </div>

          {/* Question Stem */}
          <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-snug">
            {currentQ.question}
          </h3>

          {/* 4 Choices */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const isSubmitted = submittedAnswers[currentQ.id];
              const isCorrectOpt = optIdx === currentQ.correctIndex;

              let optClass = 'bg-[#09152b]/60 border-slate-800 text-slate-300 hover:bg-[#0c1d3c]/50 hover:border-slate-700';

              if (isSubmitted) {
                if (isCorrectOpt) {
                  optClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrectOpt) {
                  optClass = 'bg-rose-950/60 border-rose-500 text-rose-100 ring-1 ring-rose-500';
                }
              } else if (isSelected) {
                optClass = 'bg-sky-500/20 border-sky-400 text-sky-100 shadow-md shadow-sky-500/10';
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${optClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800/80 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300 shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm font-medium">{option}</span>
                  </div>

                  {isSubmitted && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box when submitted */}
          {submittedAnswers[currentQ.id] && (
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#071329] to-[#0c1e3d] border border-sky-500/30 text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-sky-300 font-bold uppercase tracking-wider font-mono">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>DGCA Flight Instructor Official Explanation:</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans text-sm m-0">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Bottom Card Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-sky-900/40">
            <button
              onClick={() => {
                if (soundEnabled) playCockpitClick();
                setCurrentIndex(prev => Math.max(prev - 1, 0));
              }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Submit Question or Submit Full Exam */}
            {!examMode && !submittedAnswers[currentQ.id] && (
              <button
                onClick={() => handleSubmitQuestion(currentQ.id)}
                disabled={selectedAnswers[currentQ.id] === undefined}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold font-hud tracking-wide shadow-md shadow-sky-600/30 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                CONFIRM ANSWER
              </button>
            )}

            {examMode && currentIndex === activeQuestions.length - 1 && !examFinished && (
              <button
                onClick={handleFinishExam}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-hud tracking-wide shadow-md shadow-emerald-600/30 transition-all"
              >
                SUBMIT FULL EXAM
              </button>
            )}

            <button
              onClick={() => {
                if (soundEnabled) playCockpitClick();
                setCurrentIndex(prev => Math.min(prev + 1, activeQuestions.length - 1));
              }}
              disabled={currentIndex === activeQuestions.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* DGCA Exam Scorecard Modal/Summary */}
      {(examFinished || Object.keys(submittedAnswers).length === activeQuestions.length) && (
        <div className="glass-panel-elevated p-6 sm:p-8 rounded-2xl border border-sky-400/30 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-slate-900 border-2 border-sky-400 shadow-lg">
            <Award className={`w-8 h-8 ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`} />
          </div>

          <h3 className="text-xl font-bold text-white font-hud tracking-wide m-0">
            {isPassed ? 'DGCA PARIKSHA PASS GRADE ACHIEVED! 🎉' : 'EXAMINATION RESULT: RETEST REQUIRED'}
          </h3>
          <p className="text-xs text-slate-300 m-0">
            DGCA India passing threshold is 70%. Your score: <strong className={isPassed ? 'text-emerald-400' : 'text-rose-400'}>{scorePercent}%</strong> ({correctCount} of {activeQuestions.length} questions correct).
          </p>

          <div className="inline-flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 font-mono text-xs">
            <span className="text-emerald-400">Correct: {correctCount}</span>
            <span className="text-slate-600">|</span>
            <span className="text-rose-400">Incorrect: {activeQuestions.length - correctCount}</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400">Flagged: {Object.values(flaggedQuestions).filter(Boolean).length}</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs font-hud transition-colors shadow-lg shadow-sky-600/20"
            >
              RETAKE DGCA MOCK EXAM
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
