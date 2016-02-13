angular.module('voucherController', [])
    .controller('mainController', function ($scope, $http, Vouchers) {
        $scope.formData = {};
        $scope.errorMessage;
        $scope.successMessage;

        $scope.productData = {
            selectedProductPrice: 700,
            currentProductPrice: 0,
            voucherDiscount: 0,
            voucherDiscountType: '',
            products: [
                {'id': 1, 'name': 'Certificate', 'price': 700},
                {'id': 2, 'name': 'Conference', 'price': 400},
                {'id': 3, 'name': 'Workshop', 'price': 3000}
            ]
        };

        $scope.calculatePrice = function () {
            $scope.clearMessages();
            if ($scope.formData.voucherCode != undefined) {
                Vouchers.validateVoucher($scope.formData.voucherCode)
                    .success(function (voucher) {
                        if (voucher.usages > 0) {
                            $scope.processNewDiscount(voucher);
                            $scope.successMessage = "Voucher is valid!"
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
            $scope.productData.voucherDiscount = 0;
            $scope.productData.voucherDiscountType = '';

            $scope.clearMessages();
        };

        $scope.clearMessages = function() {
            $scope.errorMessage = null;
            $scope.successMessage = null;
        }

        $scope.processNewDiscount = function(voucher) {
            $scope.clearMessages();
            $scope.calculateNewPriceWithDiscount(voucher);

            $scope.productData.voucherDiscount = voucher.discount;
            $scope.productData.voucherDiscountType = voucher.discountType;
        };

        $scope.calculateNewPriceWithDiscount = function(voucher) {
            var productPrice = $scope.productData.selectedProductPrice;

            if(voucher.discountType === '%') {
                $scope.productData.currentProductPrice = productPrice - (productPrice * voucher.discount / 100);
            } else if(voucher.discountType === 'PLN') {
                $scope.productData.currentProductPrice = productPrice - voucher.discount;
            }
        };

        $scope.useVoucher = function () {
            if ($scope.formData.voucherCode != undefined) {
                Vouchers.useVoucher($scope.formData.voucherCode)
                    .success(function (voucher) {
                        $scope.processNewDiscount(voucher);
                        $scope.successMessage = "You bought item with lower price!";
                    })
                    .error(function (voucher) {
                        $scope.errorMessage = "Invalid voucher!";
                    });
            }
        };

    });