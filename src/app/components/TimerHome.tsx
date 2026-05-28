import { Clock, Timer, Hourglass, Settings } from 'lucide-react';

type TimerType = 'pomodoro-25' | 'pomodoro-120' | 'pomodoro-240' | 'custom' | 'stopwatch';

interface TimerHomeProps {
  onTimerSelect: (timerType: TimerType) => void;
}

export function TimerHome({ onTimerSelect }: TimerHomeProps) {
  const timerOptions = [
    {
      id: 'pomodoro-25' as TimerType,
      title: 'Pomodoro',
      duration: '25 minutes',
      icon: Timer,
      description: 'Classic focus session',
    },
    {
      id: 'pomodoro-120' as TimerType,
      title: 'Deep Work',
      duration: '2 hours',
      icon: Clock,
      description: 'Extended focus session',
    },
    {
      id: 'pomodoro-240' as TimerType,
      title: 'Flow State',
      duration: '4 hours',
      icon: Hourglass,
      description: 'Maximum productivity',
    },
    {
      id: 'custom' as TimerType,
      title: 'Custom Timer',
      duration: 'Set your own',
      icon: Settings,
      description: 'Personalized countdown',
    },
    {
      id: 'stopwatch' as TimerType,
      title: 'Stopwatch',
      duration: 'Count up',
      icon: Clock,
      description: 'Track elapsed time',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-16">
      <div className="w-full max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-7xl">
            Choose Your Timer
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Select a focus mode to begin
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {timerOptions.map((option) => {
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                onClick={() => onTimerSelect(option.id)}
                className="rounded-3xl border border-border bg-card p-6 text-left transition-all hover:scale-[1.02] hover:bg-muted hover:shadow-xl sm:p-8 lg:p-10"
              >
                <Icon className="mb-6 h-10 w-10 text-primary sm:h-12 sm:w-12" />
                <h2 className="mb-2 text-2xl sm:text-3xl">{option.title}</h2>
                <p className="mb-3 text-lg text-primary sm:text-xl">
                  {option.duration}
                </p>
                <p className="text-muted-foreground">{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}