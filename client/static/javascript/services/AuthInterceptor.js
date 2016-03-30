angular.module('gliese')
.service('AuthInterceptor', function($rootScope, TokenService) {
  var service = this;

  service.request = function(config){
    var current_user  = TokenService.getCurrentUser(),
        access_token = current_user ?  current_user.access_token : null;

    if(access_token){
      config.headers.authorization = access_token;
    }
    return config;
  };

  service.responseError = function(response){
    if(response.status === 401){
      $rootScope.$broadcast('unauthorized');
    }
    return response;
  };
});
