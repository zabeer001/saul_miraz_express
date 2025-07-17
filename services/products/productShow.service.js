import Product from "../../models/product.model.js";
import Review from "../../models/review.model.js";

export const productShowService = async (id) => {
  try {
    // Find the product by ID and populate category
    const product = await Product.findById(id)
      .populate("category_id")
      .lean();

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // Fetch reviews associated with this product
    const reviews = await Review.find({ product_id: id })
      .populate("user") // populate user data via virtual
      .lean();

    // Transform data
    product.category = product.category_id;
    delete product.category_id;

    product.id = product._id;

    // Attach reviews (populated)
    product.reviews = reviews;

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};
