import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles, RotateCcw, Home, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';
import { getGeneralGuidance } from '../services/aiService';
import { tarotDeck } from '../data/tarotData';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const TarotReading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, user, saveReading } = useAppContext();
  const t = translations[language] || translations['en'];

  // Spread config from location state
  const spread = location.state?.spread || { id: 'single', name: 'Daily Draw', cards: 1 };

  // States
  const [selectedCards, setSelectedCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Logic to handle card selection
  const handleSelectCard = (index) => {
    if (selectedCards.length < spread.cards && !selectedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
    }
  };

  // 2. Logic to trigger AI Reading
  const getInterpretation = async () => {
    setIsFlipped(true);
    setIsLoading(true);
    
    // Map selected indices to actual card objects
    const pickedCards = selectedCards.map(idx => tarotDeck[idx % tarotDeck.length]);
    const cardNames = pickedCards.map(c => c.name).join(', ');
    
    const prompt = `Perform a ${spread.name} tarot reading. The user has drawn the following cards: ${cardNames}. 
    Provide a deep, poetic, and spiritual interpretation for each card and how they relate to the user's path.`;

    try {
      const response = await getGeneralGuidance(prompt, language, user);
      setReading(response);
      saveReading('tarot', { spread: spread.name, cards: cardNames, text: response });
    } catch (error) {
      setReading("The cards are silent for now. Perhaps the energy is too heavy. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/tarot')} className="p-2 rounded-full bg-white/5 text-white/70">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-white uppercase tracking-widest">{spread.name}</h1>
          <p className="text-[10px] text-neon-purple font-bold">
            {selectedCards.length} / {spread.cards} Cards Selected
          </p>
        </div>
        <button onClick={() => window.location.reload()} className="p-2 rounded-full bg-white/5 text-white/70">
          <RotateCcw size={20} />
        </button>
      </header>

      {!isFlipped ? (
        /* PHASE 1: CARD SELECTION */
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-display text-white mb-8 text-center">{t.tarotPick}</h2>
          
          {/* Visual Deck Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-12">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSelectCard(i)}
                className={`aspect-[2/3] rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center overflow-hidden
                  ${selectedCards.includes(i) 
                    ? 'border-neon-purple bg-neon-purple/20 shadow-[0_0_15px_rgba(188,19,254,0.5)]' 
                    : 'border-white/10 bg-white/5'
                  }`}
              >
                <div className="text-neon-purple/30 font-display text-2xl tracking-tighter">ðŸƒ </div>
              </motion.div>
            ))}
          </div>

          <Button 
            disabled={selectedCards.length < spread.cards}
            onClick={getInterpretation}
            className="shadow-neon-purple/20"
          >
            {t.tarotReveal}
          </Button>
        </div>
      ) : (
        /* PHASE 2: REVEAL & INTERPRETATION */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          
          {/* Flipped Cards Display */}
          <div className="flex justify-center gap-4 flex-wrap">
            {selectedCards.map((idx, i) => {
              const card = tarotDeck[idx % tarotDeck.length];
              return (
                <motion.div
                  key={i}
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="w-24 aspect-[2/3] relative preserve-3d"
                >
                  <Card className="absolute inset-0 p-1 flex flex-col items-center justify-between bg-white/10 border-neon-purple/40">
                    <div className="text-[8px] uppercase text-white/40 font-bold">{card.keyword}</div>
                    <span className="text-3xl">ðŸƒ </span>
                    <div className="text-[9px] text-center font-bold text-white leading-tight">{card.name}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* AI Result */}
          <Card variant="glow" className="min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-2 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white/40 text-xs animate-pulse">The spirits are whispering...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none prose-sm">
                <ReactMarkdown>{reading}</ReactMarkdown>
              </div>
            )}
          </Card>

          <div className="flex gap-4">
            <Button variant="secondary" icon={Home} onClick={() => navigate('/home')}>Home</Button>
            <Button icon={Share2} onClick={() => {}}>Share Reading</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TarotReading;
