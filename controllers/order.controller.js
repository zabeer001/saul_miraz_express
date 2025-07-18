import Order from "../models/order.model.js";
import { bestSellingProductsService } from "../services/orders/bestSellingProducts.service.js";
import { orderCustomersService } from "../services/orders/orderCustomersService.js";
import { orderDestroyService } from "../services/orders/orderDestroy.service.js";
import { orderIndexService } from "../services/orders/orderIndex.service.js";
import { orderShowService } from "../services/orders/orderShow.service.js";
import { orderStatsService } from "../services/orders/orderStatsService.js";
import { orderStoreService } from "../services/orders/orderStore.service.js";
import { orderUpdateService } from "../services/orders/orderUpdate.service.js";


class OrderController {

  static async store(req, res) {
    try {

      const result = await orderStoreService(req);
      return res.status(201).json({
        message: 'daata retrived successfully',
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Failed to create order',
        error: error.message,
      });
    }
  }

  static async index(req, res) {
    try {
      const result = await orderIndexService(req);
      return res.status(200).json({
        message: 'all data retrived',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch orders',
        error: error.message,
      });
    }
  }

  static async show(req, res) {
    try {
      const result = await orderShowService(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message: 'Order not found',
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const result = await orderUpdateService(req, req.params.id);
      return res.status(200).json({
        message: 'Order updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Failed to update order',
        error: error.message,
      });
    }
  }

  static async destroy(req, res) {
    try {
      const result = await orderDestroyService(req.params.id);
      return res.status(200).json({
        message: 'Order deleted successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to delete order',
        error: error.message,
      });
    }
  }

  static async orderStats(req, res) {
    try {
      const result = await orderStatsService(req);
      return res.status(200).json({
        message: 'Data retrieved successfully',
        ...result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to retrieve order stats',
        error: error.message,
      });
    }
  }

  static async bestSellingProducts(req, res) {

    try {
      const result = await bestSellingProductsService(req);
      return res.status(200).json({
        message: 'Data retrieved successfully',
        ...result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to retrieve order stats',
        error: error.message,
      });
    }

  }

   static async customers(req, res) {
    try {
      const result = await orderCustomersService(req);
      return res.status(200).json({
        message: "Customers retrieved successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve customers",
        error: error.message,
      });
    }
  }
}

export default OrderController;
