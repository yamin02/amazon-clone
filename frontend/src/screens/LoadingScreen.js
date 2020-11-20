const LoadingScreen ={
  rend : ()=>{
    return `
   <div class="loader">
        <div class="bubble">
            <div class="bubble__shine bubble__shine--lg"></div>
            <div class="bubble__shine bubble__shine--sm"></div>
        </div>
        <p class="text"> Lo<span class="text__highlight">a</span>din<span class="text__highlight">g</span></p>
    </div>`
  }
}

export default LoadingScreen;