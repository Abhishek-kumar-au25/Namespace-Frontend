import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const HeroAnimated = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: ['#7C3AED', '#A855F7', '#E879F9'] },
      shape: { type: 'circle' },
      opacity: { value: 0.6, random: { enable: true, minimumValue: 0.2 } },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 0.8, direction: 'none', outMode: 'out' },
      links: { enable: true, distance: 120, color: '#7C3AED', opacity: 0.15, width: 1 },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: false } },
      modes: { repulse: { distance: 80 } },
    },
    detectRetina: true,
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles init={particlesInit} options={options} />
    </div>
  );
};

export default HeroAnimated;
