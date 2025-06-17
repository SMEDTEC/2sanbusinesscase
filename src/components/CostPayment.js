import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Typography, Paper, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectContext } from '../context/ProjectContext';

const CostPayment = ({ project }) => {
  const { updateProject } = useContext(ProjectContext);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ costs: [], contingencyPercentage: 0 });

  useEffect(() => {
    if (project) {
      // Deep copy to avoid direct mutation of context state
      setEditedData({
        costs: project.costs ? JSON.parse(JSON.stringify(project.costs)) : [],
        contingencyPercentage: project.contingencyPercentage || 0,
      });
    }
  }, [project, editMode]); // Rerun if project changes or when exiting edit mode

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    // State will be reset by useEffect
  };

  const handleSave = () => {
    const updatedProject = {
      ...project,
      costs: editedData.costs,
      contingencyPercentage: editedData.contingencyPercentage,
    };
    updateProject(updatedProject);
    setEditMode(false);
  };

  const handleCostChange = (index, field, value) => {
    const newCosts = [...editedData.costs];
    const costItem = { ...newCosts[index] };
    costItem[field] = (field === 'amount' || field === 'year' || field === 'phase') ? (parseFloat(value) || 0) : value;
    newCosts[index] = costItem;
    setEditedData(prev => ({ ...prev, costs: newCosts }));
  };
  
  const handleContingencyChange = (event) => {
    setEditedData(prev => ({ ...prev, contingencyPercentage: parseFloat(event.target.value) || 0 }));
  };

  const handleAddCost = () => {
    const newCostItem = {
      category: '',
      description: '',
      amount: 0,
      year: new Date().getFullYear(),
      phase: 0,
      status: 'Not Started',
    };
    setEditedData(prev => ({ ...prev, costs: [...prev.costs, newCostItem] }));
  };

  const handleRemoveCost = (index) => {
    const newCosts = editedData.costs.filter((_, i) => i !== index);
    setEditedData(prev => ({ ...prev, costs: newCosts }));
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  const costs = editedData.costs || [];
  const contingencyPercentage = editedData.contingencyPercentage || 0;
  const subTotal = costs.reduce((sum, item) => sum + (item.amount || 0), 0);
  const contingencyAmount = subTotal * (contingencyPercentage / 100);
  const grandTotal = subTotal + contingencyAmount;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          COST & PAYMENT SCHEDULE
        </Typography>
        <Box>
          {editMode ? (
            <>
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'right' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Year</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center' }}>Phase</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              {editMode && <TableCell sx={{ color: 'white' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {costs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {editMode ? <TextField size="small" value={item.category} onChange={(e) => handleCostChange(index, 'category', e.target.value)} /> : item.category}
                </TableCell>
                <TableCell>
                  {editMode ? <TextField size="small" value={item.description} onChange={(e) => handleCostChange(index, 'description', e.target.value)} /> : item.description}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {editMode ? <TextField size="small" type="number" value={item.amount} onChange={(e) => handleCostChange(index, 'amount', e.target.value)} sx={{ '& input': { textAlign: 'right' } }} /> : formatCurrency(item.amount)}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editMode ? <TextField size="small" type="number" value={item.year} onChange={(e) => handleCostChange(index, 'year', e.target.value)} sx={{ '& input': { textAlign: 'center' } }} /> : item.year}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {editMode ? <TextField size="small" type="number" value={item.phase} onChange={(e) => handleCostChange(index, 'phase', e.target.value)} sx={{ '& input': { textAlign: 'center' } }} /> : item.phase}
                </TableCell>
                <TableCell>
                  {editMode ? <TextField size="small" value={item.status} onChange={(e) => handleCostChange(index, 'status', e.target.value)} /> : item.status}
                </TableCell>
                {editMode && (
                  <TableCell>
                    <IconButton onClick={() => handleRemoveCost(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {costs.length === 0 && !editMode && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                  No cost items have been added.
                </TableCell>
              </TableRow>
            )}
            {editMode && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddCost}>
                    Add Cost Item
                  </Button>
                </TableCell>
              </TableRow>
            )}
            
            {/* Summary Rows */}
            <TableRow sx={{ '& td': { border: 0 }, '& th': { border: 0 } }}>
              <TableCell colSpan={2} align="right" sx={{ fontWeight: 'bold', pt: 4 }}>SUBTOTAL</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', pt: 4 }}>{formatCurrency(subTotal)}</TableCell>
              <TableCell colSpan={editMode ? 4 : 3}></TableCell>
            </TableRow>
            <TableRow sx={{ '& td': { border: 0 } }}>
              <TableCell colSpan={2} align="right">
                {editMode ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography sx={{ mr: 1 }}>Contingency (%)</Typography>
                    <TextField size="small" type="number" value={contingencyPercentage} onChange={handleContingencyChange} sx={{ width: '80px' }} />
                  </Box>
                ) : `Contingency (${contingencyPercentage}%)`}
              </TableCell>
              <TableCell align="right">{formatCurrency(contingencyAmount)}</TableCell>
              <TableCell colSpan={editMode ? 4 : 3}></TableCell>
            </TableRow>
            <TableRow sx={{ '& td': { border: 0 } }}>
              <TableCell colSpan={2} align="right" sx={{ fontWeight: 'bold' }}>GRAND TOTAL</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', borderTop: '2px solid #000', borderBottom: '4px double #000' }}>
                {formatCurrency(grandTotal)}
              </TableCell>
              <TableCell colSpan={editMode ? 4 : 3}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CostPayment;
