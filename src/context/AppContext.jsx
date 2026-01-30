import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- STATE DEFINITIONS ---
  
  // App State
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [isFirstLaunch, setIsFirstLaunch] = useState(!localStorage.getItem('onboarded'));
  
  // User Profile
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_profile')) || {
    name: '',
    dob: '',
    time: '',
    gender: '',
    zodiac: ''
  });

  // Reading History (Palm/Tarot)
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('reading_history')) || []);

  // --- PERSISTENCE LOGIC ---

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('reading_history', JSON.stringify(history));
  }, [history]);

  // --- ACTIONS ---

  const updateProfile = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = () => {
    setIsFirstLaunch(false);
    localStorage.setItem('onboarded', 'true');
  };

  const saveReading = (type, result) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      type, // 'palm', 'tarot', 'horoscope'
      result
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 20)); // Keep last 20 readings
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      isFirstLaunch,
      completeOnboarding,
      user,
      updateProfile,
      history,
      saveReading,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
