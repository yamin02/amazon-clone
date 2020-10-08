import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
app.use(cors());
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
        res.status(404).send({message:'product not found'})
    }
});
//var process ;
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000 ;
app.listen(port, () =>{
    console.log("We are listing to the PORT : 3000")
})