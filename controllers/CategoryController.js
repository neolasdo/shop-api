var Category = require('../models/Category');
var Product = require('../models/Product');

exports.getAll = (req, res) => {
	var limit = req.query.limit?parseInt(req.query.limit):10;
	var page = req.query.page?parseInt(req.query.page):1;
	var keyword = req.query.keyword?req.query.keyword:'';
	Category.paginate({'name' : new RegExp(keyword, 'i')}, {limit: limit, page: page})
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
	let pr = req.body.category;

	let category = new Category(pr);

	category.save((err, item) => {
		if (err) return res.status(422).send({
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
		if (err) return res.status(422).send({
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
		if (err) return res.status(422).send({
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
	Product.find({category: id }).exec((err, result) => {
		if (err) return res.status(422).send({
			'status': 'fail',
			'error': err
		});
		var promises = result.map((item) => {
			return new Promise((resolve, reject) => {
				item.category = null;
				item.save(function (err, updated) {
				    if (err) reject(err);
				    resolve(updated);
				});
			})
		});

		Promise.all(promises).then((val) => {
			Category.findOneAndDelete({_id: id}, (err) => {
				if (err) return res.status(422).send({
					'status': 'fail',
					'error': err
				});
				return res.json({
					'status': 'success'
				})
			});
		}).catch(function (err) {
			
	        	return res.status(400).send({
	            'status' : 'error',
	            'message' : err
        	});
    	});
	});

}