import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    default: null,
  },
  type: {
    type: String,
    trim: true,
    default: null,
  },
  items: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    trim: true,
    default: 'pending',
  },
  shipping_method: {
    type: String,
    trim: true,
    default: null,
  },
  shipping_price: {
    type: mongoose.Types.Decimal128,
    default: 0.00,
  },
  order_summary: {
    type: String,
    default: null,
  },
  payment_method: {
    type: String,
    trim: true,
    default: null,
  },
  payment_status: {
    type: String,
    trim: true,
    default: 'unpaid',
  },
  promocode_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PromoCode',
    default: null,
  },
  promocode_name: {
    type: String,
    trim: true,
    default: null,
  },
  total: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
}, {
  timestamps: true,
});

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', orderSchema);

export default Order;
