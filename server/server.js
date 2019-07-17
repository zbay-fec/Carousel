require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { Image, Product } = require('../db');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@feccarousel-satgh.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.json());
app.use(cors());

app.get('/products', (req, res) => {
  Product.find()
    .exec()
    .then(results => res.send(results))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error with your request', error: err })
    );
});

app.get('/products/category', (req, res) => {
  Product.find({ category: req.query.cat })
    .exec()
    .then(results => res.status(200).send(results))
    .catch(err => {
      res.status(500).json({ message: 'Invalid category', error: err });
      console.log(err);
    });
});

app.get('/products/id', (req, res) => {
  Product.findById(req.query.id)
    .exec()
    .then(results => res.status(200).send(results))
    .catch(err => {
      res.status(500).json({ message: 'Invalid ID', error: err });
      console.log(err);
    });
});

app.get('/images', (req, res) => {
  Image.find()
    .exec()
    .then(results => res.status(200).send(results))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error with your request', error: err })
    );
});

app.get('/images/prodID', (req, res) => {
  Image.find({ productId: req.query.prodID })
    .exec()
    .then(results => res.status(200).send(results))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error with your request', error: err })
    );
});

app.listen(3008, () => console.log('Up and running on port 3008'));
