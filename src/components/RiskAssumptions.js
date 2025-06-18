import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Typography, Paper, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Chip, Button, TextField, IconButton, List, ListItem, ListItemText, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ProjectContext } from '../context/ProjectContext';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, ChartTooltip, Legend);

const defaultRiskAssumptions = {
  risks: [
    { id: 'R-001', category: 'Regulatory', description: 'FDA may request additional clinical data.', occurrence: 4, detection: 3, severity: 5, mitigation: 'Pre-submission meeting.', owner: 'Regulatory Affairs', status: 'Open' },
  ],
  assumptions: [
    'Assumes a standard 510(k) submission pathway.',
  ],
};

const RiskAssumptions = ({ project }) => {
  const { updateProject } = useContext(ProjectContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(defaultRiskAssumptions);

  useEffect(() => {
    const initialData = project?.riskAssumptions ? JSON.parse(JSON.stringify(project.riskAssumptions)) : defaultRiskAssumptions;
    setEditedData(initialData);
  }, [project.id]);

  const handleSave = () => {
    updateProject({ ...project, riskAssumptions: editedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset state to original on cancel
    const initialData = project?.riskAssumptions ? JSON.parse(JSON.stringify(project.riskAssumptions)) : defaultRiskAssumptions;
    setEditedData(initialData);
    setIsEditing(false);
  };

  const handleRiskChange = (index, field, value) => {
    const newRisks = [...editedData.risks];
    const parsedValue = (field === 'occurrence' || field === 'detection' || field === 'severity') ? parseInt(value, 10) || 0 : value;
    newRisks[index] = { ...newRisks[index], [field]: parsedValue };
    setEditedData({ ...editedData, risks: newRisks });
  };

  const handleAssumptionChange = (index, value) => {
    const newAssumptions = [...editedData.assumptions];
    newAssumptions[index] = value;
    setEditedData({ ...editedData, assumptions: newAssumptions });
  };

  const addRisk = () => {
    const newRisk = { id: `R-00${editedData.risks.length + 1}`, category: '', description: '', occurrence: 1, detection: 1, severity: 1, mitigation: '', owner: '', status: 'New' };
    setEditedData({ ...editedData, risks: [...editedData.risks, newRisk] });
  };

  const deleteRisk = (index) => {
    const newRisks = editedData.risks.filter((_, i) => i !== index);
    setEditedData({ ...editedData, risks: newRisks });
  };

  const addAssumption = () => {
    setEditedData({ ...editedData, assumptions: [...editedData.assumptions, ''] });
  };

  const deleteAssumption = (index) => {
    const newAssumptions = editedData.assumptions.filter((_, i) => i !== index);
    setEditedData({ ...editedData, assumptions: newAssumptions });
  };

  const getCriticalityChip = (occurrence, detection, severity) => {
    const criticalityScore = occurrence * detection * severity;
    let level = 'Minor';
    let color = 'success';
    let impactOnUser = 'No impact on the end user';

    if (criticalityScore > 27) {
      level = 'Critical';
      color = 'error';
      impactOnUser = 'Major impact on end user';
    } else if (criticalityScore >= 16) {
      level = 'Major';
      color = 'warning';
      impactOnUser = 'Minor impact on end user';
    }

    const title = (
      <>
        <Typography variant="body2">Score: {criticalityScore}</Typography>
        <Typography variant="body2">Level: {level}</Typography>
        <Typography variant="body2">Impact: {impactOnUser}</Typography>
      </>
    );

    return (
      <Tooltip title={title}>
        <Chip label={level} color={color} size="small" />
      </Tooltip>
    );
  };

  const heatMapData = {
    datasets: editedData.risks.map(risk => {
      const criticalityScore = risk.occurrence * risk.detection * risk.severity;
      let backgroundColor = 'rgba(40, 200, 40, 0.5)'; // Minor - Green
      if (criticalityScore > 27) {
        backgroundColor = 'rgba(255, 99, 132, 0.5)'; // Critical - Red
      } else if (criticalityScore >= 16) {
        backgroundColor = 'rgba(255, 206, 86, 0.5)'; // Major - Yellow
      }
      return {
        label: risk.id,
        data: [{
          x: risk.occurrence,
          y: risk.severity,
          r: 10 + risk.detection * 2 // Radius can be linked to detection score
        }],
        backgroundColor,
        borderColor: backgroundColor.replace('0.5', '1'),
        borderWidth: 1,
      };
    })
  };

  const heatMapOptions = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 6,
        title: {
          display: true,
          text: 'Severity (Impact)'
        },
        grid: {
          drawOnChartArea: true,
          color: (context) => {
            if (context.tick.value === 0) return 'transparent';
            return '#e0e0e0';
          }
        }
      },
      x: {
        beginAtZero: true,
        min: 0,
        max: 6,
        title: {
          display: true,
          text: 'Occurrence (Likelihood)'
        },
        grid: {
          drawOnChartArea: true,
          color: (context) => {
            if (context.tick.value === 0) return 'transparent';
            return '#e0e0e0';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const risk = editedData.risks[context.datasetIndex];
            const criticalityScore = risk.occurrence * risk.detection * risk.severity;
            return [
              `${risk.id}: ${risk.description}`,
              `Occurrence: ${risk.occurrence}, Severity: ${risk.severity}, Detection: ${risk.detection}`,
              `Criticality Score: ${criticalityScore}`
            ];
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">RISK & ASSUMPTIONS</Typography>
        <Box>
          {isEditing ? (
            <>
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel} sx={{ mr: 1 }}>Cancel</Button>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Risk Assessment Matrix</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead><TableRow sx={{ backgroundColor: '#1976d2' }}>{['ID', 'Category', 'Description', 'Occurrence (1-5)', 'Detection (1-5)', 'Severity (1-5)', 'Criticality', 'Mitigation', 'Owner', 'Status', ''].map(h => <TableCell key={h} sx={{ color: 'white' }}>{h}</TableCell>)}</TableRow></TableHead>
          <TableBody>
            {editedData.risks.map((risk, i) => (
              <TableRow key={i}>
                <TableCell>{isEditing ? <TextField size="small" value={risk.id} onChange={(e) => handleRiskChange(i, 'id', e.target.value)} /> : risk.id}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" value={risk.category} onChange={(e) => handleRiskChange(i, 'category', e.target.value)} /> : risk.category}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" fullWidth value={risk.description} onChange={(e) => handleRiskChange(i, 'description', e.target.value)} /> : risk.description}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" type="number" inputProps={{ min: 1, max: 5 }} value={risk.occurrence} onChange={(e) => handleRiskChange(i, 'occurrence', e.target.value)} /> : risk.occurrence}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" type="number" inputProps={{ min: 1, max: 5 }} value={risk.detection} onChange={(e) => handleRiskChange(i, 'detection', e.target.value)} /> : risk.detection}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" type="number" inputProps={{ min: 1, max: 5 }} value={risk.severity} onChange={(e) => handleRiskChange(i, 'severity', e.target.value)} /> : risk.severity}</TableCell>
                <TableCell>{getCriticalityChip(risk.occurrence, risk.detection, risk.severity)}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" fullWidth value={risk.mitigation} onChange={(e) => handleRiskChange(i, 'mitigation', e.target.value)} /> : risk.mitigation}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" value={risk.owner} onChange={(e) => handleRiskChange(i, 'owner', e.target.value)} /> : risk.owner}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" value={risk.status} onChange={(e) => handleRiskChange(i, 'status', e.target.value)} /> : risk.status}</TableCell>
                <TableCell>{isEditing && <IconButton size="small" onClick={() => deleteRisk(i)}><DeleteIcon /></IconButton>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isEditing && <Button startIcon={<AddIcon />} onClick={addRisk} sx={{ m: 1 }}>Add Risk</Button>}
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Key Assumptions</Typography>
      <Paper sx={{ p: 2 }}>
        <List dense>
          {editedData.assumptions.map((assumption, i) => (
            <ListItem key={i} disableGutters secondaryAction={isEditing && <IconButton edge="end" onClick={() => deleteAssumption(i)}><DeleteIcon /></IconButton>}>
              {isEditing ? (
                <TextField fullWidth multiline value={assumption} onChange={(e) => handleAssumptionChange(i, e.target.value)} />
              ) : (
                <ListItemText primary={assumption} />
              )}
            </ListItem>
          ))}
        </List>
        {isEditing && <Button startIcon={<AddIcon />} onClick={addAssumption} sx={{ mt: 1 }}>Add Assumption</Button>}
      </Paper>


      {/* Risk Heat Map */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        Risk Heat Map
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Box sx={{ height: '400px', position: 'relative' }}>
          <Bubble options={heatMapOptions} data={heatMapData} />
        </Box>
      </Paper>

      {/* Risk Management Plan */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        Risk Management Plan
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          The project will follow a structured risk management approach:
        </Typography>
        <ol>
          <li><strong>Risk Identification:</strong> Ongoing process throughout project lifecycle</li>
          <li><strong>Risk Assessment:</strong> Monthly evaluation of probability and impact</li>
          <li><strong>Risk Mitigation:</strong> Development of specific action plans for high and medium risks</li>
          <li><strong>Risk Monitoring:</strong> Weekly tracking of top risks in project meetings</li>
          <li><strong>Risk Reporting:</strong> Monthly status updates to executive sponsors</li>
        </ol>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          <strong>Risk Escalation Criteria:</strong>
        </Typography>
        <ul>
          <li>Any 'Critical' risk (score &gt; 27) requires immediate escalation to executive sponsors.</li>
          <li>Any 'Major' risk (score 16-27) requires a mitigation plan approved by the project steering committee.</li>
          <li>Cumulative impact of multiple 'Major' risks (e.g., ≥ 3) may also require escalation.</li>
        </ul>
      </Paper>
    </Box>
  );
};

export default RiskAssumptions;
