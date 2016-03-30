'use strict';

angular.module('gliese')
	.directive('headerContent', ['TokenService' , function(TokenService){

		return {
        templateUrl:'layout/header-content',
        restrict: 'E',
        replace: true,
				controller: 'HeaderContentController'
    	}
	}]);
