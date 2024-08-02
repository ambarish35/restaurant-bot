const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    restaurantId: String,
    items: [
        {
            menuItemId: String,
            quantity: Number
        }
    ],
    status: String,
    totalPrice: Number,
    paymentStatus: String
});

module.exports = mongoose.model('Order', orderSchema);
