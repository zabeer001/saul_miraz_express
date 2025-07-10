import Product from '../../models/product.model.js';
import Category from '../../models/category.model.js';
import { zabeerUpdateMainImage } from '../../helpers/zabeerUpdateMainImage.js';
import { zabeerUpdateMultipleMedia } from '../../helpers/zabeerUpdateMultipleMedia.js';
import { zabeerUpdateModelFields } from '../../helpers/zabeerUpdateModelFields.js';

/**
 * Updates a product with provided fields, image, and media.
 * @param {Object} req - Express request object containing body (field data) and files (image/media uploads).
 * @param {string} productId - MongoDB ID of the product to update.
 * @returns {Promise<Object>} Updated product document.
 * @throws {Error} If product or category is not found, or update fails.
 */
export const productUpdateService = async (req, productId) => {
  // Ensure request body and files are objects, default to empty if undefined
  const body = req.body || {};
  const files = req.files || {};

  // Fetch product by ID from the database
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  // Extract fields from request body
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

  try {
    // Check if a new category ID is provided and validate it
    if (category_id) {
      const category = await Category.findById(category_id);
      if (!category) throw new Error('Category not found');
      product.category_id = category_id; // Update product’s category
    }

    // Update the main product image if a new image file is provided
    if (files['image'] && files['image'][0]) {
      product.image = await zabeerUpdateMainImage(files['image'][0], product.image);
    }

    // Update the product’s gallery media if new media files are provided
    if (files['media']) {
      product.media = await zabeerUpdateMultipleMedia(files['media'], product.media);
    }

    // Define fields to update with values from request body
    const fieldsToUpdate = {
      name,
      description,
      price,
      status,
      arrival_status,
      cost_price,
      stock_quantity,
      sales,
    };

    // Apply non-undefined fields to the product using the helper
    zabeerUpdateModelFields(product, fieldsToUpdate);

    // Save the updated product to the database
    await product.save();

    // Return the updated product document
    return product;
  } catch (error) {
    // Handle any errors from database or helper operations
    throw new Error(`Failed to update product: ${error.message}`);
  }
};