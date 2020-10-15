import express from 'express' ;
import User from '../models/userModel';

const userRouter = express.Router() ;

userRouter.get('/createadmin', async(req,res)=>{
    try{
        const user = new User({
            name: 'admin' ,
            email: 'admin@gmail.com',
            password: 'admin',
            isAdmin : true
        });
        const createUser = await user.save() ;
        res.send(createUser);

    }catch(err){
        res.status(500).send({message : err.message});
    } 
});

export default userRouter ; 