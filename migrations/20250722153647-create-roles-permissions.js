// migrations/20250722-create-roles-permissions.js
export async function up (qi, Sequelize) {
  await qi.createTable('roles', {
    id:          { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name:        { type: Sequelize.STRING(100), allowNull: false, unique: true },
    description: { type: Sequelize.STRING(255) },
    created_at:  { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    updated_at:  { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
  });

  await qi.createTable('permissions', {
    id:         { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name:       { type: Sequelize.STRING(150), allowNull: false, unique: true },
    group:      { type: Sequelize.STRING(100) },
    created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
  });

  await qi.createTable('user_roles', {
    user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
      references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
    role_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
      references: { model: 'roles', key: 'id' }, onDelete: 'CASCADE' }
  });

  await qi.createTable('role_permissions', {
    role_id:       { type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
      references: { model: 'roles', key: 'id' }, onDelete: 'CASCADE' },
    permission_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
      references: { model: 'permissions', key: 'id' }, onDelete: 'CASCADE' }
  });
}

export async function down (qi) {
  await qi.dropTable('role_permissions');
  await qi.dropTable('user_roles');
  await qi.dropTable('permissions');
  await qi.dropTable('roles');
}
