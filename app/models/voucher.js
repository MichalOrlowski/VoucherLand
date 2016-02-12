var mongoose = require('mongoose');

module.exports = mongoose.model('Voucher', {
	voucherId: String,
	used: Boolean
});