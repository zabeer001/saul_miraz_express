
import { indexService } from '../services/categories/index.service.js';
import { showService } from '../services/categories/show.service.js';
import { updateService } from '../services/categories/update.service.js';
import { destroyService } from '../services/categories/destroy.service.js';
import { storeService } from '../services/categories/store.service.js';
import Category from '../models/category.model.js';

class CategoryController {

  static async store(req, res) {
    try {
      const result = await storeService({
        ...req.body,
        files: req.files, // ✅ Pass files explicitly
      });

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
      return res.status(200).json({
        message: 'daata retrived successfully',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to fetch categories',
        error: error.message,
      });
    }
  }


  static async indexByType(req, res) {
    try {
      const items = await Category.find(); // fetch all documents

      // Grouping logic
      const grouped = {};
      for (const item of items) {
        const type = item.type || 'Unknown';
        if (!grouped[type]) {
          grouped[type] = [];
        }
        grouped[type].push(item);
      }

      return res.status(200).json({
        success: true,
        ...grouped,
      });

    } catch (error) {
      console.error('Error in indexByType:', error);
      return res.status(500).json({
        success: false,
        message: 'Server Error',
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
      // Ensure files are being received
      console.log('Request files:', req.files); // Debug log


      const result = await updateService({
        id: req.params.id,
        ...req.body,
        files: req.files || null,
      });

      return res.status(200).json({
        message: 'Category updated successfully',
        data: result,
      });
    } catch (error) {
      console.error('Update error:', error); // Detailed error logging
      return res.status(400).json({
        message: 'Failed to update category',
        error: error.message,
      });
    }
  }

  static async destroy(req, res) {
    try {
      // return ({  message: 'response came here',});
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
