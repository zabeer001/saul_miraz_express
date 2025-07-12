import Order from '../models/order.model.js';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const generateOrders = () => {
    const orders = [];

    const orderTypes = ['online', 'offline'];
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const shippingMethods = ['courier', 'pickup', 'home_delivery'];
    const paymentMethods = ['cash', 'credit_card', 'paypal'];
    const paymentStatuses = ['unpaid', 'paid'];

    for (let i = 1; i <= 30; i++) {
        const shippingPrice = faker.number.float({ min: 0, max: 100, precision: 0.01 });
        const total = faker.number.float({ min: 100, max: 1000, precision: 0.01 });

        orders.push({
            user_id: new mongoose.Types.ObjectId(),
            type: faker.helpers.arrayElement(orderTypes),
            items: faker.number.int({ min: 1, max: 10 }),
            status: faker.helpers.arrayElement(statuses),
            shipping_method: faker.helpers.arrayElement(shippingMethods),
            shipping_price: parseFloat(faker.number.float({ min: 5, max: 50, precision: 0.01 }).toFixed(2)),
            order_summary: faker.commerce.productDescription(),
            payment_method: faker.helpers.arrayElement(paymentMethods),
            payment_status: faker.helpers.arrayElement(paymentStatuses),
            promocode_id: faker.datatype.boolean() ? new mongoose.Types.ObjectId() : null,
            promocode_name: faker.datatype.boolean() ? `PROMO-${faker.string.alphanumeric(5).toUpperCase()}` : null,
            total: parseFloat(faker.number.float({ min: 5, max: 50, precision: 0.01 }).toFixed(2)),
        });
    }

    return orders;
};

export const orderSeeder = async () => {
    await Order.deleteMany({});
    console.log('🗑️ Existing orders deleted');

    const orders = generateOrders();

    await Order.insertMany(orders);
    console.log('✅ 30 orders seeded successfully');
};
