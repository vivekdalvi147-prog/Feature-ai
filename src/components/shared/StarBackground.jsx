import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const StarBackground = () => {
  // Generate random stars once to prevent re-renders
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-cosmic-dark">
      {/* Deep Cosmic Gradient Layer */}
      <div className="absolute inset-0 bg-cosmic-gradient opacity-80" />
      
      {/* Twinkling Stars Layer */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.2 }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1] 
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)'
          }}
        />
      ))}

      {/* Subtle Nebulous Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-cyan/10 rounded-full blur-[100px]" />
    </div>
  );
};

export default StarBackground;
