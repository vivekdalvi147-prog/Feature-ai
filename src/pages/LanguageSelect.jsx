import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { setLanguage } = useAppContext();
  const [selected, setSelected] = useState('en');

  // Supported Languages Configuration
  const languageOptions = [
    { code: 'en', label: 'English', native: 'English', flag: 'ðŸ‡ºðŸ‡¸' },
    { code: 'hi', label: 'Hindi', native: 'à¤¹à¤¿à¤¨à¥ à¤¦à¥€', flag: 'ðŸ‡®ðŸ‡³' },
    { code: 'es', label: 'Spanish', native: 'EspaÃ±ol', flag: 'ðŸ‡ªðŸ‡¸' },
    { code: 'fr', label: 'French', native: 'FranÃ§ais', flag: 'ðŸ‡«ðŸ‡·' },
    { code: 'it', label: 'Italian', native: 'Italiano', flag: 'ðŸ‡®ðŸ‡¹' },
    { code: 'ko', label: 'Korean', native: 'í•œêµì–´', flag: 'ðŸ‡°ðŸ‡·' },
  ];

  const handleConfirm = () => {
    setLanguage(selected);
    // After selecting language, we move to the onboarding slides
    navigate('/onboarding');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col py-12 px-4">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 mb-4">
          <Globe className="text-neon-cyan" size={32} />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          Choose Language
        </h2>
        <p className="text-white/50 text-sm">
          Select your preferred language for guidance
        </p>
      </motion.div>

      {/* Language Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 mb-24"
      >
        {languageOptions.map((lang) => (
          <motion.div key={lang.code} variants={itemVariants}>
            <Card
              onClick={() => setSelected(lang.code)}
              variant={selected === lang.code ? 'glow' : 'default'}
              className={`relative py-4 transition-all duration-300 ${
                selected === lang.code 
                ? 'border-neon-cyan/50 bg-neon-cyan/5' 
                : 'border-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className="font-bold text-white">{lang.label}</p>
                    <p className="text-xs text-white/40">{lang.native}</p>
                  </div>
                </div>
                
                {selected === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-neon-cyan"
                  >
                    <CheckCircle2 size={24} fill="currentColor" className="text-cosmic-dark" />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Persistent Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cosmic-dark via-cosmic-dark/90 to-transparent">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleConfirm}
            className="shadow-[0_0_30px_rgba(0,242,255,0.3)]"
          >
            {translations[selected]?.confirm || "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
