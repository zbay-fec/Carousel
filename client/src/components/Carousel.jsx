import React from 'react';
import axios from 'axios';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      relatedProducts: [],
      images: []
    };
  }

  componentDidMount() {
    window.addEventListener('productChanged', e => this.setState({productId: e.detail.id}));
    axios.get(`http://localhost:3008/products`)
      .then(results => results.data)
      .then(products => this.setState({relatedProducts: products}))
      .catch(err => console.log(err));
    axios.get(`http://localhost:3008/images`)
      .then(results => results.data)
      .then(results => this.setState({images: results}))
      .catch(err => console.log(err));  
  }

  render() {
    return (
      <div>
        <h1 id="example">Carousel goes here</h1>
        <h4>{this.state.relatedProducts.length === 0 ? '' : this.state.relatedProducts[0].name}</h4>
        <img width="100" height="100" src={this.state.images.length === 0 ? '#' : this.state.images[0].imageURL}></img>
      </div>
    );
  }
}