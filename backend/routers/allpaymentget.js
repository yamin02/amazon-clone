import express from 'express' ;

import expressAsyncHandler from 'express-async-handler';
import Allpayment from '../models/allpayments';
import { Sms2data } from '../utils';

const allpayemntRooter = express.Router();

allpayemntRooter.post('/sms', expressAsyncHandler(async (req,res)=>{
    // process the sms body 
    const sms2data = Sms2data(req.body.smsBody);
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

allpayemntRooter.post('/verify',  expressAsyncHandler( async (req,res)=>{
    console.log(req.body); 
    try{
    const whopaid = await Allpayment.findOne({
        RefNum : req.body.RefNum 
    })
    if(!whopaid){
        res.status(404).send({
            message : 'No such RefNum found'
        })
    }else{
        res.status(201).send({
            message : 'Payment Verified'
        })
    }      
    }catch(err){
        res.status(500).send({message : err.message});
    }
}) )


export default allpayemntRooter;