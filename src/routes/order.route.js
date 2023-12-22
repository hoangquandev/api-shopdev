const express = require('express');
const orderController = require('../controllers/order.controller');
const { isAdmin, verifyAccessToken } = require('../middlewares/verifyToken');
const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);
router.get('/', verifyAccessToken, isAdmin, orderController.getAllOrdersSortedByStatus);
router.put('/:orderId/update-status', verifyAccessToken, isAdmin, orderController.updateOrderStatusByAdmin);
router.put('/:orderId/cancel', verifyAccessToken, orderController.cancelOrderAndUpdatePaymentMethod);
router.get('/user', verifyAccessToken, orderController.getAllOrdersByUser);
router.get('/:orderId/details', verifyAccessToken, orderController.getOrderDetails);
// Delete a specific order by admin
router.delete('/:orderId/delete', verifyAccessToken, isAdmin, orderController.deleteOrderByAdmin);
module.exports = router;
