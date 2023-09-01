/** @format */

import mongoose from "mongoose";
import { iUpdate } from "../utils/interface";

interface Update extends iUpdate, mongoose.Document {}

const UpdateSchema = new mongoose.Schema<iUpdate>(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email address.",
      ],
    },
    Number: {
      type: Number,
      match: /^\d{11}$/,
    },
    Image: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Update>("update", UpdateSchema);
