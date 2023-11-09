
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {newProduct, getProducts, getSingleProduct, updateProduct, deleteProduct, getAdminProducts, createProductReview, getProductReviews, deleteReview, productSales} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
router.get('/products', getProducts)



router.get('/product/:id', getSingleProduct);
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin',)).put(upload.array('images', 10), updateProduct).delete(deleteProduct);
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin',), upload.array('images', 10), newProduct);
router.put('/review', isAuthenticatedUser, createProductReview);
router.get('/reviews', getProductReviews)
router.delete('/reviews', isAuthenticatedUser, authorizeRoles('admin'), deleteReview)
router.get('/admin/product-sales', productSales);

module.exports = router;