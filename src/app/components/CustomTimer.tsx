import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

interface CustomTimerProps {
  onBack: () => void;
}

export function CustomTimer({ onBack }: CustomTimerProps) {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('30');
  const [seconds, setSeconds] = useState('0');
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getTotalSeconds = () => {
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const s = Number(seconds) || 0;

    return Math.max(1, h * 3600 + m * 60 + s);
  };

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getTotalSeconds());
    }
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setSessionsCompleted((count) => count + 1);
            playNotification();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }

    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    max: number
  ) => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned === '') {
      setter('');
      return;
    }

    const numberValue = Math.min(max, Number(cleaned));
    setter(String(numberValue));
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getTotalSeconds());
  };

  const progress =
    getTotalSeconds() > 0
      ? ((getTotalSeconds() - timeLeft) / getTotalSeconds()) * 100
      : 0;

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
            <h1 className="mb-3 text-4xl sm:text-5xl lg:text-6xl">
              Custom Timer
            </h1>
            <p className="text-muted-foreground">
              Type your own hours, minutes and seconds.
            </p>
          </div>

          {!isRunning && (
            <div className="mb-10 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap justify-center gap-4">
                <label className="flex flex-col items-center gap-2">
                  <span className="text-sm text-muted-foreground">Hours</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={hours}
                    onChange={(event) =>
                      handleInputChange(event.target.value, setHours, 23)
                    }
                    onFocus={(event) => event.target.select()}
                    className="w-20 cursor-text rounded-2xl border border-border bg-background px-3 py-3 text-center text-xl outline-none transition focus:border-primary"
                  />
                </label>

                <label className="flex flex-col items-center gap-2">
                  <span className="text-sm text-muted-foreground">Minutes</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={minutes}
                    onChange={(event) =>
                      handleInputChange(event.target.value, setMinutes, 59)
                    }
                    onFocus={(event) => event.target.select()}
                    className="w-20 cursor-text rounded-2xl border border-border bg-background px-3 py-3 text-center text-xl outline-none transition focus:border-primary"
                  />
                </label>

                <label className="flex flex-col items-center gap-2">
                  <span className="text-sm text-muted-foreground">Seconds</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={seconds}
                    onChange={(event) =>
                      handleInputChange(event.target.value, setSeconds, 59)
                    }
                    onFocus={(event) => event.target.select()}
                    className="w-20 cursor-text rounded-2xl border border-border bg-background px-3 py-3 text-center text-xl outline-none transition focus:border-primary"
                  />
                </label>
              </div>
            </div>
          )}

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
              Custom Sessions Completed Today
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