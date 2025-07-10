import Product from '../../models/product.model.js';
import Category from '../../models/category.model.js';
import { uploadToCloudinary } from '../../helpers/cloudinary.js';
import { uploadMultipleImages } from '../../helpers/uploadMultipleImages.js'; // create this helper similar to updateMultipleImages

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
  let uploadedImage = null;
  if (files['image'] && files['image'][0]?.buffer) {
    const image = files['image'][0];
    const base64 = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    const uploadRes = await uploadToCloudinary(base64);
    uploadedImage = uploadRes.secure_url;
  }

  // Upload gallery images (if any) using a helper like updateMultipleImages, but for new uploads

  // Upload gallery media (if any) using a helper like updateMultipleImages, but for new uploads
  let uploadedMedia = [];
  if (files['media']) {
    // uploadMultipleImages should return array of { file_path, alt, order }
    uploadedMedia = await uploadMultipleImages(files['media']);
    // Ensure all media objects have required fields for the model
    uploadedMedia = uploadedMedia.map((media, idx) => ({
      file_path: media.file_path || media.url || '',
      alt: media.alt || '',
      order: typeof media.order === 'number' ? media.order : idx,
    }));
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
