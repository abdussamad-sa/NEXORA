import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setMsg('');
    // Supabase requires re-authentication for sensitive actions; use updateUser directly if session valid
    const { error } = await supabase.auth.updateUser({ password: passwords.new });
    if (error) {
      setError(error.message);
    } else {
      setMsg('Password updated successfully');
    }
    setLoading(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Account</h3>
        <p>Email: {user?.email}</p>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
          {/* Current password field is optional for Supabase; omitted for simplicity */}
          <div>
            <label className="block mb-1" htmlFor="new">New Password</label>
            <input
              id="new"
              name="new"
              type="password"
              value={passwords.new}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="confirm">Confirm New Password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {msg && <p className="text-green-500">{msg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <ThemeToggle />
      </section>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
