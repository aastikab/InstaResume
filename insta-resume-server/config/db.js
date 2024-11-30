const mongoose = require('mongoose');

// Set strictQuery option
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://aastikabanstola:bMzx9uGngUzxCVDL@cluster0.o6kaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;