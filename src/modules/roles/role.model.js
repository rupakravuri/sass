module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    description: DataTypes.STRING(255)
  }, { tableName: 'roles', underscored: true });

  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, { through: 'role_permissions', foreignKey: 'role_id' });
    Role.belongsToMany(models.User, { through: 'user_roles', foreignKey: 'role_id' });
  };

  return Role;
};