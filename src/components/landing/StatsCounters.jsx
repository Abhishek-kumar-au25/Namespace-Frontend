import React, { useEffect, useRef, useState } from 'react';

const StatItem = ({ value, label }) => {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const target = Number(String(value).replace(/[^0-9]/g, '')) || 0;
    const duration = 1500;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, value]);

  const suffix = String(value).replace(/[0-9,]/g, '');

  return (
    <div ref={ref} className="text-center">
      <p className="stat-number text-3xl lg:text-4xl mb-1">
        {display.toLocaleString()}{suffix}
      </p>
      <p className="text-gray-500 text-xs">{label}</p>
    </div>
  );
};

const StatsCounters = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {stats.map((s, i) => (
        <StatItem key={i} value={s.number} label={s.label} />
      ))}
    </div>
  );
};

export default StatsCounters;
