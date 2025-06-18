import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, 
  Card, CardContent, CardActions, Button,
  Chip, List, ListItem, ListItemText, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'; // Added ArcElement for Pie chart
import { ProjectContext } from '../context/ProjectContext'; // Import ProjectContext

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend); // Added ArcElement

const Dashboard = () => {
  const theme = useTheme(); // Instantiate theme object
  const { projectsData, STAGES, deleteProject } = useContext(ProjectContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const openDeleteDialog = (id) => {
    setProjectToDelete(id);
    setDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setProjectToDelete(null);
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
    }
    closeDeleteDialog();
  };

  // Calculate Key Metrics
  const totalProjects = projectsData.length;
  const projectsByStage = STAGES.reduce((acc, stage) => {
    acc[stage] = projectsData.filter(p => p.stage === stage).length;
    return acc;
  }, {});

  const activeStagesForInvestment = ['Idea', 'Proof of Concept', 'Approved', 'Execution']; // Define stages considered for active investment
  const overallTotalInvestment = projectsData
    .filter(p => activeStagesForInvestment.includes(p.stage))
    .reduce((sum, p) => sum + (p.commercialModel?.projections?.summary?.totalInvestment || 0), 0);
  const overallYear1Revenue = projectsData.reduce((sum, p) => sum + (p.commercialModel?.projections?.years?.[0]?.totalRevenue || 0), 0); // Still showing overall Y1 Revenue for now, can change later

  // Data for Investment by Stage Pie Chart
  const investmentByStage = STAGES.map(stage => {
    const totalForStage = projectsData
      .filter(p => p.stage === stage)
      .reduce((sum, p) => sum + (p.commercialModel?.projections?.summary?.totalInvestment || 0), 0);
    return { stage, totalInvestment: totalForStage };
  }).filter(s => s.totalInvestment > 0); // Only include stages with investment

  const investmentByStageData = {
    labels: investmentByStage.map(s => s.stage),
    datasets: [{
      label: 'Total Investment by Stage',
      data: investmentByStage.map(s => s.totalInvestment),
      backgroundColor: [
        // Using a mix of theme colors and other distinct colors for stages
        theme.palette.primary.main,       // buttonBlue
        theme.palette.secondary.main,     // accentLightBlue
        theme.palette.success.main,       // MUI green
        theme.palette.warning.main,       // MUI orange
        theme.palette.error.main,         // MUI red
        '#FFC107', // Amber
        '#00BCD4', // Cyan
        '#9C27B0', // Purple
      ].slice(0, investmentByStage.length), // Use only as many colors as needed
      borderColor: theme.palette.background.paper,
      borderWidth: 1,
    }],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false, // Title will be on the Paper component
        text: 'Total Investment by Stage'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  // Chart data preparation
  const projectFinancialsData = {
    labels: projectsData.map(p => p.name.length > 20 ? p.name.substring(0,17) + '...' : p.name), // Truncate long names
    datasets: [
      {
        label: '3-Year Investment',
        data: projectsData.map(p => p.commercialModel?.projections?.summary?.totalInvestment || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '3-Year Net Profit',
        data: projectsData.map(p => p.commercialModel?.projections?.summary?.totalNetProfit || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
      <Box className="dashboard-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" className="dashboard-title">
          2SAN BUSINESS CASE ASSESSMENT DASHBOARD
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add-project"
          startIcon={<AddIcon />}
        >
          Create New Project
        </Button>
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
              <Typography variant="h6">Overall 3-Yr Investment (Active)</Typography>
              <Typography variant="h4">{overallTotalInvestment.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Typography>
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

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4, mt: 4 }}>
        <Grid item xs={12} md={7}> {/* Main Bar Chart */}
          <Paper elevation={2} sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>Project Financials Overview (3-Year)</Typography>
            <Box sx={{ height: 'calc(100% - 48px)'}}>
              <Bar data={projectFinancialsData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}> {/* Pie Chart for Investment by Stage */}
          <Paper elevation={2} sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>Total Investment by Stage</Typography>
            <Box sx={{ height: 'calc(100% - 48px)'}}>
              {investmentByStage.length > 0 ? (
                <Pie data={investmentByStageData} options={pieChartOptions} />
              ) : (
                <Typography variant="body2" sx={{textAlign: 'center', mt: 4}}>No investment data to display by stage.</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Project Stage Distribution List - can be kept or removed if pie chart is sufficient */}
      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Project Stage Distribution (Count)</Typography>
        <List dense sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', p:0 }}>
          {STAGES.map(stage => (
            projectsByStage[stage] > 0 && (
              <ListItem key={stage} disablePadding sx={{ width: 'auto', minWidth: '150px', m:0.5, border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '4px', p:1}}>
                <ListItemText primary={stage} sx={{mr:1}}/>
                <Chip label={projectsByStage[stage]} size="small" color={getStageChipColor(stage)} variant="outlined"/>
              </ListItem>
            )
          ))}
          {Object.values(projectsByStage).every(count => count === 0) && (
             <ListItem sx={{width: '100%'}}><ListItemText primary="No projects in any stage." primaryTypographyProps={{fontStyle: 'italic'}}/></ListItem>
          )}
        </List>
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
                    Launch: {project.launchDate ? new Date(project.launchDate).toLocaleDateString(undefined, { timeZone: 'UTC' }) : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Cost: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits:0, maximumFractionDigits:0 }).format(project.totalCost || 0)}
                  </Typography>
                  <Typography variant="body2">3-Yr Investment: {project.commercialModel?.projections?.summary?.totalInvestment?.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) || 'N/A'}</Typography>
                  <Typography variant="body2">3-Yr Net Profit: {project.commercialModel?.projections?.summary?.totalNetProfit?.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) || 'N/A'}</Typography>
                  <Typography variant="body2">3-Yr Revenue CAGR: {project.commercialModel?.projections?.summary?.revenueCAGR ? (project.commercialModel.projections.summary.revenueCAGR * 100).toFixed(1) + '%' : 'N/A'}</Typography>
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
                  <IconButton onClick={() => openDeleteDialog(project.id)} color="error" size="small">
                      <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Charts Section */}
      {projectsData.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" component="h3" gutterBottom sx={{textAlign: 'center'}}>
                Project Financials (Cost & Y1 Revenue)
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)'}} > {/* Adjust height to accommodate title */}
                <Bar data={projectFinancialsData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      <Dialog open={dialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
