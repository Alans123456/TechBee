'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './translations';

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  level: string;
  courseId: string;
  batch: string;
  regDate: string;
}

interface AppContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, 'id' | 'regDate'>) => Registration;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Hydrate states from localStorage after mounting
  useEffect(() => {
    const savedLang = localStorage.getItem('techbee_lang') as Language;
    const savedRegs = localStorage.getItem('techbee_registrations');

    setTimeout(() => {
      if (savedLang === 'en' || savedLang === 'ne') {
        const nextLang = savedLang;
        setLanguageState(nextLang);
      }
      if (savedRegs) {
        try {
          setRegistrations(JSON.parse(savedRegs));
        } catch (e) {
          console.error("Failed to parse registrations:", e);
        }
      }
    }, 0);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('techbee_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ne' : 'en';
    setLanguage(nextLang);
  };

  const addRegistration = (newReg: Omit<Registration, 'id' | 'regDate'>) => {
    const randId = "TB-2026-REG-" + Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().split('T')[0];
    const createdReg: Registration = {
      ...newReg,
      id: randId,
      regDate: dateStr,
    };

    const updated = [...registrations, createdReg];
    setRegistrations(updated);
    localStorage.setItem('techbee_registrations', JSON.stringify(updated));
    return createdReg;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, toggleLanguage, registrations, addRegistration }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
