import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Typography, Paper, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Chip, Button, TextField, IconButton, List, ListItem, ListItemText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ProjectContext } from '../context/ProjectContext';

const defaultRiskAssumptions = {
  risks: [
    { id: 'R-001', category: 'Regulatory', description: 'FDA may request additional clinical data.', probability: 4, impact: 5, mitigation: 'Pre-submission meeting.', owner: 'Regulatory Affairs', status: 'Open' },
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
  }, [project, isEditing]);

  const handleSave = () => {
    updateProject({ ...project, riskAssumptions: editedData });
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  const handleRiskChange = (index, field, value) => {
    const newRisks = [...editedData.risks];
    const parsedValue = (field === 'probability' || field === 'impact') ? parseInt(value, 10) || 0 : value;
    newRisks[index] = { ...newRisks[index], [field]: parsedValue };
    setEditedData({ ...editedData, risks: newRisks });
  };

  const handleAssumptionChange = (index, value) => {
    const newAssumptions = [...editedData.assumptions];
    newAssumptions[index] = value;
    setEditedData({ ...editedData, assumptions: newAssumptions });
  };

  const addRisk = () => {
    const newRisk = { id: `R-00${editedData.risks.length + 1}`, category: '', description: '', probability: 1, impact: 1, mitigation: '', owner: '', status: 'New' };
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

  const getRiskScoreChip = (probability, impact) => {
    const score = (probability * 0.1) * (impact * 0.1) * 10; // Simple weighted score
    const normalizedScore = Math.min(1, score).toFixed(2);
    let color = 'success';
    if (normalizedScore > 0.6) color = 'error';
    else if (normalizedScore > 0.3) color = 'warning';
    return <Chip label={normalizedScore} color={color} size="small" />;
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
          <TableHead><TableRow sx={{ backgroundColor: '#1976d2' }}>{['ID', 'Category', 'Description', 'Prob (1-5)', 'Impact (1-5)', 'Score', 'Mitigation', 'Owner', 'Status', ''].map(h => <TableCell key={h} sx={{ color: 'white' }}>{h}</TableCell>)}</TableRow></TableHead>
          <TableBody>
            {editedData.risks.map((risk, i) => (
              <TableRow key={i}>
                <TableCell>{isEditing ? <TextField size="small" value={risk.id} onChange={(e) => handleRiskChange(i, 'id', e.target.value)} /> : risk.id}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" value={risk.category} onChange={(e) => handleRiskChange(i, 'category', e.target.value)} /> : risk.category}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" fullWidth value={risk.description} onChange={(e) => handleRiskChange(i, 'description', e.target.value)} /> : risk.description}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" type="number" inputProps={{ min: 1, max: 5 }} value={risk.probability} onChange={(e) => handleRiskChange(i, 'probability', e.target.value)} /> : risk.probability}</TableCell>
                <TableCell>{isEditing ? <TextField size="small" type="number" inputProps={{ min: 1, max: 5 }} value={risk.impact} onChange={(e) => handleRiskChange(i, 'impact', e.target.value)} /> : risk.impact}</TableCell>
                <TableCell>{getRiskScoreChip(risk.probability, risk.impact)}</TableCell>
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
        <Box sx={{ height: '400px', backgroundColor: '#f5f5f5', p: 2, border: '1px dashed #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            Risk Heat Map Visualization will be rendered here
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Note: The Risk Heat Map will be implemented using Chart.js to visualize the probability and impact of identified risks.
        </Typography>
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
          <li>Any risk with a score ≥ 0.7 requires immediate escalation to executive sponsors</li>
          <li>Any risk with a score between 0.4-0.69 requires mitigation plan approval by project steering committee</li>
          <li>Cumulative impact of multiple medium risks (≥ 3 risks with scores 0.3-0.5) requires escalation</li>
        </ul>
      </Paper>
    </Box>
  );
};

export default RiskAssumptions;
