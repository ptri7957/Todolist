const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const users = require('../models/users');
const passport = require('passport');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res, next) => {
  const username = req.body.username;
  await users.findOne({ username: username }, (err, foundUser) => {
    if(foundUser){
      res.redirect('/register');
    }else{
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(!err){
          users.create({
            username: username,
            password: hash
          }, (err) => {
            if(!err){
              passport.authenticate('local', {
                successRedirect: '/list',
                failureRedirect: '/login'
              })(req, res, next);
            }
          });

        }else{
          next(err);
        }
      });
    }
  });
});

module.exports = router;
