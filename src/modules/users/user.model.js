// user.model.js
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(191), allowNull: false },
    email: { type: DataTypes.STRING(191), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(191), allowNull: false },
    role: { type: DataTypes.STRING(50), defaultValue: 'user' }
  }, { tableName: 'users', underscored: true });

  User.beforeCreate(async (u) => { if (u.password) u.password = await bcrypt.hash(u.password, 10); });
  User.prototype.isPasswordMatch = function (pw) { return bcrypt.compare(pw, this.password); };

  User.associate = (models) => {
    if (models.Role) User.belongsToMany(models.Role, { through: 'user_roles', foreignKey: 'user_id' });
  };

  return User;
};
