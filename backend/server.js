//const express = require('express');
// const cors = require('cors');
// const data = require('./data.js');
import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
app.use(cors());
app.get('/api/products' ,(req,res) =>{
    res.send(data.products);
    console.log(data.products);
});
//var process ;
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000 ;
app.listen(port, () =>{
    console.log("We are listing to the PORT : 3000")
})