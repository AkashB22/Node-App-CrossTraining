const passport = require('passport');
const GoogleStrategy =require('passport-google-oauth20');
const mongoose = require('mongoose');
const User = require('../models/user');
//@TODO do key.js


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(userId, cb) {
  var newUser = new User({
    _id : userId
  })
  User.getUserById(newUser, function(err, user){
    if(err) throw err;
       console.log(user+'user');
    
    cb(null, user);
  });
});

passport.use(new GoogleStrategy(
    {
    //Options for google Strategy
    callbackURL : '/auth/google/redirect',
    clientID : '113713938270-n7vcuvekqpp0a81q6ngr6id1cf150gdc.apps.googleusercontent.com',
    clientSecret : 'rKX1nB16sutDG1ciVoW1w19s'
    }, function(accessToken, RefreshToken, profile, done){
    //passport callback function
    console.log('passport callback function fired');
    console.log(profile);
    var profileId = new User({
      employeeid : profile._json.sub
    });
    User.getUserByEmployeeId(profileId, function(err, existingUser){
      console.log('user is', existingUser);
      if(existingUser){
        console.log('user is', existingUser);
        done(err, existingUser)
      } else{
        var profileObj = new User({
          employeeid : profile._json.sub,
          password : null,
          password2 : null,
          username : profile.displayName,
          email : profile._json.email,
          phonenumber : null,
          domain :null,
        });
        User.findOrCreate(profileObj, function (err, user) {
            console.log('user created', user)
            done(err, user);
          });
      }
    });
    })
);

