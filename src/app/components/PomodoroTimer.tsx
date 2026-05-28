import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';
type TimerType = 'pomodoro-25' | 'pomodoro-120' | 'pomodoro-240' | 'custom';

interface PomodoroTimerProps {
  timerType: TimerType;
  onBack: () => void;
}

const TIMER_CONFIGS = {
  'pomodoro-25': { work: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
  'pomodoro-120': { work: 120 * 60, shortBreak: 20 * 60, longBreak: 30 * 60 },
  'pomodoro-240': { work: 240 * 60, shortBreak: 30 * 60, longBreak: 45 * 60 },
  'custom': { work: 30 * 60, shortBreak: 10 * 60, longBreak: 20 * 60 },
};

export function PomodoroTimer({ timerType, onBack }: PomodoroTimerProps) {
  const config = TIMER_CONFIGS[timerType];
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(config.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotification();
            if (mode === 'work') {
              setSessionsCompleted((s) => s + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode]);

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(config[newMode]);
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(config[mode]);
    setIsRunning(false);
  };

  const getDuration = (mode: TimerMode) => config[mode];
  const progress = ((getDuration(mode) - timeLeft) / getDuration(mode)) * 100;

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

      <div className="flex items-start justify-center min-h-screen p-16 pt-32">
        {/* Timer Content */}
        <div className="flex flex-col items-center justify-center flex-1">

      {/* Mode Selector */}
      <div className="mb-20">
        <div className="flex gap-3">
          <button
            onClick={() => handleModeChange('work')}
            className={`px-8 py-3 rounded-full transition-all ${
              mode === 'work'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => handleModeChange('shortBreak')}
            className={`px-8 py-3 rounded-full transition-all ${
              mode === 'shortBreak'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => handleModeChange('longBreak')}
            className={`px-8 py-3 rounded-full transition-all ${
              mode === 'longBreak'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Long Break
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative mb-20">
        <svg className="w-[480px] h-[480px] -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted"
          />
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 85}`}
            strokeDashoffset={`${2 * Math.PI * 85 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="text-primary transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[120px] font-mono tracking-tighter leading-none tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-24">
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

      {/* Sessions Completed */}
      <div className="text-center">
        <p className="text-muted-foreground mb-2 uppercase tracking-wide text-sm">
          Sessions Completed Today
        </p>
        <p className="text-6xl tabular-nums">{sessionsCompleted}</p>
      </div>

      <audio ref={audioRef} preload="auto">
        <source
          src="data:audio/wav;base64,UklGRhYAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQIAAAD//w=="
          type="audio/wav"
        />
      </audio>
        </div>
      </div>
    </div>
  );
}
