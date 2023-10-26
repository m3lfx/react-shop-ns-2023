
const express = require('express');
const router = express.Router();

const {newProduct, getProducts, getSingleProduct, updateProduct, deleteProduct, getAdminProducts} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
router.get('/products', getProducts)


router.post('/product/new', isAuthenticatedUser, newProduct)
router.get('/product/:id', getSingleProduct);
router.get('/admin/products', getAdminProducts);
router.route('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin',)).put(updateProduct).delete(deleteProduct);

module.exports = router;