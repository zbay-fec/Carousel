const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require('chai');
const { Product, Image } = require('../../db');
let mongoServer;

mongoose.Promise = Promise;

before(done => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then(mongoUri => {
      return mongoose.connect(mongoUri, { useNewUrlParser: true }, err => {
        if (err) done(err);
      });
    })
    .then(() => {
      let newProduct = new Product({
        _id: '191928',
        name: 'myNewProduct',
        price: 19.99,
        category: 'knives',
        itemDescription: 'super new'
      });
      newProduct.save();
    })
    .then(() => done());
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Post new products to the database', () => {
  it('stores a new product', async () => {
    const cnt = await Product.countDocuments();
    expect(cnt).to.equal(1);
  });
  it('contains all of the relevant product properties', async () => {
    const storedProduct = await Product.find();
    expect(storedProduct[0]).to.have.property('name');
    expect(storedProduct[0]).to.have.property('price');
    expect(storedProduct[0]).to.have.property('category');
    expect(storedProduct[0]).to.have.property('itemDescription');
  });
});
