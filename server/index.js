/*
The code sets up an API server using Express.js.
It connects to a MongoDB database via Mongoose.
It defines middleware for parsing requests, handling errors, and enabling CORS.
Routes for users and properties would handle specific API functionalities
*/

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.js";
import PropertyRoutes from "./routes/properties.js";

/**
  express: A minimalist framework for building web servers and APIs.
  dotenv: Loads environment variables from a .env file into process.env. Useful for sensitive data like database URLs or API keys.
  cors: Middleware to enable Cross-Origin Resource Sharing, allowing your API to be accessed from different origins.
  mongoose: A library for interacting with MongoDB, providing schema-based models for data. 
  */
dotenv.config();
// This loads the environment variables defined in a .env file (e.g., MONGODB_URL) into the process.env object, making them accessible in the code.

const app = express();
app.use(cors()); // Enables CORS to allow cross-origin requests.CORS Middleware: Checks if the request origin is allowed.
app.use(express.json({ limit: "50mb" })); //Parses incoming JSON requests with a maximum size of 50MB.
app.use(express.urlencoded({ extended: true })); // for form data Parses URL-encoded form data.
app.use("/api/user",UserRoutes);
app.use("/api/property",PropertyRoutes);


// error handler
/**
 * A middleware for handling errors.
  Catches errors thrown by other routes or middleware and sends a JSON response with the error details.

 */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true); //Ensures strict parsing of MongoDB query filters.
  mongoose
    .connect(process.env.MONGODB_URL) //Connects to the MongoDB database using the URL from the environment variables.

    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("Failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started at 8080")); // Starts the Express server on port 8080 and listens for incoming requests.
  } catch (error) {
    console.log(error);
  }
};

startServer();
