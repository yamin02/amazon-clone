import { getCartItems } from "./localStorage";

export const parserequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2] ,
        action: request[3] ,
    }
}


export const rerender = async (comp) => {
    document.getElementById("main-container").innerHTML = await comp.rend() ;
    await comp.after_render();
}


export const showloading = () =>{
    document.getElementById('loading-overlay').classList.add('active');
};

export const hideloading = () =>{
    document.getElementById('loading-overlay').classList.remove('active');
};

export const showMessage =(msg, callback) =>{
    document.getElementById('message-overlay')
    .innerHTML = `<div>
        <div id= 'message-overlay-content'>${msg}</div>
        <button id='message-overlay-close-button'>OK</button>
    </div>` ;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById("message-overlay-close-button")
    .addEventListener('click' , ()=>{
        document.getElementById('message-overlay').classList.remove('active');
        if(callback){
            callback();
            // will trigger a call back function if provided e.g showMwssage('loveit', ()=>{...})
        }
    })
}

export const redirectUser = () =>{
        document.location.hash = '/' ;
}

