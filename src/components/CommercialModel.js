import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Box, Typography, Paper, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Button, TextField, IconButton, Divider, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectContext, defaultCommercialModelStructure } from '../context/ProjectContext';

const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const CommercialModel = ({ project }) => {
  const { updateProject } = useContext(ProjectContext);
  const [isEditing, setIsEditing] = useState(false);

  const getSanitizedModel = useCallback((modelSource) => {
    const base = modelSource || defaultCommercialModelStructure;
    // Deep clone to prevent direct mutation of project context or fallback
    const newModel = JSON.parse(JSON.stringify(base));

    // Ensure 'accounts' is always an array
    if (!Array.isArray(newModel.accounts)) {
      newModel.accounts = [];
    }
    // Potentially add more sanitization for other critical structures if needed
    // For example, ensuring totalDoors, avgUnitsPerDoor, etc., are objects:
    if (typeof newModel.totalDoors !== 'object' || newModel.totalDoors === null) newModel.totalDoors = { ...defaultCommercialModelStructure.totalDoors };
    if (typeof newModel.avgUnitsPerDoor !== 'object' || newModel.avgUnitsPerDoor === null) newModel.avgUnitsPerDoor = { ...defaultCommercialModelStructure.avgUnitsPerDoor };
    if (typeof newModel.totalInvestment !== 'object' || newModel.totalInvestment === null) newModel.totalInvestment = { ...defaultCommercialModelStructure.totalInvestment };
    if (typeof newModel.quarterlyDistribution !== 'object' || newModel.quarterlyDistribution === null) newModel.quarterlyDistribution = { ...defaultCommercialModelStructure.quarterlyDistribution };
    // Projections are recalculated, but ensure the root object exists for initial reads if any
    if (typeof newModel.projections !== 'object' || newModel.projections === null) newModel.projections = JSON.parse(JSON.stringify(defaultCommercialModelStructure.projections));

    return newModel;
  }, []); // No dependencies, relies on defaultCommercialModelStructure which is constant

  const [editedData, setEditedData] = useState(() => getSanitizedModel(project?.commercialModel));

  // Effect to reset editedData when project changes
  useEffect(() => {
    setEditedData(getSanitizedModel(project?.commercialModel));
  }, [project?.id, project?.commercialModel, getSanitizedModel]);

  const calculateAllProjections = useCallback((currentModelData) => {
    const newModel = JSON.parse(JSON.stringify(currentModelData)); // Work with a deep copy

    const {
      costPerUnit = 0, // Global cost per unit from Model Parameters
      sellPerUnit = 0, // Global sell per unit from Model Parameters
      // totalDoorsAvailable = 0, // No longer primary driver for yearly figures
      // averageSalesVelocity = 0, // No longer primary driver for yearly figures
      // penetrationPercentYear1 = 0, // No longer primary driver for yearly figures
      // penetrationPercentYear2 = 0, // No longer primary driver for yearly figures
      // penetrationPercentYear3 = 0, // No longer primary driver for yearly figures
      totalInvestment = { year1: 0, year2: 0, year3: 0 },
      quarterlyDistribution = defaultCommercialModelStructure.quarterlyDistribution,
      accounts = []
    } = newModel;

    // Initialize projections structure
    newModel.projections = JSON.parse(JSON.stringify(defaultCommercialModelStructure.projections));

    let threeYearTotalRevenue = 0;
    let threeYearTotalCOGS = 0;
    let threeYearTotalInvestment = 0;

    for (let i = 0; i < 3; i++) {
      const yearKey = `year${i + 1}`;
      
      let yearTotalPenetratedDoors = 0;
      let yearTotalWeightedVelocitySum = 0;

      accounts.forEach(acc => {
        const accountYearData = acc.years?.[yearKey];
        if (accountYearData) {
          const doorsForAccountYear = accountYearData.numberOfDoors || 0;
          const velocityForAccountYear = accountYearData.velocityPerDoorPerWeek || 0;
          yearTotalPenetratedDoors += doorsForAccountYear;
          yearTotalWeightedVelocitySum += doorsForAccountYear * velocityForAccountYear;
        }
      });

      const effectiveSalesVelocityForYear = yearTotalPenetratedDoors > 0 
        ? yearTotalWeightedVelocitySum / yearTotalPenetratedDoors 
        : 0;

      // Update the model's display values for totalDoors and avgUnitsPerDoor
      newModel.totalDoors[yearKey] = yearTotalPenetratedDoors;
      newModel.avgUnitsPerDoor[yearKey] = effectiveSalesVelocityForYear;

      // Calculate core yearly figures based on aggregated account data
      const annualUnitSales = yearTotalPenetratedDoors * effectiveSalesVelocityForYear * 52;
      const annualRevenue = annualUnitSales * sellPerUnit; // Using global sellPerUnit
      const annualCostOfGoods = annualUnitSales * costPerUnit; // Using global costPerUnit
      const annualGrossMargin = annualRevenue - annualCostOfGoods;
      const investmentThisYear = totalInvestment[yearKey] || 0;
      const netProfitThisYear = annualGrossMargin - investmentThisYear;

      // Store calculated annual figures in projections
      const projYear = newModel.projections.years[i];
      projYear.year = i + 1;
      projYear.unitSales = annualUnitSales;
      projYear.totalRevenue = annualRevenue;
      projYear.totalCostOfGoods = annualCostOfGoods;
      projYear.totalGrossMargin = annualGrossMargin;
      projYear.investment = investmentThisYear;
      projYear.netProfit = netProfitThisYear;

      threeYearTotalRevenue += annualRevenue;
      threeYearTotalCOGS += annualCostOfGoods;
      threeYearTotalInvestment += investmentThisYear;

      // Quarterly breakdown
      const yearQuarterlyDistribution = quarterlyDistribution[yearKey] || defaultCommercialModelStructure.quarterlyDistribution[yearKey];
      yearQuarterlyDistribution.forEach((qd, qi) => {
        projYear.quarters[qi].quarter = qd.q;
        projYear.quarters[qi].revenue = annualRevenue * (qd.p / 100);
        projYear.quarters[qi].costOfGoods = annualCostOfGoods * (qd.p / 100);
        projYear.quarters[qi].grossMargin = annualGrossMargin * (qd.p / 100);
      });
    }

    // Calculate 3-Year Summary
    newModel.projections.summary.totalRevenue = threeYearTotalRevenue;
    newModel.projections.summary.totalCostOfGoods = threeYearTotalCOGS;
    newModel.projections.summary.totalGrossMargin = threeYearTotalRevenue - threeYearTotalCOGS;
    newModel.projections.summary.totalInvestment = threeYearTotalInvestment;
    newModel.projections.summary.totalNetProfit = newModel.projections.summary.totalGrossMargin - threeYearTotalInvestment;
    
    const year1Revenue = newModel.projections.years[0]?.totalRevenue || 0;
    const year3Revenue = newModel.projections.years[2]?.totalRevenue || 0;
    if (year1Revenue > 0 && year3Revenue > 0) {
      newModel.projections.summary.revenueCAGR = ((Math.pow(year3Revenue / year1Revenue, 1 / 2)) - 1) * 100; // CAGR over 2 periods (Year 1 to Year 3)
    } else {
      newModel.projections.summary.revenueCAGR = 0;
    }

    // --- Start: Existing Bottom-Up Calculation for Accounts Table (Year 1 only) ---
    // This part calculates totals for the 'Accounts' table and might influence Year 1 projections if needed,
    // or simply provide data for that specific table. For now, it just updates the table totals.
    let year1BottomUpRevenue = 0;
    let year1BottomUpCost = 0;
    if (accounts && accounts.length > 0) {
      accounts.forEach(acc => {
        const annualUnits = (acc.numberOfDoors || 0) * (acc.velocityPerDoorPerWeek || 0) * 52;
        year1BottomUpRevenue += annualUnits * (acc.sellPricePerUnit || 0);
        year1BottomUpCost += annualUnits * (acc.costPricePerUnit || 0);
      });
    }
    // These are for the separate accounts table summary, not directly overriding top-down year 1 unless specifically designed to.
    // For now, the top-down calculation dictates the main projections.
    // newModel.projections.year1BottomUpRevenue = year1BottomUpRevenue; // Example if you want to store it
    // --- End: Existing Bottom-Up Calculation ---

    return newModel;
  }, [defaultCommercialModelStructure]); // Added defaultCommercialModelStructure as it's used for initializing projections

  useEffect(() => {
    // Recalculate projections whenever relevant input data changes
    if (
      editedData &&
      typeof editedData.costPerUnit !== 'undefined' && // Still used for main projection COGS
      typeof editedData.sellPerUnit !== 'undefined' && // Still used for main projection Revenue
      editedData.accounts && // Now the primary driver for doors/velocity
      editedData.totalInvestment &&
      editedData.quarterlyDistribution
    ) {
      const newCalculatedModel = calculateAllProjections(editedData);
      // Compare stringified versions of the whole model to prevent infinite loops
      if (JSON.stringify(newCalculatedModel) !== JSON.stringify(editedData)) {
        setEditedData(newCalculatedModel);
      }
    }
  }, [
    editedData.costPerUnit,
    editedData.sellPerUnit,
    // No longer direct dependencies for yearly doors/velocity calculation in this manner:
    // editedData.totalDoorsAvailable,
    // editedData.averageSalesVelocity,
    // editedData.penetrationPercentYear1,
    // editedData.penetrationPercentYear2,
    // editedData.penetrationPercentYear3,
    JSON.stringify(editedData.totalInvestment),
    JSON.stringify(editedData.quarterlyDistribution),
    JSON.stringify(editedData.accounts), // Now the primary driver for yearly doors/velocity
    calculateAllProjections
  ]);


  const handleSave = () => {
    updateProject({ ...project, commercialModel: editedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to the project's current commercial model state from context
    setEditedData(getSanitizedModel(project?.commercialModel));
    setIsEditing(false);
  };

  const handleAccountChange = (index, field, value, yearKey = null) => {
    setEditedData(prev => {
      const newAccounts = JSON.parse(JSON.stringify(prev.accounts)); // Deep copy for nested updates
      const accountToUpdate = newAccounts[index];

      if (yearKey && (field === 'numberOfDoors' || field === 'velocityPerDoorPerWeek')) {
        if (!accountToUpdate.years) { // Ensure years object exists
          accountToUpdate.years = { year1: {}, year2: {}, year3: {} };
        }
        if (!accountToUpdate.years[yearKey]) { // Ensure specific year object exists
          accountToUpdate.years[yearKey] = {};
        }
        accountToUpdate.years[yearKey][field] = parseFloat(value) || 0;
      } else if (field === 'costPricePerUnit' || field === 'sellPricePerUnit') {
        accountToUpdate[field] = parseFloat(value) || 0;
      } else {
        accountToUpdate[field] = value; // For accountName, notes
      }
      return { ...prev, accounts: newAccounts };
    });
  };

  const handleAddAccount = () => {
    const newAccount = {
      id: Date.now(), // Simple unique ID
      accountName: 'New Account',
      years: {
        year1: { numberOfDoors: 0, velocityPerDoorPerWeek: 0 },
        year2: { numberOfDoors: 0, velocityPerDoorPerWeek: 0 },
        year3: { numberOfDoors: 0, velocityPerDoorPerWeek: 0 },
      },
      costPricePerUnit: defaultCommercialModelStructure.costPerUnit, // Default to global
      sellPricePerUnit: defaultCommercialModelStructure.sellPerUnit, // Default to global
      notes: ''
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

  // Handler for top-level numeric inputs like costPerUnit, sellPerUnit
  const handleGlobalNumericChange = (field, value, isPercentage = false) => {
    let numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
        numericValue = 0;
    } else if (isPercentage) {
        // Optional: clamp percentage values if needed, e.g., 0-100, or allow >100 if meaningful
        // For now, just parse as float
    }
    setEditedData(prev => ({ ...prev, [field]: numericValue }));
  };

  // Handler for nested objects like totalDoors, avgUnitsPerDoor, totalInvestment
  const handleNestedNumericChange = (group, yearKey, value) => {
    setEditedData(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [yearKey]: parseFloat(value) || 0
      }
    }));
  };

  const calculateAccountFinancials = (account) => {
    // For the Account table summary, let's use Year 1 data or consider if this summary is still needed.
    // For now, using Year 1 data for this specific table's summary row.
    const year1Data = account.years?.year1 || { numberOfDoors: 0, velocityPerDoorPerWeek: 0 };
    const annualUnits = (year1Data.numberOfDoors || 0) * (year1Data.velocityPerDoorPerWeek || 0) * 52;
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
              <TableCell sx={{ color: 'white', minWidth: '150px' }}>Account Name</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Doors Y1</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Vel Y1</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Doors Y2</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Vel Y2</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Doors Y3</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Vel Y3</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Cost/Unit</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '90px' }}>Sell/Unit</TableCell>
              <TableCell sx={{ color: 'white', minWidth: '150px' }}>Notes</TableCell>
              <TableCell sx={{ color: 'white' }}>Y1 Revenue</TableCell>
              <TableCell sx={{ color: 'white' }}>Y1 COGS</TableCell>
              <TableCell sx={{ color: 'white' }}>Y1 Profit</TableCell>
              {isEditing && <TableCell sx={{ color: 'white' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(editedData.accounts || []).map((account, index) => {
              const { annualRevenue, annualCOGS, annualProfit, annualUnits } = calculateAccountFinancials(account);
              return (
                <TableRow key={account.id || index}>
                  <TableCell>
                    <TextField value={account.accountName} onChange={(e) => handleAccountChange(index, 'accountName', e.target.value)} disabled={!isEditing} variant="standard" fullWidth size="small"/>
                  </TableCell>
                  {['year1', 'year2', 'year3'].map(yearKey => (
                    <React.Fragment key={yearKey}>
                      <TableCell>
                        <TextField type="number" value={account.years?.[yearKey]?.numberOfDoors || 0} onChange={(e) => handleAccountChange(index, 'numberOfDoors', e.target.value, yearKey)} disabled={!isEditing} variant="standard" fullWidth size="small"/>
                      </TableCell>
                      <TableCell>
                        <TextField type="number" value={account.years?.[yearKey]?.velocityPerDoorPerWeek || 0} onChange={(e) => handleAccountChange(index, 'velocityPerDoorPerWeek', e.target.value, yearKey)} disabled={!isEditing} variant="standard" fullWidth size="small"/>
                      </TableCell>
                    </React.Fragment>
                  ))}
                  <TableCell>
                    <TextField type="number" value={account.costPricePerUnit} onChange={(e) => handleAccountChange(index, 'costPricePerUnit', e.target.value)} disabled={!isEditing} variant="standard" fullWidth size="small"/>
                  </TableCell>
                  <TableCell>
                    <TextField type="number" value={account.sellPricePerUnit} onChange={(e) => handleAccountChange(index, 'sellPricePerUnit', e.target.value)} disabled={!isEditing} variant="standard" fullWidth size="small"/>
                  </TableCell>
                  <TableCell>
                    <TextField value={account.notes} onChange={(e) => handleAccountChange(index, 'notes', e.target.value)} disabled={!isEditing} variant="standard" fullWidth size="small"/>
                  </TableCell>
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

      {/* 3-Year Projection Inputs and Summaries */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>3-Year Commercial Projections</Typography>
      
      {/* Inputs Section */}
      <Paper sx={{p:2, mb:3}} elevation={2}>
        <Typography variant="subtitle1" gutterBottom>Model Parameters</Typography>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={4}><Tooltip title="Global cost to produce one unit."><TextField label="Cost per Unit ($)" type="number" value={editedData.costPerUnit || 0} onChange={(e) => handleGlobalNumericChange('costPerUnit', e.target.value)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
          <Grid item xs={12} md={4}><Tooltip title="Global selling price for one unit."><TextField label="Sell per Unit ($)" type="number" value={editedData.sellPerUnit || 0} onChange={(e) => handleGlobalNumericChange('sellPerUnit', e.target.value)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
          <Grid item xs={12} md={4}><Tooltip title="Total number of doors available in the market."><TextField label="Total Doors Available" type="number" value={editedData.totalDoorsAvailable || 0} onChange={(e) => handleGlobalNumericChange('totalDoorsAvailable', e.target.value)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
          <Grid item xs={12} md={4}><Tooltip title="Average units sold per penetrated door per week."><TextField label="Average Sales Velocity (units/door/wk)" type="number" value={editedData.averageSalesVelocity || 0} onChange={(e) => handleGlobalNumericChange('averageSalesVelocity', e.target.value)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
          <Grid item xs={12} md={4}><Tooltip title="Percentage of total available doors penetrated in Year 1."><TextField label="Year 1 Penetration (%)" type="number" value={editedData.penetrationPercentYear1 || 0} onChange={(e) => handleGlobalNumericChange('penetrationPercentYear1', e.target.value, true)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
          <Grid item xs={12} md={4}><Tooltip title="Percentage of total available doors penetrated in Year 2."><TextField label="Year 2 Penetration (%)" type="number" value={editedData.penetrationPercentYear2 || 0} onChange={(e) => handleGlobalNumericChange('penetrationPercentYear2', e.target.value, true)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
          <Grid item xs={12} md={4}><Tooltip title="Percentage of total available doors penetrated in Year 3."><TextField label="Year 3 Penetration (%)" type="number" value={editedData.penetrationPercentYear3 || 0} onChange={(e) => handleGlobalNumericChange('penetrationPercentYear3', e.target.value, true)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
        </Grid>
      </Paper>

      <Paper sx={{p:2, mb:3}} elevation={2}>
        <Typography variant="subtitle1" gutterBottom>Yearly Inputs & Calculated Values</Typography>
        <Grid container spacing={2} sx={{mt:1}}>
          {['year1', 'year2', 'year3'].map(yearKey => {
            const yearNum = yearKey.slice(-1);
            return (
              <React.Fragment key={yearKey}>
                <Grid item xs={12}><Typography variant="h6" sx={{mt:1}}>{`Year ${yearNum} Details`}</Typography></Grid>
                <Grid item xs={12} md={4}><Tooltip title="Calculated: Total Doors Available * Penetration % for this year."><TextField label={`Penetrated Doors (Year ${yearNum})`} type="number" value={editedData.totalDoors?.[yearKey] || 0} fullWidth size="small" disabled InputProps={{ readOnly: true }} sx={{ '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000000', backgroundColor: '#f0f0f0' } }} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
                <Grid item xs={12} md={4}><Tooltip title="Reflects the Average Sales Velocity for calculation purposes."><TextField label={`Effective Sales Velocity (Year ${yearNum})`} type="number" value={editedData.avgUnitsPerDoor?.[yearKey] || 0} fullWidth size="small" disabled InputProps={{ readOnly: true }} sx={{ '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000000', backgroundColor: '#f0f0f0' } }} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
                <Grid item xs={12} md={4}><Tooltip title="Manual input for total investment planned for this year."><TextField label={`Total Investment (Year ${yearNum}) ($)`} type="number" value={editedData.totalInvestment?.[yearKey] || 0} onChange={(e) => handleNestedNumericChange('totalInvestment', yearKey, e.target.value)} fullWidth size="small" disabled={!isEditing} InputLabelProps={{ shrink: true }}/></Tooltip></Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Paper>

      {/* Annual Financial Summary Table (Top right of image) */}
      <Typography variant="subtitle1" gutterBottom sx={{mt:3}}>Annual Financial Summary (Projections)</Typography>
      <TableContainer component={Paper} sx={{mb:3}} elevation={2}>
        <Table size="small">
          <TableHead><TableRow><TableCell></TableCell><TableCell>Unit Sales</TableCell><TableCell>Revenue Potential</TableCell><TableCell>Cost</TableCell><TableCell>Margin</TableCell><TableCell>Margin %</TableCell></TableRow></TableHead>
          <TableBody>
            {(editedData.projections?.years || []).map(yearData => {
              const marginPercent = yearData.totalRevenue ? (yearData.totalGrossMargin / yearData.totalRevenue * 100).toFixed(2) : 0;
              return (
                <TableRow key={`summary-${yearData.year}`}>
                  <TableCell><strong>Year {yearData.year}</strong></TableCell>
                  <TableCell>{(yearData.unitSales || 0).toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(yearData.totalRevenue || 0)}</TableCell>
                  <TableCell>{formatCurrency(yearData.totalCostOfGoods || 0)}</TableCell>
                  <TableCell>{formatCurrency(yearData.totalGrossMargin || 0)}</TableCell>
                  <TableCell>{marginPercent}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Quarterly Projections - Year by Year */}
      {(editedData.projections?.years || []).map(yearData => (
        <Box key={`quarterly-year-${yearData.year}`} sx={{mb:3}}>
          <Typography variant="subtitle1" gutterBottom>{`YEAR ${yearData.year} COMMERCIAL PROJECTIONS (Quarterly)`}</Typography>
          <TableContainer component={Paper} elevation={2}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  {(yearData.quarters || []).map(q => <TableCell key={`qth-${yearData.year}-${q.quarter}`}>Q{q.quarter} ({(editedData.quarterlyDistribution?.[`year${yearData.year}`]?.find(dist => dist.q === q.quarter)?.p || 0)}%)</TableCell>)}
                  <TableCell>Total</TableCell>
                  <TableCell>% of Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Revenue</TableCell>
                  {(yearData.quarters || []).map(q => <TableCell key={`qval-rev-${yearData.year}-${q.quarter}`}>{formatCurrency(q.revenue)}</TableCell>)}
                  <TableCell><strong>{formatCurrency(yearData.totalRevenue)}</strong></TableCell>
                  <TableCell>100.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cost of Goods</TableCell>
                  {(yearData.quarters || []).map(q => <TableCell key={`qval-cog-${yearData.year}-${q.quarter}`}>{formatCurrency(q.costOfGoods)}</TableCell>)}
                  <TableCell><strong>{formatCurrency(yearData.totalCostOfGoods)}</strong></TableCell>
                  <TableCell>{yearData.totalRevenue ? ((yearData.totalCostOfGoods / yearData.totalRevenue) * 100).toFixed(1) : 0.0}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gross Margin</TableCell>
                  {(yearData.quarters || []).map(q => <TableCell key={`qval-gm-${yearData.year}-${q.quarter}`}>{formatCurrency(q.grossMargin)}</TableCell>)}
                  <TableCell><strong>{formatCurrency(yearData.totalGrossMargin)}</strong></TableCell>
                  <TableCell>{yearData.totalRevenue ? ((yearData.totalGrossMargin / yearData.totalRevenue) * 100).toFixed(1) : 0.0}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      {/* 3-Year Commercial Summary Table */}
      <Typography variant="subtitle1" gutterBottom sx={{mt:3}}>3-YEAR COMMERCIAL SUMMARY</Typography>
      <TableContainer component={Paper} sx={{mb:3}} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell><TableCell>Year 1</TableCell><TableCell>Year 2</TableCell><TableCell>Year 3</TableCell><TableCell>Total</TableCell><TableCell>CAGR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[0]?.totalRevenue || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[1]?.totalRevenue || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[2]?.totalRevenue || 0)}</TableCell>
              <TableCell><strong>{formatCurrency(editedData.projections?.summary?.totalRevenue || 0)}</strong></TableCell>
              <TableCell>{(editedData.projections?.summary?.revenueCAGR || 0).toFixed(1)}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cost of Goods</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[0]?.totalCostOfGoods || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[1]?.totalCostOfGoods || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[2]?.totalCostOfGoods || 0)}</TableCell>
              <TableCell><strong>{formatCurrency(editedData.projections?.summary?.totalCostOfGoods || 0)}</strong></TableCell>
              <TableCell>--</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross Margin</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[0]?.totalGrossMargin || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[1]?.totalGrossMargin || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[2]?.totalGrossMargin || 0)}</TableCell>
              <TableCell><strong>{formatCurrency(editedData.projections?.summary?.totalGrossMargin || 0)}</strong></TableCell>
              <TableCell>--</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Investment</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[0]?.investment || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[1]?.investment || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[2]?.investment || 0)}</TableCell>
              <TableCell><strong>{formatCurrency(editedData.projections?.summary?.totalInvestment || 0)}</strong></TableCell>
              <TableCell>--</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Profit</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[0]?.netProfit || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[1]?.netProfit || 0)}</TableCell>
              <TableCell>{formatCurrency(editedData.projections?.years?.[2]?.netProfit || 0)}</TableCell>
              <TableCell><strong>{formatCurrency(editedData.projections?.summary?.totalNetProfit || 0)}</strong></TableCell>
              <TableCell>--</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

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
