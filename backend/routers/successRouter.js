import admin from 'firebase-admin'
import serviceAccount from '../../serviceAccountKey.json';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils';
import Order from '../models/orderModel';
import cors from 'cors';
import { connect } from 'mongoose';

const app = express();
app.use(cors());

const successRouter = express.Router() ;
// use 'orderItem' to retrieve 'netflix card' from firebase  


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yamin-project-d9e12.firebaseio.com"
});

//const getFirebase = async (itemtype) =>{
//if Netflix then diff retrive
var db = admin.firestore();
// var yam;
// await db.collection(itemtype).limit(1).onSnapshot(function(snap) {
// snap.forEach(doc=>{
//             var data0 = doc.data();
//             yam = data0.code ;
//             //console.log(yam);
//         })
//     });
//     if(yam){
//     return `${yam}`;
//     }
// }


successRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    console.log(order.orderItems[0].name);
    console.log('i ove it');
    db.collection('google-five').limit(1).onSnapshot(function(snap) {
        snap.forEach(doc=>{
                    var data0 = doc.data();
                    console.log(data0.code);
                    res.send({'code': data0.code});
                    //console.log(yam);
                })
            });
}));


export default successRouter;