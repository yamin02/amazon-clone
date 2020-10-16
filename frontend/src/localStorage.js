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
    _id = '',
    name = '',
    email ='',
    password='',
    token ='',
    isAdmin = '',
}) =>{ localStorage.setItem(
        'userinfo' , JSON.stringify({
            _id,
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