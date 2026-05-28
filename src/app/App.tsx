import { useState } from 'react';
import { Clock, Menu, X } from 'lucide-react';
import { TimerHome } from './components/TimerHome';
import { PomodoroTimer } from './components/PomodoroTimer';
import { Stopwatch } from './components/Stopwatch';
import { BlogList } from './components/BlogList';
import { BlogPost } from './components/BlogPost';

type Theme = 'warm' | 'mono' | 'multicolor';
type TimerType = 'pomodoro-25' | 'pomodoro-120' | 'pomodoro-240' | 'custom' | 'stopwatch';
type Page = 'home' | 'blog';

export default function App() {
  const [theme, setTheme] = useState<Theme>('warm');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeTimer, setActiveTimer] = useState<TimerType | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleTimerSelect = (timerType: TimerType) => {
    setActiveTimer(timerType);
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

              <div className="ml-2 flex gap-3">
                <button
                  onClick={() => setTheme('warm')}
                  className={`h-10 w-10 rounded-full transition-all ${
                    theme === 'warm'
                      ? 'ring-4 ring-primary ring-offset-2 ring-offset-background'
                      : 'hover:scale-110'
                  }`}
                  style={{ background: '#C85C3F' }}
                  aria-label="Warm theme"
                />
                <button
                  onClick={() => setTheme('mono')}
                  className={`h-10 w-10 rounded-full transition-all ${
                    theme === 'mono'
                      ? 'ring-4 ring-primary ring-offset-2 ring-offset-background'
                      : 'hover:scale-110'
                  }`}
                  style={{ background: '#000000' }}
                  aria-label="Mono theme"
                />
                <button
                  onClick={() => setTheme('multicolor')}
                  className={`h-10 w-10 rounded-full transition-all ${
                    theme === 'multicolor'
                      ? 'ring-4 ring-primary ring-offset-2 ring-offset-background'
                      : 'hover:scale-110'
                  }`}
                  style={{
                    background:
                      'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #98D8C8 100%)',
                  }}
                  aria-label="Multicolor theme"
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
                <button
                  onClick={goHome}
                  className={`rounded-2xl px-5 py-4 text-left transition-all ${
                    currentPage === 'home'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={goBlog}
                  className={`rounded-2xl px-5 py-4 text-left transition-all ${
                    currentPage === 'blog'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  Blog
                </button>

                <div className="rounded-2xl bg-muted p-4">
                  <p className="mb-3 text-sm text-muted-foreground">Theme</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setTheme('warm')}
                      className={`h-11 w-11 rounded-full transition-all ${
                        theme === 'warm' ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''
                      }`}
                      style={{ background: '#C85C3F' }}
                      aria-label="Warm theme"
                    />
                    <button
                      onClick={() => setTheme('mono')}
                      className={`h-11 w-11 rounded-full transition-all ${
                        theme === 'mono' ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''
                      }`}
                      style={{ background: '#000000' }}
                      aria-label="Mono theme"
                    />
                    <button
                      onClick={() => setTheme('multicolor')}
                      className={`h-11 w-11 rounded-full transition-all ${
                        theme === 'multicolor'
                          ? 'ring-4 ring-primary ring-offset-2 ring-offset-background'
                          : ''
                      }`}
                      style={{
                        background:
                          'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #98D8C8 100%)',
                      }}
                      aria-label="Multicolor theme"
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
          ) : activeTimer === null ? (
            <TimerHome onTimerSelect={handleTimerSelect} />
          ) : activeTimer === 'stopwatch' ? (
            <Stopwatch onBack={handleBackToHome} />
          ) : (
            <PomodoroTimer timerType={activeTimer} onBack={handleBackToHome} />
          )}
        </main>
      </div>
    </div>
  );
}