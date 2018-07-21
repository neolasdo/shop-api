var Category = require('../models/Category');

exports.getAll = (req, res) => {
	Category.find({}).exec((err, data) => {
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
	let pr = req.body.category;

	let category = new Category(pr);

	category.save((err, item) => {
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

	Category.findById(id, (err, data) => {
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
exports.update = (req, res) => {
	let id = req.params.id;
	let data = req.body.product;
	Category.findOneAndUpdate({_id: id}, data, (err, result) => {
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

	Category.findOneAndDelete({_id: id}, data, (err) => {
		if (err) return res.status(400).send({
			'status': 'fail',
			'error': err
		});
		return res.json({
			'status': 'success'
		})
	});
}