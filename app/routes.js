var voucherService = require('./services/voucherService')
var authService = require('./services/naiveAuthService')

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    // generate vouchers
    app.post('/api/vouchers/generate/:count', function (req, res) {
        authService.validateNaiveToken(req, res);
        voucherService.generateVouchers(req, res);
    });

    // get voucher by id
    app.get('/api/vouchers/:voucherId', function (req, res) {
        authService.validateNaiveToken(req, res);
        voucherService.getVoucherById(req, res);
    });

    // use voucher with specified voucherId
    app.post('/api/vouchers/use/:voucherId', function (req, res) {
        authService.validateNaiveToken(req, res);
        voucherService.validateVoucher(req, res);
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });
};
