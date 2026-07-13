import { useState, type FormEvent } from 'react';
import { useAuthStore } from '../store/authStore';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register, isLoading, error, clearError } = useAuthStore();
  const isDev = import.meta.env.DEV;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    clearError();

    try {
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password, confirmPassword);
      }
      onNavigate('home');
    } catch {
      // Error state is set in the auth store.
    }
  };

  const switchMode = () => {
    clearError();
    setMode((current) => (current === 'login' ? 'register' : 'login'));
  };

  const quickLogin = async (demoEmail: string, demoPassword: string) => {
    clearError();
    try {
      await login(demoEmail, demoPassword);
      onNavigate('home');
    } catch {
      // Error state is set in the auth store.
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login'
                ? 'Sign in to your SUNi account'
                : 'Join SUNi for a calmer shopping experience'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {mode === 'register' && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="text-primary font-medium hover:underline"
            >
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>

          <button
            type="button"
            onClick={() => onNavigate('guest-lookup')}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium">Guest Order Lookup</div>
            <div className="text-sm text-muted-foreground">
              Find your orders without an account
            </div>
          </button>

          {isDev && (
            <div className="space-y-3 border-t pt-4">
              <p className="text-xs text-muted-foreground text-center">
                Dev quick login (hidden in production)
              </p>
              <button
                type="button"
                onClick={() => quickLogin('member@suni.com', 'member123456')}
                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors text-sm"
                disabled={isLoading}
              >
                <div className="font-medium">Demo member</div>
                <div className="text-muted-foreground">member@suni.com</div>
              </button>
              <button
                type="button"
                onClick={() => quickLogin('admin@suni.com', 'admin123456')}
                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors text-sm"
                disabled={isLoading}
              >
                <div className="font-medium">Demo admin</div>
                <div className="text-muted-foreground">admin@suni.com</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
