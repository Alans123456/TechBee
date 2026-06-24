'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { translations } from '@/lib/translations';
import { courses } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowRight, 
  Calendar,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

function ContactContent() {
  const { language: rawLanguage } = useApp();
  const language = 'en'; // Force English internally so browser translator API handles it flawlessly
  const searchParams = useSearchParams();
  const dict = translations[language];
  const isN = false; // Force English properties globally so browser translator handles rendering cleanly

  // State handles
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    targetCourse: '',
    questionQuery: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryReceiptNumber, setInquiryReceiptNumber] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  // Hydrate selected course from URL params if present (e.g. from Course or Calculator links)
  useEffect(() => {
    const courseCode = searchParams.get('course_code');
    if (courseCode) {
      const timer = setTimeout(() => {
        setFormData(prev => ({ ...prev, targetCourse: courseCode }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');

    // Simplistic robust validation
    if (!formData.fullName.trim()) {
      setSubmissionError(isN ? "कृपया आफ्नो पूरा नाम लेख्नुहोस्।" : "Please specify your full name.");
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8) {
      setSubmissionError(isN ? "कृपया मान्य १०-अङ्कको फोन नम्बर लेख्नुहोस्।" : "Please input a valid phone number.");
      return;
    }

    // Success response generation
    const randomReceipt = 'TB-' + Math.floor(100000 + Math.random() * 900000);
    setInquiryReceiptNumber(randomReceipt);
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      targetCourse: '',
      questionQuery: ''
    });
    setFormSubmitted(false);
  };

  return (
    <div className="bg-transparent min-h-screen py-10" id="contact-root-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Title Intro */}
        <div className="text-center space-y-3 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF1F2] border border-[#FECDD3] px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest text-[#dc2626] uppercase font-mono">
            <Sparkles className="w-4 h-4 text-[#dc2626] animate-spin" />
            <span>{isN ? "भर्ना परामर्श डेस्क" : "ADMISSIONS HELPLINE"}</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            {isN ? "हामीसँग सम्पर्क गर्नुहोस् — टेक बी नेपाल" : "Always Ready To Connect"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-normal max-w-2xl mx-auto font-medium">
            {isN 
              ? "के तपाईंसँग आईटी पाठ्यक्रम, फीस संरचना, वा अन्तर्राष्ट्रिय सम्बन्धन बारे कुनै जिज्ञासा छ? हाम्रो परामर्श टीमलाई प्रत्यक्ष सम्पर्क गर्नुहोस्।"
              : "Have a question about British diploma credit transfers, corporate tuition scholarships, or class cohort schedules? Get in touch with our Mid-Baneshwor counsellors."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Physical Coordinates and support blocks (Creamy Yellow Theme) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#E8F0FE] border border-[#BED2FE] rounded-3xl p-6.5 sm:p-8 space-y-6 shadow-sm">
              <span className="text-[10px] font-mono font-black text-amber-800 uppercase tracking-widest block">
                📍 {isN ? "कार्यालय सम्पर्क ठेगाना" : "OUR PHYSICAL HEADQUARTERS"}
              </span>

              <h3 className="text-xl font-extrabold text-slate-950 uppercase">
                Mid-Baneshwor, Kathmandu
              </h3>

              <div className="space-y-4 text-xs font-bold text-slate-705">
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Campus Address:</span>
                    <p className="leading-snug">
                      {isN 
                        ? "मध्यबानेश्वर, काठमाडौं, नेपाल (एपेक्स कलेज चोक नजिकै)" 
                        : "Mid-Baneshwor (Near Apex College Intersection), Kathmandu, Nepal"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Helpline Numbers:</span>
                    <p className="leading-snug text-slate-900">
                      <a href="tel:+97714479685" className="hover:underline">+977-1-4479685</a>, <a href="tel:+9779851122334" className="hover:underline">+977-9851122334</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Information Email:</span>
                    <p className="leading-snug text-[#002D62] hover:underline">
                      <a href="mailto:info@techbeenepal.edu.np">info@techbeenepal.edu.np</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Business Hours:</span>
                    <p className="leading-snug">
                      {isN 
                        ? "आइतबार देखि शुक्रबार: बिहान ०७:०० देखि बेलुकी ०६:०० बजे सम्म" 
                        : "Sunday to Friday: 07:00 AM to 06:00 PM (NPT)"}
                    </p>
                  </div>
                </div>

              </div>

              {/* Vector representation/simulated map graphic layout */}
              <div className="border border-[#BED2FE] bg-[#F1F5F9] rounded-2xl p-4.5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#002D62]/[0.02] rounded-bl-full pointer-events-none" />
                <span className="text-[9px] font-mono font-black text-[#002D62] block uppercase tracking-wider">
                  🗺️ SIMULATED CAMPUS NAVIGATION MAP
                </span>
                <p className="text-[11px] text-slate-505 leading-relaxed font-semibold">
                  {isN 
                    ? "कोटेश्वर वा अनामनगर बाट आउने बसहरू मध्यबानेश्वर चोकमा रोकिन्छन्। चौबाटो चोकबाट १० मिटर भित्र टेक बी नेपालको ठूलो रातो र निलो बोर्ड देख्न सकिन्छ।"
                    : "Conveniently located 10 meters off the main Baneshwor junction. Our building has visual landmarks directly pointing to Tech Bee Nepal."}
                </p>
              </div>

            </div>

            {/* Support guarantee badge info */}
            <div className="p-5.5 bg-[#EDF2F7] border border-[#CBD5E0] rounded-2.5xl flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#dc2626] shrink-0" />
              <div className="space-y-0.5">
                <span className="text-xs font-black text-slate-900 block uppercase">
                  {isN ? "२४ घण्टा भित्र जवाफको प्रतिबद्धता" : "GUARANTEED RESPONSE RATIO"}
                </span>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  {isN 
                    ? "हाम्रो अनलाइन फारम भर्ने प्रत्येक विद्यार्थीलाई २४ घण्टा भित्र प्रविधिक विशेषज्ञ फोन मार्फत सम्पर्क गर्नुहुनेछ।"
                    : "Our counsellors contact every verified web submitter within 1 business day."}
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Form Simulator (Creamy Green Theme) */}
          <div className="lg:col-span-7">
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#EFF2F6] border border-[#CBD5E1] rounded-3xl p-6.5 sm:p-10 shadow-sm space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-black text-emerald-800 uppercase tracking-widest block">
                      📝 {isN ? "डिजिटल सोधपुछ फारम" : "PROMOTIONAL INQUIRY FORM"}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 uppercase">
                      {isN ? "आफ्नो सिट सुरक्षित वा सोधपुछ गर्नुहोस्" : "Send A Quick Inquiry"}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug">
                      {isN 
                        ? "तलका विवरण राखी पठाउनुहोस्। कुनै पनि प्रकारको शैक्षिक शुल्क तिर्नु वा खाता खोल्नु पर्दैन।"
                        : "Field submissions are processed immediately. No login credentials or credit lines required."}
                    </p>
                  </div>

                  {submissionError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl font-bold">
                      ⚠ {submissionError}
                    </div>
                  )}

                  <form onSubmit={executeSubmit} className="space-y-4">
                    
                    {/* Name input */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide block">
                        {isN ? "पूरा नाम लिखने ठाउँ:" : "Your Full Name:"} <span className="text-[#dc2626]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={isN ? "जस्तै: राम बहादुर थापा" : "e.g., Ram Bahadur Thapa"}
                        className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                        id="contact-form-name"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Phone Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide block">
                          {isN ? "फोन नम्बर:" : "Phone Number / WhatsApp:"} <span className="text-[#dc2626]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder={isN ? "जस्तै: ९८५१xxxxxx" : "e.g., 9851xxxxxx"}
                          className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                          id="contact-form-phone"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide block">
                          {isN ? "इमेल ठेगाना (ऐच्छिक):" : "Email Address (Optional):"}
                        </label>
                        <input
                          type="email"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          placeholder="e.g., mail@example.com"
                          className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                          id="contact-form-email"
                        />
                      </div>

                    </div>

                    {/* Target Course Select Dropdown */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-[#002D62] uppercase tracking-wide block">
                        {isN ? "तपाईंको रुचि भएको कम्प्युटर कोर्ष:" : "Course of Highest Interest:"}
                      </label>
                      <select
                        name="targetCourse"
                        value={formData.targetCourse}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-3 text-xs font-semibold text-slate-805 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                        id="contact-form-course"
                      >
                        <option value="">-- {isN ? "कुनै एक कोर्ष रोज्नुहोस्" : "Select an IT certification"} --</option>
                        {courses.map(crs => (
                          <option key={crs.id} value={crs.code}>
                            {crs.code} — {isN ? crs.nameNe : crs.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Question custom box */}
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide block">
                        {isN ? "तपाईंको थप सन्देश वा जिज्ञासा:" : "Additional Message or Questions:"}
                      </label>
                      <textarea
                        name="questionQuery"
                        value={formData.questionQuery}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder={isN ? "कोर्ष अवधि, अर्को ब्याचको समय वा छात्रवृत्ति सम्बन्धी कुराहरू सोध्न सक्नुहुन्छ..." : "Type your specific questions about scholarship criteria or night-shift classes here..."}
                        className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-700/20 resize-none"
                        id="contact-form-message"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#002D62] hover:bg-[#dc2626] text-white py-4 px-6 rounded-xl font-bold uppercase text-xs tracking-wider transition-colors duration-300 flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-sm"
                      id="contact-form-submit-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isN ? "फारम बुझाउनुहोस्" : "Submit Inquiry to Admissions Team"}</span>
                    </button>

                  </form>
                </motion.div>

              ) : (

                /* Interactive Receipt Feedback Modal card */
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#EDFDF2] border-2 border-[#DCFCE7] rounded-3xl p-6.5 sm:p-10 shadow-lg space-y-6 text-center"
                >
                  <div className="w-16 h-16 bg-[#EDFDF2] border border-[#DCFCE7] text-emerald-700 rounded-full mx-auto flex items-center justify-center text-3xl font-bold">
                    ✓
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-emerald-700 uppercase tracking-widest block">
                      INQUIRY REGISTERED SUCCESSFULLY
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 uppercase">
                      {isN ? "धन्यवाद, हजुरको सोधपुछ दर्ता भयो!" : "Thank You! We Have Received It"}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      {isN 
                        ? "हाम्रो परामर्श टोलीले हजुरलाई ईमेल वा सिधै फोन कल मार्फत सम्पर्क गर्नुहुनेछ।"
                        : "Your query details are successfully indexed in our offline queue. Below is your local reference citation receipt."}
                    </p>
                  </div>

                  {/* Receipt block */}
                  <div className="bg-[#FAF9F5] border border-slate-200 rounded-2xl p-5.5 text-left text-xs max-w-sm mx-auto space-y-3 font-semibold text-slate-750">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[10px] uppercase font-mono font-bold text-slate-400">
                      <span>Receipt Metadata</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">{inquiryReceiptNumber}</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">FullName:</span>
                        <span>{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span>{formData.phoneNumber}</span>
                      </div>
                      {formData.emailAddress && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Email:</span>
                          <span>{formData.emailAddress}</span>
                        </div>
                      )}
                      {formData.targetCourse && (
                        <div className="flex justify-between text-rose-600">
                          <span className="text-slate-400">Interested IT Track:</span>
                          <span>{formData.targetCourse}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <button
                      onClick={handleResetForm}
                      className="w-full sm:w-auto border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider"
                    >
                      {isN ? "नयाँ फारम खोल्नुहोस्" : "Submit Another Inquiry"}
                    </button>
                    <a
                      href="/courses"
                      className="w-full sm:w-auto bg-[#002D62] hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider text-center"
                    >
                      {isN ? "आईटी कोर्षहरू हेर्नुहोस्" : "Browse Course Syllabi"}
                    </a>
                  </div>

                </motion.div>

              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-24 text-slate-500 animate-pulse font-bold bg-[#F4F6F9] min-h-screen">
        Loading Tech Bee Nepal contact forms...
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
