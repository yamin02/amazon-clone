import { getProduct } from '../api.js';
import { getCartItems, setCartitems } from '../localStorage.js';
/* eslint-disable no-unused-vars */
import { parserequestUrl,  rerender} from '../utils.js';



//cart action Functions 
const addT0cart= (item , forceUpdate = false)=>{
  let  cartItems = getCartItems();
  const existItems = cartItems.find((x)=> x.product === item.product );
  // if selected product is already in cart no need to update cart
  if(existItems){
   if(forceUpdate){   // used when quantity changes   
    cartItems = cartItems.map((x)=>
    x.product === existItems.product ? item : x ,
    );
  }
  }else{
    cartItems = [...cartItems , item];  
  }
  if(forceUpdate){
    rerender(Cartscreen);
  }
  setCartitems(cartItems);
};

export const removefromcart =(id) =>{
  setCartitems(getCartItems().filter((x)=> x.product !== id));
  if(id === parserequestUrl().id){
    document.location.hash ='/cart';
  }else{
    rerender(Cartscreen);
  }
}


const Cartscreen = {
  after_render:() => {
    const qtyselect = document.getElementsByClassName('qty-select'); 
    Array.from(qtyselect).forEach((qt)=>{
      qt.addEventListener('change', (e) =>{
        const item = getCartItems().find((x) => x.product === qt.id);
        addT0cart({...item , qty:Number(e.target.value) }, true) ;
      });  
    })

    const delbtn = document.getElementsByClassName('delete-button');
    Array.from(delbtn).forEach((de)=>{
      de.addEventListener('click', ()=>{
        removefromcart(de.id);
      });
    })

    document.getElementById('checkout-button').addEventListener('click',() =>{
      document.location.hash = '/shipping' ;
    })
  } ,

  rend: async ()=> {
    const request = parserequestUrl();
    if(request.id){
      const product = await getProduct(request.id);
      addT0cart({
        product : product._id ,
        name:product.name ,  
        price : product.price , 
        qty:1 ,
        image:product.image ,
        countInstock: product.countInstock ,   
      });
    }
    const cartItems = getCartItems();
    return  `<div class="content cart">
    <div class="cart-list">
    <h1>${cartItems.length}</h1>
      <ul class="cart-list-container">
        <li>
          <h3>Shopping Cart</h3>
          <div>Price</div>
        </li>
        ${cartItems.length === 0 
        ?'<div>Cart is empty. <a href="/#/">Go Shopping</a>'
        :cartItems.map((item) => ` 
          <li>
            <div class="cart-image">
              <img src='${item.image}' alt="${item.name}" />
            </div>
            <div class="cart-name">
              <div>
                <a href="/#/product/${item.product}">
                  ${item.name}
                  ${item.countInstock}
                  ${item.qty}
                </a>
              </div>
              <div>
              <h1>${[...Array(item.countInstock).keys()]}</h1>
              Qty: 
              <select class="qty-select" id="${item.product}">
              ${[...Array(item.countInstock).keys()].map((x) => 
               item.qty === x+1 ? 
                `<option selected value="${x + 1}">${x + 1}</option>`
                :`<option  value="${x + 1}">${x + 1}</option>` 
              )}  
              </select>
                <button type="button" class="delete-button" id="${item.product}" >
                  Delete
                </button>
              </div>
            </div>
            <div class="cart-price">
              $${item.price}
            </div>
          </li>` ).join('\n')
        } 
      </ul>
    </div>
    <div class="cart-action">
        <h3>
          Subtotal (${cartItems.reduce((a, c) => a + c.qty , 0)} items)
          :
          $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button id="checkout-button" class="primary fw">
          Proceed to Checkout
        </button>
    </div>
  </div>`
  }
} 

export default Cartscreen ;