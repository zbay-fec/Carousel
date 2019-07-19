import React from 'react';
import axios from 'axios';
import BHCarousel from '@brainhubeu/react-carousel';
import Image from './Image.jsx';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 'AVR693z',
      currentProduct: {},
      relatedProducts: [],
      carousel1Value: 0,
      carousel2Value: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.carousel1OnChange = this.carousel1OnChange.bind(this);
    this.carousel2OnChange = this.carousel2OnChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('productChanged', e =>
      this.setState({ currentProductId: e.detail.id })
    );
    this.getCurrentProduct(this.state.currentProductId).then(() =>
      this.getRelatedProductsWithImages(this.state.currentProduct.category)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentProductId !== prevState.currentProductId) {
      this.getCurrentProduct(this.state.currentProductId).then(() =>
        this.getRelatedProductsWithImages(this.state.currentProduct.category)
      );
    }
  }

  getCurrentProduct(prodID) {
    return axios
      .get(`http://zbay.landonbaker.me:3008/products/id?id=${prodID}`)
      .then(result => result.data)
      .then(product => this.setState({ currentProduct: product }))
      .catch(err => console.log(err));
  }

  getRelatedProductsWithImages(category) {
    return axios
      .get(`http://zbay.landonbaker.me:3008/products/category?cat=${category}`)
      .then(results => results.data)
      .then(results => {
        return Promise.all(
          results.map(product => {
            return axios
              .get(
                `http://zbay.landonbaker.me:3008/images/prodID?prodID=${product._id}`
              )
              .then(results => results.data)
              .then(results => {
                product.images = results;
                return product;
              })
              .catch(err =>
                console.log('There was an error fetching images ', err)
              );
          })
        );
      })
      .then(productsWithImages =>
        this.setState({ relatedProducts: productsWithImages })
      )
      .catch(err =>
        console.log('There was an error getting related products ', err)
      );
  }

  handleClick(e, id) {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent('productChanged', {
        detail: {
          id: id
        }
      })
    );
  }

  carousel1OnChange(carousel1Value) {
    this.setState({ carousel1Value });
  }

  carousel2OnChange(carousel2Value) {
    this.setState({ carousel2Value });
  }

  render() {
    let slides = [];
    if (this.state.relatedProducts.length) {
      slides = this.state.relatedProducts
        .filter(product => product._id !== this.state.currentProductId) // don't show current product
        .map(product => (
          <Image
            key={product._id}
            handleClick={this.handleClick}
            product={product}
          />
        ));
    }

    if (this.props.showCart === true) {
      return <div></div>;
    }

    return (
      <div>
        <div>
          <div className="carouselImageContainer">
            <div className="carouselSuggestion">
              People who viewed this item also viewed
              <span className="carouselSlideCount">
                {this.state.carousel1Value === 0 ? 1 : 2}/2{' '}
              </span>
              <a href="#" className="carouselFeedback">
                Feedback on our suggestions
              </a>
            </div>
            <br></br>
            <div>
              <BHCarousel
                arrowLeft={
                  <div
                    className={
                      this.state.carousel1Value === 0
                        ? 'carouselArrow-left carouselOpaque'
                        : 'carouselArrow-left'
                    }
                  >
                    {' '}
                    &lt;{' '}
                  </div>
                }
                arrowRight={
                  <div
                    className={
                      this.state.carousel1Value === 0
                        ? 'carouselArrow-right'
                        : 'carouselArrow-right carouselOpaque'
                    }
                  >
                    {' '}
                    &gt;{' '}
                  </div>
                }
                addArrowClickHandler
                breakpoints={{
                  1200: {
                    slidesPerPage: 5,
                    slidesPerScroll: 5
                  },
                  1000: {
                    slidesPerPage: 4,
                    slidesPerScroll: 4
                  },
                  800: {
                    slidesPerPage: 3,
                    slidesPerScroll: 3
                  },
                  650: {
                    slidesPerPage: 2,
                    slidesPerScroll: 2
                  },
                  450: {
                    slidesPerPage: 1,
                    slidesPerScroll: 1
                  }
                }}
                slides={slides.slice(0, 12)}
                slidesPerPage={6}
                slidesPerScroll={6}
                value={this.state.carousel1Value}
                onChange={this.carousel1OnChange}
              ></BHCarousel>
            </div>
          </div>
        </div>
        <div>
          <div className="carouselImageContainer">
            <div className="carouselSuggestion">
              Frequently Bought Together
              <span className="carouselSlideCount">
                {this.state.carousel2Value === 0 ? 1 : 2}/2{' '}
              </span>
              <a href="#" className="carouselFeedback">
                Feedback on our suggestions
              </a>
            </div>
            <br></br>
            <div>
              <BHCarousel
                arrowLeft={
                  <div
                    className={
                      this.state.carousel2Value === 0
                        ? 'carouselArrow-left carouselOpaque'
                        : 'carouselArrow-left'
                    }
                  >
                    {' '}
                    &lt;{' '}
                  </div>
                }
                arrowRight={
                  <div
                    className={
                      this.state.carousel2Value === 0
                        ? 'carouselArrow-right'
                        : 'carouselArrow-right carouselOpaque'
                    }
                  >
                    {' '}
                    &gt;{' '}
                  </div>
                }
                addArrowClickHandler
                slides={[...slides.slice(10), ...slides.slice(0, 3)]}
                slidesPerPage={6}
                slidesPerScroll={6}
                breakpoints={{
                  1200: {
                    slidesPerPage: 5,
                    slidesPerScroll: 5
                  },
                  1000: {
                    slidesPerPage: 4,
                    slidesPerScroll: 4
                  },
                  800: {
                    slidesPerPage: 3,
                    slidesPerScroll: 3
                  },
                  650: {
                    slidesPerPage: 2,
                    slidesPerScroll: 2
                  },
                  450: {
                    slidesPerPage: 1,
                    slidesPerScroll: 1
                  }
                }}
                value={this.state.carousel2Value}
                onChange={this.carousel2OnChange}
              ></BHCarousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
