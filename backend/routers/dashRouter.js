import admin from 'firebase-admin'
import serviceAccount from '../../serviceAccountKey.json';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import cors from 'cors';
import User from '../models/userModel';


const app = express();
app.use(cors());
const dashRouter = express.Router() ;
var db = admin.firestore();


const getcards = async (ActiveOrder)=>{
const orderCodes = db.collection(ActiveOrder.orderName).doc(ActiveOrder.firebaseID);
const doc = await orderCodes.get();
const  p = doc.data();
p.expiry = ActiveOrder.expiryDate
    if(doc.exists){
        return p
    }else{
        return 0 ;
}
}


dashRouter.post('/', expressAsyncHandler(async(req,res)=>{
    console.log(req.body.userId);
    const user = await User.findById(req.body.userId);
    const arr = user.ActiveOrder;
    var arr2 = [];
    for (let i = arr.length-1 ; i>0 ; i--){
        if(arr[i].expiryDate >= Date.now()){
                console.log(await getcards(arr[i]));
                arr2.push(await getcards(arr[i]));
            }
        else {
            user.ActiveOrder = arr.splice(i,1);
            user.save();
        }
    }
    res.send({
        allcodes : arr2 ,
    })
}))

export default dashRouter;
 