angular.module('voucherService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Vouchers', function($http) {
		return {
			validateVoucher : function(voucherCode) {
				return $http.get('/api/vouchers/' + voucherCode);
			}
		}
	});