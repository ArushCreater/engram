"use client";

import React, { useState } from 'react';

interface AnimatedSwitchProps {
  label?: string;
  initialState?: boolean;
  onChange?: (isOn: boolean) => void;
}

export function AnimatedSwitch({ 
  label, 
  initialState = false, 
  onChange 
}: AnimatedSwitchProps) {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {label && (
        <span className="text-sm text-white/80">{label}</span>
      )}
      
      <button 
        role="switch"
        aria-checked={isOn}
        onClick={handleToggle}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0f19] rounded-full"
      >
        <div className={`switch-track ${isOn ? 'active' : ''}`}>
          <div className="switch-thumb"></div>
          
          {/* Ripple effect when clicked */}
          <div className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
          </div>
        </div>
      </button>
      
      <span className="text-sm text-white/80">
        {isOn ? 'On' : 'Off'}
      </span>
    </div>
  );
}
