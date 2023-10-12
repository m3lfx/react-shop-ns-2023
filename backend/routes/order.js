const express = require('express')
const router = express.Router();

const { newOrder,
		getSingleOrder,
	    myOrders,
	    allOrders,
	    updateOrder,
	    deleteOrder
	} = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/admin/orders/', isAuthenticatedUser, authorizeRoles('admin'), allOrders);

router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;