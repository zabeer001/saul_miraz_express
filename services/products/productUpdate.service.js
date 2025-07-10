import Product from '../../models/product.model.js';
import Category from '../../models/category.model.js';
import { updateCloudinaryImage, uploadToCloudinary } from '../../helpers/cloudinary.js';
import { updateMultipleImages } from '../../helpers/updateMultipleImages.js'; // 👈 import the helper

export const productUpdateService = async (req, productId) => {
  const body = req.body || {};
  const files = req.files || {};

  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  const {
    name,
    description,
    price,
    category_id,
    status,
    arrival_status,
    cost_price,
    stock_quantity,
    sales,
  } = body;

  // Validate new category if provided
  if (category_id) {
    const category = await Category.findById(category_id);
    if (!category) throw new Error('Category not found');
    product.category_id = category_id;
  }

  // ✅ Update main image (no delete logic for this one)
  if (files['image'] && files['image'][0]?.buffer) {
    const image = files['image'][0];
    const base64 = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;

    // Pass base64 new image and old image URL to delete old from Cloudinary
    const uploadRes = await updateCloudinaryImage(base64, product.image);

    product.image = uploadRes.secure_url;
  }

  // ✅ Update gallery media using the helper
  if (files['media']) {
    // oldImageUrls: get old file_path values from product.media
    const oldImageUrls = (product.media || []).map(m => m.file_path);
    let updatedMedia = await updateMultipleImages(files['media'], oldImageUrls);
    // Ensure all media objects have required fields for the model
    updatedMedia = updatedMedia.map((media, idx) => ({
      file_path: media.file_path || media.url || '',
      alt: media.alt || '',
      order: typeof media.order === 'number' ? media.order : idx,
    }));
    product.media = updatedMedia; // replace with new gallery media
  }

  // ✅ Update fields if provided
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (status !== undefined) product.status = status;
  if (arrival_status !== undefined) product.arrival_status = arrival_status;
  if (cost_price !== undefined) product.cost_price = cost_price;
  if (stock_quantity !== undefined) product.stock_quantity = stock_quantity;
  if (sales !== undefined) product.sales = sales;

  await product.save();
  return product;
};
