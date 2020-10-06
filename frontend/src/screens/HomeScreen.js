//import data from "../data.js";

const HomeScreen = {
  rend: async () => {
    //const { products } = data;
    const option = {
      headers: {
        "content-Type" : "application/json" ,},
    }
    const response = await fetch('http://localhost:3000/api/products', option)
    if(!response || !response.ok){console.log('eror in fetch data from server');}
    const products = await response.json() ;
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
        <div class="product-price">
          $${product.price}
        </div>
        <a href="/#/product/${product._id}">SEE DETAILS</a>
        </div>
      </li>`).join("\n")} `;
  },
};
export default HomeScreen;