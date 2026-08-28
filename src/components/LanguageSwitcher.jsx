import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-sm">
      <span className="text-base leading-none select-none" role="img" aria-label="Globe">
        🌐
      </span>
      <select
        value={i18n.language || 'en'}
        onChange={handleLanguageChange}
        className="bg-transparent border-none font-medium text-slate-800 text-xs sm:text-sm focus:outline-none cursor-pointer pr-1"
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ta">தமிழ்</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
