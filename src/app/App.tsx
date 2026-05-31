import { useEffect, useState } from 'react';
import { Clock, Menu, X } from 'lucide-react';
import { TimerHome } from './components/TimerHome';
import { PomodoroTimer } from './components/PomodoroTimer';
import { CustomTimer } from './components/CustomTimer';
import { Stopwatch } from './components/Stopwatch';
import { BlogList } from './components/BlogList';
import { BlogPost } from './components/BlogPost';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';

type Theme = 'warm' | 'mono' | 'multicolor';
type TimerType = 'pomodoro-25' | 'pomodoro-120' | 'pomodoro-240' | 'custom' | 'stopwatch';
type Page = 'home' | 'blog' | 'auth' | 'dashboard';

type User = {
  email: string;
  name: string;
};

type SessionData = {
  type: string;
  duration: number;
  date: string;
};

export default function App() {
  const [theme, setTheme] = useState<Theme>('warm');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeTimer, setActiveTimer] = useState<TimerType | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('studyTimerCurrentUser');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const saveSession = (session: Omit<SessionData, 'date'>) => {
    if (!currentUser) return;

    const key = `studyTimer_sessions_${currentUser.email}`;
    const existingSessions: SessionData[] = JSON.parse(
      localStorage.getItem(key) || '[]'
    );

    const newSession: SessionData = {
      ...session,
      date: new Date().toISOString(),
    };

    localStorage.setItem(key, JSON.stringify([...existingSessions, newSession]));
  };

  const goHome = () => {
    setCurrentPage('home');
    setActiveTimer(null);
    setSelectedBlogId(null);
    setMobileMenuOpen(false);
  };

  const goBlog = () => {
    setCurrentPage('blog');
    setActiveTimer(null);
    setSelectedBlogId(null);
    setMobileMenuOpen(false);
  };

  const goAuth = () => {
    setCurrentPage('auth');
    setActiveTimer(null);
    setSelectedBlogId(null);
    setMobileMenuOpen(false);
  };

  const goDashboard = () => {
    setCurrentPage('dashboard');
    setActiveTimer(null);
    setSelectedBlogId(null);
    setMobileMenuOpen(false);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('studyTimerCurrentUser', JSON.stringify(user));
    setCurrentPage('dashboard');
    setActiveTimer(null);
    setSelectedBlogId(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('studyTimerCurrentUser');
    setCurrentPage('home');
    setActiveTimer(null);
    setSelectedBlogId(null);
    setMobileMenuOpen(false);
  };

  const handleTimerSelect = (timerType: TimerType) => {
    setActiveTimer(timerType);
    setCurrentPage('home');
    setMobileMenuOpen(false);
  };

  const handleBackToHome = () => {
    setActiveTimer(null);
  };

  const handleBlogSelect = (blogId: string) => {
    setSelectedBlogId(blogId);
  };

  const handleBackToBlogList = () => {
    setSelectedBlogId(null);
  };

  return (
    <div className={`size-full ${theme}`}>
      <div className="min-h-screen bg-background text-foreground">
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-12 lg:py-6">
            <button
              onClick={goHome}
              className="flex cursor-pointer items-center gap-3 transition-all hover:scale-[1.02] hover:opacity-80 active:scale-95"
            >
              <Clock className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
              <span className="text-xl font-medium sm:text-2xl">Study Timer</span>
            </button>

            <div className="hidden items-center gap-4 md:flex">
              <button
                onClick={goHome}
                className={`rounded-full px-6 py-2 transition-all ${
                  currentPage === 'home'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Home
              </button>

              <button
                onClick={goBlog}
                className={`rounded-full px-6 py-2 transition-all ${
                  currentPage === 'blog'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Blog
              </button>

              {currentUser ? (
                <>
                  <button
                    onClick={goDashboard}
                    className={`rounded-full px-6 py-2 transition-all ${
                      currentPage === 'dashboard'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    Dashboard
                  </button>

                  <span className="text-sm text-muted-foreground">
                    Hi, {currentUser.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="rounded-full px-6 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={goAuth}
                  className={`rounded-full px-6 py-2 transition-all ${
                    currentPage === 'auth'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  Login / Sign Up
                </button>
              )}

              <div className="ml-2 flex gap-3">
                <ThemeButton
                  active={theme === 'warm'}
                  onClick={() => setTheme('warm')}
                  style={{ background: '#C85C3F' }}
                  label="Warm theme"
                />

                <ThemeButton
                  active={theme === 'mono'}
                  onClick={() => setTheme('mono')}
                  style={{ background: '#000000' }}
                  label="Mono theme"
                />

                <ThemeButton
                  active={theme === 'multicolor'}
                  onClick={() => setTheme('multicolor')}
                  style={{
                    background:
                      'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #98D8C8 100%)',
                  }}
                  label="Multicolor theme"
                />
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="rounded-full bg-muted p-3 text-foreground transition-all hover:scale-105 md:hidden"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-border px-4 py-4 md:hidden">
              <div className="grid gap-3">
                <MobileNavButton
                  active={currentPage === 'home'}
                  onClick={goHome}
                  label="Home"
                />

                <MobileNavButton
                  active={currentPage === 'blog'}
                  onClick={goBlog}
                  label="Blog"
                />

                {currentUser ? (
                  <>
                    <MobileNavButton
                      active={currentPage === 'dashboard'}
                      onClick={goDashboard}
                      label="Dashboard"
                    />

                    <div className="rounded-2xl bg-muted px-5 py-4 text-muted-foreground">
                      Signed in as {currentUser.name}
                    </div>

                    <MobileNavButton
                      active={false}
                      onClick={handleLogout}
                      label="Logout"
                    />
                  </>
                ) : (
                  <MobileNavButton
                    active={currentPage === 'auth'}
                    onClick={goAuth}
                    label="Login / Sign Up"
                  />
                )}

                <div className="rounded-2xl bg-muted p-4">
                  <p className="mb-3 text-sm text-muted-foreground">Theme</p>
                  <div className="flex gap-4">
                    <ThemeButton
                      active={theme === 'warm'}
                      onClick={() => setTheme('warm')}
                      style={{ background: '#C85C3F' }}
                      label="Warm theme"
                      large
                    />

                    <ThemeButton
                      active={theme === 'mono'}
                      onClick={() => setTheme('mono')}
                      style={{ background: '#000000' }}
                      label="Mono theme"
                      large
                    />

                    <ThemeButton
                      active={theme === 'multicolor'}
                      onClick={() => setTheme('multicolor')}
                      style={{
                        background:
                          'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #98D8C8 100%)',
                      }}
                      label="Multicolor theme"
                      large
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        <main className="pt-20 lg:pt-24">
          {currentPage === 'blog' ? (
            selectedBlogId ? (
              <BlogPost blogId={selectedBlogId} onBack={handleBackToBlogList} />
            ) : (
              <BlogList onBlogSelect={handleBlogSelect} />
            )
          ) : currentPage === 'auth' ? (
            <Auth onLogin={handleLogin} />
          ) : currentPage === 'dashboard' && currentUser ? (
            <Dashboard user={currentUser} />
          ) : activeTimer === null ? (
            <TimerHome onTimerSelect={handleTimerSelect} />
          ) : activeTimer === 'stopwatch' ? (
            <Stopwatch onBack={handleBackToHome} onSaveSession={saveSession} />
          ) : activeTimer === 'custom' ? (
            <CustomTimer onBack={handleBackToHome} onSaveSession={saveSession} />
          ) : (
            <PomodoroTimer
              timerType={activeTimer}
              onBack={handleBackToHome}
              onSaveSession={saveSession}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function ThemeButton({
  active,
  onClick,
  style,
  label,
  large = false,
}: {
  active: boolean;
  onClick: () => void;
  style: React.CSSProperties;
  label: string;
  large?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`${large ? 'h-11 w-11' : 'h-10 w-10'} rounded-full transition-all ${
        active
          ? 'ring-4 ring-primary ring-offset-2 ring-offset-background'
          : 'hover:scale-110'
      }`}
      style={style}
      aria-label={label}
    />
  );
}

function MobileNavButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-5 py-4 text-left transition-all ${
        active ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
      }`}
    >
      {label}
    </button>
  );
}