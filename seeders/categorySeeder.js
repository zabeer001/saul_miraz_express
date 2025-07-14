import Category from '../models/category.model.js';
import { faker } from '@faker-js/faker';

const categoryTypes = ['physical', 'digital', 'service', 'subscription'];

const generateCategories = () => {
  const categories = [];
  for (let i = 1; i <= 50; i++) {
    categories.push({
      name: `${faker.commerce.department()} ${i}`,
      description: faker.commerce.productDescription(),
      type: faker.helpers.arrayElement(categoryTypes), // randomly pick a type
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
