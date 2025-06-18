import React, { createContext, useState, useEffect, useCallback } from 'react';

const PROJECTS_STORAGE_KEY = '2sanBusinessCaseProjects_react';
const STAGES = ['Idea', 'Proof of Concept', 'Approved', 'Execution', 'Complete', 'On Hold', 'Cancelled'];
const DEFAULT_PROJECT_STAGE = STAGES[0];

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
        commercialModel: { year1: { revenue: 3500787, cogs: 1400315, grossMargin: 2100472, marketing: 700157, operations: 350079, rd: 175039, netProfit: 450000 }, year2: {}, year3: {} },
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
        phases: [], costs: [], commercialModel: { year1: { revenue: 2800000, cogs: 1200000, grossMargin: 1600000, marketing: 500000, operations: 300000, rd: 100000, netProfit: 500000 }, year2: {}, year3: {} }, risks: []
      }
];

// Helper function to calculate summary data from detailed project properties
const recalculateProjectSummaries = (project) => {
    const newProject = { ...project };

    // Recalculate Total Cost from the 'costs' array, safely handling null entries
    newProject.totalCost = newProject.costs?.reduce((sum, cost) => sum + (cost?.amount || 0), 0) || 0;

    // Recalculate Year 1 Revenue from the detailed accounts in the commercial model
    if (newProject.commercialModel?.accounts) {
        newProject.year1Revenue = newProject.commercialModel.accounts.reduce((total, acc) => {
            const annualUnits = (acc.numberOfDoors || 0) * (acc.velocityPerDoorPerWeek || 0) * 52;
            const revenue = annualUnits * (acc.sellPricePerUnit || 0);
            return total + revenue;
        }, 0);
    } else {
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
                data = initialMockProjects.map(p => recalculateProjectSummaries({
                    ...p,
                    id: p.id || Date.now() + Math.random(),
                    stage: p.stage || DEFAULT_PROJECT_STAGE,
                    approvals: p.approvals || [],
                    phases: p.phases || [],
                    costs: p.costs || [],
                    commercialModel: p.commercialModel || { year1: {}, year2: {}, year3: {} },
                    risks: p.risks || []
                }));
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
                commercialModel: p.commercialModel || { year1: {}, year2: {}, year3: {} },
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
            commercialModel: { year1: {}, year2: {}, year3: {} },
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
