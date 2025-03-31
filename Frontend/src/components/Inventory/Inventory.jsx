import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

const Inventory = () => {
  const inventoryItems = [
    {
      id: 1,
      name: 'Tomatoes',
      quantity: 50,
      unit: 'kg',
      status: 'In Stock',
      trend: 'up',
      lastUpdated: '2024-02-20',
    },
    {
      id: 2,
      name: 'Chicken Breast',
      quantity: 30,
      unit: 'kg',
      status: 'Low Stock',
      trend: 'down',
      lastUpdated: '2024-02-20',
    },
    // Add more items as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom fontWeight="600" color="primary">
        Inventory Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className="dashboard-card">
            <CardContent>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Trend</TableCell>
                      <TableCell align="right">Last Updated</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {item.trend === 'up' ? (
                            <TrendingUpIcon color="success" />
                          ) : (
                            <TrendingDownIcon color="error" />
                          )}
                        </TableCell>
                        <TableCell align="right">{item.lastUpdated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inventory; 