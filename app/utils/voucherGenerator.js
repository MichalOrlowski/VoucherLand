var voucherCodes = require('voucher-code-generator');

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

// Generate single voucher
exports.generateVouchers = function (generatedVouchersCount, campaignName) {
    var generatedVoucherCodes = voucherCodes.generate({
        prefix: campaignName + '_',
        length: 8,
        count: generatedVouchersCount
    });

    var generatedVouchers = [];
    generatedVoucherCodes.forEach(function (code) {
        generatedVouchers.push({voucherId: code,
            discount: randomNumber(1, 50),
            discountType: randomDiscountType(),
            usages: randomNumber(1, 5),
            voucherPrefix: campaignName
        });
    });

    return generatedVouchers;
};
