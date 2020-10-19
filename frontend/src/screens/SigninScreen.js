import { signin } from "../api";
import { getUserinfo, setUserInfo } from "../localStorage";
import { hideloading, showloading, showMessage } from "../utils";

const SigninScreen ={
    after_render: () =>{
        document
        .getElementById('signin-form')
        .addEventListener('submit', async (e)=>{
            e.preventDefault() ;
            showloading() ;
            const data = await signin({
                email : document.getElementById('email').value ,
                password : document.getElementById('password').value,
            });
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
            <form id='signin-form'>
                <ul class = 'form-items'>
                    <li>
                        <h1>Sign In</h1>
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
                        <button type='submit' class='primary'>SignIn</button>
                    </li>
                    <li>
                        <div>
                            New User?  <a href='/#/register'>Create Account</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>`
    },
}

export default SigninScreen ;