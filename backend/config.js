// used dotenv for config.js
import dotenv from 'dotenv';

dotenv.config();
//access the env file

const db_url = 'mongodb+srv://yamin02:Ch@ndanpura2@yamin-amazon.llwl6.mongodb.net/test' ;
export default {
    PORT : process.env.PORT || 5000,
    MONGODB_URL : process.env.MONGODB_URL || db_url ,
    JWT_SECRET: process.env.JWT_SECRET ,
    PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID,
}
