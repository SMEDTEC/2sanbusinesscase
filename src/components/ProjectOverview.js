import React from 'react';
import { 
  Box, Typography, Grid, Paper, Table, 
  TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Card, CardMedia
} from '@mui/material';

const ProjectOverview = ({ project }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        PROJECT OVERVIEW
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Project Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Owner</TableCell>
              <TableCell sx={{ color: 'white' }}>Manufacturer</TableCell>
              <TableCell sx={{ color: 'white' }}>Region</TableCell>
              <TableCell sx={{ color: 'white' }}>Product Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Objective</TableCell>
              <TableCell sx={{ color: 'white' }}>Target Market</TableCell>
              <TableCell sx={{ color: 'white' }}>Key Features</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell>COVID/Flu OTC Pen Test 510(k) Submission</TableCell>
              <TableCell>Sherif Elkadem</TableCell>
              <TableCell>Hangzhou Assure Tech</TableCell>
              <TableCell>USA</TableCell>
              <TableCell>Medical Device</TableCell>
              <TableCell>Dual detection self-test for COVID-19 and influenza A/B</TableCell>
              <TableCell>Obtain FDA clearance and launch OTC</TableCell>
              <TableCell>U.S. consumers / retailers</TableCell>
              <TableCell>Dual-analyte detection, at-home usability, rapid results</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" component="h3" gutterBottom>
        2San Pen Test Platform
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="/pen-test-diagram.png"
              alt="2San Pen Test Platform Diagram"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="/pen-test-packaging.png"
              alt="2San Pen Test Packaging"
            />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              A simple three step procedure
            </Typography>
            <ol>
              <li>Pull out the swab and remove hygiene cap - swab nostrils - then push the swab into the buffer cap.</li>
              <li>As the swab is pushed into the buffer cap it breaks through the seal and mixes with the buffer solution.</li>
              <li>The fins on the swab act as a pressure valve ensuring no buffer leaks out once the top seal is burst.</li>
            </ol>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Product benefits
            </Typography>
            <ol>
              <li>Designed with usability in mind.</li>
              <li>All in one design:
                <ul>
                  <li>Convenient, quick and easy to use.</li>
                  <li>Intuitive design.</li>
                  <li>Simple operation, reduces human error.</li>
                </ul>
              </li>
              <li>Power of simultaneous dual detection.</li>
              <li>Results in minutes with exceptional sensitivity & specificity.</li>
            </ol>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectOverview;
