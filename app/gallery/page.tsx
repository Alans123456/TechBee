'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/AppContext';
import { translations } from '@/lib/translations';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Images, 
  Sparkles, 
  Layers, 
  Award, 
  ExternalLink,
  Cpu,
  Monitor,
  Heart
} from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'classroom' | 'lab' | 'graduation' | 'event';
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  imageUrl: string;
  badgeColor: string; // e.g., 'bg-amber-100 text-amber-850'
}

export default function GalleryPage() {
  const { language: rawLanguage } = useApp();
  const language = 'en'; // Force English internally so browser translator API handles it flawlessly
  const dict = translations[language];
  const isN = false; // Force English properties globally so browser translator handles rendering cleanly

  const [activeFilter, setActiveFilter] = useState<'all' | 'classroom' | 'lab' | 'graduation' | 'event'>('all');

  const categories = [
    { id: 'all', labelEn: 'All Highlights', labelNe: 'सबै तस्वीरहरू' },
    { id: 'classroom', labelEn: 'Interactive Classrooms', labelNe: 'अन्तरक्रियात्मक कक्षाकोठा' },
    { id: 'lab', labelEn: 'Certified Cloud/IT Labs', labelNe: 'प्रमाणित क्लाउड/आईटी ल्याब' },
    { id: 'graduation', labelEn: 'NCC UK Graduations', labelNe: 'युनिभर्सिटी दीक्षान्त' },
    { id: 'event', labelEn: 'Hacking & Hackathons', labelNe: 'ह्याकाथुन र इभेन्टहरू' }
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      category: 'lab',
      titleEn: "Advanced Cisco & Subnetting Lab",
      titleNe: "सिस्को नेटवर्किङ र सबनेटिङ प्रयोगशाला",
      descEn: "Student bees configuring active switches and enterprise physical servers.",
      descNe: "विद्यार्थीहरूले सिस्को स्विच र संस्थागत सर्भरहरू आफैं सेटअप गर्दै गरेको प्रयोगशाला।",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      badgeColor: "bg-[#EDFDF2] text-emerald-800 border-emerald-250/50"
    },
    {
      id: 'gal-2',
      category: 'graduation',
      titleEn: "Official British Degree Convocation",
      titleNe: "बेलायती विश्वविद्यालयको दीक्षान्त समारोह",
      descEn: "Alumni celebrating credit transfers and certified degree certificates from NCC UK.",
      descNe: "बेलायतको NCC Education बाट स्नातक र प्रविधि कोर्ष पास भई दीक्षित हुँदै गरेका मेधावी टिम।",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
      badgeColor: "bg-[#FEFCE8] text-amber-800 border-amber-250/50"
    },
    {
      id: 'gal-3',
      category: 'classroom',
      titleEn: "BSc (Hons) Interactive Studio",
      titleNe: "शैक्षिक कलेज तथा थ्यौरी क्लासरुम",
      descEn: "State-of-the-art multimedia display boards with modern individual modular desks.",
      descNe: "अत्याधुनिक मल्टिमिडिया डिस्प्ले बोर्ड र व्यक्तिगत मोड्युलर डेस्कसहितको उत्कृष्ट कोठा।",
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
      badgeColor: "bg-[#FFF1F2] text-rose-800 border-rose-250/50"
    },
    {
      id: 'gal-4',
      category: 'event',
      titleEn: "Cyber Security CTF Hacking Tournament",
      titleNe: "साइबर सेक्युरिटी एथिकल ह्याकिङ प्रतियोगिता",
      descEn: "Penetration testing battleground where students defend systems from mock external threat vectors.",
      descNe: "हाम्रा विद्यार्थीहरूले अनपेक्षित बाह्य नेटवर्क ह्याकिङ आक्रमण रोक्ने प्रयोगात्मक अभ्यास गर्दै।",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
      badgeColor: "bg-[#F0F7FF] text-blue-800 border-blue-250/50"
    },
    {
      id: 'gal-5',
      category: 'lab',
      titleEn: "AWS Cloud Operations Sandbox",
      titleNe: "AWS क्लाउड पूर्वाधार स्यान्डबक्स ल्याब",
      descEn: "Real-time deployment of VPC subnets, cloud storage, and database server scaling indexes.",
      descNe: "क्लाउड वातावरणमा VPC सबनेट, र डेटाबेस अटो-स्केलिङ गराउने प्रयोगात्मक डिभाइस युनिट।",
      imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80",
      badgeColor: "bg-[#FAF5FF] text-purple-800 border-purple-250/50"
    },
    {
      id: 'gal-6',
      category: 'event',
      titleEn: "MERN Stack software Hackathon Showcase",
      titleNe: "MERN स्ट्याक सफ्टवेयर विकास तथा शोकेस",
      descEn: "Vibrant demo sessions presenting web applications and APIs directly to Kathmandu IT recruiters.",
      descNe: "हाम्रा विद्यार्थीहरूले तयार पारेका उत्कृष्ट एपहरू रोजगारदाता कम्पनीका प्रमुखहरू समक्ष प्रदर्शन गर्दै।",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      badgeColor: "bg-[#EDFDF2] text-emerald-800 border-emerald-250/50"
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="bg-transparent min-h-screen py-10" id="gallery-root-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Gallery Title Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F0FE] border border-[#BED2FE] px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest text-[#002D62] uppercase font-mono">
            <Images className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>{isN ? "भौतिक पूर्वाधार प्रदर्शनि" : "CAMPUS PHYSICAL PORTLAND"}</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            {isN ? "हाम्रो प्रविधि प्रयोगशाला र कलेज ग्यालेरी" : "Explore Our State-of-the-Art Hub"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-normal max-w-2xl mx-auto font-medium">
            {isN 
              ? "काठमाडौंको मुटु मध्यबानेश्वर स्थित हाम्रो आधुनिक बिल्डिङ, सञ्चालित प्रयोगात्मक ल्याब र ऐतिहासिक बेलायती दीक्षान्त कार्यक्रमहरूको फोटो संग्रह।"
              : "Tech Bee Nepal represents the pinnacle of computer education layouts in Nepal. Swipe, filter, and inspect our real-time networks, classrooms, and certified workspaces."}
          </p>
        </div>

        {/* Dynamic Category Filter Bars */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-4">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-xs font-black tracking-wide transition-all border cursor-pointer ${
                  isActive 
                    ? 'bg-[#002D62] text-white border-[#002D62] shadow-sm scale-102 font-bold'
                    : 'bg-white text-slate-650 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? cat.labelEn : cat.labelNe}
              </button>
            );
          })}
        </div>

        {/* Gallery Bento Grid Layout with animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="gallery-images-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 rounded-2.5xl overflow-hidden shadow-xs hover:shadow-md transition-all group relative flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={language === 'en' ? item.titleEn : item.titleNe}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  
                  {/* Category label overlays */}
                  <span className={`absolute top-4 left-4 border text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${item.badgeColor}`}>
                    {item.category}
                  </span>
                </div>

                {/* Content description card section */}
                <div className="p-5.5 space-y-2">
                  <h4 className="font-sans text-sm sm:text-base font-black text-slate-900 leading-tight">
                    {language === 'en' ? item.titleEn : item.titleNe}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {language === 'en' ? item.descEn : item.descNe}
                  </p>
                </div>

                {/* Bottom decorative stats label */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold font-mono">
                  <span>TECH BEE NEPAL • 2026</span>
                  <span className="text-[#002D62] text-[9px] uppercase tracking-wider flex items-center gap-1">
                    VERIFIED CAMPUS PHOTO <Heart className="w-3 h-3 text-[#dc2626] fill-current" />
                  </span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Decorative Creamy green Call To Action card */}
        <section className="bg-[#E8F0FE] border border-blue-100 rounded-3xl p-6 sm:p-10 text-center space-y-4 max-w-4xl mx-auto" id="gallery-cta-banner">
          <span className="text-[9px] font-mono font-black text-emerald-700 block uppercase tracking-widest">
            🎓 {isN ? "प्रत्यक्ष शैक्षिक भ्रमण" : "SCHEDULE A HUBS VISIT"}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
            {isN ? "के फेब्रुवरी ब्याचको लागि कलेज भिजिट गर्न चाहाउनुहुन्छ?" : "Would you like to speak to our student counsellors?"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-505 max-w-xl mx-auto leading-relaxed">
            {isN 
              ? "मध्यबानेश्वर स्थित हाम्रो मुख्य परीक्षा केन्द्र तथा लाइभ ल्याबहरू सोझै अवलोकन गर्न कुनै पनि दिन बिहान ८ बजेदेखि बेलुकी ६ बजेसम्म आउन सक्नुहुन्छ।"
              : "We cordially invite corporate recruiters, high school counselors, and proactive students to inspect our network setup and hardware resources manually. Send us a simple greeting!"}
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="bg-[#002D62] hover:bg-slate-900 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all inline-block"
            >
              {isN ? "सम्पर्क ठेगाना मार्ग →" : "Contact Our Admissions Desk →"}
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
