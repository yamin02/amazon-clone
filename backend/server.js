import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose' ;
import config from './config';
import userRouter from './routers/userRouter';
import bodyParser from 'body-parser';
import orderRouter from './routers/orderRouter';
import successRouter from './routers/successRouter';


mongoose.connect(config.MONGODB_URL , {
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useCreateIndex : true 
}).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("its an error ");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/api/products' ,(req,res) =>{
    res.send(data.products);
    //console.log(data.products);
});
app.get('/api/products/:id', (req, res)=> {
    const product = data.products.find((x)=>x._id === req.params.id);
    if(product){
        res.send(product); 
        console.log(product);
    }else {
        res.status(404).send(
            {message:'product not found'})
    }
});

// For SignIN , Create Account and 
app.use('/api/users' , userRouter);

//all errors in express and express-async-handler can be handled with this:
//
app.use((err,req,res,next)=>{
    const status = err.name && (err.name === "validationError" ? 400 : 500 );
    res.status(status).send({message: err.message});
});

//for placing order
app.use('/api/orders' , orderRouter);

//paypal Payment
app.get('/api/paypal/clientId', (req, res) => {
    res.send({ clientId: config.PAYPAL_CLIENT_ID });
  });

app.use('/success', successRouter);

const port = process.env.PORT || 3000 ;
app.listen(port, () =>{
    console.log("We are listing to the PORT : 3000")
})

