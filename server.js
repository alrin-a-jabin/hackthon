import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongodbUrl, port } from "./constant.js";
import userRoutersApi from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    process.exit(1); // Terminate the application on connection failure
  });

app.use("/api/user", userRoutersApi);

app.use(notFound);
app.use(errorHandler);
