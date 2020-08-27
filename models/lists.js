const mongoose = require('mongoose');
const items = require('./items');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  user_id: String,
  title: String,
  list: [items.itemSchema]
});

const List = mongoose.model("List", listSchema);

module.exports.List = List;
module.exports.listSchema = listSchema;
