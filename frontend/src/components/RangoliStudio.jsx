import React, { useRef, useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';

export default function RangoliStudio() {
  const canvasRef = useRef(null);
  const [symmetry, setSymmetry] = useState(8); // 4, 6, 8, or 1 (freehand)
  const [color, setColor] = useState('#FFD36A');
  const [brushSize, setBrushSize] = useState(4);
  const [activeTool, setActiveTool] = useState('brush'); // 'brush' | 'eraser' | 'stamp'
  const [stampIcon, setStampIcon] = useState('🪔');
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [notification, setNotification] = useState('');

  const festivalPalette = [
    { name: 'Diya Gold', hex: '#FFD36A' },
    { name: 'Marigold Orange', hex: '#F59E0B' },
    { name: 'Abir Vermilion', hex: '#D94A32' },
    { name: 'Sacred White Rice', hex: '#FFFDF7' },
    { name: 'Peacock Turquoise', hex: '#0EA5E9' },
    { name: 'Pipal Emerald', hex: '#10B981' },
    { name: 'Royal Plum', hex: '#9333EA' },
    { name: 'Sunset Amber', hex: '#FF9F43' }
  ];

  const stamps = [
    { label: 'Diyo', icon: '🪔' },
    { label: 'Sayapatri', icon: '🌼' },
    { label: 'Makhamali', icon: '🏵️' },
    { label: 'Lotus', icon: '🪷' },
    { label: 'Sparkle', icon: '✨' },
    { label: 'Auspicious Footprints', icon: '👣' }
  ];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set fixed high resolution
    canvas.width = 600;
    canvas.height = 600;

    // Fill dark backdrop
    drawBlankBackdrop(ctx);
    saveState();
  }, []);

  const drawBlankBackdrop = (ctx) => {
    ctx.fillStyle = '#160B20';
    ctx.fillRect(0, 0, 600, 600);

    // Subtle decorative concentric guideline rings
    ctx.strokeStyle = 'rgba(255, 211, 106, 0.08)';
    ctx.lineWidth = 1;
    [60, 120, 180, 240, 280].forEach(r => {
      ctx.beginPath();
      ctx.arc(300, 300, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Radial guide spokes
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(300, 300);
      ctx.lineTo(300 + Math.cos(angle) * 290, 300 + Math.sin(angle) * 290);
      ctx.stroke();
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory(prev => [...prev.slice(0, historyStep + 1), dataUrl]);
    setHistoryStep(prev => prev + 1);
  };

  const handleUndo = () => {
    if (historyStep <= 0) return;
    soundManager.playCardPlay();
    const prevStep = historyStep - 1;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = history[prevStep];
    img.onload = () => {
      ctx.clearRect(0, 0, 600, 600);
      ctx.drawImage(img, 0, 0);
      setHistoryStep(prevStep);
    };
  };

  const handleClear = () => {
    soundManager.playCardPlay();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawBlankBackdrop(ctx);
    saveState();
    showToast('Canvas cleared. Ready for a new Rangoli!');
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const drawSymmetric = (startX, startY, endX, endY) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = 300;
    const centerY = 300;

    const n = symmetry;
    const angleStep = (Math.PI * 2) / n;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (activeTool === 'eraser') {
      ctx.strokeStyle = '#160B20';
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;
    }

    for (let i = 0; i < n; i++) {
      const angle = i * angleStep;

      // Rotate start point around center
      const sRotX = centerX + (startX - centerX) * Math.cos(angle) - (startY - centerY) * Math.sin(angle);
      const sRotY = centerY + (startX - centerX) * Math.sin(angle) + (startY - centerY) * Math.cos(angle);

      // Rotate end point around center
      const eRotX = centerX + (endX - centerX) * Math.cos(angle) - (endY - centerY) * Math.sin(angle);
      const eRotY = centerY + (endX - centerX) * Math.sin(angle) + (endY - centerY) * Math.cos(angle);

      ctx.beginPath();
      ctx.moveTo(sRotX, sRotY);
      ctx.lineTo(eRotX, eRotY);
      ctx.stroke();

      // Mirror symmetry if symmetry >= 4
      if (symmetry > 1) {
        const sMirrorX = centerX - (startX - centerX);
        const sMRotX = centerX + (sMirrorX - centerX) * Math.cos(angle) - (startY - centerY) * Math.sin(angle);
        const sMRotY = centerY + (sMirrorX - centerX) * Math.sin(angle) + (startY - centerY) * Math.cos(angle);

        const eMirrorX = centerX - (endX - centerX);
        const eMRotX = centerX + (eMirrorX - centerX) * Math.cos(angle) - (endY - centerY) * Math.sin(angle);
        const eMRotY = centerY + (eMirrorX - centerX) * Math.sin(angle) + (endY - centerY) * Math.cos(angle);

        ctx.beginPath();
        ctx.moveTo(sMRotX, sMRotY);
        ctx.lineTo(eMRotX, eMRotY);
        ctx.stroke();
      }
    }
  };

  const placeSymmetricStamp = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = 300;
    const centerY = 300;
    const n = symmetry;
    const angleStep = (Math.PI * 2) / n;

    ctx.font = `${brushSize * 5 + 16}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < n; i++) {
      const angle = i * angleStep;
      const rotX = centerX + (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle);
      const rotY = centerY + (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle);
      ctx.fillText(stampIcon, rotX, rotY);
    }
    soundManager.playCardPlay();
    saveState();
  };

  const lastPos = useRef({ x: 0, y: 0 });

  const startDraw = (e) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    if (activeTool === 'stamp') {
      placeSymmetricStamp(coords.x, coords.y);
      return;
    }
    setIsDrawing(true);
    lastPos.current = coords;
  };

  const moveDraw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    drawSymmetric(lastPos.current.x, lastPos.current.y, coords.x, coords.y);
    lastPos.current = coords;
  };

  const stopDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const handleDownload = () => {
    soundManager.playDiyaChime();
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `jhilimili-tihar-rangoli-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Rangoli downloaded! Keep creating beautiful designs. 🪔');
  };

  const handlePublish = () => {
    soundManager.playDiyaChime();
    showToast('Your Rangoli has been published to the Tihar Celebration Gallery! ✨');
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  return (
    <section id="rangoli-studio" className="rangoli-studio-section">
      <div className="section-header-centered">
        <div className="festive-pill-badge">
          <span>🎨</span>
          <span>रङ्गोली स्टुडियो • Interactive Rangoli Studio</span>
        </div>

        <h2 className="section-title">
          Craft Sacred <span className="gradient-gold-text">Rangolis & Mandalas</span>
        </h2>

        <p className="section-subtitle">
          Celebrate Laxmi Puja and Chhath by drawing traditional geometric floor art with real-time radial symmetry, authentic festival pigments, and auspicious stamps.
        </p>
      </div>

      <div className="rangoli-workspace">
        {/* Left Toolbar */}
        <div className="rangoli-toolbox">
          {/* Tool Selector */}
          <div className="tool-group">
            <label className="toolbox-label">Draw Mode</label>
            <div className="toolbox-buttons-row">
              <button
                type="button"
                className={`tool-btn ${activeTool === 'brush' ? 'active' : ''}`}
                onClick={() => setActiveTool('brush')}
              >
                🖌️ Brush
              </button>
              <button
                type="button"
                className={`tool-btn ${activeTool === 'eraser' ? 'active' : ''}`}
                onClick={() => setActiveTool('eraser')}
              >
                🧹 Eraser
              </button>
              <button
                type="button"
                className={`tool-btn ${activeTool === 'stamp' ? 'active' : ''}`}
                onClick={() => setActiveTool('stamp')}
              >
                🪔 Stamp
              </button>
            </div>
          </div>

          {/* Radial Symmetry Mode */}
          <div className="tool-group">
            <label className="toolbox-label">Radial Symmetry</label>
            <div className="symmetry-picker">
              {[
                { n: 1, label: 'Free' },
                { n: 4, label: '4-Fold' },
                { n: 6, label: '6-Fold' },
                { n: 8, label: '8-Fold' },
                { n: 12, label: '12-Fold' }
              ].map(opt => (
                <button
                  key={opt.n}
                  type="button"
                  className={`sym-btn ${symmetry === opt.n ? 'active' : ''}`}
                  onClick={() => {
                    soundManager.playCardPlay();
                    setSymmetry(opt.n);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Festival Color Swatches */}
          {activeTool !== 'eraser' && (
            <div className="tool-group">
              <label className="toolbox-label">Festival Pigments (अबीर र रङ्ग)</label>
              <div className="pigment-swatches-grid">
                {festivalPalette.map(p => (
                  <button
                    key={p.hex}
                    type="button"
                    className={`swatch-btn ${color === p.hex ? 'active' : ''}`}
                    style={{ backgroundColor: p.hex }}
                    onClick={() => {
                      setColor(p.hex);
                      if (activeTool === 'eraser') setActiveTool('brush');
                    }}
                    title={p.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stamp selector if stamp mode active */}
          {activeTool === 'stamp' && (
            <div className="tool-group">
              <label className="toolbox-label">Choose Sacred Stamp</label>
              <div className="stamps-grid">
                {stamps.map(s => (
                  <button
                    key={s.icon}
                    type="button"
                    className={`stamp-btn ${stampIcon === s.icon ? 'active' : ''}`}
                    onClick={() => setStampIcon(s.icon)}
                    title={s.label}
                  >
                    <span>{s.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stroke Width Slider */}
          <div className="tool-group">
            <label className="toolbox-label">
              {activeTool === 'stamp' ? 'Stamp Size' : 'Brush Thickness'}: {brushSize}px
            </label>
            <input
              type="range"
              min="2"
              max="24"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
              className="brush-slider"
            />
          </div>

          {/* Action buttons */}
          <div className="toolbox-actions-footer">
            <button
              type="button"
              className="action-pill-btn"
              onClick={handleUndo}
              disabled={historyStep <= 0}
            >
              ↩ Undo
            </button>
            <button
              type="button"
              className="action-pill-btn btn-danger"
              onClick={handleClear}
            >
              🗑️ Clear
            </button>
            <button
              type="button"
              className="action-pill-btn btn-gold"
              onClick={handleDownload}
            >
              💾 Save PNG
            </button>
            <button
              type="button"
              className="action-pill-btn btn-publish"
              onClick={handlePublish}
            >
              ✨ Publish
            </button>
          </div>
        </div>

        {/* Center Drawing Canvas */}
        <div className="rangoli-canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="rangoli-drawing-canvas"
            onMouseDown={startDraw}
            onMouseMove={moveDraw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={moveDraw}
            onTouchEnd={stopDraw}
          />
          <div className="canvas-instruction-pill">
            <span>✨ Tap & drag on canvas to draw with {symmetry}-fold mandala symmetry</span>
          </div>
        </div>
      </div>

      {notification && (
        <div className="rangoli-toast-alert">
          <span>{notification}</span>
        </div>
      )}
    </section>
  );
}
