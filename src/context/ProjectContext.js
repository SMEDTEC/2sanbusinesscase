import React, { createContext, useState, useEffect, useCallback } from 'react';

const PROJECTS_STORAGE_KEY = '2sanBusinessCaseProjects_react';
const STAGES = ['Idea', 'Proof of Concept', 'Approved', 'Execution', 'Complete', 'On Hold', 'Cancelled'];
const DEFAULT_PROJECT_STAGE = STAGES[0];

export const defaultCommercialModelStructure = {
  accounts: [
    {
      accountName: 'New Account',
      years: {
        year1: { numberOfDoors: 0, velocityPerDoorPerWeek: 0 },
        year2: { numberOfDoors: 0, velocityPerDoorPerWeek: 0 },
        year3: { numberOfDoors: 0, velocityPerDoorPerWeek: 0 },
      },
      costPricePerUnit: 2.5, // Assuming cost/sell price are global per account
      sellPricePerUnit: 3.5,
      notes: ''
    }
  ],
  costPerUnit: 2.50,
  sellPerUnit: 3.50,
  totalDoorsAvailable: 125304,
  averageSalesVelocity: 0.85, // units per door per week
  penetrationPercentYear1: 60, // Percentage
  penetrationPercentYear2: 75, // Percentage
  penetrationPercentYear3: 80, // Percentage
  totalDoors: { year1: 0, year2: 0, year3: 0 }, 
  avgUnitsPerDoor: { year1: 0, year2: 0, year3: 0 }, 
  totalInvestment: { year1: 0, year2: 0, year3: 0 },
  quarterlyDistribution: {
    year1: [ { q:1, p:10 }, { q:2, p:15 }, { q:3, p:35 }, { q:4, p:40 } ],
    year2: [ { q:1, p:20 }, { q:2, p:10 }, { q:3, p:35 }, { q:4, p:35 } ],
    year3: [ { q:1, p:20 }, { q:2, p:10 }, { q:3, p:35 }, { q:4, p:35 } ],
  },
  projections: {
    years: [
      { year: 1, unitSales: 0, totalRevenue: 0, totalCostOfGoods: 0, totalGrossMargin: 0, quarters: [ { quarter: 1, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 2, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 3, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 4, revenue: 0, costOfGoods: 0, grossMargin: 0 }] },
      { year: 2, unitSales: 0, totalRevenue: 0, totalCostOfGoods: 0, totalGrossMargin: 0, quarters: [ { quarter: 1, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 2, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 3, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 4, revenue: 0, costOfGoods: 0, grossMargin: 0 }] },
      { year: 3, unitSales: 0, totalRevenue: 0, totalCostOfGoods: 0, totalGrossMargin: 0, quarters: [ { quarter: 1, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 2, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 3, revenue: 0, costOfGoods: 0, grossMargin: 0 }, { quarter: 4, revenue: 0, costOfGoods: 0, grossMargin: 0 }] },
    ],
    summary: {
      totalRevenue: 0, totalCostOfGoods: 0, totalGrossMargin: 0,
      totalInvestment: 0, totalNetProfit: 0, revenueCAGR: 0,
    }
  }
};

const initialMockProjects = [
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
        stage: "Idea",
        approvals: [],
        launchDate: "2025-10-15",
        totalCost: 2000000,
        year1Revenue: 3500000,
        highestRiskScore: 0.8,
        highestRiskIdentification: "Delay",
        phases: [{ id: 1, name: "Phase 1", description: "Initial Planning & Contracting", startDate: "2025-06-14", endDate: "2025-08-05", duration: 52, status: "Not Started" }],
        costs: [{ category: "Regulatory Strategy", description: "Regulatory Strategy & FDA Pre-Sub", amount: 60000, year: 2025, phase: 3, status: "Not Started" }],
        commercialModel: JSON.parse(JSON.stringify(defaultCommercialModelStructure)),
        risks: [{ id: "R-001", category: "Regulatory", description: "FDA may request additional clinical data", probability: 4, impact: 5, score: 0.8, mitigation: "Pre-submission meeting", owner: "Regulatory Affairs", status: "Open" }]
    },
    {
        id: 2,
        name: "Rapid Strep A Home Test",
        owner: "Maria Johnson",
        manufacturer: "SMEDTEC Labs",
        region: "Europe",
        productType: "Diagnostic",
        description: "Quick and reliable Strep A test for home use.",
        objective: "CE Mark and EU market launch.",
        targetMarket: "EU consumers, pharmacies",
        keyFeatures: "Rapid results, high accuracy, user-friendly.",
        stage: "Proof of Concept",
        approvals: [{ stage: "Idea", approver: "Management", date: "2025-01-10", notes: "Approved for PoC." }],
        launchDate: "2026-03-30",
        totalCost: 1500000,
        year1Revenue: 2800000,
        highestRiskScore: 0.7,
        highestRiskIdentification: "Manufacturing Scalability",
        phases: [], 
        costs: [], 
        commercialModel: {}, 
        risks: []
      }
];

// Helper function to calculate summary data from detailed project properties
const recalculateProjectSummaries = (projectInput) => {
  // Deep clone input to avoid side effects and ensure we're working with a mutable copy.
  const project = JSON.parse(JSON.stringify(projectInput || {}));

  // Ensure commercialModel is a well-structured object.
  const inputCommercialModel = (typeof project.commercialModel === 'object' && project.commercialModel !== null) 
                             ? project.commercialModel 
                             : {};

  project.commercialModel = {
    ...defaultCommercialModelStructure, // Start with the complete default structure
    ...inputCommercialModel, // Overlay with properties from the input's commercialModel

    // Ensure critical nested structures are correctly typed and complete
    accounts: (Array.isArray(inputCommercialModel.accounts) 
      ? inputCommercialModel.accounts.map(acc => ({
          ...defaultCommercialModelStructure.accounts[0], // provides default structure for an account
          ...acc,
          years: {
            year1: { ...defaultCommercialModelStructure.accounts[0].years.year1, ...acc.years?.year1 },
            year2: { ...defaultCommercialModelStructure.accounts[0].years.year2, ...acc.years?.year2 },
            year3: { ...defaultCommercialModelStructure.accounts[0].years.year3, ...acc.years?.year3 },
          }
        }))
      : JSON.parse(JSON.stringify(defaultCommercialModelStructure.accounts))),
    totalDoors: { 
      ...defaultCommercialModelStructure.totalDoors, 
      ...(typeof inputCommercialModel.totalDoors === 'object' && inputCommercialModel.totalDoors !== null ? inputCommercialModel.totalDoors : {}) 
    },
    avgUnitsPerDoor: { 
      ...defaultCommercialModelStructure.avgUnitsPerDoor, 
      ...(typeof inputCommercialModel.avgUnitsPerDoor === 'object' && inputCommercialModel.avgUnitsPerDoor !== null ? inputCommercialModel.avgUnitsPerDoor : {}) 
    },
    totalInvestment: { 
      ...defaultCommercialModelStructure.totalInvestment, 
      ...(typeof inputCommercialModel.totalInvestment === 'object' && inputCommercialModel.totalInvestment !== null ? inputCommercialModel.totalInvestment : {}) 
    },
    quarterlyDistribution: { 
      ...defaultCommercialModelStructure.quarterlyDistribution, 
      ...(typeof inputCommercialModel.quarterlyDistribution === 'object' && inputCommercialModel.quarterlyDistribution !== null ? inputCommercialModel.quarterlyDistribution : {}) 
    },
    projections: {
      ...defaultCommercialModelStructure.projections,
      ...(typeof inputCommercialModel.projections === 'object' && inputCommercialModel.projections !== null ? inputCommercialModel.projections : {}),
      years: (Array.isArray(inputCommercialModel.projections?.years) && inputCommercialModel.projections.years.length === 3)
             ? inputCommercialModel.projections.years.map((yearData, index) => ({
                ...defaultCommercialModelStructure.projections.years[index],
                ...(typeof yearData === 'object' && yearData !== null ? yearData : {}),
                quarters: (Array.isArray(yearData?.quarters) && yearData.quarters.length === 4)
                          ? yearData.quarters.map((qData, qIndex) => ({
                              ...defaultCommercialModelStructure.projections.years[index].quarters[qIndex],
                              ...(typeof qData === 'object' && qData !== null ? qData : {})
                            }))
                          : JSON.parse(JSON.stringify(defaultCommercialModelStructure.projections.years[index].quarters))
              }))
            : JSON.parse(JSON.stringify(defaultCommercialModelStructure.projections.years)),
      summary: {
        ...defaultCommercialModelStructure.projections.summary,
        ...(typeof inputCommercialModel.projections?.summary === 'object' && inputCommercialModel.projections.summary !== null ? inputCommercialModel.projections.summary : {})
      }
    }
  };

  // Now, newProject will be based on the 'project' which has a fully sanitized commercialModel.
  const newProject = { ...project };

    // Recalculate Total Cost from the 'costs' array, safely handling null entries
    newProject.totalCost = newProject.costs?.reduce((sum, cost) => sum + (cost?.amount || 0), 0) || 0;

    // Recalculate Year 1 Revenue
    // Prioritize Year 1 Revenue from the new projections
    if (newProject.commercialModel?.projections?.years?.[0]?.totalRevenue && newProject.commercialModel.projections.years[0].totalRevenue > 0) {
        newProject.year1Revenue = newProject.commercialModel.projections.years[0].totalRevenue;
    } else if (newProject.commercialModel?.accounts && newProject.commercialModel.accounts.length > 0) { // Fallback to accounts-based if projections not populated or zero
        newProject.year1Revenue = newProject.commercialModel.accounts.reduce((total, acc) => {
            const annualUnits = (acc.numberOfDoors || 0) * (acc.velocityPerDoorPerWeek || 0) * 52;
            const revenue = annualUnits * (acc.sellPricePerUnit || 0);
            return total + revenue;
        }, 0);
    } else { // Ultimate fallback
        newProject.year1Revenue = 0;
    }
    // Ensure year1Revenue is a number, default to 0 if NaN or undefined after calculations
    if (isNaN(newProject.year1Revenue) || typeof newProject.year1Revenue === 'undefined') {
        newProject.year1Revenue = 0;
    }

    // Recalculate Highest Risk Score and Identification safely
    if (newProject.risks && newProject.risks.length > 0) {
      // Filter out null/undefined risks and calculate scores
      const scores = newProject.risks
        .filter(r => r) // Ensure risk object exists before trying to access its properties
        .map(r => (r.occurrence || 1) * (r.detection || 1) * (r.severity || 1));

      if (scores.length > 0) {
        const maxScore = Math.max(...scores);
        newProject.highestRiskScore = maxScore;
        
        // Find the corresponding risk object safely
        const highestRisk = newProject.risks.find(r => r && ((r.occurrence || 1) * (r.detection || 1) * (r.severity || 1)) === maxScore);
        newProject.highestRiskIdentification = highestRisk ? highestRisk.description : 'N/A';
      } else {
        // This case handles if all risk items were null/undefined
        newProject.highestRiskScore = 0;
        newProject.highestRiskIdentification = 'N/A';
      }
    } else {
      newProject.highestRiskScore = 0;
      newProject.highestRiskIdentification = 'N/A';
    }

    return newProject;
};

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projectsData, setProjectsData] = useState([]);

    const loadProjectsFromStorageOrInitialize = useCallback(() => {
        let data;
        try {
            const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
            if (storedProjects && storedProjects !== '[]') {
                const parsedProjects = JSON.parse(storedProjects);
                data = parsedProjects.map(p => recalculateProjectSummaries(p));
            } else {
                console.log("No projects in localStorage, initializing with mock data.");
                data = initialMockProjects.map(p => recalculateProjectSummaries(p)); // recalculateProjectSummaries now handles full sanitization
            }
            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Failed to load or initialize projects:", error);
            // Fallback to recalculated mock data with full defaults to ensure stability
            data = initialMockProjects.map(p => recalculateProjectSummaries({
                ...p,
                id: p.id || Date.now() + Math.random(),
                stage: p.stage || DEFAULT_PROJECT_STAGE,
                approvals: p.approvals || [],
                phases: p.phases || [],
                costs: p.costs || [],
                commercialModel: p.commercialModel && Object.keys(p.commercialModel).length > 2 ? p.commercialModel : JSON.parse(JSON.stringify(defaultCommercialModelStructure)),
                risks: p.risks || []
            }));
            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
        }
        setProjectsData(data);
    }, []);

    useEffect(() => {
        loadProjectsFromStorageOrInitialize();
    }, [loadProjectsFromStorageOrInitialize]);

    const generateNewProjectId = () => {
        return projectsData.length > 0 ? Math.max(...projectsData.map(p => p.id)) + 1 : 1;
    };

    const addProject = (newProjectData) => {
        const projectWithDefaults = {
            id: generateNewProjectId(),
            name: "New Project",
            owner: "Unassigned",
            stage: DEFAULT_PROJECT_STAGE,
            approvals: [],
            launchDate: new Date().toISOString().split('T')[0],
            phases: [],
            costs: [],
            commercialModel: JSON.parse(JSON.stringify(defaultCommercialModelStructure)),
            risks: [],
            ...newProjectData,
        };
        // Recalculate summaries for the new project
        const newProject = recalculateProjectSummaries(projectWithDefaults);
        const updatedProjects = [...projectsData, newProject];
        setProjectsData(updatedProjects);
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
        return newProject;
    };

    const updateProject = (updatedProject) => {
        const projectWithRecalculatedSummaries = recalculateProjectSummaries(updatedProject);
        const updatedProjects = projectsData.map(p => 
            p.id === projectWithRecalculatedSummaries.id ? projectWithRecalculatedSummaries : p
        );
        setProjectsData(updatedProjects);
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
    };

    const deleteProject = (projectId) => {
        const updatedProjects = projectsData.filter(p => p.id !== projectId);
        setProjectsData(updatedProjects);
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
    };

    const getProjectById = (projectId) => {
        const idToFind = parseInt(projectId, 10);
        return projectsData.find(project => project.id === idToFind);
    };

    return (
        <ProjectContext.Provider value={{ projectsData, addProject, updateProject, getProjectById, deleteProject, STAGES }}>
            {children}
        </ProjectContext.Provider>
    );
};
