import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  MenuItem,
  Select,
  Alert,
  Snackbar
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Delete as DeleteIcon } from '@mui/icons-material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const CATEGORIES = ['Sweet', 'Bread', 'Main Course', 'Starter'];

const getStatusColor = (popularity, profitMargin) => {
  if (popularity > 60 && profitMargin > 60) return 'success';
  if (popularity > 30 || profitMargin > 30) return 'warning';
  return 'error';
};

const MenuOptimization = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    menuItem: '',
    price: '',
    category: '',
    description: '',
    popularity: 50,
    sales: 0,
    profitMargin: 40
  });
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/v1/menu", {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          // Transform backend data to frontend format
          const transformedData = data.data.map(item => ({
            id: item._id,
            name: item.menuItem,
            category: item.category,
            price: item.price,
            description: item.description,
            // Use actual values from backend or default if not available
            popularity: item.popularity !== undefined ? item.popularity : 50,
            sales: item.sales !== undefined ? item.sales : 0,
            profitMargin: item.profitMargin !== undefined ? item.profitMargin : 40
          }));
          setMenuItems(transformedData);
        }
      } else {
        throw new Error("Failed to fetch menu items");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setError("Failed to load menu items. Please try again later.");
      setShowAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric fields to numbers
    if (name === 'price' || name === 'popularity' || name === 'sales' || name === 'profitMargin') {
      setNewItem({ ...newItem, [name]: value === '' ? '' : Number(value) });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const validateInput = () => {
    if (!newItem.menuItem.trim()) {
      setError('Menu item name is required');
      setShowAlert(true);
      return false;
    }
    if (!newItem.category) {
      setError('Category is required');
      setShowAlert(true);
      return false;
    }
    if (!newItem.price || isNaN(newItem.price) || Number(newItem.price) <= 0) {
      setError('Valid price is required');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const addMenuItem = async () => {
    if (!validateInput()) return;

    // Prepare data for backend
    const itemToAdd = {
      menuItem: newItem.menuItem,
      price: Number(newItem.price),
      category: newItem.category,
      description: newItem.description || '',
      popularity: newItem.popularity,
      sales: newItem.sales,
      profitMargin: newItem.profitMargin
    };

    try {
      const response = await fetch("http://localhost:8001/api/v1/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToAdd),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }

      const data = await response.json();
      if (data.data) {
        // Transform the returned data
        const transformedData = data.data.map(item => ({
          id: item._id,
          name: item.menuItem,
          category: item.category,
          price: item.price,
          description: item.description,
          popularity: item.popularity !== undefined ? item.popularity : 50,
          sales: item.sales !== undefined ? item.sales : 0,
          profitMargin: item.profitMargin !== undefined ? item.profitMargin : 40
        }));
        setMenuItems(transformedData);
      }
      
      // Reset form after successful addition
      setNewItem({
        menuItem: '',
        price: '',
        category: '',
        description: '',
        popularity: 50,
        sales: 0,
        profitMargin: 40
      });
      
    } catch (error) {
      console.error("Error adding menu item:", error);
      setError("Failed to add menu item. Please try again.");
      setShowAlert(true);
    }
  };

  const removeMenuItem = async (id) => {
    // Find the item name for deletion
    const itemToDelete = menuItems.find(item => item.id === id);
    if (!itemToDelete) return;

    try {
      // Backend expects menuItem name, not ID
      const response = await fetch(`http://localhost:8001/api/v1/menu/${encodeURIComponent(itemToDelete.name)}`, {
        method: "DELETE",
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }

      const data = await response.json();
      if (data.data) {
        // Transform the returned data
        const transformedData = data.data.map(item => ({
          id: item._id,
          name: item.menuItem,
          category: item.category,
          price: item.price,
          description: item.description,
          popularity: item.popularity !== undefined ? item.popularity : 50,
          sales: item.sales !== undefined ? item.sales : 0,
          profitMargin: item.profitMargin !== undefined ? item.profitMargin : 40
        }));
        setMenuItems(transformedData);
      } else {
        // Fallback: remove the item locally if backend doesn't return updated data
        setMenuItems(menuItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      setError("Failed to delete menu item. Please try again.");
      setShowAlert(true);
    }
  };

  // Calculate category data for pie chart
  const categoryData = menuItems.reduce((acc, item) => {
    const found = acc.find((c) => c.name === item.category);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: item.category, value: 1 });
    }
    return acc;
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="primary" gutterBottom>Menu Optimization</Typography>
      
      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Add Menu Item */}
      <Card sx={{ p: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Add New Menu Item</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Menu Item"
                name="menuItem"
                value={newItem.menuItem}
                onChange={handleInputChange}
                fullWidth
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Price"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
                fullWidth
                size="small"
                type="number"
                inputProps={{ min: 0, step: "0.01" }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                fullWidth
                size="small"
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
                displayEmpty
                required
              >
                <MenuItem value="" disabled>Select Category</MenuItem>
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Description"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                fullWidth
                size="small"
                multiline
                rows={1}
              />
            </Grid>
            
            {/* Additional fields for metrics */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Popularity (%)"
                name="popularity"
                value={newItem.popularity}
                onChange={handleInputChange}
                fullWidth
                size="small"
                type="number"
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Sales (Units)"
                name="sales"
                value={newItem.sales}
                onChange={handleInputChange}
                fullWidth
                size="small"
                type="number"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Profit Margin (%)"
                name="profitMargin"
                value={newItem.profitMargin}
                onChange={handleInputChange}
                fullWidth
                size="small"
                type="number"
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
          </Grid>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }} 
            onClick={addMenuItem}
          >
            Add Item
          </Button>
        </CardContent>
      </Card>

      {/* Menu Performance Analysis */}
      <Card sx={{ p: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Menu Performance Analysis</Typography>
          {menuItems.length === 0 ? (
            <Typography color="textSecondary" align="center" sx={{ py: 3 }}>
              No menu items available. Add some items to see the analysis.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Popularity</TableCell>
                    <TableCell>Sales</TableCell>
                    <TableCell>Profit Margin</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₹{item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={Number(item.popularity)} />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            {item.popularity}%
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{item.sales}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={Number(item.profitMargin)} color="secondary" />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            {item.profitMargin}%
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            item.popularity > 60 && item.profitMargin > 60
                              ? 'Good'
                              : item.popularity > 30 || item.profitMargin > 30
                              ? 'Average'
                              : 'Bad'
                          }
                          color={getStatusColor(item.popularity, item.profitMargin)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="error" 
                          onClick={() => removeMenuItem(item.id)}
                          aria-label="delete item"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Category Distribution Pie Chart */}
      {menuItems.length > 0 && (
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Menu Category Distribution</Typography>
            <Box display="flex" justifyContent="center">
              <PieChart width={400} height={300}>
                <Pie 
                  data={categoryData} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  fill="#8884d8" 
                  dataKey="value" 
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`₹{value} items`, 'Quantity']} />
              </PieChart>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default MenuOptimization;