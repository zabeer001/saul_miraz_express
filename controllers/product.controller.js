import { productDestroyService } from "../services/products/productDestroy.service.js";
import { productIndexService } from "../services/products/productIndex.service.js";
import { productShowService } from "../services/products/productShow.service.js";
import { productStatsService } from "../services/products/productStats.service.js";
import { productStoreService } from "../services/products/productStore.service.js";
import { productUpdateService } from "../services/products/productUpdate.service.js";

class ProductController {

  static async store(req, res) {
    try {
      const result = await productStoreService(req);
      return res.status(201).json({
        message: 'Product created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Failed to create product',
        error: error.message,
      });
    }
  }

  static async index(req, res) {
    try {
      const result = await productIndexService(req);
      return res.status(200).json({
        message: 'Data retrived successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch products',
        error: error.message,
      });
    }
  }

  static async show(req, res) {
    try {
      const result = await productShowService(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message: 'Category not found',
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      // Pass the whole req (for files and body) and the product ID separately
      const result = await productUpdateService(req, req.params.id);

      return res.status(200).json({
        message: 'Data updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Failed to update data',
        error: error.message,
      });
    }
  }

  static async destroy(req, res) {
    try {
      const result = await productDestroyService(req.params.id);
      return res.status(200).json({
        message: 'Category deleted successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to delete category',
        error: error.message,
      });
    }
  }

  static async stats(req, res) {
    try {
      const result = await productStatsService(req);
      return res.status(200).json({
        message: 'Category deleted successfully',
        ...result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to delete category',
        error: error.message,
      });
    }
  }

}

export default ProductController;
