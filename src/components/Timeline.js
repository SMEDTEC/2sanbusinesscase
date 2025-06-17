import React from 'react';
import { 
  Box, Typography, Paper, Table, 
  TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Grid
} from '@mui/material';

const Timeline = ({ project }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        PROJECT TIMELINE
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Phase</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Start Date</TableCell>
              <TableCell sx={{ color: 'white' }}>End Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Duration</TableCell>
              <TableCell sx={{ color: 'white' }}>Owner</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Phase 1 */}
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Phase 1</TableCell>
              <TableCell>Initial Planning & Contracting</TableCell>
              <TableCell>14/06/2025</TableCell>
              <TableCell>05/08/2025</TableCell>
              <TableCell>52</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1a</TableCell>
              <TableCell>Develop business case and approval by board</TableCell>
              <TableCell>14/05/2025</TableCell>
              <TableCell>30/05/2025</TableCell>
              <TableCell>16</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1b</TableCell>
              <TableCell>Define project scope and key deliverables</TableCell>
              <TableCell>01/06/2025</TableCell>
              <TableCell>05/06/2025</TableCell>
              <TableCell>4</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1c</TableCell>
              <TableCell>Establish internal Teams and External team and roles</TableCell>
              <TableCell>06/06/2025</TableCell>
              <TableCell>08/06/2025</TableCell>
              <TableCell>2</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1d</TableCell>
              <TableCell>Ensure Manufacturer onboard with providing FULL access to documentation</TableCell>
              <TableCell>09/06/2025</TableCell>
              <TableCell>12/06/2025</TableCell>
              <TableCell>3</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1e</TableCell>
              <TableCell>Identify target predicate device and existing labeling claim strategy</TableCell>
              <TableCell>13/06/2025</TableCell>
              <TableCell>17/06/2025</TableCell>
              <TableCell>4</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1f</TableCell>
              <TableCell>Engage legal team for NDA and contract review</TableCell>
              <TableCell>13/06/2025</TableCell>
              <TableCell>17/06/2025</TableCell>
              <TableCell>4</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1g</TableCell>
              <TableCell>Collect quotations from CROs and shortlist vendors</TableCell>
              <TableCell>18/06/2025</TableCell>
              <TableCell>22/06/2025</TableCell>
              <TableCell>4</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1h</TableCell>
              <TableCell>Finalize and sign contracts with CRO</TableCell>
              <TableCell>23/06/2025</TableCell>
              <TableCell>05/08/2025</TableCell>
              <TableCell>43</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Phase 2 */}
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Phase 2</TableCell>
              <TableCell>Technical File Transfer & LOA</TableCell>
              <TableCell>06/08/2025</TableCell>
              <TableCell>22/08/2025</TableCell>
              <TableCell>16</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2a</TableCell>
              <TableCell>Request device dossier from manufacturer (design validation, QMS)</TableCell>
              <TableCell>06/08/2025</TableCell>
              <TableCell>08/08/2025</TableCell>
              <TableCell>2</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2b</TableCell>
              <TableCell>Verify completeness of existing technical/bench data</TableCell>
              <TableCell>13/08/2025</TableCell>
              <TableCell>20/08/2025</TableCell>
              <TableCell>7</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2c</TableCell>
              <TableCell>Request Letter of Authorization (LOA) for referencing manufacturer data</TableCell>
              <TableCell>13/08/2025</TableCell>
              <TableCell>15/08/2025</TableCell>
              <TableCell>2</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2d</TableCell>
              <TableCell>Begin building device description & FDA draft FDA format</TableCell>
              <TableCell>16/08/2025</TableCell>
              <TableCell>22/08/2025</TableCell>
              <TableCell>6</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Phase 3 */}
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Phase 3</TableCell>
              <TableCell>CRO Engagement & Regulatory Strategy</TableCell>
              <TableCell>23/08/2025</TableCell>
              <TableCell>20/09/2025</TableCell>
              <TableCell>28</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>Not Started</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3a</TableCell>
              <TableCell>Internal CRO kickoff meeting & data handoff</TableCell>
              <TableCell>23/08/2025</TableCell>
              <TableCell>26/08/2025</TableCell>
              <TableCell>3</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3b</TableCell>
              <TableCell>CRO reviews existing data & prepares gaps for 510(k) or EUA approach</TableCell>
              <TableCell>27/08/2025</TableCell>
              <TableCell>05/09/2025</TableCell>
              <TableCell>9</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3c</TableCell>
              <TableCell>Define regulatory path and complete FDA language, labeling</TableCell>
              <TableCell>06/09/2025</TableCell>
              <TableCell>13/09/2025</TableCell>
              <TableCell>7</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3d</TableCell>
              <TableCell>FDA usability study if needed for OTC</TableCell>
              <TableCell>14/09/2025</TableCell>
              <TableCell>20/09/2025</TableCell>
              <TableCell>6</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Phase 4 */}
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Phase 4</TableCell>
              <TableCell>Pre-Sub Prep & FDA Meeting</TableCell>
              <TableCell>21/09/2025</TableCell>
              <TableCell>05/11/2025</TableCell>
              <TableCell>45</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>Not Started</TableCell>
            </TableRow>

            {/* Phase 5 */}
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Phase 5</TableCell>
              <TableCell>Final Protocol Design & IRB Submission</TableCell>
              <TableCell>06/11/2025</TableCell>
              <TableCell>25/11/2025</TableCell>
              <TableCell>19</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>Not Started</TableCell>
            </TableRow>

            {/* Phase 6 */}
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Phase 6</TableCell>
              <TableCell>Study Startup & Logistics</TableCell>
              <TableCell>26/11/2025</TableCell>
              <TableCell>03/01/2026</TableCell>
              <TableCell>38</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>Not Started</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Gantt Chart Visualization
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ width: '100%', minWidth: '800px', mt: 2, mb: 2 }}>
            {/* Simple Gantt Chart Implementation */}
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Box sx={{ width: '200px', fontWeight: 'bold' }}>Phase</Box>
              <Box sx={{ flex: 1, display: 'flex' }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <Box key={i} sx={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}>
                    {`M${i + 1}`}
                  </Box>
                ))}
              </Box>
            </Box>
            
            {/* Phase 1 */}
            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
              <Box sx={{ width: '200px' }}>Phase 1: Planning</Box>
              <Box sx={{ flex: 1, display: 'flex', height: '30px', position: 'relative' }}>
                <Box sx={{ position: 'absolute', left: '0px', width: '100px', height: '20px', backgroundColor: '#1976d2', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                  52 days
                </Box>
              </Box>
            </Box>
            
            {/* Phase 2 */}
            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
              <Box sx={{ width: '200px' }}>Phase 2: Tech Transfer</Box>
              <Box sx={{ flex: 1, display: 'flex', height: '30px', position: 'relative' }}>
                <Box sx={{ position: 'absolute', left: '100px', width: '80px', height: '20px', backgroundColor: '#2196f3', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                  16 days
                </Box>
              </Box>
            </Box>
            
            {/* Phase 3 */}
            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
              <Box sx={{ width: '200px' }}>Phase 3: Regulatory</Box>
              <Box sx={{ flex: 1, display: 'flex', height: '30px', position: 'relative' }}>
                <Box sx={{ position: 'absolute', left: '180px', width: '140px', height: '20px', backgroundColor: '#03a9f4', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                  28 days
                </Box>
              </Box>
            </Box>
            
            {/* Phase 4 */}
            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
              <Box sx={{ width: '200px' }}>Phase 4: FDA Meeting</Box>
              <Box sx={{ flex: 1, display: 'flex', height: '30px', position: 'relative' }}>
                <Box sx={{ position: 'absolute', left: '320px', width: '225px', height: '20px', backgroundColor: '#00bcd4', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                  45 days
                </Box>
              </Box>
            </Box>
            
            {/* Phase 5 */}
            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
              <Box sx={{ width: '200px' }}>Phase 5: Protocol Design</Box>
              <Box sx={{ flex: 1, display: 'flex', height: '30px', position: 'relative' }}>
                <Box sx={{ position: 'absolute', left: '545px', width: '95px', height: '20px', backgroundColor: '#009688', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                  19 days
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Note: This is a simplified Gantt chart visualization. In a production environment, this would be enhanced with interactive features, dependencies, and critical path highlighting.
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Critical Path Analysis
            </Typography>
            <Typography variant="body1">
              The critical path for this project includes:
            </Typography>
            <ul>
              <li>Initial Planning & Contracting (Phase 1): 52 days</li>
              <li>Technical File Transfer & LOA (Phase 2): 16 days</li>
              <li>CRO Engagement & Regulatory Strategy (Phase 3): 28 days</li>
              <li>Pre-Sub Prep & FDA Meeting (Phase 4): 45 days</li>
              <li>Final Protocol Design & IRB Submission (Phase 5): 19 days</li>
            </ul>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Total critical path duration: 160 days
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Timeline Risks & Mitigations
            </Typography>
            <Typography variant="body1">
              Key timeline risks include:
            </Typography>
            <ul>
              <li><strong>FDA Pre-Sub Meeting Scheduling:</strong> Allow 60-day buffer for FDA scheduling</li>
              <li><strong>IRB Review Cycles:</strong> Submit early and prepare for potential revisions</li>
              <li><strong>Clinical Site Recruitment:</strong> Begin site identification during protocol development</li>
              <li><strong>Technical File Completeness:</strong> Early gap analysis and manufacturer engagement</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Timeline;
