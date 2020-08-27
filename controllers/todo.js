const items = require('../models/items');
const lists = require('../models/lists');

module.exports.getItems = (req, res) => {
  items.Item.find({user_id: req.user.id}, (err, foundItems) => {
      if(err){
        console.log(err);
      }else{
        res.render('list', {
          title: "Today",
          items: foundItems
        });
      }
    });
}

module.exports.getItemsFromExtList = async (req, res, next) => {
  try {
    await lists.List.findOne({user_id: req.user.id, title: req.params.listName}, (err, foundList) => {
      if(!foundList){
        const item = new items.Item({
          user_id: req.user.id,
          title: "TODO",
          description: "Todo"
        });
        const newList = new lists.List({
          user_id: req.user.id,
          title: req.params.listName,
          list: [item]
        });
        newList.save();
        console.log("CREATED");
        res.redirect('/list/' + req.params.listName);
      }else{
        res.render('list', {
          title: req.params.listName,
          items: foundList.list
        });
      }

    });
  } catch (e) {

  }
}

module.exports.deleteItemFromExtList = async (req, res, next) => {
  try {
    await lists.List.findOneAndUpdate({user_id: req.user.id, title: req.body.hidden}, {$pull: {list: {title: req.body.delete}}}, (err) => {
      if(!err){
        res.redirect('/list/' + req.body.hidden);
      }
    });
  } catch (e) {
    console.log(next(e));
  }
}

module.exports.postItems = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    await items.Item.create({user_id: req.user.id, title: title, description: description}, (err) => {
      if(err){
        console.log(err);
      }else{
        console.log("Item posted successfully");
        res.redirect('/');
      }
    });

  } catch (e) {
    next(e)
  }
}

module.exports.postItemToList = async (req, res, next) => {

  await lists.List.findOne({user_id: req.user.id, title: req.body.submit}, (err, foundList) => {
    if(!err){
      const item = new items.Item({
        user_id: req.user.id,
        title: req.body.title,
        description: req.body.description
      });
      foundList.list.push(item);
      foundList.save();
      res.redirect('/list/' + req.body.submit);
    }
  });

}

module.exports.deleteItems = async (req, res, next) => {
  try {
    const title = req.body.delete;

    await items.Item.deleteOne({user_id: req.user.id, title: title}, (err) => {
      if(err){
        console.log(err);
      }else{
        console.log("Deleted successfully");
        res.redirect('/');
      }
    })
  } catch (e) {
    next(e)
  }
}
