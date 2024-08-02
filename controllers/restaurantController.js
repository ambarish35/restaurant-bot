// controllers/restaurantController.js

const Restaurant = require('../models/restaurant');

exports.searchRestaurants = async (req, res) => {
    const keyword = req.query.keyword.toLowerCase();
    try {
        const results = await Restaurant.find({
            name: { $regex: keyword, $options: 'i' }
        });
        res.json(results);
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getMenu = async (req, res) => {
    const { name } = req.params;

    try {
        const restaurant = await Restaurant.findOne({
            name: { $regex: name, $options: 'i' }
        }).select('menu');

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json(restaurant.menu);
    } catch (err) {
        console.error('Error fetching menu:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
