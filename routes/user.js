var express = require('express'),
    router = express.Router(),
    bCrypt = require('bcrypt-nodejs'),
    user = require('../models/user'),
    jwt = require('jwt-simple'),
    secret = 'Meow Wowme';

module.exports = function(passport){
  // pass passport for configuration
  passConfig = require('../config/passport')(passport);
  userController = require('../controllers/userController')(passport);
  //sign up
  router.post('/signup', function(req, res) {
    console.log('Trying to signup username: ' + req.body);

    var username = req.body.username;
    var password = req.body.password;
    console.log('Login username : ' + username);
    console.log('Login password : ' + password);
    userController.signup({username: username,
                          password: password}, function(err, result){
                            if(err){
                              res.json({success: false, message: "Unable to create an account. Please contact support."})
                            } else {
                              res.json(result);
                            }
                          });
  });

  router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    console.log('Login username : ' + username);
    console.log('Login password : ' + password);
    userController.login({username: username,
                          password: password}, function(err, result){
                            if(err || !result.success){
                              res.json({success: false, message: "Invalid username/password"})
                            } else {
                              res.json(result);
                            }
                          });

  });

  router.get('/:viewName', function(req, res, next){
    var viewName = req.params.viewName;
    if(viewName === 'login'){
      res.render('user/login');
    } else{ //All other views should be authenticaed
      try {
        passport.authenticate('jwt', {session: false}, function(err, userInfo, next){
          if(userInfo){//If authentication successful
            console.log('Username : ' + userInfo.username);
            user.checkUserAvailability({username: userInfo.username}, function(err, userData) {
              if (err) { return res.json({success:false, msg: err})};
              console.log("After check user " + userData[0]);
              if (!userData) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
              } else {
                res.json({success: true, msg: 'Welcome in the member area ' + userData[0].username + '!'});
              }
            });
          } else{
            return res.status(403).send({success: false, msg: 'Authentication failed.'});
          }
        })(req, res, next);
      } catch (e) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
      }
    }
  });
  return router;
}
