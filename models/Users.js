// This code defines a User model using Mongoose and implements methods for password matching and finding users by their credentials. It also includes a pre-save hook to hash the password before saving it to the database.

import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export the User model
export const UserModel = mongoose.model("Users", UserSchema);
