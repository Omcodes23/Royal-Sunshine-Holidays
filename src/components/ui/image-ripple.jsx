"use client";

import React, { useState, useEffect, useRef } from "react";

export function ImageRipple({ 
  src, 
  alt = "Image", 
  className = "",
  width = 320,
  height = 320,
  rippleColor = "#f5a01b",
  rippleSize = 60,
  rippleDuration = 1000,
  rippleSpacing = 50
}) {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);
  const lastRippleTime = useRef(0);

  const handleMouseMove = (e) => {
    const now = Date.now();
    
    // Throttle ripples to avoid too many
    if (now - lastRippleTime.current < rippleSpacing) {
      return;
    }
    
    lastRippleTime.current = now;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
    }, rippleDuration);
  };

  const handleMouseLeave = () => {
    // Clear all ripples when mouse leaves
    setRipples([]);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer ${className}`} 
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
            left: ripple.x - rippleSize / 2,
            top: ripple.y - rippleSize / 2,
            width: rippleSize,
            height: rippleSize,
            zIndex: 10
          }}
        >
          <div
            className="ripple-wave"
            style={{
              borderColor: rippleColor
            }}
          />
          <div
            className="ripple-glow"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.6)'
            }}
          />
        </div>
      ))}

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .ripple-wave {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid;
            animation: ripple-wave ${rippleDuration}ms ease-out forwards;
          }
          
          .ripple-glow {
            position: absolute;
            inset: 8px;
            border-radius: 50%;
            border: 1px solid;
            animation: ripple-glow ${rippleDuration}ms ease-out forwards;
          }
          
          @keyframes ripple-wave {
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
          
          @keyframes ripple-glow {
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

export default ImageRipple;
