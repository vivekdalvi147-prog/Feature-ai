import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles, Layers, History } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { tarotSpreads } from '../data/tarotData';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const TarotDeck = () => {
  const navigate = useNavigate();
  const { language } = useAppContext();
  const t = translations[language] || translations['en'];

  const handleSelectSpread = (spread) => {
    // Navigate to the reading page with spread details in state
    navigate('/tarot-reading', { state: { spread } });
  };

  return (
    <div className="min-h-screen pb-12 pt-6 px-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 rounded-full bg-white/5 text-white/70"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white font-display uppercase tracking-widest">
          {t.tarotTitle}
        </h1>
        <div className="w-10" /> {/* Spacer for symmetry */}
      </header>

      {/* Intro Section */}
      <div className="text-center mb-10">
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-neon-purple/20 border border-neon-purple/30 mb-6 shadow-[0_0_30px_rgba(188,19,254,0.2)]"
        >
          <Layers size={36} className="text-neon-purple" />
        </motion.div>
        <h2 className="text-2xl font-display font-bold text-white mb-3">
          Select Your Spread
        </h2>
        <p className="text-white/50 text-sm px-6">
          The cards respond to your intent. Choose a spread that matches your current inquiry.
        </p>
      </div>

      {/* Spread Selection List */}
      <div className="space-y-4 mb-10">
        {tarotSpreads.map((spread, index) => (
          <motion.div
            key={spread.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              variant="interactive"
              onClick={() => handleSelectSpread(spread)}
              className="flex items-center justify-between p-6 group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group-hover:border-neon-purple/50 transition-all">
                  <span className="text-xl font-bold text-neon-purple">{spread.cards}</span>
                  <span className="text-[8px] uppercase tracking-tighter text-white/40">Cards</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors">
                    {spread.name}
                  </h3>
                  <p className="text-xs text-white/40">
                    {spread.cards === 1 ? 'Quick daily insight' : 'Deep spiritual path analysis'}
                  </p>
                </div>
              </div>
              <ChevronLeft className="rotate-180 text-white/20 group-hover:text-neon-purple" size={20} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Readings Access */}
      <Card variant="default" className="bg-white/5 border-dashed border-white/10 text-center py-6">
        <div className="flex flex-col items-center gap-2">
          <History size={20} className="text-white/20" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
            Looking for history?
          </span>
          <p className="text-xs text-white/50 px-8 mb-4">
            You can view your past readings in the Archive (Settings).
          </p>
          <Button 
            variant="ghost" 
            fullWidth={false} 
            className="text-xs py-2 px-6"
            onClick={() => navigate('/settings')}
          >
            Go to Archive
          </Button>
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="mt-10 flex items-center justify-center gap-2 text-white/20">
        <Sparkles size={12} />
        <span className="text-[9px] uppercase tracking-widest">Divine Energy Flowing</span>
      </div>
    </div>
  );
};

export default TarotDeck;
