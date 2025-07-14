import Category from "../../models/category.model.js";
import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";

export const indexService = async (req) => {
  try {
    const params = req.query;
    const search = params.search?.trim(); // Get and trim search query for name
    const status = params.status; // Get status filter (e.g., 'active', 'inactive')
    const id = params.id; // Get _id filter (e.g., '6871faa1dc12bd7ece0e3ff4')

    const page = parseInt(params?.page, 10) ?? 1;
    const per_page = parseInt(params?.paginate_count, 10) ?? 10;

    // Build query object for filtering
    const query = {};

    // Add search filter (case-insensitive search on name)
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Search in category name
    }

    // Add status filter if provided
    if (status) {
      query.status = status; // Assumes status is a field in your Category model
    }

    // Add _id filter if provided
    if (id) {
      query._id = id; // Filter by specific _id
    }

    const options = {
      page,
      limit: per_page,
      lean: true,
      sort: { createdAt: -1 }, // Sort by newest first
    };

    // Execute paginated query with filters
    const paginationResult = await Category.paginate(query, options);
    const data = formatPaginationResponse(paginationResult, params, req);

    return { success: true, ...data };

  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};