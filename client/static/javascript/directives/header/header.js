'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('gliese')
	.directive('header',function(){
		return {
        templateUrl:'layout/header',
        restrict: 'E',
        replace: true
				// ,
        // controller: ['authController', '$scope', function(authcontroller, $scope){
        //   console.log('Inside header controller');
        //   console.log('$scope.user : ' + $scope.user);
        // }]
    	}
	});
