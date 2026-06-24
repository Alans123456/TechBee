export interface TranslationSchema {
  navHome: string;
  navCourses: string;
  navAbout: string;
  navGallery: string;
  navContact: string;
  navRegister: string;
  navDashboard: string;
  logoSub: string;
  heroTitle: string;
  heroSub: string;
  heroDesc: string;
  ctaRegister: string;
  ctaExplore: string;
  metaphorTitle: string;
  metaphorDesc: string;
  beeLabel: string;
  flowerLabel: string;
  impactTitle: string;
  impactSub: string;
  metricSchools: string;
  metricStudents: string;
  metricLabs: string;
  metricProjects: string;
  schoolsTitle: string;
  schoolsSub: string;
  coursesTitle: string;
  coursesSub: string;
  ageAll: string;
  levelPrimary: string;
  levelLowerSec: string;
  levelSecondary: string;
  levelHobbyist: string;
  courseDuration: string;
  courseLevel: string;
  courseAges: string;
  registerTitle: string;
  registerSub: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formSchool: string;
  formLevel: string;
  formCourse: string;
  formSchedule: string;
  formSubmit: string;
  formSuccess: string;
  schedMorning: string;
  schedAfternoon: string;
  schedEvening: string;
  testimonialsTitle: string;
  testimonialsSub: string;
  dashboardTitle: string;
  dashboardSub: string;
  dashLookupPlaceholder: string;
  dashLookupBtn: string;
  metricsHardware: string;
  metricsSoftware: string;
  metricsCreative: string;
  metricsTeamwork: string;
  metricsPresentation: string;
  teamsTitle: string;
  teamsSub: string;
}

export type Language = 'en' | 'ne';

export const translations: Record<Language, TranslationSchema> = {
  en: {
    navHome: "Home",
    navCourses: "IT Courses",
    navAbout: "About Us",
    navGallery: "Gallery",
    navContact: "Contact Us",
    navRegister: "Scholarships",
    navDashboard: "Verifications",
    logoSub: "Skills That Lead To Success",
    heroTitle: "Nepal's Premier Academy for Professional IT Training & British Degrees",
    heroSub: "Lead with Skills — Global Partnerships with AWS, EC-Council, Cisco, Red Hat & NCC UK",
    heroDesc: "Tech Bee Nepal offers world-class university computing programs, ethical hacking certifications, scalable cloud engineering tracks, and software career paths right here in Mid-Baneshwor, Kathmandu, Nepal.",
    ctaRegister: "Scholarship & Admissions",
    ctaExplore: "View Course Catalog",
    metaphorTitle: "Skills That Lead: Our Dynamic Educational Philosophy",
    metaphorDesc: "We hold a distinct educational driver at Tech Bee Nepal: Traditional classrooms produce observers, but skill-centered laboratories produce creators. We bridge globally vetted syllabi (like NCC Education UK and EC-Council) with rigorous cloud simulations and capstone project defenses to prepare Nepalese talent for high-paying global digital roles.",
    beeLabel: "Professional IT Certification Tracks",
    flowerLabel: "British BSc (Hons) Computing Pathway",
    impactTitle: "Our Footprints of Academic & Technical Success",
    impactSub: "A transparent performance report highlighting student career transitions, corporate alignments, and global certifications.",
    metricSchools: "Approved Hiring Partners",
    metricStudents: "Skilled IT Graduates",
    metricLabs: "Industry Courses Delivered",
    metricProjects: "Secured Placements",
    schoolsTitle: "Global Academic & Corporate Alliances",
    schoolsSub: "Working in close partnership with top international technology providers and accreditors to deliver gold-standard certification pathways.",
    coursesTitle: "Certified Technical Specializations",
    coursesSub: "Explore Tech Bee Nepal's meticulously structured certifications and college diplomas. Filter across domains to fuel your professional flight.",
    ageAll: "All Program Domains",
    levelPrimary: "UK Academic Diplomas (NCC Ed)",
    levelLowerSec: "Cybersecurity & Hacking",
    levelSecondary: "Cloud Computing & Networks",
    levelHobbyist: "Software & App Engineering",
    courseDuration: "Total Time",
    courseLevel: "Track Category",
    courseAges: "Prerequisites",
    registerTitle: "Enrollment Desk & Academic Scholarship Request",
    registerSub: "Secure your place in Nepal's highest-rated IT training cohort. Fill out the application, attach your academic GPA, and our senior career counselors will coordinate your admissions test.",
    formName: "Candidate's Full Name",
    formEmail: "Active Email Address",
    formPhone: "Mobile / WhatsApp Number",
    formSchool: "Graduating School / College",
    formLevel: "NCP / Academic Level attained",
    formCourse: "Target IT Course / Track",
    formSchedule: "Preferred Lecture Batch",
    formSubmit: "Submit Admissions Request",
    formSuccess: "Success! Your enrollment file has been processed. The Tech Bee Nepal counselor team will review your scholarship eligibility and call you within 12 hours.",
    schedMorning: "Morning Cohort (7:00 AM - 9:00 AM) — Ideal for Working Professionals",
    schedAfternoon: "Afternoon cohort (2:00 PM - 4:00 PM) — College Student Standard Shift",
    schedEvening: "Evening Masterclass (5:30 PM - 7:30 PM) — Fast-paced Advanced Lab",
    testimonialsTitle: "What Our Alumni Say About Us",
    testimonialsSub: "Real stories of career transformations from Kathmandu, Pokhara, and Nepal's premier corporate IT sectors.",
    dashboardTitle: "Academic Profile & Transcript Verifier",
    dashboardSub: "Enter your Student Registration ID (e.g., TB-2026-01) to verify global certifications, training milestones, lab reports, and official scholarship awards.",
    dashLookupPlaceholder: "Enter Student ID (e.g. TB-2026-01)",
    dashLookupBtn: "Retrieve Profile",
    metricsHardware: "Enterprise Lab Work & Implementations",
    metricsSoftware: "Core Theory & Concept Execution",
    metricsCreative: "Problem-Solving & Coding speed",
    metricsTeamwork: "Architectural Design & Collaborative Dev",
    metricsPresentation: "Viva Voce, Project Defense & Pitching",
    teamsTitle: "Our Certified Expert Engineering Instructors",
    teamsSub: "Learn directly from corporate technology architects, system operations managers, and vetted computer science authors."
  },
  ne: {
    navHome: "Home",
    navCourses: "IT Courses",
    navAbout: "About Us",
    navGallery: "Gallery",
    navContact: "Contact Us",
    navRegister: "Scholarships",
    navDashboard: "Verifications",
    logoSub: "Skills That Lead To Success",
    heroTitle: "Nepal's Premier Academy for Professional IT Training & British Degrees",
    heroSub: "Lead with Skills — Global Partnerships with AWS, EC-Council, Cisco, Red Hat & NCC UK",
    heroDesc: "Tech Bee Nepal offers world-class university computing programs, ethical hacking certifications, scalable cloud engineering tracks, and software career paths right here in Mid-Baneshwor, Kathmandu, Nepal.",
    ctaRegister: "Scholarship & Admissions",
    ctaExplore: "View Course Catalog",
    metaphorTitle: "Skills That Lead: Our Dynamic Educational Philosophy",
    metaphorDesc: "We hold a distinct educational driver at Tech Bee Nepal: Traditional classrooms produce observers, but skill-centered laboratories produce creators. We bridge globally vetted syllabi (like NCC Education UK and EC-Council) with rigorous cloud simulations and capstone project defenses to prepare Nepalese talent for high-paying global digital roles.",
    beeLabel: "Professional IT Certification Tracks",
    flowerLabel: "British BSc (Hons) Computing Pathway",
    impactTitle: "Our Footprints of Academic & Technical Success",
    impactSub: "A transparent performance report highlighting student career transitions, corporate alignments, and global certifications.",
    metricSchools: "Approved Hiring Partners",
    metricStudents: "Skilled IT Graduates",
    metricLabs: "Industry Courses Delivered",
    metricProjects: "Secured Placements",
    schoolsTitle: "Global Academic & Corporate Alliances",
    schoolsSub: "Working in close partnership with top international technology providers and accreditors to deliver gold-standard certification pathways.",
    coursesTitle: "Certified Technical Specializations",
    coursesSub: "Explore Tech Bee Nepal's meticulously structured certifications and college diplomas. Filter across domains to fuel your professional flight.",
    ageAll: "All Program Domains",
    levelPrimary: "UK Academic Diplomas (NCC Ed)",
    levelLowerSec: "Cybersecurity & Hacking",
    levelSecondary: "Cloud Computing & Networks",
    levelHobbyist: "Software & App Engineering",
    courseDuration: "Total Time",
    courseLevel: "Track Category",
    courseAges: "Prerequisites",
    registerTitle: "Enrollment Desk & Academic Scholarship Request",
    registerSub: "Secure your place in Nepal's highest-rated IT training cohort. Fill out the application, attach your academic GPA, and our senior career counselors will coordinate your admissions test.",
    formName: "Candidate's Full Name",
    formEmail: "Active Email Address",
    formPhone: "Mobile / WhatsApp Number",
    formSchool: "Graduating School / College",
    formLevel: "NCP / Academic Level attained",
    formCourse: "Target IT Course / Track",
    formSchedule: "Preferred Lecture Batch",
    formSubmit: "Submit Admissions Request",
    formSuccess: "Success! Your enrollment file has been processed. The Tech Bee Nepal counselor team will review your scholarship eligibility and call you within 12 hours.",
    schedMorning: "Morning Cohort (7:00 AM - 9:00 AM) — Ideal for Working Professionals",
    schedAfternoon: "Afternoon cohort (2:00 PM - 4:00 PM) — College Student Standard Shift",
    schedEvening: "Evening Masterclass (5:30 PM - 7:30 PM) — Fast-paced Advanced Lab",
    testimonialsTitle: "What Our Alumni Say About Us",
    testimonialsSub: "Real stories of career transformations from Kathmandu, Pokhara, and Nepal's premier corporate IT sectors.",
    dashboardTitle: "Academic Profile & Transcript Verifier",
    dashboardSub: "Enter your Student Registration ID (e.g., TB-2026-01) to verify global certifications, training milestones, lab reports, and official scholarship awards.",
    dashLookupPlaceholder: "Enter Student ID (e.g. TB-2026-01)",
    dashLookupBtn: "Retrieve Profile",
    metricsHardware: "Enterprise Lab Work & Implementations",
    metricsSoftware: "Core Theory & Concept Execution",
    metricsCreative: "Problem-Solving & Coding speed",
    metricsTeamwork: "Architectural Design & Collaborative Dev",
    metricsPresentation: "Viva Voce, Project Defense & Pitching",
    teamsTitle: "Our Certified Expert Engineering Instructors",
    teamsSub: "Learn directly from corporate technology architects, system operations managers, and vetted computer science authors."
  }
};
