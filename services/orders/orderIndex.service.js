import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";
import Order from "../../models/order.model.js";
import mongoose from 'mongoose';

export const orderIndexService = async (req) => {
  try {
    const params = req.query;
    const search = (params.search || params.serach)?.trim() || '';
    const status = params.status;
    const id = params.id;

    const page = parseInt(params?.page, 10) ?? 1;
    const per_page = parseInt(params?.paginate_count, 10) ?? 10;

    const query = {};

    if (search) {
      query.$or = [];
      // Check if search is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(search)) {
        query.$or.push({ _id: search });
      }
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
      lean: true, // Important: lean returns plain JS objects so we can modify them
      sort: { createdAt: -1 },
      populate: {
        path: 'user_id',
        select: '-password'
      }
    };

    // Run paginated query
    const paginationResult = await Order.paginate(query, options);

    // Rename user_id to customer
    paginationResult.docs = paginationResult.docs.map(order => {
      order.customer = order.user_id;
      delete order.user_id;
      return order;
    });

    const data = formatPaginationResponse(paginationResult, params, req);
    return { success: true, ...data };

  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};
