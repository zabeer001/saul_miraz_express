import Category from "../../models/category.model.js";

export const destroyService = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};
