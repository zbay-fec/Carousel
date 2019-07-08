import React from 'react';
import axios from 'axios';

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
      .then(() => {
        console.log('trying to get related with this category: ', this.state.currentProduct.category);
        this.getRelatedProductsWithImages(this.state.currentProduct.category);
      });
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
        for (let product of results) {
          axios.get(`http://localhost:3008/images/prodID?prodID=${product._id}`)
            .then(results => results.data)
            .then(results => product.images = results)
            .catch(err => console.log('There was an error fetching images ', err));
        }
        return results;
      })
      .then(productsWithImages => this.setState({relatedProducts: productsWithImages}))
      .catch(err => console.log('There was an error getting related products ', err));
  }

  render() {
    return (
      <div>
        <h1 id="example">Carousel goes here</h1>
        {/* <h4>{this.state.relatedProducts.length === 0 ? '' : this.state.relatedProducts[0].name}</h4>
        <img width="100" height="100" src={this.state.images.length === 0 ? '#' : this.state.images[0].imageURL}></img> */}
      </div>
    );
  }
}