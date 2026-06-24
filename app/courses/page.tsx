'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { translations } from '@/lib/translations';
import { courses, Course } from '@/lib/data';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Award, 
  FileCheck, 
  ChevronDown, 
  BookOpen,
  Sliders,
  Search,
  CheckCircle2,
  HelpCircle,
  Hash
} from 'lucide-react';

function CourseCard({ 
  course, 
  isOpen, 
  onToggle, 
  language, 
  dict 
}: { 
  course: Course; 
  isOpen: boolean; 
  onToggle: () => void; 
  language: 'en' | 'ne'; 
  dict: any; 
}) {
  const isN = language === 'ne';

  return (
    <motion.div
      layout="position"
      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
        isOpen ? 'border-[#132a57] ring-4 ring-[#132a57]/5 shadow-md' : 'border-stone-200 hover:border-stone-300'
      }`}
      id={`course-entry-card-${course.code}`}
    >
      <div className="p-6 sm:p-7 space-y-5">
        {/* Course Code and Category Badge */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#132a57]">
            <Hash className="w-3.5 h-3.5" />
            <span>{course.code}</span>
          </div>
          <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md font-bold text-[10px] uppercase">
            {isN ? course.levelNe : course.levelEn}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="font-sans text-lg sm:text-xl font-black text-slate-900 leading-snug">
            {isN ? course.nameNe : course.nameEn}
          </h2>
          <p className="text-stone-605 text-xs sm:text-sm leading-relaxed">
            {isN ? course.descNe : course.descEn}
          </p>
        </div>

        {/* Basic specifications (Duration & Prerequisites) */}
        <div className="grid grid-cols-2 gap-4 border-t border-stone-100 pt-4 text-xs font-semibold text-stone-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-400 shrink-0" />
            <span>{isN ? "अवधिः " : "Duration: "}<strong className="text-stone-900">{isN ? course.durationNe : course.durationEn}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-stone-400 shrink-0" />
            <span>{isN ? "योग्यताः " : "Eligible: "}<strong className="text-stone-900">{isN ? course.ageNe : course.ageEn}</strong></span>
          </div>
        </div>

        {/* Buttons: Direct inquiry link or detailed toggle */}
        <div className="flex gap-2.5 pt-1">
          <Link
            href={`/contact?course_code=${course.code}`}
            className="flex-1 bg-[#132a57] hover:bg-[#0c1c3a] text-white font-black text-center py-3 px-4 rounded-xl text-xs tracking-wider uppercase transition-all inline-flex items-center justify-center gap-2"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#f0c702]" />
            <span>{isN ? "सोधपुछ गर्नुहोस" : "Inquire Now"}</span>
          </Link>

          <button
            onClick={onToggle}
            className="border border-stone-250 hover:bg-stone-50 text-stone-700 font-bold px-4 rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
            aria-expanded={isOpen}
          >
            <span>{isOpen ? (isN ? "बन्द गर्नुहोस्" : "Hide Details") : (isN ? "पाठ्यक्रम हेर्नुहोस्" : "Show Details")}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded syllabus/details highlights */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-stone-50 border-t border-stone-150 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#132a57] font-mono">
                {isN ? "कोर्षको मुख्य एजेन्डा र विशेषताहरू" : "Syllabus Highlights & Training Scope"}
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isN ? course.highlightsNe : course.highlightsEn).map((high, index) => (
                  <div key={index} className="bg-white border border-stone-200/60 p-3 rounded-xl flex items-start gap-2.5 shadow-3xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-stone-700 leading-tight">{high}</span>
                  </div>
                ))}
              </div>

              {(course.kitNe || course.kitEn) && (
                <div className="pt-3 border-t border-stone-200 text-xs flex flex-wrap items-center justify-between gap-2 text-stone-500">
                  <span>{isN ? "वितरण गरिने शैक्षिक सामाग्रीहरूः" : "Provided Kit/Materials:"} <strong className="text-stone-800">{isN ? course.kitNe : course.kitEn}</strong></span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CoursesContent() {
  const { language } = useApp();
  const dict = translations[language];
  const searchParams = useSearchParams();
  const isN = language === 'ne';

  // State handles
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'primary' | 'middle' | 'secondary' | 'hobbyist'>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState('');

  // Pre-seed search from search params
  useEffect(() => {
    const searchCode = searchParams.get('search');
    if (searchCode) {
      setTimeout(() => {
        setLocalSearch(searchCode);
        const matched = courses.find(c => c.code.toLowerCase() === searchCode.toLowerCase());
        if (matched) {
          setSelectedDomain('all');
          setExpandedCourseId(matched.id);
        }
      }, 0);
    }
  }, [searchParams]);

  // Expand or collapse course card description
  const toggleExpand = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  // Filter computation
  const filteredCourses = courses.filter((c) => {
    if (selectedDomain !== 'all' && c.level !== selectedDomain) return false;
    
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      return (
        c.nameEn.toLowerCase().includes(q) ||
        c.nameNe.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.descEn.toLowerCase().includes(q) ||
        c.descNe.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 animate-fade-in" id="courses-root-view">
      
      {/* Title & Introductory Text */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-[#132a57]/5 border border-[#132a57]/10 px-3 py-1 rounded-full text-xs font-bold text-[#132a57]">
          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-mono text-[10px] tracking-widest uppercase">{isN ? "हाम्रा कोर्षहरू" : "Syllabus Catalog"}</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-black text-[#132a57] tracking-tight uppercase">
          {dict.coursesTitle}
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
          {dict.coursesSub || "Empowering the next generation with structured, direct, hands-on standard IT & computing curriculum."}
        </p>
      </div>

      {/* Categories Tabs & Slimmed Live Filter Bar */}
      <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: dict.ageAll, icon: <Sliders className="w-3.5 h-3.5" /> },
            { id: 'primary', label: dict.levelPrimary },
            { id: 'middle', label: dict.levelLowerSec },
            { id: 'secondary', label: dict.levelSecondary },
            { id: 'hobbyist', label: dict.levelHobbyist }
          ].map((tab) => {
            const isSel = selectedDomain === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedDomain(tab.id as any);
                  setExpandedCourseId(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSel 
                    ? 'bg-[#132a57] text-white shadow-xs' 
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Filter scanner input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setExpandedCourseId(null);
            }}
            placeholder={isN ? "कोर्ष खोज्नुहोस्..." : "Search courses..."}
            className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#132a57]/5 focus:border-[#132a57]"
          />
          {localSearch && (
            <button 
              onClick={() => {
                setLocalSearch('');
                setSelectedDomain('all');
              }}
              className="absolute right-3 top-3 text-[9px] bg-stone-100 text-stone-500 font-extrabold px-1.5 py-0.5 rounded uppercase"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Minimal Grid System of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="filtered-courses-grid">
        <AnimatePresence mode="popLayout">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isOpen={expandedCourseId === course.id}
                onToggle={() => toggleExpand(course.id)}
                language={language}
                dict={dict}
              />
            ))
          ) : (
            <div className="md:col-span-2 text-center bg-stone-50 border border-stone-200/80 p-12 rounded-3xl space-y-3">
              <div className="flex justify-center">
                <HelpCircle className="w-10 h-10 text-stone-300" />
              </div>
              <h3 className="text-sm font-extrabold text-[#132a57]">
                {isN ? "कुनै पाठ्यक्रम फेला परेन" : "No qualifications matched filters"}
              </h3>
              <p className="text-xs text-stone-500 italic">
                {isN ? "यस समूहमा कुनै पाठ्यक्रम भेटिएन। कृपया पुनः प्रयास गर्नुहोस्।" : "Try adjusting your search query or selecting another category."}
              </p>
              <button 
                onClick={() => {
                  setLocalSearch(''); 
                  setSelectedDomain('all');
                }}
                className="bg-[#132a57] hover:bg-[#0c1c3a] text-white text-[11px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg transition"
              >
                Reset Filter
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20 text-stone-500 animate-pulse font-bold text-xs font-mono">
        Loading courses...
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}
