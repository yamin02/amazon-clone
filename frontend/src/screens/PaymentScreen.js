import CheckoutSteps from "../../../backend/routers/CheckoutSteps";
import { getPayment,getUserinfo, setPayment } from "../localStorage";


const PaymentScreen ={
    after_render: () =>{
        document
        .getElementById('payment-form')
        .addEventListener('submit', async (e)=>{
            e.preventDefault() ;
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            setPayment({paymentMethod });
            document.location.hash = '/placeorder';
        })
    },
    rend:()=> {
        const {name ,email } =  getUserinfo() ;
        if(!name){
            document.location.hash = '/' ;
        }
        return `${CheckoutSteps.rend({step1:true, step2: true, step3:true})}
        '<div class= 'form-container'>
            <form id='payment-form'>
                <ul class = 'form-items'>
                    <li>
                        <h1>Payment Method</h1>
                    </li>
                    <li>
                        <div>
                            <input type='radio'
                            name='payment-method'
                            value='Paypal'
                            checked />
                            <label for='paypal'>Paypal</label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input type='radio'
                            name='payment-method'
                            value='Stripe'
                            unchecked />
                            <label for='stripe'>Stripe</label>
                        </div>
                    </li>
                  
                    <li>
                        <button type='submit' class='primary'>Pay Now</button>
                    </li>
                </ul>
            </form>
        </div>`
    },
}

export default PaymentScreen ;