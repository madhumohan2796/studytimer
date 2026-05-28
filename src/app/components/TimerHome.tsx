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
    <div className="flex flex-col items-center justify-center px-16 py-24 min-h-screen">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-7xl mb-4">Choose Your Timer</h1>
          <p className="text-muted-foreground text-xl">
            Select a focus mode to begin
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-16">
          {timerOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => onTimerSelect(option.id)}
                className="bg-card hover:bg-muted border border-border rounded-3xl p-10 text-left transition-all hover:scale-105 hover:shadow-xl"
              >
                <Icon className="w-12 h-12 mb-6 text-primary" />
                <h2 className="text-3xl mb-2">{option.title}</h2>
                <p className="text-primary text-xl mb-3">{option.duration}</p>
                <p className="text-muted-foreground">{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
