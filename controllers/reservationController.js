

const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
};

exports.getReservations = async (req, res) => {
    const reservations = await Reservation.find();
    res.json(reservations);
};

exports.getReservationById = async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
};

exports.updateReservation = async (req, res) => {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
};

exports.deleteReservation = async (req, res) => {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(204).send();
};
