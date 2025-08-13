"use client";

import React, { useState } from "react";

export function AdvancedImageRipple({ 
  src, 
  alt = "Image", 
  className = "",
  width = 320,
  height = 320
}) {
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only create ripple every 100ms to avoid too many ripples
    const now = Date.now();
    if (ripples.length > 0 && now - ripples[ripples.length - 1].timestamp < 100) {
      return;
    }

    const newRipple = {
      id: now,
      x,
      y,
      timestamp: now
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div 
      className={`relative overflow-hidden cursor-pointer ${className}`} 
      style={{ width, height }}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-2xl"
      />
      
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            zIndex: 10
          }}
        >
          <div
            className="ripple-outer"
            style={{
              borderColor: '#f5a01b'
            }}
          />
          <div
            className="ripple-inner"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.6)'
            }}
          />
        </div>
      ))}

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .ripple-outer {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid;
            animation: ripple-outer 1s ease-out forwards;
          }
          
          .ripple-inner {
            position: absolute;
            inset: 8px;
            border-radius: 50%;
            border: 1px solid;
            animation: ripple-inner 1s ease-out forwards;
          }
          
          @keyframes ripple-outer {
            0% {
              transform: scale(0);
              opacity: 1;
              border-width: 3px;
            }
            100% {
              transform: scale(4);
              opacity: 0;
              border-width: 1px;
            }
          }
          
          @keyframes ripple-inner {
            0% {
              transform: scale(0);
              opacity: 1;
              border-width: 1px;
            }
            100% {
              transform: scale(3.2);
              opacity: 0;
              border-width: 0.5px;
            }
          }
        `
      }} />
    </div>
  );
}

export default AdvancedImageRipple;
