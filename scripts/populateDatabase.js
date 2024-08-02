const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected');

        // Clear existing data
        await Restaurant.deleteMany({});

        // Create sample restaurants
        const restaurants = [
            { name: 'Italian Bistro', cuisine: 'Italian', location: 'Downtown', priceRange: '$$' },
            { name: 'Sushi Place', cuisine: 'Japanese', location: 'Uptown', priceRange: '$$$' },
            { name: 'Burger Joint', cuisine: 'American', location: 'Midtown', priceRange: '$' }
        ];

        await Restaurant.insertMany(restaurants);
        console.log('Sample data inserted');

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
