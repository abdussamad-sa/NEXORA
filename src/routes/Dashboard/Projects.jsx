import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
// Simple date formatting without extra library

const Projects = () => {
  const { projects, createProject, updateProject, deleteProject, loading } = useData();
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', description: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newProject.name) return;
    try {
      await createProject({ ...newProject, created_at: new Date().toISOString() });
      setNewProject({ name: '', description: '' });
    } catch (err) {
      console.error('Add project error', err);
    }
  };

  const startEdit = (proj) => {
    setEditingId(proj.id);
    setEditValues({ name: proj.name, description: proj.description || '' });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(editingId, editValues);
      setEditingId(null);
    } catch (err) {
      console.error('Update project error', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete project?')) {
      try {
        await deleteProject(id);
      } catch (err) {
        console.error('Delete project error', err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Projects</h2>
      {/* Add new project */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Project name"
          className="col-span-1 p-2 rounded bg-gray-700 text-white"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="col-span-1 p-2 rounded bg-gray-700 text-white"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <button type="submit" className="col-span-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded">
          Add Project
        </button>
      </form>

      {/* Project list */}
      <div className="space-y-4">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 bg-gray-800 rounded-lg shadow flex items-center justify-between">
            {editingId === proj.id ? (
              <form onSubmit={handleEdit} className="flex-1 space-x-2">
                <input
                  type="text"
                  className="p-1 rounded bg-gray-700 text-white mr-2"
                  value={editValues.name}
                  onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                />
                <input
                  type="text"
                  className="p-1 rounded bg-gray-700 text-white mr-2"
                  value={editValues.description}
                  onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                />
                <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded mr-2">
                  Save
                </button>
                <button type="button" onClick={() => setEditingId(null)} className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded">
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex-1">
                <p className="font-medium">{proj.name}</p>
                <p className="text-sm text-gray-400">{proj.description}</p>
                <p className="text-xs text-gray-500">Created: {new Date(proj.created_at).toLocaleDateString()}</p>
              </div>
            )}
            {editingId !== proj.id && (
              <div className="flex space-x-2">
                <button onClick={() => startEdit(proj)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(proj.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
