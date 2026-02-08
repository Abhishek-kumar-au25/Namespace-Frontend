import React, { useMemo } from "react";

const ParticleDots = ({ count = 25 }) => {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
      })),
    [count],
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="particle-dot"
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.animationDelay,
            animationDuration: dot.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleDots;
