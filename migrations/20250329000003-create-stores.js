export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('stores', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER.UNSIGNED
    },
    store_type_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'store_types',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    name: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    location_id: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    image: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    rating: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    delivery_time: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    price_range: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    is_pureveg: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    slug: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    placeholder_image: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    latitude: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    longitude: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    certificate: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    restaurant_charges: {
      type: Sequelize.DECIMAL(20, 2),
      allowNull: true
    },
    delivery_charges: {
      type: Sequelize.DECIMAL(20, 2),
      allowNull: true
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    pincode: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    landmark: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    sku: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_accepted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_featured: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    commission_rate: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    delivery_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    delivery_radius: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 10.00
    },
    delivery_charge_type: {
      type: Sequelize.STRING(191),
      allowNull: false,
      defaultValue: 'FIXED'
    },
    base_delivery_charge: {
      type: Sequelize.DECIMAL(20, 2),
      allowNull: true
    },
    base_delivery_distance: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: true
    },
    extra_delivery_charge: {
      type: Sequelize.DECIMAL(20, 2),
      allowNull: true
    },
    extra_delivery_distance: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: true
    },
    min_order_price: {
      type: Sequelize.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    is_notifiable: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    auto_acceptable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    schedule_data: {
      type: Sequelize.TEXT('long'),
      allowNull: true
    },
    is_schedulable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    order_column: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    custom_message: {
      type: Sequelize.TEXT('long'),
      allowNull: true
    },
    is_orderscheduling: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    custom_featured_name: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    accept_scheduled_orders: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    schedule_slot_buffer: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 30
    },
    zone_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'zones',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    free_delivery_subtotal: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    custom_message_on_list: {
      type: Sequelize.TEXT('long'),
      allowNull: true
    },
    is_appview: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    phone: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    city: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    state: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    enable_delivery_radius: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    scheduled_delivery_from: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    delivery_ignore_days: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    has_scheduled_delivery: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    allow_scheduled_delivery_days: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    schedule_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    restaurant_charges_tax: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    tax_percentage: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    commission_type: {
      type: Sequelize.ENUM('PERCENTAGE', 'FIXED'),
      defaultValue: 'PERCENTAGE'
    },
    enable_item_tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    enable_item_addon_tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    enable_store_surge: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    store_surge_type: {
      type: Sequelize.ENUM('FIXED', 'PERCENTAGE'),
      allowNull: false,
      defaultValue: 'FIXED'
    },
    store_surge_rate: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    store_surge_commission: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    packing_charges_admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    commission_from: {
      type: Sequelize.ENUM('from_menu', 'above_menu'),
      allowNull: false,
      defaultValue: 'from_menu'
    },
    is_tax_for_store: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_promoted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_auto_payout: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    auto_payout_time: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    schedule_override: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    is_zone_close: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
    deleted_at: {
      allowNull: true,
      type: Sequelize.DATE
    }
  });

  // Add indexes for better query performance
  await queryInterface.addIndex('stores', ['store_type_id']);
  await queryInterface.addIndex('stores', ['zone_id']);
  await queryInterface.addIndex('stores', ['is_active']);
  await queryInterface.addIndex('stores', ['is_featured']);
  await queryInterface.addIndex('stores', ['sku']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('stores');
}