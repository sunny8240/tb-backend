require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const State = require('../models/State');
const User = require('../models/User');

const dbOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority',
  ssl: true,
  tlsInsecure: false,
  authSource: 'admin'
};

async function checkDestinations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, dbOptions);
    console.log(' Connected to MongoDB');

    const destinations = await Destination.find({})
      .populate('state', 'name slug')
      .populate('createdBy', 'name email');

    console.log('\n Total Destinations:', destinations.length);

    if (destinations.length > 0) {
      console.log('\n📋 All Destinations:');
      destinations.forEach((dest, idx) => {
        console.log(`\n${idx + 1}. ${dest.name}`);
        console.log(`   ID: ${dest._id}`);
        console.log(`   State: ${dest.state?.name}`);
        console.log(`   Images: ${dest.images ? `${dest.images.length} images` : 'NO IMAGES'}`);
        if (dest.images && dest.images.length > 0) {
          console.log(`   First Image URL: ${dest.images[0].substring(0, 80)}...`);
        }
        console.log(`   Is Approved: ${dest.isApproved}`);
        console.log(`   Category: ${dest.category}`);
      });
    }

    // Check how many are approved
    const approved = await Destination.countDocuments({ isApproved: true });
    const pending = await Destination.countDocuments({ isApproved: false });
    console.log(`\n Status: ${approved} approved, ${pending} pending`);

    // Check how many have images
    const withImages = await Destination.countDocuments({ images: { $exists: true, $ne: [] } });
    const noImages = await Destination.countDocuments({ images: { $exists: false } || { images: [] } });
    console.log(`\n  Images: ${withImages} with images, ${noImages} without images`);

    await mongoose.connection.close();
    console.log('\n Check complete');
  } catch (error) {
    console.error(' Error:', error.message);
    process.exit(1);
  }
}

checkDestinations();
