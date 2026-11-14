import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    full_name: '',
    education: '',
    role: '',
    career_goal: '',
    location: '',
    social_links: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load profile data on component mount or when user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) {
        console.error('Profile fetch error', error);
        setError(error.message);
      } else {
        setProfile({
          full_name: data.full_name || '',
          education: data.education || '',
          role: data.role || '',
          career_goal: data.career_goal || '',
          location: data.location || '',
          social_links: data.social_links || ''
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update(profile).eq('id', user.id);
    if (error) {
      console.error('Profile update error', error);
      setError(error.message);
    } else {
      setError(null);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={profile.full_name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="education" className="block text-sm font-medium mb-1">Education / Bio</label>
          <textarea
            id="education"
            name="education"
            rows={3}
            value={profile.education}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">Role / Position</label>
          <input
            id="role"
            name="role"
            type="text"
            value={profile.role}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="career_goal" className="block text-sm font-medium mb-1">Career Goal</label>
          <input
            id="career_goal"
            name="career_goal"
            type="text"
            value={profile.career_goal}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={profile.location}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="social_links" className="block text-sm font-medium mb-1">Social Links (comma separated)</label>
          <input
            id="social_links"
            name="social_links"
            type="text"
            placeholder="https://linkedin.com/in/xyz, https://github.com/xyz"
            value={profile.social_links}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
