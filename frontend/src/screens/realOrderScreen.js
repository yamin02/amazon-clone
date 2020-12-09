import axios from "axios";
import { getProduct, verifyPayment } from "../api";
import { parserequestUrl, showMessage } from "../utils";
import { apiUrl } from "../config";
import { getUserinfo } from "../localStorage";


const getRandomString = ()=>{
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZpallUscoppabcdefghijklmnopqrstuvwxyz01237456789';
  var result = '';
  for ( var i = 0; i < 9; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

const  addgreenlogo = (num , isTrue )=> {
  const spinner = document.querySelectorAll('#yes');
  spinner[num].innerHTML= isTrue ? '<i class="fa fa-check-circle"></i>' : '<i class="fa fa-times-circle"></i>';
  spinner[num].style.animation = 'none';
  spinner[num].style.color = isTrue ? "green" : "red" ;
  }

const addspinner = () =>{
  const spinner = document.querySelectorAll('#yes');
  for ( var spin of spinner){
    spin.innerHTML = '<i class="fa fa-spinner">' ;
    spin.style.animation = "spin 2s linear infinite" ;
    spin.style.color = "red" ;
  }
}

  // opens the block when payment-method btn clicked
  const openTab = (num,x) => {
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[num].style.display = "block";
  }

  async function getIpAdress(){
    const resp = await fetch("https://api.ipify.org/?format=json");
    const data = await resp.json();
    console.log(data.ip);
    if(data){
      addgreenlogo(0, true);
    }
    return data.ip
}


const realOrderScreen ={
    after_render : ()=>{
      var conTab = document.getElementsByClassName("containerTab");

      // Generating the reference amount  
      const randomRef = getRandomString();
      const reference = document.getElementsByClassName("Ref");
      for ( var z of reference){
        z.innerHTML = `<h2>${randomRef}</h2>`;
      }
      
    // The verify payment Button is clicked
    const reqURL = parserequestUrl();
    const productPrice = parseInt(document.getElementById("product-price").innerText);
    for (var q of document.getElementsByClassName('verifypay')){
      q.addEventListener('click', ()=>{
        document.getElementById('form3').style.display = "block";
        scrollBy(0,240);
        console.log('button is clicked');
        addspinner();
        setTimeout(async ()=>{
          console.log("waiting for 3sec");
          const ipAdress = getIpAdress();
          console.log(ipAdress);
          const response = await verifyPayment(randomRef,productPrice,ipAdress);
          console.log(response);
          
          if(response.err === "None"){
            addgreenlogo(1,true);addgreenlogo(2,true);addgreenlogo(3,true);
            showMessage(response.message);
            document.location.hash = `/success/${reqURL.id}`
          } else if(response.err === "paidLess"){
            showMessage(response.message);
            addgreenlogo(1,true);addgreenlogo(2,true);addgreenlogo(3,false)
          } else {
            showMessage(response.message);
            addgreenlogo(1,false);addgreenlogo(2,false);addgreenlogo(3,false)
          }
        },3000);
        })
      }

      // the payment logo clicked 
        const x = document.getElementsByClassName('column');
        for (var p of x){
        p.addEventListener('click',(e)=>{
          if(getUserinfo().name){
          const a = e.target.className.split(" ") ;
          console.log('payment logo clicked');
          openTab(parseInt(a[1]), conTab);
          scrollBy(0,230);
        }
          else{
            document.location.hash = `/signin`
          }
        });
      }
    },

    rend : async () =>{     
      const request = parserequestUrl();
      const product = await getProduct(request.id);
        if(product.error){
            return `<div>${product.error} error : Sorry no product found </div>`
        }
        return ` <div class="form one">
        <div>
            <ul>
                <li>
                    <h2 class="ordertitle">Order Summary</h2>
                    <p class="date">24 November 2020 Saturday 14:30</p>
                </li>
                <li class="image-product">
                <div>
                    <img src="${product.image}" alt="Image of product" class="product-img">
                </div>
                <div>
                  <p>${product.name}</p>
                  <p>${product.description}</p>
                  
                </div>
                </li>
                <li>
                  <h2>Total Price : BDT <span id="product-price">${product.price}</span></h2>
                </li>
            </ul>
        </div>
        </div>
    
        <div class="form two">
          <div>
            <h2>
              Choose a Payemnt Method : 
            </h2>
          </div>
          <div class="row">
            <div class="column" style="background:rgb(243, 164, 250);">
            <img src="images/bkashLogo.png" alt="Bkash" class= "logo 0">
            </div>
            <div class="column"  style="background:rgba(0, 0, 0, 0.849);"><img src="images/nagadlogo.png" alt="" class="logo 1"></div>
            <div class="column"  style="background:#8c3494;"><img src="images/rocketlLogo.png" alt="" class="logo 2"></div>
          </div>
          
          <!-- The expanding grid (hidden by default) -->

          <div id="b1" class="containerTab" style="display:none;background:rgba(193, 87, 202, 0.493)">
            <!-- If you want the ability to close the container, add a close button -->
            <span onclick="this.parentElement.style.display='none'" class="closebtn"><i class="fa fa-times-circle"></i></span>
            <h2>Bkash</h2>
            <p class="Ref">Lorem ipsum..</p>
            <span class="data phone">Phone Number : 
            <input type="tel" class='phoneNum' placeholder="01818672900">
          </span> <br>
          <div id="paid-button1" class='verifypay'>Yes i paid the money</div>
          </div>
          
          <div id="b2" class="containerTab" style="display:none;background:rgba(240, 128, 128, 0.849)">
          <span onclick="this.parentElement.style.display='none'" class="closebtn"><i class="fa fa-times-circle"></i></span>
          <h2>Nagad</h2>
          <p class="Ref">Lorem ipsum..</p>
          <span class="data phone">Phone Number : 
          <input type="tel" class='phoneNum' placeholder="01818672900">
        </span> <br>
        <div id="paid-button" class='verifypay'>Yes i paid the money</div>
          </div>
          
          <div id="b3" class="containerTab" style="display:none;background:#8c3494">
            <span onclick="this.parentElement.style.display='none'" class="closebtn"><i class="fa fa-times-circle"></i></span>
            <h2>Rocket</h2>
            <p class="Ref">Lorem ipsum..</p>
            <span class="data phone">Phone Number : 
            <input type="tel" class='phoneNum' placeholder="01818672900">
          </span> <br>
          <div id="paid-button" class='verifypay'>Yes i paid the money</div>
          </div>
        </div>
    
        <div id="form3" class="form three" style="display:none;background:rgba(193, 87, 202, 0.493)">
          <h2 style="text-align: center;">Verifying your payment ...</h2>
          <p class="verifyList">
            <span>Your Ip address</span>
            <span id='yes'><i class="fa fa-spinner"></i></span>
          </p>
          <p class="verifyList">
            <span>Payment Transaction Id</span>
            <span id='yes'><i class="fa fa-spinner"></i></span>
          </p>
          <p class="verifyList">
            <span>Your Mobile Number</span>
            <span id='yes'><i class="fa fa-spinner"></i></span>
          </p>
          <p class="verifyList">
            <span>Amount Paid</span>
            <span id='yes'><i class="fa fa-spinner"></i></span>
          </p>
        </div>`
    }
}

export default realOrderScreen;