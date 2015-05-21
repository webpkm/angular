'use strick';

// declear module
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'partials/login.html',
			hideMenus: true
		})
		.when('/', {
			controller: 'HomeController',
			templateUrl: 'partials/home.html'
		})
		.otherwise({redirectTo: '/login'});
}])

.run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http){
		// 	keep user logged in after page refresh
		$rootScope.globals = $cookieStore.get('globals') || {};
		if($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = "Basic " + $rootScope.globals.currentUser.authData;
		}
		
		$rootScope.$on('$locationChangeStart', function(event,  next, current){
			// redirect to login page if not logged in
			if($location.path() !== 'login' && !$rootScope.globals.currentUser) {
				$location.path('/login');
			}
		});
}]);
