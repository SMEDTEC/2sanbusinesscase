import React, { useState, useContext, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, Button, 
  TextField, Select, MenuItem, FormControl, InputLabel, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ProjectContext } from '../context/ProjectContext';

const ProjectOverview = ({ project }) => {
  const { updateProject, STAGES } = useContext(ProjectContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({ ...project });

  // Effect to sync state if the project prop changes (e.g., navigating between projects)
  useEffect(() => {
    setEditedProject({ ...project });
  }, [project]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProject(editedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProject({ ...project }); // Revert changes
    setIsEditing(false);
  };

  const getStageChipColor = (stage) => {
    switch (stage) {
      case 'Idea': return 'primary';
      case 'Proof of Concept': return 'secondary';
      case 'Approved': return 'success';
      case 'Execution': return 'info';
      case 'Complete': return 'success';
      case 'On Hold': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const renderField = (label, name, value, multiline = false, isSelect = false) => {
    if (isEditing) {
      if (isSelect) {
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              name={name}
              value={editedProject[name] || ''}
              onChange={handleInputChange}
            >
              {STAGES.map(stage => (
                <MenuItem key={stage} value={stage}>{stage}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      return (
        <TextField
          fullWidth
          multiline={multiline}
          rows={multiline ? 3 : 1}
          label={label}
          name={name}
          value={editedProject[name] || ''}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
      );
    } else {
      if (name === 'stage') {
        return <Chip label={value || 'N/A'} color={getStageChipColor(value)} />;
      }
      return <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{value || 'N/A'}</Typography>;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          PROJECT OVERVIEW
        </Typography>
        <Box>
          {isEditing ? (
            <>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<SaveIcon />} 
                onClick={handleSave} 
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<CancelIcon />} 
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              startIcon={<EditIcon />} 
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container spacing={isEditing ? 1 : 3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Project Name</Typography>
            {renderField('Project Name', 'name', project.name)}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Owner</Typography>
            {renderField('Owner', 'owner', project.owner)}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Manufacturer</Typography>
            {renderField('Manufacturer', 'manufacturer', project.manufacturer)}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Region</Typography>
            {renderField('Region', 'region', project.region)}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Product Type</Typography>
            {renderField('Product Type', 'productType', project.productType)}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Stage</Typography>
            {renderField('Stage', 'stage', project.stage, false, true)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Description</Typography>
            {renderField('Description', 'description', project.description, true)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Objective</Typography>
            {renderField('Objective', 'objective', project.objective, true)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Target Market</Typography>
            {renderField('Target Market', 'targetMarket', project.targetMarket, true)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Key Features</Typography>
            {renderField('Key Features', 'keyFeatures', project.keyFeatures, true)}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProjectOverview;
