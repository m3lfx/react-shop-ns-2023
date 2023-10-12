const Product = require('../models/product')
const APIFeatures = require('../utils/apiFeatures');

exports.newProduct = async (req, res, next) => {
	
	req.body.user = req.user.id;
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product
	})
}

// exports.getProducts = async (req, res, next) => {
// 	const products = await Product.find({});
// 	res.status(200).json({
// 		success: true,
// 		count: products.length,
// 		products
// 	})
// }

http://localhost:4001/api/v1/products?keyword=apple&page=2
exports.getProducts = async (req,res,next) => {
	
	const resPerPage = 4;
	const productsCount = await Product.countDocuments();
	const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter(); 

	// const products = await Product.find();
	apiFeatures.pagination(resPerPage);
	const products = await apiFeatures.query;
	res.status(200).json({
		success: true,
		count: products.length,
		productsCount,
		products
	})
}

exports.getSingleProduct = async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not found'
		})
	}
	res.status(200).json({
		success: true,
		product
	})
}

exports.updateProduct = async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	console.log(req.body)
	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not found'
		})
	}
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not updated'
		})
	}
	res.status(200).json({
		success: true,
		product
	})
}

exports.deleteProduct = async (req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.id);
	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not found'
		})
	}
	// await product.remove();
	res.status(200).json({
		success: true,
		message: 'Product deleted'
	})
}