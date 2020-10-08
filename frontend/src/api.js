/* eslint-disable no-unused-vars */
import axios from "axios";
import { apiUrl } from "./config";


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