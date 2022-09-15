const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    connectionid: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR(26),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "connectionid" },
        ]
      },
    ]
  });
};
