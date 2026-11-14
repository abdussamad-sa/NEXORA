import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import { Button } from '../components/Button';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return setError('Passwords do not match');
    const accessToken = searchParams.get('access_token');
    if (!accessToken) return setError('Invalid or missing token');
    setLoading(true);
    try {
      // Supabase auth.updateUser works when the user is already signed in with the token.
      // We set the session using the access token first.
      const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });
      if (sessionError) throw sessionError;
      await updatePassword(accessToken, newPassword);
      setMessage('Password updated successfully. You can now login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-card p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-100">Reset Password</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {message && <div className="text-green-500 text-sm">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="New Password" type="password" name="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} required showToggle />
          <Input label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required showToggle />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Updating…' : 'Reset Password'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          <Link to="/login" className="text-accent hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
