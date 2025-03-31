import Menu from '../models/MenuOptimization.model.js';
import catchAsync from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

// Example middleware logic for protecting routes
export const protect = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Get all menu items
export const getAllMenuItems = catchAsync(async (req, res, next) => {
  const menuItems = await Menu.find();

  res.status(200).json({
    status: 'success',
    results: menuItems.length,
    data: menuItems
  });
});

// Create a new menu item
export const createMenuItem = catchAsync(async (req, res, next) => {
  // Extract all fields from request body
  const { menuItem, price, category, description, popularity, sales, profitMargin } = req.body;
    console.log(req.body);
    
  // Create new menu item with all available fields
  const newMenuItem = await Menu.create({
    menuItem,
    price,
    category,
    description,
    // Use provided values or fall back to schema defaults
    popularity: popularity !== undefined ? popularity : undefined,
    sales: sales !== undefined ? sales : undefined,
    profitMargin: profitMargin !== undefined ? profitMargin : undefined
  });

  // Fetch all menu items after adding new one
  const menuItems = await Menu.find();

  res.status(201).json({
    status: 'success',
    data: menuItems
  });
});

// Get a specific menu item
export const getMenuItem = catchAsync(async (req, res, next) => {
  const menuItem = await Menu.findOne({ menuItem: req.params.name });

  if (!menuItem) {
    return next(new AppError('No menu item found with that name', 404));
  }

  res.status(200).json({
    status: 'success',
    data: menuItem
  });
});

// Update a menu item
export const updateMenuItem = catchAsync(async (req, res, next) => {
  const menuItem = await Menu.findOneAndUpdate(
    { menuItem: req.params.name },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!menuItem) {
    return next(new AppError('No menu item found with that name', 404));
  }

  res.status(200).json({
    status: 'success',
    data: menuItem
  });
});

// Delete a menu item
export const deleteMenuItem = catchAsync(async (req, res, next) => {
  const menuItem = await Menu.findOneAndDelete({ menuItem: req.params.name });

  if (!menuItem) {
    return next(new AppError('No menu item found with that name', 404));
  }

  // Return all remaining menu items after deletion
  const menuItems = await Menu.find();

  res.status(200).json({
    status: 'success',
    data: menuItems
  });
});

// Update sales and popularity metrics
export const updateMetrics = catchAsync(async (req, res, next) => {
  const { menuItem, salesIncrement, popularityUpdate } = req.body;

  if (!menuItem) {
    return next(new AppError('Menu item name is required', 400));
  }

  const item = await Menu.findOne({ menuItem });
  
  if (!item) {
    return next(new AppError('No menu item found with that name', 404));
  }

  // Update sales if provided
  if (salesIncrement) {
    item.sales += salesIncrement;
  }
  
  // Update popularity if provided
  if (popularityUpdate !== undefined) {
    item.popularity = popularityUpdate;
  }

  await item.save();

  res.status(200).json({
    status: 'success',
    data: item
  });
});