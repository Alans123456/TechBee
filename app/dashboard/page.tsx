'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { translations } from '@/lib/translations';
import { mockStudents, courses } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Award, 
  MapPin, 
  GraduationCap, 
  Award as RibbonIcon, 
  Layers, 
  ChevronRight, 
  ClipboardCheck, 
  Users, 
  Phone,
  FileCheck,
  Download,
  X
} from 'lucide-react';

function DashboardContent() {
  const { language, registrations } = useApp();
  const dict = translations[language];
  const searchParams = useSearchParams();

  const [studentIdInput, setStudentIdInput] = useState('');
  const [activeProfile, setActiveProfile] = useState<any | null>(null);
  const [searchError, setSearchError] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);

  const triggerLookup = React.useCallback((idToSearch: string) => {
    const trimmed = idToSearch.trim().toUpperCase();
    if (!trimmed) return;

    // 1. Search in data.ts mock students database
    if (mockStudents[trimmed]) {
      setActiveProfile(mockStudents[trimmed]);
      setSearchError('');
      return;
    }

    // 2. Search in registrations context (newly registered candidates)
    const localReg = registrations.find(r => r.id.toUpperCase() === trimmed);
    if (localReg) {
      const selectedC = courses.find(c => c.id === localReg.courseId);
      // Map to a realistic scorecard structure
      const mockResult = {
        id: localReg.id,
        nameEn: localReg.name,
        nameNe: localReg.name, // Placeholder
        schoolEn: localReg.school || "Autonomous Academy",
        schoolNe: localReg.school || "आबद्ध इन्स्टिच्युट",
        levelEn: selectedC ? selectedC.levelEn : "IT Specialized",
        levelNe: selectedC ? selectedC.levelNe : "आईटी विशेषज्ञता",
        projectNameEn: "Admissions Verification Phase",
        projectNameNe: "प्रवेश प्रमाणीकरण तथा पूर्व-मूल्यांकन",
        projectDescEn: "Standard entrance metrics have been saved. Admissions review board is validating previous GPA records prior to allocation of certified labs.",
        projectDescNe: "नयाँ भर्ना भएका हुनाले प्रयोगात्मक ल्याब र परीक्षा विवरण प्रमाणित हुन बाँकी रहेको अवस्था। सुचारु कक्षा पश्चात प्रयोगात्मक डेटा अनपेक्षित रूपमा यता देखिनेछ।",
        hardware: 85, // Default average placeholder metrics
        software: 80,
        creative: 75,
        teamwork: 90,
        presentation: 80,
        statusEn: "Core Engineering Phase",
        statusNe: "मुख्य इन्जिनियरिङ चरण",
        feedbackEn: "Admissions files safely synchronized. Registered timing is: " + localReg.batch,
        feedbackNe: "भर्ना फारम सुरक्षित रूपमा प्राप्त भयो। कक्षा समय सिफ्ट: " + localReg.batch
      };
      setActiveProfile(mockResult);
      setSearchError('');
      return;
    }

    // 3. Fallback error state
    setActiveProfile(null);
    setSearchError(
      language === 'en'
        ? "No active Tech Bee student found matching this credential key. Try searching 'TB-2026-01' or 'TB-2026-02'."
        : "प्रविष्ट गरिएको विद्यार्थी कोड फेला परेन। कृपया 'TB-2026-01' वा 'TB-2026-02' हालेर अभ्यास गर्नुहोस्।"
    );
  }, [registrations, language]);

  // Auto-fill query parameter if loaded from Register success link (verifiedId=DS-2026-REG-xxx)
  useEffect(() => {
    const queryId = searchParams.get('verifiedId');
    if (queryId) {
      setTimeout(() => {
        setStudentIdInput(queryId);
        triggerLookup(queryId);
      }, 0);
    } else {
      // Load first mock student by default as an interactive preview
      setTimeout(() => {
        triggerLookup("TB-2026-01");
      }, 0);
    }
  }, [searchParams, triggerLookup]);

  const calculateAverage = (prof: any) => {
    if (!prof) return 0;
    return Math.round((prof.hardware + prof.software + prof.creative + prof.teamwork + prof.presentation) / 5);
  };

  const isN = language === 'ne';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="dashboard-root">
      
      {/* Page Headers */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-[#FAF9F5] border border-slate-200 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest text-[#002D62] uppercase font-mono">
          <ClipboardCheck className="w-4 h-4 text-[#dc2626]" />
          <span>STUDENT TRANSCRIPT DESK</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4.5.xl font-black text-slate-900 tracking-tight leading-none uppercase">
          {dict.dashboardTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-normal">
          {dict.dashboardSub}
        </p>
      </div>

      {/* Input Verification bar */}
      <div className="max-w-xl mx-auto bg-white border-2 border-slate-200/90 rounded-2.5xl p-4.5 shadow-sm">
        <form 
          onSubmit={(e) => { e.preventDefault(); triggerLookup(studentIdInput); }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-grow w-full">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={studentIdInput}
              onChange={(e) => setStudentIdInput(e.target.value)}
              placeholder={dict.dashLookupPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#002D62] hover:bg-slate-900 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {dict.dashLookupBtn}
          </button>
        </form>

        {searchError && (
          <p className="text-rose-600 text-xs font-semibold mt-3 text-center leading-relaxed">
            ⚠️ {searchError}
          </p>
        )}
      </div>

      {/* Active profile scorecard corridor layout */}
      <AnimatePresence mode="wait">
        {activeProfile ? (
          <motion.div
            key={activeProfile.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            id={`profile-cardcard-${activeProfile.id}`}
          >
            
            {/* Left box: Primary Profile card */}
            <div className="lg:col-span-4 bg-white border-2 border-slate-200/90 rounded-2.5xl p-6.5 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-[#dc2626]" />

              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-[#002D62] text-white flex items-center justify-center font-black text-lg">
                  {activeProfile.nameEn.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-sm font-mono font-bold text-slate-500 tracking-wider">
                    ID: {activeProfile.id}
                  </span>
                  <h3 className="font-sans text-base sm:text-lg font-black text-slate-900 mt-1">
                    {isN ? activeProfile.nameNe : activeProfile.nameEn}
                  </h3>
                </div>
              </div>

              {/* Quick static credentials specs list */}
              <div className="space-y-3 pt-4 border-t border-slate-150/80 text-xs font-bold text-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Track Domain:</span>
                  <span className="text-[#002D62]">{isN ? activeProfile.levelNe : activeProfile.levelEn}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Campus affiliate:</span>
                  <span className="text-slate-700">{isN ? activeProfile.schoolNe : activeProfile.schoolEn}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Registry status:</span>
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2 py-0.5 font-sans">
                    {isN ? activeProfile.statusNe : activeProfile.statusEn}
                  </span>
                </div>
              </div>

              {/* Subsidized Class banner indicator */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">CAPSTONE PERFORMANCE INDEX:</span>
                <p className="text-2xl font-black text-[#002D62] font-mono">
                  {calculateAverage(activeProfile)}% <span className="text-xs text-slate-400 font-bold">(Aggregate GPA Tier A)</span>
                </p>
              </div>

              {activeProfile.certUrl && (
                <button
                  onClick={() => setShowCertModal(true)}
                  className="w-full bg-[#dc2626] hover:bg-rose-700 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                >
                  <RibbonIcon className="w-4 h-4" />
                  <span>{isN ? "डिजिटल प्रमाणपत्र खोल्नुहोस्" : "View Digital Certificate & Seal"}</span>
                </button>
              )}

            </div>

            {/* Right box: Dynamic Visual Performance radar columns */}
            <div className="lg:col-span-8 bg-white border-2 border-slate-200/90 rounded-2.5xl p-6.5 sm:p-8 shadow-xs space-y-6">
              
              <div>
                <h3 className="font-sans text-xs font-black text-[#002D62] uppercase tracking-[0.2em] mb-1.5 block">
                  📊 Student Evaluation parameters
                </h3>
                <p className="text-xs text-slate-500 leading-snug">
                  {isN 
                    ? "परियोजना मूल्यांकन शाखाद्वारा रुजु गरिएको लाइभ परीक्षा र प्रयोगात्मक ल्याबहरूको नम्बर रेखाचित्र विवरण:" 
                    : "Live progress indices generated by Tech Bee Nepal internal examiners for active lab files:"}
                </p>
              </div>

              {/* Visual metrics rows with real-time percentages gauges */}
              <div className="space-y-4">
                
                {[
                  { key: 'hardware', label: dict.metricsHardware },
                  { key: 'software', label: dict.metricsSoftware },
                  { key: 'creative', label: dict.metricsCreative },
                  { key: 'teamwork', label: dict.metricsTeamwork },
                  { key: 'presentation', label: dict.metricsPresentation }
                ].map((metric) => {
                  const val = activeProfile[metric.key];
                  return (
                    <div key={metric.key} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-705">
                        <span>{metric.label}</span>
                        <span className="text-rose-600 font-mono font-black text-sm">{val}% / 100</span>
                      </div>
                      
                      {/* Gauge Bar container */}
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#002D62] to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* capstone Project Review card */}
              <div className="p-4.5 sm:p-5 bg-[#FAF9F5] border border-[#ECE9E1] rounded-2xl space-y-2">
                <span className="text-[10px] font-mono font-black text-rose-600 block uppercase tracking-widest">
                  {isN ? "प्रमुख क्यापस्टोन परियोजना बिषय:" : "MASTER COHORT PROJECT LOGS:"}
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  {isN ? activeProfile.projectNameNe : activeProfile.projectNameEn}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-serif italic">
                  &ldquo;{isN ? activeProfile.projectDescNe : activeProfile.projectDescEn}&rdquo;
                </p>

                <div className="pt-2 border-t border-slate-200 mt-2">
                  <span className="text-[9px] text-[#002D62] font-black block uppercase tracking-wider">
                    {isN ? "विषय विज्ञ प्रशिक्षक प्रतिक्रिया:" : "Certified Mentor Feedback:"}
                  </span>
                  <p className="text-xs text-slate-650 leading-relaxed mt-1 font-sans">
                    {isN ? activeProfile.feedbackNe : activeProfile.feedbackEn}
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2.5xl max-w-xl mx-auto p-8 space-y-2">
            <span className="text-3xl">📭</span>
            <h4 className="font-sans text-sm font-extrabold text-slate-900">
              No Profile Loaded
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your student code (e.g. <strong>TB-2026-01</strong>) in the bar above to load authentic scores and certifications.
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* Official transcript PDF download modal simulation */}
      <AnimatePresence>
        {showCertModal && activeProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-8 border-double border-[#002D62] max-w-2xl w-full p-6 sm:p-8 rounded-3xl relative overflow-hidden text-slate-900 shadow-2xl space-y-6"
            >
              
              {/* Close button */}
              <button
                onClick={() => setShowCertModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Official Credential Border graphic */}
              <div className="border-2 border-slate-200 p-6 sm:p-10 space-y-6 text-center text-slate-950 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#002D62]/5 rounded-bl-full pointer-events-none" />
                
                <span className="text-4xl">🎓</span>
                
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-black text-[#002D62] uppercase tracking-wide">
                    Tech Bee Nepal Academy
                  </h2>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-slate-500 block font-bold leading-none">
                    Mid-Baneshwor, Kathmandu, Nepal
                  </span>
                  <span className="text-[8px] bg-rose-50 border border-rose-200 text-rose-600 font-bold uppercase rounded-md px-2 py-0.5 inline-block font-mono mt-1">
                    ACCREDITED NO: TB-NP-2026
                  </span>
                </div>

                <div className="space-y-2 pt-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-extrabold">THIS OFFICIAL CREDENTIAL IS GRANTED TO:</span>
                  <h3 className="font-sans text-xl sm:text-2xl font-black text-slate-900 uppercase">
                    {activeProfile.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                    for having successfully met the rigorous theoretical evaluations and practical laboratory requirements under the curriculum alignment of
                  </p>
                  <h4 className="text-xs sm:text-sm font-black text-rose-600 uppercase tracking-wider block">
                    {activeProfile.levelEn}
                  </h4>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-150 max-w-xs mx-auto">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Project verification check:</span>
                  <p className="text-[11px] font-bold text-[#002D62] leading-snug">
                     {activeProfile.projectNameEn}
                  </p>
                </div>

                <div className="flex justify-between items-end pt-8 text-left text-[9px] font-bold text-slate-450 font-mono">
                  <div className="space-y-1">
                    <span>REGISTRY ID: {activeProfile.id}</span>
                    <span className="block">VERIFIER HASH: {activeProfile?.certUrl}</span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="border-t border-slate-300 pt-1 px-4 block">EXAMINATIONS CHAIR</span>
                    <span>ISSUED: JUNE 2026</span>
                  </div>
                </div>

              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => alert("Transcript is officially verified. Saving PDF is enabled in candidate login portal.")}
                  className="bg-[#002D62] hover:bg-slate-900 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Document</span>
                </button>
                <button
                  onClick={() => setShowCertModal(false)}
                  className="border border-slate-350 hover:bg-slate-50 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                >
                  Close verifier
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-24 text-slate-500 animate-pulse font-bold">
        Loading Tech Bee Nepal Academic Transcript verifier...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
