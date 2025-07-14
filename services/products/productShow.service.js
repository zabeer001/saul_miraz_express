import Product from "../../models/product.model.js";

export const productShowService = async (id) => {
  try {
    const product = await Product.findById(id).lean();

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};
