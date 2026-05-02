import mongoose, { Schema } from "mongoose";

import type { IProductDoc } from "@/types/api";

const productSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const ProductModel =
  (mongoose.models.Product as mongoose.Model<IProductDoc> | undefined) ??
  mongoose.model<IProductDoc>("Product", productSchema);
