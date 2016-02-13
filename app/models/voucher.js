var mongoose = require('mongoose');

module.exports = mongoose.model('Voucher', {
	voucherId: String,
	discount: Number,
	used: Boolean
});