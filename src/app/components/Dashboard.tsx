import { Timer, Clock, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  user: { email: string; name: string };
}

interface SessionData {
  type: string;
  duration: number;
  date: string;
}

export function Dashboard({ user }: DashboardProps) {
  const sessions: SessionData[] = JSON.parse(
    localStorage.getItem(`studyTimer_sessions_${user.email}`) || '[]'
  );

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const thisWeekSessions = sessions.filter(
    (session) => new Date(session.date) >= oneWeekAgo
  ).length;

  const today = new Date().toDateString();

  const todaySessions = sessions.filter(
    (session) => new Date(session.date).toDateString() === today
  ).length;

  const sessionsByType = sessions.reduce((acc: Record<string, number>, session) => {
    acc[session.type] = (acc[session.type] || 0) + 1;
    return acc;
  }, {});

  const timerTypeLabels: Record<string, string> = {
    'pomodoro-25': 'Pomodoro',
    'pomodoro-120': 'Deep Work',
    'pomodoro-240': 'Flow State',
    custom: 'Custom Timer',
    stopwatch: 'Stopwatch',
  };

  return (
    <div className="min-h-screen px-4 py-24 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16">
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-7xl">
            Welcome back, {user.name}
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Here&apos;s your study progress overview.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-16 lg:grid-cols-4">
          <StatCard
            icon={<Timer className="h-7 w-7 text-primary sm:h-8 sm:w-8" />}
            value={totalSessions}
            label="Total Sessions"
          />

          <StatCard
            icon={<Clock className="h-7 w-7 text-primary sm:h-8 sm:w-8" />}
            value={totalHours}
            label="Hours Focused"
          />

          <StatCard
            icon={<TrendingUp className="h-7 w-7 text-primary sm:h-8 sm:w-8" />}
            value={thisWeekSessions}
            label="This Week"
          />

          <StatCard
            icon={<Calendar className="h-7 w-7 text-primary sm:h-8 sm:w-8" />}
            value={todaySessions}
            label="Today"
          />
        </div>

        <div className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:mb-16 lg:p-10">
          <h2 className="mb-8 text-3xl sm:text-4xl">Sessions by Timer Type</h2>

          {Object.keys(sessionsByType).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(sessionsByType).map(([type, count]) => {
                const percentage = ((count / totalSessions) * 100).toFixed(0);

                return (
                  <div key={type}>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-lg sm:text-xl">
                        {timerTypeLabels[type] || type}
                      </span>
                      <span className="text-sm text-muted-foreground sm:text-base">
                        {count} sessions ({percentage}%)
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              No sessions yet. Start a timer to see your stats.
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10">
          <h2 className="mb-8 text-3xl sm:text-4xl">Recent Sessions</h2>

          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions
                .slice(-10)
                .reverse()
                .map((session, index) => (
                  <div
                    key={`${session.date}-${index}`}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-4 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-muted p-3">
                        <Timer className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <div className="text-lg">
                          {timerTypeLabels[session.type] || session.type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(session.date).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-lg tabular-nums">
                        {session.duration} min
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {(session.duration / 60).toFixed(1)} hrs
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              No sessions recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="mb-5 w-fit rounded-2xl bg-primary/10 p-4">{icon}</div>
      <div className="mb-2 text-4xl tabular-nums sm:text-5xl">{value}</div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}