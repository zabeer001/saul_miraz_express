import Order from "../../models/order.model.js";
import OrderProduct from "../../models/orderProduct.model.js";

export const orderShowService = async (id) => {
  try {
    const order = await Order.findById(id).lean();

    if (!order) {
      return { success: false, message: 'Order not found' };
    }

    // Get the orderProduct obj from the orderProduct model 
    const orderProducts = await OrderProduct.find({ order_id: id }).populate('product_id').lean();

    // console.log(orderProducts);
    

    // all the data of products with extracting order_id
    const products = orderProducts.map(op => ({
      product: op.product_id, // This contains full product info due to populate
      quantity: op.quantity,
    }));
    //  console.log(products);

    return {
      success: true,
      data: {
        ...order,
        products,
      },
    };
  } catch (error) {
    console.error('Error in orderShowService:', error);
    return { success: false, message: 'Something went wrong' };
  }
};
