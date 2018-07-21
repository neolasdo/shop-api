var app = require('express');
var router = app.Router();
var passport = require('passport');
var ProductController = require('../controllers/ProductController');
var CategoryController = require('../controllers/CategoryController');

var User = require('../models/User');
require('../config/passport')(passport);

/**-----------------------------------------
Product group routing
--------------------------------------------**/

router.get('/products', ProductController.getAll);
router.post('/products', ProductController.create);
router.route('/product/:id')
	.get(ProductController.find)
	.put(ProductController.update)
	.delete(ProductController.delete);


router.get('/categories', CategoryController.getAll);
router.post('/categories', CategoryController.create);
router.route('/category/:id')
	.get(CategoryController.find)
	.put(CategoryController.update)
	.delete(CategoryController.delete);


module.exports = router;