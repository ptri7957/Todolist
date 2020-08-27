const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const users = require('../models/users');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  await passport.authenticate('local', {
    successRedirect: '/list',
    failureRedirect: '/login'
  })(req, res, next);

});

module.exports = router;
