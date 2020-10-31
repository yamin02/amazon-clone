import admin from 'firebase-admin'
import serviceAccount from '../../serviceAccountKey.json';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import cors from 'cors';
import User from '../models/userModel';

const app = express();
app.use(cors());

const successRouter = express.Router() ;
// use 'orderItem' to retrieve 'netflix card' from firebase  


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yamin-project-d9e12.firebaseio.com"
});

var db = admin.firestore();

const playcards = (orderName,orderId,customer,expireDate,res)=>{ 
    db.collection(orderName).limit(1).onSnapshot(function(snap) {
    snap.forEach(doc=>{
                var data0 = doc.data();
                console.log(doc.id);
                console.log(data0.code);
                customer.ActiveOrder.push(
                {
                    _id : orderId ,
                    firebaseID : `${doc.id}` ,
                    orderName : `${orderName}`,
                    expiryDate : expireDate ,
                }),
                res.send({
                    'orderName' : orderName,
                    'code': data0.code,
                });
            })
    });
}


const netflix = (orderName,orderId,customer,expireDate,res)=>{
    db.collection(orderName).limit(1).onSnapshot(function(snap) {
        snap.forEach(doc=>{
            var data0 = doc.data();
            console.log(doc.id);
            console.log(data0.email);
            customer.ActiveOrder.push(
                {
                    _id : orderId ,
                    firebaseID : `${doc.id}` ,
                    orderName : `${orderName}`,
                    expiryDate : expireDate ,
                }),
            customer.save();
            console.log(customer);
            res.send({
                'orderName' : orderName,
                'email': data0.email,
                'password' : data0.password,
                'profileName' : data0.profileName,
                'profilePin': data0.profilePin,
            });
        }) });
}


successRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    const orderId = req.params.id ;
    const orderName = order.orderItems[0].name;
    const userId = order.user ;
    const customer =  await User.findById(userId);
    const expiryDate = new Date();
    d.setDate(d.getDate() + order.validity);

    if(!order.isDelivered)
    {   
        order.isDelivered = true ; 
        order.save() ;
         if(orderName === 'Netflix-sharing'){
            netflix(orderName,orderId,customer,expiryDate, res);
        }else{
            playcards(orderName,orderId,customer, expiryDate, res);
        }
    }else{
        res.send({orderName:'Order Already Delivered' ,
                  code:'Sorry you landed on wrong page' })
    }
}));


export default successRouter;