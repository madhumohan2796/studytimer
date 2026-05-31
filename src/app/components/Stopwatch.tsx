import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

interface StopwatchProps {
  onBack: () => void;
  onSaveSession?: (session: { type: string; duration: number }) => void;
}

export function Stopwatch({ onBack, onSaveSession }: StopwatchProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
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
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }

    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleReset = () => {
    if (timeElapsed >= 60) {
      onSaveSession?.({
        type: 'stopwatch',
        duration: Math.max(1, Math.round(timeElapsed / 60)),
      });
    }

    setTimeElapsed(0);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen">
      <button
        onClick={onBack}
        className="fixed left-4 top-24 z-20 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-8 lg:left-12"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="flex min-h-screen items-start justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-16">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mb-10 text-center sm:mb-12">
            <h1 className="text-4xl sm:text-5xl">Stopwatch</h1>
            <p className="mt-3 text-muted-foreground">
              Press reset after studying to save this session.
            </p>
          </div>

          <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="font-mono text-[64px] leading-none tracking-tighter tabular-nums sm:text-[96px] lg:text-[140px]">
              {formatTime(timeElapsed)}
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 sm:gap-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="rounded-full bg-primary p-6 text-primary-foreground transition-colors hover:bg-accent sm:p-8"
              aria-label={isRunning ? 'Pause' : 'Start'}
            >
              {isRunning ? (
                <Pause className="h-8 w-8 sm:h-10 sm:w-10" />
              ) : (
                <Play className="ml-1 h-8 w-8 sm:h-10 sm:w-10" />
              )}
            </button>

            <button
              onClick={handleReset}
              className="rounded-full bg-muted p-6 text-foreground transition-colors hover:bg-secondary sm:p-8"
              aria-label="Reset"
            >
              <RotateCcw className="h-8 w-8 sm:h-10 sm:w-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}