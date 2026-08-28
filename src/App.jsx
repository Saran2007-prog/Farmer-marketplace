import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useStore } from './store/useStore';
import { FarmerSide } from './features/farmer/FarmerSide';
import { BuyerSide } from './features/buyer/BuyerSide';
import { LoginScreen } from './features/auth/LoginScreen';

export function App() {
  const { t } = useTranslation();
  const { isLoggedIn, currentUser, activeRole } = useStore();

  const userRole = currentUser?.role || activeRole;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* Top bar — always visible on every page */}
      <header className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-medium text-slate-300 flex items-center gap-2">
            <span>👋</span>
            <span>{t('greeting')}, {t('welcome_message')}</span>
          </span>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Show login screen when not logged in — no Navbar, no footer */}
      {!isLoggedIn ? (
        <LoginScreen />
      ) : (
        <>
          <Navbar />

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
            {userRole === 'farmer' && <FarmerSide />}
            {userRole === 'buyer' && <BuyerSide />}
          </main>

          <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 font-semibold">
            {t('footer_text')}
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
