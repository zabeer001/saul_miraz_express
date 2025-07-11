import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const promoCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  usage_limit: {
    type: String,
    trim: true,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
}, {
  timestamps: true,
});

promoCodeSchema.plugin(mongoosePaginate);

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

export default PromoCode;
