import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { hideloading, parserequestUrl, showloading } from './utils.js';
import Error404Screeen from './screens/ErrorScreen.js' ;
import Cartscreen from './screens/Cartscreen.js';
import SigninScreen from './screens/SigninScreen.js';
import Header from './components/Header.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import SuccessScreen from './screens/Success.js';
import DashboardScreen from './screens/Dashboard.js';
import LoadingScreen from './screens/LoadingScreen.js';


const routes ={
    '/': HomeScreen,
    "/product/:id" : ProductScreen ,
    "/cart/:id" : Cartscreen , 
    "/cart" : Cartscreen ,
    '/signin' :SigninScreen,
    '/register' : RegisterScreen,
    '/profile' : ProfileScreen,
    '/shipping' : ShippingScreen,
    '/payment' : PaymentScreen,
    '/placeorder' :PlaceOrderScreen,
    '/orders/:id' : OrderScreen,
    '/success/:id' : SuccessScreen,
    '/dashboard' : DashboardScreen,
}


const rounter = async () =>{
    showloading();
    // const loader= document.getElementById('loader');
    // loader.style.display = 'flex';
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
    if(screen.after_render){await screen.after_render();}
    loader.style.display = 'none';
    hideloading();
};

window.addEventListener('load' , rounter);
window.addEventListener('hashchange' , rounter);