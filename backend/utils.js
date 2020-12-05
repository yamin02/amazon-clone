import config from './config';
import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email : user.email,
        isAdmin : user.isAdmin ,
    },
    config.JWT_SECRET)
}

//this is a middle ware  function for authantication json-web-token
export const isAuth = (req, res, next) => {
  //from headers in post/get/put 'authentication' take the value as req.header.authorization
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.status(401).send({ message: 'Token is not supplied' });
    } else {
      //see if the token is same with the one I have
      const token = bearerToken.slice(7, bearerToken.length);   // bearer ${token} 
      jwt.verify(token, config.JWT_SECRET, (err, data) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = data;
          next();
        }
      });
    }
  };


  export const Sms2data = (smsbody)=>{
    // You have received Tk 40.00 from 01818672900. Ref hakku10. Fee Tk 0.00. Balance Tk 140.00. TrxID 7L386369TA at 03/12/2020 22:16
    const sms2split = smsbody.split(" ");
    return {
      TrnxID : sms2split[sms2split.indexOf("TrxID")+1],
      RefNum : sms2split[sms2split.indexOf("Ref")+1].slice(0, -1),
      paymentDate : Date.now() ,
      amountpaid : parseInt(sms2split[sms2split.indexOf("received") + 2]) ,
      buyerNumber : sms2split[sms2split.indexOf("from")+1].slice(0, -1) ,
    }
  }