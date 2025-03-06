import React, { useEffect, useRef } from 'react';

export function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 10-30px for scribble-like particles
      const size = Math.random() * 20 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size / 4}px`;
      
      // Random rotation
      const rotation = Math.random() * 360;
      particle.style.setProperty('--rotation', `${rotation}deg`);
      
      // Random horizontal position
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random animation duration between 15-25s
      particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
      
      container.appendChild(particle);

      // Remove particle after animation
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    };

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }

    // Create new particles periodically
    const interval = setInterval(createParticle, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div ref={containerRef} className="particles" />
      <div className="line-animation">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="line"
            style={{
              top: `${25 + i * 25}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="scribble"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            animationDelay: `${i * 5}s`,
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10,50 Q30,30 50,50 T90,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      ))}
    </>
  );
}