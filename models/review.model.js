import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Reference to Product model
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',     // Reference to User model
    required: true,
  },
  comment: {
    type: String,    // longText in Laravel => String here
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,   // optionally restrict rating range
    max: 5,
  },
}, {
  timestamps: true,
});

// Pagination plugin
reviewSchema.plugin(mongoosePaginate);

// Optional: If you want to implement cascade delete of reviews when product or user is deleted,
// you’d handle it manually in your app logic or with Mongoose middleware.

// Model
const Review = mongoose.model('Review', reviewSchema);

export default Review;
