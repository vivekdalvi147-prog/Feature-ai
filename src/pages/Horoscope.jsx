import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Share2, Sparkles, Star, Heart, Briefcase, Smile } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';
import { getGeneralGuidance } from '../services/aiService';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const zodiacSigns = [
  { name: 'Aries', icon: 'â™ˆï¸ ', dates: 'Mar 21 - Apr 19' },
  { name: 'Taurus', icon: 'â™‰ï¸ ', dates: 'Apr 20 - May 20' },
  { name: 'Gemini', icon: 'â™Šï¸ ', dates: 'May 21 - Jun 20' },
  { name: 'Cancer', icon: 'â™‹ï¸ ', dates: 'Jun 21 - Jul 22' },
  { name: 'Leo', icon: 'â™Œï¸ ', dates: 'Jul 23 - Aug 22' },
  { name: 'Virgo', icon: 'â™ ï¸ ', dates: 'Aug 23 - Sep 22' },
  { name: 'Libra', icon: 'â™Žï¸ ', dates: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', icon: 'â™ ï¸ ', dates: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', icon: 'â™ ï¸ ', dates: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', icon: 'â™‘ï¸ ', dates: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', icon: 'â™’ï¸ ', dates: 'Jan 20 - Feb 18' },
  { name: 'Pisces', icon: 'â™“ï¸ ', dates: 'Feb 19 - Mar 20' },
];

const Horoscope = () => {
  const navigate = useNavigate();
  const { language, user } = useAppContext();
  const t = translations[language] || translations['en'];

  // 1. Determine initial sign based on User DOB or default to Aries
  const initialSign = useMemo(() => {
    if (!user.dob) return zodiacSigns[0];
    const date = new Date(user.dob);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0];
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1];
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2];
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3];
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4];
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5];
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6];
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7];
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8];
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9];
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10];
    return zodiacSigns[11];
  }, [user.dob]);

  const [selectedSign, setSelectedSign] = useState(initialSign);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHoroscope = async () => {
      setIsLoading(true);
      const prompt = `Provide a detailed daily horoscope for ${selectedSign.name}. 
      User context: ${user.name}, language: ${language}.
      Structure the reading with these headers:
      - **General Mood**
      - **Love & Relationships**
      - **Career & Purpose**
      - **Celestial Advice**
      Keep the tone encouraging, spiritual, and insightful.`;

      try {
        const response = await getGeneralGuidance(prompt, language, user);
        setReading(response);
      } catch (err) {
        setReading("The stars are currently obscured. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoroscope();
  }, [selectedSign, language, user]);

  return (
    <div className="min-h-screen pb-20 pt-6">
      {/* Header */}
      <header className="flex items-center justify-between px-4 mb-8">
        <button onClick={() => navigate('/home')} className="p-2 rounded-full bg-white/5 text-white/70">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white font-display uppercase tracking-widest">{t.features.horoscope}</h1>
        <button className="p-2 rounded-full bg-white/5 text-white/70">
          <Share2 size={20} />
        </button>
      </header>

      {/* Zodiac Horizontal Scroller */}
      <div className="flex overflow-x-auto gap-4 px-4 pb-6 no-scrollbar">
        {zodiacSigns.map((sign) => (
          <motion.div
            key={sign.name}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSign(sign)}
            className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-3xl border transition-all ${
              selectedSign.name === sign.name 
                ? 'bg-neon-cyan/20 border-neon-cyan shadow-[0_0_15px_rgba(0,242,255,0.3)]' 
                : 'bg-white/5 border-white/10 opacity-50'
            }`}
          >
            <span className="text-2xl mb-1">{sign.icon}</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{sign.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Current Sign Banner */}
      <div className="px-4 mb-8 text-center">
        <motion.div
          key={selectedSign.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent border border-white/5"
        >
          <div className="text-5xl mb-2">{selectedSign.icon}</div>
          <h2 className="text-2xl font-bold text-white mb-1">{selectedSign.name}</h2>
          <p className="text-xs text-neon-cyan font-medium uppercase tracking-widest">{selectedSign.dates}</p>
        </motion.div>
      </div>

      {/* Reading Content */}
      <div className="px-4">
        <Card variant="glow" className="min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-10 h-10 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white/30 text-xs animate-pulse tracking-widest uppercase">Consulting the Orbit...</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="prose prose-invert max-w-none text-sm leading-relaxed"
            >
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => (
                    <div className="flex items-center gap-2 mt-6 mb-2 text-neon-cyan">
                      <Star size={14} className="fill-current" />
                      <h2 className="text-sm font-bold uppercase tracking-wider m-0" {...props} />
                    </div>
                  ),
                  p: ({node, ...props}) => <p className="text-white/70 mb-4" {...props} />,
                }}
              >
                {reading}
              </ReactMarkdown>
            </motion.div>
          )}
        </Card>
      </div>

      {/* Quick Insights Grid */}
      <div className="grid grid-cols-3 gap-3 px-4 mt-6">
        {[
          { icon: Smile, label: 'Mood', val: '85%', color: 'text-yellow-400' },
          { icon: Heart, label: 'Love', val: '92%', color: 'text-pink-400' },
          { icon: Briefcase, label: 'Work', val: '78%', color: 'text-blue-400' }
        ].map((item, i) => (
          <Card key={i} className="flex flex-col items-center py-4 gap-1">
            <item.icon size={18} className={item.color} />
            <span className="text-[10px] text-white/40 uppercase font-bold">{item.label}</span>
            <span className="text-xs font-bold text-white">{item.val}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Horoscope;
