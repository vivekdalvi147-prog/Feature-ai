import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Hands } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-transition to language selection after 3.5 seconds
    const timer = setTimeout(() => {
      navigate('/language');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Central Animated Logo Container */}
      <div className="relative flex flex-col items-center">
        
        {/* Pulsating Glow Effect behind Logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-40 h-40 bg-neon-cyan/20 blur-[60px] rounded-full"
        />

        {/* The Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center mb-6 shadow-2xl"
        >
          {/* We use Hands icon as a symbol for Palmistry */}
          <Sparkles className="absolute top-2 right-2 text-neon-cyan animate-pulse" size={20} />
          <motion.div
             animate={{ rotate: [0, 5, -5, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-5xl">ðŸ– </span>
          </motion.div>
        </motion.div>

        {/* App Name with Premium Typography */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-display font-bold tracking-widest text-white mb-2">
            FUTURE <span className="text-neon-cyan">AI</span>
          </h1>
          <p className="text-white/60 text-sm tracking-[0.3em] uppercase font-light">
            Divine Guidance
          </p>
        </motion.div>
      </div>

      {/* Bottom Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 flex flex-col items-center"
      >
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          />
        </div>
        <span className="mt-4 text-[10px] text-white/30 uppercase tracking-widest animate-pulse">
          Connecting with the cosmos
        </span>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
