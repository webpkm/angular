'use strict';

angular.module('Authentication')

.controller('LoginController',
	['$scope', '$rootScope', '$location', 'AuthenticationService',
	function($scope, $rootScope, $location, AuthenticationService) { 
	    AuthenticationService.ClearCredentials();
	
		$scope.login = function() {
			$scope.dataLoading = true;
			
			AuthenticationService.login($scope.username, $scope.password, function(response) {
				if(response.success) {
					AuthenticationService.SetCredential($scope.username, $scope.password);
					$location.path('/');
				} else {
					$scope.error = response.message;
					$scope.dataLoading = false;
				}
			});
		};
	}]);