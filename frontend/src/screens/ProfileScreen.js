import { update } from "../api";
import { clearUser, getUserinfo, setUserInfo } from "../localStorage";
import { hideloading, showloading, showMessage } from "../utils";

const ProfileScreen ={
    after_render: () =>{
        document.getElementById('signout-button')
        .addEventListener("click",()=>{
            clearUser();
            document.location.hash = '/';
        })
        document
        .getElementById('profile-form')
        .addEventListener('submit', async (e)=>{
            e.preventDefault() ;
          showloading() ;
            const data = await update({
                name: document.getElementById('name').value ,
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
    },
    rend:()=>{
        const {name ,email } =  getUserinfo() ;
        if(!name){
            document.location.hash = '/' ;
        }
        return `<div class= 'form-container'>
            <form id='profile-form'>
                <ul class = 'form-items'>
                    <li>
                        <h1>Change Profile Settins</h1>
                    </li>
                    <li>
                    <label for='name'>Name</label>
                    <input type='name' name='name' id='name' value="${name}"/> 
                    </li>
                    <li>
                       <label for='email'>Email</label>
                       <input type='email' name='email' id='email' value="${email}"/> 
                    </li>
                    <li>
                       <label for='Password'>Password</label>
                       <input type='password' name='password' id='password'/> 
                    </li>
                    <li>
                        <button type='submit' class='primary'>Update</button>
                    </li>
                    <li>
                        <button type='button' id='signout-button' >Sign Out</button>
                    </li>
                </ul>
            </form>
        </div>`
    },
}

export default ProfileScreen ;