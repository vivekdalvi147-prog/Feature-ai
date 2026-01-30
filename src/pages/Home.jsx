import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ScanLine, 
  Library, 
  Heart, 
  Sun, 
  MoonStar, 
  MessageSquareText, 
  Settings as SettingsIcon,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';

const Home = () => {
  const navigate = useNavigate();
  const { user, language } = useAppContext();
  const t = translations[language] || translations['en'];

  // Feature Grid Configuration
  const features = [
    { 
      id: 'palm', 
      title: t.features.palm, 
      icon: ScanLine, 
      path: '/palm-scan', 
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10'
    },
    { 
      id: 'tarot', 
      title: t.features.tarot, 
      icon: Library, 
      path: '/tarot', 
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    { 
      id: 'love', 
      title: t.features.love, 
      icon: Heart, 
      path: '/chat', // Redirects to chat with a love context
      color: 'text-pink-400',
      bg: 'bg-pink-400/10'
    },
    { 
      id: 'daily', 
      title: t.features.daily, 
      icon: Sun, 
      path: '/daily', 
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10'
    },
    { 
      id: 'horoscope', 
      title: t.features.horoscope, 
      icon: MoonStar, 
      path: '/horoscope', 
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    { 
      id: 'settings', 
      title: t.settings, 
      icon: SettingsIcon, 
      path: '/settings', 
      color: 'text-gray-400',
      bg: 'bg-gray-400/10'
    },
  ];

  return (
    <div className="min-h-screen pb-12 pt-6 px-4 space-y-8">
      
      {/* 1. Header & Greeting */}
      <header className="flex justify-between items-start pt-4">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/50 text-xs uppercase tracking-widest mb-1"
          >
            {new Date().toLocaleDateString(language, { weekday: 'long', month: 'long', day: 'numeric' })}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-display font-bold text-white"
          >
            Hello, <span className="text-neon-cyan">{user.name.split(' ')[0]}</span>
          </motion.h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/settings')}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70"
        >
          <SettingsIcon size={20} />
        </motion.button>
      </header>

      {/* 2. Primary Feature: AI Palm Chat (The "Hero" Card) */}
      <Card 
        variant="glow" 
        onClick={() => navigate('/chat')}
        className="relative overflow-hidden group py-8"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <Sparkles size={80} className="text-neon-cyan" />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
            <MessageSquareText size={32} className="text-neon-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">AI Spiritual Chat</h2>
            <p className="text-white/50 text-sm px-4">
              Ask about your path, energy, or spiritual growth.
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Feature Grid */}
      <section>
        <h3 className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mb-4 ml-2">
          Mystical Tools
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              variant="interactive"
              delay={index * 0.05}
              onClick={() => navigate(feature.path)}
              className="flex flex-col items-center justify-center text-center py-6 gap-3"
            >
              <div className={`p-3 rounded-2xl ${feature.bg} ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <span className="text-sm font-semibold text-white/80">{feature.title}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Daily Wisdom Banner */}
      <Card className="bg-gradient-to-r from-neon-purple/20 to-transparent border-neon-purple/20 py-6">
        <div className="flex gap-4 items-center">
          <div className="p-3 rounded-full bg-neon-purple/30">
            <MoonStar className="text-neon-purple" size={24} />
          </div>
          <div>
            <p className="text-xs text-neon-purple font-bold uppercase tracking-wider mb-1">Daily Energy</p>
            <p className="text-sm text-white/70 italic">
              "The universe speaks in whispers. Today, listen with your heart."
            </p>
          </div>
        </div>
      </Card>

      {/* Disclaimer System (Subtle but visible) */}
      <p className="text-[10px] text-white/20 text-center px-10 pb-4 leading-relaxed">
        Guidance is symbolic. Results are for entertainment and reflection only.
      </p>
    </div>
  );
};

export default Home;
