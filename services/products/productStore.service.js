import Product from '../../models/product.model.js';
import Category from '../../models/category.model.js';
import { uploadSingleImage } from '../../helpers/uploadSingleImage.js';
import { uploadMultipleMedia } from '../../helpers/uploadMultipleMedia.js';

export const productStoreService = async (req) => {
  const body = req.body || {};
  const files = req.files || {};

  const {
    name,
    description = null,
    price,
    category_id,
    status,
    arrival_status = 'regular',
    cost_price,
    stock_quantity = 1,
    sales = 0,
  } = body;

  // Validate category
  const category = await Category.findById(category_id);
  if (!category) throw new Error('Category not found');

  // Upload main image (if any)
 const uploadedImage = await uploadSingleImage(files, 'image');

  // Upload gallery images (if any) using a helper like updateMultipleImages, but for new uploads

  // Upload gallery media (if any) using a helper like updateMultipleImages, but for new uploads
  
// let uploadedMedia = [];
if (files['media']) {
  var uploadedMedia = await uploadMultipleMedia(files['media'], 'products');
}

  // Create product with uploaded image URLs and fields

  const product = await Product.create({
    name,
    description,
    image: uploadedImage,
    media: uploadedMedia,
    price,
    category_id,
    status,
    arrival_status,
    cost_price,
    stock_quantity,
    sales,
  });

  return product;
};
