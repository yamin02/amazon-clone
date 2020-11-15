import  { getCode } from '../api';
import { parserequestUrl } from '../utils';


const SuccessScreen = {
    after_render: async () => {
      //Copy_ Button for codes
    },
    rend: async () => {
      const request = parserequestUrl();
      console.log(request);
      const gotCode = await getCode(request.id) ; 
      console.log(gotCode.orderName);
  //add the Netflixcard to new order Mongodb "User schema" 

    return `<h1>Here are your codes</h1>
    ${gotCode.orderName==='Netflix-sharing' 
    ? `<div><h1>This is Netflix ${gotCode.orderName}</h1>
      <h1>${gotCode.email}</h1>
      <h1>${gotCode.password}</h1>
      <h1>${gotCode.profileName}</h1>
      <h1>${gotCode.profilePin}</h1>
      </div>`
    : `<div>this is Google play codes   
      <h1>${gotCode.orderName}</h1> 
      <h2>${gotCode.code}</h2>
      </div>`
  }`
  }
}

export default SuccessScreen;