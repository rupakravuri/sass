export default (sequelize, DataTypes) => {
  const StoreType = sequelize.define('StoreType', {
    id: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true, 
      primaryKey: true 
    },
    name: { 
      type: DataTypes.STRING(191), 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    store_type_description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    store_ui: { 
      type: DataTypes.TEXT, 
      allowNull: true,
      comment: 'Store UI configuration/template'
    },
    zone_id: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false,
      references: {
        model: 'zones',
        key: 'id'
      }
    },
    title: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    sub_title: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    image: { 
      type: DataTypes.STRING(500), 
      allowNull: true,
      comment: 'Image URL'
    },
    offer: { 
      type: DataTypes.STRING(191), 
      allowNull: true 
    },
    radius: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: true,
      validate: {
        isDecimal: true,
        min: 0
      }
    }
  }, { 
    tableName: 'store_types', 
    underscored: true 
  });

  StoreType.associate = (models) => {
    if (models.Zone) {
      StoreType.belongsTo(models.Zone, { 
        foreignKey: 'zone_id', 
        as: 'zone' 
      });
    }
    if (models.Store) {
      StoreType.hasMany(models.Store, { 
        foreignKey: 'store_type_id', 
        as: 'stores' 
      });
    }
  };

  return StoreType;
};