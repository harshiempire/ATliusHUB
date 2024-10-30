const mongoose = require('mongoose');

// MongoDB connection URI
const localDB = 'mongodb://localhost:27017/invoiceDB';
const cloudDB = 'mongodb+srv://realadmin:realadmin@cluster0.p3phjsx.mongodb.net/';

// Choose the database URL based on your environment
const mongoURI = process.env.MONGO_URI || cloudDB;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
