import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Typography, Paper, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, TextField, IconButton, Checkbox, FormControlLabel, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectContext } from '../context/ProjectContext';

const Timeline = ({ project }) => {
  const { updateProject } = useContext(ProjectContext);
  const [editMode, setEditMode] = useState(false);
  const [editedTimeline, setEditedTimeline] = useState([]);

  useEffect(() => {
    if (project?.timeline) {
      setEditedTimeline(JSON.parse(JSON.stringify(project.timeline)));
    } else {
      setEditedTimeline([]);
    }
  }, [project, editMode]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleSave = () => {
    const updatedProject = { ...project, timeline: editedTimeline };
    updateProject(updatedProject);
    setEditMode(false);
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...editedTimeline];
    const timelineItem = { ...newTimeline[index] };
    timelineItem[field] = value;
    newTimeline[index] = timelineItem;
    setEditedTimeline(newTimeline);
  };

  const handleAddItem = () => {
    const newItem = {
      phase: '',
      description: '',
      startDate: '',
      endDate: '',
      duration: 0,
      owner: '',
      status: 'Not Started',
      isPhaseHeader: false,
    };
    setEditedTimeline([...editedTimeline, newItem]);
  };

  const handleRemoveItem = (index) => {
    const newTimeline = editedTimeline.filter((_, i) => i !== index);
    setEditedTimeline(newTimeline);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">PROJECT TIMELINE</Typography>
        <Box>
          {editMode ? (
            <>
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel} sx={{ mr: 1 }}>Cancel</Button>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>Edit</Button>
          )}
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Phase</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Start</TableCell>
              <TableCell sx={{ color: 'white' }}>End</TableCell>
              <TableCell sx={{ color: 'white' }}>Duration</TableCell>
              <TableCell sx={{ color: 'white' }}>Owner</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              {editMode && <TableCell sx={{ color: 'white' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {editedTimeline.map((item, index) => {
              const isPhaseHeader = item.isPhaseHeader || false;
              const style = isPhaseHeader && !editMode ? { backgroundColor: '#e3f2fd', '& > *': { fontWeight: 'bold' } } : {};
              return (
                <TableRow key={index} sx={style}>
                  <TableCell>{editMode ? <TextField size="small" value={item.phase} onChange={(e) => handleTimelineChange(index, 'phase', e.target.value)} /> : item.phase}</TableCell>
                  <TableCell>{editMode ? <TextField size="small" fullWidth value={item.description} onChange={(e) => handleTimelineChange(index, 'description', e.target.value)} /> : item.description}</TableCell>
                  <TableCell>{editMode ? <TextField size="small" type="date" InputLabelProps={{ shrink: true }} value={item.startDate} onChange={(e) => handleTimelineChange(index, 'startDate', e.target.value)} /> : item.startDate}</TableCell>
                  <TableCell>{editMode ? <TextField size="small" type="date" InputLabelProps={{ shrink: true }} value={item.endDate} onChange={(e) => handleTimelineChange(index, 'endDate', e.target.value)} /> : item.endDate}</TableCell>
                  <TableCell>{editMode ? <TextField size="small" type="number" value={item.duration} onChange={(e) => handleTimelineChange(index, 'duration', parseInt(e.target.value, 10) || 0)} /> : item.duration}</TableCell>
                  <TableCell>{editMode ? <TextField size="small" value={item.owner} onChange={(e) => handleTimelineChange(index, 'owner', e.target.value)} /> : item.owner}</TableCell>
                  <TableCell>{editMode ? <TextField size="small" value={item.status} onChange={(e) => handleTimelineChange(index, 'status', e.target.value)} /> : item.status}</TableCell>
                  {editMode && (
                    <TableCell>
                      <FormControlLabel control={<Checkbox checked={isPhaseHeader} onChange={(e) => handleTimelineChange(index, 'isPhaseHeader', e.target.checked)} />} label="Phase" />
                      <IconButton onClick={() => handleRemoveItem(index)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {editedTimeline.length === 0 && !editMode && (
              <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', fontStyle: 'italic' }}>No timeline events added.</TableCell></TableRow>
            )}
            {editMode && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddItem}>Add Timeline Item</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Gantt Chart Visualization
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ width: '100%', minWidth: '800px', mt: 2, mb: 2 }}>
            {/* Simple Gantt Chart Implementation */}
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Box sx={{ width: '200px', fontWeight: 'bold' }}>Phase</Box>
              <Box sx={{ flex: 1, display: 'flex' }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <Box key={i} sx={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}>
                    {`M${i + 1}`}
                  </Box>
                ))}
              </Box>
            </Box>
            
            {editedTimeline.map((item, index) => {
              const isPhaseHeader = item.isPhaseHeader || false;
              const style = isPhaseHeader 
                ? { backgroundColor: '#e3f2fd', '& > *': { fontWeight: 'bold' } } 
                : {};

              return (
                <Box key={index} sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                  <Box sx={{ width: '200px' }}>{item.phase}</Box>
                  <Box sx={{ flex: 1, display: 'flex', height: '30px', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: `${item.startDate}0px`, width: `${item.duration * 10}px`, height: '20px', backgroundColor: '#1976d2', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                      {item.duration} days
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Note: This is a simplified Gantt chart visualization. In a production environment, this would be enhanced with interactive features, dependencies, and critical path highlighting.
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Critical Path Analysis
            </Typography>
            <Typography variant="body1">
              The critical path for this project includes:
            </Typography>
            <ul>
              {editedTimeline.filter(item => item.isCriticalPath).map((item, index) => (
                <li key={index}>{item.phase}: {item.duration} days</li>
              ))}
            </ul>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Total critical path duration: {editedTimeline.filter(item => item.isCriticalPath).reduce((acc, item) => acc + item.duration, 0)} days
              Total critical path duration: 160 days
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Timeline Risks & Mitigations
            </Typography>
            <Typography variant="body1">
              Key timeline risks include:
            </Typography>
            <ul>
              <li><strong>FDA Pre-Sub Meeting Scheduling:</strong> Allow 60-day buffer for FDA scheduling</li>
              <li><strong>IRB Review Cycles:</strong> Submit early and prepare for potential revisions</li>
              <li><strong>Clinical Site Recruitment:</strong> Begin site identification during protocol development</li>
              <li><strong>Technical File Completeness:</strong> Early gap analysis and manufacturer engagement</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Timeline;
