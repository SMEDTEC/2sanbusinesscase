import React from 'react';
import { 
  Box, Typography, Paper, Table, 
  TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Divider, Grid
} from '@mui/material';

const CostPayment = ({ project }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        COST & PAYMENT SCHEDULE
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white' }}>Year</TableCell>
              <TableCell sx={{ color: 'white' }}>Phase</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Regulatory Strategy</TableCell>
              <TableCell>Regulatory Strategy & FDA Pre-Sub</TableCell>
              <TableCell>$60,000</TableCell>
              <TableCell>2025</TableCell>
              <TableCell>3</TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Clinical Start-Up</TableCell>
              <TableCell>Study Start-Up & Site Initiation</TableCell>
              <TableCell>$200,000</TableCell>
              <TableCell>2025</TableCell>
              <TableCell>6</TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Clinical Execution</TableCell>
              <TableCell>Clinical Study Execution</TableCell>
              <TableCell>$700,000</TableCell>
              <TableCell>2025</TableCell>
              <TableCell>7</TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data Management</TableCell>
              <TableCell>Data Analysis & Final Report</TableCell>
              <TableCell>$240,000</TableCell>
              <TableCell>2026</TableCell>
              <TableCell>8</TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Regulatory Submission</TableCell>
              <TableCell>510(k) eSTAR Preparation & Submission</TableCell>
              <TableCell>$150,000</TableCell>
              <TableCell>2026</TableCell>
              <TableCell>9</TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Regulatory Submission</TableCell>
              <TableCell>FDA Review & AI Responses</TableCell>
              <TableCell>$250,000</TableCell>
              <TableCell>2026</TableCell>
              <TableCell>10</TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} sx={{ fontStyle: 'italic', color: '#757575' }}>
                -- INSERT NEW COST ITEMS ABOVE THIS LINE --
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>TOTAL</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #000' }}>$1,600,000</TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Buffer</TableCell>
              <TableCell>25% Contingency</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: '2px solid #000' }}>$2,000,000</TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          How is the contingency spread out?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              The 25% contingency buffer is allocated across different project phases based on risk assessment:
            </Typography>
            <ul>
              <li>Regulatory Strategy & FDA Pre-Sub: 15% of buffer ($60,000)</li>
              <li>Clinical Start-Up & Site Initiation: 20% of buffer ($80,000)</li>
              <li>Clinical Study Execution: 35% of buffer ($140,000)</li>
              <li>Data Analysis & Final Report: 10% of buffer ($40,000)</li>
              <li>Regulatory Submission & FDA Review: 20% of buffer ($80,000)</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              Contingency allocation is based on:
            </Typography>
            <ul>
              <li>Historical data from similar projects</li>
              <li>Risk assessment for each phase</li>
              <li>Complexity of regulatory requirements</li>
              <li>Potential for additional site needs</li>
              <li>Potential for extended FDA review cycles</li>
            </ul>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CostPayment;
