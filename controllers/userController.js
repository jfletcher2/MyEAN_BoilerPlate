var JwtStrategy = require('passport-jwt').Strategy,
    bCrypt = require('bcrypt-nodejs'),
    userModel = require('../models/user'),
    jwt = require('jwt-simple'),
    dbConfig = require('../config/db');


module.exports = function(passport){
  require('../config/passport')(passport);
  userMethods = {
    login : function(user, done){
      if (typeof(user.username) == 'undefined' || typeof(user.password)  == 'undefined') {
        result = {success: false, msg: 'Please pass username and password.'};
        return done(null, result);
      } else {
        var username = user.username;
        var password = user.password;
        userModel.checkUserAvailability({username: username}, function(err, user){
          if(err){
            result = {success: false, message: "Error while checking user availability"};
            return done(err, result)
          } else{
            userData = user[0];
            if(!userData){
              //if there is no user with this username
              result = {success: false, message: 'User ' + username + ' not found.'};
              return done(null, result);
            } else {
              try {
                if(!userMethods.isValidPassword(userData, password)){
                  //Wrong password
                  result = {success: false, message: 'Incorrect password.'};
                  return done(null, result);
                }
              } catch (e) {
                result = {success: false, message: 'Fatal error occurred.'};
                return done(null, result);
              }
              var secret = dbConfig.secret;
              console.log('Secret is : ' + secret )
              var token = 'JWT ' + jwt.encode(userData.username, secret);

              result = {success: true, message: { username: username, token: token }};
              return done(null, result);
            }
          }
        });
      }
    },
    signup : function(user, done){
      if (!user.username || !user.password) {
        result = {success: false, msg: 'Please pass name and password.'};
        return done(null, result);
      }
      var username = user.username;
      var password = user.password;
      userModel.checkUserAvailability({ username: username}, function(err, userData){
        console.log('Step 1');
        if(err){
          console.log('checkUserAvailability Error :' );
          console.log(err);
          result = {success: false, msg: err};
          return done(err, result);
        }
        if(userData.length){
          console.log('checkUserAvailability userData :' );
          console.log(userData.length);
          var msg = 'Username already exists!';
          //User already exists
          result = {success: false, msg: msg};
          return done(err, result);
        }
        console.log('Check user : ');
        console.log(userData);
        var userData = {
          username: username,
          password:userMethods.createHash(password),
          salt:userMethods.generateSalt(5)
        }

        userModel.createNewUser(userData, function(err, user){
          if(err){
            result = {success: false, msg: err};
            return done(err, result);
          }
          console.log("User " + username + " successfully created.");
          console.log(user[0]);

          result = {success: true, user: user[0]};
          return done(null, result);
        });
      });
    },
    isValidPassword : function(user, password){
      return bCrypt.compareSync(password, user.password);
    },
    generateSalt : function(length){
      return  bCrypt.genSaltSync(length);
    },
    // Generates hash using bCrypt
    createHash : function(password, salt){
      return bCrypt.hashSync(password, salt, null);
    }
  };
  return userMethods;
}
