import { useState, useEffect } from 'react';
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  LinearProgress,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Tooltip
} from '@mui/material';
import { Delete, Refresh, TrendingUp, TrendingDown, AttachMoney } from '@mui/icons-material';
import { ReactComponent as Rupee } from '../../icons/rupee-sign-svgrepo-com.svg';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [currentSales, setCurrentSales] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [metrics, setMetrics] = useState({ totalSales: 0, avgSales: 0, salesChange: 0 });

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  
  const todayDate = formatDate(new Date());
  const API_BASE_URL = 'http://localhost:8001/api/v1/dashboard';

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/sales`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sales data');
      }
      
      const data = await response.json();
      setSalesData(data.data || []);
      
      // Load today's sales
      const todayEntry = (data.data || []).find((entry) => entry.date === todayDate);
      setTodaySales(todayEntry ? todayEntry.sales : 0);
      
      // Fetch metrics
      await fetchMetrics();
      
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load sales data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch metrics
  const fetchMetrics = async () => {
    try {
      const [metricsResponse, changeResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/sales/metrics`),
        fetch(`${API_BASE_URL}/sales/change`)
      ]);
      
      if (!metricsResponse.ok || !changeResponse.ok) {
        throw new Error('Failed to fetch metrics');
      }
      
      const metricsData = await metricsResponse.json();
      const changeData = await changeResponse.json();
      
      setMetrics({
        totalSales: metricsData.data.totalSales,
        avgSales: metricsData.data.avgSales,
        salesChange: changeData.data.salesChange
      });
    } catch (err) {
      console.error('Error fetching metrics:', err);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchData();
  }, []);

  // Function to add sales
  const addSales = async () => {
    if (currentSales <= 0) {
      setNotification({
        open: true,
        message: 'Please enter a valid sales amount',
        severity: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: todayDate, sales: Number(currentSales) })
      });

      if (!response.ok) {
        throw new Error('Failed to add sales');
      }

      const data = await response.json();
      setSalesData(data.data);
      
      // Update today's sales
      const todayEntry = data.data.find((entry) => entry.date === todayDate);
      setTodaySales(todayEntry ? todayEntry.sales : 0);
      
      // Fetch updated metrics
      await fetchMetrics();
      
      setCurrentSales(0);
      setNotification({
        open: true,
        message: 'Sales added successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding sales:', error);
      setNotification({
        open: true,
        message: 'Failed to add sales. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a day's sales
  const removeSales = async (date) => {
    try {
      console.log('Attempting to remove date:', date);
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sales/${date}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        console.error('Server responded with:', await response.text());
        throw new Error('Failed to remove sales');
      }
      
      // Rest of your code...

      const data = await response.json();
      setSalesData(data.data);
      
      // Update today's sales if deleted entry was today
      if (date === todayDate) {
        setTodaySales(0);
      }
      
      // Fetch updated metrics
      await fetchMetrics();
      
      setNotification({
        open: true,
        message: 'Sales removed successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error removing sales:', error);
      setNotification({
        open: true,
        message: 'Failed to remove sales. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Format currency
  const formatCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <Box className="fade-in" sx={{ height: '100%', width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600" color="primary">
        Dashboard Overview
      </Typography>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={notification.severity} onClose={handleNotificationClose}>
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Sales input section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Today's Sales
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Sales Amount"
            type="number"
            value={currentSales}
            onChange={(e) => setCurrentSales(Number(e.target.value))}
            variant="outlined"
            InputProps={{
              startAdornment: <Rupee style={{ width: '18px', height: '18px' }} />,
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={addSales}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Adding...' : 'Add Sales'}
          </Button>
          <Tooltip title="Refresh Data">
            <IconButton onClick={fetchData} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Error display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Sales
              </Typography>
              <Typography variant="h4" color="primary">
                {formatCurrency(todaySales)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h4" color="primary">
                {formatCurrency(metrics.totalSales)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Daily Sales
              </Typography>
              <Typography variant="h4" color="primary">
                {formatCurrency(Number(metrics.avgSales))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              {loading && salesData.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : salesData.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                  No sales data available. Add today's sales to get started.
                </Typography>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      name="Sales"
                      stroke={metrics.salesChange >= 0 ? "#4caf50" : "#f44336"}
                      fill={metrics.salesChange >= 0 ? "#4caf5015" : "#f4433615"}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Total Sales: {formatCurrency(metrics.totalSales)}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Avg Sales: {formatCurrency(Number(metrics.avgSales))}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: metrics.salesChange >= 0 ? 'success.main' : 'error.main',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {metrics.salesChange >= 0 ? (
                      <TrendingUp sx={{ mr: 0.5 }} />
                    ) : (
                      <TrendingDown sx={{ mr: 0.5 }} />
                    )}
                    {metrics.salesChange >= 0
                      ? `+${formatCurrency(metrics.salesChange)}`
                      : formatCurrency(metrics.salesChange)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last day
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(metrics.totalSales % 100) + 10}
                  sx={{ height: 8, borderRadius: 4 }}
                  color={metrics.salesChange >= 0 ? "success" : "error"}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sales History */}
      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Sales History
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {loading && salesData.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : salesData.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
            No sales history available.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {salesData.map((entry) => (
              <Grid item xs={12} sm={6} md={4} key={entry.date}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">
                        {entry.name} ({entry.date})
                      </Typography>
                      <IconButton 
                        color="error" 
                        onClick={() => removeSales(entry.date)}
                        disabled={loading}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    <Typography variant="h5" color="primary">
                      {formatCurrency(entry.sales)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;