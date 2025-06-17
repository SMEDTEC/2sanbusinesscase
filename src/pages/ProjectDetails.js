import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, Box, Typography, Tabs, Tab, Button,
  Paper, Card, CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Project Tab Components
import ProjectOverview from '../components/ProjectOverview';
import CostPayment from '../components/CostPayment';
import Timeline from '../components/Timeline';
import CommercialModel from '../components/CommercialModel';
import RiskAssumptions from '../components/RiskAssumptions';

// ProjectContext for data
import { ProjectContext } from '../context/ProjectContext';

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProjectDetails = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [project, setProject] = useState(null);
  const { getProjectById } = useContext(ProjectContext); // Use context

  useEffect(() => {
    // Find the project with the matching ID using context
    const foundProject = getProjectById(id);
    setProject(foundProject);
  }, [id, getProjectById]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!project) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading project details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1">
          {project.name}
        </Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="project tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Project Overview" />
            <Tab label="Cost & Payment" />
            <Tab label="Timeline" />
            <Tab label="Commercial Model" />
            <Tab label="Risk & Assumptions" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <ProjectOverview project={project} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CostPayment project={project} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Timeline project={project} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <CommercialModel project={project} />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <RiskAssumptions project={project} />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default ProjectDetails;
