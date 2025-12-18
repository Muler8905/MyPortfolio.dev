import React, { useEffect, useState } from 'react';

const StarBackground: React.FC = () => {
  const [stars, setStars] = useState<{
    id: number;
    top: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
  }[]>([]);

  useEffect(() => {
    // Generate stars only on client side to avoid hydration mismatch
    const count = 50; // Decreased count for a cleaner look
    const newStars = [];
    
    // Palette based on the site's main gradient: Violet, Purple, Pink, Cyan, Blue
    const colorClasses = [
      'bg-violet-500',
      'bg-violet-400',
      'bg-purple-500', 
      'bg-fuchsia-400',
      'bg-pink-500',
      'bg-cyan-400',
      'bg-blue-400',
      'bg-white' // Adding some white for classic star look
    ];

    for (let i = 0; i < count; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1, // 1px to 3px
        duration: Math.random() * 3 + 2, // 2s to 5s duration
        delay: Math.random() * 5,
        color: colorClasses[Math.floor(Math.random() * colorClasses.length)],
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-twinkle ${star.color}`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size + 1}px currentColor` // Glow effect
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;