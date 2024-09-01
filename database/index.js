import mongoose from "mongoose";

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.log("Error connecting to the database: ", error);
  });
