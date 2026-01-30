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

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className, 
  isLoading = false, 
  disabled = false,
  icon: Icon,
  fullWidth = true 
}) => {
  
  // Base Styles
  const baseStyles = "relative flex items-center justify-center gap-2 px-6 py-4 rounded-[28px] font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden";
  
  // Variant Styles
  const variants = {
    primary: "bg-neon-cyan text-cosmic-dark shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:shadow-[0_0_30px_rgba(0,242,255,0.6)]",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
    outline: "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        baseStyles, 
        variants[variant], 
        fullWidth ? "w-full" : "w-auto",
        className
      )}
    >
      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Please wait...</span>
        </div>
      ) : (
        <>
          {Icon && <Icon size={20} className={cn(variant === 'primary' ? "text-cosmic-dark" : "text-neon-cyan")} />}
          {children}
        </>
      )}

      {/* Subtle Inner Glow for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
      )}
    </motion.button>
  );
};

export default Button;
