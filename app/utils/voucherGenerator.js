// Random integer number between low and high
exports.randomNumber = function (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};
