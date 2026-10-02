import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  GitFork, 
  HelpCircle, 
  Sparkles, 
  Plane, 
  Radio, 
  Layers, 
  Share2, 
  Printer, 
  AlertCircle,
  ExternalLink,
  Search,
  BookOpen,
  Info
} from 'lucide-react';
import { Header } from './components/Header';
import { InputModule } from './components/InputModule';
import { ControlPanel } from './components/ControlPanel';
import { RadarLoading } from './components/RadarLoading';
import { SummaryViewer } from './components/SummaryViewer';
import { DiagramViewer } from './components/DiagramViewer';
import { QuizModule } from './components/QuizModule';
import { PdfExportModal } from './components/PdfExportModal';
import { DGCA_SUBJECTS, DGCA_PRESETS } from './data/dgcaPresets';
import { playCockpitClick, playChimeSuccess } from './utils/audio';
import { generateDgcaExplanation } from './utils/aiSynthesisEngine';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentSubject, setCurrentSubject] = useState('air_regs');
  
  // Ingestion state
  const [notesText, setNotesText] = useState(DGCA_PRESETS['air_regs'].rawNotes);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // AI Control Panel state
  const [complexity, setComplexity] = useState('instructor');
  const [outputFormat, setOutputFormat] = useState('bullets');
  const [visualType, setVisualType] = useState('flowchart');
  const [quizCount, setQuizCount] = useState(5);
  const [quizLevel, setQuizLevel] = useState('cpl');
  const [webGroundingEnabled, setWebGroundingEnabled] = useState(true);

  // Execution state
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSynthesized, setHasSynthesized] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'diagram' | 'quiz'
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Active synthesized data (summary is empty on initial load)
  const [activePackage, setActivePackage] = useState({
    title: DGCA_PRESETS['air_regs'].title,
    summary: '',
    diagramCode: DGCA_PRESETS['air_regs'].diagrams['flowchart'],
    carReferences: DGCA_PRESETS['air_regs'].carReferences,
    quizzes: DGCA_PRESETS['air_regs'].quizzes
  });

  // Switch subject and load preset
  const handleSelectSubject = (subjId) => {
    setCurrentSubject(subjId);
    const preset = DGCA_PRESETS[subjId];
    if (preset) {
      setNotesText(preset.rawNotes);
      setActivePackage({
        title: preset.title,
        summary: hasSynthesized ? generateDgcaExplanation(preset.rawNotes, subjId, complexity, outputFormat, webGroundingEnabled) : '',
        diagramCode: preset.diagrams[visualType] || preset.diagrams['flowchart'],
        carReferences: preset.carReferences,
        quizzes: preset.quizzes
      });
    }
  };

  // Dynamically update summary if complexity changes post-synthesis
  const handleComplexityChange = (newComplexity) => {
    setComplexity(newComplexity);
    if (hasSynthesized) {
      const updated = generateDgcaExplanation(
        notesText,
        currentSubject,
        newComplexity,
        outputFormat,
        webGroundingEnabled
      );
      setActivePackage(prev => ({ ...prev, summary: updated }));
    }
  };

  // Dynamically update summary if format changes post-synthesis
  const handleOutputFormatChange = (newFormat) => {
    setOutputFormat(newFormat);
    if (hasSynthesized) {
      const updated = generateDgcaExplanation(
        notesText,
        currentSubject,
        complexity,
        newFormat,
        webGroundingEnabled
      );
      setActivePackage(prev => ({ ...prev, summary: updated }));
    }
  };

  // AI Synthesis action
  const handleSynthesize = () => {
    setIsProcessing(true);

    // Realistic synthesis simulation with audio chime
    setTimeout(() => {
      setIsProcessing(false);
      setHasSynthesized(true);
      if (soundEnabled) playChimeSuccess();

      // Look up current subject preset
      const preset = DGCA_PRESETS[currentSubject] || DGCA_PRESETS['air_regs'];

      // Use the advanced AI Synthesis Engine to generate deep, format-compliant explanations
      const selectedSummary = generateDgcaExplanation(
        notesText,
        currentSubject,
        complexity,
        outputFormat,
        webGroundingEnabled
      );

      // Check if uploaded content is Propeller Theory or specialized topic
      const isPropellerTopic = notesText && (
        notesText.toLowerCase().includes('propeller') || 
        notesText.toLowerCase().includes('blade') || 
        notesText.toLowerCase().includes('governor')
      );

      let selectedTitle = preset.title;
      let selectedDiagram = preset.diagrams[visualType] || preset.diagrams['flowchart'];
      let selectedQuizzes = preset.quizzes;
      let selectedCarRefs = preset.carReferences;

      if (isPropellerTopic) {
        selectedTitle = 'Propeller Aerodynamics, Governor Mechanics & Critical Engine (CAR Section 2 & 8)';
        selectedCarRefs = [
          { code: 'DGCA CAR Section 2 Series I Part V', title: 'Aircraft Instrumentation, Propellers & Flight Recorders' },
          { code: 'DGCA CAR Section 8 Series S Part I', title: 'Operational Flight Limitations & One Engine Inoperative (OEI)' },
          { code: 'Aircraft Rules 1937 Rule 59', title: 'Airworthiness & Multi-Engine Performance Categories' },
          { code: 'FAA-H-8083-3C / DGCA PBN', title: 'Airplane Flying Handbook: Multiengine Operations' }
        ];

        // Custom diagrams for propeller
        if (visualType === 'flowchart') {
          selectedDiagram = `graph TD
    A["Engine Power / Airspeed Changes"] --> B{"Governor Condition?"}
    B -- "Over-Speed: Flyweights Out" --> C["Spool Valve Lifts<br/>Oil Enters Pitch Cylinder"]
    C --> D["Blades move to COARSE PITCH<br/>(Higher angle, larger bite)"]
    D --> E["Engine RPM Decreases back to Datum"]
    B -- "Under-Speed: Flyweights In" --> F["Spool Valve Drops<br/>Oil Drains from Hub"]
    F --> G["Blades move to FINE PITCH<br/>(Lower angle, smaller bite)"]
    G --> H["Engine RPM Increases back to Datum"]
    B -- "Engine Failure (Multi-Engine)" --> I["Pull Propeller Lever to FEATHER<br/>Blades align parallel to wind (90°)<br/>Prevents windmilling drag penalty"]`;
        } else if (visualType === 'mindmap') {
          selectedDiagram = `mindmap
  root((Propeller Systems))
    Aerodynamics
      Blade Twist
        Compensates for Vtip > Vroot
        Equalizes Angle of Attack
      Thrust vs Torque
        Thrust pulls forward
        Torque opposes engine
      Asymmetric Forces
        P-Factor Yaw
        Gyroscopic Precession
        Spiraling Slipstream
        Torque Reaction Roll
    Constant Speed Governor
      On-Speed Flyweight Balance
      Over-Speed Coarser Pitch
      Under-Speed Finer Pitch
      Cockpit RPM Lever
    Critical Engine (PAST)
      P-Factor Asymmetric Arm
      Accelerated Slipstream
      Spiraling Prop-Wash
      Torque Reaction
      Left Engine is Critical
    Emergency Feathering
      Minimizes Windmilling Drag
      Protects Single Engine Climb`;
        } else {
          selectedDiagram = `graph LR
    P1["Throttle/Airspeed Change Detected"] --> P2["Governor Flyweights Sense RPM Delta"]
    P2 --> P3["Pilot Valve Metres High-Pressure Oil"]
    P3 --> P4["Pitch Change Cylinder Moves Blade Angle"]
    P4 --> P5["Aerodynamic Torque Balances Engine Output"]
    P5 --> P6["Steady-State On-Speed Restored"]`;
        }

        // Custom DGCA MCQs for propeller theory
        selectedQuizzes = [
          {
            id: 'qp1',
            question: 'In a twin-engine aircraft with both conventional clockwise-rotating propellers, why is the Left Engine designated as the Critical Engine under DGCA Technical General regulations?',
            options: [
              'The left engine drives the primary vacuum and hydraulic pumps',
              'The descending blade of the right engine has a longer moment arm to the fuselage centerline, creating a greater yawing moment upon left engine failure (P-Factor)',
              'The spiraling slipstream from the right engine generates more rudder effectiveness than the left engine',
              'The left engine rotates faster due to crankshaft gear reduction tolerances'
            ],
            correctIndex: 1,
            explanation: 'Under the P-Factor principle (Asymmetric Blade Effect), the descending blade produces more thrust than the ascending blade. On the right engine, the descending blade is further outboard from the fuselage centerline than on the left engine. Thus, if the left engine fails, the operating right engine generates a much larger adverse yawing moment, making the left engine critical.'
          },
          {
            id: 'qp2',
            question: 'When adjusting power on an aircraft equipped with a constant-speed propeller, which sequence must a pilot strictly observe when REDUCING power to prevent excessive cylinder head pressures and detonation?',
            options: [
              'Reduce Propeller RPM first with the blue lever, then reduce Throttle (Manifold Pressure)',
              'Reduce Throttle (Manifold Pressure) first, then reduce Propeller RPM with the blue lever',
              'Retard mixture to lean of peak first, then reduce throttle and propeller simultaneously',
              'Both levers must always be retarded simultaneously in equal mechanical increments'
            ],
            correctIndex: 1,
            explanation: 'The golden rule for constant-speed engines is: "Throttle first, Props second on power reduction; Props first, Throttle second on power addition." Reducing RPM while high manifold pressure is maintained creates high cylinder head pressures that can induce severe detonation.'
          },
          {
            id: 'qp3',
            question: 'What is the primary aerodynamic purpose of the geometric twist built into an aircraft propeller blade from root to tip?',
            options: [
              'To increase the structural strength of the blade near the hub',
              'To prevent flutter vibrations at high cruising airspeeds',
              'To maintain a nearly constant angle of attack along the entire span despite higher rotational speeds at the tip',
              'To direct cooling air into the engine nacelle intakes'
            ],
            correctIndex: 2,
            explanation: 'The linear rotational velocity of a propeller blade increases with radius (V = ω × r). The blade tip moves much faster through the air than the hub. To maintain an optimal, uniform angle of attack along the entire blade and prevent the tip from stalling, the blade angle is twisted so it is greatest at the root and shallowest at the tip.'
          },
          {
            id: 'qp4',
            question: 'If a multi-engine aircraft experiences an engine failure in flight, what aerodynamic consequence occurs if the pilot fails to feather the inoperative propeller?',
            options: [
              'The propeller will automatically feather once RPM drops below 1,000 RPM',
              'The windmilling propeller creates massive parasitic drag equivalent to a solid disc of the propeller diameter, severely degrading climb gradient',
              'The propeller will increase engine oil temperature to redline',
              'No significant drag penalty occurs as long as airspeed remains above VMC'
            ],
            correctIndex: 1,
            explanation: 'A windmilling propeller acts like a solid disc of flat plate drag, generating enormous aerodynamic parasitic drag. This catastrophic drag increase can reduce single-engine climb performance by 300 to 500 ft/min and raise VMCA dangerously close to stall speed.'
          }
        ];
      }

      setActivePackage({
        title: selectedTitle,
        summary: selectedSummary,
        diagramCode: selectedDiagram,
        carReferences: selectedCarRefs,
        quizzes: selectedQuizzes
      });

      // Switch to summary tab
      setActiveTab('summary');

      // Smooth scroll to generated output dossier
      setTimeout(() => {
        document.getElementById('dgca-output-workspace')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }, 2200);
  };

  // Switch diagram visual type on the fly
  const handleDiagramTypeChange = (newType) => {
    if (soundEnabled) playCockpitClick();
    setVisualType(newType);
    const preset = DGCA_PRESETS[currentSubject] || DGCA_PRESETS['air_regs'];
    if (preset && preset.diagrams[newType]) {
      setActivePackage(prev => ({
        ...prev,
        diagramCode: preset.diagrams[newType]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Cockpit Nav Header */}
      <Header
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentSubject={currentSubject}
        onSelectSubject={handleSelectSubject}
        subjects={DGCA_SUBJECTS}
      />

      {/* Main Ground School Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Banner / Mission Status */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-950/80 via-[#0a1835]/90 to-[#071329]/80 border border-sky-500/20 p-5 sm:p-6 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hud-grid opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-500/30">
                  DGCA Examination Standard 2026
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  CARs Grounded
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-hud tracking-wide m-0">
                AI GROUND SCHOOL FLIGHT DECK
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 m-0 max-w-2xl">
                Ingest pilot study manuals, apply cognitive complexity filters, render interactive Mermaid flowcharts, and train with authentic DGCA Pariksha-style mock examinations.
              </p>
            </div>

            {/* Quick Stats Widget */}
            <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-sky-900/50 text-xs font-mono">
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-slate-400 text-[10px]">Active Syllabus</div>
                <div className="text-sky-400 font-bold text-sm">
                  {DGCA_SUBJECTS.find(s => s.id === currentSubject)?.name.split(' ')[0]}
                </div>
              </div>
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-slate-400 text-[10px]">Mock Questions</div>
                <div className="text-amber-400 font-bold text-sm">{quizCount} MCQs</div>
              </div>
              <div className="text-center px-3">
                <div className="text-slate-400 text-[10px]">Min. Pass Grade</div>
                <div className="text-emerald-400 font-bold text-sm">70%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Input & Ingestion Module */}
        <InputModule
          notesText={notesText}
          setNotesText={setNotesText}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          soundEnabled={soundEnabled}
          onLoadPreset={handleSelectSubject}
          currentSubject={currentSubject}
        />

        {/* 2. Customization Engine (AI Control Panel) */}
        <ControlPanel
          complexity={complexity}
          setComplexity={handleComplexityChange}
          outputFormat={outputFormat}
          setOutputFormat={handleOutputFormatChange}
          visualType={visualType}
          setVisualType={setVisualType}
          quizCount={quizCount}
          setQuizCount={setQuizCount}
          quizLevel={quizLevel}
          setQuizLevel={setQuizLevel}
          webGroundingEnabled={webGroundingEnabled}
          setWebGroundingEnabled={setWebGroundingEnabled}
          onGenerate={handleSynthesize}
          isProcessing={isProcessing}
          soundEnabled={soundEnabled}
        />

        {/* Loading State / Radar Sweep Animation */}
        {isProcessing && <RadarLoading />}

        {/* Standby State Before Synthesis - No summary card shown in any part of cycle before button click */}
        {!hasSynthesized && !isProcessing && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sky-500/20 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <h4 className="text-base font-bold text-white font-hud tracking-wide m-0">
              AI GROUND SCHOOL FLIGHT DECK READY
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto m-0">
              Click <strong className="text-sky-300 font-hud">"SYNTHESIZE DGCA STUDY PACKAGE"</strong> above to generate your customized study summary, diagrams, and mock quiz.
            </p>
          </div>
        )}

        {/* Output & Visualization Workspace - Appears ONLY after clicking Synthesize */}
        {hasSynthesized && !isProcessing && (
          <div id="dgca-output-workspace" className="space-y-4 pt-2">
            {/* Output Workspace Header with Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-900/50 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white font-hud tracking-wide m-0 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>OUTPUT & FLIGHT BRIEFING DOSSIER</span>
                </h3>
                <p className="text-xs text-slate-400 m-0">
                  {activePackage.title}
                </p>
              </div>

              {/* View Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-sky-900/60">
                <button
                  onClick={() => {
                    if (soundEnabled) playCockpitClick();
                    setActiveTab('summary');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'summary'
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Study Summary</span>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) playCockpitClick();
                    setActiveTab('diagram');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'diagram'
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Diagram Viewer (Mermaid)</span>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) playCockpitClick();
                    setActiveTab('quiz');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'quiz'
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>DGCA Mock Quiz ({quizCount})</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Summary & Explanation */}
            {activeTab === 'summary' && (
              <SummaryViewer
                summaryText={activePackage.summary}
                carReferences={activePackage.carReferences}
                complexity={complexity}
                outputFormat={outputFormat}
                onDownloadPdf={() => setIsPdfModalOpen(true)}
                soundEnabled={soundEnabled}
              />
            )}

            {/* Tab 2: Diagram Viewer */}
            {activeTab === 'diagram' && (
              <DiagramViewer
                diagramCode={activePackage.diagramCode}
                visualType={visualType}
                onTypeChange={handleDiagramTypeChange}
                soundEnabled={soundEnabled}
              />
            )}

            {/* Tab 3: DGCA Mock Quiz */}
            {activeTab === 'quiz' && (
              <QuizModule
                quizzes={activePackage.quizzes}
                quizCount={quizCount}
                quizLevel={quizLevel}
                soundEnabled={soundEnabled}
              />
            )}
          </div>
        )}
      </main>

      {/* Printable PDF Export Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        title={activePackage.title}
        summaryText={activePackage.summary}
        carReferences={activePackage.carReferences}
        quizzes={activePackage.quizzes.slice(0, quizCount)}
        complexity={complexity}
        soundEnabled={soundEnabled}
      />

      {/* Cockpit Footer */}
      <footer className="mt-12 border-t border-sky-950 bg-[#040812] py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Plane className="w-4 h-4 text-sky-400 transform -rotate-45" />
            <span className="font-semibold text-slate-300">AEROGROUND DGCA</span>
            <span>• Built for Indian Aspiring Pilots & Flight Instructors</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Aircraft Act 1934</span>
            <span>•</span>
            <span>Aircraft Rules 1937</span>
            <span>•</span>
            <span>DGCA CAR Section 8</span>
            <span>•</span>
            <span>AIP India eAIP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
