export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), unique: true, allowNull: false },
    group: DataTypes.STRING(100)
  }, { tableName: 'permissions', underscored: true });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, { through: 'role_permissions', foreignKey: 'permission_id' });
  };

  return Permission;
};