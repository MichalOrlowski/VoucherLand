var Voucher = require('../models/voucher');
var Campaign = require('../models/campaign');
var voucherGenerator = require('../utils/voucherGenerator');

// Generate voucher
exports.generateVouchers = function (req, res) {
    var generatedVouchersCount = req.params.count;
    var campaignName = req.body.campaignName;
    var expirationDate = req.body.expirationDate;

    if (generatedVouchersCount >= 1 && generatedVouchersCount <= 100000) {
        if (campaignName) {
            Campaign.collection.insert({
                name: campaignName,
                startDate: new Date(),
                expirationDate: new Date(Date.parse(expirationDate))
            });
        }
        var query = Campaign.find({}).sort({'startDate': -1}).limit(1);

        query.exec(function (err, campaign) {
            var currentCampaign = campaignName ? campaignName : campaign[0].name;
            if (err) {
                return res.status(500).send(err);
            }

            var generatedVouchers = voucherGenerator.generateVouchers(generatedVouchersCount, currentCampaign);
            Voucher.collection.insert(generatedVouchers, onBatchInsert);

            function onBatchInsert(err, generatedVouchers) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(generatedVouchers);
                }
            }
        });

    }
    else {
        res.status(400).send('Wrong vouchers count number');
    }
};

//Get voucher by id
exports.getVoucherById = function (req, res) {
    Voucher.findOne({'voucherId': req.params.voucherId}, function (err, voucher) {
        if (err) {
            return res.send(err);
        }

        if (voucher === null) {
            return res.status(400).send('No voucher with specified voucherId');
        }

        checkVoucherExpiration(res, voucher);
    });
};

exports.validateVoucher = function (req, res) {
    Voucher.findOne({'voucherId': req.params.voucherId}, function (err, voucher) {
        if (err) {
            return res.send(err);
        }

        if (voucher === null) {
            return res.status(400).send('No voucher with specified voucherId');
        }

        if (voucher.usages === 0) {
            return res.status(400).send('Voucher already used');
        }

        voucher.usages--;
        voucher.save();

        checkVoucherExpiration(res, voucher);
    });
};

checkVoucherExpiration = function (res, voucher) {
    Campaign.findOne({'name': voucher.voucherPrefix}).sort({'startDate': -1}).limit(1).exec(function (err, campaign) {
        if ((campaign.expirationDate).getTime() < (new Date()).getTime()) {
            return res.status(400).send('Voucher expired');
        }
        else {
            res.json(voucher);
        }
    });
};