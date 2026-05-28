import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

interface StopwatchProps {
  onBack: () => void;
}

export function Stopwatch({ onBack }: StopwatchProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTimeElapsed(0);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-28 left-12 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex gap-8 items-start justify-center min-h-screen p-16 pt-32">
        {/* Stopwatch Content */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-center mb-12">
            <h1 className="text-5xl">Stopwatch</h1>
          </div>

          {/* Timer Display */}
          <div className="mb-20">
            <div className="text-[140px] font-mono tracking-tighter leading-none tabular-nums">
              {formatTime(timeElapsed)}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-primary text-primary-foreground hover:bg-accent transition-colors rounded-full p-8"
              aria-label={isRunning ? 'Pause' : 'Start'}
            >
              {isRunning ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
            </button>
            <button
              onClick={handleReset}
              className="bg-muted text-foreground hover:bg-secondary transition-colors rounded-full p-8"
              aria-label="Reset"
            >
              <RotateCcw className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
