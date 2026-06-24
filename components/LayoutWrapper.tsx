"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { translations } from "@/lib/translations";
import { HoneycombBackground } from "./HoneycombBackground";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  FileCheck,
  ShieldCheck,
  Globe2,
  Clock,
} from "lucide-react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { language, toggleLanguage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dict = translations[language];

  useEffect(() => {
    // Define the global callback function for Google Translate Element Init on window
    const win = window as any;
    win.googleTranslateElementInit = () => {
      if (
        win.google &&
        win.google.translate &&
        win.google.translate.TranslateElement
      ) {
        new win.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ne",
            layout: 0, // InlineLayout.SIMPLE
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    // Inject the translate API script dynamically
    const scriptId = "google-translate-api-script";
    if (!document.getElementById(scriptId)) {
      const gScript = document.createElement("script");
      gScript.id = scriptId;
      gScript.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      gScript.async = true;
      document.body.appendChild(gScript);
    }
  }, []);

  // Programmatic custom translation sync effect to automate underlying Google Translate engine
  useEffect(() => {
    const applyTranslation = () => {
      // 1. Synchronize the select value
      const selectEl = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;
      if (selectEl) {
        const valueToSet = language === "en" ? "en" : "ne";
        const optionsValues = Array.from(selectEl.options).map((o) => o.value);
        let finalValue = valueToSet;
        if (
          valueToSet === "en" &&
          !optionsValues.includes("en") &&
          optionsValues.includes("")
        ) {
          finalValue = "";
        }
        if (selectEl.value !== finalValue) {
          selectEl.value = finalValue;
          selectEl.dispatchEvent(new Event("change"));
        }
      }

      // 2. Force hide all Google Translate frames, bars, and banners to prevent visual leakage
      const googleElements = document.querySelectorAll(
        '.goog-te-banner-frame, iframe.goog-te-banner-frame, [id*="goog-te-banner-frame"], [class*="goog-te-banner-frame"], iframe[src*="translate.google.com"], iframe[src*="google.com/translate"], .skiptranslate iframe, body > .skiptranslate',
      );
      googleElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.style.display !== "none") {
          htmlEl.style.setProperty("display", "none", "important");
        }
        if (htmlEl.style.visibility !== "hidden") {
          htmlEl.style.setProperty("visibility", "hidden", "important");
        }
        if (htmlEl.style.height !== "0px") {
          htmlEl.style.setProperty("height", "0px", "important");
          htmlEl.style.setProperty("width", "0px", "important");
        }
      });

      // 3. Prevent page shifts (Google script adds inline style margin-top or top to body/html)
      const forceCleanLayout = (target: HTMLElement) => {
        if (target.style.top && target.style.top !== "0px") {
          target.style.setProperty("top", "0px", "important");
        }
        if (target.style.marginTop && target.style.marginTop !== "0px") {
          target.style.setProperty("margin-top", "0px", "important");
        }
        if (target.style.position && target.style.position !== "static") {
          target.style.setProperty("position", "static", "important");
        }
      };

      if (document.body) forceCleanLayout(document.body);
      if (document.documentElement) forceCleanLayout(document.documentElement);
    };

    // Run immediately and periodically poll to ensure the DOM state is perfectly synchronized
    applyTranslation();
    const intervalId = setInterval(applyTranslation, 200);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [language]);

  // Align paths with Tech Bee Nepal
  const navItems = [
    { label: dict.navHome, path: "/" },
    { label: dict.navCourses, path: "/courses" },
    { label: "Store", path: "/products" },
    { label: dict.navAbout, path: "/about" },
    { label: dict.navGallery, path: "/gallery" },
    { label: dict.navContact, path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 relative selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Dynamic Background layer customized with corporate ambient navy/crimson glows */}
      <HoneycombBackground />

      {/* Top Professional Contact Ribbon bar (Tech Bee Nepal Real Stats) */}
      <div className="w-full bg-[#181613] text-amber-100 text-xs py-2 px-4 shadow-sm relative z-50 transition-all font-mono border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Quick contact list */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>+977 1-4525547 / 9801167733</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>info@techbeenepal.edu.np</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-amber-300 transition-colors hidden md:flex">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Mid-Baneshwor, Kathmandu, Nepal</span>
            </span>
          </div>

          {/* Slogan pill in top right of header ribbon */}
          <div className="flex items-center gap-4">
            <span className="bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider animate-pulse inline-block select-none">
              Admissions Open 2026
            </span>
            <span className="text-amber-200/80 text-[10px] hidden lg:inline">
              NCC UK Approved Center #NP842
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-gray-300/60 border-b border-amber-500/20 transition-all duration-300 shadow-3xs">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-22">
            {/* Logo area */}
            <Link
              href="/"
              className="flex items-center space-x-3.5 group animate-fade-in"
              id="logo-link"
            >
              {/* Vetted Tech Bee Nepal Corporate Swirl SVG Emblem */}
              <div className="w-23 h-18 rounded-2xl bg-transparent flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 relative">
                <img
                  src="/assets/images/logo.png"
                  alt="Tech Bee Nepal"
                  className="w-full h-full object-contain mb-4"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#f0c702] transition-colors leading-none flex items-center gap-1">
                  Tech{" "}
                  <span className="text-[#f0c702] font-extrabold text-2xl relative top-0.5 font-mono">
                    Bee
                  </span>
                  <span className="text-[#f0c702] font-extrabold text-sm relative top-0.5 font-mono">
                    NEPAL
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 mt-1">
                  {dict.logoSub}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-1 lg:space-x-3">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
                      isActive
                        ? "text-amber-950 bg-amber-500/10 border border-amber-500/25"
                        : "text-slate-600 hover:text-slate-900 hover:bg-amber-50/50"
                    }`}
                    id={`nav-item-${item.path.replace(/\//g, "root")}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0.5 inset-x-4 h-0.5 bg-amber-500"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switch / Custom translation switcher element & Register Button */}
            <div className="flex items-center space-x-3.5">
              {/* Invisible Google Translate element container to let api hook up in background */}
              <div
                id="google_translate_element"
                className="absolute invisible pointer-events-none w-0 h-0"
              />

              {/* Custom translation switcher pill (looks entirely bespoke) */}
              <button
                onClick={toggleLanguage}
                className="notranslate flex items-center space-x-1.5 bg-white border border-slate-200 hover:border-amber-500/30 px-3.5 py-2.5 rounded-xl text-xs font-black text-slate-800 transition-all cursor-pointer shadow-3xs active:scale-95 select-none"
                title={
                  language === "en" ? "नेपालीमा हेर्नुहोस्" : "English Version"
                }
                id="custom-lang-toggle"
              >
                <span className="text-sm">🇳🇵</span>
                <span className="uppercase tracking-wide font-sans text-[11px]">
                  {language === "en" ? "नेपाली" : "English"}
                </span>
                <span className="text-[9px] bg-amber-50 text-amber-700 px-1 py-0.5 rounded font-mono font-black border border-amber-200">
                  {language.toUpperCase()}
                </span>
              </button>

              {/* Header CTA Button - visible on medium layout and above */}
              <Link
                href="/contact"
                className="hidden sm:inline-block bg-[#f0c702] hover:bg-[#d8b202] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all text-center active:scale-97"
                id="header-cta-btn"
              >
                {dict.ctaRegister}
              </Link>

              {/* Mobile menu trigger - visible on small layout only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-[#F4F6F9] border border-amber-500/10 text-slate-800 hover:bg-[#EFF2F5] focus:outline-none cursor-pointer active:scale-95 transition-all"
                aria-label="Toggle menu"
                id="mobile-menu-trigger"
              >
                {mobileMenuOpen ? (
                  <X className="w-5.5 h-5.5" />
                ) : (
                  <Menu className="w-5.5 h-5.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-slate-50 border-b border-amber-200/50"
              id="mobile-nav-dropdown"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                        isActive
                          ? "bg-amber-500/10 text-amber-950 border border-amber-200"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
                  {/* Custom Mobile Translate Toggle Pill */}
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setMobileMenuOpen(false);
                    }}
                    className="notranslate w-full flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 py-3 rounded-xl text-sm font-black text-slate-800 transition-all cursor-pointer active:scale-95"
                  >
                    <span className="text-base">🇳🇵</span>
                    <span className="uppercase tracking-wide font-sans text-xs">
                      {language === "en" ? "नेपाली संस्करण" : "English Version"}
                    </span>
                    <span className="text-[9px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono font-black border border-amber-200">
                      {language.toUpperCase()}
                    </span>
                  </button>

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-stone-950 py-3 rounded-xl text-base font-bold shadow-md"
                  >
                    {dict.ctaRegister}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Page Render Stage */}
      <main className="flex-grow flex flex-col relative z-10 bg-transparent">
        {children}
      </main>

      {/* High-Fidelity Professional Tech Bee Nepal Footer */}
      <footer
        className="bg-[#12100E] border-t-4 border-amber-500 relative z-10 text-slate-300"
        id="main-footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1 - Brand Summary */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-1 font-bold text-amber-500">
                  ⬡
                </div>
                <span className="font-sans text-xl font-black text-white tracking-wide">
                  Tech Bee <span className="text-amber-500">Nepal</span>
                </span>
              </div>

              {/* Legal disclaimer statement block */}
              <div className="border-l-4 border-amber-500 pl-4 py-1 italic bg-stone-900 rounded-r-xl border border-stone-800">
                <p className="text-xs text-white/95 leading-relaxed font-serif">
                  &ldquo;Skills that lead to success. Building high-performing
                  programmers, security consultants, and network architects
                  since the digital revolution.&rdquo;
                </p>
              </div>

              <p className="text-sm leading-relaxed max-w-md text-slate-400">
                Nepal’s premier computer education center. Accelerating advanced
                technical capabilities, global vendor standardizations, and
                direct employment funnels across corporate IT giants.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h4 className="font-sans text-xs font-extrabold text-white uppercase tracking-wider mb-5">
                Navigation Paths
              </h4>
              <ul className="space-y-3.5 text-sm">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="hover:text-amber-500 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-amber-500 text-[10px]">⬡</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact details */}
            <div>
              <h4 className="font-sans text-xs font-extrabold text-white uppercase tracking-wider mb-5">
                Corporate Head office
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start space-x-2.5">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Mid-Baneshwor</strong>
                    <br />
                    Opposite Mid-Baneshwor Complex, Kathmandu, Nepal
                  </span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>+977 1-4525547 / 9801167733</span>
                </li>
                <li className="text-xs pt-1">
                  <span className="bg-stone-900 text-amber-100/90 font-mono px-2.5 py-1.5 rounded-md inline-block font-semibold border border-stone-800 mt-2">
                    REG# 94830/72/73 Government Accredited
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Partner accreditation foot badges */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              <span>AWS Academy</span>
              <span>•</span>
              <span>NCC Education British Partner</span>
              <span>•</span>
              <span>EC-Council Authorized</span>
              <span>•</span>
              <span>Cisco Networking Academy</span>
            </div>

            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Tech Bee Nepal. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
