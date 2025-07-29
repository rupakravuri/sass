// migrations/20250722152928-create-users.js
export async function up (qi, Sequelize) {
  await qi.createTable('users', {
    id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING(191), allowNull: false },
    email: { type: Sequelize.STRING(191), allowNull: false, unique: true },
    email_verified_at: { type: Sequelize.DATE },
    password: { type: Sequelize.STRING(191), allowNull: false },
    phone: { type: Sequelize.STRING(191) },
    avatar: { type: Sequelize.TEXT },
    role: { type: Sequelize.STRING(50), defaultValue: 'user' },
    remember_token: { type: Sequelize.STRING(100) },
    auth_token: { type: Sequelize.TEXT('long') },
    default_address_id: { type: Sequelize.INTEGER, defaultValue: 0 },
    delivery_pin: { type: Sequelize.STRING(191) },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    cancel_count: { type: Sequelize.INTEGER, defaultValue: 0 },
    tax_number: { type: Sequelize.STRING(191) },
    user_ip: { type: Sequelize.TEXT },
    zone_id: { type: Sequelize.INTEGER },
    device_token: { type: Sequelize.STRING(191) },
    show_customer_to_store: { type: Sequelize.BOOLEAN, defaultValue: false },
    is_only_cod: { type: Sequelize.BOOLEAN, defaultValue: false },
    disable_owner_access: { type: Sequelize.BOOLEAN, defaultValue: false },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
  });
}

export async function down (qi) {
  await qi.dropTable('users');
}
