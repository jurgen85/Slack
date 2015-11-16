'use strict';

app.controller('MainCtrl', 
	['$scope', '$rootScope', 'authSettings', 'apiSettings', 
	function($scope, $rootScope, authSettings, apiSettings) {
		
		if (!$rootScope.isAuthenticated) {
			window.location.href = '/login';		
		}
		
		console.log($rootScope);
		alert('test');
}]);
