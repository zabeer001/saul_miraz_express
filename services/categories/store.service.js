import Category from '../../models/category.model.js';

export const storeService = async ({ name, description }) => {
  const existing = await Category.findOne({ name });
  if (existing) {
    throw new Error('Category name already exists');
  }

  const category = await Category.create({ name, description });
  console.log(name);
  
  return category;
};