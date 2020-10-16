import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { parserequestUrl } from './utils.js';
import Error404Screeen from './screens/ErrorScreen.js' ;
import Cartscreen from './screens/Cartscreen.js';
import SigninScreen from './screens/SigninScreen.js';
import Header from './components/Header.js';


const routes ={
    '/': HomeScreen,
    "/product/:id" : ProductScreen ,
    "/cart/:id" : Cartscreen , 
    "/cart" : Cartscreen ,
    '/signin' :SigninScreen,
}

const rounter = async () =>{
    const request = parserequestUrl();
    const parseUrl = 
        (request.resource ? `/${request.resource}` : '/' ) + 
        (request.id? '/:id': '') + 
        (request.verb ? `/${request.verb}` : '')
    
    //Tells which Screen to go     
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screeen ;
    
    //Header Part 
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.rend() ;
    await Header.after_render() ;
    
    //Main Content 
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.rend() ;
    await screen.after_render();
};

window.addEventListener('load' , rounter);
window.addEventListener('hashchange' , rounter);