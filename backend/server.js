const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data.js');

app.use(cors());
app.get('/api/products' ,(req,res) =>{
    res.send(data.products);
    console.log(data.products);
});

const port = process.env.PORT || 3000 ;
app.listen(port, () =>{
    console.log("We are listing to the PORT : 3000")
})