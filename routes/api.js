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
router.post('/products', ProductController.getAll);
router.route('product/:id')
	.get((req, res)=>{
		return res.json(req.id);
	})

module.exports = router;