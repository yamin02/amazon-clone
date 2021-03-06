import mongoose from 'mongoose' ;

const userSchema = new mongoose.Schema({
    name:{
        type : String , 
        required: true
    },
    email : {
        type: String , 
        required : true , 
        index: true , 
        unique:true},
    password : {
            type : String , 
            required: true,
            unique: true,
        },
    isAdmin : {
        type: Boolean ,
        required: true ,
        default : false,
    } ,
    ActiveOrder: [
        {
          firebaseID : String ,
          orderName : String,
          expiryDate : Date , 
        }
    ],
});

const User = mongoose.model('User', userSchema);

export default User ;