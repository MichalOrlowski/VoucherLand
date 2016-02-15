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
        });

        return callback(generatedVouchers);
    });
};

// Generate single unique voucher
generateUniqueVouchers = function (uniqueVouchersCount, campaignName, callback) {
    findAllVoucherIds(function (currentVouchers) {
        var generatedVouchers = [];

        while (generatedVouchers.length < uniqueVouchersCount) {
            var generatedVoucherCode = voucherCodes.generate({
                prefix: campaignName + '_',
                length: 8,
                count: 1
            });

            if (currentVouchers.indexOf(generatedVoucherCode) === -1 && generatedVouchers.indexOf(generatedVoucherCode) === -1) {
                generatedVouchers.push(generatedVoucherCode);
            }
        }

        return callback(generatedVouchers);
    });
};

// Get all voucher ids - TODO move to DAO layer (if it's good practice)
findAllVoucherIds = function (callback) {
    Voucher.find(function (err, vouchers) {
        var allVoucherIds = [];
        vouchers.forEach(function (voucher) {
            allVoucherIds.push(voucher.voucherId);
        });
        return callback(allVoucherIds);
    })
};

