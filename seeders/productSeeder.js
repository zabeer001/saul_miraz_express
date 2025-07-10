import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Category from '../models/category.model.js';
import Product from '../models/product.model.js';

// Product statuses
const statuses = ['active', 'inactive', 'discontinued'];
const arrivalStatuses = ['regular', 'new', 'featured'];

// Function to generate a random product
const generateProduct = (categoryId) => {
  // Generate multiple media
  const media = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map((_, index) => ({
    file_path: `uploads/${faker.image.urlLoremFlickr({ category: 'products' })}`,
    alt: faker.commerce.productName(),
    order: index,
  }));

  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: media[0]?.file_path || '', // First media used as primary thumbnail
    media, // Full array of media
    price: mongoose.Types.Decimal128.fromString(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
    category_id: categoryId,
    status: faker.helpers.arrayElement(statuses),
    arrival_status: faker.helpers.arrayElement(arrivalStatuses),
    cost_price: mongoose.Types.Decimal128.fromString(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
    stock_quantity: faker.number.int({ min: 1, max: 100 }),
    sales: faker.number.int({ min: 0, max: 50 }),
  };
};

// Product seeder function
const productSeeder = async (numProducts = 150) => {
  try {
    // Fetch all categories
    const categories = await Category.find();
    if (categories.length === 0) {
      console.error('No categories found. Please seed categories first.');
      return;
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // Generate products
    const products = [];
    for (let i = 0; i < numProducts; i++) {
      const randomCategory = faker.helpers.arrayElement(categories);
      products.push(generateProduct(randomCategory._id));
    }

    // Insert products
    await Product.insertMany(products);
    console.log(`${numProducts} products seeded successfully.`);
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error; // Throw error to be caught by the mother seeder
  }
};

export default productSeeder;