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
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

const WasteAnalysis = () => {
  const wasteData = [
    {
      id: 1,
      category: 'Vegetables',
      amount: 25,
      value: 150,
      reason: 'Overstock',
      status: 'High',
      action: 'Reduce Order',
    },
    {
      id: 2,
      category: 'Dairy',
      amount: 15,
      value: 200,
      reason: 'Expiration',
      status: 'Medium',
      action: 'Check Storage',
    },
    {
      id: 3,
      category: 'Meat',
      amount: 10,
      value: 300,
      reason: 'Power Outage',
      status: 'Low',
      action: 'Backup Power',
    },
    {
      id: 4,
      category: 'Grains',
      amount: 5,
      value: 50,
      reason: 'Damaged',
      status: 'Low',
      action: 'Improve Storage',
    },
  ];

  const chartData = [
    { name: 'Mon', waste: 45, cost: 150 },
    { name: 'Tue', waste: 35, cost: 120 },
    { name: 'Wed', waste: 55, cost: 180 },
    { name: 'Thu', waste: 25, cost: 90 },
    { name: 'Fri', waste: 40, cost: 140 },
    { name: 'Sat', waste: 60, cost: 200 },
    { name: 'Sun', waste: 30, cost: 110 },
  ];

  const pieData = [
    { name: 'Vegetables', value: 35 },
    { name: 'Dairy', value: 25 },
    { name: 'Meat', value: 20 },
    { name: 'Grains', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      default:
        return 'default';
    }
  };

  const summaryCards = [
    {
      title: 'Total Waste This Week',
      value: '290 kg',
      change: '-12%',
      trend: 'down',
    },
    {
      title: 'Waste Cost',
      value: '$990',
      change: '-8%',
      trend: 'down',
    },
    {
      title: 'Most Wasted Item',
      value: 'Vegetables',
      change: '+5%',
      trend: 'up',
    },
  ];

  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom fontWeight="600" color="primary">
        Waste Analysis
      </Typography>

      <Grid container spacing={3}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="dashboard-card">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {card.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  {card.trend === 'down' ? (
                    <TrendingDownIcon color="success" />
                  ) : (
                    <TrendingUpIcon color="error" />
                  )}
                  <Typography
                    variant="body2"
                    color={card.trend === 'down' ? 'success.main' : 'error.main'}
                    sx={{ ml: 1 }}
                  >
                    {card.change} vs last week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Waste Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="waste"
                    stroke="#ff9800"
                    fill="#ff980033"
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stroke="#2196f3"
                    fill="#2196f333"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Waste Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Waste Details
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Amount (kg)</TableCell>
                      <TableCell align="right">Value ($)</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell>Recommended Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wasteData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell align="right">{item.amount}</TableCell>
                        <TableCell align="right">${item.value}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                            size="small"
                            icon={item.status === 'Low' ? <CheckCircleIcon /> : <WarningIcon />}
                          />
                        </TableCell>
                        <TableCell>{item.action}</TableCell>
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

export default WasteAnalysis; 