angular.module('gliese')
.controller('AuthController', function($scope, $rootScope, $state, AuthService, TokenService){
  $scope.user = {
    username: '',
    password: ''

  };
  $scope.error_message = '';
  $scope.login = function() {
    AuthService.login($scope.user)
      .then(
        function(res) {
          if(res.success){
            var userInfo = {
              username: res.message.username,
              isAuthenticated: true,
              access_token: res.message.token
            };
            TokenService.setCurrentUser(userInfo);
            $rootScope.$broadcast('authorized');
            $state.go('home');
          } else{
            $scope.error_message = res.message;
          }
        },
        function(errMsg) {
          $scope.error_message = errMsg;
        }
      );
  };

  $rootScope.$on('logout', function(){
    var user = TokenService.getCurrentUser();
    user.access_token = '';
    user.isAuthenticated = false;
    AuthService.logout();
    TokenService.setCurrentUser(user);
    $rootScope.$broadcast('unauthorized');
    $state.go('login');
  });
});
