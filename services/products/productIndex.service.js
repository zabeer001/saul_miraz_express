import Product from "../../models/product.model.js";
import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";
import mongoose from "mongoose";

export const productIndexService = async (req) => {
  try {
    const params = req.query;
    const search = (params.search || params.serach)?.trim() || '';
    const status = params.status;
    const arrival_status = params.arrival_status;
    const page = parseInt(params?.page, 10) ?? 1;
    const per_page = parseInt(params?.paginate_count, 10) ?? 10;

    // Build query object for filtering
    const query = {};

    // Handle search logic
    if (search) {
      query.$or = [];

      // Check if search is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(search)) {
        query.$or.push({ _id: search });
      }

      // Always include name and description searches
      query.$or.push(
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      );
    }

    // Apply filters
    if (status) {
      query.status = status;
    }

    if (arrival_status) {
      query.arrival_status = arrival_status;
    }

    if (params.id) {
      query._id = params.id; // Separate id query param if provided
    }

    // Clean up empty $or to avoid MongoDB errors
    if (query.$or && query.$or.length === 0) {
      delete query.$or;
    }

    const options = {
      page,
      limit: per_page,
      lean: true,
      sort: { createdAt: -1 },
      populate: {
        path: 'category_id',
        select: 'name',
      },
    };

    const paginationResult = await Product.paginate(query, options);

    // Format category info
    paginationResult.docs = paginationResult.docs.map((doc) => ({
      ...doc,
      category: doc.category_id,
      category_id: doc.category_id?._id || null,
    }));

    const data = formatPaginationResponse(paginationResult, params, req);
    return { success: true, ...data };
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};
