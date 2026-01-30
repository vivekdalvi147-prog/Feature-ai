import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Info, ChevronLeft, Sparkles, Hand } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { translations } from '../data/translations';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const PalmScan = () => {
  const navigate = useNavigate();
  const { language } = useAppContext();
  const { showToast } = useToast();
  const t = translations[language] || translations['en'];

  const [step, setStep] = useState(1); // 1: Select Hand, 2: Capture
  const [selectedHand, setSelectedHand] = useState(null); // 'left' or 'right'
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
    setStep(2);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast("Please select a valid image of your palm.", "error");
      return;
    }

    setIsProcessing(true);

    // Convert image to Base64 for the AI Service
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      // Pass the image data to the Result page via navigation state
      navigate('/palm-result', { 
        state: { 
          image: base64Image, 
          hand: selectedHand 
        } 
      });
    };
    reader.onerror = () => {
      showToast("Failed to process image. Try again.", "error");
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => step === 1 ? navigate('/home') : setStep(1)}
          className="p-2 rounded-full bg-white/5 text-white/70"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">{t.palmTitle}</h1>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          /* STEP 1: HAND SELECTION */
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-10">
              <div className="inline-flex p-4 rounded-full bg-neon-cyan/10 mb-4">
                <Hand className="text-neon-cyan" size={40} />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">Which hand?</h2>
              <p className="text-white/50 text-sm px-8">
                In palmistry, your non-dominant hand shows your potential, while your dominant hand shows your life path.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card 
                variant="interactive" 
                onClick={() => handleHandSelect('left')}
                className="py-8 flex flex-col items-center gap-3 border-white/5"
              >
                <span className="text-4xl mb-2">âœ‹</span>
                <span className="font-bold text-white text-lg">Left Hand</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">Internal Energy</span>
              </Card>

              <Card 
                variant="interactive" 
                onClick={() => handleHandSelect('right')}
                className="py-8 flex flex-col items-center gap-3 border-white/5"
              >
                <span className="text-4xl mb-2">ðŸ– </span>
                <span className="font-bold text-white text-lg">Right Hand</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">Manifested Path</span>
              </Card>
            </div>
          </motion.div>
        ) : (
          /* STEP 2: CAPTURE/UPLOAD */
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-bold text-white mb-2">Scan your Palm</h2>
              <p className="text-white/50 text-sm px-6">
                Ensure your hand is in bright light and the lines are clearly visible.
              </p>
            </div>

            {/* Visual Guide / Scan Area */}
            <div className="relative aspect-[3/4] w-full max-w-xs mx-auto rounded-[40px] border-2 border-dashed border-neon-cyan/30 bg-white/5 flex items-center justify-center overflow-hidden">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-neon-cyan text-sm font-medium animate-pulse">Preparing scan...</span>
                </div>
              ) : (
                <>
                  <div className="absolute inset-10 opacity-10 pointer-events-none">
                    <Hand size="100%" className="text-white" />
                  </div>
                  {/* Scanning Animation Line */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-neon-cyan shadow-[0_0_15px_rgba(0,242,255,0.8)] z-20"
                  />
                  <div className="z-10 text-center px-6">
                    <Sparkles className="mx-auto mb-4 text-neon-cyan/50" size={32} />
                    <p className="text-white/30 text-xs uppercase tracking-tighter">Align your palm within the frame</p>
                  </div>
                </>
              )}
            </div>

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment" // This triggers the camera on mobile
              className="hidden"
            />

            <div className="grid grid-cols-1 gap-4 pt-4">
              <Button 
                onClick={triggerUpload} 
                icon={Camera} 
                isLoading={isProcessing}
                className="shadow-2xl py-6 rounded-[32px]"
              >
                Take Photo
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={triggerUpload} 
                icon={Upload}
                disabled={isProcessing}
                className="py-5 rounded-[32px]"
              >
                Upload from Gallery
              </Button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <Info className="text-neon-cyan shrink-0" size={18} />
              <p className="text-[11px] text-white/40 leading-relaxed">
                Your privacy matters. Images are processed by AI for analysis and are not stored permanently on our servers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PalmScan;
