require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const home = require('./routes/home');
const lists = require('./routes/lists');
const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');

// Set up auth
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);

const app = express();

const url = "mongodb://localhost:27017/todoDB";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use('/', home);
app.use('/list', lists);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);

let port = process.env.PORT;

if(port == null || port == ""){
  port = 3000;
}

app.listen(port, (req, res) => {
  console.log("Server is running");
});
