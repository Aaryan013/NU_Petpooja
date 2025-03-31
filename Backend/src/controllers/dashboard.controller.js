import { asynchandelar } from '../utils/asyncHendelar.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Sales } from '../models/dashboard.model.js';

// Fetch all sales data
export const fetchSalesData = asynchandelar(async (req, res) => {
  const salesData = await Sales.find().sort({ date: 1 });
  res.json(new ApiResponse(200, salesData, 'Sales data fetched successfully'));
});

// Add or update sales data for a specific date
export const addOrUpdateSalesData = asynchandelar(async (req, res) => {
    const { date, sales } = req.body;
    if (!date || sales === undefined) {
      throw new ApiError(400, 'Date and sales are required');
    }
  
    // Log the incoming date for debugging
    console.log('Received date:', date);
  
    const existingEntry = await Sales.findOne({ date });
  
    if (existingEntry) {
      existingEntry.sales += Number(sales);
      await existingEntry.save();
    } else {
      const parsedDate = new Date(date);
      const name = parsedDate.toLocaleDateString('en-US', { weekday: 'short' });
      const newEntry = new Sales({
        date,
        name,
        sales: Number(sales)
      });
      await newEntry.save();
    }
  
    const updatedSalesData = await Sales.find().sort({ date: 1 });
    res.json(new ApiResponse(200, updatedSalesData, 'Sales data added/updated successfully'));
  });

// Remove sales data for a specific date
// In removeSalesData function
export const removeSalesData = asynchandelar(async (req, res) => {
    const { date } = req.params;
    
    if (!date) {
      throw new ApiError(400, 'Date parameter is required');
    }
  
    // Add this debugging line
    console.log('Attempting to remove sales for date:', date);
    
    // Use a more flexible query to find the entry
    const entryToRemove = await Sales.findOne({ 
      date: { $regex: new RegExp(date, 'i') } 
    });
    
    if (!entryToRemove) {
      // Add more debugging
      console.log('No entry found for date:', date);
      const allEntries = await Sales.find();
      console.log('Available dates:', allEntries.map(e => e.date));
      
      throw new ApiError(404, 'Sales data not found for the specified date');
    }
  
    await Sales.findByIdAndDelete(entryToRemove._id);
  
    const updatedSalesData = await Sales.find().sort({ date: 1 });
    res.json(new ApiResponse(200, updatedSalesData, 'Sales data removed successfully'));
  });

// Get total and average sales
export const getSalesMetrics = asynchandelar(async (req, res) => {
  const salesData = await Sales.find();
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const avgSales = salesData.length ? (totalSales / salesData.length).toFixed(2) : 0;
  res.json(new ApiResponse(200, { totalSales, avgSales }, 'Sales metrics fetched successfully'));
});

// Get sales change compared to the previous day
export const getSalesChange = asynchandelar(async (req, res) => {
  const salesData = await Sales.find().sort({ date: 1 });
  const lastEntry = salesData[salesData.length - 1] || { sales: 0 };
  const prevEntry = salesData.length > 1 ? salesData[salesData.length - 2] : { sales: 0 };
  res.json(new ApiResponse(200, { salesChange: lastEntry.sales - prevEntry.sales }, 'Sales change fetched successfully'));
});