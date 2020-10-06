import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { parserequestUrl } from './utils.js';
import Error404Screeen from './screens/ErrorScreen.js' ;
const routes ={
    '/': HomeScreen,
    "/product/:id" : ProductScreen ,
}

const rounter = () =>{
    const request = parserequestUrl();
    const parseUrl = 
        (request.resource ? `/${request.resource}` : '/' ) + 
        (request.id? '/:id': '') + 
        (request.verb ? `/${request.verb}` : '')
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screeen ;

    const main = document.getElementById('main-container');
    main.innerHTML = screen.rend() ;
};

window.addEventListener('load' , rounter);
window.addEventListener('hashchange' , rounter);