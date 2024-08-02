// controllers/orderController.js

const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};

exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
};

exports.updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
};

exports.deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
};
