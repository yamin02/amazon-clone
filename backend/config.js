// used dotenv for config.js
import dotenv from 'dotenv';

dotenv.config();
//access the env file

export default {
    PORT : process.env.PORT || 5000,
    MONGODB_URL : process.env.MONGODB_URL ,
    JWT_SECRET: process.env.JWT_SECRET ,
    PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID,
}
