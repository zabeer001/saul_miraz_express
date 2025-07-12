
import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";
import Order from "../../models/order.model.js";

export const orderIndexService = async (req) => {
  try {
    const params = req.query;
    const page = parseInt(params?.page, 10) ?? 1;
    const per_page = parseInt(params?.paginate_count, 10) ?? 10;

    const options = {
      page,
      limit: per_page,
      lean: true,
      sort: { createdAt: -1 }, 
    };

    const paginationResult = await Order.paginate({}, options);
    const data = formatPaginationResponse(paginationResult, params, req);

    // return { success:true , ...data };
    return { success:true , ...data };

  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};
