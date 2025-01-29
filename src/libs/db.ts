import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const mongoDBURL = process.env.LOCAL_MONGO_URL;

if (!mongoDBURL) {
  throw new Error('MongoDB URL is not defined in environment variables');
}

let isConnected = false;

const db = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(mongoDBURL);
    isConnected = true;
    console.log("Database connection established");
  } catch (err) {
    isConnected = false;
    console.error("Database connection error:", err);
    throw new Error("Failed to connect to the database");
  }

  // Handle connection events
  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.log('Database disconnected');
  });
};

export default db;
