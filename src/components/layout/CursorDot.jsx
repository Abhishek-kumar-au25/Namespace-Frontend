import React, { useEffect, useRef, useState } from "react";

const CursorDot = () => {
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Show dot after a short delay
    const showTimeout = setTimeout(() => setIsVisible(true), 500);

    return () => {
      clearTimeout(showTimeout);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`cursor-dot ${isVisible ? "visible" : ""}`}
      data-testid="cursor-dot"
    />
  );
};

export default CursorDot;
