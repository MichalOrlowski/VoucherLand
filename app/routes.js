var Voucher = require('./models/voucher');
var voucherCodes = require('voucher-code-generator');
var voucherGenerator = require('./utils/voucherGenerator');

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    // generate vouchers
    app.post('/api/vouchers/generate/:count', function (req, res) {
        validateNaiveToken(req, res);
        var generatedVouchersCount = req.params.count;

        if (generatedVouchersCount >= 1 && generatedVouchersCount <= 100) {
            var generatedVoucherCodes = voucherCodes.generate({
                length: 8,
                count: generatedVouchersCount
            });

            var generatedVouchers = [];
            generatedVoucherCodes.forEach(function (code) {
                generatedVouchers.push({voucherId: code, used: false, discount: voucherGenerator.randomNumber(1, 50)});
            });

            Voucher.collection.insert(generatedVouchers);

            res.json(generatedVouchers);
        }
        else {
            res.status(400).send('Wrong vouchers count number');
        }
    });

    // get voucher by id
    app.get('/api/vouchers/:voucherId', function (req, res) {
        validateNaiveToken(req, res);
        Voucher.findOne({'voucherId': req.params.voucherId}, function (err, voucher) {
            if (err) {
                res.send(err);
            }

            if(voucher === null) {
                res.status(400).send('No voucher with specified voucherId');
            }

            res.json(voucher);
        });

    });

    // use voucher with specified voucherId
    app.put('/api/vouchers/use/:voucherId', function (req, res) {
        validateNaiveToken(req, res);
        Voucher.findOne({'voucherId': req.params.voucherId}, function (err, voucher) {
            if (err) {
                res.send(err);
            }

            if(voucher === null) {
                res.status(400).send('No voucher with specified voucherId');
            }

            if(voucher.used) {
                res.status(400).send('Voucher already used');
            }

            voucher.used = true;
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
validateNaiveToken = function(req, res) {
    var naiveToken = req.header('NaiveToken');
    if(naiveToken != 'NaiveToken') {
        res.status(401).send('User unauthorized');
    }
};