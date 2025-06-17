// 2SAN Business Case Template JavaScript

// Mock data
const projects = [
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
  }
];

// Initialize financial chart
document.addEventListener('DOMContentLoaded', function() {
  // Create financial chart
  const ctx = document.getElementById('financialChart').getContext('2d');
  const financialChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Project 1', 'Project 2', 'Project 3'],
      datasets: [
        {
          label: 'Total Cost',
          data: [2000000, 1500000, 3500000],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Year 1 Revenue',
          data: [3500000, 2800000, 5200000],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.raw.toLocaleString();
            }
          }
        }
      }
    }
  });
});

// Modal functionality
let currentProject = null;

function openProjectDetails(projectId) {
  const modal = document.getElementById('project-details-modal');
  const project = projects.find(p => p.id === projectId) || projects[0];
  currentProject = project;
  
  // Set project title
  document.getElementById('project-title').textContent = project.name;
  
  // Populate project overview tab
  document.getElementById('project-name').textContent = project.name;
  document.getElementById('project-owner').textContent = project.owner;
  document.getElementById('project-manufacturer').textContent = project.manufacturer;
  document.getElementById('project-region').textContent = project.region;
  document.getElementById('project-type').textContent = project.productType;
  document.getElementById('project-description').textContent = project.description;
  document.getElementById('project-objective').textContent = project.objective;
  
  // Populate cost tab
  const costTableBody = document.getElementById('cost-table-body');
  costTableBody.innerHTML = '';
  
  project.costs.forEach(cost => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cost.category}</td>
      <td>${cost.description}</td>
      <td>$${cost.amount.toLocaleString()}</td>
      <td>${cost.year}</td>
      <td>${cost.phase}</td>
      <td><span class="status ${cost.status.toLowerCase().replace(' ', '-')}">${cost.status}</span></td>
    `;
    costTableBody.appendChild(row);
  });
  
  document.getElementById('total-cost').textContent = `$${project.totalCost.toLocaleString()}`;
  
  // Populate timeline tab
  const timelineTableBody = document.getElementById('timeline-table-body');
  timelineTableBody.innerHTML = '';
  
  project.phases.forEach(phase => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${phase.name}</td>
      <td>${phase.description}</td>
      <td>${phase.startDate}</td>
      <td>${phase.endDate}</td>
      <td>${phase.duration}</td>
      <td><span class="status ${phase.status.toLowerCase().replace(' ', '-')}">${phase.status}</span></td>
    `;
    timelineTableBody.appendChild(row);
  });
  
  // Populate commercial model tab
  document.getElementById('year1-revenue').textContent = `$${project.commercialModel.year1.revenue.toLocaleString()}`;
  document.getElementById('year1-cogs').textContent = `$${project.commercialModel.year1.cogs.toLocaleString()}`;
  document.getElementById('year1-margin').textContent = `$${project.commercialModel.year1.grossMargin.toLocaleString()}`;
  document.getElementById('year1-marketing').textContent = `$${project.commercialModel.year1.marketing.toLocaleString()}`;
  document.getElementById('year1-operations').textContent = `$${project.commercialModel.year1.operations.toLocaleString()}`;
  document.getElementById('year1-rd').textContent = `$${project.commercialModel.year1.rd.toLocaleString()}`;
  document.getElementById('year1-profit').textContent = `$${project.commercialModel.year1.netProfit.toLocaleString()}`;
  
  document.getElementById('year2-revenue').textContent = `$${project.commercialModel.year2.revenue.toLocaleString()}`;
  document.getElementById('year2-cogs').textContent = `$${project.commercialModel.year2.cogs.toLocaleString()}`;
  document.getElementById('year2-margin').textContent = `$${project.commercialModel.year2.grossMargin.toLocaleString()}`;
  document.getElementById('year2-marketing').textContent = `$${project.commercialModel.year2.marketing.toLocaleString()}`;
  document.getElementById('year2-operations').textContent = `$${project.commercialModel.year2.operations.toLocaleString()}`;
  document.getElementById('year2-rd').textContent = `$${project.commercialModel.year2.rd.toLocaleString()}`;
  document.getElementById('year2-profit').textContent = `$${project.commercialModel.year2.netProfit.toLocaleString()}`;
  
  document.getElementById('year3-revenue').textContent = `$${project.commercialModel.year3.revenue.toLocaleString()}`;
  document.getElementById('year3-cogs').textContent = `$${project.commercialModel.year3.cogs.toLocaleString()}`;
  document.getElementById('year3-margin').textContent = `$${project.commercialModel.year3.grossMargin.toLocaleString()}`;
  document.getElementById('year3-marketing').textContent = `$${project.commercialModel.year3.marketing.toLocaleString()}`;
  document.getElementById('year3-operations').textContent = `$${project.commercialModel.year3.operations.toLocaleString()}`;
  document.getElementById('year3-rd').textContent = `$${project.commercialModel.year3.rd.toLocaleString()}`;
  document.getElementById('year3-profit').textContent = `$${project.commercialModel.year3.netProfit.toLocaleString()}`;
  
  // Populate risk tab
  const riskTableBody = document.getElementById('risk-table-body');
  riskTableBody.innerHTML = '';
  
  project.risks.forEach(risk => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${risk.id}</td>
      <td>${risk.category}</td>
      <td>${risk.description}</td>
      <td>${risk.probability}</td>
      <td>${risk.impact}</td>
      <td>${risk.score}</td>
      <td>${risk.mitigation}</td>
      <td>${risk.owner}</td>
      <td><span class="status ${risk.status.toLowerCase()}">${risk.status}</span></td>
    `;
    riskTableBody.appendChild(row);
  });
  
  // Show modal
  modal.style.display = 'block';
  
  // Set active tab
  openTab('overview');
}

function closeProjectDetails() {
  const modal = document.getElementById('project-details-modal');
  modal.style.display = 'none';
}

function openTab(tabName) {
  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Deactivate all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Show the selected tab content
  document.getElementById(tabName).classList.add('active');
  
  // Activate the selected tab button
  document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('project-details-modal');
  if (event.target === modal) {
    closeProjectDetails();
  }
}
