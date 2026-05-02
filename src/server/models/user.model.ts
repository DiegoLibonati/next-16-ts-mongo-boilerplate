import mongoose, { Schema } from "mongoose";

import type { IUserDoc } from "@/types/api";

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<IUserDoc> | undefined) ??
  mongoose.model<IUserDoc>("User", userSchema);
