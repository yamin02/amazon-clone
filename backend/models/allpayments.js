import mongoose from 'mongoose';

const allpaymentSchema = new mongoose.Schema(
  {
    orderitem: {
        name: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: false,
        },
      },
    buyer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: false 
    },
    buyerNumber : { type: String, required: true },
    RefNum : { type: String, required: true },
    paymentMethod: { type: String, required: true },
    TrnxID : { type: String, required: true },
    paymentDate : { type: Date, required: true },
    amountpaid : { type: Number, required: true },
    ipAddress : {type: String},
    isDelivered: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  },
  
);

const Allpayment = mongoose.model('AllPayement', allpaymentSchema);
export default Allpayment;