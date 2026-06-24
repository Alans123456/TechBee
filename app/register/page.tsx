'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { translations } from '@/lib/translations';
import { courses } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  Layers, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  FileText,
  Compass
} from 'lucide-react';

function RegisterFormContent() {
  const { language: rawLanguage, addRegistration } = useApp();
  const language = 'en'; // Force English internally so browser translator API handles it flawlessly
  const dict = translations[language];
  const searchParams = useSearchParams();

  // Selected values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    level: '+2 High School',
    courseId: courses[0]?.id || '',
    batch: 'Morning Cohort (7:00 AM - 9:00 AM) — Ideal for Working Professionals'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReg, setSuccessReg] = useState<any | null>(null);

  // Read preselected course from query string (e.g. ?course_code=DS-SEC-CEH)
  useEffect(() => {
    const rawCode = searchParams.get('course_code');
    if (rawCode) {
      const match = courses.find(c => c.code.toLowerCase() === rawCode.toLowerCase());
      if (match) {
        setTimeout(() => {
          setFormData(prev => ({ ...prev, courseId: match.id }));
        }, 0);
      }
    }

    // Scholarship text indicator
    const scholarshipCheck = searchParams.get('scholarship_check');
    if (scholarshipCheck === 'true') {
      // Highlight form or prefill if needed
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert(language === 'en' ? "Please fill in all mandatory fields." : "कृपया सबै अनिवार्य स्थानहरू भर्नुहोस्।");
      return;
    }

    setIsSubmitting(true);

    // Simulate database post delay
    setTimeout(() => {
      const created = addRegistration({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        school: formData.school || "N/A",
        level: formData.level,
        courseId: formData.courseId,
        batch: formData.batch
      });

      setSuccessReg(created);
      setIsSubmitting(false);
    }, 1200);
  };

  const selectedCourse = courses.find(c => c.id === (successReg?.courseId || formData.courseId));
  const isN = false; // Force English properties globally so browser translator handles rendering cleanly

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10" id="register-root">
      
      {/* Page headers */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-[#FAF9F5] border border-slate-200 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest text-[#002D62] uppercase font-mono">
          <Layers className="w-4 h-4 text-[#dc2626]" />
          <span>ADMISSIONS CENTER 2026</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4.5.xl font-black text-slate-900 tracking-tight leading-none uppercase">
          {dict.registerTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-normal">
          {dict.registerSub}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!successReg ? (
          <motion.div
            key="registration-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border-2 border-slate-200/90 rounded-2.5xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
          >
            {/* Upper subtle bar decoration */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#dc2626] to-[#002D62]" />

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {dict.formName} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isN ? "आफ्नो पूरा नाम लेख्नुहोस्" : "e.g., Samir Basnet"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {dict.formEmail} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={isN ? "इमेल ठेगाना लेख्नुहोस्" : "samir@gmail.com"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {dict.formPhone} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g., +977 980XXXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800"
                    />
                  </div>
                </div>

                {/* College / School */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {dict.formSchool}
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      placeholder={isN ? "कलेज वा स्कुलको नाम हाल्नुहोस्" : "e.g., Patan Multiple Campus"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800"
                    />
                  </div>
                </div>

                {/* Education Level */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {dict.formLevel}
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800 select-none"
                    >
                      <option value="SEE / SLC Graduate">SEE / SLC Level Graduate</option>
                      <option value="+2 High School">+2 Intermediate Graduate</option>
                      <option value="Bachelors IT Student">Bachelors IT / CS Student</option>
                      <option value="Working IT specialist">Working IT Enterprise Specialisation</option>
                    </select>
                  </div>
                </div>

                {/* Course Select */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {dict.formCourse}
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800 select-none"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>
                          [{c.code}] {isN ? c.nameNe : c.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Shift Preference */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {dict.formSchedule}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800 select-none"
                    >
                      <option value={dict.schedMorning}>{dict.schedMorning}</option>
                      <option value={dict.schedAfternoon}>{dict.schedAfternoon}</option>
                      <option value={dict.schedEvening}>{dict.schedEvening}</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Tuition Fees Helper Banner */}
              {selectedCourse && (
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE9E1] text-xs space-y-1 leading-relaxed text-slate-750">
                  <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-rose-600 block">ESTIMATED CLASS PRICING DETAILS:</span>
                  <p>
                    {isN ? "कोर्ष कोड:" : "Syllabus Track:"} <strong>{selectedCourse.code}</strong> • {isN ? "प्रस्तावित शैक्षिक लगानी:" : "Tuition Investment:"} <strong>{isN ? selectedCourse.priceNe : selectedCourse.priceEn}</strong>
                  </p>
                  <span className="text-[10px] text-slate-400 italic block font-medium">
                    *Note: Candidates applying through this local portal are eligible for scholarship reviews up to 40% upon submitting proof of credentials.
                  </span>
                </div>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#dc2626] hover:bg-rose-700 text-white font-extrabold py-4 px-6 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md text-center inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Saving admissions details...</span>
                ) : (
                  <>
                    <FileText className="w-4.5 h-4.5 shrink-0" />
                    <span>{dict.formSubmit}</span>
                  </>
                )}
              </button>

            </form>
          </motion.div>
        ) : (
          <motion.div
            key="registration-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-slate-200/90 rounded-2.5xl p-6.5 sm:p-10 shadow-2xl text-center space-y-6 max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-emerald-55 bg-emerald-500 rounded-full mx-auto flex items-center justify-center text-white text-2.5xl font-black shadow-lg">
              ✓
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-emerald-600 font-mono font-black uppercase tracking-[0.2em] block">REGISTRATION SECURED FOR 2026</span>
              <h2 className="font-sans text-xl sm:text-2xl font-black text-slate-900 uppercase">
                {isN ? "दूरशिक्षामा भर्ना आवेदन स्वीकृत" : "Admissions Reserved Successfully"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                {dict.formSuccess}
              </p>
            </div>

            {/* Receipt Summary Grid */}
            <div className="bg-slate-50 border border-slate-250/60 rounded-2xl p-6 text-left space-y-3 font-semibold text-xs text-slate-705">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{isN ? "विद्यार्थी दर्ता ID नम्बर" : "OFFICIAL REGISTRATION ID"}</span>
                <span className="text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-2.5 py-0.5 font-mono font-black tracking-wider text-sm select-all">
                  {successReg.id}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">{isN ? "विद्यार्थीको पूरा नाम" : "Candidate Name"}</span>
                <span className="text-slate-800">{successReg.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">{isN ? "छनोट गरिएको कोर्ष" : "Reserved Track"}</span>
                <span className="text-[#002D62]">{selectedCourse ? `[${selectedCourse.code}] ${isN ? selectedCourse.nameNe : selectedCourse.nameEn}` : "N/A"}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">{isN ? "रोजिएको ब्याच समय" : "Timing Batch"}</span>
                <span className="text-slate-800 text-right max-w-sm leading-snug">{successReg.batch}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-bold">
                <span>DATE REGISTERED: {successReg.regDate}</span>
                <span>STATUS: SECURED SHIFT</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setSuccessReg(null)}
                className="w-full sm:w-auto border border-slate-300 hover:border-slate-400 text-slate-650 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Register Another Candidate
              </button>

              <Link
                href={`/dashboard?verifiedId=${successReg.id}`}
                className="w-full sm:w-auto bg-[#002D62] hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider text-center"
              >
                Go to Student Portal verifier →
              </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-24 text-slate-500 animate-pulse font-bold">
        Loading Tech Bee Nepal Admissions Board Desk...
      </div>
    }>
      <RegisterFormContent />
    </Suspense>
  );
}
