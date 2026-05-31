import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

interface AuthProps {
  onLogin: (user: { email: string; name: string }) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('studyTimerUsers') || '{}');

    if (isLogin) {
      const user = users[email];

      if (!user || user.password !== password) {
        setError('Invalid email or password');
        return;
      }

      onLogin({ email, name: user.name });
      return;
    }

    if (users[email]) {
      setError('Email already exists');
      return;
    }

    users[email] = {
      name,
      password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('studyTimerUsers', JSON.stringify(users));
    onLogin({ email, name });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl sm:text-5xl">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Log in to track your study progress' : 'Sign up to start tracking'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm text-muted-foreground">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-muted py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-border bg-muted py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-border bg-muted py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary py-3 text-primary-foreground transition-colors hover:bg-accent"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}