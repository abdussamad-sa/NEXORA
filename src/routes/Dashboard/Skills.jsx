import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const Skills = () => {
  const { skills, createSkill, updateSkill, deleteSkill, loading } = useData();
  const [newSkill, setNewSkill] = useState({ name: '', level: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', level: 0 });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      await createSkill({ ...newSkill, updated_at: new Date().toISOString() });
      setNewSkill({ name: '', level: 0 });
    } catch (err) {
      console.error('Add skill error', err);
    }
  };

  const startEdit = (skill) => {
    setEditingId(skill.id);
    setEditValues({ name: skill.name, level: skill.level });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateSkill(editingId, { ...editValues, updated_at: new Date().toISOString() });
      setEditingId(null);
    } catch (err) {
      console.error('Update skill error', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete skill?')) {
      try {
        await deleteSkill(id);
      } catch (err) {
        console.error('Delete skill error', err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading skills...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Skills</h2>
      {/* Add New Skill */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-800 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Skill name"
          className="col-span-2 p-2 rounded bg-gray-700 text-white"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Level (0-100)"
          min="0"
          max="100"
          className="col-span-1 p-2 rounded bg-gray-700 text-white"
          value={newSkill.level}
          onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
        />
        <button type="submit" className="col-span-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded">
          Add Skill
        </button>
      </form>

      {/* Skill List */}
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 bg-gray-800 rounded-lg shadow flex items-center justify-between">
            {editingId === skill.id ? (
              <form onSubmit={handleEdit} className="flex-1 space-x-2">
                <input
                  type="text"
                  className="p-1 rounded bg-gray-700 text-white mr-2"
                  value={editValues.name}
                  onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="p-1 rounded bg-gray-700 text-white mr-2"
                  value={editValues.level}
                  onChange={(e) => setEditValues({ ...editValues, level: Number(e.target.value) })}
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
                <p className="font-medium">{skill.name}</p>
                <p className="text-sm text-gray-400">Level: {skill.level}</p>
              </div>
            )}
            {editingId !== skill.id && (
              <div className="flex space-x-2">
                <button onClick={() => startEdit(skill)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(skill.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
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

export default Skills;
