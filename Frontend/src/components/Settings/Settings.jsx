import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';

const Settings = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Restaurant Name"
                margin="normal"
                defaultValue="My Restaurant"
              />
              <TextField
                fullWidth
                label="Email Notifications"
                margin="normal"
                defaultValue="notifications@restaurant.com"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Email Notifications"
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Settings
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Inventory Alerts"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Waste Analysis Reports"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Menu Optimization"
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Update System Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings; 