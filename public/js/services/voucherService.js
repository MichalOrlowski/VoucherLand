angular.module('voucherService', [])

	// each function returns a promise object
	.factory('Vouchers', function($http) {
		var config = {
			headers: {
				'NaiveToken': 'NaiveToken',
			}
		};

		return {
			validateVoucher : function(voucherCode) {
				return $http.get('/api/vouchers/' + voucherCode, config);
			},
			useVoucher : function(voucherCode) {
				return $http.put('/api/vouchers/use/' + voucherCode, config);
			}
		}
	});