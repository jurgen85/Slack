'use strict';

var app = angular.module('SlAngular', ['ui.router', 'ngResource']);

app.constant('authSettings', {
	baseUrl 	 : 'https://slack.com/oauth/authorize',
	client_id    : '2525824863.13687757587',
	client_secret: '0ef18eaeecead37b16a7c49d1b4341d3',
	redirect_uri : 'http://slack.jurgendevries.nl',
	scope        : 'client',
	state        : 'hUFI893nrb3bf93r',
	team         : 'T02FFQ8RD'
});

app.constant('apiSettings', {
	apiUrl: 'https://slack.com/api/',
	channel: 'jurgen'
});

app.run(function($rootScope) {
    $rootScope.isAuthenticated = false;
    $rootScope.username = '';
})

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

    $stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'js/partials/home.html',
		controller: 'MainCtrl'
	})
	.state('login', {
		url: '/login',
		template: '<h1>Login</h1>',
		controller: 'AuthCtrl'
	})
	.state('about', {
    	url: '/about',
		template: '<h1>About</h1>'
    });
}])
