var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var mongoose = require("mongoose");
var User = mongoose.model("User");
var configAuth = require('./auth');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        User.findOne({"facebook.id" : profile.id}, function(err, user ){
          if(err)
          return done(err);

          if(user)
          return done(null, user);

          else{
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.name.givenName + '' + profile.name.familyName;

            newUser.save(function(err){
              if(err)
              throw err;

              return done(null, newUser);
            })
          }


      });
    });
  }
));
