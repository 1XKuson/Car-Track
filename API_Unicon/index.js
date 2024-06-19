import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemsRouter from './API/routes/Unicon.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json()); // Middleware to parse JSON bodies

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(process.env.MONGO_URL);
    console.log(error);
  });

app.use('/api', itemsRouter); // Use the items router for API routes
