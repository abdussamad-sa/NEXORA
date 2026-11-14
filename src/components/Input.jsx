import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  type = 'text',
  name,
  placeholder = '',
  value,
  onChange,
  required = false,
  className = '',
  showToggle = false,
}) => {
  const [visible, setVisible] = useState(false);

  const inputType = showToggle && type === 'password' ? (visible ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-300">
          {label}{required && '*'}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-md bg-card px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-400"
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
