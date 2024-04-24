// This code defines a User model using Mongoose and implements methods for password matching and finding users by their credentials. It also includes a pre-save hook to hash the password before saving it to the database.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// Method to compare entered password with the stored hashed password
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// Static method to find a user by their credentials
// UserSchema.statics.findByCredentials = async function (
//   email,
//   originalPassword
// ) {
//   const User = this;
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User does not exist");
//   const isMatch = await bcrypt.compare(originalPassword, user.password);
//   if (!isMatch) throw new Error("Password is incorrect");
//   return user;
// };

// Pre-save hook to hash the password before saving
UserSchema.pre("save", async function (next) {
  try{
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }catch(error){
    console.log(error)
  }
});

// Export the User model
export const UserModel = mongoose.model("Users", UserSchema);
