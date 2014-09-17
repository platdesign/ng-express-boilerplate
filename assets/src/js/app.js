var app = module.exports = angular.module('app', ['ui.router']);



app.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');
		$stateProvider.state('app', {
			url:'/',
			templateUrl:'/assets/html/app.html'
		});

}]);




angular.bootstrap($('html'), [app.name]);
