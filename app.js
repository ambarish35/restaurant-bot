require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { BotFrameworkAdapter } = require('botbuilder');
const { RestaurantBot } = require('./bot');

const app = express();
const adapter = new BotFrameworkAdapter();
const bot = new RestaurantBot();

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle incoming messages from the Bot Framework Emulator
app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    }).catch(err => {
        console.error('Error processing activity:', err);
        if (!res.headersSent) {
            res.status(500).send('Error processing activity');
        }
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const restaurantRoutes = require('./routes/restaurantRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Define routes
app.use('/restaurants', restaurantRoutes);
app.use('/reservations', reservationRoutes);
app.use('/orders', orderRoutes);

const port = process.env.PORT || 3978;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
