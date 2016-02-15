var voucherCodes = require('voucher-code-generator');
var Voucher = require('../models/voucher');

// Random integer number between low and high
randomNumber = function (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

randomDiscountType = function () {
    return discountTypes[Math.floor(Math.random() * discountTypes.length)];
}

var discountTypes = [
    '%',
    'PLN'
]

// Generate vouchers
exports.generateVouchers = function (generatedVouchersCount, campaignName, callback) {
    generateUniqueVouchers(generatedVouchersCount, campaignName, function (generatedVoucherCodes) {
        var generatedVouchers = [];
        generatedVoucherCodes.forEach(function (code) {
            generatedVouchers.push({
                voucherId: code,
                discount: randomNumber(1, 50),
                discountType: randomDiscountType(),
                usages: randomNumber(1, 5),
                voucherPrefix: campaignName
            });

            return callback(generatedVouchers);
        });
    });
};

// Generate single unique voucher
generateUniqueVouchers = function (uniqueVouchersCount, campaignName, callback) {
    var generatedVouchers = [];

    for (var i = 0; i < uniqueVouchersCount; i++) {
        var generatedVoucherCode = voucherCodes.generate({
            prefix: campaignName + '_',
            length: 8,
            count: 1
        });

        findVoucherById(generatedVoucherCode, function (voucher) {
            if(voucher) {
                generatedVouchers.push(voucher);
            }
            if (generatedVouchers.length === parseInt(uniqueVouchersCount)) {
                return callback(generatedVouchers);
            }
        })
    }
};

// Helper get voucher by id method - TODO should be moved to DAO layer?
findVoucherById = function (voucherId, callback) {
    Voucher.findOne({'voucherId': voucherId}, function (err, voucher) {
        if (!voucher) {
            return callback(voucherId);
        }
    });
};

