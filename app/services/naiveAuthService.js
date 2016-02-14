// Naive token validator
exports.validateNaiveToken = function (req, res) {
    var naiveToken = req.header('NaiveToken');
    if (naiveToken != 'NaiveToken') {
        res.status(401).send('User unauthorized');
    }
};
