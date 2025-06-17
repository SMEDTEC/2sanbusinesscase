import React, { useContext } from 'react'; // Removed useState as it's not directly used here now
import { Link } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, 
  Card, CardContent, CardActions, Button,
  Chip, List, ListItem, ListItemText // Removed Table related imports, added List for metrics
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ProjectContext } from '../context/ProjectContext'; // Import ProjectContext

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { projectsData, STAGES } = useContext(ProjectContext); // Use context

  // Calculate Key Metrics
  const totalProjects = projectsData.length;
  const projectsByStage = STAGES.reduce((acc, stage) => {
    acc[stage] = projectsData.filter(p => p.stage === stage).length;
    return acc;
  }, {});

  const overallTotalCost = projectsData.reduce((sum, p) => sum + (p.totalCost || 0), 0);
  const overallYear1Revenue = projectsData.reduce((sum, p) => sum + (p.year1Revenue || 0), 0);

  // Chart data preparation
  const projectFinancialsData = {
    labels: projectsData.map(p => p.name.length > 20 ? p.name.substring(0,17) + '...' : p.name), // Truncate long names
    datasets: [
      {
        label: 'Total Cost',
        data: projectsData.map(p => p.totalCost || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Year 1 Revenue',
        data: projectsData.map(p => p.year1Revenue || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const aggregatedFinancials = {
    year1: { revenue: 0, netProfit: 0 },
    year2: { revenue: 0, netProfit: 0 },
    year3: { revenue: 0, netProfit: 0 },
  };

  projectsData.forEach(p => {
    if (p.commercialModel) {
      if (p.commercialModel.year1) {
        aggregatedFinancials.year1.revenue += p.commercialModel.year1.revenue || 0;
        aggregatedFinancials.year1.netProfit += p.commercialModel.year1.netProfit || 0;
      }
      if (p.commercialModel.year2) { // Ensure year2 data exists in mock/localStorage for this to populate
        aggregatedFinancials.year2.revenue += p.commercialModel.year2.revenue || 0;
        aggregatedFinancials.year2.netProfit += p.commercialModel.year2.netProfit || 0;
      }
      if (p.commercialModel.year3) { // Ensure year3 data exists for this to populate
        aggregatedFinancials.year3.revenue += p.commercialModel.year3.revenue || 0;
        aggregatedFinancials.year3.netProfit += p.commercialModel.year3.netProfit || 0;
      }
    }
  });

  const revenueProjectionData = {
    labels: ['Year 1', 'Year 2', 'Year 3'],
    datasets: [
      {
        label: 'Total Aggregated Revenue',
        data: [aggregatedFinancials.year1.revenue, aggregatedFinancials.year2.revenue, aggregatedFinancials.year3.revenue],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Aggregated Net Profit',
        data: [aggregatedFinancials.year1.netProfit, aggregatedFinancials.year2.netProfit, aggregatedFinancials.year3.netProfit],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
            return value;
          }
        }
      },
      x: {
        ticks: {
          autoSkip: false, // Prevent skipping labels if too many projects
          maxRotation: 45,
          minRotation: 45,
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };
  
  const getStageChipColor = (stage) => {
    switch (stage) {
      case 'Idea': return 'primary';
      case 'Proof of Concept': return 'secondary';
      case 'Approved': return 'success';
      case 'Execution': return 'info';
      case 'Complete': return 'success'; // Consider a different color like 'default' or a custom green
      case 'On Hold': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box className="dashboard-header" sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom className="dashboard-title">
          2SAN BUSINESS CASE ASSESSMENT DASHBOARD
        </Typography>
      </Box>

      {/* Key Metrics Section */}
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          KEY METRICS
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', backgroundColor: '#e3f2fd', height: '100%' }}>
              <Typography variant="h6">Total Projects</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalProjects}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', backgroundColor: '#e8f5e9', height: '100%' }}>
              <Typography variant="h6">Total Cost</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallTotalCost)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff3e0', height: '100%' }}>
              <Typography variant="h6">Total Year 1 Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallYear1Revenue)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ textAlign: 'center', mb:1 }}>Projects by Stage</Typography>
              <List dense disablePadding sx={{ maxHeight: 150, overflow: 'auto' }}> {/* Added scroll for many stages */}
                {STAGES.map(stage => (
                  projectsByStage[stage] > 0 && (
                    <ListItem key={stage} disableGutters dense sx={{py: 0.2}}>
                      <ListItemText primary={`${stage}: ${projectsByStage[stage]}`} primaryTypographyProps={{variant: 'body2'}}/>
                    </ListItem>
                  )
                ))}
                {Object.values(projectsByStage).every(count => count === 0) && (
                    <ListItem disableGutters dense sx={{py: 0.2}}>
                        <ListItemText primary="No projects in any stage." primaryTypographyProps={{variant: 'body2', fontStyle: 'italic'}}/>
                    </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Projects Overview Section */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        PROJECTS OVERVIEW
      </Typography>
      {projectsData.length === 0 ? (
        <Typography sx={{textAlign: 'center', fontStyle: 'italic', mb: 3}}>No projects available. Consider adding a new project.</Typography>
      ) : (
        <Grid container spacing={3}>
          {projectsData.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card elevation={2} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3" sx={{fontWeight: 'medium'}}>
                    {project.name}
                  </Typography>
                  <Chip 
                    label={project.stage || 'N/A'} 
                    color={getStageChipColor(project.stage)} 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Owner: {project.owner || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Launch: {project.launchDate ? new Date(project.launchDate + 'T00:00:00').toLocaleDateString() : 'N/A'} {/* Ensure date is parsed correctly */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Cost: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits:0, maximumFractionDigits:0 }).format(project.totalCost || 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Y1 Revenue: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits:0, maximumFractionDigits:0 }).format(project.year1Revenue || 0)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pt:0 }}>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/project/${project.id}`} 
                    startIcon={<VisibilityIcon />}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Charts Section */}
      {projectsData.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" component="h3" gutterBottom sx={{textAlign: 'center'}}>
                Project Financials (Cost & Y1 Revenue)
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)'}} > {/* Adjust height to accommodate title */}
                <Bar data={projectFinancialsData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" component="h3" gutterBottom sx={{textAlign: 'center'}}>
                Aggregated Revenue & Profit Projection
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)'}} > {/* Adjust height to accommodate title */}
                <Bar data={revenueProjectionData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
