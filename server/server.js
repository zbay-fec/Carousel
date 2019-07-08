const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { Image, Product } = require('../db');

mongoose.connect(`mongodb+srv://landon:${process.env.MONGO_PW}@feccarousel-satgh.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.json());

app.post('/product', (req, res) => {
  let uuid = new mongoose.Types.ObjectId();
  const product = new Product({
    _id: uuid,
    name: req.body.name,
    price: req.body.price,
    condition: req.body.condition
  });

  const image = new Image({
    prodId: uuid,
    imageURL: req.body.imageURL
  });

  image.save()
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).json({message: 'an error occurred', error: err}));

  product.save()
    .then(result => {
      console.log(result);
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
});

app.get('/images', (req, res) => {
  Image.find()
    .exec()
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).json({message: 'There was an error with your request', error: err}));
});

app.get('/products', (req, res) => {
  Product.find()
    .exec()
    .then(results => res.send(results))
    .catch(err => res.status(500).json({message: 'There was an error with your request', error: err}));
});

app.get('/product:id', (req, res) => {
  Product.findById(req.query.id)
    .exec()
    .then(results => res.status(200).send(results))
    .catch(err => {
      res.status(500).json({message: 'Invalid ID', error: err});
      console.log(err);
    });
});

app.listen(3008, () => console.log('Up and running on port 3008'));