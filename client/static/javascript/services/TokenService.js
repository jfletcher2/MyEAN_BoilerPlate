angular.module('gliese')
.service('TokenService', function(store){
  var service = this,
      current_user = null;

  service.setCurrentUser = function(user){
    current_user = user;
    store.set('user', user);
    return current_user;
  }

  service.getCurrentUser = function(){
    if(!current_user){
      current_user = store.get('user');
    }
    return current_user;
  }
});
