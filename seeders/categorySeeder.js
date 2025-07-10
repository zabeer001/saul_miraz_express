import Category from '../models/category.model.js'; // adjust path
import { faker } from '@faker-js/faker';

const generateCategories = () => {
  const categories = [];
  for (let i = 1; i <= 50; i++) {
    categories.push({
      name: `${faker.commerce.department()} ${i}`, // to ensure unique names
      description: faker.commerce.productDescription(),
    });
  }
  return categories;
};

const categorySeeder = async () => {
  await Category.deleteMany({});
  console.log('Existing categories deleted');

  const categories = generateCategories();

  await Category.insertMany(categories);
  console.log('Categories seeded successfully');
};

export default categorySeeder;
