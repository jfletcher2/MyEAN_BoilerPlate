'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('gliese')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'layout/sidebar',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){

        $scope.active = true;
        $scope.active1 = true;
        console.log("$scope.active  : " + $scope.active);
        console.log("$scope.active1 : " + $scope.active1);
        // $scope.selectedMenu = 'dashboard';
        // $scope.collapseVar = 0;
        // $scope.multiCollapseVar = 0;
        // console.log('CollapseVar : ' + $scope.collapseVar);
        // $scope.check = function(x){
        //
        //   if(x==$scope.collapseVar)
        //     $scope.collapseVar = 0;
        //   else
        //     $scope.collapseVar = x;
        // };
        //
        // $scope.multiCheck = function(y){
        //
        //   if(y==$scope.multiCollapseVar)
        //     $scope.multiCollapseVar = 0;
        //   else
        //     $scope.multiCollapseVar = y;
        // };
      }
    }
  }]);
