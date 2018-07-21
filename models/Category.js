var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Tên danh mục không được để trống']
	},
	slug: {
		type: String,
		required: [true, 'Đường dẫn không được để trống'],
		unique: true
	},
	metaDesc: {
		type: String,
	},
	metaKey: [{
		type: String
	}],
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
})

CategorySchema.pre('update', (next) => {
	var update = Date.now();

	this.update({updatedAt: update});
	next();
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;