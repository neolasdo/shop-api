var app = require('express');
var router = app.Router();
var passport = require('passport');
var ProductController = require('../controllers/ProductController');

var User = require('../models/User');
require('../config/passport')(passport);

/**-----------------------------------------
Product group routing
--------------------------------------------**/


router.get('/products', ProductController.getAll);
router.post('/products', ProductController.create);
router.route('product/:id')
	.get(ProductController.find)
	.post(ProductController.update)
	.delete(ProductController.delete)


module.exports = router;