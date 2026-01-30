import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Sparkles, Home, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';
import { analyzePalm } from '../services/aiService';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const PalmResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, user, saveReading } = useAppContext();
  const t = translations[language] || translations['en'];

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const hasAnalyzed = useRef(false);

  const { image, hand } = location.state || {};

  useEffect(() => {
    // If no image is provided, go back to scan
    if (!image) {
      navigate('/palm-scan');
      return;
    }

    // Prevent double analysis in React StrictMode
    if (hasAnalyzed.current) return;
    
    const getReading = async () => {
      try {
        setLoading(true);
        const analysis = await analyzePalm(image, language, user);
        setResult(analysis);
        
        // Save to local history
        saveReading('palm', { 
          hand, 
          excerpt: analysis.substring(0, 100) + "...",
          fullText: analysis 
        });
        
        hasAnalyzed.current = true;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getReading();
  }, [image, hand, language, user, navigate, saveReading]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Palm Reading',
        text: 'Check out my spiritual palm analysis from Future AI!',
        url: window.location.origin,
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-t-2 border-b-2 border-neon-cyan shadow-[0_0_30px_rgba(0,242,255,0.2)] mb-8"
        />
        <h2 className="text-2xl font-display font-bold text-white mb-4 animate-pulse">
          {t.analyzing}
        </h2>
        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
          The AI is tracing the maps of your palm to reveal the flow of your energy. This may take a moment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="text-5xl mb-6">â˜„ï¸ </div>
        <h2 className="text-xl font-bold text-white mb-4">{error}</h2>
        <Button onClick={() => navigate('/palm-scan')} icon={RotateCcw}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 rounded-full bg-white/5 text-white/70"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan">Reading Complete</span>
        <button onClick={handleShare} className="p-2 rounded-full bg-white/5 text-white/70">
          <Share2 size={20} />
        </button>
      </header>

      {/* Captured Image Preview */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center mb-10"
      >
        <div className="relative p-1 rounded-[32px] bg-gradient-to-tr from-neon-cyan/50 to-neon-purple/50">
          <img 
            src={image} 
            alt="Palm Scan" 
            className="w-32 h-44 object-cover rounded-[30px] grayscale contrast-125"
          />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-cosmic-dark border border-neon-cyan rounded-full flex items-center justify-center text-neon-cyan shadow-lg">
            <Sparkles size={18} />
          </div>
        </div>
      </motion.div>

      {/* Analysis Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="glow" className="prose prose-invert max-w-none mb-10">
          <div className="text-white/90 leading-relaxed text-base space-y-4">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-xl font-display font-bold text-neon-cyan mt-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-display font-bold text-neon-purple mt-4" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-white/80" {...props} />,
                li: ({node, ...props}) => <li className="ml-4 list-disc text-white/70" {...props} />,
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        </Card>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-[10px] text-white/20 text-center mb-10 px-6">
        {t.disclaimerText}
      </p>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-6 right-6 flex gap-4">
        <Button variant="secondary" onClick={() => navigate('/home')} icon={Home}>
          Dashboard
        </Button>
        <Button onClick={() => navigate('/palm-scan')} icon={RotateCcw}>
          New Scan
        </Button>
      </div>
    </div>
  );
};

export default PalmResult;
