//import data from "../data.js";
import axios from 'axios' ;
import Rating from '../components/ratings';
import { apiUrl } from '../config';
import { hideloading, showloading } from '../utils';

const HomeScreen = {
  rend: async () => {
    showloading();
    //const { products } = data;
    const response = await axios({
      url : `${apiUrl}/api/products`,
      headers: {
        "content-Type" : "application/json" ,},
    });
    hideloading();
    if(!response || response.statusText !== 'OK')
    {console.log('eror in fetch data from server');}
    const products = await response.data ;
    return `
    <ul class="products">
      ${products.map((product) => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/${product._id}">
            ${product.name}
          </a>
        </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class = 'product-ratin'>
        ${Rating.rend({
          value: product.rating , 
          text: product.numReviews + 'reviews' 
        })}
        </div>
        <div class="product-price">
          $${product.price}
        </div>
        <a href="/#/product/${product._id}">SEE DETAILS</a>
        </div>
      </li>`).join("\n")} `;
  },
};
export default HomeScreen;