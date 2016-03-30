var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
// load up the user model
var user = require('../models/user');
var dbConfig = require('./db');

module.exports = function(passport) {

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = dbConfig.secret;

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      console.log("Trying to login under username " + jwt_payload);
      user.checkUserAvailability({username: jwt_payload}, function(err, usr){
        if(err){
          return done(err, "Error while checking user availability");
        }

        console.log("Check user availability : ");
        console.log(usr);
        userData = usr[0];
        if(userData){

          returnData = {
              username : userData.username
            }
          return done(null, returnData);
        } else {
          return done({success: false, message: "User is not authorized to do the corresponding operation!"}, null)
        }

      });
  }));
}
