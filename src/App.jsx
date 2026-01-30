import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context Providers (We will create these next)
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';

// Layout Wrapper
import Layout from './components/layout/Layout';

// Lazy loading pages for performance
const SplashScreen = lazy(() => import('./pages/SplashScreen'));
const LanguageSelect = lazy(() => import('./pages/LanguageSelect'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const ProfileSetup = lazy(() => import('./pages/ProfileSetup'));
const Home = lazy(() => import('./pages/Home'));
const PalmScan = lazy(() => import('./pages/PalmScan'));
const PalmResult = lazy(() => import('./pages/PalmResult'));
const Chat = lazy(() => import('./pages/Chat'));
const TarotDeck = lazy(() => import('./pages/TarotDeck'));
const TarotReading = lazy(() => import('./pages/TarotReading'));
const DailyGuidance = lazy(() => import('./pages/DailyGuidance'));
const Horoscope = lazy(() => import('./pages/Horoscope'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  const location = useLocation();

  return (
    <AppProvider>
      <ToastProvider>
        <Layout>
          <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-cosmic-dark">
              <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/language" element={<LanguageSelect />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/palm-scan" element={<PalmScan />} />
                <Route path="/palm-result" element={<PalmResult />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/tarot" element={<TarotDeck />} />
                <Route path="/tarot-reading" element={<TarotReading />} />
                <Route path="/daily" element={<DailyGuidance />} />
                <Route path="/horoscope" element={<Horoscope />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </Layout>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
