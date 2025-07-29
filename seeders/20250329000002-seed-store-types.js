export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('store_types', [
    {
      id: 1,
      name: 'Restaurant',
      description: 'Full-service dining establishments',
      store_type_description: 'Traditional restaurants offering dine-in, takeout, and delivery services',
      store_ui: 'restaurant-theme',
      zone_id: 1,
      title: 'Fine Dining Experience',
      sub_title: 'Authentic flavors and quality service',
      image: null,
      offer: 'Free appetizer on orders above $30',
      radius: 5.00,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Coffee Shop',
      description: 'Specialty coffee and light snacks',
      store_type_description: 'Cozy coffee shops perfect for meetings, work, and relaxation',
      store_ui: 'cafe-theme',
      zone_id: 2,
      title: 'Premium Coffee Experience',
      sub_title: 'Freshly roasted beans daily',
      image: null,
      offer: '20% off on all beverages',
      radius: 2.50,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Fast Food',
      description: 'Quick service restaurants',
      store_type_description: 'Fast and convenient food options for busy lifestyles',
      store_ui: 'fastfood-theme',
      zone_id: 5,
      title: 'Quick & Delicious',
      sub_title: 'Ready in under 15 minutes',
      image: null,
      offer: 'Buy 2 Get 1 Free on combo meals',
      radius: 3.00,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Grocery Store',
      description: 'Essential food and household items',
      store_type_description: 'Complete grocery solution with fresh produce and daily essentials',
      store_ui: 'grocery-theme',
      zone_id: 3,
      title: 'Fresh & Affordable',
      sub_title: 'Everything you need under one roof',
      image: null,
      offer: 'Free delivery on orders above $50',
      radius: 7.50,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: 'Bakery',
      description: 'Fresh baked goods and desserts',
      store_type_description: 'Artisanal bakery with fresh bread, cakes, and pastries',
      store_ui: 'bakery-theme',
      zone_id: 1,
      title: 'Freshly Baked Daily',
      sub_title: 'Artisanal breads and desserts',
      image: null,
      offer: '10% off on birthday cakes',
      radius: 4.00,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 6,
      name: 'Pharmacy',
      description: 'Medical supplies and health products',
      store_type_description: 'Complete pharmacy with prescription medicines and health essentials',
      store_ui: 'medical-theme',
      zone_id: 3,
      title: 'Your Health Partner',
      sub_title: '24/7 medical assistance available',
      image: null,
      offer: 'Free health consultation',
      radius: 10.00,
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('store_types', null, {});
}