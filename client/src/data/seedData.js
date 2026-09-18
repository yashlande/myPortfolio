// Pre-populated resume data for Yashwant Bhagwatrao Lande
const seedData = {
  profile: {
    name: "Yashwant Bhagwatrao Lande",
    title: "Senior Frontend Developer",
    subtitle: "5+ Years Experience | React.js • TypeScript • Material Design • REST APIs",
    email: "yashlande@gmail.com",
    phone: "+91-9511645690",
    location: "Pandharpur, Maharashtra, India",
    github: "https://github.com/yashlande",
    linkedin: "https://www.linkedin.com/in/yashwant-lande-638a5510a/",
    resumeUrl: "/resume_yashwant_lande.html",
    summary: "Frontend Developer with 5+ years of experience building production-scale React applications in fully remote development environments. Experienced in developing enterprise dashboards, data-driven platforms, and customer-facing web applications using React.js, TypeScript, and REST APIs. Strong background in component-based architecture, API integration, performance optimization, and Agile development workflows.",
    yearsExperience: "5+",
    projectsCompleted: "6+",
    performanceMetric: "60%+"
  },
  experience: [
    {
      id: "exp-1",
      company: "CogniCraft Pvt Ltd",
      role: "Developer (Contract)",
      duration: "Nov 2023 - Jun 2026",
      location: "Remote",
      description: "Leading frontend architecture for enterprise AI and data-driven platforms. Spearheaded the development of AI-based resume shortlisting tools and dynamic chart analytics suites.",
      highlights: "Built VIL CV Scanner for Vodafone Idea; developed GoInfinitix data visualizer; optimized complex React TS state flows.",
      order: 1
    },
    {
      id: "exp-2",
      company: "Iauro Pvt. Ltd. Pune",
      role: "Software Engineer",
      duration: "Mar 2022 - Aug 2023",
      location: "Pune, India (Hybrid)",
      description: "Engineered mission-critical customer-facing web platforms and developer tooling. Worked in high-velocity agile cross-functional teams of up to 38 members.",
      highlights: "Spearheaded Solar Square customer onboarding which reduced commissioning lead-time by 60%; contributed to Gessa Studio low-code React builder accelerating dev speed by 65%.",
      order: 2
    },
    {
      id: "exp-3",
      company: "MuGenesys Software Pvt. Ltd.",
      role: "Jr. Software Engineer",
      duration: "Jul 2021 - Mar 2022",
      location: "India",
      description: "Developed and integrated telehealth web application components, time-slot booking systems, and doctor management dashboards.",
      highlights: "Engineered responsive UI for E-Medicare doctor appointments, medicine ordering, and admin management.",
      order: 3
    },
    {
      id: "exp-4",
      company: "ABitValley Technologies LLP",
      role: "Software Trainee",
      duration: "May 2020 - Jun 2021",
      location: "India",
      description: "Gained intensive hands-on experience in React.js component architectures, Firebase backend integration, and responsive web design.",
      highlights: "Delivered Job Portal and Matrimony showcase platforms with real-time Firebase syncing.",
      order: 4
    },
    {
      id: "exp-5",
      company: "Kohinoor Technical Institute",
      role: "Technical Trainer",
      duration: "Jul 2016 - Feb 2019",
      location: "India",
      description: "Conducted technical training and mentoring on computing foundations, software systems, and computer applications.",
      highlights: "Trained hundreds of students in technical competencies with high pass rates.",
      order: 5
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "VIL CV Scanner",
      company: "CogniCraft Pvt Ltd",
      role: "Front-End Developer",
      url: "https://cvs.goinfinitix.com/",
      tech: "React, Node.js, Python, MongoDB, Material UI",
      featured: true,
      tag: "AI & GenAI",
      description: "AI-based tool developed for Vodafone Idea Pvt. Ltd. to shortlist resumes. Similar to ChatGPT conversational interface that replies to queries with custom filters for recruiters to gain granular control over shortlisting results.",
      impact: "Automated candidate shortlisting workflow for enterprise telecommunications giant.",
      order: 1
    },
    {
      id: "proj-2",
      title: "GoInfinitix",
      company: "CogniCraft Pvt Ltd",
      role: "Front-End Developer",
      url: "https://goinfinitix.com/login",
      tech: "React TS, Node.js, MongoDB, Python, AWS Code, Jira",
      featured: true,
      tag: "Analytics Dashboard",
      description: "Comprehensive data analytics suite with dynamic interactive charts, real-time data visualizers, and dataset manipulation for multi-tenant enterprise dashboards.",
      impact: "Delivered high-performance visualization over large complex datasets with seamless UX.",
      order: 2
    },
    {
      id: "proj-3",
      title: "Solar Square",
      company: "Iauro Pvt. Ltd. Pune",
      role: "Front-End Developer",
      url: "https://lighthouse.solarsquare.in/",
      tech: "React TS, Node.js, MongoDB, Python, Bitbucket",
      featured: true,
      tag: "Enterprise Platform",
      description: "Pivotal customer-facing web application transitioning offline solar operations (document collection, client verification, onboarding) into a frictionless digital platform.",
      impact: "Reduced the lead-to-project commissioning time by 60% and opened new digital revenue channels.",
      order: 3
    },
    {
      id: "proj-4",
      title: "Gessa Studio",
      company: "Iauro Pvt. Ltd. Pune",
      role: "Front-End Developer",
      url: "",
      tech: "React TS, Node.js, MongoDB, Jira, Bitbucket",
      featured: true,
      tag: "Low-Code Builder",
      description: "Low-code / no-code platform empowering rapid creation of React applications from the ground up, with theme management, user controls, dynamic backend workflows, and REST API generation.",
      impact: "Accelerated frontend and backend development delivery timeline by up to 65%.",
      order: 4
    },
    {
      id: "proj-5",
      title: "E-Medicare",
      company: "MuGenesys Software Pvt. Ltd",
      role: "Front-End Developer",
      url: "",
      tech: "React JS, Node.js, MongoDB, Bitbucket",
      featured: false,
      tag: "Healthcare",
      description: "Integrated online healthcare platform facilitating doctor appointments, slot booking, digital prescription viewing, and medicine purchases with admin scheduling tools.",
      impact: "Streamlined online patient appointment lifecycle and doctor availability management.",
      order: 5
    },
    {
      id: "proj-6",
      title: "Job Portal and Matrimony",
      company: "ABitValley Technologies LLP",
      role: "Front-End Developer",
      url: "",
      tech: "React JS, Firebase, Git",
      featured: false,
      tag: "Web Platform",
      description: "Dual-purpose web portal demonstrating robust interactive filtering, candidate profile matching, and cloud data synchronization using Firebase real-time database.",
      impact: "Successfully delivered prospective client showcase solution tailored to client specifications.",
      order: 6
    }
  ],
  skills: [
    {
      category: "Frontend Development",
      items: [
        { name: "React.js", level: "Expert", years: "5+" },
        { name: "TypeScript", level: "Advanced", years: "4+" },
        { name: "JavaScript (ES6+)", level: "Expert", years: "5+" },
        { name: "Material Design / MUI", level: "Expert", years: "4+" },
        { name: "HTML5 / CSS3", level: "Expert", years: "5+" },
        { name: "Bootstrap 4 / jQuery", level: "Advanced", years: "4+" },
        { name: "Responsive Design", level: "Expert", years: "5+" },
        { name: "State Management", level: "Advanced", years: "4+" }
      ]
    },
    {
      category: "Backend & Databases",
      items: [
        { name: "REST APIs & JSON", level: "Expert", years: "5+" },
        { name: "Node.js", level: "Intermediate", years: "3+" },
        { name: "Express.js", level: "Intermediate", years: "3+" },
        { name: "MongoDB", level: "Intermediate", years: "3+" },
        { name: "MySQL / PostgreSQL", level: "Intermediate", years: "2+" },
        { name: "Firebase", level: "Intermediate", years: "2+" }
      ]
    },
    {
      category: "DevOps, Tools & Methodology",
      items: [
        { name: "Git / GitHub / TortoiseGit", level: "Expert", years: "5+" },
        { name: "JIRA & Confluence", level: "Advanced", years: "4+" },
        { name: "AWS CodeDeploy & CodeBuild", level: "Intermediate", years: "2+" },
        { name: "Bitbucket", level: "Advanced", years: "3+" },
        { name: "Agile / Scrum", level: "Expert", years: "5+" },
        { name: "Performance Optimization", level: "Advanced", years: "4+" }
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.C.A (Bachelor of Computer Applications)",
      institution: "New Satara College, Pandharpur",
      year: "2015",
      score: "66%"
    },
    {
      id: "edu-2",
      degree: "Intermediate (H.S.C)",
      institution: "K. B. P. College, Pandharpur",
      year: "2012",
      score: "69.67%"
    },
    {
      id: "edu-3",
      degree: "S.S.C",
      institution: "Bhatsangvi College, Bhatsangvi",
      year: "2010",
      score: "62.30%"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Prize in Techno Zeal Google Search Event",
      issuer: "Techno Zeal",
      description: "Secured top position for information retrieval, research speed, and precision."
    },
    {
      id: "ach-2",
      title: "Certificate of Successful Completion - Solar Square Client Project",
      issuer: "Iauro Pvt. Ltd.",
      description: "Awarded for exceptional frontend delivery reducing commissioning time by 60%."
    },
    {
      id: "ach-3",
      title: "Node.js, Express, MongoDB Masterclass with Real Project",
      issuer: "Certified Masterclass (2023)",
      description: "Comprehensive backend architecture and REST API development certification."
    }
  ]
};

export default seedData;
