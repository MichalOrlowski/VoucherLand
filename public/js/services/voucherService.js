angular.module('voucherService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Vouchers', function($http) {
		return {
			validateVoucher : function(voucherCode) {
				return $http.get('/api/vouchers/' + voucherCode);
			},
			useVoucher : function(voucherCode) {
				return $http.put('/api/vouchers/use/' + voucherCode);
			}
		}
	});