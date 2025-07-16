import { formatPaginationResponse } from '../helpers/formatPaginationResponse.js';
import PromoCode from '../models/promoCode.model.js';

class PromoCodeController {
    // Create
    static async store(req, res) {
        try {
            const data = {
                ...req.body,
                usage_limit: Number(req.body.usage_limit),
                amount: Number(req.body.amount),
            };

            const promoCode = await PromoCode.create(data);

            return res.status(201).json({
                message: 'Promo code created successfully',
                data: promoCode,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to create promo code',
                error: error.message,
            });
        }
    }

    // Get All with Pagination
    static async index(req, res) {
        try {
            const params = req.query;
            const search = params.search?.trim(); // Get and trim search query for name
            const status = params.status; // Get status filter (e.g., 'active', 'inactive')
            const id = params.id; // Get _id filter (e.g., '6871faa1dc12bd7ece0e3ff4')

            const page = parseInt(params?.page, 10) || 1;
            const per_page = parseInt(params?.paginate_count, 10) || 10;

            // Build query object for filtering
            const query = {};

            // Add search filter (case-insensitive search on name)
            if (search) {
                query.name = { $regex: search, $options: 'i' }; // Search in promo code name
            }

            // Add status filter if provided
            if (status) {
                query.status = status; // Assumes status is a field in your PromoCode model
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
            const paginationResult = await PromoCode.paginate(query, options);
            const data = formatPaginationResponse(paginationResult, params, req);

            return res.status(200).json({
                success: true,
                data, // Spread data to match previous service response structure
            });
        } catch (error) {
            return res.status(500).json({ message: `Failed to fetch promo codes: ${error.message}` });
        }
    }

    // Get One
    static async show(req, res) {
        try {
            const promoCode = await PromoCode.findById(req.params.id);
            if (!promoCode) return res.status(404).json({ message: 'Promo code not found' });
            return res.status(200).json(promoCode);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch promo code', error: error.message });
        }
    }

    // Update
    static async update(req, res) {
        try {
            const data = {
                ...req.body,
                usage_limit: req.body.usage_limit !== undefined ? Number(req.body.usage_limit) : undefined,
                amount: req.body.amount !== undefined ? Number(req.body.amount) : undefined,
            };

            const promoCode = await PromoCode.findByIdAndUpdate(req.params.id, data, { new: true });

            if (!promoCode)
                return res.status(404).json({ message: 'Promo code not found' });

            return res.status(200).json({
                message: 'Promo code updated successfully',
                data: promoCode,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to update promo code',
                error: error.message,
            });
        }
    }


    // Delete
    static async destroy(req, res) {
        try {
            const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
            if (!promoCode) return res.status(404).json({ message: 'Promo code not found' });
            return res.status(200).json({ message: 'Promo code deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete promo code', error: error.message });
        }
    }

    static async stats(req, res) {

        try {


            const stats = await PromoCode.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        status: "$_id",
                        count: 1,
                    },
                },
            ]);

            // Convert array to object: { "active": 2, "inactive": 1 }
            const result = {};
            stats.forEach(stat => {
                result[stat.status] = stat.count;
            });

            res.json(result);
        } catch (error) {
            console.error("Error in stats:", error);
            res.status(500).json({ message: "Server Error" });
        }
    }
}

export default PromoCodeController;
