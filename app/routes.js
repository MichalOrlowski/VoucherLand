var Voucher = require('./models/voucher');
var Campaign = require('./models/campaign');
var voucherGenerator = require('./utils/voucherGenerator');

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    // generate vouchers
    app.post('/api/vouchers/generate/:count/campaign/:campaign', function (req, res) {
        validateNaiveToken(req, res);
        generateVouchers(req, res);
    });

    app.post('/api/vouchers/generate/:count', function (req, res) {
        validateNaiveToken(req, res);
        generateVouchers(req, res);
    });

    generateVouchers = function (req, res) {
        var generatedVouchersCount = req.params.count;
        if (generatedVouchersCount >= 1 && generatedVouchersCount <= 100000) {
            var campaignName = req.params.campaign;

            if (campaignName) {
                Campaign.collection.insert({name: campaignName, startDate: new Date()});
            }
            var query = Campaign.find({}).sort({'startDate': -1}).limit(1);

            query.exec(function (err, campaign) {
                if (err) {
                    return res.status(500).send(err);
                }

                var generatedVouchers = voucherGenerator.generateVouchers(generatedVouchersCount, campaign[0].name);
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

    // get voucher by id
    app.get('/api/vouchers/:voucherId', function (req, res) {
        validateNaiveToken(req, res);
        Voucher.findOne({'voucherId': req.params.voucherId}, function (err, voucher) {
            if (err) {
                return res.send(err);
            }

            if (voucher === null) {
                return res.status(400).send('No voucher with specified voucherId');
            }

            res.json(voucher);
        });

    });

    // use voucher with specified voucherId
    app.post('/api/vouchers/use/:voucherId', function (req, res) {
        validateNaiveToken(req, res);
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

            res.json(voucher);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

// util methods -------------------------------------------------------------
validateNaiveToken = function (req, res) {
    var naiveToken = req.header('NaiveToken');
    if (naiveToken != 'NaiveToken') {
        res.status(401).send('User unauthorized');
    }
};