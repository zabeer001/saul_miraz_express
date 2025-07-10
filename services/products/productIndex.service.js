import Product from "../../models/product.model.js"; // import Product model
import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";

export const productIndexService = async (req) => {
  try {
    const params = req.query;
    const page = parseInt(params?.page, 10) ?? 1;
    const per_page = parseInt(params?.paginate_count, 10) ?? 10;

    const options = {
      page,
      limit: per_page,
      lean: true,
      sort: { createdAt: -1 }, // ✅ correct way to sort
    };

    const paginationResult = await Product.paginate({}, options);
    const data = formatPaginationResponse(paginationResult, params, req);

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};
