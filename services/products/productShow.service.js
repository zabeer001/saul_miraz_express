import Product from "../../models/product.model.js";

export const productShowService = async (id) => {
  try {
    const product = await Product.findById(id)
      .populate("category_id")
      .lean();

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // Transform category_id → category
    product.category = product.category_id;
    delete product.category_id;

    // Add dummy reviews fieldas
    product.reviews = [];

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};