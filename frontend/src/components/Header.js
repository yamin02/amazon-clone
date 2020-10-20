import { getUserinfo } from "../localStorage";

const Header = {
    after_render :() =>{
    },
    rend : () =>{
        const {name} = getUserinfo();
        console.log({name});
        return `<div class= 'brand'>
        <a href="/#/">js amazon</a>
    </div>
    <div>
    ${name 
    ? `<a href="/#/profile">${name}</a>`
    : '<a href="/#/signin">Sign-In</a>'
    }
        <a href="/#/cart">Cart</a>
    </div>`
    }
}

export default Header;