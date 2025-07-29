export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('store_types', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER.UNSIGNED
    },
    name: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    store_type_description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    store_ui: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    zone_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'zones',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    sub_title: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    image: {
      type: Sequelize.STRING(500),
      allowNull: true
    },
    offer: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    radius: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
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

  // Add index on zone_id for better query performance
  await queryInterface.addIndex('store_types', ['zone_id']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('store_types');
}