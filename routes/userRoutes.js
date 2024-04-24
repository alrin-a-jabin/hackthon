// Importing necessary modules
import express from "express";
import { UserModel } from "../models/Users.js";
import generateToken from "../utils/generateToken.js";
import { tokenVerification } from "../middleware/verifyToken.js";
import bcrypt from "bcryptjs";
import  {authUser} from "../controller/userController.js";

// Creating a new router instance
const router = express.Router();
router.post("/login", authUser);

// Creating a new user
router.post("/createUser", async (req, res) => {
  try {

    // Extracting name, email and age from request body
    const { name, email, age, password } = req.body;

    // Checking if all the required fields are provided
    if (!name || !email || !password) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Please provide all the required fields",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Email already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, salt);
    // Creating a new user in the database
    const user = await UserModel.create({
      name,
      email,
      age,
      password: hasPassword,
    });

    // Sending the response with the created user data
    res.status(200).send({
      status: true,
      statusCode: 200,
      data: user,
    });
  } catch (err) {
    console.error(err);

    // Sending error response in case of any error
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err,
    });
  }
});

// Getting all the users
router.get("/getAllUser", async (req, res) => {
  try {
    // Finding all the users from the database
    const users = await UserModel.find({});

    // Sending the response with all the users data
    res.json(users);
  } catch (err) {
    console.error(err);

    // Sending error response in case of any error
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Getting a user by ID
router.get("/getUser/:id", async (req, res) => {
  try {
    // Extracting user ID from request parameters
    const id = req.params.id;

    // Finding the user by ID from the database
    const user = await UserModel.findById(id);

    // Sending error response if user is not found
    if (!user) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User not found",
      });
    }

    // Sending the response with the user data
    res.json(user);
  } catch (err) {
    console.error(err);

    // Sending error response in case of any error
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Updating a user by ID
router.put("/updateUser/:id", tokenVerification, async (req, res) => {
  try {
    // Extracting user ID and updated fields from request parameters and body
    const id = req.params.id;
    const { name, email, age } = req.body;

    // Updating the user by ID in the database
    const user = await UserModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    console.log(user);
    // Sending error response if user is not found
    if (!user) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User not found",
      });
    }

    // Sending the response with the updated user data
    res.json(user);
  } catch (err) {
    console.error(err);

    // Sending error response in case of any error
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Deleting a user by ID
router.delete("/deleteUser/:id", tokenVerification, async (req, res) => {
  try {
    // Extracting user ID from request parameters
    const id = req.params.id;

    // Deleting the user by ID from the database
    const user = await UserModel.findByIdAndRemove(id);

    // Sending error response if user is not found
    if (!user) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User not found",
      });
    }

    // Sending the response with the deleted user data
    res.json(user);
  } catch (err) {
    console.error(err);

    // Sending error response in case of any error
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
});


// Exporting the router instance
export default router;
