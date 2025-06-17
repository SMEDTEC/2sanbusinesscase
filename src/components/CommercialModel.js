import React from 'react';
import { 
  Box, Typography, Paper, Table, 
  TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Grid, Divider
} from '@mui/material';

const CommercialModel = ({ project }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        COMMERCIAL MODEL
      </Typography>

      {/* Year 1 Commercial Projections */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        YEAR 1 COMMERCIAL PROJECTIONS
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Q1</TableCell>
              <TableCell sx={{ color: 'white' }}>Q2</TableCell>
              <TableCell sx={{ color: 'white' }}>Q3</TableCell>
              <TableCell sx={{ color: 'white' }}>Q4</TableCell>
              <TableCell sx={{ color: 'white' }}>Total</TableCell>
              <TableCell sx={{ color: 'white' }}>% of Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell>$350,000</TableCell>
              <TableCell>$675,787</TableCell>
              <TableCell>$1,120,000</TableCell>
              <TableCell>$1,355,000</TableCell>
              <TableCell>$3,500,787</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>COGS</TableCell>
              <TableCell>$140,000</TableCell>
              <TableCell>$270,315</TableCell>
              <TableCell>$448,000</TableCell>
              <TableCell>$542,000</TableCell>
              <TableCell>$1,400,315</TableCell>
              <TableCell>40%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross Margin</TableCell>
              <TableCell>$210,000</TableCell>
              <TableCell>$405,472</TableCell>
              <TableCell>$672,000</TableCell>
              <TableCell>$813,000</TableCell>
              <TableCell>$2,100,472</TableCell>
              <TableCell>60%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Year 2 Commercial Projections */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        YEAR 2 COMMERCIAL PROJECTIONS
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Q1</TableCell>
              <TableCell sx={{ color: 'white' }}>Q2</TableCell>
              <TableCell sx={{ color: 'white' }}>Q3</TableCell>
              <TableCell sx={{ color: 'white' }}>Q4</TableCell>
              <TableCell sx={{ color: 'white' }}>Total</TableCell>
              <TableCell sx={{ color: 'white' }}>% of Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell>$1,612,500</TableCell>
              <TableCell>$1,854,375</TableCell>
              <TableCell>$1,942,500</TableCell>
              <TableCell>$2,090,625</TableCell>
              <TableCell>$7,500,000</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>COGS</TableCell>
              <TableCell>$645,000</TableCell>
              <TableCell>$741,750</TableCell>
              <TableCell>$777,000</TableCell>
              <TableCell>$836,250</TableCell>
              <TableCell>$3,000,000</TableCell>
              <TableCell>40%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross Margin</TableCell>
              <TableCell>$967,500</TableCell>
              <TableCell>$1,112,625</TableCell>
              <TableCell>$1,165,500</TableCell>
              <TableCell>$1,254,375</TableCell>
              <TableCell>$4,500,000</TableCell>
              <TableCell>60%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Year 3 Commercial Projections */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        YEAR 3 COMMERCIAL PROJECTIONS
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Q1</TableCell>
              <TableCell sx={{ color: 'white' }}>Q2</TableCell>
              <TableCell sx={{ color: 'white' }}>Q3</TableCell>
              <TableCell sx={{ color: 'white' }}>Q4</TableCell>
              <TableCell sx={{ color: 'white' }}>Total</TableCell>
              <TableCell sx={{ color: 'white' }}>% of Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell>$2,700,000</TableCell>
              <TableCell>$2,970,000</TableCell>
              <TableCell>$3,150,000</TableCell>
              <TableCell>$3,180,000</TableCell>
              <TableCell>$12,000,000</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>COGS</TableCell>
              <TableCell>$1,080,000</TableCell>
              <TableCell>$1,188,000</TableCell>
              <TableCell>$1,260,000</TableCell>
              <TableCell>$1,272,000</TableCell>
              <TableCell>$4,800,000</TableCell>
              <TableCell>40%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross Margin</TableCell>
              <TableCell>$1,620,000</TableCell>
              <TableCell>$1,782,000</TableCell>
              <TableCell>$1,890,000</TableCell>
              <TableCell>$1,908,000</TableCell>
              <TableCell>$7,200,000</TableCell>
              <TableCell>60%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* 3 Year Commercial Summary */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        3 YEAR COMMERCIAL SUMMARY
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Metric</TableCell>
              <TableCell sx={{ color: 'white' }}>Year 1</TableCell>
              <TableCell sx={{ color: 'white' }}>Year 2</TableCell>
              <TableCell sx={{ color: 'white' }}>Year 3</TableCell>
              <TableCell sx={{ color: 'white' }}>Total</TableCell>
              <TableCell sx={{ color: 'white' }}>CAGR</TableCell>
              <TableCell sx={{ color: 'white' }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell>$3,500,787</TableCell>
              <TableCell>$7,500,000</TableCell>
              <TableCell>$12,000,000</TableCell>
              <TableCell>$23,000,787</TableCell>
              <TableCell>85%</TableCell>
              <TableCell>Strong growth</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>COGS</TableCell>
              <TableCell>$1,400,315</TableCell>
              <TableCell>$3,000,000</TableCell>
              <TableCell>$4,800,000</TableCell>
              <TableCell>$9,200,315</TableCell>
              <TableCell>85%</TableCell>
              <TableCell>Direct costs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross Margin</TableCell>
              <TableCell>$2,100,472</TableCell>
              <TableCell>$4,500,000</TableCell>
              <TableCell>$7,200,000</TableCell>
              <TableCell>$13,800,472</TableCell>
              <TableCell>85%</TableCell>
              <TableCell>Stable margin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Marketing</TableCell>
              <TableCell>$700,157</TableCell>
              <TableCell>$1,125,000</TableCell>
              <TableCell>$1,440,000</TableCell>
              <TableCell>$3,265,157</TableCell>
              <TableCell>43%</TableCell>
              <TableCell>15% of revenue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Operations</TableCell>
              <TableCell>$350,079</TableCell>
              <TableCell>$600,000</TableCell>
              <TableCell>$840,000</TableCell>
              <TableCell>$1,790,079</TableCell>
              <TableCell>55%</TableCell>
              <TableCell>7% of revenue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>R&D</TableCell>
              <TableCell>$175,039</TableCell>
              <TableCell>$300,000</TableCell>
              <TableCell>$360,000</TableCell>
              <TableCell>$835,039</TableCell>
              <TableCell>43%</TableCell>
              <TableCell>Declining %</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Profit</TableCell>
              <TableCell>$450,000</TableCell>
              <TableCell>$2,000,000</TableCell>
              <TableCell>$3,500,000</TableCell>
              <TableCell>$5,950,000</TableCell>
              <TableCell>179%</TableCell>
              <TableCell>Increasing %</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Market Analysis
            </Typography>
            <Typography variant="body1">
              The COVID/Flu OTC Pen Test targets the growing at-home diagnostics market, with the following key insights:
            </Typography>
            <ul>
              <li>U.S. at-home testing market size: $8.2B in 2025 (projected)</li>
              <li>CAGR for dual-analyte tests: 15.3% (2025-2030)</li>
              <li>Target market penetration: 2.5% in Year 1, growing to 7% by Year 3</li>
              <li>Key competitors: Abbott BinaxNOW, Quidel QuickVue, Ellume</li>
              <li>Competitive advantage: Dual-analyte capability, simplified user experience, higher accuracy</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Distribution Strategy
            </Typography>
            <Typography variant="body1">
              The commercial model assumes the following distribution channels:
            </Typography>
            <ul>
              <li>Retail pharmacy chains (CVS, Walgreens, Rite Aid): 45%</li>
              <li>Mass merchandisers (Walmart, Target): 25%</li>
              <li>Online retail (Amazon, company website): 20%</li>
              <li>Healthcare providers and clinics: 10%</li>
            </ul>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Pricing strategy:
            </Typography>
            <ul>
              <li>MSRP: $29.99 per test</li>
              <li>Wholesale price: $17.99 per test</li>
              <li>Volume discounts available for orders >10,000 units</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommercialModel;
