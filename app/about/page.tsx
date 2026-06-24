'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/AppContext';
import { translations } from '@/lib/translations';
import { HoneycombBackground } from '@/components/HoneycombBackground';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Award, 
  MapPin, 
  Users, 
  CheckCircle, 
  BookOpen, 
  Workflow,
  Sparkles,
  Briefcase,
  Layers,
  GraduationCap,
  ChevronRight,
  Filter,
  Monitor,
  HeartHandshake
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  roleEn: string;
  roleNe: string;
  initials: string;
  tag: 'leadership' | 'instructor' | 'placement';
  degree: string;
  bioEn: string;
  bioNe: string;
  certifications: string[];
  bgGradient: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Samir Basnet",
    roleEn: "Chief Executive & Founder",
    roleNe: "प्रमुख कार्यकारी तथा संस्थापक",
    initials: "SB",
    tag: "leadership",
    degree: "MBA (IT Management)",
    bioEn: "Over 15+ years spearheading professional IT education networks and university alignment models in Nepal.",
    bioNe: "विगत १५ वर्षदेखि नेपालमा विशेषज्ञ आईटी शिक्षा सञ्जाल र विश्वविद्यालय समन्वय कार्यक्रमहरूको नेतृत्व गर्दै आउनुभएको।",
    certifications: ["ITIL Practitioner", "Academic Liaison Specialist"],
    bgGradient: "from-slate-800 to-[#132a57]"
  },
  {
    id: 2,
    name: "Krishna Adhikari",
    roleEn: "Director of Academics",
    roleNe: "शैक्षिक निर्देशक",
    initials: "KA",
    tag: "leadership",
    degree: "MSc in Computer Science",
    bioEn: "Supervises external British diploma equivalence validations, UK curriculum quality audits, and high-integrity lab delivery pipelines.",
    bioNe: "बेलायती विश्वविद्यालयको समकक्षता, पाठ्यक्रम अडिट र प्रयोगात्मक ल्याबको गुणस्तर जाँचको निरीक्षण गर्नुहुन्छ।",
    certifications: ["NCC UK Coordinator", "ISO Quality Lead Auditor"],
    bgGradient: "from-amber-600 to-amber-700"
  },
  {
    id: 3,
    name: "Er. Niraj Shrestha",
    roleEn: "Principal Cybersecurity Architect",
    roleNe: "मुख्य साइबर सुरक्षा प्रशिक्षक",
    initials: "NS",
    tag: "instructor",
    degree: "B.E. Computer, CEH, LPT",
    bioEn: "Secures financial banking databases across Nepal and trains students on live threat vectors, penetration tests, and SOC setups.",
    bioNe: "विगत ७ वर्षदेखि नेपाली वित्तीय क्षेत्रको साइबर सेक्युरिटी अडिट र एथिकल ह्याकिङ बुटक्याम्प सञ्चालन गर्दै आउनुभएको।",
    certifications: ["CEH v12 ANSI", "Licensed Penetration Tester"],
    bgGradient: "from-emerald-600 to-emerald-700"
  },
  {
    id: 4,
    name: "Pragya Dwivedi",
    roleEn: "Senior AWS Cloud Advisor",
    roleNe: "वरिष्ठ AWS क्लाउड प्रशिक्षक",
    initials: "PD",
    tag: "instructor",
    degree: "AWS Solutions Architect Professional",
    bioEn: "Guides students on enterprise cloud architecture, Infrastructure as Code configurations, and serverless deployment models.",
    bioNe: "प्रयोगात्मक रूपमा अमेजन क्लाउड कन्सोलमा सर्भर डिजाइन र इन्फ्रास्ट्रक्चर म्यानेजमेन्ट सिकाउनुहुन्छ।",
    certifications: ["AWS Solutions Architect", "AWS Authorized Instructor"],
    bgGradient: "from-blue-600 to-indigo-700"
  },
  {
    id: 5,
    name: "Er. Rohan Karki",
    roleEn: "Cisco Networking Lead",
    roleNe: "नेटवर्किङ डिभाइस मेन्टर",
    initials: "RK",
    tag: "instructor",
    degree: "Cisco CCNP Enterprise",
    bioEn: "Directly engineers physical Cisco router clusters, fiber-optic splicing nodes, and software-defined network labs at our Baneshwor campus.",
    bioNe: "मध्यबानेश्वरस्थित ल्याबमा वास्तविक सिस्को राउटर, स्विच र नेटवर्किङ यन्त्रहरूमा प्रयोगात्मक अभ्यास गराउनुहुन्छ।",
    certifications: ["CCNP Enterprise", "Cisco Certified Academy Trainer"],
    bgGradient: "from-slate-600 to-slate-800"
  },
  {
    id: 6,
    name: "Saraswati Thapa",
    roleEn: "Placement & Corporate Liaison",
    roleNe: "रोजगारी तथा औद्योगिक समन्वय अधिकृत",
    initials: "ST",
    tag: "placement",
    degree: "BBA in HR Management",
    bioEn: "Maintains active hiring covenants with Nepal's premier corporate houses, F1Soft, Deerhold, and financial banks for instant placements.",
    bioNe: "विद्यार्थीहरूको रोजगारीका लागि F1Soft, Deerhold र विभिन्न आईटी कम्पनीहरूसँग विशेषाधिकार सम्बन्ध राख्नुहुन्छ।",
    certifications: ["Technical Career Coach", "Corporate HR Liaison Manager"],
    bgGradient: "from-rose-600 to-red-700"
  }
];

export default function AboutPage() {
  const { language } = useApp();
  const dict = translations[language];
  const isN = language === 'ne';

  // Filters State for Team Showcase
  const [activeFilter, setActiveFilter] = useState<'all' | 'leadership' | 'instructor' | 'placement'>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(teamMembers[0]);

  const stats = [
    { labelEn: "Years of Trust", labelNe: "विश्वासका वर्षहरू", val: "10+ Yrs", icon: Building },
    { labelEn: "Direct Placements", labelNe: "सुनिश्चित रोजगारी", val: "1,200+", icon: Briefcase },
    { labelEn: "Hiring Partners", labelNe: "आबद्ध कम्पनीहरू", val: "150+", icon: Users },
    { labelEn: "Global Badges", labelNe: "अन्तर्राष्ट्रिय प्रमाणपत्र", val: "6+", icon: Award }
  ];

  const milestones = [
    {
      year: "2016",
      titleEn: "Foundation & Cisco Alignment",
      titleNe: "स्थापना तथा सिस्को एकेडेमी सम्बद्धता",
      descEn: "Opened advanced local hardware networking sandbox rigs in Mid-Baneshwor, Kathmandu.",
      descNe: "काठमाडौँको मध्यबानेश्वरमा प्रयोगात्मक डिभाइस सहितको नेटवर्किङ ल्याब मार्फत सेवा प्रारम्भ।"
    },
    {
      year: "2019",
      titleEn: "British University Partner status",
      titleNe: "बेलायती विश्वविद्यालय कोर्ष सुरुवात",
      descEn: "Formally aligned with NCC Education UK to deliver gold-standard computing diplomas with global college transfer rights.",
      descNe: "बेलायतको निक्क एजुकेशन (NCC) सँग आधिकारिक सम्बन्धन र नेपालमै बेलायती कलेज सरह डिप्लोमा सुरु।"
    },
    {
      year: "2022",
      titleEn: "Premier AWS Academy Support",
      titleNe: "AWS एकेडेमी आधिकारिक अनुमति",
      descEn: "Elected as a distinguished AWS Academy learning partner in Nepal providing certified cloud architecture sandboxes.",
      descNe: "नेपालकै उत्कृष्ट AWS एकेडेमी पार्टनर भई लाइभ अमेजन सर्भर कन्सोलमा अभ्यास गराउन थालिएको।"
    },
    {
      year: "2026",
      titleEn: "SecOps & Machine Learning Hub",
      titleNe: "साइबर सेक्युरिटी र एआई प्रविधि विस्तार",
      descEn: "Upgraded curriculum to fully incorporate EC-Council CEH v12 labs and modern JavaScript frameworks.",
      descNe: "आधुनिक एथिकल ह्याकिङ र विश्वस्तरीय प्रविधिको बुटक्याम्प विस्तार गरी देशकै अग्रणी स्थापना।"
    }
  ];

  const techEcosystem = [
    {
      name: "PHP & Laravel",
      category: "Full-Stack Web Dynamics",
      desc: "Robust back-end framework for high-throughput relational web APIs and corporate service nodes.",
      logoLetter: "Ph",
      badgeColor: "bg-indigo-600/90 text-white"
    },
    {
      name: "MySQL Database",
      category: "Relational Ledgers",
      desc: "Structured querying, indexing optimization, data safety, and distributed transaction logs.",
      logoLetter: "My",
      badgeColor: "bg-blue-600/90 text-white"
    },
    {
      name: "MS SQL Server",
      category: "Enterprise Storage Engine",
      desc: "Microsoft-powered transactional clustering, high-availability schemas, and enterprise records audits.",
      logoLetter: "Sq",
      badgeColor: "bg-red-600/95 text-white"
    },
    {
      name: "Oracle SQL",
      category: "Industrial Clusters",
      desc: "PL/SQL procedural scripting, schemas architecture, and critical financial bank integrations.",
      logoLetter: "Or",
      badgeColor: "bg-rose-700/95 text-white"
    },
    {
      name: "Flutter SDK",
      category: "Cross-Platform Mobile Apps",
      desc: "Modern Dart language compilation for high-integrity, fluid native iOS & Android cellular experiences.",
      logoLetter: "Fl",
      badgeColor: "bg-sky-500/95 text-white"
    },
    {
      name: "Advanced Excel",
      category: "Corporate Excel Ledger",
      desc: "Macro-programming, analytical metrics modeling, and automated auditing formulas.",
      logoLetter: "Ex",
      badgeColor: "bg-emerald-600/90 text-white"
    },
    {
      name: "Adobe CC Toolset",
      category: "Creative Assets Design",
      desc: "Vector asset wireframing, layout guidelines, visual color theories, and marketing materials.",
      logoLetter: "Cc",
      badgeColor: "bg-purple-600/90 text-white"
    },
    {
      name: "MERN Stack",
      category: "Enterprise JS Native",
      desc: "MongoDB, Express, React, and Node.js built-systems for state-of-the-art corporate web services.",
      logoLetter: "Me",
      badgeColor: "bg-slate-900/90 text-white"
    },
    {
      name: "Docker & K8s",
      category: "DevOps & Cloud Systems",
      desc: "Containers virtualization, Docker files orchestration, and secure Kubernetes cloud nodes.",
      logoLetter: "Dk",
      badgeColor: "bg-[#132a57] text-[#f0c702]"
    }
  ];

  // Filtering team members
  const filteredTeam = useMemo(() => {
    if (activeFilter === 'all') return teamMembers;
    return teamMembers.filter(m => m.tag === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-[#fdfcfb] relative min-h-screen py-10 overflow-hidden" id="about-root-page">
      {/* Immersive gold interactive honeycomb background framework */}
      <HoneycombBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* About Hero Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 bg-stone-100 border border-stone-200 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-[#132a57] uppercase font-mono shadow-3xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-550 shrink-0" />
            <span>{isN ? "हाम्रो इतिहास र मूल्य मान्यता" : "CORE EDUCATION PRINCIPLES"}</span>
          </div>
          
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-[#132a57] tracking-tight leading-[1.1]">
            {isN ? "व्यावहारिक सीप विकासको गौरवशाली यात्रा" : "Build Real Technical Talents in Nepal."}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-medium max-w-3xl mx-auto">
            {isN 
              ? "विश्वस्तरीय ब्रिटिश कम्प्युटिङ डिग्री, परीक्षा केन्द्र र वास्तविक अमेजन क्लाउड (AWS) ल्याब प्रणाली मार्फत हामी नेपाली विद्यार्थीहरूलाई विश्व बजारमा सजिलै बिक्ने बनाउँदैछौँ।"
              : "Tech Bee Nepal is Kathamandu’s premier academic hub located in Mid-Baneshwor. We don't teach dry computer theories — we provide robust hands-on workstation sandboxes aligning directly with foreign degrees and enterprise cybersecurity certifications."}
          </p>
        </div>

        {/* 1. Core Corporate Philosophy (Clean Elegant Stone/Amber Theme) */}
        <section className="bg-white/75 backdrop-blur-md border border-stone-200/80 rounded-3xl p-8 sm:p-12 shadow-3xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden" id="concept-philosophy">
          {/* Subtle dot visual background ornament */}
          <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
          
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 px-3.5 py-1 rounded-full text-[9px] font-black uppercase text-amber-650 font-mono tracking-widest">
              <HeartHandshake className="w-3 h-3 text-amber-600 shrink-0" />
              <span>{isN ? "हाम्रो प्रतिवद्धता" : "THE PRACTICAL CHARTER"}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-[#132a57] tracking-tight leading-tight uppercase">
              {isN ? "ल्याबमा आधारित गुणस्तरीय पाठ्यक्रम" : "Active technical labs over legacy classrooms"}
            </h2>
            
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {isN 
                ? "इन्टरनेट र कम्प्युटरको आधारभूत ज्ञान मात्र पर्याप्त हुँदैन। आजको उच्च वैतनिक र प्रतिस्पर्धी बजारमा भिड्न विद्यार्थीलाई सिस्को राउटर कन्फिगर गर्न, क्लाउड म्यानेजमेन्ट सिर्जना गर्न र लाइभ सर्भर सेक्युरिटी अडिट गर्न आउनुपर्छ। हाम्रो सम्पूर्ण पूर्वाधार यही सिद्धान्तमा तयार गरिएको छ।"
                : "At Tech Bee Nepal, we hold that academic certs must correlate with real engineering talent. Each student receives fully dedicated computing instances. Our training methodology rejects standard slide presentations in favor of active terminal configurations, routing switch diagnostics, and critical troubleshooting scripts."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-stone-700">
              {[
                { titleEn: "Authorized Pearson Vue Testing Hub", titleNe: "पियर्सन आधिकारिक परीक्षा केन्द्र स्वीकृत" },
                { titleEn: "AWS Partner Academy & Console access", titleNe: "AWS आधिकारिक एकेडेमी समन्वय" },
                { titleEn: "Expert Local Mentorship & Sandbox labs", titleNe: "स्वदेशी कर्पोरेट वरिष्ठ इन्जिनियर समूह" },
                { titleEn: "NCC UK University Diploma equivalency", titleNe: "बेलायती डिग्री समकक्षता मन्त्रालय स्वीकृत" }
              ].map((pill, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-stone-50 border border-stone-200/60 rounded-xl p-3 shadow-3xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="tracking-tight font-black">{isN ? pill.titleNe : pill.titleEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics display (Light Stone Aesthetic) */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4 shadow-3xs relative z-10">
            <span className="text-[9px] font-mono font-black text-stone-400 uppercase tracking-widest block text-left">
              TECH BEE NEPAL VERIFIABLE NUMBERS
            </span>
            <div className="grid grid-cols-2 gap-3.5">
              {stats.map((stat, sIdx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={sIdx} className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-lg sm:text-xl font-black text-[#132a57] tracking-tight block">
                        {stat.val}
                      </span>
                      <IconComponent className="w-4 h-4 text-amber-550 shrink-0" />
                    </div>
                    <span className="text-[9px] text-stone-500 font-extrabold uppercase tracking-wider block leading-tight">
                      {isN ? stat.labelNe : stat.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/40 text-[10.5px] leading-relaxed text-amber-900 text-left">
              ⚡ {isN 
                ? "हाम्रो मध्यबानेश्वर शाखामा चौबीसै घण्टा चल्ने प्रयोगात्मक ल्याब र साइबर सुरक्षा सिमुलेटर प्लेटफर्म उपलब्ध छ।"
                : "Our central Mid-Baneshwor academic node offers persistent access to testing sandbox rigs for registered candidates."}
            </div>
          </div>
        </section>

        {/* 2. Chronological Milestones (Unified Neutral Color Timeline) */}
        <section className="bg-white/75 backdrop-blur-md border border-stone-200/80 rounded-3xl p-8 sm:p-12 shadow-3xs space-y-8" id="history-milestones">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[9px] font-mono font-black text-amber-650 uppercase tracking-widest block">
              ⏳ {isN ? "ऐतिहासिक विकासक्रम" : "DECADE CHRONICLE"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#132a57] uppercase tracking-tight">
              {isN ? "शिक्षाको प्रयोगात्मक दशक" : "Milestones of Tech Innovation"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-normal font-medium">
              {isN 
                ? "विगत १० वर्षमा एक सानो प्रयोगात्मक कोठाबाट सुरु भई नेपालकै उत्कृष्ट अन्तर्राष्ट्रिय बुटक्याम्प एकेडेमी बन्नेसम्मको रोचक इतिहास।"
                : "A timeline of technical excellence, global educational covenants, and structural infrastructure advancements in Kathmandu."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-3">
            {milestones.map((mil, idx) => (
              <div 
                key={idx} 
                className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-amber-400 group transition-all duration-300"
              >
                {/* Year tag */}
                <div className="text-2xl sm:text-3xl font-black text-amber-550 font-mono tracking-widest border-b border-stone-150 pb-2">
                  {mil.year}
                </div>
                <div className="space-y-1.5 pt-4 text-left">
                  <h4 className="text-xs sm:text-sm font-black text-[#132a57] leading-snug group-hover:text-amber-650 transition-colors">
                    {language === 'en' ? mil.titleEn : mil.titleNe}
                  </h4>
                  <p className="text-[10.5px] text-stone-500 leading-relaxed font-semibold">
                    {language === 'en' ? mil.descEn : mil.descNe}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Branded Tech Ecosystem (Unified Ivory Theme Web Apps Grid) */}
        <section className="bg-white/75 backdrop-blur-md border border-stone-200/80 rounded-3xl p-8 sm:p-12 shadow-3xs space-y-10" id="workforce-tech-ecosystem">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left sidebar info panel */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-stone-100 border border-stone-200 px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-widest text-stone-800 uppercase font-mono">
                <Workflow className="w-3.5 h-3.5 text-amber-550 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Ecosystem Frameworks</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-[#132a57] tracking-tight uppercase leading-none">
                {isN ? "व्यावहारिक सीप विकास" : "Career Alignment Modules"}
              </h2>
              
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                We align each technical stream directly with global enterprise architectures. From database indexing constraints to cross-platform deployments, students learn via actual production pipelines:
              </p>

              {/* Pillars list */}
              <div className="space-y-4 pt-1">
                {[
                  { title: "Advanced Back-end Databases", desc: "MS SQL transactional cluster nodes, SQL joins optimization, relational data safety protocols." },
                  { title: "Mobile & Full-Stack Systems", desc: "Interactive Flutter widget layers, Node-based middleware routers, state machines." },
                  { title: "Cloud Architecture Networks", desc: "Cisco net sandbox routers, EC2 virtual server scales, cloud security firewalls." }
                ].map((item, pIdx) => (
                  <div key={pIdx} className="flex gap-2.5 items-start">
                    <span className="w-4 h-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-amber-550" />
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-[#132a57] leading-none">{item.title}</h4>
                      <p className="text-[10px] text-stone-500 mt-1 leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right tech cards grid (3x3 grid) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {techEcosystem.map((tech, tIdx) => (
                <div 
                  key={tIdx} 
                  className="bg-stone-50/85 border border-stone-200/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-[#132a57]/40 hover:bg-white hover:scale-[1.015] hover:shadow-xs transition-all duration-300 text-left"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-stone-200/10 rounded-bl-full pointer-events-none" />
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[8px] font-mono text-stone-500 uppercase tracking-wide font-black">
                      {tech.category}
                    </span>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black ${tech.badgeColor} text-[11px] shadow-3xs uppercase font-mono`}>
                      {tech.logoLetter}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black text-[#132a57] group-hover:text-amber-650 transition-colors leading-none">
                      {tech.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 leading-normal font-semibold">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. TEAM & LEADERSHIP SHOWCASE (NEW! HIGHLY INTERACTIVE GRID & TABS) */}
        <section className="bg-white/75 backdrop-blur-md border border-stone-200/80 rounded-3xl p-8 sm:p-12 shadow-3xs space-y-10" id="leadership-directors">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-150">
            <div className="space-y-2 text-left max-w-2xl">
              <span className="text-[9px] font-mono font-black text-amber-650 uppercase tracking-widest block">
                🤝 {isN ? "वरिष्ठ प्रविधि विशेषज्ञ समिति" : "EXPERT GOVERNANCE BOARD"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#132a57] uppercase tracking-tight">
                {isN ? "अन्तर्राष्ट्रिय मान्यता प्राप्त शैक्षिक टोली" : "Meet Kathmandu Our Senior Instructors"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-normal font-medium">
                {isN 
                  ? "नेपाल र अन्तर्राष्ट्रिय बजारमा ख्याती कमाएका दक्ष प्रशिक्षकहरू जसले विद्यार्थीलाई परीक्षा सम्बद्धता मात्र होइन, प्रयोगात्मक ल्याब अभ्यास गराउनुहुन्छ।"
                  : "We are guided by certified cloud engineers, Cisco training seniors, and tech placement consultants with years of collective industrial expertise."}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-stone-50 border border-stone-200 p-1.5 rounded-xl shrink-0 self-start lg:self-end">
              {[
                { id: 'all', label: isN ? "टोली सदस्यहरू" : "All Members" },
                { id: 'leadership', label: isN ? "नेतृत्व" : "Governance" },
                { id: 'instructor', label: isN ? "प्रशिक्षक समूह" : "Instructors" },
                { id: 'placement', label: isN ? "प्लेसमेन्ट" : "Career Alignment" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id as any);
                    // Automatically highlight first member of that category
                    const matched = teamMembers.find(m => m.tag === tab.id || tab.id === 'all');
                    if (matched) setSelectedMember(matched);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-10px font-mono tracking-tight font-black uppercase transition-all duration-200 cursor-pointer ${
                    activeFilter === tab.id 
                      ? 'bg-stone-900 border border-stone-900 text-white shadow-3xs' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Interactive Detail Spotlight Card (Left side, takes 5 columns) */}
            <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden text-left shadow-3xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100 pointer-events-none -mr-8 -mt-8 rounded-full" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  {/* Dynamic Initials Badge */}
                  <div className={`w-14 h-14 bg-gradient-to-tr ${selectedMember ? selectedMember.bgGradient : 'from-slate-700 to-slate-900'} text-white flex items-center justify-center font-bold font-mono rounded-xl text-xl shadow-sm shrink-0`}>
                    {selectedMember ? selectedMember.initials : "TB"}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-[#132a57]">
                      {selectedMember ? selectedMember.name : "Tech Bee Mentor"}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] font-black text-amber-650 uppercase tracking-wider mt-0.5 font-mono">
                      {isN ? selectedMember?.roleNe : selectedMember?.roleEn}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-bold text-stone-500 flex items-center gap-1.5 font-sans">
                    <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Degree: <strong className="text-stone-700">{selectedMember?.degree}</strong></span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-semibold bg-white border border-stone-150 rounded-xl p-3.5 shadow-3xs italic">
                    &ldquo;{isN ? selectedMember?.bioNe : selectedMember?.bioEn}&rdquo;
                  </p>
                </div>

                {/* Verified industrial badges list */}
                {selectedMember && selectedMember.certifications.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-[#132a57] uppercase font-mono block">
                      Verified Credentials
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.certifications.map((cert, cIdx) => (
                        <span key={cIdx} className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-2 py-1 text-[9px] font-mono tracking-tight font-black inline-flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedMember && (
                <div className="border-t border-stone-200/80 pt-4 mt-6 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>MEMBER ACCESS ID: TB-0{selectedMember.id}26</span>
                  <span className="bg-amber-100 text-[#132a57] font-black tracking-tight px-2 py-0.5 rounded-md text-[8.5px]">
                    ACTIVE ADVISOR
                  </span>
                </div>
              )}
            </div>

            {/* Selection Grid (Right side, takes 7 columns) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <AnimatePresence mode="popLayout">
                {filteredTeam.map((mem) => {
                  const isSelected = selectedMember?.id === mem.id;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={mem.id}
                      onClick={() => setSelectedMember(mem)}
                      className={`border p-5 rounded-xl cursor-pointer text-left transition-all relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-[#132a57] border-[#132a57] text-white shadow-md' 
                          : 'bg-white hover:bg-stone-50 border-stone-200 text-[#132a57] shadow-3xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="space-y-1">
                          <span className={`text-[8px] font-mono font-black uppercase tracking-widest ${isSelected ? 'text-amber-400' : 'text-stone-400 font-bold'}`}>
                            {mem.tag === 'leadership' ? 'Core Board' : mem.tag === 'instructor' ? 'Lab Lead' : 'Career Cell'}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black tracking-tight mt-0.5 leading-none">
                            {mem.name}
                          </h4>
                          <p className={`text-[10px] leading-tight font-semibold py-0.5 ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>
                            {isN ? mem.roleNe : mem.roleEn}
                          </p>
                        </div>

                        {/* Interactive floating arrow */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-amber-100 text-[#132a57]' : 'bg-stone-100 group-hover:bg-[#132a57] group-hover:text-amber-100'} transition-all`}>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                        </div>
                      </div>

                      {/* Small focus tag */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dashed border-stone-200/50">
                        {mem.certifications.slice(0, 1).map((c, idx) => (
                          <span key={idx} className={`text-[8.5px] font-mono font-bold leading-none ${isSelected ? 'text-amber-300' : 'text-stone-500'}`}>
                            ★ {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-center text-xs text-stone-500 font-medium max-w-2xl mx-auto">
            📣 {isN 
              ? "विद्यार्थीहरूले भर्ना हुनु अघि हाम्रा वरिष्ठ प्रशिक्षकहरू र सल्लाहकारहरूसँग प्रत्यक्ष भेटघाट वा भर्चुअल करियर काउन्सिलिङ बुक गर्न सक्नुहुन्छ।"
              : "Registered candidates can book verified direct one-on-one professional tech advisory sessions with our senior consultants before class placements."}
          </div>

        </section>

      </div>
    </div>
  );
}
