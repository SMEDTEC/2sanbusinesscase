# 2SAN Business Case Template Web Application

A comprehensive web application for managing business case templates for projects. This application provides a dashboard that summarizes project statuses and individual project cards with tabs for Project Overview, Cost & Payment, Timeline with Gantt Charts, Commercial Model, and Risk & Assumptions.

## Features

- **Dashboard:** Summarizes key project metrics and statuses
- **Project Cards:** Individual project details with tabbed navigation
- **Project Overview:** Displays project details, objectives, and product information
- **Cost & Payment:** Shows cost breakdown, payment schedules, and financial analysis
- **Timeline:** Displays project phases with Gantt chart visualization
- **Commercial Model:** Provides revenue projections and market analysis
- **Risk & Assumptions:** Tracks project risks, mitigation strategies, and key assumptions

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository or navigate to the project directory
2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser

## Project Structure

```
2san-business-case-app/
├── public/                  # Public assets
├── src/                     # Source files
│   ├── assets/              # Images and other assets
│   ├── components/          # Reusable components
│   │   ├── Header.js        # Application header
│   │   ├── ProjectOverview.js # Project overview tab
│   │   ├── CostPayment.js   # Cost & payment tab
│   │   ├── Timeline.js      # Timeline tab with Gantt chart
│   │   ├── CommercialModel.js # Commercial model tab
│   │   └── RiskAssumptions.js # Risk & assumptions tab
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   │   ├── Dashboard.js     # Main dashboard page
│   │   └── ProjectDetails.js # Project details page
│   ├── utils/               # Utility functions
│   │   └── mockData.js      # Mock data for development
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
└── package.json             # Project dependencies and scripts
```

## Technologies Used

- React.js
- Material-UI
- Chart.js
- React Router

## Future Enhancements

- User authentication and role-based access control
- Real-time data updates and notifications
- Export functionality for reports
- Integration with project management tools
- Mobile responsive design improvements
