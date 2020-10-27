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
      console.log(gotCode.code);
  //add the Netflixcard to new order Mongodb "User schema" 
  // with TTL (time-to-Live) for expiration after sometime
    return `<div>${gotCode.code}</div>`
  }
}

export default SuccessScreen;