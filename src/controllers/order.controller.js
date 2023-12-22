const Order = require('../models/order.model');
const User = require('../models/user.model');
const sendResponse = require('../utils/sendResponse');


// Create a new order
const createOrder = async (req, res) => {
    try {
        const { userId, products, totalPrice } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return sendResponse(res, 404, false, 'User not found');
        }

        // Create the order
        const order = await Order.create({
            user: userId,
            products,
            totalPrice,
            // Add more fields as needed
        });

        return sendResponse(res, 201, true, 'Order created successfully', order);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Internal Server Error', null);
    }
};

// Get all orders sorted by status (New first, then Seen) with optional search
const getAllOrdersSortedByStatus = async (req, res) => {
    try {
        const { email, mobile } = req.query;
        const searchCriteria = {};

        if (email) {
            searchCriteria['customer.email'] = { $regex: new RegExp(email, 'i') };
        }

        if (mobile) {
            searchCriteria['customer.mobile'] = { $regex: new RegExp(mobile, 'i') };
        }

        const orders = await Order.find(searchCriteria)
            .sort({ status: 1 })
            .populate('customer products.product', 'name email price');

        const sortedOrders = orders.sort((a, b) => {
            const statusOrder = {
                'New': 1,
                'Seen': 2,
            };

            return statusOrder[a.status] - statusOrder[b.status];
        });

        return sendResponse(res, 200, true, 'Orders retrieved and sorted successfully', sortedOrders);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Internal Server Error', null);
    }
};

const updateOrderStatusByAdmin = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, orderStatus, paymentStatus } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status, orderStatus, paymentStatus },
            { new: true } // Returns the modified document
        );

        if (!updatedOrder) {
            return sendResponse(res, 404, false, 'Order not found', null);
        }

        return sendResponse(res, 200, true, 'Order updated successfully', updatedOrder);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Internal Server Error', null);
    }
};

const cancelOrderAndUpdatePaymentMethod = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus, paymentMethod } = req.body;

        // Assuming you have a middleware that adds user information to the request object
        const userId = req.user._id;

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, 'customer': userId },
            { orderStatus: 'Cancel', paymentMethod },
            { new: true } // Returns the modified document
        );

        if (!updatedOrder) {
            return sendResponse(res, 404, false, 'Order not found or you do not have permission', null);
        }

        return sendResponse(res, 200, true, 'Order status and payment method updated successfully', updatedOrder);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Internal Server Error', null);
    }
};
// Get all orders for a specific user
const getAllOrdersByUser = async (req, res) => {
    try {
        // Assuming you have a middleware that adds user information to the request object
        const userId = req.user._id;

        const userOrders = await Order.find({ 'customer': userId })
            .populate('products.product', 'name price')
            .sort({ createdAt: -1 }); // Sort by creation date, you can adjust this as needed

        return sendResponse(res, 200, true, 'User orders retrieved successfully', userOrders);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Internal Server Error', null);
    }
};

// Get details of a specific order

const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        const orderDetails = await Order.findById(orderId)
            .populate('customer', 'name email')
            .populate('products.product', 'name price');

        if (!orderDetails) {
            return sendResponse(res, 404, false, 'Order not found', null);
        }

        return sendResponse(res, 200, true, 'Order details retrieved successfully', orderDetails);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Internal Server Error', null);
    }
};
// Delete a specific order by admin
const deleteOrderByAdmin = async (req, res) => {
    try {
        const { orderId } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return sendResponse(res, 404, false, 'Order not found', null);
        }

        return sendResponse(res, 200, true, 'Order deleted successfully', deletedOrder);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, 'Internal Server Error', null);
    }
};


module.exports = {
    createOrder,
    getAllOrdersSortedByStatus,
    updateOrderStatusByAdmin,
    cancelOrderAndUpdatePaymentMethod,
    getAllOrdersByUser,
    deleteOrderByAdmin,
    getOrderDetails
};
