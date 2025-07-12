import Category from '../../models/category.model.js';
import { updateSingleImage } from '../../helpers/updateSingleImage.js';
import { updateMultipleMedia } from '../../helpers/updateMultipleMedia.js';
import { updateModelFields } from '../../helpers/updateModelFields.js';
import Order from '../../models/order.model.js';

/**
 * Updates a product with provided fields, image, and media.
 * @param {Object} req - Express request object containing body (field data) and files (image/media uploads).
 * @param {string} productId - MongoDB ID of the product to update.
 * @returns {Promise<Object>} Updated product document.
 * @throws {Error} If product or category is not found, or update fails.
 */
export const orderUpdateService = async (req, orderID) => {
  // Ensure request body and files are objects, default to empty if undefined
  const body = req.body || {};
  const files = req.files || {};

  // Fetch product by ID from the database
  const order = await Order.findById(orderID);
  if (!order) throw new Error('Order not found');

  // Extract fields from request body
  let {
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

    

    // name = 'egal'; you can change the data 

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
    updateModelFields(product, fieldsToUpdate);

    // Save the updated product to the database
    await product.save();

    // Return the updated product document
    return product;
  } catch (error) {
    // Handle any errors from database or helper operations
    throw new Error(`Failed to update product: ${error.message}`);
  }
};