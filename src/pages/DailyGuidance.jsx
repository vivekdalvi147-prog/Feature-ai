import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Sun, Moon, Compass, Zap, Share2, Sparkles, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';
import { getGeneralGuidance } from '../services/aiService';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const DailyGuidance = () => {
  const navigate = useNavigate();
  const { language, user } = useAppContext();
  const t = translations[language] || translations['en'];

  const [isLoading, setIsLoading] = useState(true);
  const [guidance, setGuidance] = useState('');
  const [error, setError] = useState(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;

    const fetchDailyGuidance = async () => {
      setIsLoading(true);
      setError(null);
      
      const date = new Date().toLocaleDateString();
      const prompt = `Provide today's personalized spiritual guidance for ${user.name}. 
      Current Date: ${date}. 
      The user was born on ${user.dob}. 
      Structure the output with:
      - **Today's Energy**: (A general vibe)
      - **Emotional Focus**: (What to feel)
      - **Embrace**: (Positive actions)
      - **Avoid**: (Potential pitfalls)
      - **Lucky Element**: (A color, stone, or symbol)
      Use a very calm, supportive, and spiritual tone.`;

      try {
        const response = await getGeneralGuidance(prompt, language, user);
        setGuidance(response);
        hasLoaded.current = true;
      } catch (err) {
        setError("The stars are occluded by clouds today. Please try again soon.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyGuidance();
  }, [language, user]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Today's Guidance for ${user.name}`,
        text: guidance.substring(0, 100) + "...",
        url: window.location.origin,
      });
    }
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
        <div className="text-center">
          <h1 className="text-xs font-bold text-white uppercase tracking-widest">{t.features.daily}</h1>
          <p className="text-[10px] text-neon-cyan font-bold uppercase tracking-tighter">
            {new Date().toLocaleDateString(language, { month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button onClick={handleShare} className="p-2 rounded-full bg-white/5 text-white/70">
          <Share2 size={20} />
        </button>
      </header>

      {/* Visual Header Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-40 rounded-[32px] overflow-hidden mb-8 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/40 via-cosmic-purple to-neon-cyan/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-2 text-yellow-400 opacity-80"
          >
            <Sun size={48} fill="currentColor" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-white">Daily Alignment</h2>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles size={12} className="text-neon-cyan" />
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Soul Clarity</span>
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      {isLoading ? (
        <div className="space-y-4">
          <Card className="h-64 flex flex-col items-center justify-center gap-4 border-dashed border-white/10">
            <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
            <p className="text-white/30 text-xs animate-pulse">Reading the celestial currents...</p>
          </Card>
        </div>
      ) : error ? (
        <Card className="text-center py-12">
          <p className="text-red-400 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} icon={RefreshCw}>Retry Connection</Button>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Content Card */}
          <Card variant="glow" className="mb-6">
            <div className="prose prose-invert max-w-none prose-sm">
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => (
                    <div className="flex items-center gap-2 mt-6 mb-2 text-neon-cyan border-b border-white/5 pb-2">
                      <Zap size={16} />
                      <h2 className="text-sm font-bold uppercase tracking-wider m-0" {...props} />
                    </div>
                  ),
                  p: ({node, ...props}) => <p className="text-white/70 leading-relaxed mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="text-white/60 mb-1" {...props} />,
                }}
              >
                {guidance}
              </ReactMarkdown>
            </div>
          </Card>

          {/* Icon Shortcut Grid for the day */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="flex items-center gap-3 py-4">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                <Compass size={20} />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase font-bold">Focus</p>
                <p className="text-xs text-white/80">Mindfulness</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 py-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                <Moon size={20} />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase font-bold">Energy</p>
                <p className="text-xs text-white/80">Reflective</p>
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Action Footer */}
      {!isLoading && (
        <div className="mt-10">
          <Button onClick={() => navigate('/home')} variant="secondary" fullWidth>
            Back to Sanctuary
          </Button>
        </div>
      )}
    </div>
  );
};

export default DailyGuidance;
