import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Box, Typography, Button, Grid, 
  Paper, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { ProjectContext } from '../context/ProjectContext';

const AddProject = () => {
  const { addProject, STAGES } = useContext(ProjectContext);
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({
    name: '',
    owner: '',
    stage: STAGES[0], // Default to the first stage
    description: '',
    objective: '',
    launchDate: new Date().toISOString().split('T')[0], // Default to today
    // Initialize other fields as needed
    manufacturer: '',
    region: '',
    productType: '',
    targetMarket: '',
    keyFeatures: '',
    commercialModel: {
        year1: { revenue: 0, netProfit: 0 },
        year2: { revenue: 0, netProfit: 0 },
        year3: { revenue: 0, netProfit: 0 },
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProject(newProject);
    navigate('/'); // Redirect to dashboard after adding
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Create New Project
        </Typography>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
        >
          Back to Dashboard
        </Button>
      </Box>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Project Name" name="name" value={newProject.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Project Owner" name="owner" value={newProject.owner} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Stage</InputLabel>
                <Select name="stage" value={newProject.stage} label="Stage" onChange={handleInputChange}>
                  {STAGES.map(stage => (
                    <MenuItem key={stage} value={stage}>{stage}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Launch Date" name="launchDate" type="date" value={newProject.launchDate} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} label="Description" name="description" value={newProject.description} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} label="Objective" name="objective" value={newProject.objective} onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={Link} to="/" sx={{ mr: 2 }}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                Save Project
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProject;
