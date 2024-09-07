import mongoose from "mongoose";

// remote database
mongoose
  .connect(process.env.REMOTE_DATABASE_URI)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.log("Error connecting to the database: ", error);
  });

// local database
// mongoose
//   .connect(process.env.LOCAL_DATABASE_URI)
//   .then(() => {
//     console.log("Database connected successfully.");
//   })
//   .catch((error) => {
//     console.log("Error connecting to the database: ", error);
//   });
