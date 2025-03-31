import mongoose, { Schema } from "mongoose";

const salesSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sales: {
      type: Number,
      required: true,
      min: 0,
    }
  },
  { timestamps: true }
);

export const Sales = mongoose.model("Sales", salesSchema);