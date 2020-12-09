import { getUserinfo } from "../localStorage";

const Header = {
    after_render :() =>{
    },
    rend : () =>{
        const {name} = getUserinfo();
        return `<div class= 'brand'>
        <a href="/#/" id= 'title'>dekte thako</a>
    </div>
    <div>
    ${name 
    ? `<a href="/#/dashboard">DashBoard</a>
    <a href="/#/profile">${name}</a>` 
    : '<a href="/#/signin">Sign-In</a>'
    }
    </div>`
    }
}

export default Header;