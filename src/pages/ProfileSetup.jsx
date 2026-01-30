import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { language, updateProfile, user } = useAppContext();
  const t = translations[language] || translations['en'];

  const [formData, setFormData] = useState({
    name: user.name || '',
    dob: user.dob || '',
    time: user.time || '',
    gender: user.gender || ''
  });

  const [error, setError] = useState('');

  const handleSave = () => {
    if (!formData.name || !formData.dob) {
      setError('Name and Date of Birth are required to align with the stars.');
      return;
    }
    
    updateProfile(formData);
    navigate('/home');
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50 transition-all";

  return (
    <div className="min-h-screen flex flex-col pt-10 pb-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          {t.profileTitle}
        </h2>
        <p className="text-white/50 text-sm">
          Your details help the AI align with your unique energy
        </p>
      </motion.div>

      <Card variant="glow" className="space-y-6 mb-10">
        {/* Name Input */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-cyan/50" size={20} />
          <input
            type="text"
            placeholder={t.nameLabel}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>

        {/* DOB Input */}
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-cyan/50" size={20} />
          <input
            type="date"
            placeholder={t.dobLabel}
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className={cn(inputClasses, "appearance-none")}
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* Time Input */}
        <div className="relative">
          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-cyan/50" size={20} />
          <input
            type="time"
            placeholder={t.timeLabel}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className={cn(inputClasses, "appearance-none")}
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* Gender Selection */}
        <div className="grid grid-cols-2 gap-3">
          {t.genderOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFormData({ ...formData, gender: opt })}
              className={`py-3 px-2 rounded-2xl text-xs font-medium border transition-all ${
                formData.gender === opt 
                ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,242,255,0.2)]' 
                : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center animate-pulse">{error}</p>
        )}
      </Card>

      <div className="mt-auto">
        <Button 
          onClick={handleSave}
          icon={Sparkles}
          className="shadow-2xl"
        >
          {t.confirm}
        </Button>
      </div>
    </div>
  );
};

// Helper function for class merging in this specific file
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default ProfileSetup;
