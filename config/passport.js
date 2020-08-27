const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/users');
const bcrypt = require('bcrypt');

const initialize = (passport) => {
  passport.use(new LocalStrategy(
    { usernameField: 'username' }, (username, password, done) => {
      users.findOne({ username: username }, (err, foundUser) => {
        if(err){
          return done(err);
        }

        // If no users are found, return error
        if(!foundUser){
          return done(null, false, { message: 'Incorrect username.' })
        }else{
          bcrypt.compare(password, foundUser.password, (err, result) => {
            if(!err){
              if(!result){
                return done(null, false, { message: 'Invalid password.' });
              }else{
                return done(null, foundUser);
              }
            }
          })
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    users.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = initialize;
