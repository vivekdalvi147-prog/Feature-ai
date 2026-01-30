import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import Button from '../components/ui/Button';

const Onboarding = () => {
  const navigate = useNavigate();
  const { language, completeOnboarding } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);

  const t = translations[language] || translations['en'];
  const steps = t.onboarding;

  // Visual icons for each slide
  const icons = ["ðŸ– ", "ðŸƒ ", "âœ¨"];
  const colors = ["text-neon-cyan", "text-neon-purple", "text-yellow-400"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
      navigate('/profile-setup');
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between py-12 px-6 overflow-hidden">
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((_, index) => (
          <div 
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentStep ? "w-8 bg-neon-cyan" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="relative flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center w-full"
          >
            {/* Animated Icon Container */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`text-8xl mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
            >
              <div className={colors[currentStep]}>{icons[currentStep]}</div>
            </motion.div>

            <h2 className="text-4xl font-display font-bold text-white mb-6 leading-tight">
              {steps[currentStep].title}
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed px-4">
              {steps[currentStep].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Footer */}
      <div className="mt-8">
        <Button 
          onClick={handleNext}
          className="shadow-2xl"
        >
          {currentStep === steps.length - 1 ? t.getStarted : t.next}
        </Button>
        
        {/* Skip option (only on first/second slides) */}
        {currentStep < steps.length - 1 && (
          <button 
            onClick={() => {
              completeOnboarding();
              navigate('/profile-setup');
            }}
            className="w-full text-center mt-6 text-white/30 text-sm uppercase tracking-widest font-medium"
          >
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
