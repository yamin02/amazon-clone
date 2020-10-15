// used dotenv for config.js

import dotenv from 'dotenv' ;

dotenv.config();
//access the env file

export default {
    MONGODB_URL : process.env.MONGODB_URL
}
