import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose' ;
import config from './config';
import userRouter from './routers/userRouter';
import bodyParser from 'body-parser';
import orderRouter from './routers/orderRouter';
import successRouter from './routers/successRouter';
import dashRouter from './routers/dashRouter';
import path from 'path';
import allpayemntRooter from './routers/allpaymentget';


mongoose.connect(config.MONGODB_URL , {
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useCreateIndex : true 
}).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/api/products' ,(req,res) =>{
    res.send(data.products);
});

app.get('/api/products/:id', (req, res)=> {
    const product = data.products.find((x)=>x._id === req.params.id);
    if(product){
        res.send(product); 
    }else {
        res.status(404).send(
            {message:'product not found'})
    }
});

// For SignIN , Create Account and 
app.use('/api/users' , userRouter);

//all errors in express and express-async-handler can be handled with this:
app.use((err,req,res,next)=>{
    const status = err.name && (err.name === "validationError" ? 400 : 500 );
    res.status(status).send({message: err.message});
});

//for placing order
app.use('/api/orders' , orderRouter);


app.use('/success', successRouter);
app.use('/dashboard' , dashRouter );

//app.use(express.static(path.join(__dirname, '/../frontend/images')));
app.use(express.static(path.join(__dirname, '/../frontend')));
// app.use('*' , (req,res)=>{
//     res.sendFile(path.join(__dirname, '/../frontend/index.html'));
// });

//const port = 3000 ;
app.listen(config.PORT, () =>{
    console.log(`We are listing to the PORT ${config.PORT}`);
})


app.use('/getpayment', allpayemntRooter);

