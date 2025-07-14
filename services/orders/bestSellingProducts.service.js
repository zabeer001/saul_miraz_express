import OrderProduct from '../../models/orderProduct.model.js';
import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";

export const bestSellingProductsService = async (req) => {
  try {
    const params = req.query;
    const page = parseInt(params?.page, 10) || 1;
    const per_page = parseInt(params?.paginate_count, 10) || 10;
    const skip = (page - 1) * per_page;

    const topProducts = await OrderProduct.aggregate([
      {
        $group: {
          _id: '$product_id',
          total_sold: { $sum: '$quantity' }
        }
      },
      { $sort: { total_sold: -1 } },
      { $skip: skip },
      { $limit: per_page },
      {
        $lookup: {
          from: 'products',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$productId'] }
              }
            },
            {
              $project: {
                name: 1,
                media: 1,
                price: 1,
                _id: 0
              }
            }
          ],
          as: 'product_details'
        }
      },
      { $unwind: '$product_details' },
      {
        $project: {
          product_id: { $toString: '$_id' },
          name: '$product_details.name',
          media: {
            $let: {
              vars: {
                firstMedia: { $arrayElemAt: ['$product_details.media', 0] }
              },
              in: '$$firstMedia.file_path'
            }
          },
          price: '$product_details.price',
          total_sold: 1,
          _id: 0
        }
      }
    ]);

    // Get total count
    const totalCountAgg = await OrderProduct.aggregate([
      {
        $group: {
          _id: '$product_id'
        }
      },
      { $count: 'total' }
    ]);
    const total = totalCountAgg[0]?.total || 0;

    // Format pagination result
    const paginationResult = {
      docs: topProducts,
      totalDocs: total,
      page,
      limit: per_page,
      totalPages: Math.ceil(total / per_page),
      hasNextPage: page * per_page < total,
      hasPrevPage: page > 1
    };

    const data = formatPaginationResponse(paginationResult, params, req);

    return {
      success: true,
      ...data
    };

  } catch (error) {
    console.error('Aggregation error:', error);
    throw new Error(`Failed to fetch best-selling products: ${error.message}`);
  }
};
