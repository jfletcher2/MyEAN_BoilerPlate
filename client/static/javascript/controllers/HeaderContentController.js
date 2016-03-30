angular.module('gliese')
.controller('HeaderContentController', [
  '$scope',
  '$rootScope',
  '$state',
  'TokenService',
  function($scope, $rootScope, $state, TokenService){
    var user = TokenService.getCurrentUser();
    if(user.isAuthenticated){
      $scope.username = user.username;
    } else{
      $state.go('login');
    }

    $scope.logout = function(){
      $rootScope.$broadcast('logout');
      $state.go('login');
    };
  }
]);
