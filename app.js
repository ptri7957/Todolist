const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const lists = require('./routes/lists');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', lists);

const url = "mongodb://localhost:27017/todoDB";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url);

let port = process.env.PORT;

if(port == null || port == ""){
  port = 3000;
}

app.listen(port, (req, res) => {
  console.log("Server is running");
});
