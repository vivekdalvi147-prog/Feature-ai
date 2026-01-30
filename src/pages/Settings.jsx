import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  User, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Share2, 
  Star, 
  LogOut, 
  Trash2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings = () => {
  const navigate = useNavigate();
  const { user, language, logout } = useAppContext();
  const { showToast } = useToast();
  const t = translations[language] || translations['en'];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Future AI - Palm & Tarot',
          text: 'Check out this amazing AI Palm Reader and Tarot app!',
          url: window.location.origin,
        });
      } catch (err) {
        showToast("Sharing cancelled");
      }
    } else {
      showToast("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  const handleRate = () => {
    showToast("Thank you for your support!");
    // In a real Play Store app, this would link to the store URL
    window.open('https://play.google.com/store', '_blank');
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will delete all your readings and profile data.")) {
      logout(); // This clears localStorage and redirects to splash
    }
  };

  return (
    <div className="min-h-screen pb-12 pt-6 px-4 space-y-6">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 rounded-full bg-white/5 text-white/70"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white uppercase tracking-widest">{t.settings}</h1>
      </header>

      {/* 1. Profile Summary Card */}
      <Card variant="glow" className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{user.name || 'Seeker'}</h2>
          <p className="text-xs text-white/40">{user.dob || 'Mysterious birth'}</p>
          <button 
            onClick={() => navigate('/profile-setup')}
            className="text-[10px] text-neon-cyan font-bold uppercase mt-1 tracking-widest"
          >
            Edit Profile
          </button>
        </div>
      </Card>

      {/* 2. Main Settings List */}
      <section className="space-y-3">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold ml-2">Preferences</h3>
        
        <Card variant="interactive" onClick={() => navigate('/language')} className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-neon-purple" />
            <span className="text-sm text-white/80">{t.language}</span>
          </div>
          <span className="text-xs text-white/30 uppercase">{language}</span>
        </Card>

        <Card variant="interactive" onClick={handleShare} className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Share2 size={18} className="text-blue-400" />
            <span className="text-sm text-white/80">{t.rate}</span>
          </div>
          <ExternalLink size={14} className="text-white/20" />
        </Card>
      </section>

      {/* 3. Support & Feedback */}
      <section className="space-y-3">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold ml-2">Spiritual Community</h3>
        <Card variant="interactive" className="flex items-center gap-3 py-4">
          <MessageCircle size={18} className="text-green-400" />
          <span className="text-sm text-white/80">Contact Support</span>
        </Card>
        <Card variant="interactive" onClick={handleRate} className="flex items-center gap-3 py-4">
          <Star size={18} className="text-yellow-400" />
          <span className="text-sm text-white/80">Rate Future AI</span>
        </Card>
      </section>

      {/* 4. Legal & Safety (Play Store Safe) */}
      <section className="space-y-3">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold ml-2">Legal</h3>
        
        <Card className="p-0 overflow-hidden border-white/5 bg-white/5">
          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-gray-400" />
              <span className="text-sm text-white/70">{t.privacy}</span>
            </div>
          </button>
          
          <div className="p-4 bg-white/[0.02]">
            <div className="flex items-start gap-3 mb-2">
              <FileText size={18} className="text-gray-400 shrink-0" />
              <span className="text-sm text-white/70">{t.disclaimer}</span>
            </div>
            <p className="text-[10px] text-white/30 leading-relaxed italic">
              {t.disclaimerText}
            </p>
          </div>
        </Card>
      </section>

      {/* 5. Danger Zone */}
      <section className="pt-6 pb-10">
        <Button 
          variant="ghost" 
          onClick={handleReset} 
          className="text-red-400 hover:bg-red-400/10 border border-red-400/20"
          icon={Trash2}
        >
          Reset All Data
        </Button>
        <p className="text-[9px] text-center text-white/20 mt-4 uppercase tracking-[0.2em]">
          Version 1.0.0 (Build 2024.1)
        </p>
      </section>
    </div>
  );
};

export default Settings;
