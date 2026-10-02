import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Maximize2, 
  Code, 
  GitFork, 
  Network, 
  Workflow,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { playCockpitClick } from '../utils/audio';

// Initialize mermaid with dark aviation theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#071224',
    primaryColor: '#0284c7',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#38bdf8',
    lineColor: '#38bdf8',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a'
  },
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  securityLevel: 'loose'
});

export function DiagramViewer({ 
  diagramCode, 
  visualType, 
  onTypeChange,
  soundEnabled 
}) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showCode, setShowCode] = useState(false);
  const [renderError, setRenderError] = useState(null);

  // Render mermaid diagram
  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      if (!diagramCode) return;
      try {
        setRenderError(null);
        const uniqueId = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, diagramCode);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        if (isMounted) {
          setRenderError('Error rendering diagram. Check syntax or try switching diagram type.');
        }
      }
    };

    renderDiagram();
    return () => {
      isMounted = false;
    };
  }, [diagramCode]);

  // Zoom controls
  const handleZoomIn = () => {
    if (soundEnabled) playCockpitClick();
    setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    if (soundEnabled) playCockpitClick();
    setZoomLevel(prev => Math.max(prev - 0.2, 0.4));
  };

  const handleResetZoom = () => {
    if (soundEnabled) playCockpitClick();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Download Diagram as PNG image
  const handleDownloadImage = () => {
    if (soundEnabled) playCockpitClick();
    if (!containerRef.current) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    try {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      const image = new window.Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width * 2 || 1600;
        canvas.height = image.height * 2 || 1200;
        const context = canvas.getContext('2d');
        
        // Dark cockpit background
        context.fillStyle = '#071224';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const png = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `DGCA-Aviation-Diagram-${visualType}.png`;
        downloadLink.href = png;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      image.src = blobURL;
    } catch (e) {
      console.error('Image export failed:', e);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-sky-900/40">
        {/* Diagram Switcher Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onTypeChange('flowchart')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              visualType === 'flowchart'
                ? 'bg-sky-500/20 text-sky-200 border-sky-400'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-sky-400" />
            <span>Flowchart</span>
          </button>

          <button
            onClick={() => onTypeChange('mindmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              visualType === 'mindmap'
                ? 'bg-amber-500/20 text-amber-200 border-amber-400'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-amber-400" />
            <span>Mind-Map</span>
          </button>

          <button
            onClick={() => onTypeChange('process')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              visualType === 'process'
                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 text-emerald-400" />
            <span>Process Tree</span>
          </button>
        </div>

        {/* Pan / Zoom / Export actions */}
        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-300 hover:text-sky-400 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-400 px-1.5">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-300 hover:text-sky-400 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-slate-300 hover:text-amber-400 transition-colors border-l border-slate-700"
              title="Reset Zoom & Pan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Mermaid code */}
          <button
            onClick={() => {
              if (soundEnabled) playCockpitClick();
              setShowCode(!showCode);
            }}
            className={`p-2 rounded-lg text-xs transition-colors border ${
              showCode
                ? 'bg-sky-500/20 text-sky-300 border-sky-400'
                : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="View Mermaid Syntax"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          {/* Download Image button */}
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
            title="Download visual diagram as PNG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      {renderError && (
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{renderError}</span>
        </div>
      )}

      {/* Diagram Canvas Viewer */}
      <div 
        className="glass-panel rounded-2xl border border-sky-500/20 overflow-hidden relative min-h-[480px] h-[550px] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none"></div>

        {/* Pan & Zoom Hint */}
        <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded bg-slate-900/80 border border-sky-900/50 text-[10px] text-slate-400 font-mono pointer-events-none flex items-center gap-1">
          <Maximize2 className="w-3 h-3 text-sky-400" />
          <span>Click & drag to pan • Use + / - to zoom</span>
        </div>

        {/* Mermaid SVG Container */}
        <div 
          ref={containerRef}
          className="w-full h-full flex items-center justify-center p-6 transition-transform duration-75"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      {/* Mermaid Raw Code Inspector */}
      {showCode && (
        <div className="p-4 rounded-xl bg-[#050b16] border border-sky-900/60 font-mono text-xs text-sky-300">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-900/40 text-slate-400">
            <span>Mermaid.js Diagram Specification:</span>
            <span className="text-[10px] bg-sky-950 px-2 py-0.5 rounded text-sky-400">DGCA Knowledge Graph</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap">{diagramCode}</pre>
        </div>
      )}
    </div>
  );
}
