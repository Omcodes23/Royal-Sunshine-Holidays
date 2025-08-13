"use client";

import React, { useState, useRef, useEffect } from "react";

export const CometCard = ({ 
  children, 
  className = "", 
  rotateDepth = 17.5, 
  translateDepth = 20 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXFromCenter = e.clientX - centerX;
    const mouseYFromCenter = e.clientY - centerY;
    
    // Debug logging
    console.log('CometCard Mouse Move:', { mouseXFromCenter, mouseYFromCenter });
    
    setMousePosition({
      x: mouseXFromCenter,
      y: mouseYFromCenter
    });
  };

  const handleMouseEnter = () => {
    console.log('CometCard Mouse Enter');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log('CometCard Mouse Leave');
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate rotation and translation based on mouse position
  const rotateX = isHovered ? (mousePosition.y / 100) * rotateDepth : 0;
  const rotateY = isHovered ? (-mousePosition.x / 100) * rotateDepth : 0;
  const translateX = isHovered ? (mousePosition.x / 100) * translateDepth : 0;
  const translateY = isHovered ? (mousePosition.y / 100) * translateDepth : 0;

  // Debug logging for transform values
  useEffect(() => {
    if (isHovered) {
      console.log('CometCard Transform:', { rotateX, rotateY, translateX, translateY });
    }
  }, [rotateX, rotateY, translateX, translateY, isHovered]);

  return (
    <div 
      ref={cardRef}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`,
        transition: isHovered ? "none" : "transform 0.3s ease-out"
      }}
    >
      {children}
    </div>
  );
};
