import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StarBackground from '../shared/StarBackground';
import { useToast } from '../../context/ToastContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [lastBackPress, setLastBackPress] = useState(0);

  // --- DOUBLE BACK TO EXIT LOGIC ---
  useEffect(() => {
    const handleBackButton = (e) => {
      // Only apply this logic on the Home screen
      if (location.pathname === '/home') {
        e.preventDefault();
        const currentTime = new Date().getTime();
        
        if (currentTime - lastBackPress < 2000) {
          // If pressed twice within 2 seconds, we allow default (exit)
          // In a PWA, we can't force close the browser, 
          // but we can minimize or show an exit state.
          window.history.back();
        } else {
          setLastBackPress(currentTime);
          showToast("Press back again to exit Future AI");
          // Push state again to keep user on the same page
          window.history.pushState(null, null, window.location.pathname);
        }
      }
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [location.pathname, lastBackPress, showToast]);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Persistent Background */}
      <StarBackground />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-md mx-auto relative px-4 pt-safe pb-safe-bottom">
        {children}
      </main>

      {/* Global Bottom Padding for Floating Nav (if needed) */}
      {location.pathname !== '/' && location.pathname !== '/language' && (
        <div className="h-20 w-full" /> 
      )}
    </div>
  );
};

export default Layout;
