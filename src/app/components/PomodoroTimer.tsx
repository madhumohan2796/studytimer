import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';
type TimerType = 'pomodoro-25' | 'pomodoro-120' | 'pomodoro-240';

interface PomodoroTimerProps {
  timerType: TimerType;
  onBack: () => void;
  onSaveSession?: (session: { type: string; duration: number }) => void;
}

const TIMER_CONFIGS = {
  'pomodoro-25': { work: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
  'pomodoro-120': { work: 120 * 60, shortBreak: 20 * 60, longBreak: 30 * 60 },
  'pomodoro-240': { work: 240 * 60, shortBreak: 30 * 60, longBreak: 45 * 60 },
};

export function PomodoroTimer({
  timerType,
  onBack,
  onSaveSession,
}: PomodoroTimerProps) {
  const config = TIMER_CONFIGS[timerType];
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(config.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotification();

            if (mode === 'work') {
              setSessionsCompleted((s) => s + 1);

              onSaveSession?.({
                type: timerType,
                duration: Math.round(config.work / 60),
              });
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
  }, [isRunning, timeLeft, mode, timerType, config.work, onSaveSession]);

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
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }

    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
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

  const getDuration = (timerMode: TimerMode) => config[timerMode];
  const progress = ((getDuration(mode) - timeLeft) / getDuration(mode)) * 100;

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
          <div className="mb-10 sm:mb-16 lg:mb-20">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleModeChange('work')}
                className={`rounded-full px-5 py-3 transition-all sm:px-8 ${
                  mode === 'work'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Focus
              </button>

              <button
                onClick={() => handleModeChange('shortBreak')}
                className={`rounded-full px-5 py-3 transition-all sm:px-8 ${
                  mode === 'shortBreak'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Short Break
              </button>

              <button
                onClick={() => handleModeChange('longBreak')}
                className={`rounded-full px-5 py-3 transition-all sm:px-8 ${
                  mode === 'longBreak'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Long Break
              </button>
            </div>
          </div>

          <div className="relative mb-12 sm:mb-16 lg:mb-20">
            <svg
              className="h-[280px] w-[280px] -rotate-90 sm:h-[360px] sm:w-[360px] lg:h-[480px] lg:w-[480px]"
              viewBox="0 0 200 200"
            >
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
                <div className="font-mono text-[58px] leading-none tracking-tighter tabular-nums sm:text-[88px] lg:text-[120px]">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 flex items-center justify-center gap-5 sm:gap-6 lg:mb-24">
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

          <div className="text-center">
            <p className="mb-2 text-sm uppercase tracking-wide text-muted-foreground">
              Sessions Completed Today
            </p>
            <p className="text-5xl tabular-nums sm:text-6xl">
              {sessionsCompleted}
            </p>
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