import Product from "../../models/product.model.js"; // import Product model
import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";

export const productIndexService = async (req) => {
  try {
    const params = req.query;
    const search = params.search?.trim();
    const status = params.status;
    const id = params.id;

    const page = parseInt(params?.page, 10) ?? 1;
    const per_page = parseInt(params?.paginate_count, 10) ?? 10;

    // Build query object for filtering
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (id) {
      query._id = id;
    }

    const options = {
      page,
      limit: per_page,
      lean: true,
      sort: { createdAt: -1 },
      populate: {
        path: 'category_id',
        select: 'name', // add more fields if needed
      },
    };

    const paginationResult = await Product.paginate(query, options);

    // Format category info
    paginationResult.docs = paginationResult.docs.map((doc) => {
      return {
        ...doc,
        category: doc.category_id,               // full populated category object
        category_id: doc.category_id?._id || null, // retain only ObjectId
      };
    });

    const data = formatPaginationResponse(paginationResult, params, req);
    return { success: true, ...data };

  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};
