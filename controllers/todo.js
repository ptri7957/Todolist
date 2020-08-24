const items = require('../models/items');
const lists = require('../models/lists');

module.exports.getItems = async (req, res, next) => {
  try {
    await items.Item.find({}, (err, foundItems) => {
      if(err){
        console.log(err);
      }else{
        res.render('list', {
          title: "Today",
          items: foundItems
        });
      }
    });
  } catch (e) {
    next(e);
  }
}

module.exports.getItemsFromExtList = async (req, res, next) => {
  try {
    await lists.List.findOne({title: req.params.listName}, (err, foundList) => {
      if(!foundList){
        const item = new items.Item({
          title: "TODO",
          description: "Todo"
        });
        const newList = new lists.List({
          title: req.params.listName,
          list: [item]
        });
        newList.save();
        console.log("CREATED");
        res.redirect('/' + req.params.listName);
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
    await lists.List.findOneAndUpdate({title: req.body.hidden}, {$pull: {list: {title: req.body.delete}}}, (err) => {
      if(!err){
        res.redirect('/' + req.body.hidden);
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
    await items.Item.create({title: title, description: description}, (err) => {
      if(err){
        console.log(err);
      }else{
        console.log("Item deleted successfully");
      }
    });
    res.redirect('/');
  } catch (e) {
    next(e)
  }
}

module.exports.postItemToList = async (req, res, next) => {

  await lists.List.findOne({title: req.body.submit}, (err, foundList) => {
    if(!err){
      const item = new items.Item({
        title: req.body.title,
        description: req.body.description
      });
      foundList.list.push(item);
      foundList.save();
      res.redirect('/' + req.body.submit);
    }
  });

}

module.exports.deleteItems = async (req, res, next) => {
  try {
    const title = req.body.delete;
    console.log(title);
    await items.Item.deleteOne({title: title}, (err) => {
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
