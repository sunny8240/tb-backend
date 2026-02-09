require('dotenv').config();

console.warn('\nSEED DATA DISABLED');
console.warn('Seeding is disabled in this environment.');
console.warn('Use the Admin Panel to add data.\n');
process.exit(0);

const mongoose = require('mongoose');
const State = require('../models/State');
const Destination = require('../models/Destination');

const statesData = [
  {
    name: 'Andaman & Nicobar',
    type: 'UT',
    capital: 'Port Blair',
    description: 'Tropical islands in the Bay of Bengal known for white sand beaches, coral reefs and colonial-era sites.',
    bestTimeToVisit: 'October–May',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60',
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=60'
    ]
  },
  {
    name: 'Andhra Pradesh',
    type: 'State',
    capital: 'Amaravati',
    description: 'A coastal state with historic temples, rich Telugu culture and varied landscapes from beaches to hills.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1505673542671-60b1f0a4b0e8?w=1200&q=60',
      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200&q=60'
    ]
  },
  {
    name: 'Arunachal Pradesh',
    type: 'State',
    capital: 'Itanagar',
    description: 'Lush Himalayan state with tribal cultures, high-altitude passes and pristine valleys.',
    bestTimeToVisit: 'March–October',
    images: [
      'https://images.unsplash.com/photo-1534791547705-3877a2c0c1a0?w=1200&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60'
    ]
  },
  {
    name: 'Assam',
    type: 'State',
    capital: 'Dispur',
    description: 'Known for tea gardens, the Brahmaputra river and rich Assamese culture and wildlife.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1505765052244-8b8d7a5c7f9f?w=1200&q=60',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=60'
    ]
  },
  {
    name: 'Bihar',
    type: 'State',
    capital: 'Patna',
    description: 'Birthplace of Buddhism and home to ancient learning centers such as Nalanda and Vikramshila.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1558980664-10f0a3d1a9d1?w=1200&q=60',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=60'
    ]
  },
  {
    name: 'Chhattisgarh',
    type: 'State',
    capital: 'Raipur',
    description: 'Known as the Rice Bowl of India, rich in mineral resources and tribal culture.',
    bestTimeToVisit: 'October–February',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Goa',
    type: 'State',
    capital: 'Panaji',
    description: 'A vibrant coastal state famous for beaches, Portuguese heritage, churches and nightlife.',
    bestTimeToVisit: 'November–February',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=60',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60'
    ]
  },
  {
    name: 'Gujarat',
    type: 'State',
    capital: 'Gandhinagar',
    description: 'Home to the Asiatic Lion, the Kutch region, and vibrant textile heritage of Gandhi\'s birthplace.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Haryana',
    type: 'State',
    capital: 'Chandigarh',
    description: 'Rapidly developing state known for agriculture, automotive industry and closeness to Delhi.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1512457070636-cf4ee5298313?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ]
  },
  {
    name: 'Himachal Pradesh',
    type: 'State',
    capital: 'Shimla',
    description: 'A picturesque Himalayan state known for adventure sports, apple orchards and hill stations.',
    bestTimeToVisit: 'March–October',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60'
    ]
  },
  {
    name: 'Jharkhand',
    type: 'State',
    capital: 'Ranchi',
    description: 'Land of waterfalls, tribal culture and mineral wealth with pristine natural beauty.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Karnataka',
    type: 'State',
    capital: 'Bengaluru',
    description: 'India\'s IT hub with diverse landscapes from coffee plantations to beaches and Western Ghats.',
    bestTimeToVisit: 'October–May',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ]
  },
  {
    name: 'Kerala',
    type: 'State',
    capital: 'Thiruvananthapuram',
    description: 'God\'s Own Country - renowned for backwaters, spice plantations, beaches and ayurveda.',
    bestTimeToVisit: 'September–May',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=60',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60'
    ]
  },
  {
    name: 'Madhya Pradesh',
    type: 'State',
    capital: 'Bhopal',
    description: 'Heart of India with rich heritage temples, diamond reserves and diverse wildlife sanctuaries.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Maharashtra',
    type: 'State',
    capital: 'Mumbai',
    description: 'Economic powerhouse home to Bollywood, ancient caves, hill stations and coastal beauty.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1512457070636-cf4ee5298313?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ]
  },
  {
    name: 'Manipur',
    type: 'State',
    capital: 'Imphal',
    description: 'The Jewel of India with floating lakes, classical dance and scenic beauty of the Northeast.',
    bestTimeToVisit: 'March–October',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Meghalaya',
    type: 'State',
    capital: 'Shillong',
    description: 'The Abode of Clouds - wettest place on Earth with misty hills and tribal culture.',
    bestTimeToVisit: 'September–May',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60'
    ]
  },
  {
    name: 'Mizoram',
    type: 'State',
    capital: 'Aizawl',
    description: 'The Land of the Blue Mountains with pleasant climate, tribal festivals and bamboo forests.',
    bestTimeToVisit: 'September–April',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Nagaland',
    type: 'State',
    capital: 'Kohima',
    description: 'Land of Feasts with unique tribal customs, colorful festivals and pristine mountain scenery.',
    bestTimeToVisit: 'October–February',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60'
    ]
  },
  {
    name: 'Odisha',
    type: 'State',
    capital: 'Bhubaneswar',
    description: 'Land of Lord Jagannath with beautiful beaches, tribal culture and ancient temples.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=60',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60'
    ]
  },
  {
    name: 'Punjab',
    type: 'State',
    capital: 'Chandigarh',
    description: 'The Land of Five Rivers known for agriculture, Sikh heritage and vibrant culture.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1512457070636-cf4ee5298313?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ]
  },
  {
    name: 'Rajasthan',
    type: 'State',
    capital: 'Jaipur',
    description: 'Land of Kings with magnificent forts, palaces, colorful culture and vast deserts.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Sikkim',
    type: 'State',
    capital: 'Gangtok',
    description: 'Northeast gem with Buddhist monasteries, Mount Kanchenjunga and stunning biodiversity.',
    bestTimeToVisit: 'March–May, September–November',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60'
    ]
  },
  {
    name: 'Tamil Nadu',
    type: 'State',
    capital: 'Chennai',
    description: 'Southern cultural powerhouse with Dravidian temples, arts, crafts and beautiful coastlines.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ]
  },
  {
    name: 'Telangana',
    type: 'State',
    capital: 'Hyderabad',
    description: 'Youngest state with IT hubs, historic monuments and fast-growing culinary scene.',
    bestTimeToVisit: 'October–February',
    images: [
      'https://images.unsplash.com/photo-1512457070636-cf4ee5298313?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Tripura',
    type: 'State',
    capital: 'Agartala',
    description: 'Land of Stories in Northeast with palaces, handicrafts and diverse tribal culture.',
    bestTimeToVisit: 'September–March',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ]
  },
  {
    name: 'Uttar Pradesh',
    type: 'State',
    capital: 'Lucknow',
    description: 'Most populous state home to Taj Mahal, Varanasi and ancient Mughal architecture.',
    bestTimeToVisit: 'October–March',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ]
  },
  {
    name: 'Uttarakhand',
    type: 'State',
    capital: 'Dehradun',
    description: 'Land of Gods with Himalayan trekking, pilgrimage sites and adventure tourism.',
    bestTimeToVisit: 'March–May, September–November',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60'
    ]
  },
  {
    name: 'West Bengal',
    type: 'State',
    capital: 'Kolkata',
    description: 'Land of Tagore with Darjeeling tea, cultural heritage and Bengal-style cuisine.',
    bestTimeToVisit: 'October–February',
    images: [
      'https://images.unsplash.com/photo-1512457070636-cf4ee5298313?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ]
  }
];

const destinationsData = [
  {
    name: 'Taj Mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    category: 'Heritage',
    description: 'The symbol of eternal love and one of the Seven Wonders of the World.',
    historicalSignificance: 'Built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal in 1631.',
    bestTimeToVisit: 'October–February',
    entryFee: '250 INR (Indian), 1100 INR (Foreign)',
    timings: '6:00 AM - 7:00 PM (Closed on Fridays)',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Jaipur City Palace',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'Heritage',
    description: 'A remarkable blend of Rajasthani and Mughal architecture still partially used as royal residence.',
    historicalSignificance: 'Built in 1729 by Maharaja Sawai Jai Singh II, still houses the royal family.',
    bestTimeToVisit: 'October–February',
    entryFee: '500 INR (Indian), 1000 INR (Foreign)',
    timings: '9:30 AM - 5:00 PM',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1512457070636-cf4ee5298313?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Varanasi Temples',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Religious',
    description: 'Sacred city known for temples, ghats and spiritual significance along the Ganges River.',
    historicalSignificance: 'One of the oldest cities in the world and most sacred site in Hinduism.',
    bestTimeToVisit: 'October–February',
    entryFee: 'Free',
    timings: 'Open throughout the day',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=60',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Goa Beaches',
    city: 'Goa',
    state: 'Goa',
    category: 'Beach',
    description: 'Famous sandy beaches with vibrant nightlife, water sports and Portuguese charm.',
    historicalSignificance: 'Former Portuguese colony with unique cultural blend.',
    bestTimeToVisit: 'November–February',
    entryFee: 'Free',
    timings: 'Open throughout the day',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60',
      'https://images.unsplash.com/photo-1503803556-61107ce17d15?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Kerala Backwaters',
    city: 'Kochi',
    state: 'Kerala',
    category: 'Nature',
    description: 'A network of lagoons and lakes connected by canals offering scenic boat rides.',
    historicalSignificance: 'Important trading route during ancient times.',
    bestTimeToVisit: 'September–May',
    entryFee: 'Varies (Boat rides: 400-800 INR)',
    timings: '6:00 AM - 6:00 PM',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Khajuraho Temples',
    city: 'Khajuraho',
    state: 'Madhya Pradesh',
    category: 'Heritage',
    description: 'UNESCO World Heritage Site famous for intricate stone carvings and erotic sculptures.',
    historicalSignificance: 'Built between 950-1050 AD during the Chandela dynasty.',
    bestTimeToVisit: 'October–February',
    entryFee: '250 INR (Indian), 500 INR (Foreign)',
    timings: '6:00 AM - 6:00 PM',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Hawa Mahal',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'Heritage',
    description: 'The iconic five-story pink sandstone structure famous for its intricate lattice work.',
    historicalSignificance: 'Built in 1799 to allow royal women to observe street life.',
    bestTimeToVisit: 'October–February',
    entryFee: '100 INR (Indian), 300 INR (Foreign)',
    timings: '9:00 AM - 4:30 PM (Closed during festivals)',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1512457070636-cf4ee5298313?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Darjeeling Hill Station',
    city: 'Darjeeling',
    state: 'West Bengal',
    category: 'Hill Station',
    description: 'Queen of the Hills with tea plantations and views of Kanchenjunga mountain.',
    historicalSignificance: 'British hill station attracting tourists for over two centuries.',
    bestTimeToVisit: 'March–May, September–November',
    entryFee: 'Varies (Tea garden tours: 200-500 INR)',
    timings: 'Open throughout the day',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Udaipur City Palace',
    city: 'Udaipur',
    state: 'Rajasthan',
    category: 'Heritage',
    description: 'Magnificent palace overlooking Lake Pichola with stunning lakeside views.',
    historicalSignificance: 'Built in 1559 by Maharaja Udai Singh II, now a luxury hotel.',
    bestTimeToVisit: 'October–February',
    entryFee: '500 INR (Indian), 900 INR (Foreign)',
    timings: '9:30 AM - 4:30 PM',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60'
    ],
    isApproved: true
  },
  {
    name: 'Hampi Ruins',
    city: 'Hampi',
    state: 'Karnataka',
    category: 'Heritage',
    description: 'Ancient ruins of the Vijayanagara Empire with stunning temple architecture.',
    historicalSignificance: 'Capital of a major Hindu empire in the 14th-16th centuries.',
    bestTimeToVisit: 'October–February',
    entryFee: 'Free (Virupaksha Temple: 30 INR)',
    timings: '6:00 AM - 6:00 PM',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&q=60'
    ],
    isApproved: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority'
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await State.deleteMany({});
    await Destination.deleteMany({});
    console.log('Cleared existing data');

    // Insert states
    const createdStates = await State.insertMany(statesData);
    console.log(`Seeded ${createdStates.length} states/UTs`);

    // Map state names to IDs for destinations
    const stateMap = {};
    createdStates.forEach(state => {
      stateMap[state.name] = state._id;
    });

    // Update destinations with state IDs
    const destinationsWithStateIds = destinationsData.map(dest => ({
      ...dest,
      state: stateMap[dest.state]
    }));

    // Insert destinations
    const createdDestinations = await Destination.insertMany(destinationsWithStateIds);
    console.log(`Seeded ${createdDestinations.length} destinations`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message || error);
    process.exit(1);
  }
};

seedDatabase();
