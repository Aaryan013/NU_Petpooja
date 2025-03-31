import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  menuItem: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Sweet', 'Bread', 'Main Course', 'Starter']
  },
  description: {
    type: String,
    trim: true
  },
  // New fields
  popularity: {
    type: Number,
    default: 50, // Default value between 0-100
    min: 0,
    max: 100
  },
  sales: {
    type: Number,
    default: 0
  },
  profitMargin: {
    type: Number,
    default: 40, // Default profit margin percentage
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;