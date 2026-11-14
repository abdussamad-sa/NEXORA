import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import { Button } from '../components/Button';

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!fullName || !email || !password || !confirmPassword) return 'All fields are required';
    if (password !== confirmPassword) return 'Passwords do not match';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);
    setError('');
    setLoading(true);
    try {
      await signUp(email, password, fullName);
      // After sign‑up Supabase sends a confirmation email (if enabled). We redirect to login.
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-card p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-100">Create Account</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" name="fullName" value={fullName} onChange={e=>setFullName(e.target.value)} required />
          <Input label="Email" type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <Input label="Password" type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} required showToggle />
          <Input label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required showToggle />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Creating…' : 'Create Account'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
