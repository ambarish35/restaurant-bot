
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    location: String,
    priceRange: String,
    menu: [
        {
            name: String,
            description: String,
            price: Number,
            imageUrl: String,
            reviews: [String]
        }
    ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);



