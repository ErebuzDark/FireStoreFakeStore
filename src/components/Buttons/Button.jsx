import React from 'react';

const Button = ({ children, color = "hell", size = "medium", icon = null, disabled = false, onClick }) => {
  const baseStyles = `flex h-fit px-4 py-2 items-center font-semibold rounded-lg focus:outline-none`;

  const colorClasses = {
    common: "bg-white border border-slate-300 hover:bg-slate-100 text-slate-700",
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-400 text-white",
    gray: "bg-gray-500 hover:bg-gray-600 text-white",
    amberDark: "bg-amber-950 hover:bg-amber-700 text-white",
  };
  
  const sizeClasses = {
    xs: "text-xs !p-1",
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${colorClasses[color]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${icon ? 'gap-2' : '' }`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className='text-xl'>{icon}</p>
      {children}
    </button>
  );
}

export default Button;