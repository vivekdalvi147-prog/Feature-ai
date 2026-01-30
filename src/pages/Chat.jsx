import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Send, Sparkles, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';
import { getGeneralGuidance } from '../services/aiService';
import { translations } from '../data/translations';

const Chat = () => {
  const navigate = useNavigate();
  const { language, user } = useAppContext();
  const t = translations[language] || translations['en'];
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Greetings, ${user.name}. I am your spiritual guide. The energies around you today feel vibrant. What secrets of your soul or path shall we explore together?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await getGeneralGuidance(userMessage, language, user);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "The cosmic connection is flickering. Please try asking again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-white/10 bg-cosmic-dark/50 backdrop-blur-md sticky top-0 z-20">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 rounded-full bg-white/5 text-white/70"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/30">
            <Sparkles size={20} className="text-neon-cyan" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Cosmic Guide</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">Attuned to your energy</span>
            </div>
          </div>
        </div>
      </header>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-6 no-scrollbar pb-32"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                  msg.role === 'user' ? 'bg-neon-purple/20 border-neon-purple/30' : 'bg-neon-cyan/20 border-neon-cyan/30'
                }`}>
                  {msg.role === 'user' ? <User size={14} className="text-neon-purple" /> : <Bot size={14} className="text-neon-cyan" />}
                </div>

                {/* Bubble */}
                <div className={`p-4 rounded-[22px] text-sm leading-relaxed shadow-xl ${
                  msg.role === 'user' 
                    ? 'bg-neon-purple/80 text-white rounded-tr-none' 
                    : 'bg-white/10 backdrop-blur-md text-white/90 border border-white/10 rounded-tl-none'
                }`}>
                  <ReactMarkdown className="prose prose-invert max-w-none">
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 border border-white/10 p-4 rounded-[22px] rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cosmic-dark via-cosmic-dark to-transparent">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-md mx-auto relative group"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your destiny..."
            className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] py-4 pl-6 pr-16 text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50 transition-all shadow-2xl"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-neon-cyan rounded-full flex items-center justify-center text-cosmic-dark shadow-[0_0_15px_rgba(0,242,255,0.4)] active:scale-90 disabled:opacity-50 disabled:shadow-none transition-all"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-[9px] text-center text-white/20 mt-3 uppercase tracking-widest font-medium">
          Powered by Divine Intelligence
        </p>
      </div>
    </div>
  );
};

export default Chat;
