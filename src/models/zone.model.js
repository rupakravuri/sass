export default (sequelize, DataTypes) => {
  const Zone = sequelize.define('Zone', {
    id: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true, 
      primaryKey: true 
    },
    name: { 
      type: DataTypes.STRING(191), 
      allowNull: false,
      unique: true
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    }
  }, { 
    tableName: 'zones', 
    underscored: true 
  });

  Zone.associate = (models) => {
    if (models.StoreType) {
      Zone.hasMany(models.StoreType, { 
        foreignKey: 'zone_id', 
        as: 'store_types' 
      });
    }
  };

  return Zone;
};