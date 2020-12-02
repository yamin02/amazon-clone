import { getProduct } from '../api.js';
import Rating from '../components/ratings.js';
/* eslint-disable no-unused-vars */
import {parserequestUrl} from '../utils.js';
const ProductScreen ={
    after_render: () =>{
        const request = parserequestUrl() ;
        document.getElementById('add-button').addEventListener('click', ()=>{
            document.location.hash = `/realorder/${request.id}` ;
          
        })
    },
    rend: async () =>{
        const request = parserequestUrl() ;
        const product = await getProduct(request.id);
        if(product.error){
            return `<div>${product.error} error : Sorry no product found </div>`
        }
        return `<div class="content">
        <div class="back-to-result">
          <a href="/#/">Back to result </a>
        </div>
        <div class="details">
          <div class="details-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="details-info">
            <ul>
              <li>
                <h1>${product.name}</h1>
              </li>
              <li>
              ${Rating.rend({
                value: product.rating,
                text: `${product.numReviews} reviews`,
              })}
              </li>
              <li>
                Price: <strong>BDT ${product.price}</strong>
              </li>
              <li>
                Description:
                <div>
                  ${product.description}
                </div>
              </li>
            </ul>
          </div>
          <div class="details-action">
              <ul>
                <li>
                  Price: $${product.price}
                </li>
                <li>
                  Status : 
                    ${product.countInstock > 0
                        ? `<span class="success">In Stock</span>`
                        : `<span class="error">Unavailable</span>`
                      }
                </li>
                <li>
                    <button id="add-button" class="fw primary">Buy Now</div>
              </ul>
          </div>
        </div>
      </div>`;
    },
};

export default ProductScreen ;