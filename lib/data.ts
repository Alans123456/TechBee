export interface Course {
  id: string;
  code: string;
  nameEn: string;
  nameNe: string;
  level: 'primary' | 'middle' | 'secondary' | 'hobbyist'; // Map to: 'UK Academic Diplomas (NCC Ed)', 'Cybersecurity & Hacking', 'Cloud Computing & Networks', 'Software & App Engineering'
  levelEn: string;
  levelNe: string;
  ageEn: string;
  ageNe: string;
  durationEn: string;
  durationNe: string;
  descEn: string;
  descNe: string;
  highlightsEn: string[];
  highlightsNe: string[];
  priceEn: string;
  priceNe: string;
  kitEn: string;
  kitNe: string;
}

export interface Team {
  nameEn: string;
  nameNe: string;
  roleEn: string;
  roleNe: string;
  descEn: string;
  descNe: string;
  members: string[];
  specialty: string;
}

export interface Testimonial {
  authorEn: string;
  authorNe: string;
  roleEn: string;
  roleNe: string;
  schoolEn: string;
  schoolNe: string;
  quoteEn: string;
  quoteNe: string;
  rating: number;
}

export interface SchoolPartner {
  name: string;
  locationEn: string;
  locationNe: string;
  logoLetter: string;
}

export interface StudentRecord {
  id: string;
  nameEn: string;
  nameNe: string;
  schoolEn: string;
  schoolNe: string;
  levelEn: string;
  levelNe: string;
  projectNameEn: string;
  projectNameNe: string;
  projectDescEn: string;
  projectDescNe: string;
  hardware: number; // Mapping to: Lab Implementation Score
  software: number; // Mapping to: Core Theory Score
  creative: number; // Mapping to: Problem-Solving Speed
  teamwork: number; // Mapping to: Group Project Design
  presentation: number; // Mapping to: Viva-Voce Score
  feedbackEn: string;
  feedbackNe: string;
  statusEn: 'Completed & Certified' | 'Core Engineering Phase' | 'Design & Assembly Phase';
  statusNe: 'प्रमाणित तथा सम्पन्न' | 'मुख्य इन्जिनियरिङ चरण' | 'नक्साङ्कन तथा जडान चरण';
  certUrl?: string;
}

export const courses: Course[] = [
  {
    id: "c1",
    code: "DS-ACD-NCC",
    nameEn: "NCC UK Level 4 & 5 Diploma in Computing",
    nameNe: "NCC बेलायती कलेज कम्प्युटिङ शैक्षिक डिप्लोमा",
    level: "primary", // Maps to 'UK Academic Diplomas' tab
    levelEn: "UK Academic Diplomas (NCC Ed)",
    levelNe: "UK शैक्षिक डिप्लोमा (NCC Ed)",
    ageEn: "+2 High-School Graduate or equivalent",
    ageNe: "+2 वा सो सरह उत्तीर्ण",
    durationEn: "2 Years (Leads to British BSc Computing Degree)",
    durationNe: "२ वर्ष (BSc Hons कम्प्युटिङ डिग्री मार्ग)",
    descEn: "Formative British academic framework equivalent to the first two years of a UK Bachelor's Degree. Modules cover Database Design, Software Engineering Principles, Networking, and Agile Systems Development, verified externally by NCC Education UK.",
    descNe: "बेलायती विश्वविद्यालयको स्नातक तहको पहिलो र दोस्रो वर्ष सरहको शैक्षिक कोर्ष। यस अन्तर्गत डेटाबेस डिजाइन, सफ्टवेयर इन्जिनियरिङ, जाभा प्रोग्रामिङ र एजाइल थ्योरी अध्ययन गराइन्छ जसको प्रमाणीकरण सोझै बेलायतबाट हुन्छ।",
    highlightsEn: ["Globally recognized British Credits", "Guaranteed online transfer to top UK Universities", "Covers Object-Oriented Java & Systems Analysis"],
    highlightsNe: ["विश्वव्यापी रूपमा मान्यता प्राप्त बेलायती क्रेडिट", "बेलायतका उत्कृष्ट विश्वविद्यालयहरूमा अनलाइन ट्रान्सफर सुविधा", "अब्जेक्ट ओरिएन्टेड जाभा कोडिङ र प्रणाली विश्लेषण"],
    priceEn: "Contact to Inquire Tuition Fees",
    priceNe: "तालिम शुल्क बुझ्न सोधपुछ गर्नुहोस",
    kitEn: "Official NCC UK Academic Portal Credential",
    kitNe: "आधिकारिक NCC UK विद्यार्थी पोर्टल आईडी"
  },
  {
    id: "c2",
    code: "DS-SEC-CEH",
    nameEn: "Certified Ethical Hacker (CEH v12) Masterclass",
    nameNe: "प्रमाणित अनधिकृत पहुँच नियन्त्रक (CEH v12) साइबर सुरक्षा",
    level: "middle", // Maps to 'Cybersecurity & Hacking'
    levelEn: "Cybersecurity & Hacking Tools",
    levelNe: "साइबर सुरक्षा र ह्याकिङ उपकरणहरू",
    ageEn: "Basic Linux & Network Fundamentals required",
    ageNe: "लिनक्स र आधारभूत नेटवर्किङको ज्ञान आवश्यक",
    durationEn: "12 Weeks (48 High-Impact Lab Hours)",
    durationNe: "१२ हप्ता (४८ गहन प्रयोगात्मक ल्याब घण्टा)",
    descEn: "The undisputed industry standard for professional cybersecurity. Delve deep into reconnaissance, passive sniffing, system hacking, web server defenses, network penetration testing, and cryptography using specialized red-team tools.",
    descNe: "साइबर सुरक्षाको क्षेत्रमा विश्वव्यापी रूपमा मान्यता प्राप्त प्रख्यात कोर्ष। यस कोर्षमा सिस्टम ह्याकिङ, नेटवर्क स्क्यानिङ, वेब सर्भर डिफेन्स, प्याकेट स्निफिङ, र आधुनिक फोटोग्राफी इन्क्रिप्शन विधिको गहिरो अभ्यास गराइन्छ।",
    highlightsEn: ["EC-Council v12 Curriculum & Lab Sandbox", "Over 500+ Hacking Scenarios & Active Exploits", "Prepares for CEH v12 Global ANSI Exam"],
    highlightsNe: ["EC-Council v12 पाठ्यक्रम र अनलाइन ल्याब स्यान्डबक्स", "५०० भन्दा बढी वास्तविक साइबर आक्रमणका सिनारियोहरू", "CEH v12 विश्वव्यापी प्रमाणीकरण परीक्षा तयारी"],
    priceEn: "Inquire for Pricing & Intake details",
    priceNe: "शुल्क बुझ्न सोधपुछ गर्नुहोस",
    kitEn: "Tech Bee Nepal Cyber Range Pen-testing Kit",
    kitNe: "टेक बी नेपाल साइबर रेन्ज पेन-टेस्टिङ ल्याब सुइट"
  },
  {
    id: "c3",
    code: "DS-CLD-AWS",
    nameEn: "AWS Cloud Solutions Architect Certification Path",
    nameNe: "AWS क्लाउड सोलुसन्स आर्किटेक्ट प्रमाणिकरण कोर्ष",
    level: "secondary", // Maps to 'Cloud Computing & Networks'
    levelEn: "Cloud Computing & Networks",
    levelNe: "क्लाउड कम्प्युटिङ र नेटवर्कहरू",
    ageEn: "Operating System concepts or Network +",
    ageNe: "अपरेटिङ सिस्टम वा नेटवर्कको सामान्य बुझाइ",
    durationEn: "14 Weeks (Certified AWS Academy Curriculum)",
    durationNe: "१४ हप्ता (AWS आधिकारिक एकेडेमी पाठ्यक्रम)",
    descEn: "Master secure, highly scalable, and cost-effective system deployments on Amazon Web Services (AWS). Dive into EC2 instances, VPC private subnetting, RDS DB replication, serverless lambda code execution, and high-availability setups.",
    descNe: "अमेजन वेब सर्विसेज (AWS) मा सुरक्षित र अत्यन्त सबल डिजिटल प्रणाली बनाउन सिक्नुहोस्। क्लाउड स्टोरेज S3, भर्चुअल प्राइभेट क्लाउड (VPC), अटो-स्केलिङ, सर्भरलेस ल्याम्ब्डा र लोड ब्यालेन्सिङको व्यवहारिक अभ्यास गर्नुहोस।",
    highlightsEn: ["Hands-on console architecture labs", "AWS Academy official badges & learning portals", "Prepares for Cloud Practitioner & Solutions Architect Associate"],
    highlightsNe: ["वास्तविक AWS कन्सोल ल्याबहरूमा प्रत्यक्ष काम", "AWS एकेडेमी आधिकारिक डिजिटल ब्याज र सामग्रीहरू", "क्लाउड प्राक्टिसनर र आर्किटेक्ट परीक्षा तयारी"],
    priceEn: "Inquire for Pricing & Scholarship options",
    priceNe: "शुल्क बुझ्न सोधपुछ गर्नुहोस",
    kitEn: "AWS Academy Lab Console Credential ($100 USD Credit)",
    kitNe: "AWS एकेडेमी आधिकारिक ल्याब कन्सोल क्रिडेन्सियल"
  },
  {
    id: "c4",
    code: "DS-DEV-MERN",
    nameEn: "Advanced Full-Stack MERN Software Engineering",
    nameNe: "उन्नत फुल-स्ट्याक MERN सफ्टवेयर इन्जिनियरिङ",
    level: "hobbyist", // Maps to 'Software & App Engineering'
    levelEn: "Software & App Engineering",
    levelNe: "सफ्टवेयर तथा एप विकास",
    ageEn: "Command of HTML, CSS, and basic JavaScript logic",
    ageNe: "HTML, CSS र आधारभूत प्रोग्रामिङको ज्ञान",
    durationEn: "16 Weeks (Fully Project-Based Curriculum)",
    durationNe: "१६ हप्ता (पूर्ण रूपमा प्रोजेक्ट विकासमा आधारित)",
    descEn: "Synthesize full-stack web architectures from scratch using MongoDB, Express.js, React, and Node.js. Build real-world enterprise databases, state-controlled dashboards, secure REST APIs, JWT authentication layers, and deploy to production cloud servers.",
    descNe: "मङ्गोडिबी, एक्सप्रेस, रियाक्ट र नोड (MERN) प्रयोग गरी सुरुदेखि नै बलियो वेब प्रणालीहरू विकास गर्न सिक्नुहोस्। डाटाबेस आर्किटेक्चर, सेक्योर REST APIs, JWT अथेन्टिकेसन र क्लाउड प्लेटफर्ममा उत्पादन परिक्षण सिधै गर्न सिक्नुहोस्।",
    highlightsEn: ["Build 4 large production capstone systems", "Github version Control, CI/CD, and server deployment", "Guaranteed internship placement pathways in Nepal"],
    highlightsNe: ["४ वटा ठूला वास्तविक उद्योग स्तरको परियोजना निर्माण", "गिटहब, CI/CD प्रविधि र डिजिटल ओसन सर्भर डिप्लोयमेन्ट", "नेपालका ठूला आईटी कम्पनीहरूमा इन्टर्नसिप व्यवस्था"],
    priceEn: "Inquire for Pricing & Placement program",
    priceNe: "शुल्क बुझ्न सोधपुछ गर्नुहोस",
    kitEn: "Tech Bee Nepal Corporate Suite & Hosting Sandbox",
    kitNe: "टेक बी नेपाल कर्पोरेट कोडिङ सुइट र क्लाउड होस्टिङ"
  },
  {
    id: "c5",
    code: "DS-DEV-FLUTTER",
    nameEn: "Flutter Mobile Application Development Masterclass",
    nameNe: "फ्लटर मोबाइल एप्लिकेसन निर्माण माष्टरक्लास",
    level: "hobbyist", // Software & App Engineering
    levelEn: "Software & App Engineering",
    levelNe: "सफ्टवेयर तथा एप विकास",
    ageEn: "Object-Oriented Programming (OOP) concepts",
    ageNe: "अब्जेक्ट ओरिएन्टेड प्रोग्रामिङको सामान्य आधार",
    durationEn: "12 Weeks (Native iOS & Android compilation)",
    durationNe: "१२ हप्ता (एकै कोडबाट एन्ड्रोइड र आईओएस एप)",
    descEn: "Develop lightning-fast cross-platform native mobile databases using Google’s Dart language and Flutter SDK. Master state managers (Bloc/Riverpod), camera/location hardware integrations, and publish to PlayStore/AppStore.",
    descNe: "गुगलको अत्याधुनिक डार्ट (Dart) भाषा र फ्लटर (Flutter SDK) प्रयोग गरी एन्ड्रोइड र आइओएस दुवैका लागि एउटै कोडबाट आकर्षक र छिटो चल्ने मोबाइल एपहरू बनाउन सिक्नुहोस्। स्टेट म्यानेजमेन्ट र गुगल म्याप्स प्रयोग गर्न सिक्नुहोस्।",
    highlightsEn: ["Cross-Platform deployment (Android, iOS)", "State Management using Bloc & Riverpod", "Integrate third-party APIs and Google Maps Platform"],
    highlightsNe: ["एउटै कोडबाट क्रस-प्लेटफर्म मोबाइल एप जडान", "Bloc र Riverpod प्रयोग गरी स्टेट म्यानेजमेन्ट समाधान", "अन्तर्राष्ट्रिय भुक्तानी प्रणाली र गुगल म्याप्स जडान"],
    priceEn: "Inquire for Course Tuition Fee",
    priceNe: "शुल्क बुझ्न सोधपुछ गर्नुहोस",
    kitEn: "Integrated Mobile Sandbox Emulator pack",
    kitNe: "एकीकृत मोबाइल एमुलेटर प्याकेज"
  }
];

export const teamGroups: Team[] = [
  {
    nameEn: "Cyber Security & Systems Advisory",
    nameNe: "साइबर सुरक्षा तथा नेटवर्किङ सल्लाहकार बोर्ड",
    roleEn: "Red-Team Testing & Defence Delivery",
    roleNe: "इन्टरप्राइज पेन-टेस्टिङ तथा विश्लेषण",
    descEn: "Enterprise penetration testers and certified trainers ensure that our cyber security courses meet current EC-Council, CompTIA, and Red Hat standards.",
    descNe: "इन्टरप्राइज पेन-टेस्टिङ र प्रमाणित मास्टर ट्रेनरहरूको समूह, जसले सञ्चालित साइबर सुरक्षा कोर्षहरू अन्तर्राष्ट्रिय संस्थाका मापदण्डहरू अनुकूल रहेको सुनिश्चित गर्छन्।",
    members: ["Er. Pramod Karki, CEH Master", "Er. Nischal Tamang, CISSP Partner"],
    specialty: "Network Pen-testing, Threat Intel & Cryptography"
  },
  {
    nameEn: "Software Architectural Board",
    nameNe: "सफ्टवेयर विकास र आर्किटेक्चरल विशेषज्ञ",
    roleEn: "Cloud Systems & Full Stack Delivery",
    roleNe: "क्लाउड आर्किटेक्चर र सफ्टवेयर विकास",
    descEn: "Cloud Architects and senior Full-Stack Engineers who teach MERN stack, Java Spring-boot, and Amazon Web Services solutions directly in our labs.",
    descNe: "ठूला कर्पोरेट सञ्जालमा काम गरिरहेका क्लाउड विज्ञ र फुल-स्ट्याक आर्किटेक्टहरू, जसले प्रयोगात्मक रूपमा कोडिंग कौशल र आर्किटेक्चरल डिजाइन सिकाउँछन्।",
    members: ["Sulav Shrestha, Senior Cloud Architect", "Kriti Thapa, Lead MERN Engineer"],
    specialty: "AWS Enterprise, React, CI/CD, and Database Management"
  }
];

export const testimonials: Testimonial[] = [
  {
    authorEn: "Ram Bahadur Basnet",
    authorNe: "रामबहादुर बस्नेत",
    roleEn: "VP of Engineering & Human Capital",
    roleNe: "इन्जिनियरिङ तथा मानव संसाधन उपाध्यक्ष",
    schoolEn: "Logpoint Technologies Nepal, Lalitpur",
    schoolNe: "लगपोइन्ट टेक्नोलोजिज नेपाल, ललितपुर",
    quoteEn: "Tech Bee Nepal's graduates possess an outstanding command over active security tools and clean software architectures. Over 80% of our recruits from Tech Bee Nepal transitioned smoothly into mid-level positions. Unparalleled technical standards!",
    quoteNe: "टेक बी नेपालका दीक्षित विद्यार्थीहरूसँग वास्तविक ह्याकिङ उपकरण र चुस्त सफ्टवेयर आर्किटेक्चरको लोभलाग्दो ज्ञान हुने गरेको पाएका छौं। हाम्रा धेरै सुरक्षा विश्लेषकहरू टेक बी नेपालकै उत्पादन हुन्।",
    rating: 5
  },
  {
    authorEn: "Aaradhya Dahal",
    authorNe: "आराध्या दाहाल",
    roleEn: "Senior Full Stack Dev (MERN Grad)",
    roleNe: "वरिष्ठ फुल-स्ट्याक सफ्टवेयर इन्जिनियर",
    schoolEn: "F1Soft International Pvt. Ltd., Kathmandu",
    schoolNe: "F1Soft इन्टरनेशनल, काठमाडौं",
    quoteEn: "Coming from a non-IT background, the career guidance counselor at Tech Bee Nepal assessed my analytical parameters and recommended the MERN Stack path. Today I lead a fintech API integration team at F1Soft. Forever grateful!",
    quoteNe: "गैर-आईटी क्षेत्रबाट आएकाले मलाई सफ्टवेयर विकास निकै गाह्रो लाग्थ्यो। तर टेक बी नेपालको कुशल मार्गदर्शन र प्रयोगात्मक ल्याब अभ्यासले मलाई बलियो सफ्टवेयर इन्जिनियर बनायो र आज म F1Soft मा सफल छु।",
    rating: 5
  },
  {
    authorEn: "Deepak Raj Joshi",
    authorNe: "दीपकराज जोशी",
    roleEn: "Lead Cloud Infrastructure Architect",
    roleNe: "प्रमुख क्लाउड पूर्वाधार आर्किटेक्ट",
    schoolEn: "Deerhold Ltd., Kathmandu",
    schoolNe: "डियरहोल्ड लिमिटेड, काठमाडौं",
    quoteEn: "I prepared for my AWS Solutions Architect credential at Tech Bee Nepal's local authorized testing terminal. The trainers solved actual deployment fail-safes and optimized billing matrices perfectly. Outstanding mentorship and lab!",
    quoteNe: "मैले टेक बी नेपालको परीक्षा केन्द्रबाट मेरो AWS प्रमाणीकरण परीक्षा उत्तीर्ण गरें। यहाँका प्रशिक्षकहरू उद्योगकै उत्कृष्ट र सिकाउने शैली अत्यन्त सरल र व्यवहारिक रहेको पाएँ।",
    rating: 5
  }
];

export const schoolPartners: SchoolPartner[] = [
  { name: "ECCouncil Global", locationEn: "Official Accredited Training Center", locationNe: "आधिकारिक प्रमाणित परीक्षा केन्द्र", logoLetter: "E" },
  { name: "NCC Education UK", locationEn: "British Computing Center #NP842", locationNe: "बेलायती कम्प्युटिङ परीक्षा साझेदार", logoLetter: "N" },
  { name: "AWS Academy", locationEn: "Official Institution Partner", locationNe: "आधिकारिक एकेडेमी शिक्षण साझेदार", logoLetter: "A" },
  { name: "Cisco Networking", locationEn: "Cisco Routing Academy", locationNe: "सिस्को नेटवर्किङ एकेडेमी सदस्य", logoLetter: "C" },
  { name: "Red Hat Enterprise", locationEn: "Enterprise Linux Partner", locationNe: "इन्टरप्राइज लिनक्स ट्रेनिङ सहयोगी", logoLetter: "R" }
];

export const mockStudents: Record<string, StudentRecord> = {
  "TB-2026-01": {
    id: "TB-2026-01",
    nameEn: "Samir Basnet",
    nameNe: "समिर बस्नेत",
    schoolEn: "Nagarjuna College of IT",
    schoolNe: "नागार्जुन कलेज अफ आईटी",
    levelEn: "Bachelor In CS (CEH Scholar)",
    levelNe: "कम्प्युटर साइन्स (CEH स्कलर)",
    projectNameEn: "Automated Enterprise Decoy Honey-pot Network",
    projectNameNe: "स्वचालित कर्पोरेट वेब डिकय हनी-पट नेटवर्क",
    projectDescEn: "A secure honeypot infrastructure built on docker containers mimicking critical SSH portals and databases, capturing active network logs and storing threat intel metadata.",
    projectDescNe: "डकर कन्टेनर प्रणालीमा निर्मित विशेष साइबर ट्र्याप (हनी-पट) जसले अवैध ह्याकिङ प्रयासहरूलाई झुक्याउँदै वास्तविक समयमा म्यालिसियस ट्राफिक विश्लेषण गर्दछ।",
    hardware: 95,
    software: 92,
    creative: 88,
    teamwork: 90,
    presentation: 94,
    statusEn: "Completed & Certified",
    statusNe: "प्रमाणित तथा सम्पन्न",
    feedbackEn: "Samir exhibited superior critical analysis during cyber penetration defenses. He holds a spotless report resolving advanced privilege escalation tasks.",
    feedbackNe: "समिरले साइबर सुरक्षा परीक्षा र डिफेन्स बहसमा उत्कृष्ट प्रदर्शन गरे। उनले लिनक्स रुट एक्सेस चुनौतीहरू निकै कम समयमा हल गरेका छन्।",
    certUrl: "CERT-TB-9428-CEH"
  },
  "TB-2026-02": {
    id: "TB-2026-02",
    nameEn: "Aaradhya Dahal",
    nameNe: "आराध्या दाहाल",
    schoolEn: "Patan Multiple Campus",
    schoolNe: "पाटन बहुमुखी क्याम्पस",
    levelEn: "MERN Stack Dev Scholar",
    levelNe: "MERN स्ट्याक सफ्टवेयर कोर्ष",
    projectNameEn: "Cryptographic Nepalese Micro-payment Gateway",
    projectNameNe: "नेपाली ई-कमर्स भुक्तानी गेटवे सफ्टवेयर प्रणाली",
    projectDescEn: "A complete responsive payments portal built on Express.js and React, incorporating secure HMAC validation APIs and JWT token synchronization for user audits.",
    projectDescNe: "एक्सप्रेस र रियाक्ट फ्रेमवर्कमा तयार गरिएको पूर्ण भुक्तानी प्रणाली, जसमा सुरक्षित भुक्तानी सुनिश्चित गर्न HMAC क्रिप्टोग्राफी र टोकन प्रमाणीकरण प्रयोग गरिएको छ।",
    hardware: 88,
    software: 96,
    creative: 92,
    teamwork: 94,
    presentation: 90,
    statusEn: "Completed & Certified",
    statusNe: "प्रमाणित तथा सम्पन्न",
    feedbackEn: "Aaradhya has a robust grasp of React states and MongoDB clustering. Her API route error handlers are structured beautifully.",
    feedbackNe: "आराध्याको रियाक्ट स्टेट म्यानेजमेन्ट र मङ्गोडिबी क्लस्टरिङमा असाधारण पकड छ। उनको वेब कोडिङ अत्यन्त स्तरीय र व्यावसायिक छ।",
    certUrl: "CERT-TB-0193-MERN"
  },
  "TB-2026-03": {
    id: "TB-2026-03",
    nameEn: "Prasiddhi Shrestha",
    nameNe: "प्रसिद्धि श्रेष्ठ",
    schoolEn: "Kathmandu University (KU)",
    schoolNe: "काठमाडौं विश्वविद्यालय (KU)",
    levelEn: "AWS Cloud Devops Track",
    levelNe: "AWS क्लाउड डेभप्स कोर्ष",
    projectNameEn: "High-Availability Load Balanced Cloud VPC",
    projectNameNe: "AWS मल्टि-रिजन सुरक्षित क्लाउड VPC पूर्वाधार",
    projectDescEn: "An production-ready AWS network incorporating Amazon S3, Route53 failovers, Application Load Balancers, and private subnet replication.",
    projectDescNe: "मल्टि-रिजन अटो-स्केलिङ र डेटाबेस ब्याकअपयुक्त क्लाउड नेटवर्क, जहाँ अटोमेटिक लोड ब्यालेन्सिङ र क्लाउड डिफेन्स प्रणाली परीक्षण गरिएको छ।",
    hardware: 92,
    software: 90,
    creative: 94,
    teamwork: 88,
    presentation: 92,
    statusEn: "Core Engineering Phase",
    statusNe: "मुख्य इन्जिनियरिङ चरण",
    feedbackEn: "Prasiddhi correctly configured multi-region EC2 auto-scaling schedules under budget constraints. Currently preparing her Solutions Architect Capstone defense.",
    feedbackNe: "प्रसिद्धिले बजेट र माग नियन्त्रण गर्दै AWS क्लाउड प्रणालीहरू जडान गर्ने कला राम्रोसँग प्रदर्शन गरिन्। अहिले उनी फाइनल प्रोजेक्ट डिफेन्सको तयारीमा व्यस्त छिन्।"
  }
};
