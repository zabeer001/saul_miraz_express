
import { indexService } from '../services/categories/index.service.js';
import { showService } from '../services/categories/show.service.js';
import { updateService } from '../services/categories/update.service.js';
import { destroyService } from '../services/categories/destroy.service.js';
import { storeService } from '../services/categories/store.service.js';

class CategoryController {
  static async store(req, res) {
    try {
      const result = await storeService(req.body);
      return res.status(201).json({
        message: 'Category created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Failed to create category',
        error: error.message,
      });
    }
  }

  static async index(req, res) {
    try {
      const result = await indexService(req);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch categories',
        error: error.message,
      });
    }
  }

  static async show(req, res) {
    try {
      const result = await showService(req.params.id);
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
      const result = await updateService(req.params.id, req.body);
      return res.status(200).json({
        message: 'Category updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Failed to update category',
        error: error.message,
      });
    }
  }

  static async destroy(req, res) {
    try {
      const result = await destroyService(req.params.id);
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
}

export default CategoryController;
