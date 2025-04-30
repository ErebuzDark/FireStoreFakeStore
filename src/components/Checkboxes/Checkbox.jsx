import React from 'react';

const Checkbox = ({ label, onChange, checked }) => {
  return (
    <div className={`flex items-center ${label ? 'gap-2' : ''}`}>
        <input onChange={onChange} checked={checked} type="checkbox" className='size-5 checked:accent-amber-900'/>
        <span className="text-gray-700">{label}</span>
    </div>
  );
}

export default Checkbox;
