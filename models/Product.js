var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	mainImg: {
		type: mongoose.Schema.ObjectId,
		ref: "Media"
	},
	images: [{
		type: mongoose.Schema.ObjectId,
		ref: "Media"
	}],
	price: {
		type: Number,
		require: true,
		min: 0
	},
	salePrice: {
		type: Number,
		require: true,
		min: 0	
	},
	brand: {
		type: String,
	},
	category: {
		type: mongoose.Schema.ObjectId,
		ref: "Category"
	},
	description: {
		type: String,
	},
	metaDesc: {
		type: String,
	},
	metaKey: [{
		type: String
	}],
	inStock: {
		type: Number,
		min: 0,
		max: 1000,
		default: 100
	},
	attributes: [{
		type: mongoose.Schema.ObjectId,
		ref: "Attribute"
	}],
	viewer: {
		type: Number,
		min: 0,
		default: 0
	},
	likes: {
		type: Number,
		min: 0,
		default: 0	
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	tags: [{
		type: String
	}]
})
ProductSchema.pre('update', (next) => {
	var update = Date.now();

	this.update({updatedAt: update});
	next();
});

var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;