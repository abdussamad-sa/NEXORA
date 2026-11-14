import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Folder, ListTodo, SquareUser, BarChart2, Settings, LogOut, TrendingUp } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Overview', icon: Home },
  { to: '/projects', label: 'Projects', icon: Folder },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/skills', label: 'Skills', icon: TrendingUp },
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/profile', label: 'Profile', icon: SquareUser },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ onLogout }) => (
  <nav className="flex flex-col h-full p-4 bg-card w-64 md:w-56">
    <div className="flex-1 space-y-2">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive ? 'bg-accent text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <Icon className="mr-2 h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </div>
    <button
      onClick={onLogout}
      className="flex items-center px-3 py-2 mt-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
    >
      <LogOut className="mr-2 h-5 w-5" />
      Logout
    </button>
  </nav>
);

export default Sidebar;
