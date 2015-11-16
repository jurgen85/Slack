'use strict';

app.controller('AuthCtrl', 
	['$scope', '$rootScope', 'authSettings', 'apiSettings', 
	function($scope, $rootScope, authSettings, apiSettings) {
		console.log($rootScope.isAuthenticated);
		
		$rootScope.currentUser = getCurrentUser();
		
		var urlParams = getParams();
		checkAuthenticated();
		
		var authUrl = authSettings.baseUrl + '?client_id=' + authSettings.client_id + 
				'&redirect_uri=' + authSettings.redirect_uri +
				'&scope=' + authSettings.scope +
				'&state=' + authSettings.state +
				'&team=' + authSettings.team;
		
		if(!$rootScope.isAuthenticated) {
			console.log('Not authenticated');
			
			if (urlParams.code && urlParams.state) {
				// code and state found in urlparams... get accestoken now
				if (urlParams.state == authSettings.state) {
					var xmlHttp = new XMLHttpRequest();
					xmlHttp.onreadystatechange = function() { 
						if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
							setAccessToken(xmlHttp.responseText);
					}
					xmlHttp.open('GET', 
						apiSettings.apiUrl + 'oauth.access?client_id=' + authSettings.client_id +
						'&client_secret=' + authSettings.client_secret +
						'&code=' + urlParams.code +
						'&redirect_uri='+ authSettings.redirect_uri,
						true); // true for asynchronous 
					xmlHttp.send(null);
				} else {
					// state is not corresponding with wath we send.
					console.log('not the right states');
				}
				
			} else {
				// no accesToken and no urlparams.. still need to authenticate
				window.location.href = authUrl;
			}
		} else {
			console.log('Already authenticated');
			window.location.href = '/';
		}
    	
		function setAccessToken(response) {
			var storeResponse = JSON.parse(response);
			$rootScope.access_token = storeResponse.access_token;
			storeUserName();
		}
		
		function setCurrentUser(response) {
			var storeResponse = JSON.parse(response);
			$rootScope.username = storeResponse.user;
		}
		
		function getAccessToken() {
			return $rootScope.access_token;
		}
		
		function getCurrentUser() {
			return $rootScope.username;
		}
		
		function checkAuthenticated() {
			if($rootScope.access_token != null) {
				$rootScope.isAuthenticated = true;
			}
		}
		
		function clearAuthentication() {
			$rootScope.access_token = ''; 
		}
		
		function getParams() {
			var params = {};
			if (location.search) {
				var parts = location.search.substring(1).split('&');
			
				for (var i = 0; i < parts.length; i++) {
					var nv = parts[i].split('=');
					if (!nv[0]) continue;
					params[nv[0]] = nv[1] || true;
				}
			}
			
			return params;
		}
		
		function storeUserName() {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() { 
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					setCurrentUser(xmlHttp.responseText);
			}
			xmlHttp.open('GET', 
				apiSettings.apiUrl + 'auth.test?token=' + getAccessToken(),
				true); // true for asynchronous 
			xmlHttp.send(null);	
		}
}]);
