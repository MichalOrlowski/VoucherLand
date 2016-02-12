angular.module('voucherController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', function($scope, $http, Vouchers) {
		$scope.formData = {};

        $scope.productData = {
            selectedProductPrice: 0,
            currentProductPrice: 0,
            products: [
                {'id':1, 'name':'Certificate', 'price':700},
                {'id':2, 'name':'Conference', 'price':400},
                {'id':3, 'name':'Workshop', 'price':3000}
            ]
        };

        $scope.calculatePrice = function() {
            if($scope.formData.voucherCode != undefined) {
                Vouchers.validateVoucher($scope.formData.voucherCode)
                    .success(function(voucher) {
                        $scope.productData.currentProductPrice = 666;
                });
            }
        };

        $scope.updatePrice = function() {
          $scope.productData.currentProductPrice = $scope.productData.selectedProductPrice;
        };

	});