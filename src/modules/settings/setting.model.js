module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    key: { type: DataTypes.STRING(191), primaryKey: true },
    value: { type: DataTypes.TEXT('long'), allowNull: true },
    type: { type: DataTypes.ENUM('string','number','boolean','json','array'), defaultValue: 'string' }
  }, { tableName: 'settings', timestamps: false });
  return Setting;
};