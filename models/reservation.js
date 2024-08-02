const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    userId: String,
    restaurantId: String,
    date: Date,
    time: String,
    specialRequests: String
});

module.exports = mongoose.model('Reservation', reservationSchema);