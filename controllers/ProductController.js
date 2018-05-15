var Product = require('../models/Product');

exports.getAll = (req, res) => {
	Product.find({}).exec((err, data) => {
		if (err) return res.status(400).send({
			'status': 'fail',
			'error': err
		});
		return res.json({
			'status': 'success',
			'data': data
		})
	})
}
exports.create = (req, res) => {
	let pr = req.body.product;

	let product = new Product(pr);

	product.save((err, item) => {
		if (err) return res.status(400).send({
			'status': 'fail',
			'error': err
		});
		return res.json({
			'status': 'success',
			'data': item
		})
	});
}
exports.find = (req, res) => {
	let id = req.params.id;

	Product.findById(id, (err, data) => {
		if (err) return res.status(400).send({
			'status': 'fail',
			'error': err
		});
		return res.json({
			'status': 'success',
			'data': data
		})
	})
}
exports.update = () => {
	let id = req.params.id;
	let data = req.body.product;
	Product.findOneAndUpdate({_id: id}, data, (err, result) => {
		if (err) return res.status(400).send({
			'status': 'fail',
			'error': err
		});
		return res.json({
			'status': 'success',
			'data': result
		})
	});
}
exports.delete = (req, res) => {
	let id = req.params.id;

	Product.findOneAndDelete({_id: id}, data, (err) => {
		if (err) return res.status(400).send({
			'status': 'fail',
			'error': err
		});
		return res.json({
			'status': 'success'
		})
	});
}