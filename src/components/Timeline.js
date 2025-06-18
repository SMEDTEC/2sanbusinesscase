import React, { useState, useContext, useEffect, useRef } from 'react';
import { Chart } from 'react-google-charts';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Button, IconButton, Checkbox, FormControlLabel, ButtonGroup, Tooltip
} from '@mui/material';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon
} from '@mui/icons-material';
import { ProjectContext } from '../context/ProjectContext';
import Papa from 'papaparse';

const Timeline = ({ project }) => {
  const { updateProject } = useContext(ProjectContext);
  const [editMode, setEditMode] = useState(false);
  const [editedTimeline, setEditedTimeline] = useState([]);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'gantt'
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timelineData = project.timeline || [];
    setEditedTimeline(JSON.parse(JSON.stringify(timelineData)));
    setIsDirty(false); // Reset dirty flag when project data changes
  }, [project.id]);



  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...editedTimeline];
    const updatedItem = { ...newTimeline[index], [field]: value };

    // Recalculate duration if start or end date changes
    if (field === 'startDate' || field === 'endDate') {
      const start = new Date(field === 'startDate' ? value : updatedItem.startDate);
      const end = new Date(field === 'endDate' ? value : updatedItem.endDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updatedItem.duration = diffDays + 1; // Inclusive duration
      } else {
        updatedItem.duration = 0;
      }
    }

    newTimeline[index] = updatedItem;
    setEditedTimeline(newTimeline);
    setIsDirty(true);
  };

  const handleAddItem = () => {
    const newItem = {
      phase: `New Phase ${editedTimeline.length + 1}`,
      description: 'New Task',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      duration: 1,
      owner: '',
      status: 'Not Started',
      isPhaseHeader: false,
      isCriticalPath: false,
    };
    setEditedTimeline([...editedTimeline, newItem]);
    setIsDirty(true);
  };

  const handleRemoveItem = (index) => {
    const newTimeline = editedTimeline.filter((_, i) => i !== index);
    setEditedTimeline(newTimeline);
    setIsDirty(true);
  };

  const handleSave = () => {
    const updatedProject = { ...project, timeline: editedTimeline };
    updateProject(updatedProject);
    setEditMode(false);
    setIsDirty(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
        complete: (results) => {
          if (results.errors.length) {
            console.error('Errors parsing CSV:', results.errors);
            return;
          }

          const safeDateToString = (dateStr) => {
            if (!dateStr) return new Date().toISOString().split('T')[0];
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
              return new Date().toISOString().split('T')[0];
            }
            return date.toISOString().split('T')[0];
          };

          const parsedData = results.data.map(row => {
            const startDateStr = row.startdate || row.start;
            const endDateStr = row.enddate || row.end;
            
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            let duration = 0;
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate >= startDate) {
              const diffTime = endDate.getTime() - startDate.getTime();
              duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            } else {
              duration = parseInt(row.durationdays || row.duration, 10) || 0;
            }

            return {
              phase: row.phase || '',
              description: row.description || 'No description',
              startDate: safeDateToString(startDateStr),
              endDate: safeDateToString(endDateStr),
              duration: duration,
              owner: row.owner || '',
              status: row.status || 'Not Started',
              isPhaseHeader: String(row.isphaseheader).toLowerCase() === 'true',
              isCriticalPath: String(row.iscriticalpath).toLowerCase() === 'true',
            };
          }).filter(item => item.phase || item.description !== 'No description');
          setEditedTimeline(parsedData);
          setIsDirty(true);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error.message);
        }
      });
    }
  };

  const handleDownload = () => {
    const csv = Papa.unparse(editedTimeline);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'timeline.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGanttData = () => {
    if (!editedTimeline || editedTimeline.length === 0) {
      return [
        [
          { type: 'string', label: 'Task ID' },
          { type: 'string', label: 'Task Name' },
          { type: 'string', label: 'Resource' },
          { type: 'date', label: 'Start Date' },
          { type: 'date', label: 'End Date' },
          { type: 'number', label: 'Duration' },
          { type: 'number', label: 'Percent Complete' },
          { type: 'string', label: 'Dependencies' },
        ],
        ['', 'No timeline data available', '', null, null, 0, 0, null],
      ];
    }

    const columns = [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'string', label: 'Resource' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ];

    const rows = editedTimeline
      .map(item => {
        // Ensure dates are valid before creating Date objects to prevent chart errors
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return null; // Skip items that would break the chart
        }
        return [
          item.phase,
          item.description,
          item.owner,
          startDate,
          endDate,
          null, // Duration is calculated by Google Charts
          item.status === 'Completed' ? 100 : (item.status === 'In Progress' ? 50 : 0),
          null, // Dependencies can be implemented later
        ];
      })
      .filter(Boolean); // Filter out any null entries

    return [columns, ...rows];
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Project Timeline</Typography>
        <Box>
          <ButtonGroup variant="outlined" sx={{ mr: 2 }}>
            <Button onClick={() => setViewMode('timeline')} variant={viewMode === 'timeline' ? 'contained' : 'outlined'}>Timeline</Button>
            <Button onClick={() => setViewMode('gantt')} variant={viewMode === 'gantt' ? 'contained' : 'outlined'}>Gantt</Button>
          </ButtonGroup>
          {editMode ? (
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
          ) : (
            <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>Edit</Button>
          )}
        </Box>
      </Box>

      {viewMode === 'timeline' ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <input
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <Tooltip title="Import from CSV">
              <Button startIcon={<CloudUploadIcon />} onClick={() => fileInputRef.current.click()}>Import</Button>
            </Tooltip>
            <Tooltip title="Export to CSV">
              <Button startIcon={<CloudDownloadIcon />} onClick={handleDownload}>Export</Button>
            </Tooltip>
          </Box>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                  <TableCell>Phase</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Duration (days)</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Options</TableCell>
                  {editMode && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {editedTimeline.map((item, index) => {
                  const isPhaseHeader = item.isPhaseHeader || false;
                  const style = isPhaseHeader ? { backgroundColor: '#e3f2fd', fontWeight: 'bold' } : {};
                  return (
                    <TableRow key={index} sx={style}>
                      <TableCell>{editMode ? <TextField size="small" variant="standard" value={item.phase} onChange={(e) => handleTimelineChange(index, 'phase', e.target.value)} /> : item.phase}</TableCell>
                      <TableCell>{editMode ? <TextField size="small" variant="standard" fullWidth value={item.description} onChange={(e) => handleTimelineChange(index, 'description', e.target.value)} /> : item.description}</TableCell>
                      <TableCell>{editMode ? <TextField size="small" variant="standard" type="date" InputLabelProps={{ shrink: true }} value={item.startDate} onChange={(e) => handleTimelineChange(index, 'startDate', e.target.value)} /> : item.startDate}</TableCell>
                      <TableCell>{editMode ? <TextField size="small" variant="standard" type="date" InputLabelProps={{ shrink: true }} value={item.endDate} onChange={(e) => handleTimelineChange(index, 'endDate', e.target.value)} /> : item.endDate}</TableCell>
                      <TableCell>{editMode ? <TextField size="small" variant="standard" type="number" value={item.duration} onChange={(e) => handleTimelineChange(index, 'duration', parseInt(e.target.value, 10) || 0)} /> : item.duration}</TableCell>
                      <TableCell>{editMode ? <TextField size="small" variant="standard" value={item.owner} onChange={(e) => handleTimelineChange(index, 'owner', e.target.value)} /> : item.owner}</TableCell>
                      <TableCell>{editMode ? <TextField size="small" variant="standard" value={item.status} onChange={(e) => handleTimelineChange(index, 'status', e.target.value)} /> : item.status}</TableCell>
                      <TableCell>
                        {editMode && (
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <FormControlLabel control={<Checkbox checked={isPhaseHeader} onChange={(e) => handleTimelineChange(index, 'isPhaseHeader', e.target.checked)} />} label="Phase" />
                            <FormControlLabel control={<Checkbox checked={item.isCriticalPath || false} onChange={(e) => handleTimelineChange(index, 'isCriticalPath', e.target.checked)} />} label="Critical" />
                          </Box>
                        )}
                      </TableCell>
                      {editMode && (
                        <TableCell>
                          <IconButton size="small" onClick={() => handleRemoveItem(index)}><DeleteIcon /></IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {editMode && (
            <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddItem} sx={{ mt: 2 }}>
              Add Item
            </Button>
          )}
        </>
      ) : (
        <Box sx={{ mt: 2, overflowX: 'auto', p: 1, border: '1px solid #ddd', borderRadius: '4px' }}>
          <Chart
            chartType="Gantt"
            width="100%"
            height="500px"
            data={getGanttData()}
            options={{
              height: editedTimeline.length * 41 + 50, // Dynamically adjust height
              gantt: {
                trackHeight: 40,
                criticalPathEnabled: true,
                criticalPathStyle: {
                  stroke: '#e64a19',
                  strokeWidth: 5
                }
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default Timeline;
