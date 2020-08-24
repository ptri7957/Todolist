const mongoose = require('mongoose');
const items = require('./items');

const listSchema = mongoose.Schema({
  title: String,
  list: [items.itemSchema]
});

const List = mongoose.model("List", listSchema);

module.exports.List = List;
module.exports.listSchema = listSchema;
