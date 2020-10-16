import express from 'express' ;
import User from '../models/userModel';
import expressasynchandler from 'express-async-handler';
import { generateToken } from '../utils';

const userRouter = express.Router() ;

userRouter.get('/createadmin',  expressasynchandler(async(req,res)=>{
    try{
        const user = new User({
            name: 'admin' ,
            email: 'admin2@gmail.com',
            password: 'admin',
            isAdmin : true
        });
        const createUser = await user.save() ;
        res.send(createUser);
    }catch(err){
        res.status(500).send({message : err.message});
    } 
}));

userRouter.post('/signin', expressasynchandler(async(req,res)=>{
    const siginUser = await User.findOne({
       email: req.body.email ,
       password : req.body.password,
   });
   if(!siginUser){
       res.status(404).send({
           message: 'Invalid email or password',
       })
   }else {
       res.send({
           id: siginUser._id ,
           name: siginUser.name ,
           email : siginUser.email,
           password: siginUser.password,
           isAdmin : siginUser.isAdmin ,
           token : generateToken(siginUser),
       })
   }
}));


export default userRouter ; 