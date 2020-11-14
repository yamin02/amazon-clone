/* eslint-disable no-unused-vars */
import axios from "axios";
import { apiUrl } from "./config";
import { getUserinfo } from "./localStorage";


export const getProduct = async (id) =>{
    try{
        const options = {
                 method:'GET' ,
                 headers :  {
                     "Content-Type" : 'application/json',
                 }
        }
        const response = await axios(`${apiUrl}/api/products/${id}`, options)
        if(response.statusText !== "OK"){
            console.log('kill them');
            throw new Error(response.data.message);
        } 
        return response.data ;
    }catch(err){
        console.log("kil you");
    }
}

export const signin = async({email , password})=>{
    try {
        const response = await axios({
            url : `${apiUrl}/api/users/signin` ,
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            data:{
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
           throw new Error(response.data.message); 
        }
        return response.data ;
    }
    catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const register = async({name , email , password})=>{
    try {
        const response = await axios({
            url : `${apiUrl}/api/users/register` ,
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            data:{
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
           throw new Error(response.data.message); 
        }
        return response.data ;
    }
    catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const update = async({name,email,password})=>{
    try {
        const {id, token} = getUserinfo();
        const response = await axios({
            url : `${apiUrl}/api/users/${id}` ,
            //For updating we use PUT but creating we use POST
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                 Authorization : `Bearer ${token}`,
            },
            data:{
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
           throw new Error(response.data.message); 
        }
        return response.data ;
    }
    catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const createOrder = async (order) => {
    try {
      const { token } = getUserinfo();
      const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: order,
      });
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
};

export const getOrder = async (id) =>{
    try{
    const {token} = getUserinfo() ;
    const response = await axios({
        url : `${apiUrl}/api/orders/${id}`,
        headers :{
            'Content-Type' : 'application/json' ,
            Authorization : `Bearer ${token}`,
        },
    })
    if(response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    console.log(response.data);
    return response.data ;
    }catch(err) {
         return { error: err.response ? err.response.data.message : err.message };
    }
}

export const getPaypalClientId = async () => {
    const response = await axios({
      url: `${apiUrl}/api/paypal/clientId`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data.clientId;
  };
  
  export const payOrder = async (orderId, paymentResult) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/${orderId}/pay`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: paymentResult,
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
  };


  export const getCode = async (orderId) => {
    try {
      const response = await axios({
        url: `${apiUrl}/success/${orderId}`,
        headers: {
          'Content-Type': 'application/json',
          //Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
  };

  export const dashpost = async (userId) =>{
    const response = await axios ({
      url : `${apiUrl}/dashboard`,
      method : 'POST',
      headers :{
        'Content-Type' : 'application/json',
      },
      data: {
        userId : userId },
    });
    if(response.statusText !== 'OK'){
      throw new Error(response.data.message);
    }
    //console.log(response.data.allcodes)
    return response.data.allcodes ;
  }