'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { translations } from '@/lib/translations';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Cpu, 
  Layers, 
  Wifi, 
  Terminal, 
  ShieldAlert, 
  CheckCircle, 
  Search, 
  Filter, 
  ArrowRight,
  X,
  Sparkles,
  PhoneCall,
  Flame,
  BadgeAlert,
  Send,
  Zap,
  Package,
  Check,
  Clock
} from 'lucide-react';

interface Product {
  id: string;
  nameEn: string;
  nameNe: string;
  category: 'robotics' | 'iot' | 'cyber' | 'hardware';
  categoryLabelEn: string;
  categoryLabelNe: string;
  priceUSD: number;
  priceNPR: number;
  descriptionEn: string;
  descriptionNe: string;
  specsEn: string[];
  specsNe: string[];
  image: string;
  badgeEn?: string;
  badgeNe?: string;
  isPopular?: boolean;
}

export default function ProductsPage() {
  const { language: rawLanguage } = useApp();
  const language = 'en'; // Force English internally so browser translator API handles it flawlessly
  const dict = translations[language];
  const isN = false; // Force English properties globally so browser translator handles rendering cleanly

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState<Product | null>(null);
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [schoolCollege, setSchoolCollege] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState('');

  // Local storage for keeping track of user inquiries/orders
  const [submittedOrders, setSubmittedOrders] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tb_product_inquiries');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });

  const saveOrderToLocal = (newOrder: any) => {
    const updated = [newOrder, ...submittedOrders];
    setSubmittedOrders(updated);
    localStorage.setItem('tb_product_inquiries', JSON.stringify(updated));
  };

  const productList: Product[] = [
    {
      id: "PROD-HEX-01",
      nameEn: "Tech Bee Hexa-Drone Assembly Kit (V2.5)",
      nameNe: "टेक बी हेक्सा-ड्रोन एसेम्बली किट",
      category: "robotics",
      categoryLabelEn: "Robotics & Aviation",
      categoryLabelNe: "रोबोटिक्स र एभिएसन",
      priceUSD: 149,
      priceNPR: 19900,
      descriptionEn: "A high-stability 6-rotor autonomous drone builder kit featuring honeycomb flight control mounts, complete with telemetry and carbon fibre skeletal parts.",
      descriptionNe: "उच्च स्थिरताको ६-रोटर भएको एसेम्बली ड्रोन किट जसमा कार्बन फाइबर फ्रेम, वायरलेस कन्ट्रोलर र प्रोग्राम गर्न मिल्ने सेन्सर जडान छ।",
      specsEn: [
        "Arduino-compatible Core Board",
        "Honeycomb High-Durability Frame",
        "2.4GHz Telemetry Transceiver",
        "6-Axis Gyros & Alt Hold GPS Modules",
        "750mAh rechargeable Lipoly Swarm block"
      ],
      specsNe: [
        "अर्डुनो-कम्प्याटिबल मुख्य बोर्ड",
        "बलियो हनीकोम्ब कार्बन फ्रेम",
        "२.४GHz रेडियो वायरलेस टेलिमेट्री",
        "६-एक्सिस जाइरोस्कोप र जीपीएस एल्टिट्यूड होल्ड",
        "७५०mAh शक्तिशाली रिचार्ज ब्याट्री"
      ],
      image: "https://picsum.photos/seed/hexadrone/600/400",
      badgeEn: "BESTSELLER",
      badgeNe: "धेरै बिक्री भएको",
      isPopular: true
    },
    {
      id: "PROD-BUG-02",
      nameEn: "STEM Obstacle Swarm Bug-Bot Kit",
      nameNe: "स्टेम अब्स्ट्याकल बग-बोट सेन्सर किट",
      category: "robotics",
      categoryLabelEn: "Robotics & Aviation",
      categoryLabelNe: "रोबोटिक्स र एभिएसन",
      priceUSD: 49,
      priceNPR: 6550,
      descriptionEn: "An interactive, line-following and obstacle-avoiding robotic bug simulating bee swarm intelligence patterns with dual ultrasonic sensor ears.",
      descriptionNe: "कठिन बाटो आफै पहिचान गर्ने र अवरोध छल्ने बग-बोट किट, जसले माहुरीको बगालको चलाखीपूर्ण सिद्धान्त सिक्न मद्दत गर्दछ।",
      specsEn: [
        "Dual Ultrasonic Sonar Sensor suite",
        "Twin High-Torque Gear Geared DC Motors",
        "Custom Beetle honeycomb shell shield",
        "Battery box with built-in power switch",
        "Full DIY handbook and codebase scripts"
      ],
      specsNe: [
        "दुईवटा अल्ट्रासोनिक सेन्सर मोड्युल",
        "हाई-टर्क डिसी गियर मोटर र बडी",
        "विशेष हनीकोम्ब रबर कभर शिल्ड",
        "पावर स्विच भएको ब्याट्री बक्स",
        "सजिलो निर्देशन म्यानुअल र कोडिङ स्क्रिफ्ट"
      ],
      image: "https://picsum.photos/seed/bugbot/600/400",
      badgeEn: "STARTER FRIENDLY",
      badgeNe: "सजिलो स्टार्टर",
      isPopular: false
    },
    {
      id: "PROD-IOT-03",
      nameEn: "Advanced Honey-Hive Smart Greenhouse Kit",
      nameNe: "स्मार्ट कृषि आईओटी ग्रीनहाउस किट",
      category: "iot",
      categoryLabelEn: "IoT & Automation",
      categoryLabelNe: "आईओटी र स्वचालन",
      priceUSD: 89,
      priceNPR: 11800,
      descriptionEn: "Complete smart climate system tracking moisture, temperature, light, and humidity with embedded Wi-Fi chips to feed live cloud analytics.",
      descriptionNe: "माटोको ओस, वायुमण्डलीय तापक्रम र प्रकाश मापन गरी सिधै क्लाउडमा तथ्याङ्क देखाउने र आफै सिँचाइ गर्ने आईओटी किट।",
      specsEn: [
        "ESP32 Wi-Fi + Bluetooth Core controller",
        "Analogue capacitive Soil moisture probe",
        "DHT11 temperature & humidity suite",
        "Mini 5V Submersible solar-linked water pump",
        "OLED diagnostic screen metrics overlay"
      ],
      specsNe: [
        "ESP32 स्मार्ट वाईफाई मोड्युल",
        "माटोको ओस नाप्ने सेन्सर",
        "तापक्रम तथा आद्रता सेन्सर (DHT11)",
        "मिनी ५ भोल्ट पानी पम्प र पाइप रबर",
        "तथ्याङ्क देखाउने एलईडी स्क्रिन"
      ],
      image: "https://picsum.photos/seed/smartiot/600/400",
      badgeEn: "HOT RELEASE",
      badgeNe: "नयाँ सामग्री",
      isPopular: true
    },
    {
      id: "PROD-KALI-04",
      nameEn: "Cyber Security Honey-Cage Orange Pi Lab",
      nameNe: "साइबर सुरक्षा हनि-केज ओरेन्ज पाई ल्याब",
      category: "cyber",
      categoryLabelEn: "Cybersecurity & Hacking",
      categoryLabelNe: "साइबर सुरक्षा र ल्याब",
      priceUSD: 125,
      priceNPR: 16500,
      descriptionEn: "A hardware network-sniffing and Wi-Fi perimeter defense testbed package preloaded with Kali Linux enterprise forensic testing tools.",
      descriptionNe: "तपाईको नेटवर्क सुरक्षा जाँच गर्न र एथिकल ह्याकिङ प्रयोगात्मक अभ्यासका लागि उपयुक्त ओरेन्ज पाई ५ कम्प्युटर किट।",
      specsEn: [
        "Orange Pi 4 LTS with 4GB RAM CPU core",
        "64GB High-Speed pre-flashed Kali microcard",
        "USB High-Gain Packet injection antenna",
        "Encrypted Honeycomb structural safety shield",
        "Exclusive hacking sandboxing tutorial files"
      ],
      specsNe: [
        "ओरेन्ज पाई ४ LTS कलेज संस्करण",
        "६४GB काली लिनक्स बूटेबल मेमोरी कार्ड",
        "हाई-गेन प्याकेट इन्जेक्सन एन्टेना",
        "हनीकोम्ब थ्रिडी प्रोटेक्टिभ केज",
        "अभ्यास फाईलहरू तथा ह्याकिङ गाईड"
      ],
      image: "https://picsum.photos/seed/cyberpi/600/400",
      badgeEn: "ADVANCED ONLY",
      badgeNe: "विशेषज्ञ स्तर",
      isPopular: false
    },
    {
      id: "PROD-SWM-05",
      nameEn: "Hexa-Locomotive Swarm Servo Shield Pack",
      nameNe: "हेक्सा-लोकोमोटिभ मल्टि-सर्भो मोटर प्याक",
      category: "hardware",
      categoryLabelEn: "Tech & Swarm Hardware",
      categoryLabelNe: "हार्डवेयर र मोटरहरू",
      priceUSD: 35,
      priceNPR: 4600,
      descriptionEn: "Learn complex multi-servo biological locomotion with 4 high-torque servos, metal mounting brackets, and PWM drivers.",
      descriptionNe: "सर्भो मोटरको चाल सिङ्क्रोनाइज गरेर हेक्सापोड (६ खुट्टा भएको माहुरी जस्तो) हिँड्ने डिजाइन बनाउन सिकाइने विशेष प्याक।",
      specsEn: [
        "4x TowerPro MG996R High-Torque Metal Servos",
        "PCA9685 16-Channel 12-bit PWM I2C interface",
        "Flexible lightweight carbon connectors",
        "Breadboard & complete multi-core jumper wires",
        "Locomotion gait programming scripts"
      ],
      specsNe: [
        "४ वटा मेटल गियर हाई-टर्क सर्भो मोटर्स",
        "PCA9685 १६-च्यानल PWM कन्टोलर",
        "कार्बन बडी कनेक्टर क्लिपहरू",
        "जम्पिङ तारहरू र ब्रेडबोर्ड",
        "मोटर घुमाउने गति प्रोग्राम कोडहरू"
      ],
      image: "https://picsum.photos/seed/servomulti/600/400",
      badgeEn: "DIY SPECIAL",
      badgeNe: "हातैले बनाउने विशेष",
      isPopular: false
    },
    {
      id: "PROD-EDGE-06",
      nameEn: "AI Swarm Autonomous Edge Camera Suite",
      nameNe: "एआई स्वचालित एज क्यामेरा मोड्युल",
      category: "iot",
      categoryLabelEn: "IoT & Automation",
      categoryLabelNe: "आईओटी र स्वचालन",
      priceUSD: 59,
      priceNPR: 7850,
      descriptionEn: "High-spec cellular AI processing microcamera equipped with local computer vision inference firmware to recognise objects locally.",
      descriptionNe: "कम विद्युत खपत गर्ने र सिधै क्यामेरा फिडबाट अनुहार वा वस्तु पहिचान गर्न सक्ने आधुनिक एज एआई क्यामेरा।",
      specsEn: [
        "ESP32-CAM Core Board + custom mount",
        "OV2640 high-sensitivity 2MP Camera lens",
        "Infrared human presence detection trigger",
        "Micro-USB FTDI programmer adaptor module",
        "Preloaded object detection demo script templates"
      ],
      specsNe: [
        "ESP32-CAM मुख्य बोर्ड र होल्डर",
        "OV2640 उच्च क्षमताको २MP क्यामेरा",
        "मानव उपस्थिति खुट्याउने इन्फ्रारेड सेन्सर",
        "FTDI सिरियल प्रोग्रामर एडाप्टर मोड्युल",
        "पूर्वनिर्धारित वस्तु पहिचान डेमो कमाण्डहरू"
      ],
      image: "https://picsum.photos/seed/aiedge/600/400",
      badgeEn: "BEST FOR RESEARCH",
      badgeNe: "अनुसन्धान विशेष",
      isPopular: true
    }
  ];

  // Filtering Logic
  const filteredProducts = productList.filter(prod => {
    const matchesSearch = 
      prod.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.nameNe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.descriptionNe.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    return prod.category === activeCategory && matchesSearch;
  });

  // Handle Form Submission
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !cartProduct) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `TB-STORE-${Math.floor(100000 + Math.random() * 900000)}`;
      const newInquiry = {
        orderId: generatedId,
        productName: isN ? cartProduct.nameNe : cartProduct.nameEn,
        productCode: cartProduct.id,
        priceUSD: cartProduct.priceUSD,
        priceNPR: cartProduct.priceNPR,
        customerName,
        customerEmail,
        customerPhone,
        schoolCollege,
        shippingAddress,
        notes: additionalNotes,
        date: new Date().toLocaleString()
      };

      saveOrderToLocal(newInquiry);
      setLastSubmittedId(generatedId);
      setIsSubmitting(false);
      setShowInvoice(true);
    }, 1500);
  };

  const closeCheckoutFlow = () => {
    setIsCheckoutOpen(false);
    setCartProduct(null);
    setShowInvoice(false);
    // Reset form
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setSchoolCollege('');
    setShippingAddress('');
    setAdditionalNotes('');
  };

  return (
    <div className="py-12 sm:py-20 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Banner / Header */}
      <div className="relative rounded-3xl bg-[#181613] p-8 sm:p-12 md:p-16 border-2 border-slate-800 shadow-xl overflow-hidden text-center sm:text-left">
        {/* Ambient yellow pattern background inside banner */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 10px 10px, #f0c702 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#f0c702]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-[#f0c702]/15 border border-[#f0c702]/30 py-1.5 px-3.5 rounded-xl text-[10px] sm:text-xs font-black text-[#f0c702] tracking-wider uppercase font-mono">
              <Package className="w-4 h-4 animate-bounce" />
              <span>TECH BEE ROBOTICS LAB STORE</span>
            </span>
            <h1 className="font-sans text-3xl sm:text-4.5xl font-black text-white tracking-tight leading-none">
              {isN ? "व्यावहारिक प्रविधि तथा रोबोटिक्स स्टोर" : "Interactive STEM & Robotics Gear"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {isN 
                ? "हाम्रो प्राविधिक प्रयोगशालामा स्वदेशी इन्जिनियर र विशेषज्ञहरूले तयार पारेका सेन्सर, एआरड्यूइनो कम्प्याटिबल किट र रोबोटिक्स सामग्रीहरू। आफ्नो अनुसन्धान वा सिक्ने प्रक्रियालाई तीव्र पार्नुहोस्।"
                : "Equip your schools, colleges, or home research labs with professional-grade microcontrollers, telemetry sensors, swarm autonomous vehicles, and security cages built in-house."}
            </p>
          </div>
          <div className="shrink-0 flex justify-center sm:justify-start">
            <div className="bg-white/5 border border-slate-700/60 p-4.5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f0c702]/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[#f0c702]" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[10px] text-slate-400 block tracking-wider font-extrabold uppercase">Live Shipments</span>
                <span className="text-sm font-black text-white">Kathmandu Valley</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Search & Filter Controls */}
      <div className="bg-white/90 border border-slate-200/90 rounded-2.5xl p-6.5 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Combined Search bar */}
        <div className="relative md:col-span-6">
          <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isN ? "सामाग्री वा विवरण खोज्नुहोस्..." : "Search drone kits, sensors shield, cyber pi..."}
            className="w-full bg-slate-50 border border-slate-200 pl-11.5 pr-4 py-3 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#f0c702] focus:ring-4 focus:ring-[#f0c702]/10 transition-all text-slate-800"
            id="store-quick-search"
          />
        </div>

        {/* Categories Scroller Tabs */}
        <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline" />
          {[
            { id: 'all', labelEn: "All Items", labelNe: "सबै सामान" },
            { id: 'robotics', labelEn: "Robotics", labelNe: "रोबोटिक्स" },
            { id: 'iot', labelEn: "IoT Devices", labelNe: "आईओटी" },
            { id: 'cyber', labelEn: "Cyber Kits", labelNe: "सुरक्षा किट" },
            { id: 'hardware', labelEn: "Swarm Motor", labelNe: "हार्डवेयर" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-[#181613] text-[#f0c702] border border-[#181613]' 
                  : 'bg-slate-50 text-slate-600 hover:text-[#f0c702] border border-slate-200 hover:bg-slate-50/50'
              }`}
            >
              {isN ? cat.labelNe : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid List of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod) => (
            <motion.div
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={prod.id}
              className={`group bg-white border rounded-2.5xl p-5.5 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                prod.isPopular ? 'border-[#f0c702]/40 hover:border-[#f0c702]/70 ring-1 ring-[#f0c702]/10' : 'border-slate-200 hover:border-[#f0c702]/30'
              }`}
            >
              {/* Product Badge */}
              {prod.badgeEn && (
                <div className="absolute top-4.5 right-4.5 z-10 bg-[#181613] text-[#f0c702] border border-yellow-500/20 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-md uppercase font-mono">
                  {isN ? prod.badgeNe : prod.badgeEn}
                </div>
              )}

              <div className="space-y-4">
                {/* Image Placeholder Frame */}
                <div className="aspect-[16/11] w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative">
                  <img 
                    src={prod.image} 
                    alt={prod.nameEn}
                    className="w-full h-full object-cover group-hover:scale-102.5 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Yellow blend mesh overlay */}
                  <div className="absolute inset-0 bg-yellow-500/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category Pill Tag Overlay inside image */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-extrabold text-slate-700 tracking-wider uppercase font-mono border border-slate-200">
                    {isN ? prod.categoryLabelNe : prod.categoryLabelEn}
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-widest">{prod.id}</span>
                  </div>
                  <h3 className="font-sans text-base sm:text-lg font-black text-slate-900 group-hover:text-[#f0c702] transition-colors leading-snug">
                    {isN ? prod.nameNe : prod.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {isN ? prod.descriptionNe : prod.descriptionEn}
                  </p>
                </div>

                {/* Specs Pill List */}
                <div className="pt-2">
                  <ul className="space-y-1 text-[11px] font-semibold text-slate-600 text-left border-t border-slate-100 pt-3">
                    {(isN ? prod.specsNe : prod.specsEn).slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f0c702] shrink-0" />
                        <span className="truncate">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase Section Row */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">{isN ? 'तालिम केन्द्र मूल्य' : 'Academy rate'}</span>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-slate-900 tracking-tight leading-none">
                      NPR {prod.priceNPR.toLocaleString()}
                    </span>
                    <span className="text-[10.5px] font-extrabold text-slate-400 font-mono">
                      ${prod.priceUSD} USD
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="p-2.5 text-slate-600 hover:text-[#f0c702] bg-slate-50 hover:bg-yellow-50 border border-slate-205 py-2 px-3 rounded-xl text-xs font-bold transition-all"
                    title={isN ? "विवरण हेर्नुहोस्" : "Quick View Specs"}
                  >
                    {isN ? 'विवरण' : 'Info'}
                  </button>
                  <button
                    onClick={() => {
                      setCartProduct(prod);
                      setIsCheckoutOpen(true);
                    }}
                    className="bg-[#181613] hover:bg-[#f0c702] hover:text-stone-900 text-[#f0c702] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-3xs active:scale-97"
                  >
                    <span>{isN ? 'अर्डर' : 'Inquire'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State Banner if no results */}
      {filteredProducts.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto">
          <BadgeAlert className="w-12 h-12 text-[#f0c702] mx-auto mb-4" />
          <h4 className="text-lg font-bold text-slate-900">{isN ? 'कुनै सामान फेला परेन' : 'No items found'}</h4>
          <p className="text-xs text-slate-500 mt-2">
            {isN ? 'कृपया अर्को सामाग्री नाम वा श्रेणी छानेर हेर्नुहोस्।' : 'Try altering your search keywords or using alternate categories filter tab.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-4 bg-[#181613] text-white font-extrabold text-xs px-4.5 py-2.5 rounded-xl uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* History log ledger of secure student purchases / inquiries */}
      {submittedOrders.length > 0 && (
        <div className="bg-white/80 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-black text-[#f0c702] tracking-widest font-mono block">STORE RECORDBOOK TRANSCRIPT</span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {isN ? "तपाईंको हालको सोधपुछ तथा अर्डरहरू" : "Your Store Orders & Inquiries Ledger"}
            </h3>
            <p className="text-xs text-slate-500">
              {isN 
                ? "हाम्रो सेन्ट्रल ईआरपी सिस्टममा दर्ता भएका सुरक्षित खरिद सोधपुछ फाइलहरू।" 
                : "Active technical product requests syncing with Tech Bee Baneshwor inventory managers."}
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-150 rounded-2xl bg-white/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-mono font-bold">
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Item Details</th>
                  <th className="p-3">Cost Assigned</th>
                  <th className="p-3">Recipient Name</th>
                  <th className="p-3">Verification Logs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-705">
                {submittedOrders.map((ord, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40">
                    <td className="p-3 font-mono font-bold text-[#f0c702]">{ord.orderId}</td>
                    <td className="p-3">
                      <div className="font-extrabold text-slate-900">{ord.productName}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">{ord.productCode}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      NPR {ord.priceNPR?.toLocaleString()}
                    </td>
                    <td className="p-3 font-medium">
                      <div>{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400">{ord.customerPhone}</div>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-800 text-[10px] px-2 py-0.5 rounded-md font-bold font-mono">
                        <Clock className="w-3 h-3 text-yellow-600 animate-spin" />
                        <span>AWAITING VERIFICATION</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: Product Specs Quick-View */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-2 border-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-left shadow-2xl space-y-6"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-6 top-6 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 active:scale-95 transition"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2 aspect-video sm:aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.nameEn} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full sm:w-1/2 space-y-4">
                <span className="text-[10px] bg-amber-50 text-[#f0c702] border border-amber-200 px-2.5 py-1 rounded font-mono font-black uppercase">
                  {selectedProduct.id}
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {isN ? selectedProduct.nameNe : selectedProduct.nameEn}
                </h3>
                <div className="font-mono">
                  <span className="text-2xl font-black text-slate-900">NPR {selectedProduct.priceNPR.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 block">Equivalent to ${selectedProduct.priceUSD} USD (Academy Tax-free)</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isN ? selectedProduct.descriptionNe : selectedProduct.descriptionEn}
                </p>
              </div>
            </div>

            {/* Complete Specifications Grid */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <h5 className="text-[11px] uppercase tracking-widest font-black text-slate-500">
                {isN ? "कम्पोनेन्ट विनिर्देशहरू" : "Technical Kit Components Included"}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isN ? selectedProduct.specsNe : selectedProduct.specsEn).map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-[#f0c702] shrink-0" />
                    <span className="text-xs text-slate-700 font-semibold truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action modal Cta */}
            <div className="border-t border-slate-100 pt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-3 rounded-xl text-xs font-extrabold text-slate-500 hover:text-slate-800 transition"
              >
                Close Specs
              </button>
              <button
                onClick={() => {
                  setCartProduct(selectedProduct);
                  setSelectedProduct(null);
                  setIsCheckoutOpen(true);
                }}
                className="bg-[#181613] hover:bg-[#f0c702] hover:text-stone-900 text-[#f0c702] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-md active:scale-97"
              >
                <span>Request Procurement Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: Full Sliding Checkout & Real Inquiry Flow */}
      {isCheckoutOpen && cartProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-2 border-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 relative text-left shadow-2xl space-y-6"
          >
            <button
              onClick={closeCheckoutFlow}
              className="absolute right-6 top-6 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 active:scale-95 transition"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            {!showInvoice ? (
              <>
                <div className="space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 bg-[#f0c702]/10 border border-[#f0c702]/30 px-3.5 py-1.5 rounded-xl text-[9px] font-black tracking-wider text-yellow-800 font-mono uppercase">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Procurement Inquiry Desk</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {isN ? "एकेडेमी हार्डवेयर सोधपुछ प्रविष्टि" : "Secure Hardware Inquiry Form"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isN
                      ? "हाम्रा ल्याब प्रबन्धकहरूसँग सिधै सम्पर्क गर्न यो विवरण भर्नुहोस्। सोधपुछ दर्ता भएपछि, हामी तपाईंको स्थानमा डेलिभरी वा विल्ड-अप सुरु गर्न मद्दत गर्नेछौं।"
                      : "We keep all custom-programmed hardware tax-free for students. Submit your shipping and academic profile below to spawn an inventory hold file."}
                  </p>
                </div>

                {/* Micro Selected Product Panel */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-11 h-11 bg-white border border-slate-150 rounded-xl relative overflow-hidden shrink-0">
                      <img src={cartProduct.image} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-950 truncate max-w-64">
                        {isN ? cartProduct.nameNe : cartProduct.nameEn}
                      </h5>
                      <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase">{cartProduct.id}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-slate-900 block font-mono">NPR {cartProduct.priceNPR.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 font-bold block font-mono">${cartProduct.priceUSD} USD</span>
                  </div>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10.5px] uppercase tracking-wider font-extrabold text-slate-500 font-mono">
                        {isN ? "नाम (आवश्यक) *" : "Your Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Niranjan Thapa"
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#f0c702]"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10.5px] uppercase tracking-wider font-extrabold text-slate-500 font-mono">
                        {isN ? "मोबाईल नम्बर * " : "Phone / WhatsApp *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g., +977-9801112233"
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#f0c702]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10.5px] uppercase tracking-wider font-extrabold text-slate-3000 text-slate-500 font-mono">Your Active Email Address</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g., student@itcollegenepal.edu"
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#f0c702]"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10.5px] uppercase tracking-wider font-extrabold text-slate-500 font-mono">Target School / College Name</label>
                      <input
                        type="text"
                        value={schoolCollege}
                        onChange={(e) => setSchoolCollege(e.target.value)}
                        placeholder="e.g., KMC Baneshwor"
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#f0c702]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10.5px] uppercase tracking-wider font-extrabold text-slate-500 font-mono">
                      {isN ? "डेलिभरी ठेगाना" : "Valley Shipping Address *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="e.g., Aloknagar, Mid-Baneshwor, Kathmandu"
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#f0c702]"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10.5px] uppercase tracking-wider font-extrabold text-slate-500 font-mono">Need special custom assembly or tutorials? (Optional)</label>
                    <textarea
                      rows={2}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="e.g., I want pre-installed robot scripts on my Arduino shield..."
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#f0c702] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#181613] hover:bg-[#f0c702] hover:text-stone-900 text-[#f0c702] py-4.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        <span>TRANSMITTING LEDGER DATA...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT STORE PROCUREMENT INQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              // INVOICE RECEIPT GENERATED UPON REQUEST
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {isN ? "खरिद सोधपुछ सफलतापूर्वक दर्ता भयो!" : "Inquiry Sheet Generated!"}
                  </h3>
                  <div className="text-xs text-slate-500">
                    Procurement Code ID: <span className="font-mono font-bold text-[#f0c702]">{lastSubmittedId}</span>
                  </div>
                </div>

                {/* Aesthetic Voucher Details block layout */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5.5 space-y-4 text-xs font-medium text-slate-700 text-left">
                  <div className="flex justify-between border-b border-slate-150 pb-2.5">
                    <span className="text-slate-400">Target Product:</span>
                    <span className="font-bold text-slate-950 truncate max-w-48">
                      {isN ? cartProduct.nameNe : cartProduct.nameEn}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-150 pb-2.5">
                    <span className="text-slate-400">Recipient Student:</span>
                    <span className="font-black text-slate-950">{customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-150 pb-2.5">
                    <span className="text-slate-400">Assigned Logistics ID:</span>
                    <span className="font-mono font-extrabold text-[#f0c702]">{cartProduct.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-150 pb-2.5">
                    <span className="text-slate-400">Total Price Due:</span>
                    <span className="font-mono font-black text-slate-950 text-base">NPR {cartProduct.priceNPR.toLocaleString()}</span>
                  </div>
                  <div className="pt-1.5 text-center text-[10px] text-slate-450 leading-relaxed italic">
                    {isN 
                      ? "हाम्रो मध्यबानेश्वर शाखाका स्टोर प्रबन्धकले सिट कन्फर्मेशन तथा डेलिभरी समय तोक्न १२ घण्टा भित्र तपाइँलाई फोन गर्नुहुनेछ।" 
                      : "A Tech Bee Nepal inventory representative will call you at your assigned mobile number to coordinate custom sensor flashing and delivery routes."}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <a
                    href="tel:+9779801167733"
                    className="flex-1 border-2 border-slate-900 hover:bg-slate-50 text-slate-800 font-extrabold text-xs px-5 py-3.5 rounded-xl uppercase tracking-wider inline-flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-4 h-4 text-[#f0c702]" />
                    <span>Call Store desk</span>
                  </a>
                  <button
                    onClick={closeCheckoutFlow}
                    className="flex-1 bg-[#181613] hover:bg-[#f0c702] hover:text-stone-900 text-[#f0c702] font-black text-xs px-5 py-3.5 rounded-xl uppercase tracking-wider shadow-sm"
                  >
                    <span>Done & Continue</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
}
