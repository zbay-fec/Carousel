const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  category: String,
  itemDescription: String
});

const imageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  prodId: String,
  imageURL: String
});

const Product = mongoose.model('Product', productSchema);
const Image = mongoose.model('Image', imageSchema);

module.exports = { Product, Image };
