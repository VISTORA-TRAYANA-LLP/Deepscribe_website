import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Maximize2, Minimize2 } from 'lucide-react';

interface CanvasProps {
  onSave: (strokes: number[][][], transcription: string) => void;
}

export function Canvas({ onSave }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastTouch, setLastTouch] = useState<{ x: number; y: number } | null>(null);
  const [strokes, setStrokes] = useState<number[][][]>([]);
  const [currentStroke, setCurrentStroke] = useState<number[][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const width = container.clientWidth - 2;
      const height = isExpanded ? Math.min(800, window.innerHeight - 200) : 300;

      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext('2d');
      if (!context) return;

      context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = '#000000';
      context.lineWidth = 2;
      contextRef.current = context;
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isExpanded]);

  const getCoordinates = (event: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    if ('touches' in event) {
      const touch = event.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  };

  const startDrawing = (event: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in event) {
      // Prevent default for touch events to avoid scrolling issues
      event.preventDefault();
    } else {
      event.preventDefault();
    }
    
    const coords = getCoordinates(event);
    if (!coords) return;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    setLastTouch(coords);
    
    // Start a new stroke with timestamp
    const timestamp = Date.now();
    setCurrentStroke([[coords.x, coords.y, timestamp]]);
  };

  const draw = (event: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    
    if ('touches' in event) {
      // Prevent default for touch events to avoid scrolling issues
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    }

    const coords = getCoordinates(event);
    if (!coords || !lastTouch) return;

    const midPoint = {
      x: (lastTouch.x + coords.x) / 2,
      y: (lastTouch.y + coords.y) / 2
    };

    contextRef.current?.quadraticCurveTo(lastTouch.x, lastTouch.y, midPoint.x, midPoint.y);
    contextRef.current?.stroke();
    setLastTouch(coords);
    
    // Add point to current stroke with timestamp
    const timestamp = Date.now();
    setCurrentStroke(prev => [...prev, [coords.x, coords.y, timestamp]]);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
    setLastTouch(null);
    
    // Save the completed stroke
    if (currentStroke.length > 0) {
      setStrokes(prev => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#FFFFFF';
    setTranscription('');
    setStrokes([]);
    setCurrentStroke([]);
  };

  const toggleCanvasSize = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = () => {
    if (!transcription.trim()) {
      alert('Please provide transcription for your handwriting');
      return;
    }
    
    if (strokes.length === 0) {
      alert('Please write something on the canvas');
      return;
    }
    
    // Log the strokes data for debugging
    console.log('Submitting strokes data:', strokes);
    console.log('Strokes structure example:', 
      strokes.length > 0 ? 
        JSON.stringify(strokes[0].slice(0, Math.min(3, strokes[0].length))) : 
        'No strokes'
    );
    
    onSave(strokes, transcription);
    clearCanvas();
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full rounded-lg bg-white border border-gray-200 shadow-lg transition-all duration-300"
          style={{ touchAction: 'none' }}
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={toggleCanvasSize}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title={isExpanded ? 'Minimize canvas' : 'Maximize canvas'}
          >
            {isExpanded ? (
              <Minimize2 className="w-5 h-5 text-gray-600" />
            ) : (
              <Maximize2 className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title="Clear canvas"
          >
            <Eraser className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="transcription" className="block text-sm font-medium text-gray-700 mb-2 handwritten">
            Transcription
          </label>
          <textarea
            id="transcription"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            placeholder="Type the text you wrote above..."
            className="w-full h-24 px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none placeholder-gray-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg"
        >
          Submit Sample
        </button>
      </div>
    </div>
  );
}