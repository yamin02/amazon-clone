import { getProduct } from "../api";
import { parserequestUrl } from "../utils";

const realOrderScreen ={
    after_render : ()=>{
      const openTab = (num) => {
        var i, x;
        x = document.getElementsByClassName("containerTab");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        x[num].style.display = "block";
      }

      // function greenlogo() {
      // const spinner = document.querySelectorAll('#yes');
      // for (i of spinner){
      //     i.innerHTML= '<i class="fa fa-check-circle"></i>';
      //     i.style.animation = 'none';
      //     i.style.color = "green" ;}
      // }
     // setTimeout(greenlogo,3000);

      for (var q of document.getElementsByClassName('verifypay')){
        q.addEventListener('click',()=>{
          document.getElementById('form3').style.display = "block";
          scrollBy(0,240);
        })
      }

        const x = document.getElementsByClassName('column');
        for (var p of x){
        p.addEventListener('click',(e)=>{
          const a = e.target.className.split(" ") ;
          console.log('clicked');
          openTab(parseInt(a[1]));
          scrollBy(0,230)
        });
      }
    },

    rend : async () =>{      
      const request = parserequestUrl();
      console.log(request.id)
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
                  <h2>Total Price : BDT ${product.price}</h2>
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
            <p>Lorem ipsum..</p>
            <span class="data phone">Phone Number : 
            <input type="tel" class='phoneNum' placeholder="01818672900">
          </span> <br>
          <div id="paid-button" class='verifypay'>Yes i paid the money</div>
          </div>
          
          <div id="b2" class="containerTab" style="display:none;background:rgba(240, 128, 128, 0.849)">
          <span onclick="this.parentElement.style.display='none'" class="closebtn"><i class="fa fa-times-circle"></i></span>
          <h2>Nagad</h2>
          <p>Lorem ipsum..</p>
          <span class="data phone">Phone Number : 
          <input type="tel" class='phoneNum' placeholder="01818672900">
        </span> <br>
        <div id="paid-button" class='verifypay'>Yes i paid the money</div>
          </div>
          
          <div id="b3" class="containerTab" style="display:none;background:#8c3494">
            <span onclick="this.parentElement.style.display='none'" class="closebtn"><i class="fa fa-times-circle"></i></span>
            <h2>Rocket</h2>
            <p>Lorem ipsum..</p>
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