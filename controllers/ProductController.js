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