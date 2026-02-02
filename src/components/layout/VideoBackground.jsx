import React, { useEffect, useState } from "react";

const VideoBackground = ({ src = "/assets/138556-769988117.mp4", poster = "", className = "", overlay = true }) => {
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

  // If user prefers reduced motion, don't autoplay the video; render poster or nothing
  if (reduceMotion) {
    return poster ? (
      <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <img src={poster} alt="" className="w-full h-full object-cover" />
        {overlay && <div className="absolute inset-0 bg-black/30" />}
      </div>
    ) : null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />}
    </div>
  );
};

export default VideoBackground;
