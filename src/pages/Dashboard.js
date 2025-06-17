import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, 
  Card, CardContent, CardActions, Button,
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock data for projects
import { projects } from '../utils/mockData';

const Dashboard = () => {
  // Chart data for cost distribution
  const costDistributionData = {
    labels: ['Regulatory', 'Clinical Start-Up', 'Clinical Execution', 'Data Management', 'Regulatory Submission'],
    datasets: [
      {
        label: 'Cost Distribution by Category',
        data: [310000, 200000, 700000, 240000, 400000],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for revenue projection
  const revenueProjectionData = {
    labels: ['Year 1', 'Year 2', 'Year 3'],
    datasets: [
      {
        label: 'Revenue',
        data: [3500000, 7500000, 12000000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Net Profit',
        data: [1000000, 3500000, 6000000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
      },
    },
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box className="dashboard-header">
        <Typography variant="h4" component="h1" gutterBottom className="dashboard-title">
          2SAN BUSINESS CASE ASSESSMENT DASHBOARD
        </Typography>
      </Box>

      {/* Key Metrics Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          KEY METRICS
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Total Cost</TableCell>
                <TableCell>Year 1 Revenue</TableCell>
                <TableCell>Launch Date</TableCell>
                <TableCell>Highest Risk Score</TableCell>
                <TableCell>Highest Risk Identification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>$2,000,000</TableCell>
                <TableCell>$3,500,000</TableCell>
                <TableCell>Oct 15, 2025</TableCell>
                <TableCell>0.7</TableCell>
                <TableCell>
                  <Chip label="Delay" color="error" size="small" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Projects Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          PROJECT PHASES
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Phase</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects[0].phases.map((phase) => (
                <TableRow key={phase.id}>
                  <TableCell>{phase.name}</TableCell>
                  <TableCell>{phase.description}</TableCell>
                  <TableCell>{phase.startDate}</TableCell>
                  <TableCell>{phase.endDate}</TableCell>
                  <TableCell>{phase.duration}</TableCell>
                  <TableCell>
                    <Chip 
                      label={phase.status} 
                      color={phase.status === 'Not Started' ? 'primary' : phase.status === 'In Progress' ? 'warning' : 'success'} 
                      size="small" 
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right"><strong>TOTAL</strong></TableCell>
                <TableCell><strong>474</strong></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Financial Analysis Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          FINANCIAL ANALYSIS
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Cost Distribution by Category
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={costDistributionData} options={chartOptions} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Revenue & Profit Projection
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={revenueProjectionData} options={chartOptions} />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Projects List */}
      <Typography variant="h6" component="h2" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Owner: {project.owner}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: 
                  <Chip 
                    label={project.status} 
                    color={project.status === 'Not Started' ? 'primary' : project.status === 'In Progress' ? 'warning' : 'success'} 
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Launch Date: {project.launchDate}
                </Typography>
              </CardContent>
              <CardActions>
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
    </Container>
  );
};

export default Dashboard;
