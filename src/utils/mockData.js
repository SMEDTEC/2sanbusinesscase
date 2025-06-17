// Mock data for the 2SAN Business Case Template application

export const projects = [
  {
    id: 1,
    name: "COVID/Flu OTC Pen Test 510(k) Submission",
    owner: "Sherif Elkadem",
    manufacturer: "Hangzhou Assure Tech",
    region: "USA",
    productType: "Medical Device",
    description: "Dual detection self-test for COVID-19 and influenza A/B",
    objective: "Obtain FDA clearance and launch OTC",
    targetMarket: "U.S. consumers / retailers",
    keyFeatures: "Dual-analyte detection, at-home usability, rapid results",
    status: "Not Started",
    launchDate: "Oct 15, 2025",
    totalCost: 2000000,
    year1Revenue: 3500000,
    highestRiskScore: 0.8,
    highestRiskIdentification: "Delay",
    phases: [
      {
        id: 1,
        name: "Phase 1",
        description: "Initial Planning & Contracting",
        startDate: "14/06/2025",
        endDate: "05/08/2025",
        duration: 52,
        status: "Not Started"
      },
      {
        id: 2,
        name: "Phase 2",
        description: "Technical File Transfer & LOA",
        startDate: "06/08/2025",
        endDate: "22/08/2025",
        duration: 16,
        status: "Not Started"
      },
      {
        id: 3,
        name: "Phase 3",
        description: "CRO Engagement & Regulatory Strategy",
        startDate: "23/08/2025",
        endDate: "20/09/2025",
        duration: 28,
        status: "Not Started"
      },
      {
        id: 4,
        name: "Phase 4",
        description: "Pre-Sub Prep & FDA Meeting",
        startDate: "21/09/2025",
        endDate: "05/11/2025",
        duration: 45,
        status: "Not Started"
      },
      {
        id: 5,
        name: "Phase 5",
        description: "Final Protocol Design & IRB Submission",
        startDate: "06/11/2025",
        endDate: "25/11/2025",
        duration: 19,
        status: "Not Started"
      },
      {
        id: 6,
        name: "Phase 6",
        description: "Study Startup & Logistics",
        startDate: "26/11/2025",
        endDate: "03/01/2026",
        duration: 38,
        status: "Not Started"
      },
      {
        id: 7,
        name: "Phase 7",
        description: "Clinical Execution",
        startDate: "04/01/2026",
        endDate: "22/02/2026",
        duration: 49,
        status: "Not Started"
      },
      {
        id: 8,
        name: "Phase 8",
        description: "Data Analysis & Report Writing",
        startDate: "23/02/2026",
        endDate: "20/03/2026",
        duration: 25,
        status: "Not Started"
      },
      {
        id: 9,
        name: "Phase 9",
        description: "510(k) Compilation & eSTAR",
        startDate: "21/03/2026",
        endDate: "18/04/2026",
        duration: 28,
        status: "Not Started"
      },
      {
        id: 10,
        name: "Phase 10",
        description: "FDA Review & Clearance",
        startDate: "19/04/2026",
        endDate: "18/07/2026",
        duration: 90,
        status: "Not Started"
      },
      {
        id: 11,
        name: "Phase 11",
        description: "NPD Process & Launch",
        startDate: "19/07/2026",
        endDate: "15/10/2026",
        duration: 88,
        status: "Not Started"
      }
    ],
    costs: [
      {
        category: "Regulatory Strategy",
        description: "Regulatory Strategy & FDA Pre-Sub",
        amount: 60000,
        year: 2025,
        phase: 3,
        status: "Not Started"
      },
      {
        category: "Clinical Start-Up",
        description: "Study Start-Up & Site Initiation",
        amount: 200000,
        year: 2025,
        phase: 6,
        status: "Not Started"
      },
      {
        category: "Clinical Execution",
        description: "Clinical Study Execution",
        amount: 700000,
        year: 2025,
        phase: 7,
        status: "Not Started"
      },
      {
        category: "Data Management",
        description: "Data Analysis & Final Report",
        amount: 240000,
        year: 2026,
        phase: 8,
        status: "Not Started"
      },
      {
        category: "Regulatory Submission",
        description: "510(k) eSTAR Preparation & Submission",
        amount: 150000,
        year: 2026,
        phase: 9,
        status: "Not Started"
      },
      {
        category: "Regulatory Submission",
        description: "FDA Review & AI Responses",
        amount: 250000,
        year: 2026,
        phase: 10,
        status: "Not Started"
      }
    ],
    commercialModel: {
      year1: {
        revenue: 3500787,
        cogs: 1400315,
        grossMargin: 2100472,
        marketing: 700157,
        operations: 350079,
        rd: 175039,
        netProfit: 450000
      },
      year2: {
        revenue: 7500000,
        cogs: 3000000,
        grossMargin: 4500000,
        marketing: 1125000,
        operations: 600000,
        rd: 300000,
        netProfit: 2000000
      },
      year3: {
        revenue: 12000000,
        cogs: 4800000,
        grossMargin: 7200000,
        marketing: 1440000,
        operations: 840000,
        rd: 360000,
        netProfit: 3500000
      }
    },
    risks: [
      {
        id: "R-001",
        category: "Regulatory",
        description: "FDA may request additional clinical data beyond what is planned",
        probability: 4,
        impact: 5,
        score: 0.8,
        mitigation: "Pre-submission meeting to align on requirements; contingency budget for additional studies",
        owner: "Regulatory Affairs",
        status: "Open"
      },
      {
        id: "R-002",
        category: "Clinical",
        description: "Slow patient enrollment in clinical studies",
        probability: 3,
        impact: 4,
        score: 0.6,
        mitigation: "Multi-site recruitment strategy; enrollment incentives; backup sites identified",
        owner: "Clinical Operations",
        status: "Open"
      },
      {
        id: "R-003",
        category: "Technical",
        description: "Usability testing reveals design issues requiring modifications",
        probability: 3,
        impact: 4,
        score: 0.6,
        mitigation: "Early formative usability testing; rapid design iteration capability",
        owner: "R&D",
        status: "Open"
      },
      {
        id: "R-004",
        category: "Supply Chain",
        description: "Component shortages affecting manufacturing scale-up",
        probability: 2,
        impact: 5,
        score: 0.5,
        mitigation: "Secondary supplier qualification; strategic inventory build",
        owner: "Operations",
        status: "Open"
      },
      {
        id: "R-005",
        category: "Commercial",
        description: "Competitive product launch before market entry",
        probability: 3,
        impact: 3,
        score: 0.45,
        mitigation: "Competitive intelligence monitoring; differentiation strategy",
        owner: "Marketing",
        status: "Open"
      }
    ]
  },
  {
    id: 2,
    name: "Rapid Strep A Home Test",
    owner: "Maria Johnson",
    manufacturer: "MedTech Solutions",
    region: "North America",
    productType: "Medical Device",
    description: "At-home rapid test for strep throat detection",
    objective: "Obtain FDA clearance and launch DTC",
    targetMarket: "U.S. consumers / pharmacies",
    keyFeatures: "15-minute results, smartphone app integration, high sensitivity",
    status: "In Progress",
    launchDate: "Mar 30, 2026",
    totalCost: 1500000,
    year1Revenue: 2800000,
    highestRiskScore: 0.6,
    highestRiskIdentification: "Technical",
    phases: [
      {
        id: 1,
        name: "Phase 1",
        description: "Initial Planning & Contracting",
        startDate: "01/02/2025",
        endDate: "15/03/2025",
        duration: 42,
        status: "Completed"
      },
      {
        id: 2,
        name: "Phase 2",
        description: "Technical File Transfer",
        startDate: "16/03/2025",
        endDate: "30/03/2025",
        duration: 14,
        status: "Completed"
      },
      {
        id: 3,
        name: "Phase 3",
        description: "Regulatory Strategy",
        startDate: "01/04/2025",
        endDate: "30/04/2025",
        duration: 29,
        status: "In Progress"
      }
    ]
  },
  {
    id: 3,
    name: "Continuous Glucose Monitor",
    owner: "David Chen",
    manufacturer: "DiaTech Inc.",
    region: "Global",
    productType: "Medical Device",
    description: "Wearable continuous glucose monitoring system",
    objective: "Obtain CE Mark and FDA clearance",
    targetMarket: "Diabetes patients worldwide",
    keyFeatures: "14-day wear, smartphone connectivity, predictive alerts",
    status: "Planning",
    launchDate: "Sep 15, 2026",
    totalCost: 3500000,
    year1Revenue: 5200000,
    highestRiskScore: 0.7,
    highestRiskIdentification: "Regulatory",
    phases: [
      {
        id: 1,
        name: "Phase 1",
        description: "Initial Planning",
        startDate: "01/08/2025",
        endDate: "30/09/2025",
        duration: 60,
        status: "Not Started"
      }
    ]
  }
];

export const users = [
  {
    id: 1,
    name: "Sherif Elkadem",
    role: "Project Manager",
    email: "sherif.elkadem@2san.com"
  },
  {
    id: 2,
    name: "Maria Johnson",
    role: "Regulatory Affairs Director",
    email: "maria.johnson@2san.com"
  },
  {
    id: 3,
    name: "David Chen",
    role: "R&D Director",
    email: "david.chen@2san.com"
  }
];
