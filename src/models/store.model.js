export default (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true, 
      primaryKey: true 
    },
    store_type_id: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: true,
      references: {
        model: 'store_types',
        key: 'id'
      }
    },
    name: { 
      type: DataTypes.STRING(191), 
      allowNull: false 
    },
    description: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    location_id: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    image: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    rating: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    delivery_time: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    price_range: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    is_pureveg: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    slug: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    placeholder_image: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    latitude: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    longitude: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    certificate: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    restaurant_charges: { 
      type: DataTypes.DECIMAL(20, 2), 
      allowNull: true 
    },
    delivery_charges: { 
      type: DataTypes.DECIMAL(20, 2), 
      allowNull: true 
    },
    address: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    pincode: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    landmark: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    sku: { 
      type: DataTypes.STRING(191), 
      allowNull: false,
      unique: true
    },
    is_active: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    is_accepted: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    is_featured: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    commission_rate: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    delivery_type: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 1
    },
    delivery_radius: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      defaultValue: 10.00
    },
    delivery_charge_type: { 
      type: DataTypes.STRING(191), 
      allowNull: false,
      defaultValue: 'FIXED'
    },
    base_delivery_charge: { 
      type: DataTypes.DECIMAL(20, 2), 
      allowNull: true 
    },
    base_delivery_distance: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: true 
    },
    extra_delivery_charge: { 
      type: DataTypes.DECIMAL(20, 2), 
      allowNull: true 
    },
    extra_delivery_distance: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: true 
    },
    min_order_price: { 
      type: DataTypes.DECIMAL(20, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    is_notifiable: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false
    },
    auto_acceptable: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    schedule_data: { 
      type: DataTypes.TEXT('long'), 
      allowNull: true 
    },
    is_schedulable: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    order_column: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    custom_message: { 
      type: DataTypes.TEXT('long'), 
      allowNull: true 
    },
    is_orderscheduling: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    custom_featured_name: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    accept_scheduled_orders: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    schedule_slot_buffer: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 30
    },
    zone_id: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'zones',
        key: 'id'
      }
    },
    free_delivery_subtotal: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    custom_message_on_list: { 
      type: DataTypes.TEXT('long'), 
      allowNull: true 
    },
    is_appview: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    phone: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    city: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    state: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    enable_delivery_radius: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    scheduled_delivery_from: { 
      type: DataTypes.BIGINT, 
      allowNull: true 
    },
    delivery_ignore_days: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    has_scheduled_delivery: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    allow_scheduled_delivery_days: { 
      type: DataTypes.BIGINT, 
      allowNull: true 
    },
    schedule_type: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 1
    },
    restaurant_charges_tax: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    tax_percentage: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    commission_type: { 
      type: DataTypes.ENUM('PERCENTAGE', 'FIXED'), 
      defaultValue: 'PERCENTAGE'
    },
    enable_item_tax: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    enable_item_addon_tax: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    enable_store_surge: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    store_surge_type: { 
      type: DataTypes.ENUM('FIXED', 'PERCENTAGE'), 
      allowNull: false,
      defaultValue: 'FIXED'
    },
    store_surge_rate: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    store_surge_commission: { 
      type: DataTypes.DECIMAL(8, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    packing_charges_admin: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    commission_from: { 
      type: DataTypes.ENUM('from_menu', 'above_menu'), 
      allowNull: false,
      defaultValue: 'from_menu'
    },
    is_tax_for_store: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    is_promoted: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    is_auto_payout: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    auto_payout_time: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    schedule_override: { 
      type: DataTypes.BOOLEAN, 
      allowNull: true 
    },
    is_zone_close: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    }
  }, { 
    tableName: 'stores', 
    underscored: true 
  });

  Store.associate = (models) => {
    if (models.StoreType) {
      Store.belongsTo(models.StoreType, { 
        foreignKey: 'store_type_id', 
        as: 'store_type' 
      });
    }
    if (models.Zone) {
      Store.belongsTo(models.Zone, { 
        foreignKey: 'zone_id', 
        as: 'zone' 
      });
    }
  };

  return Store;
};