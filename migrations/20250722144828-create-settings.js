// migrations/20250722-create-settings.js
export async function up (qi, Sequelize) {
  await qi.createTable('settings', {
    key:        { type: Sequelize.STRING(191), primaryKey: true },
    value:      { type: Sequelize.TEXT('long') },
    type:       { type: Sequelize.ENUM('string','number','boolean','json','array'), defaultValue: 'string' },
    updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
  });
}

export async function down (qi) {
  await qi.dropTable('settings');
}
