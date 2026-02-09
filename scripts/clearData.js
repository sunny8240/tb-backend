require('dotenv').config();
const mongoose = require('mongoose');
const State = require('../models/State');
const Destination = require('../models/Destination');

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority'
    });
    console.log('Connected to MongoDB');

    try {
      await State.collection.drop();
      console.log('Cleared States collection');
    } catch (err) {
    }

    try {
      await Destination.collection.drop();
      console.log('Cleared Destinations collection');
    } catch (err) {
    }

    console.log('Database cleared successfully');
    console.log('States and Destinations have been removed');
    console.log('Admin account remains available for login');
    console.log('You can add states and destinations from the Admin panel.');
    
    process.exit(0);
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }
};

clearDatabase();
