import express from 'express' ;

import expressAsyncHandler from 'express-async-handler';
import Allpayment from '../models/allpayments';
import { Sms2data } from '../utils';

const allpayemntRooter = express.Router();

allpayemntRooter.post('/sms', expressAsyncHandler(async (req,res)=>{
    // process the sms body 
    const sms2data = Sms2data(req.body.smsBody);
    console.log(sms2data);
    console.log("this came from sms");
    try{
    const gotpayment = new Allpayment({
        paymentMethod: req.body.sender ,
        TrnxID : sms2data.TrnxID,
        RefNum : sms2data.RefNum,
        paymentDate : new Date(Date.now()) ,
        amountpaid : sms2data.amountpaid, 
        buyerNumber : sms2data.buyerNumber ,

    });
    await gotpayment.save();
    res.send({
        message : 'Got the SMS'
    }) 
    }catch(error){
        res.status(500).send({message : error.message});
    }
}));

allpayemntRooter.post('/verify',   async (req,res)=>{
    console.log("this came for verification from frontend");
    console.log(req.body);
    const price = req.body.Price ;
    try{
    const whopaid = await Allpayment.findOne({
        RefNum : req.body.RefNum 
    })
    if(!whopaid){
        res.send({
            err: "noRef" ,
            message : 'No such Reference Num found. Please try again by clicking the verify payment button'
        })
    }else{
        if(whopaid.amountpaid < price){
            res.send({
                err : "paidLess",
                message : 'Paid Insuficiant amount',
                more:"toamr kolla"
            });
        }else{
            whopaid.ipAddress = req.body.
        res.send({
            err : "None",
            message : 'Payment Verified'
        })}
    }      
    }catch(err){
        res.status(500).send({message : err.message});
    }
});


export default allpayemntRooter;