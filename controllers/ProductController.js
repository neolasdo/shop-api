var Product = require('../models/Product');

exports.getAll = (req, res) => {
	var limit = req.query.limit?parseInt(req.query.limit):10;
	var page = req.query.page?parseInt(req.query.page):1;
	var keyword = req.query.keyword?req.query.keyword:'';
	Product.paginate({'name' : new RegExp(keyword, 'i')}, {limit: limit, page: page})
	.then(data => {
		return res.json({
			'status': 'success',
			'data': data.docs,
			'meta': {
				'limit': data.limit,
				'page': data.page,
				'pages': data.pages,
				'total': data.total
			}
		})
	})
	.catch((err) => {
		return res.status(400).send({
				'status': 'fail',
				'error': err
			});	
	}); 
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
exports.update = (req, res) => {
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

	Product.findOneAndDelete({_id: id}, (err) => {
		if (err) return res.status(400).send({
			'status': 'fail',
			'error': err
		});
		return res.json({
			'status': 'success'
		})
	});
}