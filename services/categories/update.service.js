import Category from '../../models/category.model.js';
import { updateSingleImage } from '../../helpers/updateSingleImage.js';

export const updateService = async ({ id, name, description, files, type }) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  // Check for duplicate name excluding current category
  const existing = await Category.findOne({ name, _id: { $ne: id } });
  if (existing) {
    throw new Error('Category name already exists');
  }

  // Upload new image if provided, otherwise keep existing
  const imageUrl = files ? await updateSingleImage(files, 'image') : category.image;

  // Update fields
  category.name = name;
  category.description = description;
  category.image = imageUrl;
  category.type = type;

  await category.save();

  return category;
};
