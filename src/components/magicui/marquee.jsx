import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

export const Marquee = ({ children, className, reverse = false, pauseOnHover = false, speed = 20, delay = 0 }) => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  const handleHoverStart = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      controls.stop();
    }
  };

  const handleHoverEnd = () => {
    if (pauseOnHover) {
      setIsPaused(false);
      controls.start({
        x: reverse ? "100%" : "-100%",
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }
      });
    }
  };

  React.useEffect(() => {
    const startAnimation = () => {
      console.log(`Starting marquee animation, reverse: ${reverse}, speed: ${speed}, delay: ${delay}`);
      controls.start({
        x: reverse ? "100%" : "-100%",
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }
      });
    };
    
    // Add delay to stagger different marquee instances
    const timer = setTimeout(startAnimation, 100 + delay);
    
    return () => {
      clearTimeout(timer);
      controls.stop();
    };
  }, [controls, reverse, speed, delay]);

  return (
    <div
      className={`flex overflow-hidden [--gap:1rem] ${className}`}
      style={{
        "--gap": "1rem",
        width: "100%",
      }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        className="flex min-w-full shrink-0 gap-[--gap]"
        animate={controls}
        style={{ width: 'max-content' }}
      >
        {children}
      </motion.div>
      <motion.div
        className="flex min-w-full shrink-0 gap-[--gap]"
        animate={controls}
        style={{ width: 'max-content' }}
      >
        {children}
      </motion.div>
    </div>
  );
};