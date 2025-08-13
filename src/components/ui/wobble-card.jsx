"use client";

import React, { useState, useRef, useEffect } from "react";

export const WobbleCard = ({ children, containerClassName, className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      return () => card.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Calculate wobble effect - translate and scale based on mouse position
  const translateX = (mousePosition.x / 300) * 8; // Subtle horizontal movement
  const translateY = (mousePosition.y / 300) * 8; // Subtle vertical movement
  const scale = isHovered ? 1.02 : 1; // Slight scale on hover

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl border border-white/20 p-8 ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
        transition: "transform 0.1s ease-out",
        cursor: "pointer",
      }}
    >
      <div className={`relative z-10 ${className}`}>{children}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
