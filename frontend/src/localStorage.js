export const getCartItems=() =>{
    const cartitems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [] ;
    return cartitems ; 
}

export const setCartitems = (cartItems) =>{
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));   
}

export const setUserInfo = ({
    id = '',
    name = '',
    email ='',
    password='',
    token ='',
    isAdmin = '',
}) =>{ 
    localStorage.setItem(
        'userinfo' , JSON.stringify({
            id,
            name,
            email,
            password,
            token,
            isAdmin,
        })
    )
}

export const getUserinfo = () =>{
    return localStorage.getItem('userinfo') 
    ? JSON.parse(localStorage.getItem('userinfo'))
    : { name: '' , email : '' , password: ''};
}

export const clearUser= () => {
    localStorage.removeItem('userinfo');
}

export const getShipping= () =>{
    const shipping = localStorage.getItem('shipping')
    ?JSON.parse(localStorage.getItem('shipping'))
    :{
        address : '',
        city : '' ,
        postalCode: '',
        country: '',
    }
    return shipping;
}

export const setShipping=({
    address = '',
    city = '' ,
    postalCode= '',
    country= '',
}) =>{
    localStorage.setItem('shipping' , 
    JSON.stringify({address,city,postalCode,country}));
};


export const getPayment= () => {
    const payment = localStorage.getItem('payment')
    ?JSON.parse(localStorage.getItem('payment'))
    :{
        paymentMethod : 'paypal',
    }
    return payment;
}

export const setPayment=({
    paymentMethod = 'paypal'
}) =>{
    localStorage.setItem('payment' , 
    JSON.stringify({paymentMethod}));
};