import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes safely
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Card = ({ 
  children, 
  className, 
  onClick, 
  variant = 'default', // 'default', 'glow', 'interactive'
  animate = true,
  delay = 0
}) => {
  
  const baseStyles = "relative rounded-[28px] p-5 backdrop-blur-xl border border-white/10 overflow-hidden";
  
  const variants = {
    default: "bg-white/5 shadow-xl",
    glow: "bg-white/10 shadow-[0_0_30px_rgba(188,19,254,0.15)] border-white/20",
    interactive: "bg-white/5 hover:bg-white/10 transition-colors duration-300 cursor-pointer border-white/10 hover:border-neon-cyan/30"
  };

  const Component = onClick ? motion.div : motion.div;

  return (
    <Component
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5, delay: delay }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {/* Subtle Background Inner Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Decorative Border Light (Only for 'glow' variant) */}
      {variant === 'glow' && (
        <div className="absolute -inset-[1px] bg-gradient-to-tr from-neon-cyan/20 via-transparent to-neon-purple/20 rounded-[28px] pointer-events-none" />
      )}
    </Component>
  );
};

export default Card;
