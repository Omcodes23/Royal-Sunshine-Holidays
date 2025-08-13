"use client";

import { useEffect, useState } from "react";

export const TextGenerateEffect = ({ words }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + words[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words]);

  return (
    <div className="text-center">
      <p className="text-white text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};
