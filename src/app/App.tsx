import { useState } from 'react';
import { Clock } from 'lucide-react';
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

  const handleTimerSelect = (timerType: TimerType) => {
    setActiveTimer(timerType);
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
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-12 py-6 z-10">
          <div className="flex items-center gap-8">
            {/* Logo */}
                      <button
                          onClick={() => {
                              setCurrentPage('home');
                              setActiveTimer(null);
                              setSelectedBlogId(null);
                              hover: scale - 105;
                              hover: opacity - 80;
                          }}
                          className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform"
                      >
                          <Clock className="w-8 h-8 text-primary" />
                          <span className="text-2xl font-medium">Study Timer</span>
                      </button>

            {/* Nav Links */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setActiveTimer(null);
                  setSelectedBlogId(null);
                }}
                className={`px-6 py-2 rounded-full transition-all ${
                  currentPage === 'home'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('blog');
                  setActiveTimer(null);
                  setSelectedBlogId(null);
                }}
                className={`px-6 py-2 rounded-full transition-all ${
                  currentPage === 'blog'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Blog
              </button>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('warm')}
              className={`w-12 h-12 rounded-full transition-all ${
                theme === 'warm' ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
              style={{ background: '#C85C3F' }}
              aria-label="Warm theme"
            />
            <button
              onClick={() => setTheme('mono')}
              className={`w-12 h-12 rounded-full transition-all ${
                theme === 'mono' ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
              style={{ background: '#000000' }}
              aria-label="Mono theme"
            />
            <button
              onClick={() => setTheme('multicolor')}
              className={`w-12 h-12 rounded-full transition-all ${
                theme === 'multicolor' ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #FFA07A 75%, #98D8C8 100%)',
              }}
              aria-label="Multicolor theme"
            />
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24">
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
            <PomodoroTimer
              timerType={activeTimer}
              onBack={handleBackToHome}
            />
          )}
        </main>
      </div>
    </div>
  );
}