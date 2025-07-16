import Category from "../../models/category.model.js";

export const updateService = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
    category.image = await updateSingleImage(files['image'][0], category.image);

  if (!category) {
    throw new Error('Category not found');
  }
  console.log('updated');
  

  return category;
};
