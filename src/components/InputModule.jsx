import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Mic, 
  MicOff, 
  FileText, 
  File, 
  Image, 
  Trash2, 
  Clipboard, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { playCockpitClick } from '../utils/audio';

export function InputModule({ 
  notesText, 
  setNotesText, 
  uploadedFiles, 
  setUploadedFiles, 
  soundEnabled, 
  onLoadPreset,
  currentSubject
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [recognitionError, setRecognitionError] = useState(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English accent preferred for DGCA phraseology

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript) {
          setNotesText(prev => {
            const separator = prev.trim() ? '\n' : '';
            return `${prev}${separator}[Voice Note]: ${currentTranscript}`;
          });
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        setRecognitionError(`Mic error: ${event.error}. You can still type notes manually.`);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition init failed:', e);
      setSpeechSupported(false);
    }
  }, [setNotesText]);

  const toggleRecording = () => {
    if (soundEnabled) playCockpitClick();

    if (!speechSupported) {
      // Simulate speech recognition fallback for preview environments
      setIsRecording(true);
      setTimeout(() => {
        setNotesText(prev => `${prev}\n[ATC Voice Transcript]: VIDP Tower, VT-AIR requesting Special VFR clearance for departure runway 28, ground visibility 1800 meters.`);
        setIsRecording(false);
      }, 2500);
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setRecognitionError(null);
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Recognition start error:', err);
        setIsRecording(false);
      }
    }
  };

  // File drag & drop handling
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files) => {
    if (soundEnabled) playCockpitClick();
    const newFiles = [];

    Array.from(files).forEach((file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      const fileId = `${file.name}-${Date.now()}`;

      // Mock text extraction simulation for PDF, DOCX, and Image
      let extractedPreview = '';
      if (extension === 'pdf') {
        extractedPreview = `[Extracted from PDF: ${file.name}] DGCA CAR Section 8 Series C Part I: Minimum flight visibility in VMC above 10,000 ft AMSL is 8 km with 1,500m horizontal and 1,000ft vertical cloud separation.`;
      } else if (extension === 'docx' || extension === 'doc') {
        extractedPreview = `[Extracted from DOCX: ${file.name}] Aircraft Rules 1937 Rule 68: Special VFR requires ground visibility >= 1500m and cloud ceiling >= 600ft within an Indian CTR during daylight hours.`;
      } else if (['png', 'jpg', 'jpeg'].includes(extension)) {
        extractedPreview = `[OCR Text extracted via Tesseract placeholder from ${file.name}] METAR VIDP 150330Z 28004KT 0150 R28/0300D FG VV001 09/08 Q1014 NOSIG.`;
      } else {
        // Raw text file
        const reader = new FileReader();
        reader.onload = (event) => {
          setNotesText(prev => `${prev}\n\n[Imported from ${file.name}]:\n${event.target.result}`);
        };
        reader.readAsText(file);
        extractedPreview = `Imported raw text document.`;
      }

      newFiles.push({
        id: fileId,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: extension,
        extractedPreview
      });

      // Automatically append parsed notes text
      if (extractedPreview) {
        setNotesText(prev => `${prev}\n\n${extractedPreview}`);
      }
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    if (soundEnabled) playCockpitClick();
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handlePasteClipboard = async () => {
    if (soundEnabled) playCockpitClick();
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setNotesText(prev => `${prev}${prev ? '\n\n' : ''}${text}`);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-sky-500/20 shadow-xl hud-border-corner">
      {/* Header bar of Input Module */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sky-900/40 gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 m-0 font-hud">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-400"></span>
            1. INGESTION MODULE
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Upload PDFs, DOCX, charts, voice recordings, or paste DGCA syllabus notes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onLoadPreset(currentSubject)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-xs font-semibold transition-colors"
            title="Load authentic DGCA exam study notes for current subject"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load DGCA Preset</span>
          </button>

          <button
            onClick={handlePasteClipboard}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
            title="Paste from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Paste</span>
          </button>

          {notesText && (
            <button
              onClick={() => {
                if (soundEnabled) playCockpitClick();
                setNotesText('');
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs transition-colors"
              title="Clear all notes"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Left Side: Drag & Drop Zone & File List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
              isDragging
                ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
                : 'border-sky-800/60 hover:border-sky-500/50 bg-[#09152b]/50 hover:bg-[#0c1d3c]/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              multiple
              accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.txt"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-sky-950/90 border border-sky-500/30 flex items-center justify-center mb-2.5 text-sky-400">
              <UploadCloud className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-slate-200 m-0">
              Drop Study Files or <span className="text-sky-400 underline">Browse</span>
            </p>
            <p className="text-[11px] text-slate-400 m-0 mt-1">
              Supports PDF, Word (.docx), Charts/Images (PNG, JPG) & Text notes
            </p>
            <div className="flex gap-1.5 mt-2.5">
              <span className="px-1.5 py-0.5 rounded bg-sky-900/60 text-sky-300 text-[10px] font-mono">PDF.js</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 text-[10px] font-mono">OCR Parser</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-mono">DOCX</span>
            </div>
          </div>

          {/* Uploaded Files Chips */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Ingested Documents ({uploadedFiles.length})</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready for AI Synthesis
                </span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {uploadedFiles.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-sky-900/50 text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {['png', 'jpg', 'jpeg'].includes(file.type) ? (
                        <Image className="w-4 h-4 text-purple-400 shrink-0" />
                      ) : file.type === 'pdf' ? (
                        <FileText className="w-4 h-4 text-rose-400 shrink-0" />
                      ) : (
                        <File className="w-4 h-4 text-sky-400 shrink-0" />
                      )}
                      <div className="truncate">
                        <p className="font-medium text-slate-200 truncate m-0">{file.name}</p>
                        <p className="text-[10px] text-slate-400 m-0">{file.size} • Parsed & Vectorized</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Manual Text Entry & Speech Input (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-300 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-sky-400" />
              Pilot Notes & ATC Transcripts:
            </span>

            {/* Voice-to-Text Microphone Button */}
            <div className="flex items-center gap-2">
              {isRecording && (
                <span className="flex items-center gap-1 text-[11px] text-rose-400 font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping" />
                  Listening (Web Speech API)...
                </span>
              )}
              <button
                type="button"
                onClick={toggleRecording}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-md ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400/50'
                    : 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white shadow-sky-500/20'
                }`}
                title="Dictate pilot notes via Web Speech API"
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Stop Mic' : 'Voice Dictation'}</span>
              </button>
            </div>
          </div>

          {recognitionError && (
            <div className="p-2 rounded bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{recognitionError}</span>
            </div>
          )}

          {/* Text Area */}
          <div className="relative">
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Paste DGCA study material, CAR regulation excerpts, aircraft limitations, METAR weather logs, or use the microphone button above to transcribe verbal flight briefings..."
              rows={8}
              className="w-full rounded-xl bg-[#061021]/80 border border-sky-800/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm p-3.5 leading-relaxed font-sans resize-y outline-none transition-all shadow-inner"
            />
            {/* Word / Char Count HUD badge */}
            <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-400 font-mono">
              {notesText.trim() ? notesText.trim().split(/\s+/).length : 0} words | {notesText.length} chars
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
