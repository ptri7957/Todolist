const express = require('express');
const lists = require('../models/lists');
const todo = require('../controllers/todo');
const items = require('../models/items');

const router = express.Router();

router.get('/', (req, res) => {
  if(req.user){
    //console.log(req.user.id);
    todo.getItems(req, res);
  }else{
    res.redirect('/login');
  }
});

router.post('/', async (req, res, next) => {
  const item = new items.Item({
    title: req.body.title,
    description: req.body.description
  });

  if(req.body.submit == "Today"){
    todo.postItems(req,res,next);
  }else{
    todo.postItemToList(req, res, next);
  }
});

router.post('/delete', async (req, res, next) => {
  if(req.body.hidden == "Today"){
    todo.deleteItems(req, res, next);
  }else{
    todo.deleteItemFromExtList(req, res, next)
  }
});

router.get('/:listName', async (req, res, next) => {
  if(req.user){
    todo.getItemsFromExtList(req, res, next);
  }else{
    res.redirect('/login');
  }

});

module.exports = router;
