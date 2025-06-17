import React from 'react';
import { 
  Box, Typography, Paper, Table, 
  TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Grid, Chip
} from '@mui/material';

const RiskAssumptions = ({ project }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        RISK & ASSUMPTIONS
      </Typography>

      {/* Risk Assessment Table */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        Risk Assessment Matrix
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Risk ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Risk Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Probability (1-5)</TableCell>
              <TableCell sx={{ color: 'white' }}>Impact (1-5)</TableCell>
              <TableCell sx={{ color: 'white' }}>Risk Score</TableCell>
              <TableCell sx={{ color: 'white' }}>Mitigation Strategy</TableCell>
              <TableCell sx={{ color: 'white' }}>Owner</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>R-001</TableCell>
              <TableCell>Regulatory</TableCell>
              <TableCell>FDA may request additional clinical data beyond what is planned</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <Chip label="0.8" color="error" size="small" />
              </TableCell>
              <TableCell>Pre-submission meeting to align on requirements; contingency budget for additional studies</TableCell>
              <TableCell>Regulatory Affairs</TableCell>
              <TableCell>Open</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>R-002</TableCell>
              <TableCell>Clinical</TableCell>
              <TableCell>Slow patient enrollment in clinical studies</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>
                <Chip label="0.6" color="warning" size="small" />
              </TableCell>
              <TableCell>Multi-site recruitment strategy; enrollment incentives; backup sites identified</TableCell>
              <TableCell>Clinical Operations</TableCell>
              <TableCell>Open</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>R-003</TableCell>
              <TableCell>Technical</TableCell>
              <TableCell>Usability testing reveals design issues requiring modifications</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>
                <Chip label="0.6" color="warning" size="small" />
              </TableCell>
              <TableCell>Early formative usability testing; rapid design iteration capability</TableCell>
              <TableCell>R&D</TableCell>
              <TableCell>Open</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>R-004</TableCell>
              <TableCell>Supply Chain</TableCell>
              <TableCell>Component shortages affecting manufacturing scale-up</TableCell>
              <TableCell>2</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <Chip label="0.5" color="warning" size="small" />
              </TableCell>
              <TableCell>Secondary supplier qualification; strategic inventory build</TableCell>
              <TableCell>Operations</TableCell>
              <TableCell>Open</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>R-005</TableCell>
              <TableCell>Commercial</TableCell>
              <TableCell>Competitive product launch before market entry</TableCell>
              <TableCell>3</TableCell>
              <TableCell>3</TableCell>
              <TableCell>
                <Chip label="0.45" color="warning" size="small" />
              </TableCell>
              <TableCell>Competitive intelligence monitoring; differentiation strategy</TableCell>
              <TableCell>Marketing</TableCell>
              <TableCell>Open</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>R-006</TableCell>
              <TableCell>Financial</TableCell>
              <TableCell>Project costs exceed budget by >15%</TableCell>
              <TableCell>2</TableCell>
              <TableCell>4</TableCell>
              <TableCell>
                <Chip label="0.4" color="warning" size="small" />
              </TableCell>
              <TableCell>25% contingency buffer; monthly financial reviews; stage-gate approach</TableCell>
              <TableCell>Finance</TableCell>
              <TableCell>Open</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>R-007</TableCell>
              <TableCell>Regulatory</TableCell>
              <TableCell>Changes in regulatory guidelines during development</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>
                <Chip label="0.3" color="success" size="small" />
              </TableCell>
              <TableCell>Regulatory intelligence monitoring; flexible protocol design</TableCell>
              <TableCell>Regulatory Affairs</TableCell>
              <TableCell>Open</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Key Assumptions */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        Key Assumptions
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Regulatory Assumptions
            </Typography>
            <ul>
              <li>510(k) pathway is appropriate for this dual-analyte test</li>
              <li>Predicate devices are suitable for comparison</li>
              <li>FDA review cycle will be completed within standard timeframes</li>
              <li>No additional clinical data beyond planned studies will be required</li>
              <li>OTC classification can be obtained with planned human factors studies</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Clinical Assumptions
            </Typography>
            <ul>
              <li>Clinical study enrollment targets can be met within timeline</li>
              <li>Sensitivity and specificity will meet or exceed predicate devices</li>
              <li>Study sites will be available and operational during planned timeframes</li>
              <li>Sample collection will be representative of intended use population</li>
              <li>No significant adverse events will occur during clinical testing</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Commercial Assumptions
            </Typography>
            <ul>
              <li>Market demand for dual COVID/Flu testing will continue</li>
              <li>Pricing strategy will be competitive and acceptable to payers</li>
              <li>Distribution channels will be secured prior to launch</li>
              <li>Manufacturing capacity will meet projected demand</li>
              <li>No significant new competitors will enter market before launch</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Technical Assumptions
            </Typography>
            <ul>
              <li>Current design will pass all verification and validation testing</li>
              <li>Manufacturing transfer will be completed without significant issues</li>
              <li>Shelf-life stability will meet 18-month target</li>
              <li>Quality system will meet FDA requirements</li>
              <li>No significant design changes will be needed after usability testing</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>

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
