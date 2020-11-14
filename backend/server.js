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
import SSLCommerz from 'sslcommerz-nodejs';
import path from 'path';

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
app.use('/dashboard' , dashRouter );

//app.use(express.static(path.join(__dirname, '/../frontend/images')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.use('*' , (req,res)=>{
    res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});


//const port = 3000 ;
app.listen(config.PORT, () =>{
    console.log("We are listing to the PORT 3000");
})







const sslcommerz = async () =>{
    let settings = {
        isSandboxMode: true, //false if live version
        store_id: "yamxt5f5374c66828d",
        store_passwd: "yamxt5f5374c66828d@ssl"
    }
     
    let sslcommerz = new SSLCommerz(settings);
    let post_body = {};
    post_body['total_amount'] = 100.26;
    post_body['currency'] = "BDT";
    post_body['tran_id'] = "12345";
    post_body['success_url'] = "your success url";
    post_body['fail_url'] = "your fail url";
    post_body['cancel_url'] = "your cancel url";
    post_body['emi_option'] = 0;
    post_body['cus_name'] = "test";
    post_body['cus_email'] = "test@test.com";
    post_body['cus_phone'] = "01700000000";
    post_body['cus_add1'] = "customer address";
    post_body['cus_city'] = "Dhaka";
    post_body['cus_country'] = "Bangladesh";
    post_body['shipping_method'] = "NO";
    post_body['multi_card_name'] = ""
    post_body['num_of_item'] = 1;
    post_body['product_name'] = "Test";
    post_body['product_category'] = "Test Category";
    post_body['product_profile'] = "general";
    try {
        const response = await sslcommerz.init_transaction(post_body);
        return response;
    }catch(error){
        console.log(error);
    }  
  }


app.post('/paynow/:id',async (req,res)=>{
    console.log(req.params.id);
    const payment = await sslcommerz() ;
    res.send ({
        status : 'success' ,
        data : payment.GatewayPageURL,
        logo : payment.storeLogo,
    })
})
