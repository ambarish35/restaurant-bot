const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/search', restaurantController.searchRestaurants);
router.get('/:name/menu', restaurantController.getMenu);

module.exports = router;
