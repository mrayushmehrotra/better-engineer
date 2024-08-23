"use client";

import { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";

const Typed = () => {
  // Create a ref to attach to the typewriter DOM element
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Typewriter when the component is mounted
    if (typewriterRef.current) {
      new Typewriter(typewriterRef.current, {
        strings: ["Engineer", "Friend", "Companion"],
        autoStart: true,
        loop: true, // This ensures the typewriter effect loops indefinitely
        delay: 75, // Adjust typing speed (optional)
        deleteSpeed: 30, // Adjust deletion speed (optional)
        pauseFor: 1000, // Pause before typing the next string (optional)
      });
    }
  }, []); // Empty dependency array to run effect only once on mount

  return <div ref={typewriterRef} id="typewriter" />;
};

export default Typed;
