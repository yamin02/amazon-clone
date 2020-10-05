import HomeScreen from './screens/HomeScreen.js'
const rounter = () =>{
    const main = document.getElementById('main-container');
    main.innerHTML = HomeScreen.rend() ;
};
window.addEventListener('load' , rounter);