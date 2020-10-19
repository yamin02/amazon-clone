import { register } from "../api";
import { getUserinfo, setUserInfo } from "../localStorage";
import { hideloading, showloading, showMessage } from "../utils";

const RegisterScreen ={
    after_render: () =>{
        document
        .getElementById('register-form')
        .addEventListener('submit', async (e)=>{
            e.preventDefault() ;
            showloading() ;
            const data = await register({
                name: document.getElementById('name').value ,
                email : document.getElementById('email').value ,
                password : document.getElementById('password').value,
            });
            console.log(data);
            hideloading();
            if(data.error){
                showMessage(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = '/' ;
            }
        })
    } ,
    rend:()=>{
        if(getUserinfo().name){
            document.location.hash = '/' ;
        }
        return `<div class= 'form-container'>
            <form id='register-form'>
                <ul class = 'form-items'>
                    <li>
                        <h1>Create Accout</h1>
                    </li>
                    <li>
                    <label for='name'>Name</label>
                    <input type='name' name='name' id='name'/> 
                    </li>
                    <li>
                       <label for='email'>Email</label>
                       <input type='email' name='email' id='email'/> 
                    </li>
                    <li>
                       <label for='Password'>Password</label>
                       <input type='password' name='password' id='password'/> 
                    </li>
                    <li>
                       <label for='repassword'>Re-Enter Password</label>
                       <input type='password' name='repassword' id='repassword'/> 
                    </li>
                    <li>
                        <button type='submit' class='primary'>Create Account</button>
                    </li>
                    <li>
                        <div>
                           Already have an account ?  <a href='/#/signin'>Sign-In</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>`
    },
}

export default RegisterScreen ;