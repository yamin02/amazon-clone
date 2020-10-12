export const getCartItems=() =>{
    const cartitems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [] ;
    return cartitems ; 
}

export const setCartitems = (cartItems) =>{
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));   
}