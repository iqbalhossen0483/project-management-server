import mongoose from 'mongoose';
import config from './config';

export const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.mongoUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
