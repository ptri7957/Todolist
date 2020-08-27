const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  user_id: String,
  title: String,
  description: String
});

itemSchema.methods.getTitle = function(){
  return this.title;
}

itemSchema.methods.getDescription = function(){
  return this.description;
}

const Item = mongoose.model("Item", itemSchema);

module.exports.Item = Item;
module.exports.itemSchema = itemSchema;
