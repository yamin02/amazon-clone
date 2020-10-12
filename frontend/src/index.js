import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { parserequestUrl } from './utils.js';
import Error404Screeen from './screens/ErrorScreen.js' ;
import Cartscreen from './screens/Cartscreen.js';

const routes ={
    '/': HomeScreen,
    "/product/:id" : ProductScreen ,
    "/cart/:id" : Cartscreen , 
    "/cart" : Cartscreen ,
}

const rounter = async () =>{
    const request = parserequestUrl();
    const parseUrl = 
        (request.resource ? `/${request.resource}` : '/' ) + 
        (request.id? '/:id': '') + 
        (request.verb ? `/${request.verb}` : '')
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screeen ;

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.rend() ;
    await screen.after_render();
};

window.addEventListener('load' , rounter);
window.addEventListener('hashchange' , rounter);