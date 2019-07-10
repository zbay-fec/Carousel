import React from 'react';
import axios from 'axios';
import ImageContainer from './ImageContainer.jsx';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 'AVR693z',
      currentProduct: {},
      relatedProducts: []
    };
  }

  componentDidMount() {
    window.addEventListener('productChanged', e => this.setState({currentProductId: e.detail.id}));
    this.getCurrentProduct(this.state.currentProductId)
      .then(() => this.getRelatedProductsWithImages(this.state.currentProduct.category));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentProductId !== prevState.currentProductId) {
      this.getCurrentProduct(this.state.currentProductId)
        .then(() => this.getRelatedProductsWithImages(this.state.currentProduct.category));
    }
  }

  getCurrentProduct(prodID) {
    return axios.get(`http://localhost:3008/products/id?id=${prodID}`)
      .then(result => result.data)
      .then(product => this.setState({currentProduct: product}))
      .catch(err => console.log(err));
  }

  getRelatedProductsWithImages(category) {
    return axios.get(`http://localhost:3008/products/category?cat=${category}`)
      .then(results => results.data)
      .then(results => {
        return Promise.all(results.map(product => {
          return axios.get(`http://localhost:3008/images/prodID?prodID=${product._id}`)
            .then(results => results.data)
            .then(results => {
              product.images = results;
              return product;
            })
            .catch(err => console.log('There was an error fetching images ', err));
        }));
      })
      .then(productsWithImages => this.setState({relatedProducts: productsWithImages}))
      .catch(err => console.log('There was an error getting related products ', err));
  }

  render() {
    return (
      <div>
        <h1 id="example">Carousel goes here</h1>
        <h5>VPX329p-knives WMX262p-swords VRZ523q-food JXE911a-flashlight XEC106q-crossbow AKG030k-tents</h5>
        <div>
          <ImageContainer products={this.state.relatedProducts} />
        </div>
        {/* <img width="100" height="100" src={this.state.images.length === 0 ? '#' : this.state.images[0].imageURL}></img> */}
      </div>
    );
  }
}

// THIS IS A TEST BRANCH