angular.module('voucherController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', function ($scope, $http, Vouchers) {
        $scope.formData = {};
        $scope.errorMessage;

        $scope.productData = {
            selectedProductPrice: 0,
            currentProductPrice: 0,
            products: [
                {'id': 1, 'name': 'Certificate', 'price': 700},
                {'id': 2, 'name': 'Conference', 'price': 400},
                {'id': 3, 'name': 'Workshop', 'price': 3000}
            ]
        };

        $scope.calculatePrice = function () {
            if ($scope.formData.voucherCode != undefined) {
                Vouchers.validateVoucher($scope.formData.voucherCode)
                    .success(function (voucher) {
                        if (!voucher.used) {
                            calculateNewPriceWithDiscount();
                        } else {
                            $scope.errorMessage = "Voucher already used!";
                        }
                    })
                    .error(function (voucher) {
                        $scope.errorMessage = "Invalid voucher!";
                    });
            }
        };

        $scope.updatePrice = function () {
            $scope.productData.currentProductPrice = $scope.productData.selectedProductPrice;
        };

        this.calculateNewPriceWithDiscount = function(discount) {
            var productPrice = $scope.productData.selectedProductPrice;
            $scope.productData.currentProductPrice = productPrice - (productPrice * discount / 100);
            $scope.errorMessage = null;
        };

        $scope.useVoucher = function () {
            if ($scope.formData.voucherCode != undefined) {
                Vouchers.useVoucher($scope.formData.voucherCode)
                    .success(function (voucher) {
                        calculateNewPriceWithDiscount();
                    })
                    .error(function (voucher) {
                        $scope.errorMessage = "Invalid voucher!";
                    });
            }
        };

    });