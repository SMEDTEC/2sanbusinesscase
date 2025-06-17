import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Typography, Paper, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Button, TextField, IconButton, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectContext } from '../context/ProjectContext';

const defaultCommercialModel = {
  accounts: [], // Start with an empty array for accounts
  marketAnalysis: 'Market analysis details...',
  distributionStrategy: 'Distribution strategy details...',
};

const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const CommercialModel = ({ project }) => {
  const { updateProject } = useContext(ProjectContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(defaultCommercialModel);

  useEffect(() => {
    let initialData;
    if (project?.commercialModel?.accounts) { // Check for the new accounts structure
      initialData = JSON.parse(JSON.stringify(project.commercialModel));
    } else {
      // If old structure or no commercial model, initialize with new default
      initialData = JSON.parse(JSON.stringify(defaultCommercialModel));
    }
    // Ensure accounts is always an array
    if (!initialData.accounts) {
      initialData.accounts = [];
    }
    setEditedData(initialData);
  }, [project, isEditing]);

  const handleSave = () => {
    updateProject({ ...project, commercialModel: editedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Re-initialize with project data to discard changes
    let initialData;
    if (project?.commercialModel?.accounts) {
      initialData = JSON.parse(JSON.stringify(project.commercialModel));
    } else {
      initialData = JSON.parse(JSON.stringify(defaultCommercialModel));
    }
    if (!initialData.accounts) {
      initialData.accounts = [];
    }
    setEditedData(initialData);
    setIsEditing(false);
  };

  const handleAccountChange = (index, field, value) => {
    const newAccounts = [...editedData.accounts];
    const account = { ...newAccounts[index] };
    if (['numberOfDoors', 'velocityPerDoorPerWeek', 'sellPricePerUnit', 'costPricePerUnit'].includes(field)) {
      account[field] = parseFloat(value) || 0;
    } else {
      account[field] = value;
    }
    newAccounts[index] = account;
    setEditedData(prev => ({ ...prev, accounts: newAccounts }));
  };

  const handleAddAccount = () => {
    const newAccount = {
      id: `acc-${new Date().getTime()}-${Math.random().toString(16).slice(2)}`, // Simple unique ID
      accountName: '',
      numberOfDoors: 0,
      velocityPerDoorPerWeek: 0,
      sellPricePerUnit: 0,
      costPricePerUnit: 0,
    };
    setEditedData(prev => ({ ...prev, accounts: [...(prev.accounts || []), newAccount] }));
  };

  const handleRemoveAccount = (index) => {
    const newAccounts = editedData.accounts.filter((_, i) => i !== index);
    setEditedData(prev => ({ ...prev, accounts: newAccounts }));
  };

  const handleTextChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const calculateAccountFinancials = (account) => {
    const annualUnits = (account.numberOfDoors || 0) * (account.velocityPerDoorPerWeek || 0) * 52;
    const annualRevenue = annualUnits * (account.sellPricePerUnit || 0);
    const annualCOGS = annualUnits * (account.costPricePerUnit || 0);
    const annualProfit = annualRevenue - annualCOGS;
    return { annualRevenue, annualCOGS, annualProfit, annualUnits };
  };

  let totalAnnualRevenue = 0;
  let totalAnnualCOGS = 0;
  let totalAnnualProfit = 0;
  let totalAnnualUnits = 0;

  if (editedData.accounts) {
    editedData.accounts.forEach(account => {
      const { annualRevenue, annualCOGS, annualProfit, annualUnits } = calculateAccountFinancials(account);
      totalAnnualRevenue += annualRevenue;
      totalAnnualCOGS += annualCOGS;
      totalAnnualProfit += annualProfit;
      totalAnnualUnits += annualUnits;
    });
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">COMMERCIAL MODEL</Typography>
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

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Account-Based Commercial Projections</Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Account Name</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '100px' }}># Doors</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '120px' }}>Vel/Wk/Door</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '100px' }}>Sell Price</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '100px' }}>Cost Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Annual Units</TableCell>
              <TableCell sx={{ color: 'white' }}>Annual Revenue</TableCell>
              <TableCell sx={{ color: 'white' }}>Annual COGS</TableCell>
              <TableCell sx={{ color: 'white' }}>Annual Profit</TableCell>
              {isEditing && <TableCell sx={{ color: 'white' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(editedData.accounts || []).map((account, index) => {
              const { annualRevenue, annualCOGS, annualProfit, annualUnits } = calculateAccountFinancials(account);
              return (
                <TableRow key={account.id || index}>
                  <TableCell>
                    {isEditing ? (
                      <TextField size="small" value={account.accountName} onChange={(e) => handleAccountChange(index, 'accountName', e.target.value)} />
                    ) : account.accountName}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField size="small" type="number" value={account.numberOfDoors} onChange={(e) => handleAccountChange(index, 'numberOfDoors', e.target.value)} sx={{width: '80px'}}/>
                    ) : account.numberOfDoors}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField size="small" type="number" value={account.velocityPerDoorPerWeek} onChange={(e) => handleAccountChange(index, 'velocityPerDoorPerWeek', e.target.value)} sx={{width: '80px'}}/>
                    ) : account.velocityPerDoorPerWeek}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField size="small" type="number" value={account.sellPricePerUnit} onChange={(e) => handleAccountChange(index, 'sellPricePerUnit', e.target.value)} sx={{width: '80px'}}/>
                    ) : formatCurrency(account.sellPricePerUnit)}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField size="small" type="number" value={account.costPricePerUnit} onChange={(e) => handleAccountChange(index, 'costPricePerUnit', e.target.value)} sx={{width: '80px'}}/>
                    ) : formatCurrency(account.costPricePerUnit)}
                  </TableCell>
                  <TableCell>{annualUnits.toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(annualRevenue)}</TableCell>
                  <TableCell>{formatCurrency(annualCOGS)}</TableCell>
                  <TableCell>{formatCurrency(annualProfit)}</TableCell>
                  {isEditing && (
                    <TableCell>
                      <IconButton onClick={() => handleRemoveAccount(index)} color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {isEditing && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Button startIcon={<AddIcon />} onClick={handleAddAccount} variant="outlined" size="small">
                    Add Account
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {(editedData.accounts || []).length === 0 && !isEditing && (
                 <TableRow>
                    <TableCell colSpan={9} align="center" sx={{fontStyle: 'italic'}}>
                        No accounts added yet.
                    </TableCell>
                 </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Aggregated Totals</Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}><Typography>Total Annual Units: <strong>{totalAnnualUnits.toLocaleString()}</strong></Typography></Grid>
          <Grid item xs={12} sm={3}><Typography>Total Annual Revenue: <strong>{formatCurrency(totalAnnualRevenue)}</strong></Typography></Grid>
          <Grid item xs={12} sm={3}><Typography>Total Annual COGS: <strong>{formatCurrency(totalAnnualCOGS)}</strong></Typography></Grid>
          <Grid item xs={12} sm={3}><Typography>Total Annual Profit: <strong>{formatCurrency(totalAnnualProfit)}</strong></Typography></Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Market Analysis</Typography>
            {isEditing ? (
              <TextField fullWidth multiline rows={8} value={editedData.marketAnalysis} onChange={(e) => handleTextChange('marketAnalysis', e.target.value)} />
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{editedData.marketAnalysis}</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Distribution Strategy</Typography>
            {isEditing ? (
              <TextField fullWidth multiline rows={8} value={editedData.distributionStrategy} onChange={(e) => handleTextChange('distributionStrategy', e.target.value)} />
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{editedData.distributionStrategy}</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommercialModel;
