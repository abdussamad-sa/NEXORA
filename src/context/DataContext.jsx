import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Create a context for data (projects, tasks, skills)
const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to fetch data for the current user
  const fetchData = async () => {
    setLoading(true);
    const user = supabase.auth.user();
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const [{ data: projData }, { data: taskData }, { data: skillData }, { data: activityData }] = await Promise.all([
        supabase.from('projects').select('*'),
        supabase.from('tasks').select('*'),
        supabase.from('skills').select('*'),
        supabase.from('activities').select('*'),
      ]);
      setProjects(projData || []);
      setTasks(taskData || []);
      setSkills(skillData || []);
      setActivities(activityData || []);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch & re-fetch on auth changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchData();
      } else {
        setProjects([]);
        setTasks([]);
        setSkills([]);
        setActivities([]);
      }
    });
    // Also fetch once on mount if already logged in
    if (supabase.auth.user()) {
      fetchData();
    }
    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);






  // CRUD helpers ----------------------------------------------------------
  const createProject = async (payload) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('projects').insert({ ...payload, user_id: user?.id }).single();
    if (error) throw error;
    setProjects((prev) => [...prev, data]);
    return data;
  };

  const updateProject = async (id, updates) => {
    const { data, error } = await supabase.from('projects').update(updates).eq('id', id).single();
    if (error) throw error;
    setProjects((prev) => prev.map((p) => (p.id === id ? data : p)));
    return data;
  };

  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const createTask = async (payload) => {
    const { data, error } = await supabase.from('tasks').insert(payload).single();
    if (error) throw error;
    setTasks((prev) => [...prev, data]);
    return data;
  };

  const updateTask = async (id, updates) => {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).single();
    if (error) throw error;
    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    return data;
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const createSkill = async (payload) => {
    const { data, error } = await supabase.from('skills').insert(payload).single();
    if (error) throw error;
    setSkills((prev) => [...prev, data]);
    return data;
  };

  const updateSkill = async (id, updates) => {
    const { data, error } = await supabase.from('skills').update(updates).eq('id', id).single();
    if (error) throw error;
    setSkills((prev) => prev.map((s) => (s.id === id ? data : s)));
    return data;
  };

  const deleteSkill = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const value = {
    projects,
    tasks,
    skills,
    activities,
    loading,
    error,
    refresh: fetchData,
    // CRUD functions
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
    createSkill,
    updateSkill,
    deleteSkill,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
