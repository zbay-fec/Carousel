import React from 'react';
import axios from 'axios';
import Image from './Image.jsx';
import BHCarousel from '@brainhubeu/react-carousel';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 'AVR693z',
      currentProduct: {},
      relatedProducts: []
    };
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e, id) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('productChanged', {
      detail: {
        id: id
      }
    }));
  }

  render() {
    let slides = [];
    if (this.state.relatedProducts.length) {
      slides = this.state.relatedProducts
        .filter(product => product._id !== this.state.currentProductId) // don't show current product
        .map(product => <Image key={product._id} handleClick={this.handleClick} product={product}/>);
    }
    
    return (
      <div>
        <h5>VPX329p-knives WMX262p-swords VRZ523q-food JXE911a-flashlight XEC106q-crossbow AKG030k-tents</h5>
        <div className="imageContainer">
          <span>People who viewed this item also viewed</span>
          <br></br>
          <div>
            <BHCarousel 
              arrows
              slides={slides}
              slidesPerPage={6}
              slidesPerScroll={6}
            >
            </BHCarousel> 
          </div>
        </div>  
      </div>
    );
  }
}