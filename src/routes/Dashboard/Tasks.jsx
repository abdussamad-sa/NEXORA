import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const Tasks = () => {
  const { tasks, createTask, updateTask, deleteTask, loading } = useData();
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ title: '', description: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    try {
      await createTask({ ...newTask, created_at: new Date().toISOString(), completed: false });
      setNewTask({ title: '', description: '' });
    } catch (err) {
      console.error('Add task error', err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValues({ title: task.title, description: task.description || '' });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(editingId, editValues);
      setEditingId(null);
    } catch (err) {
      console.error('Update task error', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete task?')) {
      try {
        await deleteTask(id);
      } catch (err) {
        console.error('Delete task error', err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading tasks...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tasks</h2>
      {/* Add new task */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Task title"
          className="col-span-1 p-2 rounded bg-gray-700 text-white"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="col-span-1 p-2 rounded bg-gray-700 text-white"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button type="submit" className="col-span-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded">
          Add Task
        </button>
      </form>

      {/* Task list */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-gray-800 rounded-lg shadow flex items-center justify-between">
            {editingId === task.id ? (
              <form onSubmit={handleEdit} className="flex-1 space-x-2">
                <input
                  type="text"
                  className="p-1 rounded bg-gray-700 text-white mr-2"
                  value={editValues.title}
                  onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
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
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-400">{task.description}</p>
                <p className="text-xs text-gray-500">Created: {new Date(task.created_at).toLocaleDateString()}</p>
                {task.completed && <span className="text-green-400 text-sm ml-2">✓ Completed</span>}
              </div>
            )}
            {editingId !== task.id && (
              <div className="flex space-x-2">
                <button onClick={() => startEdit(task)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(task.id)} className="bg-red-500 hover:bg-red-6 00 text-white px-3 py-1 rounded">
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

export default Tasks;
