import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import { Button } from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-card p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-100">Login</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            showToggle
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-300">
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-accent hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-accent hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
