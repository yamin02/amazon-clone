import {
  showloading,
  hideloading,
  showMessage,
  rerender,
  parserequestUrl,
} from '../utils';
import { getOrder, getPaypalClientId, payOrder } from '../api';
import { apiUrl } from '../config';



const OrderScreen = {
  after_render: async () => {},
  rend: async () => {
    const request = parserequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);

    return `<div><h1>Order screen</h1></div>
    <button class="your-button-class" id="sslczPayBtn"
    token= "if you have any token validation"
    order="If you already have the transaction generated for current order"
    endpoint="${apiUrl}/paynow/${request.id}"> Pay Now
    </button>`
  },
};

export default OrderScreen;