const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.user){
    res.redirect('/list');
  }else{
    res.render('home');
  }

});

module.exports = router;
