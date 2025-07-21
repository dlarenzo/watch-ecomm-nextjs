import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error: any) {
    console.error(`Error:MongoDB connection error: ${error}`);
    // Exit process to stop code from running
    process.exit(1);
  }
};
