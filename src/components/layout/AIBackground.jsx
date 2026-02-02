import React, { useEffect, useState } from "react";

const AIBackground = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduceMotion(media.matches);
    handler();
    if (media.addEventListener) media.addEventListener("change", handler);
    else media.addListener(handler);

    return () => {
      if (media.removeEventListener) media.removeEventListener("change", handler);
      else media.removeListener(handler);
    };
  }, []);

  if (reduceMotion) {
    // Respect user preference — do not render heavy animations
    return <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Soft moving gradient blobs */}
      <div
        className="absolute -left-40 -top-40 rounded-full"
        style={{
          width: 680,
          height: 680,
          background: "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.55), rgba(99,102,241,0.35) 30%, rgba(59,130,246,0.08) 60%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.22,
          transform: "translate3d(0,0,0)",
          animation: "blob 14s ease-in-out infinite",
        }}
      />

      <div
        className="absolute -right-40 -bottom-36 rounded-full"
        style={{
          width: 540,
          height: 540,
          background: "radial-gradient(circle at 80% 80%, rgba(14,165,233,0.45), rgba(99,102,241,0.18) 30%, rgba(139,92,246,0.06) 60%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.18,
          transform: "translate3d(0,0,0)",
          animation: "blob 18s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />

      {/* Subtle overlay to tint and blend with content */}
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.04 }} />

      {/* Small drifting particles (CSS-based) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 6 + (i % 4) * 2,
              height: 6 + (i % 4) * 2,
              background: "rgba(255,255,255,0.03)",
              position: "absolute",
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              transform: "translate3d(0,0,0)",
              animation: `float ${6 + (i % 6)}s ease-in-out ${i % 3}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(30px,-20px,0) scale(1.05); }
          66% { transform: translate3d(-20px,20px,0) scale(0.95); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }

        @keyframes float {
          0% { transform: translate3d(0,0,0) translateY(0); opacity: 0.9; }
          50% { transform: translate3d(6px,-12px,0) translateY(-8px); opacity: 0.6; }
          100% { transform: translate3d(0,0,0) translateY(0); opacity: 0.9; }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .float { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AIBackground;
