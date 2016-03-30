angular.module('gliese')
.service('AuthService', function($q, $http, API_ENDPOINT, TokenService) {
  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/user/login', user)
      .then(function(result) {
          resolve(result.data);
      });
    });
  };

  var logout = function(){
    $http.defaults.headers.common.Authorization = undefined;
  }
  return {
    login: login,
    logout: logout
  };
});
