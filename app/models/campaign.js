var mongoose = require('mongoose');

module.exports = mongoose.model('Campaign', {
	name: String,
	startDate: Date
});